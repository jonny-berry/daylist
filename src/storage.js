import {
  setCurrListId,
  loadUserLists,
  userLists,
  currListId
} from "./list-data";

export function saveState() {
  localStorage.setItem("userLists", JSON.stringify(userLists));
  localStorage.setItem("currListId", currListId);
}

export function loadState() {
  loadUserLists();
  setCurrListId(localStorage.getItem("currListId"));
}
