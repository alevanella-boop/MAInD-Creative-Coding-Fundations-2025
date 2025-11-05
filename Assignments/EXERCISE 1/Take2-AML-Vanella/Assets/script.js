//buttons
const addButton = document.getElementById('add-btn');
const listButton = document.getElementById('list-view-btn');
const cardButton = document.getElementById('card-view-btn');
//const removeButton = document.querySelector('.btn-remove');

//const removeButton = document.getElementsByClassName('btn-remove');


//elements
const tofuInput = document.getElementById('tofu-input');
const tofuList = document.getElementById('tofu-list-container');
const colorInput = document.getElementById('color-input');


//constant to actually add an idea to the pin board once written into the input field

const inputField = document.getElementById('tofu-input');


//EVENT LISTENERS-> added a listener so the action can be executed

listButton.addEventListener("click", () => {
    console.log("list view button pressed!")
});

cardButton.addEventListener("click", () => {
    console.log("card view button pressed!")
});



//CHANGE VIEW

//Event listeners for view toggle
//List
listButton.addEventListener('click', () => {
    console.log("list button pressed!");

    tofuList.classList.remove("card-view");
    tofuList.classList.add("list-view");
})

//Cards
cardButton.addEventListener('click', () => {
    console.log("card button pressed!");

    tofuList.classList.remove("list-view");
    tofuList.classList.add("card-view");
})


//ADD ITEM
addButton.addEventListener('click', () => {
    console.log("Add button pressed!!!!");
   
    const inputValue = tofuInput.value;
    const selectedColor = colorInput.value;  // ADD THIS
    
    if (inputValue === "") {
        return;
    }

    const tofuElement = document.createElement("li");
    tofuElement.style.backgroundColor = selectedColor;  // ADD THIS
    
    // Create paragraph for text
    const p = document.createElement("p");
    p.textContent = inputValue;
    
    // Create remove button
    const btnRemove = document.createElement("button");
    btnRemove.textContent = "X";
    btnRemove.className = "btn-remove";
    
    // Add both to the li
    tofuElement.appendChild(p);
    tofuElement.appendChild(btnRemove);

    tofuList.appendChild(tofuElement);

    tofuInput.value = "";
});


tofuList.addEventListener('click', (e) => {
    if (e.target.classList.contains('btn-remove')) {
        e.target.closest('li').remove();
    }
});

