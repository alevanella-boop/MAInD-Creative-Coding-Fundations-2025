/*console.log('ciao')


const HOBBIES=["judo", "boxe", "cycling"]

console.log(HOBBIES.length)             //see in browser the actual length fo the array
console.log(HOBBIES[0])                 // {}

const PERSON = {
    name: "Sasha",
    lastname: "Bravo",
    hobbies: HOBBIES                    // here i'm "recalling" the constant I declared before
}
console.log(PERSON)

//in the obj there's a different way to display a single selected value
//this is the basic structure to find an item. it follows the "nesting" logic
console.log(PERSON.name)
console.log(PERSON.hobbies/*[0])

//to display all this stuff into html i need to create a container
/*const CONTAINER = document.getElementById('container')

//create a for loop that displays line by line all 3 hobbies
for (hobby of PERSON.hobbies){

    
    const ITEM = document.createElement('li');

    //2 ways of creating a new element in the html file
    ITEM.textContent = hobby;
    //only text can be created

    //ITEM.innerHTML = hobby;
    //it is possible to add any html element 

    // now create the actual container
    CONTAINER.appendChild(ITEM)

   // console.log(hobby)

}
//this for loop starts from an array
// then a local/temporary variable is created (hobby)
// the temporary valuable can be used to console.log something and even in the html
*/

const CONTAINER = document.getElementById ('container')

fetch('/assets/data/data.json') // get the data from an external source
  .then(response => response.json()) // parse/convert the data in JavaScript format
                                     //make the browser realize that my file is a jason file

  .then(data => displayData(data)) // dispay the data in the console
  // .catch(error => console.error('Error:', error)); // display an error if the data cannot be loaded
  
  .catch(error => displayError(error)); //recalling the function below


function displayData(data){         //function that deals with the actual display of data
    console.log(data)

    let counter = 0;


    for (hobby of data.hobbies) {

        counter += 1;
        const ITEM = document.createElement('li');
        ITEM.textContent = `${hobby}`;

        CONTAINER.appendChild(ITEM)
    }

}

function displayError(error){         
    console.log(error)
}