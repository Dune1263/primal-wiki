document.addEventListener("DOMContentLoaded", () => {
    const base = window.location.pathname.includes("/pages/") ? "../" : "";

    fetch(base + "components/footer.html")
        .then(res => res.text())
        .then(html => {
            document.body.insertAdjacentHTML("beforeend", html);
        })
        .catch(err => console.error("Footer error:", err));
});
