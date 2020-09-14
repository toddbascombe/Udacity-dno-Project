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
const humanDataElementToCreate = [
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
]

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
  },
];



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
  if (attribute !== undefined && attribute.className) {
    element.classList.add(...attribute.className);
  }
  if (attribute !== undefined && !(attribute.id == null) ) {
    element.id = attribute.id[0];
  }
  return element;
};

const addElementsToParent = (parentElement, childrenElement) => {
  parentElement.appendChild(childrenElement)
};

const elementData = (elements, data, type) => {
  if(type === 'dino'){
    return elements.map((element) => {
      if(element.tagName.toLowerCase() === 'h3'){
        return (element.textContent = data.species);
      }else if(element.tagName.toLowerCase() === 'p' && element.className === 'p_data_1'){
        console.log("data added")
        return element.textContent = data.weight
      }else if(element.tagName.toLowerCase() === 'p' && element.className === 'p_data_2'){
        return (element.textContent = data.height);
      }else if(element.tagName.toLowerCase() === 'p' && element.className === 'p_data_3'){
        return (element.textContent = data.diet);
      }else if(element.tagName.toLowerCase() === 'p' && element.className === 'p_data_4'){
        return (element.textContent = data.fact);
      }else if(element.tagName.toLowerCase() === 'img'){
        return (element.src = `./images/${data.species.toLowerCase()}.png`);
      }
    });
  }else{
    return elements.map((element) => {
      if(element.tagName.toLowerCase() === 'h3'){
        return (element.textContent = data.name);
      }else if(element.tagName.toLowerCase() === 'p' && element.className === 'p_data_1'){
        console.log("data added")
        return element.textContent = data.weight
      }else if(element.tagName.toLowerCase() === 'p' && element.className === 'p_data_2'){
        return (element.textContent = data.feet);
      }else if(element.tagName.toLowerCase() === 'p' && element.className === 'p_data_3'){
        return (element.textContent = data.diet);
      }
    });
  }

};


const findingAllElementsToAppend = (parent, elements)=>{
  if(parent === 'modal'){
    addElementsToParent(elements[2], elements[3])
  }else if(parent === 'grid-item'){
    for(let i = 0; i < elements.length; i++){
      if(i === 1){
        addElementsToParent(elements[0], elements[i])
      }else if(i === 2){
        addElementsToParent(elements[0], elements[i])
      }
    }
  }else if('modal-content'){
    for(let i = 0; i < elements.length; i++){
      if(elements[i].tagName.toLowerCase() === 'span' || elements[i].tagName.toLowerCase() === "p"){
        addElementsToParent(elements[3], elements[i])
      }
    }
  }
}


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
    const elementsToDisplay = elementsToCreate.map((elementToCreate) => {
      return elementCreator(
        elementToCreate.elementName,
        elementToCreate.attributes
      );
    });

    elementData(elementsToDisplay, newDino[number], 'dino');
    //modal-content append children
    findingAllElementsToAppend('modal-content', elementsToDisplay)
    console.log(elementsToDisplay)
    //modal append child
    findingAllElementsToAppend('modal', elementsToDisplay)
    //main parent append Children
    findingAllElementsToAppend('grid-item', elementsToDisplay)
    elements.push(elementsToDisplay[0]); 
  }

  const elementsToDisplay = humanDataElementToCreate.map(elementToCreate => {
    return elementCreator(
      elementToCreate.elementName,
      elementToCreate.attributes
    );
  });

  elementData(elementsToDisplay, Human);

  findingAllElementsToAppend('modal-content', elementsToDisplay)
  //modal append child
  findingAllElementsToAppend('modal', elementsToDisplay)
  //main parent append Children
  findingAllElementsToAppend('grid-item', elementsToDisplay)

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
    const modal = document.querySelector('.modal')
    const span = document.querySelector('.close')
    grid.addEventListener("click", (event) => {
      console.log(event.target)
      modal.style.display ='block'
    });
    span.addEventListener('click', ()=>{
      modal.style.display = 'none'
    })
    window.addEventListener('click', (event)=>{
      if(event.target === modal){
        modal.style.display = 'none'
      }
    })
  });
});

//Hover on card functionality
