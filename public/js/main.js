class Portfolio {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
  }

  async loadProjects() {
    try {
      const response = await fetch("/api/projects");
      const projects = await response.json();
      this.render(projects);
    } catch (error) {
      console.error("Error:", error);
    }
  }

  render(projects) {
    this.container.innerHTML = "";

    projects.forEach(project => {
      this.container.innerHTML += `
        <div class="col-md-4 mb-4">
          <div class="card shadow">
            <div class="card-body">
              <h5>${project.title}</h5>
              <p class="text-muted">${project.category}</p>
              <p>${project.description}</p>
            </div>
          </div>
        </div>
      `;
    });
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const portfolio = new Portfolio("portfolio-container");
  portfolio.loadProjects();
});