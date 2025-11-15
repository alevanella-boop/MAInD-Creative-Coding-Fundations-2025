const CONTAINER = document.getElementById ('container')

fetch('/assets/data/MOCK_DATA.json')
  .then(response => response.json()) 

  .then(data => displayData(data)) 
  
  .catch(error => displayError(error));

function displayData (data){
    console.log(data)

    //FILTER
    //create a sub-set for the data, a filtered data
    //creating a filter means to create a new constant or a new variable
    const FILTERED = data.filter( (obj) => obj.age >= 20 && obj.age < 39 )
    //const SUB_FILTER = FILTERED.filter( (obj) => obj.gender == 'Female')
    console.log(FILTERED.lenght)
    
    //SORTS
    //creating a sort doesn't mean to create a constant, it acts on variables that already exist
    const SORT = FILTERED.sort( (a, b) => a.age -b.age )
    //const SORT_NAME = SUB_FILTER.sort ( (a, b) => b.first_name.localCompare(a.first_name) )
    

    for (let person of SORT){

      //creation of the new elements
      const PERSON_BOX = document.createElement ('li');
      PERSON_INFO = document.createElement('div')
      const PERSON_BAR= document.createElement('div');
      
      PERSON_INFO.textContent = `${person.first_name}, ${person.last_name}, ${person.gender}, ${person.age}`;

      //style of the bar
      const BAR_WIDTH =person.age * 5;
      PERSON_BAR.style.width = `${BAR_WIDTH}px`;
      PERSON_BAR.className = 'bar ';

      //color
      let BAR_COLOR = 'gray'

      if (person.gender == 'Male') {
        BAR_COLOR = 'blue'
      }
      else if (person.gender == 'Female') {
        BAR_COLOR = 'pink'
      }
      else {
        BAR_COLOR = 'orange'
      }

      PERSON_BAR.style.backgroundColor = BAR_COLOR;



      PERSON_BOX.appendChild(PERSON_INFO);
      PERSON_BOX.appendChild(PERSON_BAR);

      CONTAINER.appendChild(PERSON_BOX);

    }

}

function displayError (error){
    console.log(error)
}


