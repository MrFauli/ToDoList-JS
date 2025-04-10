const inputToDo = document.getElementById("newToDo");
const showToDo = document.getElementById("To-Dos");
let ToDoNum = localStorage.getItem("ToDoNum")
  ? JSON.parse(localStorage.getItem("ToDoNum"))
  : 0;
console.log(ToDoNum);
const addStrike = (obj, label, checkBox) => {
  obj = JSON.parse(obj);
  console.log(obj.id);
  console.log(obj);
  if (checkBox.checked == true) {
    label.style.textDecoration = "line-through";
    label.style.color = "grey";
  } else {
    label.style.textDecoration = "none";
    label.style.color = "black";
  }

  console.log(ToDoList);
  if (ToDoList.length <= 1) {
    obj.checkBox = checkBox.checked;
    let storageToDo = JSON.stringify(obj);
    ToDoList = [];
    ToDoList.push(storageToDo);
    console.log(ToDoList);
    temp = ToDoList.join(";");

    localStorage.setItem("Item", JSON.stringify(temp));
  } else {
    let tempDoList = [];
    for (i = 0; i < ToDoList.length; i++) {
      tempDoList.push(JSON.parse(ToDoList[i]));
    }

    console.log(tempDoList);
    console.log(obj);
    console.log(obj.id);
    let index = tempDoList.findIndex((item) => item.id == obj.id);
    console.log(index);
    obj.checkBox = checkBox.checked;
    console.log("obj");
    console.log(obj);
    let storageToDo = JSON.stringify(obj);
    ToDoList[index] = storageToDo;
    console.log(ToDoList);
    temp = ToDoList.join(";");

    localStorage.setItem("Item", JSON.stringify(temp));
  }
};

const addStoragedToDo = (ToDoOld) => {
  oldToDo = JSON.parse(ToDoOld);

  let input = oldToDo.content;
  let checkedIt = oldToDo.checkBox;
  let id = oldToDo.id;
  const node = document.createElement("div");
  const checkLabel = document.createElement("div");
  checkLabel.className = "checkLabel";
  node.id = "ToDo" + id;
  node.className = "individualToDo";
  console.log(node.id);
  let toDo = document.createElement("INPUT");
  toDo.setAttribute("type", "checkbox", "name");
  toDo.name = "ToDoBox" + id;
  toDo.className = "checkToDo";
  let toDoLabel = document.createElement("LABEL");
  toDoLabel.htmlFor = "ToDoBox" + id;
  toDoLabel.innerText = input;
  let deleteButton = document.createElement("BUTTON");
  const garbageIcon = document.createElement("img");
  garbageIcon.className = "garbage";
  garbageIcon.src = "./mulleimer.png";

  deleteButton.innerText = "";
  deleteButton.append(garbageIcon);

  toDo.addEventListener("change", () => addStrike(ToDoOld, toDoLabel, toDo));
  console.log("Checked " + checkedIt);
  toDo.checked = checkedIt;
  checkLabel.appendChild(toDo);
  checkLabel.appendChild(toDoLabel);
  node.appendChild(checkLabel);
  showToDo.appendChild(node);

  deleteButton.addEventListener("click", () => deleteToDo(node, ToDoOld));
  node.appendChild(deleteButton);
  showToDo.appendChild(node);
  if (checkedIt == true) {
    toDoLabel.style.textDecoration = "line-through";
  }
};

let items = localStorage.getItem("Item")
  ? JSON.parse(localStorage.getItem("Item"))
  : "";
console.log(items);
let ToDoList = [];
let itemsList = [];

if (items.length > 0) {
  items = JSON.stringify(items);
  items = JSON.parse(items);
  itemsList = [];
  itemsList.push(items);
  if (items.includes(";")) {
    itemsList = [];
    itemsList = items.split(";");
    ToDoList = itemsList;
  }

  console.log("Check" + itemsList);
}

console.log("item" + itemsList);
console.log("ToDoList" + ToDoList);
for (i = 0; i < itemsList.length; i++) {
  addStoragedToDo(itemsList[i]);
}

inputToDo.addEventListener("keyup", addNewToDo);

function deleteToDo(ToDoDiv, obj) {
  obj = JSON.parse(obj);
  console.log(obj);
  console.log(obj.id);
  showToDo.removeChild(ToDoDiv);
  let tempDoList = [];
  for (i = 0; i < ToDoList.length; i++) {
    tempDoList.push(JSON.parse(ToDoList[i]));
  }
  let index = tempDoList.findIndex((item) => item.id == obj.id);
  console.log(index);
  ToDoList.splice(index, 1);

  let temp = ToDoList.join(";");

  localStorage.setItem("Item", JSON.stringify(temp));
}

function addNewToDo() {
  if (event.keyCode === 13) {
    if (inputToDo.value.length > 0) {
      console.log();
      const node = document.createElement("div");
      node.id = "ToDo" + ToDoNum;
      node.className = "individualToDo";
      const checkLabel = document.createElement("div");
      checkLabel.className = "checkLabel";
      console.log(node.id);
      let toDo = document.createElement("INPUT");
      toDo.setAttribute("type", "checkbox", "name");
      toDo.name = "ToDoBox" + ToDoNum;
      toDo.className = "checkToDo";
      let toDoLabel = document.createElement("LABEL");
      toDoLabel.htmlFor = "ToDoBox" + ToDoNum;
      toDoLabel.innerText = inputToDo.value;

      let deleteButton = document.createElement("BUTTON");
      const garbageIcon = document.createElement("img");
      garbageIcon.className = "garbage";
      garbageIcon.src = "./mulleimer.png";

      deleteButton.innerText = "";
      deleteButton.append(garbageIcon);

      let checkedIt = inputToDo.value;
      let input = toDo.checked;
      let toDoInfos = {
        content: inputToDo.value,
        checkBox: false,
        id: ToDoNum,
      };
      toDo.addEventListener("change", () =>
        addStrike(toDoInfos, toDoLabel, toDo)
      );
      checkLabel.appendChild(toDo);
      checkLabel.appendChild(toDoLabel);
      node.appendChild(checkLabel);
      showToDo.appendChild(node);

      deleteButton.addEventListener("click", () => deleteToDo(node, toDoInfos));
      node.appendChild(deleteButton);
      showToDo.appendChild(node);

      ToDoNum += 1;

      toDoInfos = JSON.stringify(toDoInfos);
      ToDoList.push(toDoInfos);
      console.log(ToDoList);

      let temp = ToDoList.join(";");
      console.log(temp);
      localStorage.setItem("ToDoNum", JSON.stringify(ToDoNum));
      localStorage.setItem("Item", JSON.stringify(temp));
      inputToDo.value = "";
    }
  }
}
