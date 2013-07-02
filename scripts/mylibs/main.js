/* 
 * (c) 2013, OKFN. All rights reserved.
 * Author: @nicoverbruggen
 * Allows getting contribution data
 */

/* Do things on DOM load */

var projects = new Array("TheWookies", "BarberShop", "oSoctocat", "FoursquareBot", "gentsefeesten");

$(function(){
	$.each(projects, function(i, val){
		getContributions("oSoc13",val);
	});
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
			vizData(data, repo);
		}
	});
}

/**
 * Displays details for certain project. All contributors are visualized.
 * @param {json} data (received from e.g. getContributions)
 * @param {string} projectname
 * @returns void
 */
function vizData(data, projectname){
	// TODO: CHECK IF DATA IS EMPTY!
	var projectDetails = "<h1>" + projectname + "</h1>";
	$.each(data, function(i, val){
		var totalCommits = data[i].total;
		var authorName = data[i].author.login;
		// Set up user details
		projectDetails += "<h2>" + authorName + "</h2><img class='avatar' src=' " + data[i].author.avatar_url + "'/><ul><li>Total commits: " + totalCommits + "</li>";
		// Get week details
		var weekDetails = "";
		// Run through all weeks
		$.each(data[i].weeks, function (wi, val){
			weekDetails += "<li>Commits for week of "
					+ timestampToDate(data[i].weeks[wi].w) + "</li><ul>" 
					+ "<li>Additions: " + data[i].weeks[wi].a + "</li>" 
					+ "<li>Deletions: " + data[i].weeks[wi].d + "</li>" 
					+ "<li>Number of commits: " + data[i].weeks[wi].c + "</li></ul>";
		});
		// Add all week data to user details
		projectDetails += weekDetails;
		// Close user details ul
		projectDetails += "</ul>";
		// Append to body
		$("body").append(projectDetails);
	});
}

/**
 * Converts a unix Timestamp to a Date object and returns a string like "Mon June 1 2013"
 * @param {type} timestamp
 * @returns {String}
 */
function timestampToDate(timestamp){
	var date = new Date(timestamp*1000);
	var d_arr = date.toString().split(" ");
	var originaldate = d_arr[0] + " " + d_arr[1] + " " + d_arr[2] + " " + d_arr[3];
	return originaldate;
	
}