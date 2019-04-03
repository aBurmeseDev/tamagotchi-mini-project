console.log("js loaded");

class Tamagotchi {
  constructor(name) {
    this.name = name;
    this.hunger = 1;
    this.sleepiness = 1;
    this.boredom = 1;
    this.age = 1;
    this.status = "";
    this.life = {
      hunger: {
        // Set the difficulty of the game
        scale: getRandomScale(0, 3)
      },
      sleepiness: {
        // Set the difficulty of the game
        scale: getRandomScale(2, 7)
      },
      boredom: {
        // Set the difficulty of the game
        scale: getRandomScale(5, 10)
      },
      age: {
        scale: 20
      }
    };
  }
}
const getRandomScale = (min, max) => {
  return Math.floor(Math.random() * (max - min) + min);
};

const $time = $("#time");
const $name = $(".name");
const $age = $(".age");
const $hunger = $(".hunger");
const $sleepiness = $(".sleepiness");
const $boredom = $(".boredom");
const $food = $(".food");
const $play = $(".play");
const $nap = $(".lightToggleOff");
// functions
let interval;
var newTamagotchi = new Tamagotchi();
var setTime = 0;

// console.log(newTamagotchi.life);
const game = {
  init() {
    // Image change
    $(".welcome").attr(
      "src",
      "https://media.giphy.com/media/ENrhGhuwksLss/giphy.gif"
    );
    // User name input
    var getName = prompt("What would you like to name your tamagotchi?");
    newTamagotchi = new Tamagotchi(getName);
    // Time reset
    clearInterval(interval);
    setTime = 0;
    // console.log(newTamagotchi);
    game.setTimer();
    game.render();
  },
  setTimer() {
    interval = window.setInterval(function() {
      setTime += 1;
      $time.text(`Timer: ${setTime} s`);
      // the time interval counts
      for (let him in newTamagotchi.life) {
        if (setTime % newTamagotchi.life[him]["scale"] === 0) {
          newTamagotchi[him] += 1;
        }
      }
      game.render();
    }, 1000);
  },
  render() {
    $name.text(`"${newTamagotchi.name.toUpperCase()}"`);
    $age.text(`Age: ${newTamagotchi.age}`);
    $hunger.text(`Hunger: ${newTamagotchi.hunger}/10`);
    $sleepiness.text(`Sleepiness: ${newTamagotchi.sleepiness}/10`);
    $boredom.text(`Boredom: ${newTamagotchi.boredom}/10`);

    //checks death
    if (
      newTamagotchi.hunger >= 10 ||
      newTamagotchi.sleepiness >= 10 ||
      newTamagotchi.boredom >= 10
    ) {
      game.death();
    }
  },
  feed() {
    if (newTamagotchi.hunger >= 1) {
      newTamagotchi.hunger -= 1;
    } else {
      newTamagotchi.hunger = 0;
    }
    $(".welcome").attr(
      "src",
      "https://media.giphy.com/media/q5OV6r9dUvDMs/giphy.gif"
    );
  },
  play() {
    if (newTamagotchi.boredom >= 2) {
      newTamagotchi.boredom -= 2;
    } else {
      newTamagotchi.boredom = 0;
    }
    $(".welcome").attr(
      "src",
      "https://media.giphy.com/media/sybXBcBpPHv2g/giphy.gif"
    );
  },
  nap() {
    if (newTamagotchi.sleepiness >= 3) {
      newTamagotchi.sleepiness -= 3;
    } else {
      newTamagotchi.sleepiness = 0;
    }
    $("body").css("backgroundColor", "#1a0d0d");
    $(".welcome").attr(
      "src",
      "https://media.giphy.com/media/OFD5J5AO2czeg/giphy.gif"
    );
    $("#time").css("color", "#ffffff");
  },
  death() {
    if (newTamagotchi.boredom >= 10) {
      clearInterval(interval);
      newTamagotchi.status = "dead";
      alert("Your Tamagotchi has died from boredom!");
    } else if (newTamagotchi.sleepiness >= 10) {
      clearInterval(interval);
      newTamagotchi.status = "dead";
      alert("Your Tamagotchi has died from lack of sleepiness!");
    } else if (newTamagotchi.hunger >= 10) {
      clearInterval(interval);
      newTamagotchi.status = "dead";
      alert("Your Tamagotchi has died from hunger!");
    }
  }
};
// Buttons click
$(".gameStart").on("click", game.init);
// Feed me click
$food.on("click", game.feed);
// Play me click
$play.on("click", game.play);
// Nap time
$nap.on("click", game.nap);
// Wake time
$(".lightToggleOn").on("click", () => {
  $("body").css("backgroundColor", "#ffffff");
  $(".welcome").attr(
    "src",
    "https://media.giphy.com/media/pdcEBvl3aokms/giphy.gif"
  );
  if (newTamagotchi.age > 2) {
    $(".welcome").attr(
      "src",
      "https://media.giphy.com/media/l2QDTsTL2NhwOEAV2/source.gif"
    );
  } else if (newTamagotchi.age > 3) {
    $(".welcome").attr(
      "src",
      "https://media.giphy.com/media/l2QDTsTL2NhwOEAV2/source.gif"
    );
  }
});
