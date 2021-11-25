const body = $("body");
const content = $("#content");
const displayCommentsBtn = document.querySelector("#displayCommentsBtn");

const HNBaseUrl = "https://hacker-news.firebaseio.com/v0/";

const HNMaxItem =
	"https://hacker-news.firebaseio.com/v0/maxitem.json?print=pretty";

const HNTopStories =
	"https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty";

const HNUpdates =
	"https://hacker-news.firebaseio.com/v0/updates.json?print=pretty";

//! ==============================================================

async function makeHttpRequest(url) {
	const httpResponse = await fetch(url);
	const data = await httpResponse.json();

	return data;
}

async function getHNTopStoriesData() {
	const data = await makeHttpRequest(HNTopStories);
	console.log("start");

	for (let i = 0; i < 100; i++) {
		const dataItem = data[i];
		const idURL = `${HNBaseUrl}/item/${data[i]}.json?print=pretty`;
		const idData = await makeHttpRequest(idURL);

		const newDiv = $(`
        <div id="${dataItem}" class="topStories">
            <a href="${idData.url}">
                ${idData.title}
            </a>
            <div id="idInfo"> 
            	<div> Score: ${idData.score}  | </div>
        		<div> Comments: ${idData.descendants} | </div>
				<div> Author: ${idData.by} </div>  
            </div>
			<button id="displayCommentsBtn" type="button" class="btn btn-secondary">Display Comments</button>
        </div>`);

		content.append(newDiv);
	}
	console.log("finished");
}

getHNTopStoriesData();
// displayCommentsBtn.addEventListener("click", function () {
// 	console.log("Working");
// 	// alert("It works!");
// });
