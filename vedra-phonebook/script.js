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
//function to create the objects
let createObject = (name, lastName, number, array) => {
  contact = {
    name: name,
    lastName: lastName,
    number: number,
  };
  array.push(contact);
};

//function to create the rows with data cells
let addCells = (table, name, lastName, number, array) => {
  if (
    name.length < 2 ||
    lastName.length < 2 ||
    number.length < 2 ||
    isNaN(number)
  ) {
    alert("Wrong input");
  } else {
    createObject(name, lastName, number, array);
    //create new table row with data cells
    let newRow = table.insertRow(table.length);
    let cellOne = newRow.insertCell(0);
    let cellTwo = newRow.insertCell(1);
    let cellThree = newRow.insertCell(2);
    let cellFour = newRow.insertCell(3);

    //add the inputs to the data cells and also buttons for every data cell
    cellOne.innerHTML = name;
    cellTwo.innerHTML = lastName;
    cellThree.innerHTML = number;
    cellFour.innerHTML = `<button class="editBtn">Edit</button>`;
    cellFour.innerHTML += `<button class="deleteBtn">Delete</button>`;
    //calling the button function
    buttons(deleteButton, editButton, phoneBook, saveButton);

    console.log(array);
  }
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
    console.log("save clicked");
    createObject(
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
  addCells(
    myTable,
    userInputFirstName.value,
    userInputLastName.value,
    userInputNumber.value,
    phoneBook
  );
  resetForm();
});

//reset the input forms
let resetForm = () => {
  userInputFirstName.value = "";
  userInputLastName.value = "";
  userInputNumber.value = "";
};

const testBtn = document.querySelector("#test");

testBtn.addEventListener("click", () => {
  console.log("Test was clicked");
});
testBtn.addEventListener("click", () => {
  console.log("Test was clicked");
});
testBtn.addEventListener("click", () => {
  console.log("Test was clicked");
});
testBtn.addEventListener("click", () => {
  console.log("Test was clicked");
});
