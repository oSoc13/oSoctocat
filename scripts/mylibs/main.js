/* 
 * (c) 2013, OKFN. All rights reserved.
 * Author: @nicoverbruggen
 * Allows getting contribution data
 */

/* List of all projects */

var projects = new Array("TheWookies", "BarberShop", "oSoctocat", "FoursquareBot", "gentsefeesten");

/* Do things on DOM load */

$(function(){
	/* For each project, get contributions + visualize! */
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
	// TODO: Replace this call to their API with our own API "app" call
	// Determine correct URL for API
	var url = "https://api.github.com/repos/:owner/:repo/stats/contributors";
	url = url.replace(":owner", owner);
	url = url.replace(":repo", repo);
	// Perform GET request to API and visualize
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
		},
		error: function(jqXHR, textStatus, errorThrown){
			// If something goes wrong, this is what we see
			$("body").append("<p>Request to: " + url + " failed. Error: " + 
					 errorThrown + ". API limit reached?</p>");
		}
	});
}

/**
 * Displays details for certain project. All contributors are visualized.
 * @param {json} data (received from e.g. getContributions)
 * @param {string} projectname (on GitHub)
 * @returns void
 */
function vizData(data, projectname){
	// TODO: CHECK IF DATA IS EMPTY!
	var projectDetails = "<h1>" + projectname + "</h1>";
	$.each(data, function(i, val){
		var totalCommits = data[i].total;
		var authorName = data[i].author.login;
		// Set up user details
		var userDetails = "";
		userDetails += "<h2>" + authorName + "</h2><img class='avatar' src=' " + data[i].author.avatar_url + "'/><ul><li>Total commits: " + totalCommits + "</li>";
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
		userDetails += weekDetails;
		// Close user details ul
		userDetails += "</ul>";
		projectDetails += userDetails;
	});
	$("body").append(projectDetails);
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