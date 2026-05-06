$(function () {
  // Makes sure that your function is called once all the DOM elements
  // of the page are ready to be used. This is the shorthand version of
  // $(document).ready(function() { ... })
  checkAndUpdatePetInfoInHtml();

  // When each button is clicked, it will call the function for that button.
  $(".feed-button").click(clickedFeedButton);
  $(".play-button").click(clickedPlayButton);
  $(".exercise-button").click(clickedExerciseButton);
  $(".sleep-button").click(clickedSleepButton);

  bindDevToolsButtons();
  console.log("GigaPet loaded. HW10 DevTools examples are on index.html and script.js.");
});

// pet_info object holds all of Zorp's current stats.
// Required keys: name, weight, happiness (per project spec).
// Additional keys: hunger, energy, age for richer gameplay.
// All numeric stats are on a 0-10 scale; age starts at 0.
var pet_info = { name: "ZORP", happiness: 7, weight: 5, hunger: 5, energy: 8, age: 0 };

// BUTTON FUNCTIONS

function clickedFeedButton() {
  const snackAmount = document.querySelector("#snackAmount").value;

  if (pet_info["hunger"] == 0) {
    showSpeechBubble("*Zorp is already full!*");
  } else {
    const previousWeight = pet_info["weight"];
    const updatedWeight = calculateFedWeight(previousWeight, snackAmount);
    const hungerDrop = Number(snackAmount);

    showSpeechBubble("*munch munch*");
    pet_info["hunger"] = pet_info["hunger"] - hungerDrop;        // less hungry after eating
    pet_info["happiness"] < 10 ? pet_info["happiness"]++ : null; // treats make Zorp happy
    pet_info["weight"] = updatedWeight;                          // intentionally buggy until Number() fix
    pet_info["energy"] < 10 ? pet_info["energy"]++ : null;       // food gives energy

    updateFeedDebugOutput(previousWeight, snackAmount, updatedWeight);
  }
  checkAndUpdatePetInfoInHtml();
}

function calculateFedWeight(currentWeight, snackAmount) {
  // DevTools Sources practice:
  // Set a line-of-code breakpoint on the next line, click FEED, then inspect
  // currentWeight, snackAmount, updatedWeight, and typeof snackAmount.
  // The bug happens because input values are strings, so + joins the values.
  let updatedWeight = currentWeight + snackAmount;

  // Apply the fix after debugging:
  // let updatedWeight = Number(currentWeight) + Number(snackAmount);

  return updatedWeight;
}

function updateFeedDebugOutput(previousWeight, snackAmount, updatedWeight) {
  const feedDebugResult = document.querySelector("#feedDebugResult");
  if (!feedDebugResult) return;

  feedDebugResult.textContent =
    "Weight: " + previousWeight + " + " + JSON.stringify(snackAmount) + " = " + updatedWeight;
}

function clickedPlayButton() {
  if (pet_info["energy"] == 0) {
    showSpeechBubble("*Zorp is too tired to play...*");
  } else {
    showSpeechBubble("*zorp zorp zorp!*");
    pet_info["happiness"] < 10 ? pet_info["happiness"]++ : null; // playing makes Zorp happy
    pet_info["weight"] > 0 ? pet_info["weight"]-- : null;        // playing burns weight
    pet_info["hunger"] < 10 ? pet_info["hunger"]++ : null;       // playing makes you hungry
    pet_info["energy"]--;                                        // playing drains energy
  }
  checkAndUpdatePetInfoInHtml();
}

function clickedExerciseButton() {
  if (pet_info["energy"] == 0) {
    showSpeechBubble("*Zorp is too tired to exercise...*");
  } else {
    showSpeechBubble("*huff huff huff*");
    pet_info["happiness"] > 0 ? pet_info["happiness"]-- : null; // exercise is draining, reduces happiness
    pet_info["weight"] > 0 ? pet_info["weight"]-- : null;       // exercise reduces weight
    pet_info["hunger"] < 10 ? pet_info["hunger"]++ : null;      // exercise makes you hungry
    pet_info["energy"]--;                                       // drains energy
    pet_info["energy"] > 0 ? pet_info["energy"]-- : null;       // exercise drains more than play
  }
  checkAndUpdatePetInfoInHtml();
}

function clickedSleepButton() {
  if (pet_info["energy"] == 10) {
    showSpeechBubble("*Zorp is not tired!*");
  } else {
    showSpeechBubble("*zzzZZZzzz*");
    pet_info["energy"] < 10 ? pet_info["energy"]++ : null;       // sleep restores energy
    pet_info["happiness"] < 10 ? pet_info["happiness"]++ : null; // well rested = happy
    pet_info["hunger"] < 10 ? pet_info["hunger"]++ : null;       // wake up hungry
  }
  checkAndUpdatePetInfoInHtml();
}

// UNIQUE JQUERY METHOD #1: .fadeIn()
// .fadeIn() is a jQuery effect method that gradually animates an element
// from invisible (opacity 0 / display none) to fully visible (opacity 1).
// It accepts a duration in milliseconds or the keywords "slow" or "fast".
// We use it here on the speech bubble so Zorp's reactions animate in
// smoothly instead of snapping in instantly, making the UI feel more alive.
// .hide() is called first to reset the element to hidden before each fade,
// otherwise .fadeIn() would have nothing to animate if it is already visible.
function showSpeechBubble(message) {
  $(".speech-bubble").hide().text(message).fadeIn(400); // fades in over 400 milliseconds
}

