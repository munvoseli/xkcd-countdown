function playAnimation(canvas) {
	canvas.width = frameW;
	canvas.height = frameH;
	let ctx = canvas.getContext("2d");
	let i = 0;
	let j = setInterval(function() {
		ctx.drawImage(frameImages[i], 0, 0);
		++i;
		if (i >= frames.length)
			clearInterval(j);
	}, 100);
}

document.getElementById("btn-anim").addEventListener("click", function() {
	let canvas = document.getElementById("can-anim");
	playAnimation(canvas);
}, false);
