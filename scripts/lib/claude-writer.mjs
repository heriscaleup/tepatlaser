// Real LLM content generation for Maya's autonomous blog publisher.
// Replaces the old generateArticleMarkdown() static template with an actual
// Claude call grounded in Tepat Laser's real business facts and the specific
// keyword/rank opportunity picked by opportunity-picker.mjs.
//
// Plain fetch, no SDK — matches this repo's zero-dependency script style.
// Required env var: ANTHROPIC_API_KEY.

const ANTHROPIC_API_URL = 'https://api.anthropic.com/v1/messages';
const DEFAULT_MODEL = process.env.MAYA_LLM_MODEL || 'claude-sonnet-5';
const ANTHROPIC_VERSION = '2023-06-01';

const BUSINESS_FACTS = `
- Nama bisnis: Tepat Laser (Tepat Laser Indonesia), workshop di Tangerang Selatan.
- Mesin: Fiber Laser hingga 12kW, CNC Router, Laser CO2, gas bantu Nitrogen (bebas dross, tepi mengkilap) atau Oksigen (plat tebal, ekonomis).
- Toleransi potong: ±0.02mm.
- Material yang dilayani: Plat besi/mild steel (1.2mm-12mm), Stainless steel 304/201 (0.8mm-6mm), ACP/Aluminium Composite Panel (3mm-4mm), Kayu MDF HMR (6mm-18mm), Akrilik (2mm-15mm).
- Layanan: pagar & gerbang custom, railing tangga/balkon, huruf timbul & signage, fasad gedung ACP, mihrab masjid & krawangan GRC, partisi ruangan, cutting plat besi per tonase/meter.
- Area layanan utama: Bintaro, BSD/Serpong, Tangerang Selatan, Jakarta Selatan, dan Jabodetabek (pickup/delivery armada sendiri).
- Estimasi pengerjaan: 1-3 hari kerja, ada opsi express 24 jam.
- Bisa bawa bahan sendiri (ongkos kerja) atau paket komplit dengan material bersertifikasi.
- Nesting CAD otomatis untuk efisiensi bahan hingga 92%.
`.trim();

function buildSystemPrompt() {
  return `Kamu adalah Maya, Lead SEO & Tech Copywriter untuk Tepat Laser (jasa laser cutting & fabrikasi custom di Tangerang Selatan, Indonesia). Kamu menulis artikel blog SEO yang akurat secara teknis, membumi, dan ditulis untuk pembaca Indonesia yang sedang riset sebelum order.

FAKTA BISNIS (WAJIB dipakai, jangan mengarang angka lain):
${BUSINESS_FACTS}

Tugasmu: tulis SATU artikel blog SEO baru yang menyasar keyword target yang diberikan, dengan tujuan mendorong halaman itu ke ranking #1 Google.

Balas HANYA dengan JSON valid (tanpa markdown code fence, tanpa teks lain di luar JSON), dengan struktur PERSIS ini:
{
  "title": string,
  "description": string (150-160 karakter, untuk meta description),
  "excerpt": string (ringkasan 1-2 kalimat),
  "category": string,
  "keyTakeaways": string[] (3-5 item, masing-masing 1 kalimat insight konkret),
  "relatedLinks": [{"title": string, "url": string}] (2-3 item, gunakan path relatif situs seperti "/pagar-laser-cutting/" atau "/harga-laser-cutting-per-meter/"),
  "faq": [{"question": string, "answer": string}] (3-4 item, pertanyaan yang benar-benar akan dicari calon pembeli),
  "bodyMarkdown": string (600-1000 kata, format Markdown dengan heading ##/###, minimal satu tabel, JANGAN sertakan frontmatter atau judul H1 di dalam body — mulai langsung dari heading H2 pertama)
}`;
}

function buildUserPrompt(target) {
  const rankContext = target.found
    ? `Saat ini halaman ${target.targetPage} berada di posisi #${target.position} untuk keyword ini (status: ${target.status}, ${target.impressions} impressions/28 hari). Tugasmu membantu mendorongnya ke #1.`
    : `Belum ada halaman yang ranking untuk keyword ini — ini adalah kesempatan konten baru dari nol.`;

  return `Keyword target: "${target.keyword}"
Halaman target: ${target.targetPage}
${rankContext}

Tulis artikel yang secara spesifik dan mendalam menjawab intent pencarian keyword ini, natural menyisipkan keyword target dan variasinya, dan mengarahkan pembaca untuk menghubungi Tepat Laser.`;
}

