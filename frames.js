// https://xkcd.com/count-wimRikmef/state

let framesFull = `\
ac84f99b9c41eb75e1a595ea74c7bccf48f36c345d8b88ad5dd478d4520bc0b2 10?16:00 , 10 17:10
6a73d565838a58e4d3069ad6cc49cc1a1466a8e602c95fd752126900d2074e28 10?20:00 , 10 20:46
98b1c93977c76fd31529ff07f8f6f83209ba69ccc5a6b245e3a1061d36093370 11?00:00
154e4cdc63e9b5c6874e0f8cc2146a945c6b53089854fe4827ed6a822fbf8f53 11 04:25 , 11 07:49
582bbf28305fefb09ea44beae1330585aea155adf6f5125fc70ebdfa6af8c70c 11 08:01:31
5c65f55f9a51a8b5bb7184a7b42e2930aea829e4d5ef2ff6373d1408fee4cce3 11 12:00:08
75f4551c542cadfde5b5708d40679dfb66c1477ed344d061d6ba4e28f46fc0b8 11 15:41:59
32fe6cc4abef25d91abebdbdd59273044061be7d49a9b4a16ce2864628247999 11 19:06:02
72cb154b23f959f908f5dc8eb03069c6df3f0f54aae896a0e7ed27befb2ee639 11 19:30
5a0d51a4f85c24edbd647e18e33044ffe5e49a8474c5f9850dadb742252a5582 11 23:13:14
85cb9234739c590b3c649c80e6d388f8c53f600327abbdbe476dca495705f86c 12 2:54:42
`.split("\n");
framesFull.pop();

let frames = framesFull.map(x=>x.substring(0,64));
let frameInfos = framesFull.map(x=>x.substring(65));

for (let i = 0; i < frames.length; ++i) {
	let hash = frames[i];
	let img = document.createElement("img");
	img.src = `https://xkcd.com/count-wimRikmef/imgs/${hash}.png`;
	img.setAttribute("alt", i + 1);
	img.setAttribute("title", i + 1 + " " + hash.substring(0,3) + " " + frameInfos[i]);
	document.getElementById("frames").appendChild(img);
}

document.getElementById("dateend").innerHTML = new Date("31 Jan 2022 15:00:00 UTC").toLocaleString();


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
setInterval(updateTime, 60000);
