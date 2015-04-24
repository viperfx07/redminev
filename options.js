function save_options() {
    chrome.storage.sync.set({
        redmineUrl: $("#redmineUrl").val()
    });
}

function restore_items(items){
	$("#redmineUrl").val(items.redmineUrl);
}

function restore_options() {
    chrome.storage.sync.get({
        redmineUrl: "https://projects.readingroom.com"
    }, restore_items);
}

$(function(){
	//load the options when the page is loaded
	restore_options();

	$("#redmineUrl").change(function() {
	    save_options();
	});
});