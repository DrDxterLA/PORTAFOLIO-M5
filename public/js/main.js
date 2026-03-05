// ===============================
// INICIALIZAR AOS
// ===============================
document.addEventListener("DOMContentLoaded", () => {

  if (typeof AOS !== "undefined") {
    AOS.init({
      duration: 1000,
      once: true
    });
  }

  animateSkills();
  loadPortfolio();

});


// ===============================
// ANIMACIÓN BARRAS SKILLS
// ===============================
function animateSkills() {
  const skillBars = document.querySelectorAll(".skill-bar");

  skillBars.forEach(bar => {
    const width = bar.getAttribute("data-width");
    bar.style.width = "0%";

    setTimeout(() => {
      bar.style.transition = "width 1.5s ease-in-out";
      bar.style.width = width + "%";
    }, 300);
  });
}


// ===============================
// CARGAR PORTAFOLIO DESDE API
// ===============================
async function loadPortfolio() {
  const container = document.getElementById("portfolio-container");

  if (!container) return;

  try {
    const response = await fetch("/api/portfolio");
    const data = await response.json();

    container.innerHTML = "";

    data.forEach(item => {
      const col = document.createElement("div");
      col.className = "col-lg-4 col-md-6 mb-4";

      col.innerHTML = `
        <div class="portfolio-wrap shadow" data-aos="zoom-in">
          <img src="${item.image}" class="img-fluid" alt="${item.title}">
          <div class="portfolio-info">
            <h5>${item.title}</h5>
            <p>${item.description}</p>
          </div>
        </div>
      `;

      container.appendChild(col);
    });

  } catch (error) {
    console.error("Error cargando portafolio:", error);

    container.innerHTML = `
      <div class="col-12 text-center text-danger">
        <p>Error al cargar el portafolio desde la API.</p>
      </div>
    `;
  }
}