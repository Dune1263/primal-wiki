// Detect base path
const chapterBase = window.location.pathname.includes("/pages/") ? "../" : "";

// Leer parámetros
const params = new URLSearchParams(window.location.search);
const arc = params.get("arc");
const chapter = params.get("chapter");

// Elementos del DOM
const titleEl = document.getElementById("chapter-title");
const contentEl = document.getElementById("chapter-content");
const prevBtn = document.getElementById("prev-chapter");
const nextBtn = document.getElementById("next-chapter");

// Validación básica
if (!arc || !chapter) {
  titleEl.textContent = "Chapter Not Found";
  contentEl.textContent = "Invalid chapter link.";
}

// Markdown parser
function markdownToHTML(md) {
  return md
    .replace(/^# (.*$)/gim, '<h1>$1</h1>')
    .replace(/^## (.*$)/gim, '<h2>$1</h2>')
    .replace(/^### (.*$)/gim, '<h3>$1</h3>')
    .replace(/\*\*(.*)\*\*/gim, '<strong>$1</strong>')
    .replace(/\*(.*)\*/gim, '<em>$1</em>')
    .replace(/!\[(.*?)\]\((.*?)\)/gim, "<img alt='$1' src='$2' />")
    .replace(/\[(.*?)\]\((.*?)\)/gim, "<a href='$2'>$1</a>")
    .replace(/\n$/gim, "<br/>");
}

// Construir ruta del markdown
const mdPath = `${chapterBase}data/story/${arc.toLowerCase().replace(/ /g, "-")}/${chapter.toLowerCase().replace(/ /g, "-")}.md`;

// Cargar story.json para navegación
fetch(`${chapterBase}data/story.json`)
  .then(res => res.json())
  .then(storyData => setupNavigation(storyData))
  .catch(err => console.error("story.json error:", err));

function setupNavigation(storyData) {
  const chapters = storyData[arc]; // Lista de capítulos de este arco
  const index = chapters.indexOf(chapter); // Ubicación actual

  // ← Botón previo
  if (index > 0) {
    const prevChapter = chapters[index - 1];
    prevBtn.onclick = () => navigateTo(prevChapter);
  } else {
    prevBtn.disabled = true;
  }

  // → Botón siguiente
  if (index < chapters.length - 1) {
    const nextChapter = chapters[index + 1];
    nextBtn.onclick = () => navigateTo(nextChapter);
  } else {
    nextBtn.disabled = true;
  }
}

// Navegación automática
function navigateTo(chName) {
  const formatted = chName.toLowerCase().replace(/ /g, "-");
  window.location.href = `chapter.html?arc=${arc}&chapter=${chName}`;
}

// Cargar archivo MD
fetch(mdPath)
  .then(res => res.text())
  .then(md => {
    titleEl.textContent = `${arc} — ${chapter}`;
    contentEl.innerHTML = markdownToHTML(md);
  })
  .catch(err => {
    titleEl.textContent = "Error loading chapter";
    contentEl.textContent = "Could not load file.";
    console.error("MD Error:", err);
  });
