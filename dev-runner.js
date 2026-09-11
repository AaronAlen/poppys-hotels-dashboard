/**
 * Poppys Hotels Unified Dev Runner
 * Boots both Express Backend (Port 5000) and Vite React Frontend (Port 5173) simultaneously.
 */

import { spawn } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const isWindows = process.platform === 'win32';
const npmCmd = isWindows ? 'npm.cmd' : 'npm';
const nodeCmd = process.execPath;

console.log('\x1b[36m%s\x1b[0m', '═══════════════════════════════════════════════════════════════');
console.log('\x1b[33m%s\x1b[0m', '  🌟 POPPYS HOTELS — HOTEL MANAGEMENT & AI ANALYTICS DASHBOARD');
console.log('\x1b[32m%s\x1b[0m', '  🚀 Launching MERN Stack (Express Backend + Vite React Frontend)');
console.log('\x1b[36m%s\x1b[0m', '═══════════════════════════════════════════════════════════════\n');

// 1. Launch Backend Server
const serverProcess = spawn(nodeCmd, ['server.js'], {
  cwd: path.join(__dirname, 'server'),
  env: { ...process.env, PORT: '5000' },
  stdio: ['inherit', 'pipe', 'pipe']
});

serverProcess.stdout.on('data', (data) => {
  const lines = data.toString().trim().split('\n');
  lines.forEach(line => {
    console.log('\x1b[35m[SERVER :5000]\x1b[0m', line);
  });
});

serverProcess.stderr.on('data', (data) => {
  const lines = data.toString().trim().split('\n');
  lines.forEach(line => {
    console.error('\x1b[31m[SERVER ERR]\x1b[0m', line);
  });
});

// 2. Launch Client Vite Dev Server
const clientProcess = spawn(npmCmd, ['run', 'dev'], {
  cwd: path.join(__dirname, 'client'),
  stdio: ['inherit', 'pipe', 'pipe'],
  shell: isWindows
});

clientProcess.stdout.on('data', (data) => {
  const lines = data.toString().trim().split('\n');
  lines.forEach(line => {
    console.log('\x1b[36m[CLIENT :5173]\x1b[0m', line);
  });
});

clientProcess.stderr.on('data', (data) => {
  const lines = data.toString().trim().split('\n');
  lines.forEach(line => {
    console.error('\x1b[33m[CLIENT LOG]\x1b[0m', line);
  });
});

// Cleanup on exit
const cleanup = () => {
  console.log('\n\x1b[33m%s\x1b[0m', 'Stopping Poppys Hotels MERN processes...');
  try { serverProcess.kill(); } catch (e) {}
  try { clientProcess.kill(); } catch (e) {}
  process.exit();
};

process.on('SIGINT', cleanup);
process.on('SIGTERM', cleanup);
process.on('exit', cleanup);
