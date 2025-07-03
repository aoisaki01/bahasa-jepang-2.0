module.exports = {

"[project]/lib/characters.ts [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
// Data Hiragana Dasar
__turbopack_context__.s({
    "hiraganaData": (()=>hiraganaData),
    "kanjiData": (()=>kanjiData),
    "katakanaData": (()=>katakanaData)
});
const hiraganaData = [
    {
        char: 'あ',
        reading: 'a'
    },
    {
        char: 'い',
        reading: 'i'
    },
    {
        char: 'う',
        reading: 'u'
    },
    {
        char: 'え',
        reading: 'e'
    },
    {
        char: 'お',
        reading: 'o'
    },
    {
        char: 'か',
        reading: 'ka'
    },
    {
        char: 'き',
        reading: 'ki'
    },
    {
        char: 'く',
        reading: 'ku'
    },
    {
        char: 'け',
        reading: 'ke'
    },
    {
        char: 'こ',
        reading: 'ko'
    },
    {
        char: 'さ',
        reading: 'sa'
    },
    {
        char: 'し',
        reading: 'shi'
    },
    {
        char: 'す',
        reading: 'su'
    },
    {
        char: 'せ',
        reading: 'se'
    },
    {
        char: 'そ',
        reading: 'so'
    },
    {
        char: 'た',
        reading: 'ta'
    },
    {
        char: 'ち',
        reading: 'chi'
    },
    {
        char: 'つ',
        reading: 'tsu'
    },
    {
        char: 'て',
        reading: 'te'
    },
    {
        char: 'と',
        reading: 'to'
    },
    {
        char: 'な',
        reading: 'na'
    },
    {
        char: 'に',
        reading: 'ni'
    },
    {
        char: 'ぬ',
        'reading': 'nu'
    },
    {
        char: 'ね',
        reading: 'ne'
    },
    {
        char: 'の',
        reading: 'no'
    },
    {
        char: 'は',
        reading: 'ha'
    },
    {
        char: 'ひ',
        reading: 'hi'
    },
    {
        char: 'ふ',
        reading: 'fu'
    },
    {
        char: 'へ',
        reading: 'he'
    },
    {
        char: 'ほ',
        reading: 'ho'
    },
    {
        char: 'ま',
        reading: 'ma'
    },
    {
        char: 'み',
        reading: 'mi'
    },
    {
        char: 'む',
        'reading': 'mu'
    },
    {
        char: 'め',
        reading: 'me'
    },
    {
        char: 'も',
        reading: 'mo'
    },
    {
        char: 'や',
        reading: 'ya'
    },
    {
        char: 'ゆ',
        reading: 'yu'
    },
    {
        char: 'よ',
        reading: 'yo'
    },
    {
        char: 'ら',
        reading: 'ra'
    },
    {
        char: 'り',
        reading: 'ri'
    },
    {
        char: 'る',
        'reading': 'ru'
    },
    {
        char: 'れ',
        reading: 're'
    },
    {
        char: 'ろ',
        reading: 'ro'
    },
    {
        char: 'わ',
        reading: 'wa'
    },
    {
        char: 'を',
        reading: 'wo'
    },
    {
        char: 'ん',
        reading: 'n'
    }
];
const katakanaData = [
    {
        char: 'ア',
        reading: 'a'
    },
    {
        char: 'イ',
        reading: 'i'
    },
    {
        char: 'ウ',
        reading: 'u'
    },
    {
        char: 'エ',
        reading: 'e'
    },
    {
        char: 'オ',
        reading: 'o'
    },
    {
        char: 'カ',
        reading: 'ka'
    },
    {
        char: 'キ',
        reading: 'ki'
    },
    {
        char: 'ク',
        reading: 'ku'
    },
    {
        char: 'ケ',
        reading: 'ke'
    },
    {
        char: 'コ',
        reading: 'ko'
    },
    {
        char: 'サ',
        reading: 'sa'
    },
    {
        char: 'シ',
        reading: 'shi'
    },
    {
        char: 'ス',
        reading: 'su'
    },
    {
        char: 'セ',
        reading: 'se'
    },
    {
        char: 'ソ',
        reading: 'so'
    },
    {
        char: 'タ',
        reading: 'ta'
    },
    {
        char: 'チ',
        reading: 'chi'
    },
    {
        char: 'ツ',
        reading: 'tsu'
    },
    {
        char: 'テ',
        reading: 'te'
    },
    {
        char: 'ト',
        reading: 'to'
    },
    {
        char: 'ナ',
        reading: 'na'
    },
    {
        char: 'ニ',
        reading: 'ni'
    },
    {
        char: 'ヌ',
        'reading': 'nu'
    },
    {
        char: 'ネ',
        reading: 'ne'
    },
    {
        char: 'ノ',
        reading: 'no'
    },
    {
        char: 'ハ',
        reading: 'ha'
    },
    {
        char: 'ヒ',
        reading: 'hi'
    },
    {
        char: 'フ',
        reading: 'fu'
    },
    {
        char: 'ヘ',
        reading: 'he'
    },
    {
        char: 'ホ',
        reading: 'ho'
    },
    {
        char: 'マ',
        reading: 'ma'
    },
    {
        char: 'ミ',
        reading: 'mi'
    },
    {
        char: 'ム',
        'reading': 'mu'
    },
    {
        char: 'メ',
        reading: 'me'
    },
    {
        char: 'モ',
        reading: 'mo'
    },
    {
        char: 'ヤ',
        reading: 'ya'
    },
    {
        char: 'ユ',
        reading: 'yu'
    },
    {
        char: 'ヨ',
        reading: 'yo'
    },
    {
        char: 'ラ',
        reading: 'ra'
    },
    {
        char: 'リ',
        reading: 'ri'
    },
    {
        char: 'ル',
        'reading': 'ru'
    },
    {
        char: 'レ',
        reading: 're'
    },
    {
        char: 'ロ',
        reading: 'ro'
    },
    {
        char: 'ワ',
        reading: 'wa'
    },
    {
        char: 'ヲ',
        reading: 'wo'
    },
    {
        char: 'ン',
        reading: 'n'
    }
];
const kanjiData = [
    {
        char: '一',
        reading: 'いち'
    },
    {
        char: '二',
        reading: 'に'
    },
    {
        char: '三',
        reading: 'さん'
    },
    {
        char: '四',
        reading: 'し'
    },
    {
        char: '五',
        reading: 'ご'
    },
    {
        char: '六',
        reading: 'ろく'
    },
    {
        char: '七',
        reading: 'しち'
    },
    {
        char: '八',
        reading: 'はち'
    },
    {
        char: '九',
        reading: 'きゅう'
    },
    {
        char: '十',
        reading: 'じゅう'
    },
    {
        char: '日',
        reading: 'ひ'
    },
    {
        char: '月',
        reading: 'つき'
    },
    {
        char: '火',
        reading: 'ひ'
    },
    {
        char: '水',
        reading: 'みず'
    },
    {
        char: '木',
        reading: 'き'
    },
    {
        char: '金',
        reading: 'かね'
    },
    {
        char: '土',
        reading: 'つち'
    },
    {
        char: '人',
        reading: 'ひと'
    },
    {
        char: '時',
        reading: 'とき'
    },
    {
        char: '分',
        reading: 'ふん'
    },
    {
        char: '上',
        reading: 'うえ'
    },
    {
        char: '下',
        reading: 'した'
    },
    {
        char: '中',
        reading: 'なか'
    },
    {
        char: '円',
        reading: 'えん'
    },
    {
        char: '入',
        reading: 'はい'
    }
];
}}),
"[project]/app/guess/page.tsx [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>GuessingGamePage)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/components/AnimatePresence/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$characters$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/characters.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2d$big$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/circle-check-big.js [app-ssr] (ecmascript) <export default as CheckCircle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$x$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__XCircle$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/circle-x.js [app-ssr] (ecmascript) <export default as XCircle>");
'use client';
;
;
;
;
;
// Helper function untuk mengacak array
const shuffleArray = (array)=>{
    return [
        ...array
    ].sort(()=>Math.random() - 0.5);
};
function GuessingGamePage() {
    const [mode, setMode] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [question, setQuestion] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [options, setOptions] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [score, setScore] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(0);
    const [feedback, setFeedback] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [answered, setAnswered] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const generateQuestion = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((gameMode)=>{
        let dataPool = [];
        let isKanjiMode = false;
        if (gameMode === 'hiragana') dataPool = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$characters$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["hiraganaData"];
        else if (gameMode === 'katakana') dataPool = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$characters$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["katakanaData"];
        else if (gameMode === 'kanji') {
            dataPool = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$characters$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["kanjiData"];
            isKanjiMode = true;
        }
        if (dataPool.length === 0) return;
        // Pilih jawaban yang benar
        const correctIndex = Math.floor(Math.random() * dataPool.length);
        const correctAnswer = dataPool[correctIndex];
        setQuestion(correctAnswer);
        // Buat pilihan jawaban
        const choices = [
            correctAnswer.reading
        ];
        while(choices.length < 6){
            const randomIndex = Math.floor(Math.random() * dataPool.length);
            const randomOption = dataPool[randomIndex].reading;
            if (!choices.includes(randomOption)) {
                choices.push(randomOption);
            }
        }
        setOptions(shuffleArray(choices));
        setFeedback(null);
        setAnswered(false);
    }, []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (mode) {
            generateQuestion(mode);
        }
    }, [
        mode,
        generateQuestion
    ]);
    const handleAnswer = (selectedOption)=>{
        if (answered) return;
        setAnswered(true);
        if (selectedOption === question?.reading) {
            setFeedback('correct');
            setScore((s)=>s + 10);
        } else {
            setFeedback('incorrect');
        }
        // Lanjut ke pertanyaan berikutnya setelah 1.5 detik
        setTimeout(()=>generateQuestion(mode), 1500);
    };
    const handleModeSelect = (selectedMode)=>{
        setMode(selectedMode);
        setScore(0);
    };
    // UI untuk memilih mode game
    const renderModeSelection = ()=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
            initial: {
                opacity: 0,
                y: 20
            },
            animate: {
                opacity: 1,
                y: 0
            },
            className: "text-center",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                    className: "text-4xl font-bold mb-2",
                    children: "Tebak Karakter"
                }, void 0, false, {
                    fileName: "[project]/app/guess/page.tsx",
                    lineNumber: 85,
                    columnNumber: 7
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "text-gray-500 mb-8",
                    children: "Pilih mode permainan."
                }, void 0, false, {
                    fileName: "[project]/app/guess/page.tsx",
                    lineNumber: 86,
                    columnNumber: 7
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "grid grid-cols-1 md:grid-cols-3 gap-4",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: ()=>handleModeSelect('hiragana'),
                            className: "p-8 border rounded-lg hover:bg-gray-100",
                            children: "HIRAGANA"
                        }, void 0, false, {
                            fileName: "[project]/app/guess/page.tsx",
                            lineNumber: 88,
                            columnNumber: 9
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: ()=>handleModeSelect('katakana'),
                            className: "p-8 border rounded-lg hover:bg-gray-100",
                            children: "KATAKANA"
                        }, void 0, false, {
                            fileName: "[project]/app/guess/page.tsx",
                            lineNumber: 89,
                            columnNumber: 9
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: ()=>handleModeSelect('kanji'),
                            className: "p-8 border rounded-lg hover:bg-gray-100",
                            children: "KANJI (N5)"
                        }, void 0, false, {
                            fileName: "[project]/app/guess/page.tsx",
                            lineNumber: 90,
                            columnNumber: 9
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/guess/page.tsx",
                    lineNumber: 87,
                    columnNumber: 7
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/app/guess/page.tsx",
            lineNumber: 84,
            columnNumber: 5
        }, this);
    // UI untuk game
    const renderGame = ()=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
            initial: {
                opacity: 0,
                scale: 0.9
            },
            animate: {
                opacity: 1,
                scale: 1
            },
            className: "flex flex-col items-center",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "w-full flex justify-between items-center mb-8",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: ()=>setMode(null),
                            className: "text-sm text-gray-500 hover:text-gray-800",
                            children: "‹ Ganti Mode"
                        }, void 0, false, {
                            fileName: "[project]/app/guess/page.tsx",
                            lineNumber: 99,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-lg font-bold",
                            children: [
                                "Skor: ",
                                score
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/guess/page.tsx",
                            lineNumber: 100,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/guess/page.tsx",
                    lineNumber: 98,
                    columnNumber: 7
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "w-64 h-64 border-2 rounded-xl flex items-center justify-center mb-8 relative",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-8xl font-bold",
                            children: question?.char
                        }, void 0, false, {
                            fileName: "[project]/app/guess/page.tsx",
                            lineNumber: 103,
                            columnNumber: 9
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AnimatePresence"], {
                            children: [
                                feedback === 'correct' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                                    initial: {
                                        scale: 0,
                                        opacity: 0
                                    },
                                    animate: {
                                        scale: 1,
                                        opacity: 1
                                    },
                                    exit: {
                                        scale: 0,
                                        opacity: 0
                                    },
                                    className: "absolute inset-0 bg-green-500/80 rounded-xl flex items-center justify-center",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2d$big$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle$3e$__["CheckCircle"], {
                                        size: 80,
                                        className: "text-white"
                                    }, void 0, false, {
                                        fileName: "[project]/app/guess/page.tsx",
                                        lineNumber: 107,
                                        columnNumber: 13
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/app/guess/page.tsx",
                                    lineNumber: 106,
                                    columnNumber: 11
                                }, this),
                                feedback === 'incorrect' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                                    initial: {
                                        scale: 0,
                                        opacity: 0
                                    },
                                    animate: {
                                        scale: 1,
                                        opacity: 1
                                    },
                                    exit: {
                                        scale: 0,
                                        opacity: 0
                                    },
                                    className: "absolute inset-0 bg-red-500/80 rounded-xl flex items-center justify-center",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$x$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__XCircle$3e$__["XCircle"], {
                                        size: 80,
                                        className: "text-white"
                                    }, void 0, false, {
                                        fileName: "[project]/app/guess/page.tsx",
                                        lineNumber: 111,
                                        columnNumber: 13
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/app/guess/page.tsx",
                                    lineNumber: 110,
                                    columnNumber: 11
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/guess/page.tsx",
                            lineNumber: 104,
                            columnNumber: 9
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/guess/page.tsx",
                    lineNumber: 102,
                    columnNumber: 7
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "grid grid-cols-2 md:grid-cols-3 gap-4 w-full max-w-xl",
                    children: options.map((option)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: ()=>handleAnswer(option),
                            disabled: answered,
                            className: `p-4 border rounded-lg text-xl font-semibold transition-colors disabled:opacity-70 
              ${answered && option === question?.reading ? 'bg-green-500 text-white border-green-500' : ''}
              ${answered && option !== question?.reading ? 'bg-gray-100 text-gray-400' : 'hover:bg-sky-100'}`,
                            children: option
                        }, option, false, {
                            fileName: "[project]/app/guess/page.tsx",
                            lineNumber: 117,
                            columnNumber: 11
                        }, this))
                }, void 0, false, {
                    fileName: "[project]/app/guess/page.tsx",
                    lineNumber: 115,
                    columnNumber: 7
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/app/guess/page.tsx",
            lineNumber: 97,
            columnNumber: 5
        }, this);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "w-full",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AnimatePresence"], {
            mode: "wait",
            children: mode ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                children: renderGame()
            }, "game", false, {
                fileName: "[project]/app/guess/page.tsx",
                lineNumber: 136,
                columnNumber: 11
            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                children: renderModeSelection()
            }, "selection", false, {
                fileName: "[project]/app/guess/page.tsx",
                lineNumber: 138,
                columnNumber: 11
            }, this)
        }, void 0, false, {
            fileName: "[project]/app/guess/page.tsx",
            lineNumber: 134,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/app/guess/page.tsx",
        lineNumber: 133,
        columnNumber: 5
    }, this);
}
}}),
"[project]/node_modules/lucide-react/dist/esm/icons/circle-check-big.js [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
/**
 * @license lucide-react v0.525.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ __turbopack_context__.s({
    "__iconNode": (()=>__iconNode),
    "default": (()=>CircleCheckBig)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/createLucideIcon.js [app-ssr] (ecmascript)");
;
const __iconNode = [
    [
        "path",
        {
            d: "M21.801 10A10 10 0 1 1 17 3.335",
            key: "yps3ct"
        }
    ],
    [
        "path",
        {
            d: "m9 11 3 3L22 4",
            key: "1pflzl"
        }
    ]
];
const CircleCheckBig = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])("circle-check-big", __iconNode);
;
 //# sourceMappingURL=circle-check-big.js.map
}}),
"[project]/node_modules/lucide-react/dist/esm/icons/circle-check-big.js [app-ssr] (ecmascript) <export default as CheckCircle>": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "CheckCircle": (()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2d$big$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2d$big$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/circle-check-big.js [app-ssr] (ecmascript)");
}}),
"[project]/node_modules/lucide-react/dist/esm/icons/circle-x.js [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
/**
 * @license lucide-react v0.525.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ __turbopack_context__.s({
    "__iconNode": (()=>__iconNode),
    "default": (()=>CircleX)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/createLucideIcon.js [app-ssr] (ecmascript)");
;
const __iconNode = [
    [
        "circle",
        {
            cx: "12",
            cy: "12",
            r: "10",
            key: "1mglay"
        }
    ],
    [
        "path",
        {
            d: "m15 9-6 6",
            key: "1uzhvr"
        }
    ],
    [
        "path",
        {
            d: "m9 9 6 6",
            key: "z0biqf"
        }
    ]
];
const CircleX = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])("circle-x", __iconNode);
;
 //# sourceMappingURL=circle-x.js.map
}}),
"[project]/node_modules/lucide-react/dist/esm/icons/circle-x.js [app-ssr] (ecmascript) <export default as XCircle>": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "XCircle": (()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$x$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$x$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/circle-x.js [app-ssr] (ecmascript)");
}}),

};

//# sourceMappingURL=_6e1a58ef._.js.map