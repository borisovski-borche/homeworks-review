//get the elements from the HTML
let loadButton = document.getElementById("loadBtn");
let nextButton = document.getElementById("nextBtn");
let previousButton = document.getElementById("prevBtn");
let myTable = document.getElementById("myTable");
let myList = document.getElementById("myList");
let avatarsTable = document.getElementById("avatarsTable");

//where we store our values from the API
const memoryData = {
  url: "https://rickandmortyapi.com/api/episode",
  current: [],
  next: [],
  prev: [],
  characters: [],
  //This is a boolean that's used to control whether we should half of results (10) or we fetch the next batch (20)
  shouldFetchNext: false,
};

//function to get our API data
let loadData = url => {
  return fetch(url)
    .then(value => value.json())
    .then(value => value);
};

//function to store our data into the memory data object
let storeData = value => {
  memoryData.current = value.results;
  memoryData.next = value.info.next;
  memoryData.prev = value.info.prev;
  console.log(memoryData);
};

//function to display the data
let showData = data => {
  //get the keys of the created object
  let titles = Object.keys(data[0]).filter(key => {
    if (
      data[0][key] !== data[0].created &&
      data[0][key] !== data[0].characters
    ) {
      return key;
    }
  });
  console.log(titles);
  avatarsTable.innerHTML = "";
  myList.innerHTML = "";
  //create a dynamic table
  let tHead = document.createElement("thead");
  let tBody = document.createElement("tbody");
  let newRow = document.createElement("tr");
  //show the titles as theaders
  for (let title of titles) {
    let tableHead = document.createElement("th");
    tableHead.innerHTML = title;
    newRow.appendChild(tableHead);
  }

  //show the data as table data cells
  for (let values of data) {
    myTable.innerHTML = "";
    let secondRow = myTable.insertRow(myTable.length);
    secondRow.insertCell(0).innerHTML = values.id;
    secondRow.insertCell(1).innerHTML = values.name;
    secondRow.insertCell(2).innerHTML = values.air_date;
    secondRow.insertCell(3).innerHTML = values.episode;
    secondRow.insertCell(4).innerHTML = values.url;
    //create a button to display the details
    let button = secondRow.insertCell(5);
    button.innerHTML = `<button class="detailsBtn"><a href="#heading">Details</a></button>`;
    tBody.appendChild(secondRow);
    button.querySelector(".detailsBtn").addEventListener("click", () => {
      avatarsTable.innerHTML = "";
      //get the data provided from each url of the episodes
      fetch(values.url).then(() => {
        //call the function to display the values in the HTML
        showDetails(values, memoryData.characters);
      });
    });
  }

  tHead.appendChild(newRow);
  myTable.appendChild(tHead);
  myTable.appendChild(tBody);
};

//function to display the details and characters
let showDetails = (value, storage) => {
  //create a list and display the name, air_date and etc and also create a button to display the characters
  (myList.innerHTML = `<li>Episode name: ${value.name}</li>
  <li>Air Date: ${value.air_date}</li>
  <li>Number of episode: ${value.episode}</li>
  <li>url: ${value.url}</li>
  <button class="charactersBtn">View Characters</button>`),
    console.log(value);
  //when the button is clicked get each character from the characters array and display it in a dynamic table
  myList.querySelector(".charactersBtn").addEventListener("click", () => {
    for (let i = 0; i < value.characters.length; i++) {
      console.log(value.characters);
      loadData(value.characters[i]).then(r => {
        //here we store each character into our character array in our storage object
        storage = r;
        //display every character in a dynamic table
        let pictureRow = document.createElement("tr");
        let pictureDataRow = document.createElement("td");
        pictureDataRow.innerHTML = `<img src="${storage.image}" alt="${storage.name}"></img>`;
        pictureRow.appendChild(pictureDataRow);
        avatarsTable.appendChild(pictureRow);
        console.log(storage);
      });
    }
  });
};

//when the page is loaded get the data from the api and call other functions so we can store it and display it into a dynamic table
(getData = () => {
  //button to call the loadData function so we can get data from the provided API, then store the data in our storage object and display it
  loadButton.addEventListener("click", () => {
    loadData(memoryData.url)
      .then(storeData)
      .then(value => showData(memoryData.current.filter((el, i) => i < 10))); // You will probably have questions about the filters , i'll explain in class.
  });
  //button to do the same as the load button but call a different API that is now stored into the next property of our storage object
  nextButton.addEventListener("click", () => {
    if (memoryData.shouldFetchNext) {
      //if shouldFetchNext is true that means we need the next 20 results from the api
      loadData(memoryData.next)
        .then(storeData)
        .then(value => {
          showData(memoryData.current.filter((el, i) => i < 10));
          memoryData.shouldFetchNext = false;
        })
        //when the user gets to the last page alert him that he is at the end and can't go further
        .catch(error => alert("You are at the end"));
    } else {
      //if shouldFetchNext is false that means we are currently showing the first 10 elements and we just need to render the second
      //10 without fetching data
      showData(memoryData.current.filter((el, i) => i >= 10));
      memoryData.shouldFetchNext = true;
    }
  });
  //button to do the same as the load button but call a different API that is now stored into the previous property of our storage object
  previousButton.addEventListener("click", () => {
    if (memoryData.shouldFetchNext) {
      //if shouldFetchNext is true that means we are showing the latter 10 elements so we should just go back and render
      //the first 10
      showData(memoryData.current.filter((el, i) => i < 10));
      memoryData.shouldFetchNext = false;
    } else {
      //if shouldFetchNext is false this means we are showing the first 10 elements and go back we need to fetch the previous
      //20 from the api
      loadData(memoryData.prev)
        .then(storeData)
        .then(value => {
          showData(memoryData.current.filter((el, i) => i >= 10));
          memoryData.shouldFetchNext = true;
        })
        //when the user gets to the first page and clickc previous again alert him that he is at the first page and can't go further
        .catch(error => alert("You are at the beginning"));
    }
  });
})();
