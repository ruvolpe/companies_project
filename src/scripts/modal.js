import {
  requestEmployees,
  requestCompanies,
  requestCompanyById,
} from "./requests.js";
import {
  hire,
  dismissEmployee,
  editDescription,
  deleteDepartment,
  createDepartmentCRUD,
  editEmployeeCRUD,
  deleteEmployeeCRUD,
} from "./CRUD.js";
import { renderCompaniesSelect, renderDepartments } from "./render.js";

export async function readDepartment(department) {
  const container = document.querySelector("#modalContainer");

  let titleContainer = document.createElement("div");
  let infoContainer = document.createElement("div");
  let selectContainer = document.createElement("div");
  let userContainer = document.createElement("div");

  let title = document.createElement("h1");
  let closeButton = document.createElement("button");
  let departmentDescription = document.createElement("p");
  let companyName = document.createElement("p");
  let userSelect = document.createElement("select");
  let hireButton = document.createElement("button");

  closeButton.innerText = "X";
  departmentDescription.innerHTML = department.description;

  titleContainer.classList.add("title__container");
  title.classList.add("title");
  closeButton.classList.add("close__modal");
  departmentDescription.classList.add("department__description");
  selectContainer.classList.add("select__container");
  userSelect.classList.add("user__select");
  hireButton.classList.add("hire__button");
  userContainer.classList.add("user__container");

  const allUsers = await requestEmployees();
  allUsers.forEach((user) => {
    let userOption = document.createElement("option");
    userOption.value = user.id;
    userOption.innerText = user.name;
    userSelect.append(userOption);
  });

  const employees = await requestEmployees();

  let hiredEmployees = [];

  employees.forEach((employee) => {
    if (employee.department_id === department.id) {
      hiredEmployees.push(employee);
    }
  });

  console.log(hiredEmployees);

  title.innerText = department.name;
  hireButton.innerText = "Contratar";

  hireButton.addEventListener("click", async (event) => {
    event.preventDefault();
    await hire(userSelect.value, department.id);
  });

  hiredEmployees.forEach(async (hiredEmployee) => {
    let userCard = document.createElement("div");
    let userName = document.createElement("p");
    let userCompanyName = document.createElement("p");
    let fireButton = document.createElement("button");

    let company = await requestCompanyById(hiredEmployee.company_id);

    userCompanyName = company.name;

    userCard.classList.add("user__card");
    userName.classList.add("user__name");
    fireButton.classList.add("fire__button");
    console.log(fireButton);

    userName.innerText = hiredEmployee.name;
    fireButton.innerText = "Desligar";

    fireButton.addEventListener("click", () => {
      dismissEmployee(hiredEmployee.id);
    });
    userCard.append(userName, userCompanyName, fireButton);
    userContainer.append(userCard);
  });

  titleContainer.append(title, closeButton);
  infoContainer.append(departmentDescription, companyName);
  selectContainer.append(userSelect, hireButton);

  container.append(
    titleContainer,
    infoContainer,
    selectContainer,
    userContainer
  );
  container.showModal();
  closeModal();
}

export async function editDepartment(department) {
  const container = document.querySelector("#modalContainer");
  let title = document.createElement("h1");
  let closeButton = document.createElement("button");
  let editInput = document.createElement("textarea");
  let saveButton = document.createElement("button");
  let formContainer = document.createElement("div");

  const wrapper = document.createElement("div");

  title.innerText = "Editar Departamento";
  editInput.innerText = department.description;
  saveButton.innerText = "Salvar";
  closeButton.innerText = "X";

  wrapper.classList.add("modal__wrapper");
  title.classList.add("title");
  editInput.classList.add("form__input");

  closeButton.classList.add("close__modal");
  saveButton.classList.add("save__button");

  saveButton.addEventListener("click", async (event) => {
    event.preventDefault();
    await editDescription(editInput.value, department.name, department.id);
    editInput.innerText = department.description;
  });

  formContainer.append(editInput, saveButton);
  wrapper.append(closeButton, title, formContainer);
  container.append(wrapper);
  container.showModal();
  closeModal();
}

