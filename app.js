//Revealing module pattern
//In the closure the weightCompare, diet, and heigthcompare function are private
class Dino {
  constructor({ species, weight, height, diet, where, when, fact }) {
    this.species = species;
    this.weight = weight;
    this.height = height;
    this.diet = diet;
    this.where = where;
    this.when = when;
    this.fact = fact;
    this.image = "images/" + this.species + ".png";
  }

  //Compare the dino weight to human weight
  weightCompare(humanData) {
    return `Weight: ${this.weight} lb, your weight is ${humanData} lb`;
  }
  //helper function to convert height into inches
  feetToInches(ft) {
    return ft * 12.0;
  }

  //compare human height(inches) to Dino height
  heightCompare(humanData) {
    const height_inches = this.feetToInches(parseInt(humanData));
    return `Height: ${this.height} inches and your height is ${height_inches} inches`;
  }

  //Method compare the human diet and the dino diet
  dietCompare(humanData) {
    return `Diet: ${this.diet} and your diet is ${humanData}`;
  }
}

const get_Dino_data = [];
const Human = {};

//setup elements to create for the human tiles
const humanDataElementToCreate = [
  {
    elementName: "div",
    attributes: {
      className: ["grid-item"],
    },
  },
  { elementName: "h3" },
  {
    elementName: "p",
    attributes: {
      className: ["data__disappear"],
      id: ["p_data_1"],
    },
  },
  {
    elementName: "p",
    attributes: {
      className: ["data__disappear"],
      id: ["p_data_2"],
    },
  },
  {
    elementName: "p",
    attributes: {
      className: ["data__disappear"],
      id: ["p_data_3"],
    },
  },
];

//setup elements to create for the other tiles
const elementsToCreate = [
  {
    elementName: "div",
    attributes: {
      className: ["grid-item"],
    },
  },
  { elementName: "h3" },
  {
    elementName: "img",
    attributes: {
      className: ["data__disappear"],
    },
  },
  {
    elementName: "p",
    attributes: {
      className: ["data__disappear"],
      id: ["p_data_1"],
    },
  },
];

//when page loads up fetch dino data
(async function () {
  await fetch("dino.json").then(async (data) => {
    const newData = await data.json();
    get_Dino_data.push(
      ...newData.Dinos.map((dino) => {
        return new Dino({ ...dino });
      })
    );
  });
})();

//needs to be random
const randomNumber = (endNumber) => {
  return Math.floor(Math.random() * Math.floor(endNumber));
};

const random_fact = (dino, randomNum) => {
  let fact = "";
  switch (randomNum) {
    case 1:
      fact = dino.dietCompare(Human.diet);
      break;
    case 2:
      fact = dino.weightCompare(Human.weight);
      break;
    case 3:
      fact = dino.heightCompare(Human.feet);
      break;
    case 4:
      fact = `The ${dino.species} was found in the ${dino.when}.`;
      break;
    case 5:
      fact = `The ${dino.species} lived in what is now ${dino.where}.`;
      break;
    default:
      fact = dino.fact;
      break;
  }
  return fact;
};

//find a number in a given array
const numberFinder = (arr, number) => {
  return arr.includes(number);
};

//given a array of elements, add the centertile to the center of the elements
const placingTileCenter = (elements, centerTile) => {
  let centerLocation = Math.floor((elements.length + 1) / 2);
  elements.splice(centerLocation, 0, centerTile);
  return elements;
};

//create element and assign id and classnames to the given element
const elementCreator = (elementToCreate, attribute) => {
  const element = document.createElement(elementToCreate);
  if (attribute !== undefined && attribute.className) {
    element.classList.add(...attribute.className);
  }
  if (attribute !== undefined && !(attribute.id == null)) {
    element.id = attribute.id[0];
  }
  return element;
};

// add a child element to a given parent element
const addElementsToParent = (parentElement, childrenElement) => {
  parentElement.appendChild(childrenElement);
};

//add dino and human data to a array of elements
const elementData = (elements, data, type, randomNum) => {
  if (type === "dino") {
    return elements.map((element) => {
      switch (true) {
        case element.tagName.toLowerCase() === "h3":
          return (element.textContent = data.species);
        case element.tagName.toLowerCase() === "p":
          const fact = random_fact(data, randomNum);
          return (element.textContent = fact);
        case element.tagName.toLowerCase() === "img":
          return (element.src = `./images/${data.species.toLowerCase()}.png`);
      }
    });
  } else {
    return elements.map((element) => {
      switch (true) {
        case element.tagName.toLowerCase() === "h3":
          return (element.textContent = data.name);
        case element.tagName.toLowerCase() === "p" && element.id === "p_data_1":
          return (element.textContent = data.weight);
        case element.tagName.toLowerCase() === "p" && element.id === "p_data_2":
          return (element.textContent = data.feet);
        case element.tagName.toLowerCase() === "p" && element.id === "p_data_3":
          return (element.textContent = data.diet);
      }
    });
  }
};

//append all elements to given parentElement
const findingAllElementsToAppend = (parent, elements) => {
  if (parent === "grid-item") {
    for (let i = 0; i < elements.length; i++) {
      if (i >= 1) {
        addElementsToParent(elements[0], elements[i]);
      }
    }
  }
};

//generate random tiles
const tiles_generate = () => {
  const elements = [];
  const randomNumberSelected = [];
  let factRandomNumber = randomNumber(7);
  while (randomNumberSelected.length < get_Dino_data.length) {
    let number = randomNumber(get_Dino_data.length);
    if (!numberFinder(randomNumberSelected, number)) {
      randomNumberSelected.push(number);
    } else {
      number = randomNumber(get_Dino_data.length);
    }
  }

  for (number of randomNumberSelected) {
    const elementsToDisplay = elementsToCreate.map((elementToCreate) => {
      return elementCreator(
        elementToCreate.elementName,
        elementToCreate.attributes
      );
    });

    elementData(
      elementsToDisplay,
      get_Dino_data[number],
      "dino",
      factRandomNumber
    );
    //main parent append Children
    findingAllElementsToAppend("grid-item", elementsToDisplay);
    elements.push(elementsToDisplay[0]);
  }

  const elementsToDisplay = humanDataElementToCreate.map((elementToCreate) => {
    return elementCreator(
      elementToCreate.elementName,
      elementToCreate.attributes
    );
  });

  elementData(elementsToDisplay, Human);
  //main parent append Children
  findingAllElementsToAppend("grid-item", elementsToDisplay);

  return placingTileCenter(elements, elementsToDisplay[0]);
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

//when mouse is over the tile display dino and human data
const onMouseOver = (event) => {
  if (event.target.className === "grid-item") {
    let grid_item = event.target;
    for (let child = 0; child < grid_item.children.length; child++) {
      if (
        grid_item.children[child].className == undefined ||
        grid_item.children[child].className !== "data__disappear"
      ) {
        grid_item.children[child].classList.add("data__disappear");
      } else {
        grid_item.children[child].classList.remove("data__disappear");
      }
    }
  }
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
    //when submit button fuction is finish lissten for a mouseover on a tile
    const grid = document.querySelector("#grid");
    grid.addEventListener("mouseover", onMouseOver, false);
  });
});
