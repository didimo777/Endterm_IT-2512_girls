
"use strict";

const artistData = [
    {
        id: 1,
        name: "SZA",
        genre: "R&B",
        image: "photo/sza.webp",
        mood: "Emotional",
        description: "Expressive R&B with soulful melodies and honest emotions.",
        songs: ["Snooze", "Good Days", "Saturn"]
    },
    {
        id: 2,
        name: "The Weeknd",
        genre: "Pop",
        image: "photo/the.png",
        mood: "Late Night",
        description: "Atmospheric pop, electronic sounds and cinematic storytelling.",
        songs: ["Blinding Lights", "After Hours", "Starboy"]
    },
    {
        id: 3,
        name: "Frank Ocean",
        genre: "Alternative",
        image: "photo/frank.jpg",
        mood: "Chill",
        description: "Thoughtful alternative R&B with a unique experimental sound.",
        songs: ["Pink + White", "Nights", "Ivy"]
    },
    {
        id: 4,
        name: "Billie Eilish",
        genre: "Pop",
        image: "photo/billie.webp",
        mood: "Emotional",
        description: "Intimate vocals and atmospheric alternative pop.",
        songs: ["BIRDS OF A FEATHER", "ocean eyes", "Happier Than Ever"]
    },
    {
        id: 5,
        name: "Kendrick Lamar",
        genre: "Hip-Hop",
        image: "photo/kendrick.avif",
        mood: "Intense",
        description: "Powerful storytelling and energetic hip-hop.",
        songs: ["HUMBLE.", "DNA.", "Not Like Us"]
    },
    {
        id: 6,
        name: "Ariana Grande",
        genre: "Pop",
        image: "photo/ariana.jpeg",
        mood: "Positive",
        description: "Melodic pop with expressive vocals and R&B influences.",
        songs: ["we can't be friends", "Into You", "positions"]
    },
    {
        id: 7,
        name: "Brent Faiyaz",
        genre: "R&B",
        image: "photo/brent.jpg",
        mood: "Late Night",
        description: "Smooth contemporary R&B with a relaxed atmosphere.",
        songs: ["Clouded", "ALL MINE", "JACKIE BROWN"]
    },
    {
        id: 8,
        name: "BTS",
        genre: "Pop",
        image: "photo/bts.jpg",
        mood: "Positive",
        description: "Dynamic pop with memorable melodies and energetic performances.",
        songs: ["Dynamite", "Butter", "Spring Day"]
    },
    {
        id: 9,
        name: "Drake",
        genre: "Hip-Hop",
        image: "photo/drake.jpg",
        mood: "Chill",
        description: "A combination of hip-hop, melodic rap and R&B.",
        songs: ["Passionfruit", "One Dance", "Hold On, We're Going Home"]
    }
];

const genreData = [
    {
        id: 1,
        name: "R&B",
        energy: "Chill",
        symbol: "♥",
        style: "rb",
        description: "Smooth vocals, soulful melodies and emotional storytelling.",
        artists: ["SZA", "Brent Faiyaz", "Frank Ocean"]
    },
    {
        id: 2,
        name: "POP",
        energy: "Upbeat",
        symbol: "✦",
        style: "pop",
        description: "Catchy melodies, memorable choruses and bright energy.",
        artists: ["Ariana Grande", "The Weeknd", "BTS"]
    },
    {
        id: 3,
        name: "HIP-HOP",
        energy: "Intense",
        symbol: "↗",
        style: "hiphop",
        description: "Rhythm, lyrical creativity and powerful beats.",
        artists: ["Kendrick Lamar", "Drake", "Travis Scott"]
    },
    {
        id: 4,
        name: "INDIE",
        energy: "Chill",
        symbol: "☁",
        style: "indie",
        description: "Creative, independent and atmospheric music.",
        artists: ["Clairo", "The Marías", "Tame Impala"]
    },
    {
        id: 5,
        name: "SOUL",
        energy: "Chill",
        symbol: "♡",
        style: "soul",
        description: "Warm vocals, emotional expression and timeless melodies.",
        artists: ["Daniel Caesar", "H.E.R.", "Alicia Keys"]
    },
    {
        id: 6,
        name: "ELECTRONIC",
        energy: "Upbeat",
        symbol: "⚡",
        style: "electronic",
        description: "Synthesizers, electronic rhythms and immersive sound.",
        artists: ["Daft Punk", "Calvin Harris", "Disclosure"]
    },
    {
        id: 7,
        name: "ALTERNATIVE",
        energy: "Intense",
        symbol: "◈",
        style: "alternative",
        description: "Experimental ideas and unconventional musical styles.",
        artists: ["Billie Eilish", "Radiohead", "Frank Ocean"]
    },
    {
        id: 8,
        name: "JAZZ",
        energy: "Chill",
        symbol: "♫",
        style: "jazz",
        description: "Expressive improvisation and rich musical harmony.",
        artists: ["Miles Davis", "John Coltrane", "Ella Fitzgerald"]
    }
];

