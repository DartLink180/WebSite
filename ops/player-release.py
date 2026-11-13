"""Mission 11 static release preparation. Nginx apply/rollback require user approval.
prepare: copies tested dist, stores source commit/asset hashes, writes the minimal diff.
apply: checks unchanged shared configuration, backs it up privately, tests/reloads.
rollback: restores only this file if no later configuration edit superseded it.
"""
import argparse, hashlib, json, os, shutil, subprocess
from pathlib import Path
REPO=Path(__file__).resolve().parents[1]
CONF=Path('/etc/nginx/sites-available/dartlink.conf')
OLD='/srv/dartlink-v2/releases/96f454c6aad35510ee62d3752becad0382117a0d/dist'
RELEASE=Path('/srv/dartlink-v2/releases/mission11-player-v1')
BACKUP=Path('/var/lib/dartlink-website/mission11')

def run(args):return subprocess.run(args,check=True,capture_output=True,text=True,timeout=60).stdout.strip()
def digest(text):return hashlib.sha256(text.encode()).hexdigest()
def candidate(text):
    assert text.count(OLD)==2,'unexpected_website_roots'
    return text.replace(OLD,str(RELEASE/'dist'))
def main():
    assert os.geteuid()==0
    parser=argparse.ArgumentParser();parser.add_argument('action',choices=['prepare','apply','rollback']);args=parser.parse_args()
    if args.action=='prepare':
        assert not RELEASE.exists()
        assert not run(['git','-C',str(REPO),'status','--porcelain']),'commit_candidate_first'
        sha=run(['git','-C',str(REPO),'rev-parse','HEAD'])
        RELEASE.mkdir(parents=True)
        shutil.copytree(REPO/'dist',RELEASE/'dist')
        manifest={str(p.relative_to(RELEASE/'dist')):hashlib.sha256(p.read_bytes()).hexdigest() for p in (RELEASE/'dist').rglob('*') if p.is_file()}
        (RELEASE/'source.json').write_text(json.dumps({'commit':sha,'assets':manifest,'nginx_before':digest(CONF.read_text())},indent=2)+'\n')
        for path in RELEASE.rglob('*'):os.chown(path,0,0)
        candidate(CONF.read_text())
    elif args.action=='apply':
        manifest=json.loads((RELEASE/'source.json').read_text())
        text=CONF.read_text();assert digest(text)==manifest['nginx_before'],'shared_config_changed'
        for relative,expected in manifest['assets'].items():assert hashlib.sha256((RELEASE/'dist'/relative).read_bytes()).hexdigest()==expected
        BACKUP.mkdir(parents=True,mode=0o700)
        fd=os.open(BACKUP/'nginx.conf',os.O_WRONLY|os.O_CREAT|os.O_EXCL|os.O_NOFOLLOW,0o600)
        with os.fdopen(fd,'w') as f:f.write(text)
        new=candidate(text)
        try:
            CONF.write_text(new);run(['nginx','-t']);run(['systemctl','reload','nginx'])
        except BaseException:
            CONF.write_text(text);run(['nginx','-t']);run(['systemctl','reload','nginx']);raise
    else:
        saved=(BACKUP/'nginx.conf').read_text()
        assert CONF.read_text()==candidate(saved),'later_shared_config_edit'
        CONF.write_text(saved);run(['nginx','-t']);run(['systemctl','reload','nginx'])
    print(json.dumps({'action':args.action,'release':str(RELEASE),'manager_modified':False}))
if __name__=='__main__':main()
