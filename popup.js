// Check the button state from the background script
const runButton = document.getElementById("run-mizito-order");

// Check if the button should be disabled (fetch the state from background.js)
chrome.runtime.sendMessage({ action: "checkButtonState" }, (response) => {
  if (response.isButtonDisabled) {
    runButton.disabled = true;
    runButton.textContent = "Mizito Order is running...";
  }
});

// Add click event listener to the button
runButton.addEventListener("click", () => {
  // Disable the button and change the text
  runButton.disabled = true;
  runButton.textContent = "Mizito Order is running...";

  // Send a message to the background to update the button state
  chrome.runtime.sendMessage({ action: "disableButton" });
});

document.getElementById("run-mizito-order").addEventListener("click", async function () {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  if (tab) {
    console.log("Tab found:", tab.url);
  } else {
    console.error("No active tab found");
  }

  if (tab && tab.url.startsWith("https://office.mizito.ir/")) {
    console.log("Injecting content.js and sortable.min.js into the tab...");
    chrome.scripting
      .executeScript({
        target: { tabId: tab.id },
        files: ["libs/sortable.min.js", "content.js"],
      })
      .then(() => {
        console.log("Scripts injected successfully!");
      })
      .catch((err) => {
        console.error("Error injecting scripts:", err);
      });
  } else {
    console.warn("The tab is not a valid Mizito Office page");
    alert("This script only works on https://office.mizito.ir/");
  }
});
