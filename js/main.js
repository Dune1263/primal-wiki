// Detectar si estamos dentro de /pages/
const basePath = window.location.pathname.includes("/pages/")
    ? "../"
    : "";

// Cargar navbar dinámicamente
fetch(basePath + "components/navbar.html")
    .then(res => res.text())
    .then(html => {
        document.body.insertAdjacentHTML("afterbegin", html);

        // Después de insertar el navbar, asignar enlaces
        attachNavbarLinks();
    })
    .catch(err => console.error("Navbar error:", err));


// ----------------------
//     NAVBAR LINKS
// ----------------------
function attachNavbarLinks() {

    const home = document.getElementById("home-link");
    const links = document.querySelectorAll("nav a[data-link]");

    // HOME
    home.href = basePath + "index.html";

    // OTRAS SECCIONES
    links.forEach(link => {
        const page = link.getAttribute("data-link");

        switch (page) {

            case "story":
                link.href = basePath + "pages/story.html";
                break;

            case "characters":
                link.href = basePath + "pages/characters.html";
                break;

            case "realms":
                link.href = basePath + "pages/realms.html";
                break;

            case "clans":
                link.href = basePath + "pages/clans.html";
                break;
        }
    });
}
