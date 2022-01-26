//get elements from the HTML
let myTable = document.getElementById("table");
let userInputFirstName = document.getElementById("firstName");
let userInputLastName = document.getElementById("lastName");
let userInputNumber = document.getElementById("number");
let addButton = document.getElementById("addBtn");
let saveButton = document.getElementById("saveBtn");
let deleteButton = document.getElementsByClassName("deleteBtn");
let editButton = document.getElementsByClassName("editBtn");

//emtpy array to store the objects
let phoneBook = [];

//we use this index to tell the app that we are editing if it positive, and the value is what object in the array we are editing
let editingIndex = null;

//function to create the objects
let createContact = (name, lastName, number, array) => {
  contact = {
    name: name,
    lastName: lastName,
    number: number,
  };
  array.push(contact);
  return contact;
};

let populateInputs = contact => {
  userInputFirstName.value = contact.name;
  userInputLastName.value = contact.lastName;
  userInputNumber.value = contact.number;

  //when we populate the inputs we also set the editing index to the contact that we selected.
  editingIndex = phoneBook.indexOf(contact);
};

let saveContact = (index, array) => {
  //this functions needs to update the object in the array
  //and update the html <tr> in the DOM

  //Below we update the already exisitng contact in the array
  array[index].name = userInputFirstName.value;
  array[index].lastName = userInputLastName.value;
  array[index].number = userInputNumber.value;

  //Here we select the row we wish to update in the view (i use +1 here cause the [0] row is the one with the <th>)
  const cells = myTable
    .querySelectorAll("tr")
    [index + 1].querySelectorAll("td");

  //Updating of the <td> cells in their respective row
  cells[0].innerText = userInputFirstName.value;
  cells[1].innerText = userInputLastName.value;
  cells[2].innerText = userInputNumber.value;
};

//function to create the rows with data cells
let addContactRow = (table, name, lastName, number, array) => {
  if (
    name.length < 2 ||
    lastName.length < 2 ||
    number.length < 2 ||
    isNaN(number)
  ) {
    alert("Wrong input");
  } else {
    let contact = createContact(name, lastName, number, array);
    //create new table row with data cells
    let newRow = table.insertRow(table.length);
    newRow.insertCell(0).innerHTML = name;
    newRow.insertCell(1).innerHTML = lastName;
    newRow.insertCell(2).innerHTML = number;
    let cellFour = newRow.insertCell(3);
    cellFour.innerHTML = `<button class="editBtn">Edit</button>`;
    cellFour.innerHTML += `<button class="deleteBtn">Delete</button>`;

    //here we attach event listeners to edit and delete when we are generating the row
    //this will prevent any duplicate events bubbling ( will cover this in advanced js )
    //but the point is that the row and its logic are contained within it
    //no need to select button outside of it
    cellFour.querySelector(".editBtn").addEventListener("click", () => {
      populateInputs(contact);

      console.log("Edit Button was clicked");
    });
    cellFour.querySelector(".deleteBtn").addEventListener("click", () => {
      //you dont need to add a selected row because in the scope
      //of the function this row is always the parent row that has the button
      newRow.remove();

      //here we find out the index of the contact itself and the use it to delete only that contact
      //from the array
      const index = array.indexOf(contact);
      array.splice(index, 1);

      console.log("Delete Button was clicked");
    });

    // buttons(deleteButton, editButton, phoneBook, saveButton);
  }
};

saveButton.addEventListener("click", () => {
  //here we check if editing index is not null or undefined, if it is a number that means we have selected
  //a row and we are editing
  if (editingIndex >= 0) {
    saveContact(editingIndex, phoneBook);
    //reseting the editing index after editing is finished
    editingIndex = null;
    resetForm();
  }
});

//reset the input forms
let resetForm = () => {
  userInputFirstName.value = "";
  userInputLastName.value = "";
  userInputNumber.value = "";
};

//global variable, given a value later in the edit and save buttons
let selectedRow = null;

//function to add listeners on the buttons
let buttons = (btnOne, btnTwo, array, btnThree) => {
  //delete button
  for (let i = 0; i < btnOne.length; i++) {
    let button = btnOne[i];
    button.addEventListener("click", function (event) {
      event.target.parentElement.parentElement.remove();
      let deletedElement = array.findIndex(element => element == contact);
      //first problem, if i have an array of more elements (4,5) and i either delete the first or second element it deletes my entire array
      //-------
      //The problem here is that this event is fired off multiple times therefore causing multiple deletions
      //and how splice works if index is -1 it will delete everything, in this case deletedElement is sometimes -1 and it deletes everything
      console.log(deletedElement);
      array.splice(deletedElement, 1);
      console.log(array);
    });
  }
  //edit button
  for (let i = 0; i < btnTwo.length; i++) {
    let edit = btnTwo[i];
    edit.addEventListener("click", function (event) {
      selectedRow = event.target.parentElement.parentElement;
      (userInputFirstName.value = selectedRow.cells[0].innerHTML),
        (userInputLastName.value = selectedRow.cells[1].innerHTML),
        (userInputNumber.value = selectedRow.cells[2].innerHTML);
    });
  }
  //save button if content edited
  btnThree.addEventListener("click", function () {
    selectedRow.cells[0].innerHTML = userInputFirstName.value;
    selectedRow.cells[1].innerHTML = userInputLastName.value;
    selectedRow.cells[2].innerHTML = userInputNumber.value;
    //second problem, it creates multiple objects instead of just one in the array
    //-------
    //The problem here is that you are not overwriting the original row/object you are editing and the code is just adding more
    //And because of event bubbling (see above comment) it is making multiple copies
    console.log("save clicked");
    createContact(
      userInputFirstName.value,
      userInputLastName.value,
      userInputNumber.value,
      phoneBook
    );
    console.log(phoneBook);
  });
};

//add button to call the function
addButton.addEventListener("click", function () {
  addContactRow(
    myTable,
    userInputFirstName.value,
    userInputLastName.value,
    userInputNumber.value,
    phoneBook
  );
  resetForm();
});
