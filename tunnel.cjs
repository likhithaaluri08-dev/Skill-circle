// Use localtunnel from SIH PROGRAM node_modules or global
let localtunnel;
try {
  localtunnel = require('localtunnel');
} catch (e) {
  try {
    localtunnel = require('c:/Users/likhi/OneDrive/Desktop/SIH/SIH PROGRAM/node_modules/localtunnel');
  } catch (err) {
    console.error('localtunnel module not found');
    process.exit(1);
  }
}

const PORT = 5173;
const SUBDOMAIN = 'skillcircle-exchange';

process.on('uncaughtException', (err) => {
  console.log('[Tunnel] Handled exception:', err.message);
  scheduleReconnect();
});

process.on('unhandledRejection', (reason) => {
  console.log('[Tunnel] Handled rejection:', reason);
  scheduleReconnect();
});

let reconnecting = false;
function scheduleReconnect() {
  if (reconnecting) return;
  reconnecting = true;
  console.log('[Tunnel] Auto-reconnecting in 3 seconds...');
  setTimeout(() => {
    reconnecting = false;
    startTunnel();
  }, 3000);
}

async function startTunnel() {
  console.log(`[Tunnel] Connecting to https://${SUBDOMAIN}.loca.lt ...`);
  try {
    const tunnel = await localtunnel({ port: PORT, subdomain: SUBDOMAIN, local_host: '127.0.0.1' });
    console.log(`[Tunnel] ACTIVE: ${tunnel.url}`);

    tunnel.on('close', () => {
      console.log('[Tunnel] Disconnected.');
      scheduleReconnect();
    });

    tunnel.on('error', (err) => {
      console.error('[Tunnel] Error:', err ? err.message : err);
      try { tunnel.close(); } catch (_) {}
      scheduleReconnect();
    });
  } catch (err) {
    console.error('[Tunnel] Connect failed:', err ? err.message : err);
    scheduleReconnect();
  }
}

startTunnel();
