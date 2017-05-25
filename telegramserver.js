var TelegramBot = require('node-telegram-bot-api'),
    // Be sure to replace YOUR_BOT_TOKEN with your actual bot token on this line.
    telegram = new TelegramBot("280458081:AAFoHMo57o5d9zVi-01dfQuo4EW1arxmts0", { polling: true }); //360624127:AAHmVlwqZx547P3sqqq9MEkM5y2STkgBcYg // STC-FAQ
var sync_request = require('sync-request');
var request = require('request');
telegram.on("text", function(message){
	var msg = "Hello Moto"
	console.log("Msg is--> ",message.text);
	var msgFrmServer = processReq(message.text);
	//telegram.sendMessage(message.chat.id, msg);
	telegram.sendMessage(message.chat.id, msgFrmServer);
});

function processReq(text){
console.log("processReq Msg is--> ",text);
var serverUrl= "https://fbchatserver.mybluemix.net/api/message";

	if(!empty(text)){
	
	var res = sync_request('POST',serverUrl,{
		qs: { text: text }
	});
	
	var output = JSON.parse(res.getBody('utf8'));
	console.log("output is--> ",output);
	return output;
	
	/*
	request({
				url: 'https://fbchatserver.mybluemix.net/api/message',
				qs: {text: text},
				method: 'POST'
			}, function (error, response, body) {
			//console.log("body is--> ",body);
			  return(body.toString());
			});
			*/

	}
}

function empty(data){

  if(typeof(data) == 'number' || typeof(data) == 'boolean')
  { 
    return false; 
  }
  if(typeof(data) == 'undefined' || data === null)
  {
    return true; 
  }
  if(typeof(data.length) != 'undefined')
  {
    return data.length == 0;
  }
  var count = 0;
  for(var i in data)
  {
    if(data.hasOwnProperty(i))
    {
      count ++;
    }
  }
  return count == 0;
}