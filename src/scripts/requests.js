const baseURL = "http://localhost:3333";
const requestHeaders = {
  "Content-type": "application/json",
};

export async function requestGetSector() {
  const allSectors = await fetch(`${baseURL}/categories/readAll`, {
    method: "GET",
  })
    .then((response) => response.json())
    .catch((error) => console.log(error));

  return allSectors;
}

export async function requestCompanies() {
  const allCompanies = await fetch(`${baseURL}/companies/readAll`, {
    method: "GET",
  })
    .then((response) => response.json())
    .catch((error) => console.log(error));

  return allCompanies;
}

export async function requestCompanyById(company_id){
  let token =
  JSON.parse(localStorage.getItem("@kenzieempresas:authToken")) || "";
  const company = await fetch(`${baseURL}/companies/readById/${company_id}`, {
    method: "GET",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
  })
    .then((response) => response.json())
    .catch((error) => console.log(error));

  return company;
}

export async function loginRequest(loginBody) {
  const tokenRequest = await fetch(`${baseURL}/auth/login`, {
    method: "POST",
    headers: requestHeaders,
    body: JSON.stringify(loginBody),
  }).then(async (response) => {
    if (response.ok) {
      const responseJSON = await response.json();
      console.log(responseJSON);
      const { authToken, isAdm } = responseJSON;

      localStorage.setItem(
        "@kenzieempresas:authToken",
        JSON.stringify(authToken)
      );
      localStorage.setItem("@kenzieempresas:isAdm", JSON.stringify(isAdm));
      if (isAdm) {
        location.replace("./adminpage.html");
      } else {
        location.replace("./userpage.html");
      }
    } else {
      const responseJSON = await response.json();
      console.log(responseJSON.message);
    }
  });
  return tokenRequest;
}

export async function signupRequest(signupBody) {
  const tokenRequest = await fetch(`${baseURL}/employees/create`, {
    method: "POST",
    headers: requestHeaders,
    body: JSON.stringify(signupBody),
  }).then(async (response) => {
    if (response.ok) {
      const responseJSON = await response.json();
      const { id, name, email } = responseJSON;

      localStorage.setItem("@kenzieempresas:id", JSON.stringify(id));
      localStorage.setItem("@kenzieempresas:name", JSON.stringify(name));
      localStorage.setItem("@kenzieempresas:email", JSON.stringify(email));
      location.replace("./login.html");
    } else {
      const responseJSON = await response.json();
      console.log(responseJSON.message);
    }
  });
  return tokenRequest;
}

export async function getUser() {
  const token =
    JSON.parse(localStorage.getItem("@kenzieempresas:authToken")) || "";
  const tokenRequest = await fetch(`${baseURL}/employees/profile`, {
    method: "GET",
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then(async (response) => {
    if (response.ok) {
      const responseJSON = await response.json();
      const { id, name, email, is_admin, company_id, department_id } =
        responseJSON;

      localStorage.setItem("@kenzieempresas:id", JSON.stringify(id));
      localStorage.setItem("@kenzieempresas:name", JSON.stringify(name));
      localStorage.setItem("@kenzieempresas:email", JSON.stringify(email));
      localStorage.setItem(
        "@kenzieempresas:is_admin",
        JSON.stringify(is_admin)
      );
      localStorage.setItem(
        "@kenzieempresas:company_id",
        JSON.stringify(company_id)
      );
      localStorage.setItem(
        "@kenzieempresas:department_id",
        JSON.stringify(department_id)
      );
      return responseJSON;
    } else {
      const responseJSON = await response.json();
      console.log(responseJSON.message);
    }
  });
  return tokenRequest;
}

export async function requestDepartments(companyID) {
  let token =
    JSON.parse(localStorage.getItem("@kenzieempresas:authToken")) || "";
  const departments = await fetch(
    `${baseURL}/departments/readByCompany/${companyID}`,
    {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  ).then(async (response) => {
    if (response.ok) {
      const responseJSON = await response.json();
      const { id, name, description, company_id } = responseJSON;

      localStorage.setItem("@kenzieempresas:department_id", JSON.stringify(id));
      localStorage.setItem(
        "@kenzieempresas:department_name",
        JSON.stringify(name)
      );
      localStorage.setItem(
        "@kenzieempresas:description",
        JSON.stringify(description)
      );
      localStorage.setItem(
        "@kenzieempresas:company_id",
        JSON.stringify(company_id)
      );
      return responseJSON;
    } else {
      const responseJSON = await response.json();
      console.log(responseJSON.message);
    }
  });
  return departments;
}

export async function requestEmployees() {
  let token =
    JSON.parse(localStorage.getItem("@kenzieempresas:authToken")) || "";
  const employees = await fetch(`${baseURL}/employees/readAll`, {
    method: "GET",
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then(async (response) => {
    if (response.ok) {
      const responseJSON = await response.json();
      const { id, name, email, is_admin, company_id, department_id } =
        responseJSON;

      localStorage.setItem("@kenzieempresas:employee_id", JSON.stringify(id));
      localStorage.setItem(
        "@kenzieempresas:employee_name",
        JSON.stringify(name)
      );
      localStorage.setItem(
        "@kenzieempresas:employee_email",
        JSON.stringify(email)
      );
      localStorage.setItem(
        "@kenzieempresas:employee_is_admin",
        JSON.stringify(is_admin)
      );
      localStorage.setItem(
        "@kenzieempresas:employee_company_id",
        JSON.stringify(company_id)
      );
      localStorage.setItem(
        "@kenzieempresas:employee_department_id",
        JSON.stringify(department_id)
      );
      return responseJSON;
    } else {
      const responseJSON = await response.json();
      console.log(responseJSON.message);
    }
  });
  return employees;
}

export async function requestDepartmentById(departmentId) {
  let token =
    JSON.parse(localStorage.getItem("@kenzieempresas:authToken")) || "";
  const department = await fetch(`${baseURL}/departments/readById/${departmentId}`, {
    method: "GET",
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => response.json())
    .catch((error) => console.log(error));

  return department;
}