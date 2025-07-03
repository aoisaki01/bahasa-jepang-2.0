module.exports = {

"[project]/.next-internal/server/app/api/test/generate/route/actions.js [app-rsc] (server actions loader, ecmascript)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
}}),
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}}),
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}}),
"[project]/app/api/test/generate/route.ts [app-route] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "POST": (()=>POST)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$google$2f$generative$2d$ai$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@google/generative-ai/dist/index.mjs [app-route] (ecmascript)");
;
;
// import TestQuestion, { TestQuestion } from '@/app/test/page'; // Akan kita pindahkan tipe data ke halaman tes
// Inisialisasi Gemini
const genAI = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$google$2f$generative$2d$ai$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["GoogleGenerativeAI"](process.env.GEMINI_API_KEY || '');
// Fungsi untuk membuat prompt berdasarkan mode tes
function createPrompt(level, numQuestions, mode) {
    let instruction = '';
    switch(mode){
        case 'particle':
            instruction = `Buat soal tes untuk mengisi partikel yang rumpang, ditandai dengan (___). Pilihan jawaban harus berisi 4 partikel (misal: は, が, を, に, で, と, も), di mana salah satunya adalah jawaban yang benar. Jelaskan fungsi partikel yang benar dalam konteks kalimat tersebut.`;
            break;
        case 'jp-id':
            instruction = `Buat soal tes menerjemahkan kalimat atau frasa dari Bahasa Jepang ke Bahasa Indonesia. Pilihan jawaban harus berisi 4 opsi terjemahan dalam Bahasa Indonesia.`;
            break;
        case 'id-ja':
            instruction = `Buat soal tes menerjemahkan kalimat atau frasa dari Bahasa Indonesia ke Bahasa Jepang. Pilihan jawaban harus berisi 4 opsi terjemahan dalam Bahasa Jepang.`;
            break;
        case 'kanji-reading':
            instruction = `Buat soal tes untuk menebak cara baca sebuah kata Kanji. Berikan kalimat dan tandai satu kata Kanji. Pertanyaannya adalah tentang cara bacanya. Pilihan jawaban harus berisi 4 opsi cara baca dalam Hiragana.`;
            break;
        case 'kanji-meaning':
            instruction = `Buat soal tes untuk menebak arti sebuah kata Kanji. Berikan kalimat dan tandai satu kata Kanji. Pertanyaannya adalah tentang artinya. Pilihan jawaban harus berisi 4 opsi arti dalam Bahasa Indonesia.`;
            break;
        case 'bunpo':
        default:
            instruction = `Buat soal tes tentang pola kalimat (bunpo). Berikan kalimat dengan bagian pola kalimat yang rumpang (___). Pilihan jawaban harus berisi 4 opsi kelanjutan yang melengkapi pola kalimat tersebut secara gramatikal.`;
            break;
    }
    return `
    Buat sebuah tes JLPT level ${level} sebanyak ${numQuestions} soal dengan tipe "${mode}".
    ${instruction}
    
    Untuk setiap soal, berikan dalam format JSON yang valid dengan struktur berikut: "question", "options" (sebuah array dengan 4 string pilihan), "correctAnswer" (string jawaban yang benar persis seperti di dalam options), dan "explanation" (penjelasan detail dalam Bahasa Indonesia mengapa jawaban tersebut benar).
    Pastikan pilihan jawaban yang salah (distractors) masuk akal dan sering menjadi jebakan umum.
    Format output harus sebuah array JSON dari objek-objek soal.
  `;
}
async function POST(request) {
    try {
        const { level, numQuestions, testMode } = await request.json();
        if (!level || ![
            'N5',
            'N4',
            'N3',
            'N2',
            'N1'
        ].includes(level) || !testMode) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: 'Level atau Mode Tes tidak valid.'
            }, {
                status: 400
            });
        }
        const count = Math.min(Math.max(Number(numQuestions), 1), 20);
        const model = genAI.getGenerativeModel({
            model: "gemini-1.5-flash",
            generationConfig: {
                responseMimeType: "application/json"
            }
        });
        const prompt = createPrompt(level, count, testMode);
        console.log(`Generating test with mode: ${testMode}, level: ${level}`);
        const result = await model.generateContent(prompt);
        const response = result.response;
        const text = response.text();
        const testQuestions = JSON.parse(text);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json(testQuestions);
    } catch (error) {
        console.error("Gemini Test Generation Error:", error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: 'Gagal men-generate soal tes dari AI.'
        }, {
            status: 500
        });
    }
}
}}),

};

//# sourceMappingURL=%5Broot-of-the-server%5D__78fd22ce._.js.map