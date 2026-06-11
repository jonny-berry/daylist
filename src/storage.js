import {
  setCurrListId,
  loadUserLists,
  userLists,
  currListId
} from "./list-data";

export let colorTheme = "";

export function getTheme() {
  return colorTheme;
}

export function setTheme(theme) {
  colorTheme = theme ?? "light";

  const root = document.documentElement;

  if (colorTheme === "dark") {
    root.classList.add("dark");
  }
  else {
    root.classList.remove("dark");
  }
}

export function saveState() {
  localStorage.setItem("userLists", JSON.stringify(userLists));
  localStorage.setItem("currListId", currListId);
  localStorage.setItem("colorTheme", colorTheme);
}

export function loadState() {
  setTheme(localStorage.getItem("colorTheme"));
  loadUserLists();
  setCurrListId(localStorage.getItem("currListId"));
}
