document.getElementById("run-mizito-order").addEventListener("click", async () => {
  console.log("Button clicked");
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
