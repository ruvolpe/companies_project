import { renderUserPage } from "./render.js";

function redirect() {
  let home = document.querySelector("#home");

  home.addEventListener("click", () => {
    console.log("click");
    localStorage.clear();
    window.location.replace("../../index.html");
  });
}

redirect();
renderUserPage();