function createText(tag, className, value) {
    const element = document.createElement(tag);
    element.className = className;
    element.textContent = value;
    return element;
}

function createRecommendationList(items, targetId) {
    const target = document.getElementById(targetId);

    if (!target) return;

    target.replaceChildren();

    items.forEach((item, index) => {
        const row = createText(
            "div",
            "s2-song",
            `${String(index + 1).padStart(2, "0")}  ${item}`
        );

        target.appendChild(row);
    });
}

function showStudent2Panel(selector) {
    $(selector)
        .stop(true, true)
        .hide()
        .prop("hidden", false)
        .slideDown(350)
        .animate({ opacity: 1 }, 180);
}

function hideStudent2Panel(selector) {
    $(selector)
        .stop(true, true)
        .slideUp(250, function () {
            this.hidden = true;
        });
}

function initArtists() {
    const grid = document.getElementById("artistGrid");

    if (!grid) return;

    const search = document.getElementById("artistSearch");
    const sort = document.getElementById("artistSort");
    const count = document.getElementById("artistCount");
    const empty = document.getElementById("artistEmpty");
    const filters = document.querySelectorAll("[data-genre]");

    let activeGenre = "All";

    function openArtist(artist) {
        const image = document.getElementById("artistDetailImage");

        image.src = artist.image;
        image.alt = artist.name;

        document.getElementById("artistDetailName").textContent =
            artist.name;

        document.getElementById("artistDetailGenre").textContent =
            `${artist.genre} · ${artist.mood}`;

        document.getElementById("artistDetailDescription").textContent =
            artist.description;

        createRecommendationList(artist.songs, "artistSongs");

        const spotifyButton = document.getElementById("artistSpotify");

        spotifyButton.href =
            "https://open.spotify.com/search/" +
            encodeURIComponent(artist.name) +
            "/artists";

        spotifyButton.setAttribute(
            "aria-label",
            `Find ${artist.name} on Spotify`
        );

        showStudent2Panel("#artistDetails");

        document.getElementById("artistDetails")
            .scrollIntoView({
                behavior: "smooth",
                block: "nearest"
            });
    }

    function renderArtists() {
        const term = search.value.trim().toLowerCase();

        let results = artistData.filter(artist => {
            const matchesSearch =
                artist.name.toLowerCase().includes(term) ||
                artist.genre.toLowerCase().includes(term) ||
                artist.mood.toLowerCase().includes(term);

            const matchesGenre =
                activeGenre === "All" ||
                artist.genre === activeGenre;

            return matchesSearch && matchesGenre;
        });

        if (sort.value === "az") {
            results = [...results].sort((a, b) =>
                a.name.localeCompare(b.name)
            );
        } else if (sort.value === "za") {
            results = [...results].sort((a, b) =>
                b.name.localeCompare(a.name)
            );
        }

        grid.replaceChildren();

        results.forEach(artist => {
            const button = document.createElement("button");

            button.type = "button";
            button.className = "s2-artist-card";
            button.setAttribute(
                "aria-label",
                `Explore ${artist.name}`
            );

            const image = document.createElement("img");
            image.src = artist.image;
            image.alt = artist.name;
            image.loading = "lazy";

            const info = document.createElement("div");
            info.className = "s2-artist-info";

            info.append(
                createText("h2", "", artist.name),
                createText("p", "", `${artist.genre} · ${artist.mood}`)
            );

            button.append(image, info);

            button.addEventListener("click", () => {
                openArtist(artist);
            });

            grid.appendChild(button);
        });

        count.textContent =
            `${results.length} of ${artistData.length} artists`;

        empty.hidden = results.length !== 0;

        hideStudent2Panel("#artistDetails");

        $(grid)
            .stop(true, true)
            .hide()
            .fadeIn(250);
    }

    search.addEventListener("input", renderArtists);
    sort.addEventListener("change", renderArtists);

    filters.forEach(button => {
        button.addEventListener("click", () => {
            activeGenre = button.dataset.genre;

            filters.forEach(item => {
                const active = item === button;

                item.classList.toggle("active", active);
                item.setAttribute("aria-pressed", String(active));
            });

            renderArtists();
        });
    });

    document.getElementById("closeArtist")
        .addEventListener("click", () => {
            hideStudent2Panel("#artistDetails");
        });

    renderArtists();
}

