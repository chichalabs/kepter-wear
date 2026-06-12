// Generates placeholder product images: a flat dark tee on a neutral studio
// background with a per-product motif print. Replace with real photography by
// dropping files with the same names into /public/products.
import { mkdirSync, writeFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const outDir = join(root, "public", "products");
mkdirSync(outDir, { recursive: true });

const INK = "#141414";
const TEE = "#1d1d1d";
const TEE_EDGE = "#2a2a2a";
const BG = "#232323";
const BONE = "#ece9e2";
const ACCENT = "#2bbbb0";

// Per-product motif as inline SVG fragments centered around (300, 330),
// print area roughly 220x260.
const motifs = {
  "kepter-classic": `
    <g stroke="${BONE}" stroke-width="5" fill="none" stroke-linecap="round" stroke-linejoin="round">
      <path d="M260 360 q10 -55 55 -62 q40 -6 52 28 q8 26 -14 44 q-30 24 -68 12 q-20 -7 -25 -22 z"/>
      <path d="M315 298 q28 -26 58 -18"/>
      <circle cx="345" cy="318" r="4" fill="${BONE}" stroke="none"/>
    </g>`,
  qoshqar: `
    <g stroke="${BONE}" stroke-width="6" fill="none" stroke-linecap="round">
      <path d="M300 250 v160"/>
      <path d="M300 280 q-55 5 -58 50 q-2 38 32 40 q26 1 28 -24 q1 -18 -16 -20"/>
      <path d="M300 280 q55 5 58 50 q2 38 -32 40 q-26 1 -28 -24 q-1 -18 16 -20"/>
    </g>`,
  tulpar: `
    <g stroke="${BONE}" stroke-width="5" fill="none" stroke-linecap="round" stroke-linejoin="round">
      <path d="M235 390 q30 -40 55 -48 q-12 -28 8 -50 q18 -20 44 -16 q20 3 26 22 q30 4 38 26"/>
      <path d="M340 280 q22 -36 64 -42 q-14 30 -34 44"/>
      <path d="M290 342 q-26 18 -55 48 M330 350 q10 22 4 40"/>
    </g>`,
  shanyraq: `
    <g stroke="${BONE}" stroke-width="5" fill="none">
      <circle cx="300" cy="330" r="86"/>
      <circle cx="300" cy="330" r="58"/>
      <path d="M300 244 v172 M214 330 h172 M239 269 l122 122 M361 269 l-122 122"/>
    </g>`,
  "kok-bori": `
    <g stroke="${ACCENT}" stroke-width="5" fill="none" stroke-linecap="round" stroke-linejoin="round">
      <path d="M240 380 q5 -60 50 -82 l-10 -34 34 22 q30 -8 52 8 q24 18 22 48 q-2 34 -34 46 q-50 18 -114 -8 z"/>
      <circle cx="352" cy="320" r="4" fill="${ACCENT}" stroke="none"/>
    </g>`,
  aruana: `
    <g stroke="${BONE}" stroke-width="5" fill="none" stroke-linecap="round" stroke-linejoin="round">
      <path d="M232 392 q20 -10 26 -36 q5 -24 24 -30 q14 -36 36 -10 q22 -28 38 4 q22 10 18 40 q16 6 14 32"/>
      <path d="M258 392 v-18 M338 392 v-20 M368 392 v-16"/>
    </g>`,
  dala: `
    <g stroke="${BONE}" stroke-width="5" fill="none" stroke-linecap="round">
      <path d="M218 350 q40 -28 82 0 q42 28 82 0"/>
      <circle cx="300" cy="288" r="22" stroke="${ACCENT}"/>
    </g>`,
  "qus-joly": `
    <g fill="${BONE}">
      ${[
        [250, 420, 3], [268, 396, 2], [288, 372, 4], [305, 350, 2.5],
        [318, 326, 3.5], [330, 300, 2], [344, 276, 4], [356, 252, 2.5],
        [262, 360, 2], [296, 312, 2], [338, 338, 2.5], [310, 264, 2],
      ].map(([x, y, r]) => `<circle cx="${x}" cy="${y}" r="${r}"/>`).join("")}
      <circle cx="372" cy="236" r="6" fill="${ACCENT}"/>
    </g>`,
  baiterek: `
    <g stroke="${BONE}" stroke-width="5" fill="none" stroke-linecap="round">
      <path d="M300 430 v-130"/>
      <path d="M300 330 q-40 -16 -48 -56 M300 330 q40 -16 48 -56 M300 304 q-24 -12 -28 -44 M300 304 q24 -12 28 -44"/>
      <circle cx="300" cy="246" r="20" stroke="${ACCENT}"/>
    </g>`,
  koshpendi: `
    <g fill="${BONE}" font-family="Arial Black, Arial, sans-serif" font-weight="900">
      <text x="300" y="330" font-size="44" text-anchor="middle" letter-spacing="2">КӨШПЕНДІ</text>
      <text x="300" y="368" font-size="15" text-anchor="middle" fill="${ACCENT}" letter-spacing="6">KEPTER WEAR</text>
    </g>`,
};

function tee(motif, back) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 700">
  <rect width="600" height="700" fill="${BG}"/>
  <rect width="600" height="700" fill="url(#vign)"/>
  <defs>
    <radialGradient id="vign" cx="50%" cy="42%" r="75%">
      <stop offset="0%" stop-color="#2c2c2c"/><stop offset="100%" stop-color="#1c1c1c"/>
    </radialGradient>
  </defs>
  <g>
    <path d="M210 150 L150 190 L110 300 L175 330 L185 270 L185 580 q115 28 230 0 L415 270 L425 330 L490 300 L450 190 L390 150 q-40 28 -90 28 q-50 0 -90 -28 z"
      fill="${TEE}" stroke="${TEE_EDGE}" stroke-width="3"/>
    ${back
      ? `<path d="M236 158 q64 30 128 0 q-18 26 -64 26 q-46 0 -64 -26 z" fill="${INK}"/>`
      : `<path d="M236 158 q64 44 128 0 q-14 34 -64 34 q-50 0 -64 -34 z" fill="${INK}"/>`}
    <path d="M185 330 q-4 120 0 250 M415 330 q4 120 0 250" stroke="${TEE_EDGE}" stroke-width="2" fill="none"/>
    ${motif}
  </g>
</svg>`;
}

for (const slug of Object.keys(motifs)) {
  const motif = motifs[slug];
  // front: chest print (motif as-is); back: same motif scaled up
  writeFileSync(join(outDir, `${slug}-front.svg`), tee(motif, false));
  const backMotif = `<g transform="translate(300 340) scale(1.18) translate(-300 -330)">${motif}</g>`;
  writeFileSync(join(outDir, `${slug}-back.svg`), tee(backMotif, true));
  console.log(`${slug} ok`);
}
