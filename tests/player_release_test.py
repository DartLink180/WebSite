import hashlib, importlib.util, json, subprocess, sys, tempfile, unittest
from pathlib import Path
from unittest.mock import patch
spec=importlib.util.spec_from_file_location('player_release',Path(__file__).resolve().parents[1]/'ops/player-release.py')
module=importlib.util.module_from_spec(spec);spec.loader.exec_module(module)
class ReleaseTests(unittest.TestCase):
    def setUp(self):
        self.tmp=tempfile.TemporaryDirectory();self.addCleanup(self.tmp.cleanup)
        root=Path(self.tmp.name);module.CONF=root/'nginx.conf';module.RELEASE=root/'release';module.BACKUP=root/'private'
        module.CONF.write_text('root '+module.OLD+';\n# Manager proxy unchanged\nroot '+module.OLD+';\n')
        self.original=module.CONF.read_text();(module.RELEASE/'dist').mkdir(parents=True)
        (module.RELEASE/'source.json').write_text(json.dumps({'assets':{},'nginx_before':module.digest(self.original)}))
    def execute(self,runner):
        with patch.object(sys,'argv',['player-release.py','apply']),patch.object(module.os,'geteuid',return_value=0),patch.object(module,'run',side_effect=runner):module.main()
    def test_syntax_failure_restores_shared_file_before_reload(self):
        calls=[]
        def run(args):
            calls.append(args)
            if len(calls)==1:raise subprocess.CalledProcessError(1,args)
        with self.assertRaises(subprocess.CalledProcessError):self.execute(run)
        self.assertEqual(module.CONF.read_text(),self.original)
        self.assertEqual((module.BACKUP/'nginx.conf').read_text(),self.original)
        self.assertEqual((module.BACKUP/'nginx.conf').stat().st_mode&0o777,0o600)
        self.assertEqual(calls,[['nginx','-t'],['nginx','-t'],['systemctl','reload','nginx']])
    def test_intervening_shared_edit_refuses_apply_without_writing(self):
        modified=self.original+'# Later edit\n';module.CONF.write_text(modified)
        with self.assertRaisesRegex(AssertionError,'shared_config_changed'):self.execute(lambda args:self.fail('must not run commands'))
        self.assertEqual(module.CONF.read_text(),modified);self.assertFalse(module.BACKUP.exists())
if __name__=='__main__':unittest.main()
