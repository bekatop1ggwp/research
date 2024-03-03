chrome.runtime.sendMessage({
  action: "sendHTML",
  html: document.querySelector("html").innerHTML,
});
