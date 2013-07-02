/* 
 * (c) 2013, OKFN. All rights reserved.
 * Author: @nicoverbruggen
 * Allows getting contribution data
 */

/* Do things on DOM load */

$(function(){
	getContributions("oSoc13","oSoctocat");
});

/**
 * Get contributions for a certain repo, owned by a certain user.
 * @param {string} owner
 * @param {string} repo
 * @returns void
 */

function getContributions(owner, repo){
	var url = "https://api.github.com/repos/:owner/:repo/stats/contributors";
	url = url.replace(":owner", owner);
	url = url.replace(":repo", repo);
	$.ajax({
        type: "GET",
        dataType: "json",
        contentType: "application/json",
        cache: false,
        url: url,
        beforeSend: function(xhr) {
        },
        success: function(data){
			// Parse data
		}
	});
}