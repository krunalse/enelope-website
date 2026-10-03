// Generates public/images/services/cloud-ai-agent.webp: a labelled diagram of an
// AI agent running on cloud infrastructure. Inputs -> agent (perceive, reason, act)
// -> tools, all sitting on a cloud layer. Same graphite + indigo palette as hero-bg.
import sharp from "sharp";

const W = 1600, H = 900;
const FONT = "Helvetica, Arial, sans-serif";
const CX = 800, CY = 400;

const node = (x, y, label, sub) => `
<g>
  <rect x="${x - 120}" y="${y - 38}" width="240" height="76" rx="16" fill="#12162a" stroke="#4a58c9" stroke-width="1.6"/>
  <text x="${x}" y="${y - 3}" text-anchor="middle" font-family="${FONT}" font-size="23" font-weight="600" fill="#eef1ff">${label}</text>
  <text x="${x}" y="${y + 22}" text-anchor="middle" font-family="${FONT}" font-size="16" fill="#9aa8ff">${sub}</text>
</g>`;

const inputs = [[190, 220, "Users", "chat, voice, email"], [190, 400, "Your data", "docs, databases"], [190, 580, "Events", "tickets, orders, alerts"]];
const tools = [[1410, 220, "Business apps", "CRM, ERP, email"], [1410, 400, "APIs", "internal and external"], [1410, 580, "Actions", "approve, update, notify"]];

let svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
<defs>
  <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#06070b"/><stop offset="1" stop-color="#0d1124"/></linearGradient>
  <radialGradient id="glow"><stop offset="0" stop-color="#7585ff" stop-opacity=".6"/><stop offset=".5" stop-color="#5b6cff" stop-opacity=".16"/><stop offset="1" stop-color="#5b6cff" stop-opacity="0"/></radialGradient>
  <linearGradient id="cloud" x1="0" x2="1"><stop offset="0" stop-color="#3a3fd0" stop-opacity=".35"/><stop offset="1" stop-color="#8b5cf6" stop-opacity=".35"/></linearGradient>
  <marker id="arr" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="8" markerHeight="8" orient="auto"><path d="M0 1 L9 5 L0 9z" fill="#aab8ff"/></marker>
</defs>
<rect width="${W}" height="${H}" fill="url(#bg)"/>
<g fill="#8fa2ff" fill-opacity=".10">${Array.from({ length: 27 }, (_, i) => Array.from({ length: 15 }, (_, j) => `<circle cx="${40 + i * 60}" cy="${40 + j * 60}" r="1.1"/>`).join("")).join("")}</g>
<text x="${W / 2}" y="82" text-anchor="middle" font-family="${FONT}" font-size="34" font-weight="700" fill="#fff">An AI agent, running on your cloud</text>
<text x="${W / 2}" y="118" text-anchor="middle" font-family="${FONT}" font-size="20" fill="#9aa8ff">It perceives a request, reasons about it, and acts through your systems</text>`;

// Connectors (input -> core, core -> tool).
for (const [x, y] of inputs) svg += `<path d="M${x + 120} ${y}C ${x + 280} ${y}, ${CX - 330} ${CY}, ${CX - 215} ${CY}" fill="none" stroke="#aab8ff" stroke-opacity=".7" stroke-width="2" stroke-dasharray="3 8" stroke-linecap="round" marker-end="url(#arr)"/>`;
for (const [x, y] of tools) svg += `<path d="M${CX + 215} ${CY}C ${CX + 330} ${CY}, ${x - 280} ${y}, ${x - 120} ${y}" fill="none" stroke="#aab8ff" stroke-opacity=".7" stroke-width="2" stroke-dasharray="3 8" stroke-linecap="round" marker-end="url(#arr)"/>`;

// Agent core with three stages.
svg += `<circle cx="${CX}" cy="${CY}" r="260" fill="url(#glow)"/>
<rect x="${CX - 215}" y="${CY - 120}" width="430" height="240" rx="28" fill="#0b0e1a" stroke="#c7d0ff" stroke-width="2.4"/>
<text x="${CX}" y="${CY - 68}" text-anchor="middle" font-family="${FONT}" font-size="30" font-weight="700" fill="#fff">AI Agent</text>`;
[["Perceive", -125], ["Reason", 0], ["Act", 125]].forEach(([t, dx], i) => {
  svg += `<rect x="${CX + dx - 54}" y="${CY - 30}" width="108" height="46" rx="23" fill="#1b2150" stroke="#7585ff" stroke-width="1.5"/>
<text x="${CX + dx}" y="${CY + 1}" text-anchor="middle" font-family="${FONT}" font-size="19" font-weight="600" fill="#e3e8ff">${t}</text>`;
  if (i < 2) svg += `<path d="M${CX + dx + 58} ${CY - 7}h13" stroke="#aab8ff" stroke-width="2" marker-end="url(#arr)"/>`;
});
svg += `<text x="${CX}" y="${CY + 62}" text-anchor="middle" font-family="${FONT}" font-size="17" fill="#9aa8ff">memory  ·  planning  ·  guardrails</text>
<text x="${CX}" y="${CY + 92}" text-anchor="middle" font-family="${FONT}" font-size="17" fill="#9aa8ff">human approval where it matters</text>`;

for (const n of inputs) svg += node(...n);
for (const n of tools) svg += node(...n);

// Cloud layer under everything.
svg += `<rect x="90" y="700" width="1420" height="110" rx="22" fill="url(#cloud)" stroke="#6d7cff" stroke-opacity=".7" stroke-width="1.6"/>
<text x="${CX}" y="745" text-anchor="middle" font-family="${FONT}" font-size="24" font-weight="700" fill="#fff">Cloud infrastructure</text>`;
["Compute and GPUs", "Secure networking", "Data and storage", "Monitoring and scaling"].forEach((t, i) => {
  const x = 245 + i * 370;
  svg += `<rect x="${x - 150}" y="760" width="300" height="34" rx="17" fill="#0b0e1a" fill-opacity=".7" stroke="#4a58c9"/>
<text x="${x}" y="783" text-anchor="middle" font-family="${FONT}" font-size="17" fill="#d6dcff">${t}</text>`;
});
svg += `<path d="M${CX} ${CY + 120}V698" stroke="#aab8ff" stroke-opacity=".6" stroke-width="2" stroke-dasharray="3 8" stroke-linecap="round"/></svg>`;

await sharp(Buffer.from(svg)).webp({ quality: 88 }).toFile("public/images/services/cloud-ai-agent.webp");
console.log("ok");
