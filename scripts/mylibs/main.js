/* 
 * (c) 2013, OKFN. All rights reserved.
 * Author: @nicoverbruggen
 * Placeholder Javascript file
 */


/* Do things on DOM load */

$(function(){
	getSomeData();
});

/**
 * getSomeData() will try and fetch data from the repo
 * @returns {undefined}
 */
function getSomeData(){
	$.ajax({
        type: "GET",
        dataType: "json",
        contentType: "application/json",
        cache: false,
        url: "https://api.github.com/repos/oSoc13/oSoctocat/stats/code_frequency",
        beforeSend: function(xhr) {
        },
        success: function(data){
			var phptimestamp = data[0][0];
			var date = new Date(phptimestamp*1000);
			$("body").append("<p>Timestamp of date: " + date + "</p>");
			$("body").append("<p>Additions: " + data[0][1] + "</p>");
			$("body").append("<p>Deletions: " + data[0][2] + "</p>");
		}
		});
}