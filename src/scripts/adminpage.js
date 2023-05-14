import { createDepartmentModal } from "./modal.js";
import { renderCompaniesSelect, renderDepartments, renderEmployees } from "./render.js";

function redirect() {
  let home = document.querySelector("#home");

  home.addEventListener("click", () => {
    console.log("click");
    window.location.replace("../../index.html");
  });
}

function createDepartment(){
  const createButton = document.querySelector(".create__department--button")
  createButton.addEventListener("click", (()=>{
    createDepartmentModal()
  }))
}

redirect();
renderCompaniesSelect()
renderDepartments()
renderEmployees()
createDepartment()
