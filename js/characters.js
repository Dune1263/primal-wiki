document.addEventListener("DOMContentLoaded", () => {

    const base = window.location.pathname.includes("/pages/") ? "../" : "";
    const letters = "abcdefghijklmnopqrstuvwxyz".split("");

    const listEl = document.getElementById("characters-list");
    const searchInput = document.getElementById("character-search");

    let allCharacters = {};
    let loaded = 0;

    // Cargar todos los archivos JSON
    function loadAllLetters() {
        letters.forEach(letter => {
            fetch(`${base}data/characters/json/${letter}.json`)
                .then(res => res.json())
                .then(data => {
                    allCharacters[letter] = data;
                })
                .catch(err => {
                    console.warn(`No file for ${letter}.json`);
                    allCharacters[letter] = {};
                })
                .finally(() => {
                    loaded++;

                    if (loaded === letters.length) {
                        renderAllSections();
                    }
                });
        });
    }

    loadAllLetters();

    // Render ordenado
    function renderAllSections() {
        letters
            .sort()    // orden alfabético A-Z
            .forEach(letter => {
                createLetterSection(letter, allCharacters[letter]);
            });
    }

    // Crear dropdown por letra
    function createLetterSection(letter, data) {
        const group = document.createElement("div");
        group.classList.add("letter-group");

        const header = document.createElement("div");
        header.classList.add("letter-header");
        header.innerHTML = `
            <span>${letter.toUpperCase()}</span>
            <span class="letter-arrow">▾</span>
        `;

        const content = document.createElement("div");
        content.classList.add("letter-content");

        header.addEventListener("click", () => {
            const isOpen = group.classList.contains("open");
            document.querySelectorAll(".letter-group").forEach(g => g.classList.remove("open"));
            if (!isOpen) group.classList.add("open");
        });

        // 🔥 ORDENAR LOS PERSONAJES ALFABÉTICAMENTE POR NOMBRE
        const sortedEntries = Object.entries(data).sort(([a], [b]) =>
            a.localeCompare(b)
        );

        // Añadir personajes ya ordenados
        sortedEntries.forEach(([name, info]) => {
            const card = document.createElement("div");
            card.classList.add("character-card");

            card.onclick = () => {
                window.location.href = `character.html?id=${info.id}`;
            };

            card.innerHTML = `
                <img src="${base}assets/img/characters/${info.image}" />
                <div>
                    <h3>${name}</h3>
                    <p>${info.clan}</p>
                </div>
            `;

            content.appendChild(card);
        });

        group.appendChild(header);
        group.appendChild(content);
        listEl.appendChild(group);
    }

    // Buscador
    searchInput.addEventListener("input", e => {
        const query = e.target.value.toLowerCase();

        document.querySelectorAll(".character-card").forEach(card => {
            const name = card.querySelector("h3").textContent.toLowerCase();
            card.style.display = name.includes(query) ? "flex" : "none";
        });
    });
});
