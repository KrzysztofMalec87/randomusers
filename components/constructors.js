export {
  ButtonConstructor,
  TableConstruktor
};

const removeSpacesMakeArr = str => str.replace(/ +(?= )/g, '').split(" ");

const TableConstruktor = (classes = false, dataAttribute = false, thead = false)  => {
  const table = document.createElement("table");
  const tableBody = document.createElement("tbody");
  const tablehead = document.createElement("thead");
  const setClasses = removeSpacesMakeArr(classes);

  if (classes) {
    table.classList.add(...setClasses);
  }

  if (dataAttribute) {
    table.setAttribute(dataAttribute, "");
  }

  if (thead) {
    tablehead.classList.add("table-dark");
    table.appendChild(tablehead);
  }

  table.appendChild(tableBody);

  return table;
}


const ButtonConstructor = (type, classes, dataAttribute = false, content = "send") => {
  const button = document.createElement(type);
  const setClasses = removeSpacesMakeArr(classes);

  button.classList.add(...setClasses);

  if (dataAttribute) {
    button.setAttribute(dataAttribute, true);
  }

  button.textContent = content;

  return button;
}
