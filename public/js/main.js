// Inicializar AOS
AOS.init({
  duration: 1000,
  once: true
});

// Animación de skills
document.addEventListener("DOMContentLoaded", () => {
  const skillBars = document.querySelectorAll(".skill-bar");

  skillBars.forEach(bar => {
    const width = bar.getAttribute("data-width");
    setTimeout(() => {
      bar.style.width = width + "%";
    }, 500);
  });

  cargarPortfolio();
});

// Proyectos propios
const proyectos = [
  { titulo: "Juego Cachipún", categoria: "JavaScript" },
  { titulo: "Juego Ahorcado", categoria: "JavaScript" },
  { titulo: "Sistema Inventario", categoria: "ES6 OOP" },
  { titulo: "API Superhéroes", categoria: "API REST" }
];

// Cargar portfolio (proyectos + API externa)
async function cargarPortfolio() {

  const contenedor = document.getElementById("portfolio-container");

  // Mostrar proyectos propios
  proyectos.forEach(proyecto => {
    contenedor.innerHTML += `
      <div class="col-lg-4 col-md-6 mb-4" data-aos="zoom-in">
        <div class="portfolio-wrap">
          <img src="https://picsum.photos/400/300?random=${Math.random()}" class="img-fluid">
          <div class="portfolio-info">
            <h5>${proyecto.titulo}</h5>
            <p>${proyecto.categoria}</p>
          </div>
        </div>
      </div>
    `;
  });

  // API externa Studio Ghibli
  try {
    const response = await fetch("https://ghibliapi.vercel.app/films");
    const data = await response.json();

    data.slice(0, 3).forEach(film => {
      contenedor.innerHTML += `
        <div class="col-lg-4 col-md-6 mb-4" data-aos="zoom-in">
          <div class="portfolio-wrap">
            <img src="https://picsum.photos/400/300?random=${Math.random()}" class="img-fluid">
            <div class="portfolio-info">
              <h5>${film.title}</h5>
              <p>${film.release_date}</p>
            </div>
          </div>
        </div>
      `;
    });

  } catch (error) {
    console.error("Error cargando API:", error);
  }
}