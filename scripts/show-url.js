import os from 'os';
import { exec } from 'child_process';

function getLocalIP() {
  const interfaces = os.networkInterfaces();
  for (const name of Object.keys(interfaces)) {
    for (const iface of interfaces[name]) {
      if (iface.family === 'IPv4' && !iface.internal) {
        return iface.address;
      }
    }
  }
  return 'localhost';
}

const localIP = getLocalIP();
const port = 5173;

console.log('\n' + '='.repeat(60));
console.log('🌐 SituaMap Brasil - Servidor Local');
console.log('='.repeat(60));
console.log('\n📱 Copie e compartilhe esta URL com sua equipe:\n');
console.log(`   http://${localIP}:${port}`);
console.log('\n' + '='.repeat(60) + '\n');

// Roda o dev
exec('npm run dev', (error, stdout, stderr) => {
  if (error) {
    console.error(`erro: ${error.message}`);
    return;
  }
  console.log(stdout);
});
