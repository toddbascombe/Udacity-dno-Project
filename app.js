//Revealing module pattern
//In the closure the weightCompare, diet, and heigthcompare function are private 
let Dino = (function(){
  let dinos = null
  let human = null
  newDinoData = null;
  //Compare the dino weight to human weight
  function weightCompare() {
    newDinoData = dinos.map((dino) => {
      if (dino.weight > parseInt(human.weight, 10)) {
        dino.weight = `weight: ${
          dino.weight - parseInt(human.weight, 10)
        } lbs more`;
      } else if (dino.weight === parseInt(human.weight, 10)) {
        dino.weight = `same weight: ${dino.weight}`;
      } else {
        dino.weight = `weigh: ${
          parseInt(human.weight, 10) - dino.weight
        }lbs less`;
      }
      return dino;
    });
  }
  //helper function to convert height into inches
  function feetToInches(ft) {
    return ft * 12.0;
  }

    //compare human height(inches) to Dino height
  function heightCompare() {
    newDinoData = dinos.map((dino) => {
      let heightInInches = parseInt(feetToInches(human.feet), 10);
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
  function dietCompare() {
    newDinoData = dinos.map((dino) => {
      if (dino.diet === human.diet.toLowerCase()) {
        dino.diet = `Same Diet: ${dino.diet}`;
      } else {
        dino.diet = `Diet: ${dino.diet}`;
      }
      return dino;
    });
  }

  //get dino data compare to the human
  function dinoCompare() {
    weightCompare();
    heightCompare();
    dietCompare();
    return newDinoData;
  }

  //set data to the variable
  function setData(dinoData, humanData){
    dinos = dinoData
    human = humanData
  }


  return {
    DinoCompare: dinoCompare,
    SetData: setData 
  }

})()



const get_Dino_data = {};
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
      className:['data__disappear'],
      id: ["p_data_1"],
    },
  },
  {
    elementName: "p",
    attributes: {
      className:['data__disappear'],
      id: ["p_data_2"],
    },
  },
  {
    elementName: "p",
    attributes: {
      className:['data__disappear'],
      id: ["p_data_3"],
    },
  },
]

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
      className:['data__disappear'],
    }
  },
  {
    elementName: "p",
    attributes: {
      className:['data__disappear'],
      id: ["p_data_1"],
    },
  },
  {
    elementName: "p",
    attributes: {
      className:['data__disappear'],
      id: ["p_data_2"],
    },
  },
  {
    elementName: "p",
    attributes: {
      className:['data__disappear'],
      id: ["p_data_3"],
    },
  },
  {
    elementName: "p",
    attributes: {
      className:['data__disappear'],
      id: ["p_data_4"],
    },
  },
];



//when page loads up fetch dino data
(async function () {
  await fetch("dino.json")
    .then(async (data) => {
      const newData = await data.json();
      get_Dino_data["data"] = newData.Dinos;
    })
})();


//needs to be random
const randomNumber = (endNumber) => {
  return Math.floor(Math.random() * Math.floor(endNumber));
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
  if (attribute !== undefined && !(attribute.id == null) ) {
    element.id = attribute.id[0];
  }
  return element;
};

// add a child element to a given parent element 
const addElementsToParent = (parentElement, childrenElement) => {
  parentElement.appendChild(childrenElement)
};

//add dino and human data to a array of elements
const elementData = (elements, data, type) => {
  if(type === 'dino'){
    return elements.map((element) => {
      switch (true){
        case(element.tagName.toLowerCase() === 'h3'):
          return (element.textContent = data.species);
        case(element.tagName.toLowerCase() === 'p' && element.id === 'p_data_1'):
          return element.textContent = data.weight
        case(element.tagName.toLowerCase() === 'p' && element.id === 'p_data_2'):
          return (element.textContent = data.height);
        case(element.tagName.toLowerCase() === 'p' && element.id === 'p_data_3'):
          return (element.textContent = data.diet);
        case(element.tagName.toLowerCase() === 'p' && element.id === 'p_data_4'):
          return (element.textContent = data.fact);
        case(element.tagName.toLowerCase() === 'img'):
          return (element.src = `./images/${data.species.toLowerCase()}.png`);
      }
    })
  }else{
    return elements.map((element) => {
      switch(true){
        case(element.tagName.toLowerCase() === 'h3'):
          return (element.textContent = data.name);
        case(element.tagName.toLowerCase() === 'p' && element.id === 'p_data_1'):
          return element.textContent = data.weight
        case(element.tagName.toLowerCase() === 'p' && element.id === 'p_data_2'):
          return (element.textContent = data.feet);
        case(element.tagName.toLowerCase() === 'p' && element.id === 'p_data_3'):
          return (element.textContent = data.diet);
      }
    });
  }
};

//append all elements to given parentElement
const findingAllElementsToAppend = (parent, elements)=>{
  if(parent === 'grid-item'){
    for(let i = 0; i < elements.length; i++){
      if(i >=  1){
        addElementsToParent(elements[0], elements[i])
      }
    }
  }
}


//generate random tiles
const tiles_generate = () => {
  const elements = [];
  const randomNumberSelected = [];
  Dino.SetData(get_Dino_data.data, Human)
  const newDino = Dino.DinoCompare()

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

//when mouse is over the tile display dino and human data
const onMouseOver = (event)=>{
  if (event.target.className === 'grid-item'){
    let grid_item = event.target
    for(let child = 0; child < grid_item.children.length; child++){
      if(grid_item.children[child].className == undefined || grid_item.children[child].className !== 'data__disappear'){
        grid_item.children[child].classList.add('data__disappear')
      }else{
        grid_item.children[child].classList.remove('data__disappear')
      }
    }
  }  
}


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
  })().then(()=>{
    //when submit button fuction is finish lissten for a mouseover on a tile
    const grid = document.querySelector('#grid')
    grid.addEventListener('mouseover', onMouseOver, false)
    
  })
})

