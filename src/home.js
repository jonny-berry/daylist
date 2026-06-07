import "./styles.css";
import "./home.css";
import whitePlusIcon from "./assets/icons/add-white.svg";
import horizontalDots from "./assets/icons/more.svg"
import {
  createList,
  pushUserList
} from "./test-data.js";



renderHomePage();



function renderHomePage(list) {
  renderHero();
  
  const listsDisplay = document.createElement("div");
  listsDisplay.className = "lists-display";
  document.body.appendChild(listsDisplay);

  renderCreateList(listsDisplay);
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



function renderCreateList(listsDisplay) {
  const newListContainer = document.createElement("div");
  newListContainer.className = "new-list-container";
  listsDisplay.appendChild(newListContainer);
  
  newListContainer.addEventListener("click", () => {
    pushUserList(createList());
  })

  const sidebar = document.createElement("div");
  sidebar.className = "list-sidebar";
  newListContainer.appendChild(sidebar);

  const sidebarBtn = document.createElement("button");
  sidebarBtn.className = "sidebar-btn";
  sidebar.appendChild(sidebarBtn);

  const plugImage = document.createElement("img");
  plugImage.src = whitePlusIcon;
  sidebarBtn.appendChild(plugImage);

  const heading = document.createElement("h2");
  heading.textContent = "Create new Daylist";
  newListContainer.appendChild(heading);

  const moreOptionsBtn = document.createElement("button");
  moreOptionsBtn.className = "list-options-btn";
  newListContainer.appendChild(moreOptionsBtn);

  const moreOptionsImage = document.createElement("img");
  moreOptionsImage.src = horizontalDots;
  moreOptionsBtn.appendChild(moreOptionsImage);
}
