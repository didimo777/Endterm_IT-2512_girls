
"use strict";

const albumData = [
    {
        id: 1,
        title: "After Hours",
        artist: "The Weeknd",
        year: 2020,
        genre: "Pop",
        mood: "Emotional",
        image: "photo/after.jpg",
        description: "A cinematic album about love, loneliness and late-night emotions.",
        tracks: ["Blinding Lights", "Save Your Tears", "After Hours"],
        favorite: false
    },
    {
        id: 2,
        title: "SOS",
        artist: "SZA",
        year: 2022,
        genre: "R&B",
        mood: "Emotional",
        image: "photo/sos.webp",
        description: "An emotional journey through relationships and self-discovery.",
        tracks: ["Kill Bill", "Snooze", "Nobody Gets Me"],
        favorite: false
    },
    {
        id: 3,
        title: "Blonde",
        artist: "Frank Ocean",
        year: 2016,
        genre: "Alternative",
        mood: "Calm",
        image: "photo/blond.jpg",
        description: "Atmospheric storytelling about memories, identity and love.",
        tracks: ["Nikes", "Ivy", "Pink + White"],
        favorite: false
    },
    {
        id: 4,
        title: "HIT ME HARD AND SOFT",
        artist: "Billie Eilish",
        year: 2024,
        genre: "Pop",
        mood: "Emotional",
        image: "photo/hit.webp",
        description: "An expressive album combining intimate vocals and powerful sounds.",
        tracks: ["SKINNY", "BIRDS OF A FEATHER", "CHIHIRO"],
        favorite: false
    },
    {
        id: 5,
        title: "eternal sunshine",
        artist: "Ariana Grande",
        year: 2024,
        genre: "Pop",
        mood: "Romantic",
        image: "photo/eternal.png",
        description: "Melodic pop exploring relationships, reflection and personal growth.",
        tracks: ["bye", "we can't be friends", "the boy is mine"],
        favorite: false
    },
    {
        id: 6,
        title: "GNX",
        artist: "Kendrick Lamar",
        year: 2024,
        genre: "Hip-Hop",
        mood: "Energetic",
        image: "photo/gnx.jpg",
        description: "Confident hip-hop with powerful production and storytelling.",
        tracks: ["squabble up", "luther", "tv off"],
        favorite: false
    },
    {
        id: 7,
        title: "BE",
        artist: "BTS",
        year: 2020,
        genre: "Pop",
        mood: "Happy",
        image: "photo/be.webp",
        description: "A comforting collection of songs about hope and connection.",
        tracks: ["Life Goes On", "Blue & Grey", "Dynamite"],
        favorite: false
    },
    {
        id: 8,
        title: "Views",
        artist: "Drake",
        year: 2016,
        genre: "Hip-Hop",
        mood: "Calm",
        image: "photo/drake.jpg",
        description: "A blend of melodic rap, R&B and atmospheric production.",
        tracks: ["One Dance", "Controlla", "Too Good"],
        favorite: false
    }
];

const musicLibrary = [
    {
        id: 1,
        title: "Good Days",
        artist: "SZA",
        genre: "R&B",
        mood: "Calm",
        energy: 3,
        activities: ["Studying", "Relaxing"]
    },
    {
        id: 2,
        title: "Blinding Lights",
        artist: "The Weeknd",
        genre: "Pop",
        mood: "Energetic",
        energy: 9,
        activities: ["Walking", "Working out", "Traveling"]
    },
    {
        id: 3,
        title: "Pink + White",
        artist: "Frank Ocean",
        genre: "Alternative",
        mood: "Romantic",
        energy: 3,
        activities: ["Relaxing", "Traveling"]
    },
    {
        id: 4,
        title: "BIRDS OF A FEATHER",
        artist: "Billie Eilish",
        genre: "Pop",
        mood: "Romantic",
        energy: 6,
        activities: ["Walking", "Relaxing"]
    },
    {
        id: 5,
        title: "HUMBLE.",
        artist: "Kendrick Lamar",
        genre: "Hip-Hop",
        mood: "Energetic",
        energy: 9,
        activities: ["Working out", "Walking"]
    },
    {
        id: 6,
        title: "we can't be friends",
        artist: "Ariana Grande",
        genre: "Pop",
        mood: "Emotional",
        energy: 4,
        activities: ["Relaxing", "Traveling"]
    },
    {
        id: 7,
        title: "Dynamite",
        artist: "BTS",
        genre: "Pop",
        mood: "Happy",
        energy: 9,
        activities: ["Walking", "Working out"]
    },
    {
        id: 8,
        title: "Passionfruit",
        artist: "Drake",
        genre: "Hip-Hop",
        mood: "Calm",
        energy: 4,
        activities: ["Studying", "Traveling"]
    },
    {
        id: 9,
        title: "Snooze",
        artist: "SZA",
        genre: "R&B",
        mood: "Romantic",
        energy: 3,
        activities: ["Relaxing", "Studying"]
    },
    {
        id: 10,
        title: "CHIHIRO",
        artist: "Billie Eilish",
        genre: "Alternative",
        mood: "Emotional",
        energy: 6,
        activities: ["Walking", "Traveling"]
    },
    {
        id: 11,
        title: "Saturn",
        artist: "SZA",
        genre: "R&B",
        mood: "Emotional",
        energy: 4,
        activities: ["Relaxing", "Studying"]
    },
    {
        id: 12,
        title: "One Dance",
        artist: "Drake",
        genre: "Hip-Hop",
        mood: "Happy",
        energy: 8,
        activities: ["Walking", "Working out"]
    }
];

