class Dino {
  constructor(dinos, human) {
    this.dinos = dinos;
    this.human = human;
    this.newDinoData = null;
  }

  //Compare the dino weight to human weight
  WeightCompare() {
    this.newDinoData = this.dinos.map((dino) => {
      if (dino.weight > parseInt(this.human.weight, 10)) {
        dino.weight = `weight: ${
          dino.weight - parseInt(this.human.weight, 10)
        } lbs more`;
      } else if (dino.weight === parseInt(this.human.weight, 10)) {
        dino.weight = `same weight: ${dino.weight}`;
      } else {
        dino.weight = `weigh: ${
          parseInt(this.human.weight, 10) - dino.weight
        }lbs less`;
      }
      return dino;
    });
  }

  //helper function to convert height into inches
  FeetToInches(ft) {
    return ft * 12.0;
  }

  //compare human height(inches) to Dino height
  HeightCompare() {
    this.newDinoData = this.dinos.map((dino) => {
      let heightInInches = parseInt(this.FeetToInches(this.human.feet), 10);
      if (dino.height > heightInInches) {
        dino.height = `Height: ${dino.height - heightInInches} inches more`;
      } else if (dino.height === heightInInches) {
        dino.height = `same Height: ${dino.height}`;
      } else {
        dino.height = `Height: ${heightInInches - dino.height} inches less`;
      }
      return dino;
    });
  }
  //Method compare the human diet and the dino diet
  DietCompare() {
    this.newDinoData = this.dinos.map((dino) => {
      if (dino.diet === this.human.diet.toLowerCase()) {
        dino.diet = `Same Diet: ${dino.diet}`;
      } else {
        dino.diet = `Diet: ${dino.diet}`;
      }
      return dino;
    });
  }

  get DinoCompare() {
    this.WeightCompare();
    this.HeightCompare();
    this.DietCompare();
    return this.newDinoData;
  }
}

const get_Dino_data = {};
const Human = {};

//when page loads up fetch dino data
(async function () {
  await fetch("dino.json")
    .then(async (data) => {
      const newData = await data.json();
      console.log(newData.Dinos);
      get_Dino_data["data"] = newData.Dinos;
    })
    .catch((e) => {
      //todo: add a error message to the screen
      console.log(e);
    });
})();

// Generate Tiles for each Dino in Array
//needs to be random
const randomNumber = (endNumber) => {
  return Math.floor(Math.random() * Math.floor(endNumber));
};

const numberFinder = (arr, number) => {
  return arr.includes(number);
};

const placingTileCenter = (elements, centerTile) => {
  let centerLocation = Math.floor((elements.length + 1) / 2);
  elements.splice(centerLocation, 0, centerTile);
  return elements;
};

//todo:add the 3 new p tags and a img tag
//todo: disable the facts diets height and weight
const elementCreator = (elementToCreate, attribute) => {
  const element = document.createElement(elementToCreate);
  if (attribute.className !== undefined) {
    element.classList.add(...attribute.className);
  }
  if (attribute.id !== undefined) {
    element.classList.add(...attribute.id);
  }
  return element;
};

const addElementsToParent = (parentElement, childrenElement) => {};

const elementData = (elements, data) => {
  return elements.forEach((element) => {
    switch (element.tagName.toLowerCase()) {
      case "h3":
        return (element.textContent = data.species);
      case "p":
        if (element.attribute.id === "p_data_1") {
          return (element.textContent = data.weight);
        } else if (element.attribute.id === "p_data_2") {
          return (element.textContent = data.height);
        } else if (element.attribute.id === "p_data_3") {
          return (element.textContent = data.diet);
        } else if (element.attribute.id === "p_data_4") {
          return (element.textContent = data.fact);
        }
      case "img":
        return (element.src = `./images/${data.species.toLowerCase()}.png`);
    }
  });
};

const tiles_generate = () => {
  const elements = [];
  const randomNumberSelected = [];
  const newDino = new Dino(get_Dino_data.data, Human).DinoCompare;
  console.log(newDino);
  while (randomNumberSelected.length < get_Dino_data["data"].length) {
    let number = randomNumber(get_Dino_data["data"].length);
    if (!numberFinder(randomNumberSelected, number)) {
      randomNumberSelected.push(number);
    } else {
      number = randomNumber(get_Dino_data["data"].length);
    }
  }

  for (number of randomNumberSelected) {
    const elementsToCreate = [
      {
        elementName: "div",
        attributes: {
          className: ["grid-item"],
        },
      },
      { elementName: "h3" },
      {
        elementName: "div",
        attributes: {
          className: ["modal"],
          id: ["myModal"],
        },
      },
      {
        elementName: "div",
        attributes: {
          className: ["modal-content"],
        },
      },
      {
        elementName: "span",
        attributes: {
          className: ["close"],
        },
        parent: "modal-content",
      },
      {
        elementName: "p",
        attributes: {
          id: ["p_data_1"],
        },
        parent: "modal-content",
      },
      {
        elementName: "p",
        attributes: {
          id: ["p_data_2"],
        },
        parent: "modal-content",
      },
      {
        elementName: "p",
        attributes: {
          id: ["p_data_3"],
        },
        parent: "modal-content",
      },
      {
        elementName: "p",
        attributes: {
          id: ["p_data_4"],
        },
      },
      {
        elementName: "img",
        parent: "modal-content",
      },
    ];

    const elementsToDisplay = elementsToCreate.map((elementToCreate) => {
      return elementCreator(
        elementToCreate.elementName,
        elementToCreate.attributes
      );
    });

    const elementWithData = elementData(elementsToDisplay, newDino[number]);
    //modal-content append children

    elements.push(childElement);
  }

  let humanDataElement = elementCreator(
    {
      parentClassName: "grid-item",
      modal_element_className: "modal",
    },
    "div",
    "h3",
    ["p", "p", "p"],
    ["div", "h3", "p", "p", "p"],
    Human
  );
  console.log(elements);
  return placingTileCenter(elements, humanDataElement);
};

// Add tiles to DOM
const addTilesToDOM = () => {
  const grid = document.querySelector("#grid");
  const elements = tiles_generate();
  elements.map((element) => grid.appendChild(element));
};

// Remove form from screen
const removeForm = () => {
  const form = document.querySelector("#dino-compare");
  form.style.display = "none";
};

// On button click, prepare and display infographic
const btn = document.querySelector("#btn");
btn.addEventListener("click", () => {
  removeForm();
  (async function () {
    const name = document.querySelector("#name");
    const feet = document.querySelector("#feet");
    const weight = document.querySelector("#weight");
    const diet = document.querySelector("#diet");
    Human.name = name.value;
    Human.feet = feet.value;
    Human.weight = weight.value;
    Human.diet = diet.value;
    addTilesToDOM();
  })().then(() => {
    const grid = document.querySelector("#grid");
    grid.addEventListener("mouseover", (event) => {
      let parent = event.target;
      for (let index = 0; index < parent.children.length; index++) {}
    });
  });
});

//Hover on card functionality