function extractJson(text) {
  const trimmed = text.trim();
  const fenced = trimmed.match(/^```(?:json)?\s*([\s\S]*?)\s*```$/);
  return fenced ? fenced[1] : trimmed;
}

function validateArticleJson(data) {
  const errors = [];
  if (!data || typeof data !== 'object') errors.push('response is not an object');
  else {
    if (typeof data.title !== 'string' || !data.title) errors.push('missing title');
    if (typeof data.description !== 'string' || !data.description) errors.push('missing description');
    if (typeof data.excerpt !== 'string' || !data.excerpt) errors.push('missing excerpt');
    if (typeof data.category !== 'string' || !data.category) errors.push('missing category');
    if (!Array.isArray(data.keyTakeaways) || data.keyTakeaways.length < 2 || data.keyTakeaways.length > 5) errors.push('keyTakeaways must have 2-5 items');
    if (!Array.isArray(data.relatedLinks) || data.relatedLinks.length < 2 || data.relatedLinks.length > 5) errors.push('relatedLinks must have 2-5 items');
    if (!Array.isArray(data.faq) || data.faq.length < 2 || data.faq.length > 5) errors.push('faq must have 2-5 items');
    if (typeof data.bodyMarkdown !== 'string' || data.bodyMarkdown.split(/\s+/).length < 300) errors.push('bodyMarkdown missing or too short');
  }
  return errors;
}

async function callGemini(system, user) {
  const apiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY;
  if (!apiKey) throw new Error('GEMINI_API_KEY is not configured');

  const model = process.env.MAYA_GEMINI_MODEL || 'gemini-3.6-flash';
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;

  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      system_instruction: { parts: [{ text: system }] },
      contents: [{ parts: [{ text: user }] }],
      generationConfig: {
        responseMimeType: 'application/json',
        temperature: 0.7,
      },
    }),
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(`Gemini API error: ${data.error?.message || res.status}`);
  }
  const text = data.candidates?.[0]?.content?.parts?.[0]?.text || '';
  return text;
}

async function callClaude(system, user) {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) throw new Error('ANTHROPIC_API_KEY is not configured');

  const res = await fetch(ANTHROPIC_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': apiKey,
      'anthropic-version': ANTHROPIC_VERSION
    },
    body: JSON.stringify({
      model: DEFAULT_MODEL,
      max_tokens: 4096,
      system,
      messages: [{ role: 'user', content: user }]
    })
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(`Claude API error: ${data.error?.message || res.status}`);
  }
  const text = (data.content || []).map(block => block.text || '').join('');
  return text;
}

async function callLlm(system, user) {
  if (process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY) {
    return callGemini(system, user);
  }
  if (process.env.ANTHROPIC_API_KEY) {
    return callClaude(system, user);
  }
  throw new Error('Neither GEMINI_API_KEY nor ANTHROPIC_API_KEY is configured');
}

/**
 * @param {object} target - one row from rank-tracker.mjs's checkAllRankings().results
 * @returns {Promise<object>} article JSON matching content.config.ts fields (minus image/publishDate/readTime, added by the caller)
 */
export async function generateArticle(target) {
  const system = buildSystemPrompt();
  const user = buildUserPrompt(target);

  let lastErrors = [];
  for (let attempt = 1; attempt <= 2; attempt += 1) {
    const raw = await callLlm(system, attempt === 1 ? user : `${user}\n\nCatatan: respons sebelumnya tidak valid (${lastErrors.join('; ')}). Balas ULANG hanya dengan JSON yang valid sesuai struktur yang diminta.`);
    let parsed;
    try {
      parsed = JSON.parse(extractJson(raw));
    } catch (e) {
      lastErrors = [`JSON parse failed: ${e.message}`];
      continue;
    }
    const errors = validateArticleJson(parsed);
    if (errors.length === 0) return parsed;
    lastErrors = errors;
  }

  throw new Error(`ai-writer: failed to get valid article JSON after 2 attempts: ${lastErrors.join('; ')}`);
}
