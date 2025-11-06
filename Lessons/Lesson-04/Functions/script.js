//const person1 = "Giovanni"                                          // this "outside variables" are called GLOBAL VARIABLES
//const person2 = "Ale"

//function greet(personA, personB){                                  //greet:name of the function {}
   // console.log("Hi " + personA + " and" + personB + "!");         // () parameter
//}                                                                  //{} block of expression
                                                                     //LOCAL VARIABLES are not "defined variables"

//greet("Anna", " Giovanni");                                        //calling the function, otherwise it won't work
                                                                     //it can be called on the console


// values inside parameters aren't a variables, they only exist inside the function, it's a matter of scope

//console.log("Hi " + person1 + " and" + person2 + "!");

function fullName (name, surname){
    return "Surname: " + surname + " Name: " + name
}

// console.log (fullName(" Marco", " Lurati"));

function printGrades(name, surname, course){
    console.log(fullName(name, surname) + ", course" + course)
}

function printInfo(name, surname, grade){
    const school = "SUPSI";
    console.log(school + " " + fullName(name, surname) + ", grade" + grade)
}


printInfo("Marco", "Lurati", "Coding Fundations")
printGrades("Marco", "Lurati", " 4")

