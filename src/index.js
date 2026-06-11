import "./styles.css";
import "./index.css";
import whitePlusIcon from "./assets/icons/add-white.svg";
import pinIcon from "./assets/icons/pin.svg";
import horizontalDotsLight from "./assets/icons/more-light-mode.svg";
import horizontalDotsDark from "./assets/icons/more-dark-mode.svg";
import lightMode from "./assets/icons/light-mode.svg";
import darkMode from "./assets/icons/dark-mode.svg";
import swordBgOne from "./assets/images/sword-bg-1.gif";
import swordBgTwo from "./assets/images/sword-bg-2.gif";
import swordBgThree from "./assets/images/sword-bg-3.gif";
import { setTheme, getTheme, loadState, saveState } from "./storage.js";
import {
  userLists,
  sortUserLists,
  setCurrListId,
  setList,
  createList,
  prependUserList,
  removeList,
  toggleListPin,
} from "./list-data.js";



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
  
  const heroBgs = [ swordBgOne, swordBgTwo, swordBgThree ];
  const bgIndex = Math.floor(Math.random() * (2 - 0 + 1)) + 0;
  container.style.backgroundImage = `url(${heroBgs.at(bgIndex)})`;
  document.body.appendChild(container);

  const colorModeBtn = document.createElement("button");
  colorModeBtn.className = "color-mode-btn";
  container.appendChild(colorModeBtn);

  const colorModeImg = document.createElement("img");
  colorModeImg.src = getTheme() === "dark" ? darkMode : lightMode;
  colorModeImg.className = "color-mode-img";
  colorModeBtn.appendChild(colorModeImg);

  colorModeImg.addEventListener("click", () => {
    const newTheme = getTheme() === "light" || getTheme() === "" ? "dark" : "light";

    colorModeImg.src = newTheme === "dark" ? darkMode : lightMode;
    
    setTheme(newTheme);

    const moreOptionsArray = document.getElementsByClassName("more-options-img");

    for (let i = 0; i < moreOptionsArray.length; i++) {
      if (getTheme() === "light" || getTheme() === "") {
        moreOptionsArray[i].src = horizontalDotsLight;
      }
      else {
        moreOptionsArray[i].src = horizontalDotsDark;
      }
    }

    saveState();
  });

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
    event.stopPropagation();
    dialogEl.showModal();
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
  if (list.color !== "") {
    container.classList.add(`${list.color}-bg`);
  }
  listsDisplay.appendChild(container);

  container.addEventListener("click", () => {
    setCurrListId(list.id);
    saveState();

    window.location.href = "list.html";
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
  moreOptionsImage.className = "more-options-img"

  getTheme() === "light" || getTheme() === "" ?
  moreOptionsImage.src = horizontalDotsLight :
  moreOptionsImage.src = horizontalDotsDark;

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
  if (document.querySelector(".more-options-container")) {
    let previousDropdown = document.querySelector(".more-options-container");
    previousDropdown.parentElement.removeChild(previousDropdown);
  }

  const container = document.createElement("div");
  container.id = crypto.randomUUID();
  container.className = "more-options-container";
  imageElParent.appendChild(container);

  const pinBtn = document.createElement("button");

  document.addEventListener("click", () => {
    if (event.target.id !== container.id) {
      container.replaceChildren();
      container.style.display = "none"
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

  const listContainer = imageElParent.parentElement;
  const listsDisplay = document.querySelector(".lists-display");

  pinBtn.addEventListener("click", () => {
    event.stopPropagation();

    toggleListPin(imageElParent.parentElement.id);
    imageElParent.removeChild(container);

    removeUserLists(listsDisplay);
    renderListsDisplay(userLists, listsDisplay);
  })

  const cycleBtn = document.createElement("button");
  cycleBtn.innerText = "Cycle list color";
  cycleBtn.className = "option";
  container.appendChild(cycleBtn);

  cycleBtn.addEventListener("click", () => {
    event.stopPropagation();

    if (listContainer.classList.contains("blue-bg")) {
      listContainer.classList.remove("blue-bg");
      listContainer.classList += " green-bg";
      list.color = "green";
    }
    else if (listContainer.classList.contains("green-bg")) {
      listContainer.classList.remove("green-bg");
      listContainer.classList += " yellow-bg";
      list.color = "yellow";
    }
    else if (listContainer.classList.contains("yellow-bg")) {
      listContainer.classList.remove("yellow-bg");
      listContainer.classList += " red-bg";
      list.color = "red";
    }
    else if (listContainer.classList.contains("red-bg")) {
      listContainer.classList.remove("red-bg");
      list.color = "";
    }
    else {
      listContainer.classList += " blue-bg";
      list.color = "blue";
    }

    saveState();
  })

  const openAsViewerBtn = document.createElement("button");
  openAsViewerBtn.innerText = "Open as viewer";
  openAsViewerBtn.classList = "option bordered-option";
  container.appendChild(openAsViewerBtn);

  const openAsEditorBtn = document.createElement("button");
  openAsEditorBtn.innerText = "Open as editor";
  openAsEditorBtn.className = "option";
  container.appendChild(openAsEditorBtn);

  const deleteBtn = document.createElement("button");
  deleteBtn.innerText = "Delete list";
  deleteBtn.className = "option";
  container.appendChild(deleteBtn);

  deleteBtn.addEventListener("click", () => {
    event.stopPropagation();
    removeList(listContainer.id);
    removeUserLists(listsDisplay);
    renderListsDisplay(userLists, listsDisplay);
  })
}



function removeUserLists(listsDisplay) {
  for (let i = listsDisplay.children.length - 1; i > 0; i--) {
    if (listsDisplay.children[i].classList.contains("list-container")) {
      listsDisplay.removeChild(listsDisplay.children[i]);
    }
  }
}

let dialogEl = document.getElementsByClassName("create-list-dialog")[0];
let titleInput = document.getElementsByClassName("title-input")[0];

document.querySelector(".close-modal-btn").addEventListener("click", () => {
  dialogEl.close();
})

document.querySelector(".create-list-btn").addEventListener("click", () => {
  event.preventDefault()
  prependUserList(createList(titleInput.value));
  sortUserLists();
  setCurrListId();
  saveState();

  window.location.href = "list.html";
})

document.addEventListener("click", (e) => {
  const rect = dialogEl.getBoundingClientRect();
  const clickedBackdrop =
    e.clientX < rect.left || e.clientX > rect.right ||
    e.clientY < rect.top  || e.clientY > rect.bottom;

  if (clickedBackdrop) {
    dialogEl.close()
  };
})