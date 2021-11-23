const body = $("body");
const content = $("#content");

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

	for (id of data) {
		const idURL = `${HNBaseUrl}/item/${id}.json?print=pretty`;
		const idData = await makeHttpRequest(idURL);

		const newDiv = $(`
        <div id="${id}">
            <a href="${idData.url}">
                ${idData.title}
            </a>
            <div id="idInfo"> 
            Score: ${idData.score}  | 
            Comments: ${idData.descendants} | 
            Author: ${idData.by} 
            </div>
        </div>`);

		content.append(newDiv);
	}
}

getHNTopStoriesData();
