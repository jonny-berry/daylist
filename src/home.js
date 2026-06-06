import "./styles.css";
import "./home.css";

renderHome();

function renderHome(list) {
  renderHero();
}

function renderHero() {
  const container = document.createElement("div");
  container.className = "hero";
  document.body.appendChild(container);

  const heading = document.createElement("h1");
  heading.innerText = "Your Daylists";
  heading.className = "hero-text";
  container.appendChild(heading);
}
