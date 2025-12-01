document.addEventListener("DOMContentLoaded", () => {
    const base = window.location.pathname.includes("/pages/") ? "../" : "";

    const container = document.getElementById("hero");
    if (!container) return;

    const bg  = container.dataset.bg || "";
    const title = container.dataset.title || "";
    const sub = container.dataset.sub || "";

    fetch(base + "components/hero.html")
        .then(r => r.text())
        .then(html => {
            container.innerHTML = html;

            document.getElementById("hero-bg").src = base + bg;
            document.getElementById("hero-title").textContent = title;

            const subEl = document.getElementById("hero-sub");
            if (sub) subEl.textContent = sub;
            else subEl.remove();
        });
});
