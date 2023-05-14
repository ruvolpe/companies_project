import {
  getUser,
  requestCompanies,
  requestDepartments,
  requestEmployees,
  requestGetSector,
  requestCompanyById,
  requestDepartmentById
} from "./requests.js";

import {
  readDepartment,
  editDepartment,
  deleteDepartmentModal,
  editEmployee,
  deleteEmployee,
} from "./modal.js";

const sectorSelect = document.querySelector("#sector__select");

export async function renderSelect() {
  const allSectors = await requestGetSector();
  allSectors.forEach((sector) => {
    let selector = document.createElement("option");
    selector.value = sector.id;
    selector.innerText = sector.name;

    sectorSelect.append(selector);
  });
}

export async function idToName() {
  const allSectors = await requestGetSector();
  const allCompanies = await requestCompanies();

  allCompanies.forEach((company) => {
    const result = allSectors.filter((sector) => {
      if (sector.id == company.category_id) {
        return sector.name;
      }
    });
    company.category = result[0].name;
  });

  return allCompanies;
}

export async function renderSectorList(array) {
  const listResultsContainer = document.querySelector(
    ".list__results--container"
  );
  listResultsContainer.innerHTML = "";

  array.forEach((company) => {
    let card = document.createElement("div");
    let title = document.createElement("h1");
    let sectorParagraph = document.createElement("p");

    card.classList.add("company__card");
    title.classList.add("company__title");
    sectorParagraph.classList.add("company__paragraph");

    title.innerText = company.name;
    sectorParagraph.innerText = company.category;

    card.append(title, sectorParagraph);
    listResultsContainer.append(card);
  });
}

export async function renderUserPage() {
  const user = await getUser();
  let infoContainer = document.querySelector(".user__info--container");
  let userName = document.createElement("p");
  let userEmail = document.createElement("p");

  userName.innerText = user.name;
  userEmail.innerText = user.email;

  userName.classList.add("user__name");
  userEmail.classList.add("user__email");
  infoContainer.append(userName, userEmail);

  let companyInfoContainer = document.querySelector(".company__info");
  let emptyCompany = document.createElement("h2");

  console.log(user)

  let company = await requestCompanyById(user.company_id)
  console.log(company)
  let department = await requestDepartmentById(user.department_id)
  
  if (user.company_id === null) {
    emptyCompany.classList.add("empty__company--title");
    emptyCompany.innerText = "Você ainda não foi contratado";
    companyInfoContainer.append(emptyCompany);
  } else {
    let header = document.createElement("h2")
    header.innerText = `${company.name} - ${department.name}`
    companyInfoContainer.append(header)
  }
}
const companySelector = document.querySelector("#companies__select");

export async function renderCompaniesSelect() {
  const allCompanies = await requestCompanies();
  allCompanies.forEach((company) => {
    let selector = document.createElement("option");

    selector.value = company.id;
    selector.innerText = company.name;

    companySelector.append(selector);
  });
}

export async function renderDepartments() {
  const departmentsContainer = document.querySelector(
    ".departments__container"
  );
  companySelector.addEventListener("change", async () => {
    let companySelected = companySelector.value;
    localStorage.setItem("@kenzieempresas:selected_company_id:", companySelected)

    let departments = await requestDepartments(companySelected);

    departmentsContainer.innerHTML = "";

    departments.forEach((department) => {
      let departmentCard = document.createElement("div");
      let infoWrapper = document.createElement("div");
      let departmentName = document.createElement("h3");
      let departmentDescription = document.createElement("p");
      let buttonWrapper = document.createElement("div");
      let readButton = document.createElement("img");
      let editButton = document.createElement("img");
      let deleteButton = document.createElement("img");

      departmentName.innerText = department.name;
      departmentDescription.innerText = department.description;
      readButton.src = "../assets/Vector.svg";
      editButton.src = "../assets/Vector (1).svg";
      deleteButton.src = "../assets/Vector (2).svg";

      departmentCard.classList.add("department__card");
      infoWrapper.classList.add("info__wrapper");
      buttonWrapper.classList.add("button__wrapper");
      departmentName.classList.add("department__name");
      departmentDescription.classList.add("department__description");
      readButton.classList.add("crud__button");
      editButton.classList.add("crud__button");
      deleteButton.classList.add("crud__button");

      readButton.addEventListener("click", () => {
        readDepartment(department);
      });
      editButton.addEventListener("click", () => {
        editDepartment(department);
      });
      deleteButton.addEventListener("click", () => {
        deleteDepartmentModal(department);
      });

      infoWrapper.append(departmentName, departmentDescription);
      buttonWrapper.append(readButton, editButton, deleteButton);
      departmentCard.append(infoWrapper, buttonWrapper);
      departmentsContainer.append(departmentCard);
    });
  });
}

export async function renderEmployees() {
  const employees = await requestEmployees();
  const employeeContainer = document.querySelector(".users__container");
  employees.forEach((employee) => {
    let employeeCard = document.createElement("div");
    let buttonWrapper = document.createElement("div");
    let editButton = document.createElement("img");
    let deleteButton = document.createElement("img");
    let employeeName = document.createElement("h3");

    editButton.src = "../assets/Vector (1).svg";
    deleteButton.src = "../assets/Vector (2).svg";
    employeeName.innerText = employee.name;


    buttonWrapper.classList.add("button__wrapper");
    employeeCard.classList.add("employee__card");
    employeeName.classList.add("employee__name--title");
    editButton.classList.add = "crud__button";
    deleteButton.classList.add = "crud__button";

    editButton.addEventListener("click", (()=>{
      editEmployee(employee)
    }));
    deleteButton.addEventListener("click", ()=>{
      deleteEmployee(employee)
    });

    buttonWrapper.append(editButton, deleteButton);
    employeeCard.append(employeeName, buttonWrapper);
    employeeContainer.append(employeeCard);
  });
}