function s3Text(tag, className, value) {
    const element = document.createElement(tag);
    element.className = className;
    element.textContent = value;
    return element;
}

function s3RenderTracks(items, targetId) {
    const target = document.getElementById(targetId);
    if (!target) return;

    target.replaceChildren();

    items.forEach((item, index) => {
        const row = document.createElement("div");
        row.className = "s3-track";

        const number = s3Text(
            "span",
            "s3-track-number",
            String(index + 1).padStart(2, "0")
        );

        const name = s3Text("span", "", item);
        row.append(number, name);
        target.appendChild(row);
    });
}

function s3OpenPanel(selector) {
    $(selector)
        .stop(true, true)
        .hide()
        .prop("hidden", false)
        .slideDown(350);
}

function s3ClosePanel(selector) {
    $(selector)
        .stop(true, true)
        .slideUp(250, function () {
            this.hidden = true;
        });
}

function initAlbums() {
    const grid = document.getElementById("albumGrid");
    if (!grid) return;

    const search = document.getElementById("albumSearch");
    const sort = document.getElementById("albumSort");
    const count = document.getElementById("albumCount");
    const favoriteCount = document.getElementById("favoriteCount");
    const empty = document.getElementById("albumEmpty");
    const filters = document.querySelectorAll("[data-album-filter]");

    let activeFilter = "all";

    function openAlbum(album) {
        const image = document.getElementById("albumDetailImage");

        image.src = album.image;
        image.alt = `${album.title} by ${album.artist}`;

        document.getElementById("albumDetailTitle").textContent =
            album.title;

        document.getElementById("albumDetailArtist").textContent =
            `${album.artist} · ${album.year} · ${album.genre}`;

        document.getElementById("albumDetailDescription").textContent =
            album.description;

        s3RenderTracks(album.tracks, "albumTracks");

        const spotify = document.getElementById("albumSpotify");

        spotify.href =
            "https://open.spotify.com/search/" +
            encodeURIComponent(`${album.title} ${album.artist}`);

        spotify.setAttribute(
            "aria-label",
            `Find ${album.title} by ${album.artist} on Spotify`
        );

        s3OpenPanel("#albumDetails");
    }

    function renderAlbums() {
        const term = search.value.trim().toLowerCase();

        let results = albumData.filter(album => {
            const matchesSearch =
                album.title.toLowerCase().includes(term) ||
                album.artist.toLowerCase().includes(term) ||
                album.genre.toLowerCase().includes(term);

            const matchesFavorite =
                activeFilter === "all" || album.favorite;

            return matchesSearch && matchesFavorite;
        });

        if (sort.value === "az") {
            results = [...results].sort((a, b) =>
                a.title.localeCompare(b.title)
            );
        } else if (sort.value === "newest") {
            results = [...results].sort((a, b) =>
                b.year - a.year || a.id - b.id
            );
        } else if (sort.value === "oldest") {
            results = [...results].sort((a, b) =>
                a.year - b.year || a.id - b.id
            );
        }

        grid.replaceChildren();

        results.forEach(album => {
            const card = document.createElement("article");
            card.className = "s3-album-card";

            const imageWrap = document.createElement("div");
            imageWrap.className = "s3-album-image-wrap";

            const image = document.createElement("img");
            image.src = album.image;
            image.alt = `${album.title} by ${album.artist}`;
            image.loading = "lazy";

            const favorite = document.createElement("button");
            favorite.type = "button";
            favorite.className = "s3-heart";
            favorite.textContent = album.favorite ? "♥" : "♡";
            favorite.classList.toggle("saved", album.favorite);

            favorite.setAttribute(
                "aria-label",
                album.favorite
                    ? `Remove ${album.title} from favorites`
                    : `Add ${album.title} to favorites`
            );

            favorite.setAttribute(
                "aria-pressed",
                String(album.favorite)
            );

            favorite.addEventListener("click", () => {
                album.favorite = !album.favorite;
                renderAlbums();
            });

            imageWrap.append(image, favorite);

            const info = document.createElement("div");
            info.className = "s3-album-info";

            const title = s3Text("h2", "", album.title);
            const artist = s3Text(
                "p", "", `${album.artist} · ${album.year}`
            );
            const mood = s3Text(
                "span", "s3-album-mood", album.mood
            );

            const detailsButton = document.createElement("button");
            detailsButton.type = "button";
            detailsButton.className = "s3-view";
            detailsButton.textContent = "Explore album ↗";

            detailsButton.addEventListener("click", () => {
                openAlbum(album);
            });

            info.append(title, artist, mood, detailsButton);
            card.append(imageWrap, info);
            grid.appendChild(card);
        });

        const totalFavorites =
            albumData.filter(album => album.favorite).length;

        favoriteCount.textContent = totalFavorites;
        count.textContent =
            `${results.length} of ${albumData.length} albums`;

        empty.hidden = results.length !== 0;

        s3ClosePanel("#albumDetails");

        $(grid).stop(true, true).hide().fadeIn(250);
    }

    search.addEventListener("input", renderAlbums);
    sort.addEventListener("change", renderAlbums);

    filters.forEach(button => {
        button.addEventListener("click", () => {
            activeFilter = button.dataset.albumFilter;

            filters.forEach(item => {
                const active = item === button;
                item.classList.toggle("active", active);
                item.setAttribute("aria-pressed", String(active));
            });

            renderAlbums();
        });
    });

    document.getElementById("closeAlbum")
        .addEventListener("click", () => {
            s3ClosePanel("#albumDetails");
        });

    renderAlbums();
}

