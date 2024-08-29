const todoInput = document.querySelector("#todo-input");
const todoList = document.querySelector("#todo-list");

const savedTodoList = JSON.parse(localStorage.getItem("saved-items"));

const createTodo = function (storageData) {
  let todoContents = todoInput.value;
  if (storageData) {
    todoContents = storageData.contents;
  }

  const newLi = document.createElement("li");
  const newSpan = document.createElement("span");
  const newBtn = document.createElement("button");

  newBtn.addEventListener("click", () => {
    newLi.classList.toggle("complete");
    saveItemFn();
  });

  newLi.addEventListener("dblclick", () => {
    newLi.remove();
    saveItemFn();
  });

  if (storageData?.complete) {
    newLi.classList.add("complete");
  }

  newSpan.textContent = todoContents;
  newLi.appendChild(newBtn);
  newLi.appendChild(newSpan);
  todoList.appendChild(newLi);
  todoInput.value = "";
  saveItemFn();
};

const keyCodeCheck = function () {
  if (window.event.keyCode === 13 && todoInput.value.trim() !== "") {
    createTodo();
  }
};

const deleteAll = function () {
  const liList = document.querySelectorAll("li");
  for (let i = 0; i < liList.length; i++) {
    liList[i].remove();
  }
  saveItemFn();
};

const saveItemFn = function () {
  const saveItems = [];

  for (let i = 0; i < todoList.children.length; i++) {
    const todoObj = {
      contents: todoList.children[i].querySelector("span").textContent,
      complete: todoList.children[i].classList.contains("complete"),
    };
    saveItems.push(todoObj);
  }

  // saveItems.length === 0? localStorage.removeItem("saved-items") : localStorage.setItem("saved-items", JSON.stringify(saveItems));

  if (saveItems.length === 0) {
    localStorage.removeItem("saved-items");
  } else {
    localStorage.setItem("saved-items", JSON.stringify(saveItems));
  }
};

if (savedTodoList) {
  for (let i = 0; i < savedTodoList.length; i++) {
    createTodo(savedTodoList[i]);
  }
}

//

const weatherdataActive = function ({ location, weather }) {
  const locationNameTag = document.querySelector("#location-name-tag");
  locationNameTag.textContent = location;
};

const weatherSearch = function ({ latitude, longitude }) {
  const openWeatherRes = fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=23953ee4c89ec32f5ed5297f0b5b0b9a`
  )
    .then((res) => {
      return res.json();
    })
    .then(() => {
      console.log(json.name.weather[0].main);
      const weatherData = {
        location: json.name,
        weather: json.weather[0].main,
      };
      weatherdataActive(weatherData);
    })
    .catch((err) => {
      console.log(err);
    });
};

const accessToGeo = function ({ coords }) {
  // const positionObj = {
  // latitude: position.coords.latitude,
  // longitude: position.coords.longitude,
  // };

  const { latitude, longitude } = coords;
  const positionObj = {
    latitude: latitude,
    longitude,
  };
  //위와 같은  방식을 shorthand property 라고 함
};

const askForLocation = function () {
  navigator.geolocation.getCurrentPosition(accessToGeo, (err) => {
    console.log(err);
  });
};

askForLocation();
