const AFFIRMATIONS = [
    "Your sparkle is study-proof!",
    "Glamour and grit? You own both.",
    "Every concept bows to your brilliance.",
    "Heels high, focus higher.",
    "Sweet success tastes like white chocolate victory.",
];

const ROUND_TEMPLATES = [
    {
        title: "Blushing Blueprint",
        scene: "You step into the Pink Study Lounge, walls shimmering with rose quartz hues. On a velvet chaise rests today's focus: {task}.",
        options: [
            {
                label: "Rosy Flashcard Atelier",
                description: "Transform today's notes into dreamy digital flashcards with pastel gradients and flip animations.",
                technique: "Feed a CSV or PDF into the generator to craft a browser-ready flashcard deck.",
                boost: 4,
                action: "atelier",
            },
            {
                label: "Velvet Vision Board",
                description: "Sketch the cutest storyboard for this concept while high-heeled bookmarks keep your notes in line. Group key ideas into three spotlight moments.",
                technique: "Create a mini mind-map using colors: blush for main ideas, champagne for details.",
                boost: 3,
            },
            {
                label: "Cotton Candy Countdown",
                description: "Set a 15-minute timer, nibble on white chocolate bark, and race the clock to capture the juiciest facts before the bell.",
                technique: "Sprint-study for 15 minutes, then spend 3 minutes summarizing the highlights aloud.",
                boost: 2,
            },
            {
                label: "Blossom Buddy Notes",
                description: "Invite your inner glam squad: narrate the topic like a runway host while noting three dazzling takeaways to text your study partner.",
                technique: "Teach it back in your own words and voice-record the recap for later replays.",
                boost: 4,
            },
        ],
    },
    {
        title: "Heel Haute Hustle",
        scene: "Marble runways guide you to the Focus Atrium. Strappy stilettos click with determination as the next sparkle mission emerges: {task}.",
        options: [
            {
                label: "Runway Rehearsal",
                description: "Strut through flashcards like they're finale looks. Each confident answer earns a salty caramel star pinned to your sash.",
                technique: "Flip each card twice: once for recall, once to explain why it matters.",
                boost: 3,
            },
            {
                label: "Glossy Grid Shuffle",
                description: "Lay your notes out like a boutique display, matching concepts to their glam partners.",
                technique: "Use a table: column one for terms, column two for glittery real-life examples.",
                boost: 2,
            },
            {
                label: "Stiletto Stepbacks",
                description: "Every 10 minutes, pause, breathe, adjust the tiara, and ask: 'What's the boldest idea I'm wearing right now?'.",
                technique: "Cycle focus with three Pomodoro rounds, celebrating each break with a stretch pose.",
                boost: 4,
            },
        ],
    },
    {
        title: "Caramel Cloud Cooldown",
        scene: "The lounge melts into a dessert lab. Crystal jars of white chocolate pearls glow softly while a salted caramel fountain hums beside {task}.",
        options: [
            {
                label: "Sweet Synthesis",
                description: "Blend the topic into a parfait by stacking key ideas, supporting sprinkles, and a cherry summary on top.",
                technique: "Summarize the chapter in five glitter-bullets, bolding the must-remember gems.",
                boost: 3,
            },
            {
                label: "Treat Yourself Test",
                description: "Quiz yourself with sugar-sweet questions. Each correct answer earns a drizzle of caramel confidence.",
                technique: "Draft five self-check questions and answer them dramatically in the mirror.",
                boost: 4,
            },
            {
                label: "Glow Journal Moment",
                description: "Jot three moments you felt genuinely beautiful mastering this material. Seal it with a kiss of gratitude.",
                technique: "Reflect in a journal: write one sensory detail, one insight, one proud mantra.",
                boost: 2,
            },
        ],
    },
];