// CORE LOGIC FUNCTIONS

function checkAndUpdatePetInfoInHtml() {
  checkWeightAndHappinessBeforeUpdating();
  updatePetInfoInHtml();
}

// Safety net that clamps numeric stats between 0 and 10.
// The Feed bug intentionally leaves weight as a string so it is visible in DevTools.
function checkWeightAndHappinessBeforeUpdating() {
  let stats = ["happiness", "weight", "hunger", "energy"];
  stats.forEach(function (stat) {
    if (typeof pet_info[stat] !== "number") {
      console.warn("DevTools bug demo: " + stat + " is a " + typeof pet_info[stat] + ".", pet_info[stat]);
      return;
    }

    if (pet_info[stat] < 0) pet_info[stat] = 0;
    if (pet_info[stat] > 10) pet_info[stat] = 10;
  });
}

// UNIQUE JQUERY METHOD #2: .addClass() / .removeClass()
// These methods let us switch the device into sad-mode when Zorp's happiness
// drops to 3 or below, then return to the normal colors after happiness recovers.
function updatePetInfoInHtml() {
  // Update Zorp's name and all stat values in the HTML.
  $(".pet-name").text(pet_info["name"]);
  $(".happiness-val").text(pet_info["happiness"]);
  $(".weight-val").text(pet_info["weight"]);
  $(".hunger-val").text(pet_info["hunger"]);
  $(".energy-val").text(pet_info["energy"]);
  $(".age-val").text(pet_info["age"]);

  // Multiply by 10 to convert the 0-10 value into a 0-100% CSS width.
  $(".happiness-fill").css("width", pet_info["happiness"] * 10 + "%");
  $(".weight-fill").css("width", pet_info["weight"] * 10 + "%");
  $(".hunger-fill").css("width", pet_info["hunger"] * 10 + "%");
  $(".energy-fill").css("width", pet_info["energy"] * 10 + "%");

  // Swap Zorp's image based on current happiness level.
  if (pet_info["happiness"] <= 3) {
    $(".pet-image").attr("src", "./images/zorp-sad.png");
  } else if (pet_info["happiness"] >= 8) {
    $(".pet-image").attr("src", "./images/zorp-happy.png");
  } else {
    $(".pet-image").attr("src", "./images/zorp-normal.png");
  }

  // Add or remove sad-mode class on the device wrapper based on Zorp's happiness.
  if (pet_info["happiness"] <= 3) {
    $(".device-wrapper").addClass("sad-mode");
  } else {
    $(".device-wrapper").removeClass("sad-mode");
  }
}

// CHROME DEVTOOLS / HW10 EXAMPLES

function bindDevToolsButtons() {
  $("#logInfo").click(logInfoExample);
  $("#logWarning").click(logWarningExample);
  $("#logError").click(logErrorExample);
  $("#logTable").click(logTableExample);
  $("#logGroup").click(logGroupExample);
  $("#logCustom").click(logCustomExample);
  $("#cause404").click(cause404Example);
  $("#causeTypeError").click(causeTypeErrorExample);
  $("#causeViolation").click(causeViolationExample);
}

function logInfoExample() {
  console.log("Info: Zorp is awake, hydrated, and ready to be inspected.");
}

function logWarningExample() {
  console.warn("Warning: Zorp's Feed action is intentionally using a string snack value.");
}

function logErrorExample() {
  console.error("Error example: Zorp tried to divide snacks by zero.");
}

function logTableExample() {
  console.table([
    { stat: "happiness", value: pet_info["happiness"], max: 10 },
    { stat: "weight", value: pet_info["weight"], max: 10 },
    { stat: "hunger", value: pet_info["hunger"], max: 10 },
    { stat: "energy", value: pet_info["energy"], max: 10 },
  ]);
}

function logGroupExample() {
  console.group("Zorp Debug Report");
  console.log("Current pet name:", pet_info["name"]);
  console.log("Current age:", pet_info["age"]);
  console.table(pet_info);
  console.groupEnd();
}

function logCustomExample() {
  const styles = "background:#1e3a1e;color:#aaffaa;border:2px solid #4a9a4a;padding:6px;font-size:14px;";
  console.log("%cZorp says: styled console logs work on the real app page.", styles);
}

function cause404Example() {
  fetch("./missing-zorp-snack-data.json")
    .then(function (response) {
      if (!response.ok) {
        console.warn("Expected 404 response for DevTools Network practice:", response.status);
      }
    })
    .catch(function (error) {
      console.error("Fetch failed while trying to cause a DevTools network message:", error);
    });
}

function causeTypeErrorExample() {
  // Intentional TypeError: #missing-date does not exist, so querySelector returns null.
  document.querySelector("#missing-date").textContent = new Date();
}

function causeViolationExample() {
  const duration = 1800;
  const start = performance.now();

  while (performance.now() < start + duration) {
    // Intentionally block the main thread so Chrome can show a violation warning.
  }

  console.warn("Finished intentional blocking work for the DevTools violation example.");
}
