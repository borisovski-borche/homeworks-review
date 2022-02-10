let items = [];
let btn = document.getElementById("addButton");
btn.addEventListener("click", addItems);

function addItems() {
  let userInput = document.getElementById("txtArea");

  if (userInput.value.length == 0) {
    alert("Please Enter a Task");
  } else {
    let userInput = document.getElementById("txtArea");
    items.push(userInput.value);

    console.log("items = [" + items + "]");

    let ul = document.getElementById("ulID");
    let li = document.createElement("li");

    let checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.id = "checkbox";

    //adding an event listener to the check box that listens to when the checkbox is checked or not using the "change" event and if its
    //checked it adds a strike through if not it removes it, i didnt do the object because this is a much cleaner and shorter solution
    checkbox.addEventListener("change", e => {
      if (e.target.checked) {
        li.style.textDecoration = "line-through";
      } else {
        li.style.textDecoration = "none";
      }
    });

    li.appendChild(document.createTextNode(userInput.value));
    li.appendChild(checkbox);
    ul.appendChild(li);

    userInput.value = "";
  }
}

const createRow = (key, value) => {
  const row = document.createElement("tr");
};
