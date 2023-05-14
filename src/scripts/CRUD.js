const baseURL = "http://localhost:3333";

export async function hire(employeeId, departmentId){
    let token =
    JSON.parse(localStorage.getItem("@kenzieempresas:authToken")) || "";
    let taskBody = {"department_id": ""}
    taskBody["department_id"] = departmentId
    console.log(taskBody)
    const hiredEmployee = await fetch(`${baseURL}/employees/hireEmployee/${employeeId}`, {
    method: "PATCH",
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(taskBody)
  }).then(async (response) => {
    if (response.ok) {
      const responseJSON = await response.json();
      return responseJSON;
    } else {
      const responseJSON = await response.json();
      console.log(responseJSON.message);
    }
  });
  return hiredEmployee;
}

export async function dismissEmployee(employeeId){
    let token =
    JSON.parse(localStorage.getItem("@kenzieempresas:authToken")) || "";
    const dismissedEmployee = await fetch(`${baseURL}/employees/dismissEmployee/${employeeId}`, {
    method: "PATCH",
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${token}`,
    }
  }).then(async (response) => {
    if (response.ok) {
      const responseJSON = await response.json();
      return responseJSON;
    } else {
      const responseJSON = await response.json();
      console.log(responseJSON.message);
    }
  });
  return dismissedEmployee;
}

export async function editDescription(departmentDescription, departmentName, departmentId){
    let token =
    JSON.parse(localStorage.getItem("@kenzieempresas:authToken")) || "";
    let taskBody = {
        "description": departmentDescription,
        "name": departmentName
      }
    const editedDepartment = await fetch(`${baseURL}/departments/update/${departmentId}`, {
    method: "PATCH",
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(taskBody)
  }).then(async (response) => {
    if (response.ok) {
      const responseJSON = await response.json();
      return responseJSON;
    } else {
      const responseJSON = await response.json();
      console.log(responseJSON.message);
    }
  });
  return editedDepartment;
}

export async function deleteDepartment(departmentId){
    let token =
    JSON.parse(localStorage.getItem("@kenzieempresas:authToken")) || "";
    const deletedDepartment = await fetch(`${baseURL}/departments/delete/${departmentId}`, {
    method: "DELETE",
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${token}`,
    }
  }).then(async (response) => {
    if (response.ok) {
      const responseJSON = await response.json();
      console.log(responseJSON.message)
      return responseJSON;
    } else {
      const responseJSON = await response.json();
      console.log(responseJSON.message);
    }
  });
  return deletedDepartment;
}

export async function createDepartmentCRUD(name, description, company_id){
    let token =
    JSON.parse(localStorage.getItem("@kenzieempresas:authToken")) || "";
    
    let taskBody = {
        "name": name ,
        "description": description ,
        "company_id": company_id
      }

    const departmentCreated = await fetch(`${baseURL}/departments/create`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(taskBody)
  }).then(async (response) => {
    if (response.ok) {
      const responseJSON = await response.json();
      console.log(responseJSON.message)
      return responseJSON;
    } else {
      const responseJSON = await response.json();
      console.log(responseJSON.message);
    }
  });
  return departmentCreated;
}

export async function editEmployeeCRUD(employee, editedName, editedEmail){
    let token =
    JSON.parse(localStorage.getItem("@kenzieempresas:authToken")) || "";
    let taskBody = {
        "name": editedName,
        "email": editedEmail
      }
    const editedEmployee = await fetch(`${baseURL}/employees/updateEmployee/${employee.id}`, {
    method: "PATCH",
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(taskBody)
  }).then(async (response) => {
    if (response.ok) {
      const responseJSON = await response.json();
      return responseJSON;
    } else {
      const responseJSON = await response.json();
      console.log(responseJSON.message);
    }
  });
  return editedEmployee;
}

export async function deleteEmployeeCRUD(employeeId){
    let token =
    JSON.parse(localStorage.getItem("@kenzieempresas:authToken")) || "";
    const deletedEmployee = await fetch(`${baseURL}/employees/deleteEmployee/${employeeId}`, {
    method: "DELETE",
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${token}`,
    }
  }).then(async (response) => {
    if (response.ok) {
      const responseJSON = await response.json();
      console.log(responseJSON.message)
      return responseJSON;
    } else {
      const responseJSON = await response.json();
      console.log(responseJSON.message);
    }
  });
  return deletedEmployee;
}