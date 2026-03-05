// ===============================
// INICIAR CUANDO CARGA EL DOM
// ===============================
document.addEventListener("DOMContentLoaded", () => {

  // Inicializar AOS
  if (typeof AOS !== "undefined") {
    AOS.init({
      duration: 1000,
      once: true
    });
  }

  loadSkills();
  loadPortfolio();
});


// ===============================
// CARGAR HABILIDADES DESDE API
// ===============================
async function loadSkills() {
  const container = document.getElementById("skills-content");
  if (!container) return;

  try {
    const response = await fetch("/api/skills");
    const skills = await response.json();

    container.innerHTML = "";

    skills.forEach(skill => {
      const skillHTML = `
        <div class="mb-3">
          <span><strong>${skill.name}</strong> ${skill.level}%</span>
          <div class="progress">
            <div class="progress-bar bg-primary"
                 role="progressbar"
                 style="width: 0%"
                 data-width="${skill.level}">
            </div>
          </div>
        </div>
      `;
      container.innerHTML += skillHTML;
    });

    animateSkills();

  } catch (error) {
    console.error("Error cargando skills:", error);
  }
}


// ===============================
// ANIMAR BARRAS
// ===============================
function animateSkills() {
  const bars = document.querySelectorAll(".progress-bar");

  bars.forEach(bar => {
    const width = bar.getAttribute("data-width");

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
  const container = document.getElementById("portfolio-content");
  if (!container) return;

  try {
    const response = await fetch("/api/portfolio");
    const items = await response.json();

    container.innerHTML = "";

    items.forEach(item => {
      const col = document.createElement("div");
      col.className = "col-lg-4 col-md-6 mb-4";

      col.innerHTML = `
        <div class="portfolio-wrap shadow">
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
  }
}