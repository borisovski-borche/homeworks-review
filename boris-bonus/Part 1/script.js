let addBtn = document.getElementById("addBtn");
const firstNameInput = document.getElementById("firstName");
const lastNameInput = document.getElementById("lastName");
const numberInput = document.getElementById("phoneNumber");

//editing global variable used to tell the program which contact we are editing
let editingId = null;
let contacts = [];

//function for adding contacts to the array
let addContactToArr = (firstName, lastName, phoneNumber, contactArr) => {
  //here i also add an Id to make it easier for editing
  const id = Math.floor(Math.random() * 100000);

  let contact = {
    id,
    firstName,
    lastName,
    phoneNumber,
  };

  //adding the contact to the array as an object
  contactArr.push(contact);
};

const editContact = contact => {
  //sets is editing to true and populates inputs
  editingId = contact.id;
  firstNameInput.value = contact.firstName;
  lastNameInput.value = contact.lastName;
  phoneNumber.value = contact.phoneNumber;
};

const saveEditedContact = (id, firstName, lastName, phoneNumber) => {
  //finding the element we are trying to edit
  const contact = contacts.find(el => el.id === id);

  if (contact) {
    contact.firstName = firstName;
    contact.lastName = lastName;
    contact.phoneNumber = phoneNumber;
  }

  //resetting the editing id variable to stop editing
  editingId = null;
};

const resetInputs = () => {
  firstNameInput.value = "";
  lastNameInput.value = "";
  numberInput.value = "";
};

//function for rendering the entire table using the array
const renderArr = () => {
  //selecting the table
  let table = document.getElementById("table");
  table.innerHTML = "";

  //looping over every contact in the array and creating the HTML for it and the event listeners for edit and delete buttons
  for (let contact of contacts) {
    let row = document.createElement("tr");
    row.innerHTML = `
    <td> ${contact.firstName} </td>
    <td> ${contact.lastName} </td>
    <td> ${contact.phoneNumber} </td>
    <td> <button class="editBtn"> Edit </button> </td>
    <td> <button class="deleteBtn"> X </button> </td>`;

    row.querySelector(".editBtn").addEventListener("click", e => {
      editContact(contact);
    });
    row.querySelector(".deleteBtn").addEventListener("click", e => {
      //here we remove the html
      row.remove();
      //here we remove the contact from the array by reassigning contacts to a filtered array
      contacts = contacts.filter(el => el.id !== contact.id);
    });

    //adding the html
    table.appendChild(row);
  }
};

addBtn.addEventListener("click", e => {
  e.preventDefault();
  let firstName = document.getElementById("firstName").value;
  let lastName = document.getElementById("lastName").value;
  let phoneNumber = document.getElementById("phoneNumber").value;

  if (firstName == "" || lastName == "" || phoneNumber == "") {
    alert("Error input, try again");
  }

  if (editingId) {
    //editing id is true we save the edidted contact
    saveEditedContact(editingId, firstName, lastName, phoneNumber);
  } else {
    //editingid is false and we add a new contact
    addContactToArr(firstName, lastName, phoneNumber, contacts);
  }

  //rerendering the entire array
  renderArr(contacts);

  //resetting the inputs
  resetInputs();
});

//*IMPORTANT : Any questions send me an email