const THEMES = {
    "sugar-bloom": {
        background: "linear-gradient(160deg, #ffe3ec 0%, #fff7f2 35%, #e8f6ff 100%)",
        cardBg: "rgba(255, 255, 255, 0.88)",
        cardBorder: "1px solid rgba(252, 165, 189, 0.5)",
        accent: "#ec4899",
        accentSoft: "rgba(236, 72, 153, 0.08)",
        shadow: "0 20px 34px rgba(236, 72, 153, 0.18)",
        font: "'Poppins', 'Segoe UI', sans-serif",
    },
    "mint-glow": {
        background: "linear-gradient(150deg, #d5f5ee 0%, #fdf1ff 50%, #f7fffb 100%)",
        cardBg: "rgba(255, 255, 255, 0.92)",
        cardBorder: "1px solid rgba(132, 225, 173, 0.55)",
        accent: "#38bdf8",
        accentSoft: "rgba(56, 189, 248, 0.08)",
        shadow: "0 24px 40px rgba(56, 189, 248, 0.16)",
        font: "'Nunito', 'Segoe UI', sans-serif",
    },
};

const loungeState = {
    name: "Emilija",
    tasks: [],
    roundIndex: 0,
    sparklePoints: 0,
    selections: [],
};

const atelierState = {
    uploadedCards: [],
    manualCards: [],
    combinedCards: [],
    previewUrl: null,
    deckHtml: "",
};

const heroButton = document.querySelector('[data-action="scroll-to-setup"]');
const setupSection = document.getElementById("setup");
const setupForm = document.getElementById("setupForm");
const roundsSection = document.getElementById("rounds");
const recapSection = document.getElementById("recap");
const optionGrid = document.getElementById("optionGrid");
const optionTemplate = document.getElementById("optionTemplate");
const techniqueCard = document.getElementById("techniqueCard");
const techniqueText = document.getElementById("techniqueText");
const affirmationText = document.getElementById("affirmationText");
const roundTitle = document.getElementById("roundTitle");
const roundScene = document.getElementById("roundScene");
const nextRoundButton = document.getElementById("nextRoundButton");
const recapIntro = document.getElementById("recapIntro");
const recapList = document.getElementById("recapList");
const recapSummary = document.getElementById("recapSummary");
const restartButton = document.getElementById("restartButton");
const downloadSessionButton = document.getElementById("downloadSessionButton");

// Atelier elements
const atelierModal = document.getElementById("atelierModal");
const deckTitleInput = document.getElementById("deckTitle");
const deckSubtitleInput = document.getElementById("deckSubtitle");
const deckThemeSelect = document.getElementById("deckTheme");
const deckLimitInput = document.getElementById("deckLimit");
const shuffleDeckInput = document.getElementById("shuffleDeck");
const csvInput = document.getElementById("csvInput");
const pdfInput = document.getElementById("pdfInput");
const manualCardList = document.getElementById("manualCardList");
const manualCardTemplate = document.getElementById("manualCardTemplate");
const addManualCardBtn = document.getElementById("addManualCard");
const generateDeckBtn = document.getElementById("generateDeck");
const downloadDeckBtn = document.getElementById("downloadDeck");
const deckPreview = document.getElementById("deckPreview");
const previewFrame = document.getElementById("previewFrame");
const atelierStatus = document.getElementById("atelierStatus");

if (window.pdfjsLib) {
    window.pdfjsLib.GlobalWorkerOptions.workerSrc = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.5.141/pdf.worker.min.js";
}

if (heroButton) {
    heroButton.addEventListener("click", () => {
        setupSection.scrollIntoView({ behavior: "smooth" });
    });
}

setupForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const nameInput = setupForm.querySelector('input[name="name"]');
    const taskInputs = Array.from(setupForm.querySelectorAll('input[name="task"]'));

    const tasks = taskInputs
        .map((input) => input.value.trim())
        .filter((value) => value.length > 0)
        .slice(0, 3);

    if (tasks.length === 0) {
        taskInputs[0].setCustomValidity("At least one sparkling task is needed.");
        taskInputs[0].reportValidity();
        taskInputs[0].setCustomValidity("");
        return;
    }

    loungeState.name = nameInput && nameInput.value.trim() ? nameInput.value.trim() : "Emilija";
    loungeState.tasks = tasks;
    loungeState.roundIndex = 0;
    loungeState.sparklePoints = 0;
    loungeState.selections = [];

    setupSection.classList.add("panel--hidden");
    recapSection.classList.remove("panel--hidden");
    recapSection.classList.add("panel--hidden");
    roundsSection.classList.remove("panel--hidden");
    techniqueCard.classList.add("panel--hidden");

    renderRound();
    roundsSection.scrollIntoView({ behavior: "smooth" });
});

function renderRound() {
    const { roundIndex, tasks } = loungeState;
    const roundsAvailable = Math.min(tasks.length, ROUND_TEMPLATES.length) || 1;

    if (roundIndex >= roundsAvailable) {
        showRecap();
        return;
    }

    const roundData = ROUND_TEMPLATES[roundIndex];
    const currentTask = tasks[roundIndex] || "daydreaming up your next big idea";

    roundTitle.textContent = `Round ${roundIndex + 1} · ${roundData.title}`;
    roundScene.textContent = roundData.scene.replace("{task}", currentTask);

    optionGrid.innerHTML = "";
    roundData.options.forEach((option, index) => {
        const node = optionTemplate.content.firstElementChild.cloneNode(true);
        const titleEl = node.querySelector(".option-card__title");
        const bodyEl = node.querySelector(".option-card__body");
        const buttonEl = node.querySelector("button");
        if (titleEl) titleEl.textContent = option.label;
        if (bodyEl) bodyEl.textContent = option.description;
        if (buttonEl) {
            buttonEl.dataset.optionIndex = String(index);
            buttonEl.addEventListener("click", () => handleOptionSelect(option));
        }
        optionGrid.appendChild(node);
    });

    techniqueCard.classList.add("panel--hidden");
}

function handleOptionSelect(option) {
    techniqueText.textContent = option.technique;
    affirmationText.textContent = randomChoice(AFFIRMATIONS);
    techniqueCard.classList.remove("panel--hidden");

    loungeState.sparklePoints += option.boost || 0;
    const roundData = ROUND_TEMPLATES[loungeState.roundIndex];
    const currentTask = loungeState.tasks[loungeState.roundIndex] || "daydreaming up your next big idea";

    loungeState.selections.push({
        round: roundData.title,
        task: currentTask,
        option: option.label,
        technique: option.technique,
        boost: option.boost,
    });

    if (option.action === "atelier") {
        openAtelierModal(currentTask);
    }

    nextRoundButton.focus();
}

nextRoundButton.addEventListener("click", () => {
    loungeState.roundIndex += 1;
    renderRound();
});

function showRecap() {
    roundsSection.classList.add("panel--hidden");
    techniqueCard.classList.add("panel--hidden");
    recapSection.classList.remove("panel--hidden");

    const { name, tasks, sparklePoints, selections } = loungeState;
    recapList.innerHTML = "";

    tasks.forEach((task) => {
        const item = document.createElement("li");
        item.textContent = `♡ ${task}`;
        recapList.appendChild(item);
    });

    const vibe = sparklePoints >= 10 ? "Effortlessly Elegant" : sparklePoints >= 7 ? "Sweetly Focused" : "Soft Start";
    recapIntro.textContent = `${name}, you glided through ${tasks.length} study quest${tasks.length === 1 ? "" : "s"}.`;
    recapSummary.textContent = `Your aura reads ${vibe}. Keep pairing gorgeous aesthetics with mindful breaks to turn every subject into a personal runway.`;

    recapSection.scrollIntoView({ behavior: "smooth" });
}

