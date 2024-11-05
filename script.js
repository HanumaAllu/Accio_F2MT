let employees = [];
let employeeId = 1;

function addEmployee() {
  // Get input values
  const name = document.getElementById("name").value;
  const profession = document.getElementById("profession").value;
  const age = document.getElementById("age").value;

  // Get message div for error or success
  const messageDiv = document.getElementById("message");
  const noEmployeesMessage = document.getElementById("noEmployeesMessage");

  // Validate input fields
  if (name === "" || profession === "" || age === "") {
    messageDiv.classList.add("error");
    messageDiv.classList.remove("success");
    messageDiv.textContent =
      "Error : Please Make sure All the fields are filled before adding in an employee !";
    messageDiv.style.display = "block";
    return;
  }

  // Create employee object
  const employee = {
    id: employeeId++,
    name: name,
    profession: profession,
    age: parseInt(age),
  };

  // Add to employees array
  employees.push(employee);

  // Clear form fields
  document.getElementById("name").value = "";
  document.getElementById("profession").value = "";
  document.getElementById("age").value = "";

  // Display success message
  messageDiv.classList.add("success");
  messageDiv.classList.remove("error");
  messageDiv.textContent = "Success : Employee Added!";
  messageDiv.style.display = "block";

  // Update the list of added employees
  displayEmployees();

  // Hide the "no employees" message if there are employees
  if (employees.length > 0) {
    noEmployeesMessage.style.display = "none";
  }
}

function displayEmployees() {
  const employeeListDiv = document.getElementById("employeeList");
  employeeListDiv.innerHTML = ""; // Clear the previous list

  // Loop through the employees array and create employee divs
  employees.forEach((employee, index) => {
    const employeeDiv = document.createElement("div");
    employeeDiv.classList.add("employee-card");

    // Create a div to hold the employee information (Name, Profession, Age) with serial number
    const employeeInfoDiv = document.createElement("div");
    employeeInfoDiv.classList.add("employee-info");
    employeeInfoDiv.innerHTML = `
      <span>${index + 1}.</span>
      <span>Name: ${employee.name}</span>
      <span>Profession: ${employee.profession}</span>
      <span>Age: ${employee.age}</span>
    `;

    // Create the delete button
    const deleteButton = document.createElement("button");
    deleteButton.classList.add("delete");
    deleteButton.innerText = "Delete User";
    deleteButton.onclick = () => deleteEmployee(employee.id); // Pass the employee ID to delete

    // Append employee info and delete button
    employeeDiv.appendChild(employeeInfoDiv);
    employeeDiv.appendChild(deleteButton);
    employeeListDiv.appendChild(employeeDiv);
  });
}

function deleteEmployee(id) {
  // Filter out the employee with the given id
  employees = employees.filter((employee) => employee.id !== id);

  // Update the employee list after deletion
  displayEmployees();

  // Show the "no employees" message if no employees are left
  if (employees.length === 0) {
    document.getElementById("noEmployeesMessage").style.display = "block";
  }
}
