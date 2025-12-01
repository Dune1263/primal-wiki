document.addEventListener("DOMContentLoaded", () => {

    const base = window.location.pathname.includes("/pages/") ? "../" : "";

    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");

    if (!id) {
        alert("Character not found");
        return;
    }

    // Tomamos la primera letra del id para saber qué JSON cargar
    const letter = id[0].toLowerCase();

    fetch(`${base}data/characters/json/${letter}.json`)
        .then(res => res.json())
        .then(data => {
            let character = null;

            // Buscamos el personaje por ID dentro del JSON de esa letra
            Object.values(data).forEach(obj => {
                if (obj.id === id) {
                    character = obj;
                }
            });

            if (!character) {
                document.getElementById("info-name").textContent = "Character Not Found";
                return;
            }

            renderCharacter(character);
        })
        .catch(err => console.error("Error loading character:", err));


    function renderCharacter(c) {
        // Imagen
        document.getElementById("character-image").src =
            `${base}assets/img/characters/${c.image}`;

        // Datos básicos
        document.getElementById("info-name").textContent   = c.name ?? "-";
        document.getElementById("info-age").textContent    = c.age ?? "-";
        document.getElementById("info-gender").textContent = c.gender ?? "-";
        document.getElementById("info-race").textContent   = c.race ?? "-";
        document.getElementById("info-height").textContent = c.height ?? "-";
        document.getElementById("info-weight").textContent = c.weight ?? "-";
        document.getElementById("info-state").textContent  = c.state ?? "-";

        // 🔥 Primal Energy (en tu JSON es "primalEnergy")
        const energy = c.primalEnergy ?? c.energy ?? "-";
        document.getElementById("info-energy").textContent = energy;

        // 🔥 Weapons (array o string)
        let weaponsText = "-";
        if (Array.isArray(c.weapons)) {
            weaponsText = c.weapons.length > 0 ? c.weapons.join(", ") : "-";
        } else if (typeof c.weapons === "string") {
            weaponsText = c.weapons;
        }
        document.getElementById("info-weapons").textContent = weaponsText;

        // 🔥 Special Abilities (en tu JSON es "specialAbilities")
        let abilitiesText = "-";
        if (Array.isArray(c.specialAbilities)) {
            abilitiesText = c.specialAbilities.length > 0 ? c.specialAbilities.join(", ") : "-";
        } else if (typeof c.specialAbilities === "string") {
            abilitiesText = c.specialAbilities;
        }
        document.getElementById("info-abilities").textContent = abilitiesText;

        // Clan
        document.getElementById("info-clan").textContent = c.clan ?? "-";

        // About
        document.getElementById("info-about").textContent = c.about ?? "";

        // APPEARANCES
if (c.appearances && c.appearances.length > 0) {
    document.getElementById("info-appearances").innerHTML =
        c.appearances.map(a => `<li>${a}</li>`).join("");
}

// EXTRA ABILITIES
if (c.extraAbilities && c.extraAbilities.length > 0) {
    document.getElementById("info-abilities-extra").innerHTML =
        c.extraAbilities.map(a => `<li>${a}</li>`).join("");
}

// TRIVIA
if (c.trivia && c.trivia.length > 0) {
    document.getElementById("info-trivia").innerHTML =
        c.trivia.map(t => `<li>${t}</li>`).join("");
}

// QUOTES
if (c.quotes && c.quotes.length > 0) {
    document.getElementById("info-quotes").innerHTML =
        c.quotes.map(q => `<div>"${q}"</div>`).join("");
}

// GALLERY
if (c.gallery && c.gallery.length > 0) {
    document.getElementById("info-gallery").innerHTML =
        c.gallery.map(img => `<img src="${base}assets/img/characters/gallery/${img}">`).join("");
}

    }

});
