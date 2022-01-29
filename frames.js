function g(id) {
	return document.getElementById(id);
}

// https://xkcd.com/count-wimRikmef/state


let frameCountLoaded = 0;

let frames = framesFull.map(x=>x.substring(0,64));
let frameInfos = framesFull.map(x=>x.substring(65));
let frameImages = [];
frameImages.length = frames.length;

let frameW = 320;
let frameH = 200;

for (let i = 0; i < frames.length; ++i) {
	let hash = frames[i];
	let img = new Image(); //document.createElement("img");
	let j = i;
	img.onload = function() {
		++frameCountLoaded;
		g("frame-progress").innerHTML =
			frameCountLoaded + "/" + frames.length;
	};
	img.src = `https://xkcd.com/count-wimRikmef/imgs/${hash}.png`;
	img.setAttribute("alt", i + 1);
	img.setAttribute("title", i + 1 + " " + hash.substring(0,3) + " " + frameInfos[i]);
	frameImages[j] = img;
}
for (let i = frames.length - 1; i >= 0; --i) {
	document.getElementById("frames").appendChild(frameImages[i]);
}

document.getElementById("compare-0").value = frames.length - 1;
document.getElementById("compare-1").value = frames.length;

document.getElementById("dateend").innerHTML = new Date("31 Jan 2022 15:00:00 UTC").toLocaleString();

/*
function updateTime() {
	let nowd = new Date();
	let nowm = (nowd.getUTCHours() * 60 + nowd.getUTCMinutes()) % 240; // 240 = 60 * 4
	let untilm = 240 - nowm;
	let thend = new Date(nowd.getTime() + untilm * 60000);
	thend.setSeconds(0);
	document.getElementById("minsuntil").innerHTML = untilm;
	document.getElementById("datenext").innerHTML = thend.toLocaleString();
}
updateTime();
setInterval(updateTime, 60000);*/
