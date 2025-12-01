document.addEventListener("DOMContentLoaded", () => {

    // Detecta si la página está dentro de /pages/
    const basePathStory = window.location.pathname.includes("/pages/")
        ? "../"
        : "";

    // Cargar JSON con los arcos y capítulos
    fetch(basePathStory + "data/story/story.json")
        .then(res => res.json())
        .then(data => renderStory(data))
        .catch(err => console.error("Error loading story.json:", err));

    function renderStory(data) {
        const container = document.getElementById("story-list");

        Object.entries(data).forEach(([arcName, chapters], index) => {

            // Crear item
            const item = document.createElement("div");
            item.classList.add("story-item");

            // HEADER
            const header = document.createElement("div");
            header.classList.add("story-header");
            header.innerHTML = `
                <span>${arcName}</span>
                <span class="arrow">▾</span>
            `;

            // BODY
            const body = document.createElement("div");
            body.classList.add("story-body");

            chapters.forEach(ch => {
                const link = document.createElement("a");
                link.href = `chapter.html?arc=${encodeURIComponent(arcName)}&chapter=${encodeURIComponent(ch)}`; 
                link.textContent = ch;
                body.appendChild(link);
            });

            // Añadir eventos (abrir/cerrar)
            header.addEventListener("click", () => toggleItem(item));

            // Montar
            item.appendChild(header);
            item.appendChild(body);
            container.appendChild(item);
        });
    }

    // Solo un abierto a la vez
    function toggleItem(item) {
        const open = item.classList.contains("open");

        document.querySelectorAll(".story-item")
            .forEach(i => i.classList.remove("open"));

        if (!open) item.classList.add("open");
    }

});