function initGenres() {
    const grid = document.getElementById("genreGrid");

    if (!grid) return;

    const search = document.getElementById("genreSearch");
    const count = document.getElementById("genreCount");
    const empty = document.getElementById("genreEmpty");
    const sortButton = document.getElementById("genreSort");
    const filters = document.querySelectorAll("[data-energy]");

    let activeEnergy = "All";
    let sorted = false;

    function openGenre(genre) {
        document.getElementById("genreDetailName").textContent =
            genre.name;

        document.getElementById("genreDetailDescription").textContent =
            genre.description;

        createRecommendationList(
            genre.artists,
            "genreArtists"
        );

        showStudent2Panel("#genreDetails");

        document.getElementById("genreDetails")
            .scrollIntoView({
                behavior: "smooth",
                block: "nearest"
            });
    }

    function renderGenres() {
        const term = search.value.trim().toLowerCase();

        let results = genreData.filter(genre => {
            const matchesSearch =
                genre.name.toLowerCase().includes(term) ||
                genre.description.toLowerCase().includes(term);

            const matchesEnergy =
                activeEnergy === "All" ||
                genre.energy === activeEnergy;

            return matchesSearch && matchesEnergy;
        });

        if (sorted) {
            results = [...results].sort((a, b) =>
                a.name.localeCompare(b.name)
            );
        }

        grid.replaceChildren();

        results.forEach(genre => {
            const button = document.createElement("button");

            button.type = "button";
            button.className =
                `s2-genre-card s2-${genre.style}`;

            const symbol = createText(
                "span",
                "s2-genre-symbol",
                genre.symbol
            );

            const heading = createText(
                "span",
                "s2-genre-name",
                genre.name
            );

            const description = createText(
                "span",
                "s2-genre-description",
                genre.description
            );

            button.append(symbol, heading, description);

            button.addEventListener("click", () => {
                openGenre(genre);
            });

            grid.appendChild(button);
        });

        count.textContent =
            `${results.length} of ${genreData.length} genres`;

        empty.hidden = results.length !== 0;

        hideStudent2Panel("#genreDetails");

        $(grid)
            .stop(true, true)
            .hide()
            .fadeIn(250);
    }

    search.addEventListener("input", renderGenres);

    filters.forEach(button => {
        button.addEventListener("click", () => {
            activeEnergy = button.dataset.energy;

            filters.forEach(item => {
                const active = item === button;

                item.classList.toggle("active", active);
                item.setAttribute("aria-pressed", String(active));
            });

            renderGenres();
        });
    });

    sortButton.addEventListener("click", () => {
        sorted = !sorted;

        sortButton.textContent = sorted
            ? "Original order"
            : "Sort A–Z";

        renderGenres();
    });

    document.getElementById("closeGenre")
        .addEventListener("click", () => {
            hideStudent2Panel("#genreDetails");
        });

    renderGenres();
}

document.addEventListener("DOMContentLoaded", () => {
    if (typeof window.jQuery !== "function") {
        console.error("jQuery is required for Student 2.");
        return;
    }

    initArtists();
    initGenres();
});