export async function deleteDepartmentModal(department) {
  const container = document.querySelector("#modalContainer");
  let title = document.createElement("h1");
  let closeButton = document.createElement("button");
  let deleteButton = document.createElement("button");
  let deparmentCard = document.querySelector(".department__card");
  title.innerText = `Realmente deseja remover o Departamento ${department.name} e demitir seus funcionários?`;
  deleteButton.innerText = "Remover";
  closeButton.innerText = "X";
  closeButton.classList.add("close__modal");
  deleteButton.classList.add("delete__button");

  title.classList.add("title")
  deleteButton.classList.add("delete__button")

  container.append(title, closeButton, deleteButton);
  deleteButton.addEventListener("click", async () => {
    await deleteDepartment(department.id);
    container.innerHTML = "";
    deparmentCard.innerHTML = "";
    container.close();
  });
  container.showModal();
  closeModal();
}

export async function editEmployee(employee) {
  const container = document.querySelector("#modalContainer");
  let infoContainer = document.createElement("div");
  let title = document.createElement("h1");
  let closeButton = document.createElement("button");
  let nameInput = document.createElement("input");
  let emailInput = document.createElement("input");
  let saveButton = document.createElement("button");

  closeButton.innerText = "X";
  title.innerText = "Editar Usuário";
  saveButton.innerText = "Salvar";

  saveButton.classList.add("save__button")

  saveButton.addEventListener("click", () => {
    editEmployeeCRUD(employee, nameInput.value, emailInput.value);
  });

  closeButton.classList.add("close__modal");
  infoContainer.append(title, nameInput, emailInput, saveButton);
  container.append(closeButton, infoContainer);

  container.showModal();
  closeModal();
}

export async function deleteEmployee(employee) {
  const container = document.querySelector("#modalContainer");
  let title = document.createElement("h1");
  let closeButton = document.createElement("button");
  let deleteButton = document.createElement("button");
  title.innerText = `Realmente deseja remover o usuário ${employee.name}?`;
  closeButton.innerText = "X";
  deleteButton.innerText = "Remover";
  closeButton.classList.add("close__modal");

  deleteButton.addEventListener("click", () => {
    deleteEmployeeCRUD(employee.id);
  });

  container.append(closeButton, title, deleteButton);
  container.showModal();
  closeModal();
}

export async function createDepartmentModal() {
  const container = document.querySelector("#modalContainer");
  const createButton = document.querySelector(".create__department--button");
  let title = document.createElement("h1");
  let closeButton = document.createElement("button");
  let nameInput = document.createElement("input");
  let descriptionInput = document.createElement("input");
  let selectCompany = document.createElement("select");
  const createDepartmentButton = document.createElement("button");
  const companySelector = document.createElement("select");

  const allCompanies = await requestCompanies();

  allCompanies.forEach((company) => {
    let selector = document.createElement("option");

    selector.value = company.id;
    selector.innerText = company.name;

    companySelector.append(selector);
  });

  createDepartmentButton.addEventListener("click", async () => {
    console.log("clicou");
    renderCompaniesSelect();
    await createDepartmentCRUD(
      nameInput.value,
      descriptionInput.value,
      companySelector.value
    );
  });

  title.innerText = "Criar departamento";
  closeButton.innerText = "X";
  createDepartmentButton.innerText = "criar";
  closeButton.classList.add("close__modal");

  container.append(
    title,
    nameInput,
    descriptionInput,
    companySelector,
    createDepartmentButton,
    closeButton
  );
  container.showModal();
  closeModal();
}

function closeModal() {
  const container = document.querySelector("#modalContainer");
  const button = document.querySelector(".close__modal");
  button.addEventListener("click", () => {
    container.close();
    container.innerText = "";
  });
}
