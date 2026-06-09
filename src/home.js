import "./styles.css";
import "./home.css";
import whitePlusIcon from "./assets/icons/add-white.svg";
import pinIcon from "./assets/icons/pin.svg"
import horizontalDots from "./assets/icons/more.svg"
import { loadState, saveState } from "./storage.js"
import {
  userLists,
  setCurrListId,
  setList,
  createList,
  prependUserList,
  toggleListPin,
} from "./test-data.js";



loadState();



renderHomePage(userLists);



function renderHomePage(list) {
  renderHero();
  
  const listsDisplay = document.createElement("div");
  listsDisplay.className = "lists-display";
  document.body.appendChild(listsDisplay);

  renderCreateList(listsDisplay);
  renderListsDisplay(list, listsDisplay);
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
    prependUserList(createList());
    setCurrListId(userLists.at(0).id);
    saveState();

    window.location.href = "/template.html";
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
}



function renderList(list, listsDisplay) {
  const container = document.createElement("div");
  container.id = list.id;
  container.className = "list-container";
  listsDisplay.appendChild(container);

  container.addEventListener("click", () => {
    setCurrListId(list.id);
    saveState();

    window.location.href = "/template.html";
  })

  const sidebar = document.createElement("div");
  sidebar.className = "list-sidebar";
  container.appendChild(sidebar);

  if (list.isPinned === true) {
    const sidebarBtn = document.createElement("button");
    sidebarBtn.className = "sidebar-btn";
    sidebar.appendChild(sidebarBtn);

    const pinImage = document.createElement("img");
    pinImage.src = pinIcon;
    sidebarBtn.appendChild(pinImage);
  }

  const heading = document.createElement("h2");
  heading.innerText = list.title;
  container.appendChild(heading);

  const moreOptionsBtn = document.createElement("button");
  moreOptionsBtn.className = "list-options-btn";
  container.appendChild(moreOptionsBtn);

  const moreOptionsImage = document.createElement("img");
  moreOptionsImage.src = horizontalDots;

  moreOptionsImage.addEventListener("click", () => {
    event.stopPropagation();
    renderListDropdown(list, moreOptionsBtn);
  })
  
  moreOptionsBtn.appendChild(moreOptionsImage);
}



function renderListsDisplay(list, listsDisplay) {
  for (let i = 0; i < userLists.length; i++) {
    renderList(list[i], listsDisplay);
  }
}



function renderListDropdown(list, imageElParent) {
  const container = document.createElement("div");
  container.className = "more-options-container";
  imageElParent.appendChild(container);

  const pinBtn = document.createElement("button");

  document.addEventListener("click", (e) => {
    if (event.target !== container) {
      container.replaceChildren()
    }
  })

  if (list.isPinned === false) {
    pinBtn.innerText = "Pin list";
  }
  else {
    pinBtn.innerText = "Unpin list";
  }

  pinBtn.className = "option";
  container.appendChild(pinBtn);

  pinBtn.addEventListener("click", () => {
    event.stopPropagation();

    toggleListPin(imageElParent.parentElement.id);
    imageElParent.removeChild(container);

    const listContainer = imageElParent.parentElement;
    const listsDisplay = document.querySelector(".lists-display");

    removeUserLists(listsDisplay);
    renderListsDisplay(userLists, listsDisplay);
  })

  const openAsViewerBtn = document.createElement("button");
  openAsViewerBtn.innerText = "Open as viewer";
  openAsViewerBtn.classList = "option bordered-option";
  container.appendChild(openAsViewerBtn);

  const openAsEditorBtn = document.createElement("button");
  openAsEditorBtn.innerText = "Open as editor";
  openAsEditorBtn.className = "option";
  container.appendChild(openAsEditorBtn);
}



function removeUserLists(listsDisplay) {
  for (let i = listsDisplay.children.length - 1; i > 0; i--) {
    if (listsDisplay.children[i].classList.contains("list-container")) {
      listsDisplay.removeChild(listsDisplay.children[i]);
    }
  }
}