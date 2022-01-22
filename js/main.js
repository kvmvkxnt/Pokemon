var elForm = document.querySelector('.pokemons__form');
var elNameInput = document.querySelector('#name_input');
var elTypesInput = document.querySelector('#types_input');
var elWeightInput = document.querySelector('#weight_input');
var elAgeInput = document.querySelector('#age_input');
var elImgInput = document.querySelector('#img_input');
var elList = document.querySelector('.pokemons__list');

elForm.addEventListener('submit', function(evt) {
    evt.preventDefault();
    handleFormSubmitter(pokemons);
});

//created new function because because when created with preventDefault(), it returned error.
function handleFormSubmitter(_list) {
    var name = elNameInput.value.trim();
    var img = elImgInput.value.trim();
    var types = elTypesInput.value.trim();
    var weight = Number(elWeightInput.value.trim());
    var age = Number(elAgeInput.value.trim());

    for (var i = 0; i < _list.length; i++) {
        if (_list[i].name == name) {
            alert('This pokemon already exists');
            return;
        }
    }

    if (name == null || types == null || weight == null || age == null || img == null) {
        alert('Please, enter full info');
        return;
    } else if (isNaN(weight) || isNaN(age)) {
        alert('Please enter number in "Age" and "Weight"');
        return;
    } else {
        var allPokemons = document.querySelectorAll('.pokemons__item');
        createNewObject(_list, age, weight, name, types, img);
        elList.insertBefore(createElement(0, _list), allPokemons[0]);
    }
}

function createNewObject(data, inputAge, inputWeight, inputName, inputTypes, inputImg) {
    var types = inputTypes.split(', ');

    data.unshift({
        name: inputName,
        img: inputImg,
        type: types,
        weight: String(inputWeight) + ' kg',
        age: inputAge,
    });
}

function renderList(_list) {
    for (var i = 0; i < _list.length; i++) {
        //we are appending elemnt that is already created in function createElement
        elList.appendChild(createElement(i, _list));
    }
}

//Function creates new element. It was created to reduce code and for comfortability and late usage :)
function createElement(starter, data) {
    //creating elements
    var newItem = document.createElement('li');
    var newImg = document.createElement('img');
    var newInfoSection = document.createElement('div');
    var newMenuSection = document.createElement('div');
    var newTitle = document.createElement('h1');
    var newButton = document.createElement('button');
    var newFont = document.createElement('i');
    var newType = document.createElement('p');
    var newNumInfo = document.createElement('div');
    var newWeight = document.createElement('p');
    var newAge = document.createElement('p');

    //setting classes and attributes
    newItem.setAttribute('class', 'pokemons__item border border-2 border-dark mb-3 bg-light d-flex flex-column align-items-center');
    newImg.setAttribute('src', data[starter].img);
    newImg.setAttribute('alt', data[starter].name + ' image');
    newImg.setAttribute('class', 'pokemons__img mt-4 mb-5');
    newInfoSection.setAttribute('class', 'pokemons__info pt-3 pb-4 px-4 border-top border-2 border-dark d-flex flex-column align-items-start w-100');
    newMenuSection.setAttribute('class', 'pokemons__menu d-flex justify-content-between w-100 align-items-xl-center');
    newTitle.setAttribute('class', 'pokemon__title');
    newButton.setAttribute('class', 'pokemon__like border-0 bg-transparent');
    newFont.setAttribute('class', 'bi bi-heart');
    newType.setAttribute('class', 'pokemon__weak mb-3');
    newNumInfo.setAttribute('class', 'pokemon__num-info d-flex');
    newWeight.setAttribute('class', 'pokemon__weight fw-bold');
    newAge.setAttribute('class', 'pokemon__age ms-3 fw-bold');

    //adding textContent
    var types = data[starter].type.join(', ');
    newTitle.textContent = data[starter].name;
    newType.textContent = types;
    newWeight.textContent = data[starter].weight;
    newAge.textContent = data[starter].age + ' age';

    //appending elements
    newButton.appendChild(newFont);
    newMenuSection.appendChild(newTitle);
    newMenuSection.appendChild(newButton);
    newNumInfo.appendChild(newWeight);
    newNumInfo.appendChild(newAge);
    newInfoSection.appendChild(newMenuSection);
    newInfoSection.appendChild(newType);
    newInfoSection.appendChild(newNumInfo);
    newItem.appendChild(newImg);
    newItem.appendChild(newInfoSection);

    return newItem;
}

renderList(pokemons);