// https://xkcd.com/count-wimRikmef/state

let frames = `\
ac84f99b9c41eb75e1a595ea74c7bccf48f36c345d8b88ad5dd478d4520bc0b2
6a73d565838a58e4d3069ad6cc49cc1a1466a8e602c95fd752126900d2074e28
98b1c93977c76fd31529ff07f8f6f83209ba69ccc5a6b245e3a1061d36093370
154e4cdc63e9b5c6874e0f8cc2146a945c6b53089854fe4827ed6a822fbf8f53 01-11 04:25`.split("\n").map(x=>x.substring(0,64));

for (let i = 0; i < frames.length; ++i) {
	let hash = frames[i];
	let img = document.createElement("img");
	img.src = `https://xkcd.com/count-wimRikmef/imgs/${hash}.png`;
	img.setAttribute("alt", i + 1);
	img.setAttribute("title", i + 1);
	document.getElementById("frames").appendChild(img);
}

