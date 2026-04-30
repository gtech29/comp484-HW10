document.querySelector("#logInfo").addEventListener("click", () => {
  console.log("Info: Zorp is currently pretending to understand JavaScript.");
});

document.querySelector("#logWarning").addEventListener("click", logWarning);


function logWarning() {
  console.warn(
    "Warning: Zorp is dangerously close to eating the debug button.",
  );
}

document.querySelector("#logError").addEventListener("click", () => {
  console.error(`Error: Zorp tried to divide snacks by zero.`);
});

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

document.querySelector("#logGroup").addEventListener("click", () => {
  const label = "Zorp Secret Debug Report";
  console.group(label);
  console.info("Zorp blinked.");
  console.info("The console noticed.");
  console.info("Everything got weird.");
  console.groupEnd(label);
});

document.querySelector("#logCustom").addEventListener("click", () => {
  const spacing = "5px";
  const styles = `padding: ${spacing}; background-color: darkblue; color: white; font-style: 
         italic; border: ${spacing} solid crimson; font-size: 2em;`;
  console.log("%cZorp says: style your logs, not your bugs.", styles);
});

document.querySelector("#causeTypeError").addEventListener("click", () => {
  document.querySelector("#date").textContent = new Date();
});

document.querySelector("#causeViolation").addEventListener("click", (e) => {
  const duration = 3000;
  const start = new Date().getTime();
  while (new Date().getTime() < start + duration) {
    // Block the main thread for 3 seconds.
  }
});

document.querySelector("#cause404").addEventListener("click", (e) => {
  fetch("/coffee");
});
