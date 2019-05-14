import * as constructor from '/components/constructors.js';

(() => {
  $.ajax({
    dataType: "json",
    url: "data.json",
    success: (data) => {
      init(data);
    },
  });
  

  function init(data) {
    const jsonData = data.users;
    const asideContainer = document.querySelector("[data-aside-container]");
    const buttonContainer = document.querySelector("[data-button-container]");
    const tableContainer = document.querySelector("[data-table-container]");
    let randLosButton = "";

    const getNamesAndSurnames = usersDatas => {
      const shotrNameObj = {};

      for (const key in usersDatas) {
        let {
          id,
          name,
          surname
        } = usersDatas[key];

        shotrNameObj[key] = {
          id,
          name,
          surname
        };
      }

      return shotrNameObj;
    };


    const buildAsideListRow = (data, attribute) => `<li class="list-group-item" ${attribute}="${data.id}">${data.name} ${data.surname}</li>`;


    const buildAsideList = (data, dataAttribute) => {
      let list = `<ul class="list-group shadow-sm rounded">`;

      for (const key in data) {
        list += buildAsideListRow(data[key], dataAttribute);
      }

      list += `</ul>`;

      return list;
    }


    const insertBuildedList = () => asideContainer.innerHTML = buildAsideList(getNamesAndSurnames(jsonData), "data-aside-id");


    const drawUnique = (max, amount) => {
      let uniqueArr = [];

      while (uniqueArr.length !== amount) {
        let randValue = Math.floor(Math.random() * max);

        if (uniqueArr.includes(randValue)) {
          continue;
        }

        uniqueArr.push(randValue);
      }

      return uniqueArr.sort();
    }


    const addClassToChoosen = list => {
      for (let i = 0; i < list.length; i++) {
        const getSuccessElement = document.querySelector(`[data-aside-id="${jsonData[list[i]].id}"]`);

        getSuccessElement.classList.add("list-group-item-success");
      }
    }


    const removeClassFromChoosen = () => {
      const getSuccessElements = document.querySelectorAll(".list-group-item-success");

      for (let i = 0; i < getSuccessElements.length; i++) {
        getSuccessElements[i].classList.remove("list-group-item-success");
      }
    }


    const resetButton = () => {
      const resetBtn = constructor.ButtonConstructor("button", "btn btn-secondary ml-1 mr-1", "data-reset-generate", "Reset");

      buttonContainer.appendChild(resetBtn);

      resetBtn.addEventListener("click", resetTheDraw, false);
    }


    const resetTheDraw = event => {
      const that = event.target;

      removeClassFromChoosen();

      randLosButton.removeAttribute("disabled");

      randLosButton.addEventListener("click", getRandomUsers, false);

      tableContainer.innerHTML = " ";

      that.remove();
    }


    const createAndInsertTable = data => {
      const table = constructor.TableConstruktor("table table-striped table-bordered", "data-table-content", true);
      const getTableHead = table.querySelector("thead");
      const getTableBody = table.querySelector("tbody");

      if (data.length) {
        for (let i = 0; i < data.length; i++) {
          const tr = document.createElement("tr");
          const trThead = document.createElement("tr");
          const singleUserData = jsonData[data[i]];
          let rowItems = "";
          let rowItemsThead = "";

          for (const key in singleUserData) {
            if (key === "id") {
              tr.setAttribute("data-table-row-id", singleUserData[key]);
              rowItemsThead += `<td>LP.</td>`;
              rowItems += `<td>${i + 1}</td>`;
              continue;
            }
            rowItemsThead += `<td>${key.toUpperCase()}</td>`;
            rowItems += `<td>${singleUserData[key].toUpperCase()}</td>`;
          }

          if (i === 0) {
            trThead.innerHTML = rowItemsThead;
            getTableHead.appendChild(trThead);
          }

          tr.innerHTML = rowItems;
          getTableBody.appendChild(tr);
        }
      }
      return table;
    }


    const getRandomUsers = event => {
      const that = event.target;
      const countUsers = Object.keys(jsonData).length;
      const amountToBeDrawn = Math.round(countUsers / 2);
      const getRandomIndexes = drawUnique(countUsers, amountToBeDrawn);

      addClassToChoosen(getRandomIndexes);

      tableContainer.appendChild(createAndInsertTable(getRandomIndexes));

      that.removeEventListener("click", getRandomUsers);

      that.setAttribute("disabled", true);

      resetButton();
    }


    const loadButton = () => {
      const createButton = constructor.ButtonConstructor("button", "btn btn-info ml-1 mr-1", "data-generate-random", "Take out half of the list of users");

      buttonContainer.appendChild(createButton);

      createButton.addEventListener("click", getRandomUsers, false);

      randLosButton = createButton;
    }


    window.addEventListener('load', () => {
      insertBuildedList();
      loadButton();
    });
  }
})();