restartButton.addEventListener("click", () => {
    setupForm.reset();
    loungeState.roundIndex = 0;
    loungeState.sparklePoints = 0;
    loungeState.selections = [];
    loungeState.tasks = [];

    recapSection.classList.add("panel--hidden");
    roundsSection.classList.add("panel--hidden");
    techniqueCard.classList.add("panel--hidden");
    setupSection.classList.remove("panel--hidden");
    window.scrollTo({ top: 0, behavior: "smooth" });
});

downloadSessionButton.addEventListener("click", () => {
    if (!loungeState.selections.length) {
        return;
    }
    const { name, tasks, sparklePoints, selections } = loungeState;
    const vibe = sparklePoints >= 10 ? "Effortlessly Elegant" : sparklePoints >= 7 ? "Sweetly Focused" : "Soft Start";
    const lines = [
        "Sparkle Study Lounge Session",
        "--------------------------------",
        `Guest: ${name}`,
        "",
        "Tasks:",
        ...tasks.map((task, index) => `${index + 1}. ${task}`),
        "",
        "Highlights:",
        ...selections.map((pick, index) => `${index + 1}. ${pick.round} · ${pick.option} (+${pick.boost})\n   Task: ${pick.task}\n   Technique: ${pick.technique}`),
        "",
        `Sparkle Points: ${sparklePoints}`,
        `Aura: ${vibe}`,
        "",
        "Stay radiant!",
    ];

    const blob = new Blob([lines.join("\n")], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${slugify(name)}-sparkle-session.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
});

function randomChoice(list) {
    return list[Math.floor(Math.random() * list.length)];
}

function slugify(value) {
    return value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "") || "sparkle";
}

// Atelier modal handling
function openAtelierModal(taskName) {
    atelierModal.classList.add("is-open");
    atelierModal.setAttribute("aria-hidden", "false");
    const defaultTitle = taskName ? `${taskName} Flashcards` : "Sparkle Session";
    if (!deckTitleInput.value.trim()) {
        deckTitleInput.value = defaultTitle;
    }
    requestAnimationFrame(() => {
        deckTitleInput.focus();
    });
}

function closeAtelierModal() {
    atelierModal.classList.remove("is-open");
    atelierModal.setAttribute("aria-hidden", "true");
}

atelierModal.addEventListener("click", (event) => {
    const target = event.target;
    if (target instanceof HTMLElement && target.hasAttribute("data-close-atlier")) {
        closeAtelierModal();
    }
});

const closeButton = atelierModal.querySelector(".modal__close");
if (closeButton) {
    closeButton.addEventListener("click", () => closeAtelierModal());
}

document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && atelierModal.classList.contains("is-open")) {
        closeAtelierModal();
    }
});

addManualCardBtn.addEventListener("click", () => {
    const node = manualCardTemplate.content.firstElementChild.cloneNode(true);
    const removeBtn = node.querySelector(".manual-card__remove");
    if (removeBtn) {
        removeBtn.addEventListener("click", () => {
            node.remove();
        });
    }
    manualCardList.appendChild(node);
});

csvInput.addEventListener("change", async () => {
    const file = csvInput.files && csvInput.files[0];
    if (!file) return;
    try {
        const cards = await parseCsvFile(file);
        atelierState.uploadedCards = cards;
        setAtelierStatus(`Added ${cards.length} cards from CSV.`, "success");
    } catch (error) {
        setAtelierStatus(error instanceof Error ? error.message : "Cannot read that CSV.", "error");
    }
    csvInput.value = "";
});

pdfInput.addEventListener("change", async () => {
    const file = pdfInput.files && pdfInput.files[0];
    if (!file) return;
    if (!window.pdfjsLib) {
        setAtelierStatus("PDF support couldn't load. Try a CSV instead.", "error");
        return;
    }
    try {
        const cards = await parsePdfFile(file);
        atelierState.uploadedCards = cards;
        setAtelierStatus(`Added ${cards.length} cards from PDF.`, "success");
    } catch (error) {
        setAtelierStatus(error instanceof Error ? error.message : "Cannot read that PDF.", "error");
    }
    pdfInput.value = "";
});

