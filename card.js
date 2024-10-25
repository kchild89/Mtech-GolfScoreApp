let frontElementArray = [];
for (i = 0; i < 4; i++) {
  let elements = document.querySelectorAll(`.player${i + 1}Front`);
  for (item of elements) {
    frontElementArray.push(item);
  }
}
let backElementArray = [];
for (i = 0; i < 4; i++) {
  let elements = document.querySelectorAll(`.player${i + 1}Back`);
  for (item of elements) {
    backElementArray.push(item);
  }
}

frontElementArray.forEach((input) => {
  input.addEventListener("keyup", () => {
    let value = 0;
    for (element of frontElementArray) {
      if (element.classList[0] === input.classList[0]) {
        value += Number(element.value);
      }
    }
    document.getElementById(`${input.classList[0]}Out`).textContent = value;
    document.getElementById(`${input.classList[0]}In`).textContent = value;
    let currentClass = input.classList[0];
    let backClass = `${currentClass.slice(0, 7)}Back`;
    let backElementRow = document.querySelector(`#${backClass}`);
    let backElement = backElementRow.children[2].children[0];
    backElement.dispatchEvent(new KeyboardEvent("keyup"));
  });
});
backElementArray.forEach((input) => {
  input.addEventListener("keyup", (event) => {
    updateTable(event, input);
  });
});

function updateTable(event, input) {
  let parent = event.target.closest(`#${input.classList[0]}`);
  let children = parent.children;
  let inElement = children[1];
  let total = children[11];
  let siblings = [];
  for (i = 2; i < 11; i++) {
    siblings.push(children[i]);
  }
  let value = 0;
  for (sibling of siblings) {
    value += Number(sibling.children[0].value);
  }
  value += Number(inElement.textContent);
  total.textContent = value;
}
