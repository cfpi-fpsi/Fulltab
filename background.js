// When the browser action is triggered, launch the content script.
browser.browserAction.onClicked.addListener(function () {
    browser.tabs.executeScript({ file: "content.js" });
});