function initDiscover() {
    const form = document.getElementById("musicMatchForm");
    if (!form) return;

    const fields = {
        name: document.getElementById("listenerName"),
        email: document.getElementById("listenerEmail"),
        mood: document.getElementById("listenerMood"),
        genre: document.getElementById("listenerGenre"),
        activity: document.getElementById("listenerActivity"),
        energy: document.getElementById("listenerEnergy")
    };

    const errors = {
        name: document.getElementById("nameError"),
        email: document.getElementById("emailError"),
        mood: document.getElementById("moodError"),
        genre: document.getElementById("genreError"),
        activity: document.getElementById("activityError"),
        energy: document.getElementById("energyError")
    };

    const energyValue = document.getElementById("energyValue");

    function getValues() {
        return {
            name: fields.name.value.trim(),
            email: fields.email.value.trim(),
            mood: fields.mood.value,
            genre: fields.genre.value,
            activity: fields.activity.value,
            energy: Number(fields.energy.value)
        };
    }

    function showError(key, message) {
        errors[key].textContent = message;
        fields[key].classList.toggle("is-invalid", Boolean(message));
        fields[key].setAttribute(
            "aria-invalid",
            String(Boolean(message))
        );
    }

    function validateField(key) {
        const values = getValues();
        let message = "";

        if (key === "name") {
            if (!values.name) {
                message = "Please enter your name.";
            } else if (values.name.length < 2) {
                message = "Name must contain at least 2 characters.";
            } else if (!/^[\p{L}\s'-]+$/u.test(values.name)) {
                message = "Use letters, spaces, hyphens or apostrophes.";
            }
        }

        if (key === "email") {
            if (!values.email) {
                message = "Please enter your email.";
            } else if (
                !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)
            ) {
                message = "Enter a valid email address.";
            }
        }

        if (key === "mood" && !values.mood) {
            message = "Please choose your mood.";
        }

        if (key === "genre" && !values.genre) {
            message = "Please choose a music genre.";
        }

        if (key === "activity" && !values.activity) {
            message = "Please choose your activity.";
        }

        if (key === "energy") {
            if (
                !Number.isInteger(values.energy) ||
                values.energy < 1 ||
                values.energy > 10
            ) {
                message = "Energy must be between 1 and 10.";
            }
        }

        showError(key, message);
        return message === "";
    }

    Object.keys(fields).forEach(key => {
        const eventName =
            fields[key].tagName === "SELECT" ? "change" : "input";

        fields[key].addEventListener(eventName, () => {
            if (key === "energy") {
                energyValue.textContent = fields.energy.value;
            }

            if (
                fields[key].classList.contains("is-invalid") ||
                form.dataset.submitted === "true"
            ) {
                validateField(key);
            }
        });
    });

    function calculateMatch(song, preferences) {
        let score = 0;

        if (song.mood === preferences.mood) {
            score += 40;
        }

        if (song.genre === preferences.genre) {
            score += 30;
        }

        const energyDifference =
            Math.abs(song.energy - preferences.energy);

        score += Math.max(0, 20 - energyDifference * 3);

        if (song.activities.includes(preferences.activity)) {
            score += 10;
        }

        return Math.min(100, score);
    }

    function createMatches(preferences) {
        return musicLibrary
            .map(song => ({
                ...song,
                score: calculateMatch(song, preferences)
            }))
            .sort((a, b) => b.score - a.score)
            .slice(0, 4);
    }

    function showMatches(preferences) {
        const matches = createMatches(preferences);
        const container = document.getElementById("matchSongs");

        document.getElementById("matchTitle").textContent =
            `${preferences.name}, here's your music.`;

        document.getElementById("matchDescription").textContent =
            `Based on your ${preferences.mood.toLowerCase()} mood, ` +
            `${preferences.genre} preference and ${preferences.activity.toLowerCase()} activity.`;

        const average = Math.round(
            matches.reduce((sum, song) => sum + song.score, 0) /
            matches.length
        );

        document.getElementById("matchScore").textContent =
            `Average compatibility: ${average}%`;

        container.replaceChildren();

        matches.forEach(song => {
            const card = document.createElement("div");
            card.className = "s3-match-song";

            const information = document.createElement("div");

            information.append(
                s3Text("strong", "", song.title),
                s3Text("p", "", `${song.artist} · ${song.genre}`)
            );

            const score = s3Text(
                "span",
                "s3-score",
                `${song.score}% match`
            );

            const spotify = document.createElement("a");
            spotify.className = "s3-song-link";
            spotify.textContent = "Spotify ↗";
            spotify.target = "_blank";
            spotify.rel = "noopener noreferrer";

            spotify.href =
                "https://open.spotify.com/search/" +
                encodeURIComponent(`${song.title} ${song.artist}`);

            card.append(information, score, spotify);
            container.appendChild(card);
        });

        const results = document.getElementById("matchResults");

        $(results)
            .stop(true, true)
            .hide()
            .prop("hidden", false)
            .fadeIn(400);

        results.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });
    }

    form.addEventListener("submit", event => {
        event.preventDefault();
        form.dataset.submitted = "true";

        const valid = Object.keys(fields)
            .map(key => validateField(key))
            .every(Boolean);

        if (!valid) {
            const firstInvalid = form.querySelector(".is-invalid");
            if (firstInvalid) firstInvalid.focus();
            return;
        }

        const preferences = getValues();

        showMatches(preferences);

        form.reset();
        energyValue.textContent = "5";
        form.dataset.submitted = "false";

        Object.keys(fields).forEach(key => {
            showError(key, "");
        });

        const success = document.getElementById("formSuccess");
        if (success) {
            success.textContent =
                "Your music match is ready! The form has been cleared.";
            $(success).stop(true, true).hide().fadeIn(300);
        }
    });

    document.getElementById("newMatch")
        .addEventListener("click", () => {
            s3ClosePanel("#matchResults");
            form.scrollIntoView({
                behavior: "smooth",
                block: "center"
            });
            fields.name.focus();
        });
}

document.addEventListener("DOMContentLoaded", () => {
    if (typeof window.jQuery !== "function") {
        console.error("jQuery is required for Student 3.");
        return;
    }

    initAlbums();
    initDiscover();
});
