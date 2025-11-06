/*let grade = 8;        //0..6, 4 is passed {}

/*if (grade >= 4){
    console.log("You passed the course!");
}

else {
    console.log("Sorry, try again!");
}//

// CONDITION BLOCKS
//IF ELSE CONDITION
if (grade == 6){
    console.log("Excellent");
}

else if (grade >= 5 && grade <6){
    console.log("Good")
}

else if (grade == 4 && grade <5){
    console.log("Sufficient")
}

else if (grade > 6 || grade < 1 ){                          //bigger than six OR smaller than 1
    console.log("that's impossible, wrong grade")
}

else {
    console.log("Insufficient")
}


//SWITCH CONDITION
switch (grade){
    case: 6:
        console.log("Excellent");
         break;
    case: 5:
        console.log("Good");
    break;
    case: 4:
        console.log("Sufficient");
        break;
    default:
        console.log("Undefined");
        break;

}*/


//ITERATIONS        -INIZIALIZATION, CONDITION, AFTERTHOUGHT-
// FOR LOOP

/*for (let number = 0; number < 10; number++){
    console.log(number)
}*/


/*const cats = ["Leopard", "Jaguar", "Tiger", "Lion"];

for (let id = 0; id < cats.length; id++) {       //using the lenght of the array to scale
    console.log(cats[id]);
}



document.addEventListener('keydown', (keyEvent) => {
    console.log(keyEvent.key);
    if(keyEvent.key == ''){
        console.log("SPACE")
    }
    else if (keyEvent.key == '1'){
        console.log("ONE")
    }
})*/


song1 = "https://cdn.pixabay.com/download/audio/2025/10/28/audio_4285598df8.mp3?filename=groovy-vibe-427121.mp3";
song2 = "https://cdn.pixabay.com/download/audio/2022/05/17/audio_407815a564.mp3?filename=stomping-rock-four-shots-111444.mp3";

const player = document.getElementById('player');
const currentSong = document.getElementById('current-song');

document.addEventListener('keydown', (keyEvent) => {
  const key = keyEvent.key;

  if(key == "1" || key == "2") {
    changeSong(key);
  }
  else if(key == " ") {
    togglePlayback();
  }
})

function togglePlayback() {
  if(player.paused) {
    player.play();
  } else {
    player.pause();
  }
}

function changeSong(track) {
  switch(track) {
    case "1":
      player.src = song1;
      currentSong.innerHTML = "1";
      break;
    case "2":
      player.src = song2;
      currentSong.innerHTML = "2";
      break;
  }
}

window.addEventListener("load", () => {
  changeSong("1");
})
