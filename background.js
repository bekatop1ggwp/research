// const wss = new WebSocket("ws://localhost:5000/test");
const wss = new WebSocket("wss://extension-server-xpgm.onrender.com/test");

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "sendHTML") {
    // const ws = new WebSocket("ws://localhost:5000/ws");
    const ws = new WebSocket("wss://extension-server-xpgm.onrender.com/ws");
    ws.onopen = () => {
      console.log("Connected to server");
      ws.send(JSON.stringify({ html: request.html }));
    };
  }
});
//test
wss.onopen = () => {
  console.log("test wes");
};

wss.onmessage = (res) => {
  console.log(JSON.parse(res.data), "ws data");

  try {
    chrome.browserAction.setTitle(
      { title: JSON.parse(res.data).message },
      () => {
        console.log(res);
      }
    );
  } catch (error) {
    console.error(error);
  }
};

chrome.browserAction.onClicked.addListener(function (tab) {
  console.log("executed");
  // fetch("http://localhost:5000/send")
  fetch("https://extension-server-xpgm.onrender.com/send")
    .then((res) => res.json())
    .then((res) => {
      console.log(res);
      chrome.browserAction.setTitle(
        {
          title: res.message,
        },
        () => {
          console.log("changed");
        }
      );
    })
    .catch((err) => console.log(err));
});