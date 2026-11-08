
"use strict";

const moodData = [
    {
        id: "love",
        name: "In Love",
        category: "emotional",
        symbol: "♥",
        style: "love",
        description: "Soft, romantic and warm.",
        songs: [
            "SZA — Snooze",
            "Frank Ocean — Pink + White",
            "Ariana Grande — pov"
        ]
    },
    {
        id: "heartbreak",
        name: "Heartbreak",
        category: "emotional",
        symbol: "♡",
        style: "heartbreak",
        description: "For feelings that stay a little longer.",
        songs: [
            "Billie Eilish — when the party's over",
            "SZA — Nobody Gets Me",
            "Frank Ocean — Self Control"
        ]
    },
    {
        id: "night",
        name: "Late Night",
        category: "relaxing",
        symbol: "☾",
        style: "night",
        description: "Dark and atmospheric after midnight.",
        songs: [
            "The Weeknd — After Hours",
            "Frank Ocean — Nights",
            "SZA — Good Days"
        ]
    },
    {
        id: "chill",
        name: "Chill",
        category: "relaxing",
        symbol: "☁",
        style: "chill",
        description: "Slow down. Nothing else matters right now.",
        songs: [
            "SZA — Good Days",
            "Frank Ocean — Ivy",
            "Billie Eilish — ocean eyes"
        ]
    },
    {
        id: "confidence",
        name: "Confidence",
        category: "positive",
        symbol: "↑",
        style: "confidence",
        description: "Turn it up and own the moment.",
        songs: [
            "Beyoncé — CUFF IT",
            "Ariana Grande — yes, and?",
            "Kendrick Lamar — HUMBLE."
        ]
    },
    {
        id: "happy",
        name: "Happy",
        category: "positive",
        symbol: "☀",
        style: "happy",
        description: "Bright music for a better day.",
        songs: [
            "Pharrell Williams — Happy",
            "Bruno Mars — Treasure",
            "BTS — Dynamite"
        ]
    },
    {
        id: "drive",
        name: "Night Drive",
        category: "relaxing",
        symbol: "→",
        style: "night",
        description: "City lights and empty roads.",
        songs: [
            "The Weeknd — Blinding Lights",
            "Frank Ocean — Nights",
            "Drake — Passionfruit"
        ]
    },
    {
        id: "focus",
        name: "Focus",
        category: "relaxing",
        symbol: "✦",
        style: "chill",
        description: "Sounds for studying and creating.",
        songs: [
            "Frank Ocean — Pink + White",
            "SZA — Saturn",
            "Billie Eilish — everything i wanted"
        ]
    },
    {
        id: "party",
        name: "Party",
        category: "positive",
        symbol: "♪",
        style: "confidence",
        description: "High energy from start to finish.",
        songs: [
            "BTS — Dynamite",
            "The Weeknd — Can't Feel My Face",
            "Ariana Grande — Into You"
        ]
    }
];

function makeSongCards(songs, target) {
    const container = document.querySelector(target);

    if (!container) return;

    container.replaceChildren();

    songs.forEach((song, index) => {
        const card = document.createElement("div");
        card.className = "music-song-card";

        const number = document.createElement("span");
        number.className = "music-song-number";
        number.textContent = String(index + 1).padStart(2, "0");

        const title = document.createElement("span");
        title.textContent = song;

        card.append(number, title);
        container.append(card);
    });
}

function revealPanel(panel) {
    $(panel)
        .stop(true, true)
        .hide()
        .prop("hidden", false)
        .fadeIn(350);
}

function initHome() {
    const choices = document.querySelectorAll("[data-home-mood]");

    if (!choices.length) return;

    function selectMood(card) {
        const mood = moodData.find(
            item => item.id === card.dataset.homeMood
        );

        if (!mood) return;

        choices.forEach(item => {
            item.classList.toggle("is-selected", item === card);
            item.setAttribute(
                "aria-pressed",
                String(item === card)
            );
        });

        document.getElementById("homeMoodName").textContent =
            `— ${mood.name}`;

        makeSongCards(mood.songs, "#homeSongs");

        revealPanel("#homeRecommendations");

        $("#homeRecommendations")
            .stop(true)
            .animate({ opacity: 1 }, 250);
    }

    choices.forEach(card => {
        card.setAttribute("aria-pressed", "false");

        card.addEventListener("click", () => {
            selectMood(card);
        });

        card.addEventListener("keydown", event => {
            if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                selectMood(card);
            }
        });
    });
}

function initMoods() {
    const catalog = document.getElementById("moodCatalog");

    if (!catalog) return;

    const search = document.getElementById("moodSearch");
    const count = document.getElementById("moodCount");
    const empty = document.getElementById("moodEmpty");

    const filters = document.querySelectorAll("[data-filter]");
    const sortButton = document.getElementById("sortMoods");

    let activeFilter = "all";
    let sorted = false;

    function openMood(mood) {
        document.getElementById("moodDetailsTitle").textContent =
            `${mood.name} — your music`;

        document.getElementById("moodDetailsDescription").textContent =
            mood.description;

        makeSongCards(mood.songs, "#moodSongs");

        $("#moodDetails")
            .stop(true, true)
            .hide()
            .prop("hidden", false)
            .slideDown(350);
    }

    function render() {
        const term = search.value.trim().toLowerCase();

        let items = moodData.filter(mood => {
            const matchesCategory =
                activeFilter === "all" ||
                mood.category === activeFilter;

            const matchesSearch =
                mood.name.toLowerCase().includes(term) ||
                mood.description.toLowerCase().includes(term);

            return matchesCategory && matchesSearch;
        });

        if (sorted) {
            items = [...items].sort((a, b) =>
                a.name.localeCompare(b.name)
            );
        }

        catalog.replaceChildren();

        items.forEach(mood => {
            const card = document.createElement("button");
            card.type = "button";
            card.className =
                `mood-card ${mood.style} music-mood-button`;

            const symbol = document.createElement("span");
            symbol.className = "mood-symbol";
            symbol.textContent = mood.symbol;

            const heading = document.createElement("span");
            heading.className = "music-card-heading";
            heading.textContent = mood.name;

            const description = document.createElement("span");
            description.className = "music-card-description";
            description.textContent = mood.description;

            card.append(symbol, heading, description);

            card.addEventListener("click", () => {
                openMood(mood);
            });

            catalog.append(card);
        });

        count.textContent =
            `${items.length} of ${moodData.length} moods`;

        empty.hidden = items.length !== 0;

        $(catalog)
            .stop(true, true)
            .hide()
            .fadeIn(220);

        $("#moodDetails")
            .stop(true, true)
            .hide()
            .prop("hidden", true);
    }

    search.addEventListener("input", render);

    filters.forEach(button => {
        button.addEventListener("click", () => {
            activeFilter = button.dataset.filter;

            filters.forEach(item => {
                const selected = item === button;

                item.classList.toggle(
                    "is-active",
                    selected
                );

                item.setAttribute(
                    "aria-pressed",
                    String(selected)
                );
            });

            render();
        });
    });

    sortButton.addEventListener("click", () => {
        sorted = !sorted;

        sortButton.textContent = sorted
            ? "Original order"
            : "Sort A–Z";

        render();
    });

    document
        .getElementById("closeMoodDetails")
        .addEventListener("click", () => {
            $("#moodDetails")
                .stop(true, true)
                .slideUp(250, function () {
                    this.hidden = true;
                });
        });

    render();
}

document.addEventListener("DOMContentLoaded", () => {
    if (typeof window.jQuery !== "function") {
        console.error("jQuery did not load.");
        return;
    }

    initHome();
    initMoods();
});
