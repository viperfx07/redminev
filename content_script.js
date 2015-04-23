chrome.runtime.onMessage.addListener(
function(request, sender, callback) {
	var response = {};
    if (request.command == "copytitle") {
    	response.type = "copy";
    	response.text = $('.contextual + h2').text() + ' - ' + $('.subject h3').text();
        callback(response);
    } else if(request.command == "gotoissue"){
    	response.type = "goto";
    	response.issueNumber = prompt('Enter issue number:');
    	if(typeof response.issueNumber !== 'undefined' && response.issueNumber.length>0)
        	callback(response);
    }
});