generateDeckBtn.addEventListener("click", () => {
    try {
        const cards = collectDeckCards();
        if (!cards.length) {
            setAtelierStatus("Add cards via CSV, PDF, or manual entry before generating.", "error");
            return;
        }
        const options = {
            title: deckTitleInput.value.trim() || "Sparkle Session",
            subtitle: deckSubtitleInput.value.trim(),
            theme: deckThemeSelect.value,
            shuffle: shuffleDeckInput.checked,
            limit: parseLimit(deckLimitInput.value),
        };
        let prepared = [...cards];
        if (options.shuffle) {
            prepared = shuffleArray(prepared);
        }
        if (options.limit) {
            prepared = prepared.slice(0, options.limit);
        }
        const html = buildDeckHtml(prepared, options);
        atelierState.combinedCards = prepared;
        atelierState.deckHtml = html;
        setAtelierStatus(`Deck ready with ${prepared.length} card${prepared.length === 1 ? "" : "s"}.`, "success");
        showDeckPreview(html);
        downloadDeckBtn.disabled = false;
    } catch (error) {
        downloadDeckBtn.disabled = true;
        setAtelierStatus(error instanceof Error ? error.message : "Something went glitter-wrong.", "error");
    }
});

downloadDeckBtn.addEventListener("click", () => {
    if (!atelierState.deckHtml) return;
    const title = deckTitleInput.value.trim() || "Sparkle Deck";
    const blob = new Blob([atelierState.deckHtml], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${slugify(title)}-flashcards.html`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
});

function collectDeckCards() {
    const manualCards = Array.from(manualCardList.querySelectorAll(".manual-card")).map((card) => {
        const prompt = card.querySelector(".manual-card__prompt");
        const answer = card.querySelector(".manual-card__answer");
        const hint = card.querySelector(".manual-card__hint");
        const promptText = prompt && prompt.value.trim();
        const answerText = answer && answer.value.trim();
        if (!promptText || !answerText) {
            throw new Error("Manual cards need both prompt and answer.");
        }
        return {
            prompt: promptText,
            answer: answerText,
            hint: hint && hint.value.trim() ? hint.value.trim() : undefined,
        };
    });
    atelierState.manualCards = manualCards;
    const combined = [...atelierState.uploadedCards, ...manualCards];
    return combined;
}

function parseLimit(raw) {
    if (!raw) return null;
    const value = Number(raw);
    if (!Number.isFinite(value) || value <= 0) {
        throw new Error("Card limit needs to be a positive number.");
    }
    return Math.floor(value);
}

function setAtelierStatus(message, tone = "info") {
    if (!atelierStatus) return;
    atelierStatus.textContent = message;
    atelierStatus.classList.remove("is-error", "is-success");
    if (tone === "error") {
        atelierStatus.classList.add("is-error");
    } else if (tone === "success") {
        atelierStatus.classList.add("is-success");
    }
}

function showDeckPreview(html) {
    if (atelierState.previewUrl) {
        URL.revokeObjectURL(atelierState.previewUrl);
        atelierState.previewUrl = null;
    }
    const blob = new Blob([html], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    atelierState.previewUrl = url;
    previewFrame.src = url;
    deckPreview.classList.remove("panel--hidden");
}

function shuffleArray(list) {
    const copy = [...list];
    for (let i = copy.length - 1; i > 0; i -= 1) {
        const j = Math.floor(Math.random() * (i + 1));
        [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
}

async function parseCsvFile(file) {
    const text = await readFileAsText(file);
    const rows = parseCsv(text);
    if (!rows.length) {
        throw new Error("No rows detected in that CSV.");
    }
    const headers = rows[0];
    const dataRows = rows.slice(1);
    if (!headers || headers.length < 2) {
        throw new Error("CSV needs at least question and answer columns.");
    }
    const mapping = mapCsvHeaders(headers);
    const cards = [];
    dataRows.forEach((row) => {
        const prompt = (row[mapping.prompt] || "").trim();
        const answer = (row[mapping.answer] || "").trim();
        const hint = mapping.hint != null ? (row[mapping.hint] || "").trim() : "";
        if (!prompt && !answer) return;
        cards.push({ prompt, answer, hint: hint || undefined });
    });
    if (!cards.length) {
        throw new Error("No usable cards were found in the CSV.");
    }
    return cards;
}

function parseCsv(text) {
    const rows = [];
    let current = [];
    let field = "";
    let inQuotes = false;
    for (let i = 0; i < text.length; i += 1) {
        const char = text[i];
        const next = text[i + 1];
        if (char === '"') {
            if (inQuotes && next === '"') {
                field += '"';
                i += 1;
            } else {
                inQuotes = !inQuotes;
            }
        } else if (char === "," && !inQuotes) {
            current.push(field);
            field = "";
        } else if ((char === "\n" || char === "\r") && !inQuotes) {
            if (char === "\r" && next === "\n") {
                i += 1;
            }
            current.push(field);
            rows.push(current);
            current = [];
            field = "";
        } else {
            field += char;
        }
    }
    if (field.length > 0 || current.length > 0) {
        current.push(field);
        rows.push(current);
    }
    return rows.map((row) => row.map((cell) => cell.trim()));
}

const QUESTION_HEADERS = new Set(["question", "prompt", "front", "term", "word"]);
const ANSWER_HEADERS = new Set(["answer", "response", "back", "definition", "meaning"]);
const HINT_HEADERS = new Set(["hint", "context", "mnemonic", "note", "extra"]);

function mapCsvHeaders(headers) {
    const normalized = headers.map((header) => header.trim());
    const mapping = { prompt: 0, answer: 1, hint: null };
    normalized.forEach((header, index) => {
        const lower = header.toLowerCase();
        if (QUESTION_HEADERS.has(lower) && mapping.prompt === 0 && index !== 0) {
            mapping.prompt = index;
        }
        if (ANSWER_HEADERS.has(lower) && mapping.answer === 1 && index !== 1) {
            mapping.answer = index;
        }
        if (HINT_HEADERS.has(lower) && mapping.hint === null) {
            mapping.hint = index;
        }
    });
    return mapping;
}

async function parsePdfFile(file) {
    const buffer = await readFileAsArrayBuffer(file);
    const pdf = await window.pdfjsLib.getDocument({ data: buffer }).promise;
    let fullText = "";
    for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber += 1) {
        const page = await pdf.getPage(pageNumber);
        const content = await page.getTextContent();
        const strings = content.items.map((item) => ("str" in item ? item.str : ""));
        fullText += strings.join(" ") + "\n";
    }
    const cards = parsePdfText(fullText);
    if (!cards.length) {
        throw new Error("Could not detect Q/A pairs. Use Q: and A: markers or try a CSV.");
    }
    return cards;
}

function parsePdfText(text) {
    const cards = [];
    const regex = /q[:\-]\s*(.*?)\s*a[:\-]\s*(.*?)(?=\n\s*q[:\-]|$)/gis;
    let match;
    while ((match = regex.exec(text)) !== null) {
        const prompt = tidyText(match[1]);
        const answer = tidyText(match[2]);
        if (prompt && answer) {
            cards.push({ prompt, answer });
        }
    }
    if (cards.length) {
        return cards;
    }
    const lines = text
        .split(/\r?\n/)
        .map((line) => line.trim())
        .filter((line) => line.length > 0);
    for (let i = 0; i < lines.length; i += 2) {
        const prompt = lines[i];
        const answer = lines[i + 1];
        if (prompt && answer) {
            cards.push({ prompt, answer });
        }
    }
    return cards;
}

function tidyText(raw) {
    return raw
        .split(/\r?\n/)
        .map((line) => line.trim())
        .filter((line) => line.length > 0)
        .join("\n");
}

function readFileAsText(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(String(reader.result));
        reader.onerror = () => reject(reader.error || new Error("Could not read that file."));
        reader.readAsText(file);
    });
}

function readFileAsArrayBuffer(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = () => reject(reader.error || new Error("Could not read that file."));
        reader.readAsArrayBuffer(file);
    });
}

function buildDeckHtml(cards, options) {
    const theme = THEMES[options.theme] || THEMES["sugar-bloom"];
    const subtitleBlock = options.subtitle ? `<p class="subtitle">${escapeHtml(options.subtitle)}</p>` : "";
    const cardMarkup = cards
        .map((card, index) => {
            const hint = card.hint ? `<p class="hint">${escapeMultiline(card.hint)}</p>` : "";
            return `
            <article class="card" tabindex="0">
                <div class="card-inner">
                    <div class="card-face card-front">
                        <span class="counter">${index + 1}</span>
                        <h3>${escapeMultiline(card.prompt)}</h3>
                        ${hint}
                        <p class="tap">Click or press space to reveal</p>
                    </div>
                    <div class="card-face card-back">
                        <h3>Answer</h3>
                        <p>${escapeMultiline(card.answer)}</p>
                    </div>
                </div>
            </article>`;
        })
        .join("\n");

    return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${escapeHtml(options.title)} — Flashcards</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600&family=Nunito:wght@400;600&display=swap" rel="stylesheet">
<style>
:root {
    --bg-gradient: ${theme.background};
    --card-bg: ${theme.cardBg};
    --card-border: ${theme.cardBorder};
    --accent: ${theme.accent};
    --accent-soft: ${theme.accentSoft};
    --shadow: ${theme.shadow};
    --font-family: ${theme.font};
    color-scheme: light;
}
* { box-sizing: border-box; }
body {
    margin: 0;
    min-height: 100vh;
    background: var(--bg-gradient);
    font-family: var(--font-family);
    color: #49304a;
    display: flex;
    flex-direction: column;
}
header {
    padding: 3rem 1.5rem 1rem;
    text-align: center;
}
h1 {
    margin: 0;
    font-size: clamp(2.4rem, 4vw, 3.2rem);
    letter-spacing: 0.05em;
    text-transform: uppercase;
}
.subtitle {
    margin: 0.75rem auto 0;
    max-width: 60ch;
    font-size: 1.1rem;
    color: rgba(73, 48, 74, 0.76);
}
.actions {
    margin-top: 1.5rem;
    display: flex;
    justify-content: center;
    gap: 0.75rem;
    flex-wrap: wrap;
}
button {
    padding: 0.65rem 1.4rem;
    border-radius: 999px;
    border: none;
    background: rgba(255, 255, 255, 0.88);
    color: var(--accent);
    box-shadow: 0 12px 22px rgba(73, 48, 74, 0.12);
    font-size: 0.95rem;
    font-weight: 600;
    cursor: pointer;
    transition: transform 0.16s ease, box-shadow 0.16s ease;
}
button:hover {
    transform: translateY(-2px);
    box-shadow: 0 16px 28px rgba(73, 48, 74, 0.18);
}
main {
    padding: 0 1.5rem 3rem;
    max-width: 1080px;
    margin: 0 auto;
    width: 100%;
}
.grid {
    display: grid;
    gap: 1.5rem;
    grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
    align-items: stretch;
}
.card {
    perspective: 1200px;
    outline: none;
}
.card:focus-visible {
    box-shadow: 0 0 0 4px rgba(236, 72, 153, 0.3);
    border-radius: 24px;
}
.card-inner {
    position: relative;
    width: 100%;
    min-height: 260px;
    transition: transform 0.6s ease;
    transform-style: preserve-3d;
}
.card.flipped .card-inner {
    transform: rotateY(180deg);
}
.card-face {
    position: absolute;
    inset: 0;
    padding: 1.75rem;
    background: var(--card-bg);
    border: var(--card-border);
    border-radius: 24px;
    box-shadow: var(--shadow);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    backface-visibility: hidden;
}
.card-front {
    background: linear-gradient(180deg, rgba(255,255,255,0.95) 0%, var(--accent-soft) 100%);
}
.card-back {
    transform: rotateY(180deg);
}
.card h3 {
    font-size: 1.3rem;
    margin: 0;
}
.card p {
    font-size: 0.98rem;
    line-height: 1.55;
    margin-top: 1rem;
}
.card .counter {
    position: absolute;
    top: 1rem;
    right: 1.2rem;
    font-weight: 600;
    font-size: 0.95rem;
    color: rgba(73, 48, 74, 0.55);
}
.card .hint {
    margin-top: 0.8rem;
    font-size: 0.9rem;
    color: rgba(73, 48, 74, 0.6);
}
.card .tap {
    font-size: 0.85rem;
    margin-top: auto;
    letter-spacing: 0.05em;
    text-transform: uppercase;
    color: rgba(73, 48, 74, 0.45);
}
body.compact .grid {
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    gap: 1rem;
}
body.compact .card-face {
    padding: 1.3rem;
}
body.printable {
    background: #fff;
}
body.printable header {
    position: sticky;
    top: 0;
    background: #fff;
    box-shadow: 0 6px 20px rgba(73,48,74,0.1);
}
body.printable .card-face {
    box-shadow: none;
}
@media (prefers-reduced-motion: reduce) {
    .card-inner { transition: none; }
    button { transition: none; }
}
@media print {
    body {
        font-family: 'Poppins', sans-serif;
        background: #fff;
    }
    header, .actions {
        display: none !important;
    }
    .grid {
        grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
        gap: 0.9rem;
    }
    .card-inner {
        transform: none !important;
    }
    .card-face {
        border: 1px solid rgba(73,48,74,0.18);
        box-shadow: none;
    }
}
</style>
</head>
<body>
<header>
    <h1>${escapeHtml(options.title)}</h1>
    ${subtitleBlock}
    <nav class="actions">
        <button type="button" id="compactToggle">Toggle Compact Grid</button>
        <button type="button" id="printToggle">Print-Friendly View</button>
        <button type="button" id="shuffleToggle">Shuffle Cards</button>
    </nav>
</header>
<main>
    <section class="grid" id="flashcardGrid">
        ${cardMarkup}
    </section>
</main>
<script>
const grid = document.getElementById('flashcardGrid');
const cards = Array.from(document.querySelectorAll('.card'));
const compactToggle = document.getElementById('compactToggle');
const printToggle = document.getElementById('printToggle');
const shuffleToggle = document.getElementById('shuffleToggle');
cards.forEach((card) => {
    card.addEventListener('click', () => {
        card.classList.toggle('flipped');
    });
    card.addEventListener('keydown', (event) => {
        if (event.code === 'Space' || event.key === 'Enter') {
            event.preventDefault();
            card.classList.toggle('flipped');
        }
    });
});
compactToggle.addEventListener('click', () => {
    document.body.classList.toggle('compact');
});
printToggle.addEventListener('click', () => {
    document.body.classList.toggle('printable');
});
shuffleToggle.addEventListener('click', () => {
    const shuffled = cards.slice().sort(() => Math.random() - 0.5);
    shuffled.forEach((card) => grid.appendChild(card));
});
</script>
</body>
</html>`;
}

function escapeHtml(value) {
    return value.replace(/[&<>"']+/g, (match) => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;",
    })[match]);
}

function escapeMultiline(value) {
    return escapeHtml(value).replace(/\n/g, "<br>");
}
