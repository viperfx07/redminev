// Copyright (c) 2010 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

function sendCommandToActiveTab(commandStr, callbackFunction){
  chrome.tabs.query({
        active: true,
        currentWindow: true
    }, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, { command: commandStr} , callbackFunction);
    });
}

// A generic onclick callback function.
function copyTitleToClipboard() {
  var callback = function(response) {
      if (response && response.type == 'copy') {
        var input = document.createElement('textarea');
        document.body.appendChild(input);
        input.value = response.text;
        input.focus();
        input.select();
        document.execCommand('Copy');
        input.remove();
    }
  }
  sendCommandToActiveTab("copytitle", callback);
}

function goToIssue(){
  var callback = function(response){
    if(response && response.type == 'goto') {
      var issueNumber = response.issueNumber;
      var redmineUrl = "https://projects.readingroom.com";
      var issueUrl = redmineUrl + "/issues/" + issueNumber;
      console.log(issueUrl);
      chrome.tabs.create({url: issueUrl})
    }
  }
  sendCommandToActiveTab("gotoissue", callback)
}

chrome.commands.onCommand.addListener(function(command){
  switch(command){
    case 'copy-title-to-clipboard': copyTitleToClipboard(); break;
    case 'go-to-issue': goToIssue(); break;
  }
  
})

// Create one test item for each context type.
chrome.contextMenus.create({
    "title": "Copy title to clipboard",
    "contexts": ["page"],
    "onclick": copyTitleToClipboard
});
