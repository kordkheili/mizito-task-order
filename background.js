chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "runMizitoOrder") {
    // Implement your logic here
    console.log("Running Mizito Order...");

    // After the logic is done, you can choose to reset the button state or leave it disabled
  }
});
