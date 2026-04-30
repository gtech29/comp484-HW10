// Log Info example: displays a normal informational message in the Console.
document.querySelector("#logInfo").addEventListener("click", () => {
  console.log("Info: Zorp is currently pretending to understand JavaScript.");
});

// Log Warning example: connects the Log Warning button to the logWarning function.
document.querySelector("#logWarning").addEventListener("click", logWarning);

// This function creates a warning message in the Console.
function logWarning() {
  console.warn(
    "Warning: Zorp is dangerously close to eating the debug button.",
  );
}

// Log Error example: displays an error message in the Console.
document.querySelector("#logError").addEventListener("click", () => {
  console.error(`Error: Zorp tried to divide snacks by zero.`);
});

// Log Table example: displays Zorp-related data in a table format.
document.querySelector("#logTable").addEventListener("click", () => {
  console.table([
    {
      name: "Zorp",
      mood: "Suspicious",
      status: "Watching the console",
    },
    {
      name: "Debug Goblin",
      mood: "Chaotic",
      status: "Creating bugs",
    },
    {
      name: "Snack Button",
      mood: "Nervous",
      status: "About to be clicked",
    },
  ]);
});

// Log Group example: organizes related messages under one expandable group.
document.querySelector("#logGroup").addEventListener("click", () => {
  const label = "Zorp Secret Debug Report";
  console.group(label);
  console.info("Zorp blinked.");
  console.info("The console noticed.");
  console.info("Everything got weird.");
  console.groupEnd(label);
});

// Log Custom example: uses CSS styling to customize the console message.
document.querySelector("#logCustom").addEventListener("click", () => {
  const spacing = "5px";
  const styles = `padding: ${spacing}; background-color: darkblue; color: white; font-style: 
         italic; border: ${spacing} solid crimson; font-size: 2em;`;
  console.log("%cZorp says: style your logs, not your bugs.", styles);
});

// Cause TypeError example: tries to update an element that does not exist.
document.querySelector("#causeTypeError").addEventListener("click", () => {
  document.querySelector("#date").textContent = new Date();
});

// Cause Violation example: blocks the main thread long enough for Chrome to show a violation warning.
document.querySelector("#causeViolation").addEventListener("click", (e) => {
  const duration = 3000;
  const start = new Date().getTime();
  while (new Date().getTime() < start + duration) {
    // Block the main thread for 3 seconds.
  }
});

// Cause 404 example: requests a missing resource so the browser logs a 404 network error.
document.querySelector("#cause404").addEventListener("click", (e) => {
  fetch("/snacks");
});

// Intentional Bug
// Debugging practice example: this calculator is used to reproduce a bug,
// pause the code with a breakpoint, inspect variables, use Watch expressions,
// test a fix in the Console, and then apply the fix.
// The bug happens because input values are read as strings.
document.querySelector("#calculateSnacks").addEventListener("click", (e) => {
  const snack1 = document.querySelector("#snack1").value;
  const snack2 = document.querySelector("#snack2").value;

  // Intentional bug: this joins the two string values instead of adding them as numbers.
  let calculateResult = snack1 + snack2;

  // Displays the buggy result on the page.
  document.querySelector("#snackResult").textContent =
    `Zorp has ${calculateResult} snacks`;
});
