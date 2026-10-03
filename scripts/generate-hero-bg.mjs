// Generates public/images/hero/hero-bg.webp: a procedural "agentic AI" backdrop.
// An orchestrator core at the centre of a phyllotaxis (sunflower-spiral) mesh of
// agent nodes: structured like a network, grown like a plant. Graphite + indigo.
import sharp from "sharp";

const W = 2400, H = 1350;
const CX = 1730, CY = 640;
let s = 11;
const rnd = () => ((s = (s * 16807) % 2147483647) / 2147483647);
const f = (n) => n.toFixed(1);
const GOLD = Math.PI * (3 - Math.sqrt(5));

let svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
<defs>
  <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#06070b"/><stop offset="1" stop-color="#0b0e1a"/></linearGradient>
  <radialGradient id="core" cx="${CX / W}" cy="${CY / H}" r="0.42"><stop offset="0" stop-color="#5b6cff" stop-opacity=".42"/><stop offset=".45" stop-color="#3a3fd0" stop-opacity=".14"/><stop offset="1" stop-color="#3a3fd0" stop-opacity="0"/></radialGradient>
  <radialGradient id="warm" cx=".95" cy="1" r=".4"><stop offset="0" stop-color="#8b5cf6" stop-opacity=".22"/><stop offset="1" stop-color="#8b5cf6" stop-opacity="0"/></radialGradient>
  <linearGradient id="shade" x1="0" x2="1"><stop offset="0" stop-color="#05060a" stop-opacity=".85"/><stop offset=".55" stop-color="#05060a" stop-opacity=".25"/><stop offset="1" stop-color="#05060a" stop-opacity="0"/></linearGradient>
  <radialGradient id="halo"><stop offset="0" stop-color="#7585ff" stop-opacity=".75"/><stop offset=".35" stop-color="#5b6cff" stop-opacity=".3"/><stop offset="1" stop-color="#5b6cff" stop-opacity="0"/></radialGradient>
  <filter id="blur" x="-100%" y="-100%" width="300%" height="300%"><feGaussianBlur stdDeviation="9"/></filter>
  <filter id="soft" x="-100%" y="-100%" width="300%" height="300%"><feGaussianBlur stdDeviation="3"/></filter>
</defs>
<rect width="${W}" height="${H}" fill="url(#bg)"/>
<rect width="${W}" height="${H}" fill="url(#core)"/><rect width="${W}" height="${H}" fill="url(#warm)"/>`;

// Faint dot grid (engineered feel).
svg += `<g fill="#8fa2ff" fill-opacity=".10">`;
for (let x = 40; x < W; x += 60) for (let y = 40; y < H; y += 60) svg += `<circle cx="${x}" cy="${y}" r="1.1"/>`;
svg += `</g>`;

// Orbit rings around the core.
svg += `<g fill="none" stroke="#8fa2ff">`;
[170, 320, 480, 650, 840].forEach((r, i) => {
  svg += `<circle cx="${CX}" cy="${CY}" r="${r}" stroke-opacity="${f(0.32 - i * 0.05).slice(0, 4)}" stroke-width="1.2" ${i % 2 ? 'stroke-dasharray="3 9"' : ""}/>`;
});
svg += `</g>`;

// Phyllotaxis agent mesh.
const pts = [];
for (let n = 1; n <= 300; n++) {
  const r = 46 * Math.sqrt(n), a = n * GOLD;
  pts.push({ x: CX + Math.cos(a) * r, y: CY + Math.sin(a) * r * 0.92, n, r });
}
svg += `<g stroke="#9db0ff" stroke-width="1">`;
for (const p of pts) for (const q of pts) {
  if (q.n <= p.n) continue;
  const d = Math.hypot(p.x - q.x, p.y - q.y);
  if (d < 92) svg += `<line x1="${f(p.x)}" y1="${f(p.y)}" x2="${f(q.x)}" y2="${f(q.y)}" stroke-opacity="${f(0.34 * Math.max(0.15, 1 - p.r / 800)).slice(0, 4)}"/>`;
}
svg += `</g>`;

// Spokes: curved task-routing links from the core to chosen "agent" nodes, with packets.
const agents = pts.filter((p) => p.r > 150 && p.r < 760 && rnd() < 0.085);
let spokes = "", packets = "";
for (const a of agents) {
  const mx = (CX + a.x) / 2 + (a.y - CY) * 0.18, my = (CY + a.y) / 2 - (a.x - CX) * 0.18;
  spokes += `<path d="M${CX} ${CY}Q${f(mx)} ${f(my)} ${f(a.x)} ${f(a.y)}"/>`;
  const t = 0.35 + rnd() * 0.5;
  const px = (1 - t) ** 2 * CX + 2 * (1 - t) * t * mx + t * t * a.x;
  const py = (1 - t) ** 2 * CY + 2 * (1 - t) * t * my + t * t * a.y;
  packets += `<circle cx="${f(px)}" cy="${f(py)}" r="4"/>`;
}
svg += `<g fill="none" stroke="#b7c3ff" stroke-opacity=".30" stroke-width="1.6" stroke-dasharray="2 10" stroke-linecap="round">${spokes}</g>`;
svg += `<g fill="#cfd8ff" filter="url(#soft)" fill-opacity=".9">${packets}</g><g fill="#fff">${packets.replaceAll('r="4"', 'r="2"')}</g>`;

// Nodes: small dots everywhere, haloed rings on agents.
svg += `<g fill="#dfe6ff">`;
for (const p of pts) svg += `<circle cx="${f(p.x)}" cy="${f(p.y)}" r="${f(Math.max(1.4, 4.2 - p.r / 260))}" fill-opacity="${f(Math.max(0.25, 1 - p.r / 900)).slice(0, 4)}"/>`;
svg += `</g>`;
for (const a of agents) {
  svg += `<circle cx="${f(a.x)}" cy="${f(a.y)}" r="22" fill="#6d7cff" fill-opacity=".28" filter="url(#blur)"/>`;
  svg += `<circle cx="${f(a.x)}" cy="${f(a.y)}" r="11" fill="#0b0e1a" stroke="#aab8ff" stroke-width="1.8"/><circle cx="${f(a.x)}" cy="${f(a.y)}" r="4.2" fill="#fff"/>`;
}

// Core orchestrator.
svg += `<circle cx="${CX}" cy="${CY}" r="260" fill="url(#halo)"/>
<circle cx="${CX}" cy="${CY}" r="46" fill="#0b0e1a" stroke="#c7d0ff" stroke-width="2.2"/>
<circle cx="${CX}" cy="${CY}" r="30" fill="none" stroke="#8fa2ff" stroke-width="1.4" stroke-opacity=".7"/>
<circle cx="${CX}" cy="${CY}" r="12" fill="#fff"/>`;

// Drifting particles.
svg += `<g fill="#c7d0ff">`;
for (let i = 0; i < 160; i++) svg += `<circle cx="${f(rnd() * W)}" cy="${f(rnd() * H)}" r="${f(0.6 + rnd() * 1.5)}" fill-opacity="${f(0.1 + rnd() * 0.4).slice(0, 4)}"/>`;
svg += `</g><rect width="${W}" height="${H}" fill="url(#shade)"/></svg>`;

await sharp(Buffer.from(svg)).webp({ quality: 84 }).toFile("public/images/hero/hero-bg.webp");
console.log("ok");
