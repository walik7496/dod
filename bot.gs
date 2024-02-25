// configuration
var apiToken = "your Telegram token";
var appUrl   = "your Google app url";
var apiUrl   = "https://api.telegram.org/bot" + apiToken;

// set webhook
function setWebhook() {
  var url = apiUrl + "/setwebhook?url=" + appUrl;
  var res = UrlFetchApp.fetch(url).getContentText();
  Logger.log(res);
}

// handle webhook
function doPost(e) {
  var webhookData = JSON.parse(e.postData.contents);
  var from = webhookData.message.from.id;
  var text = webhookData.message.text;
  var sendText = "";

  if (text.length > 1) {
    try {
      var r1 = text.replace(/[.\s]/g, '');
      if (/^\d{8}$/.test(r1)) {
        var r2 = parseInt(r1.substring(0, 2)) + parseInt(r1.substring(2, 4)) + parseInt(r1.charAt(4)) + parseInt(r1.charAt(5)) + parseInt(r1.charAt(6)) + parseInt(r1.charAt(7));
        var r3 = r2 + parseInt(r1.substring(2, 4)) + parseInt(r1.substring(2, 4)) * 2;

        if (!isNaN(r2) && !isNaN(r3) && isFinite(r2) && isFinite(r3)) {
          sendText = "You will die at " + r2 + " or " + r3;
        } else {
          sendText = "Invalid input. Please provide a valid number.";
        }
      } else {
        sendText = "Invalid input format. Please provide a valid 8-digit number.";
      }
    } catch (error) {
      sendText = "You typed something wrong :(";
    }
  }

  var url = apiUrl + "/sendmessage?parse_mode=HTML&chat_id=" + from + "&text=" + encodeURIComponent(sendText);
  var opts = { "muteHttpExceptions": true };
  UrlFetchApp.fetch(url, opts).getContentText();
}

function doGet(e) {
  return ContentService.createTextOutput("Method GET not allowed");
}