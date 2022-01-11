
function compare_im(ima, imb, canvas) {
	canvas.width = ima.naturalWidth;
	canvas.height = ima.naturalHeight;
	let ctx = canvas.getContext("2d");
	ctx.drawImage(ima, 0, 0);
	ctx.globalCompositeOperation = "difference";
	ctx.drawImage(imb, 0, 0);
	console.log(canvas, ctx);
}

function compare_id(ida, idb, outimg) {
	let l = 0;
	let ima = new Image();
	let imb = new Image();
	ima.onload = imb.onload = function() {
		++l;
		console.log("hi");
		if (l == 2) {
			compare_im(ima, imb, outimg);
		}
	};
	ima.src = `https://xkcd.com/count-wimRikmef/imgs/${frames[ida-1]}.png`;
	imb.src = `https://xkcd.com/count-wimRikmef/imgs/${frames[idb-1]}.png`;
}

document.getElementById("compare-sub").addEventListener("click", function() {
	compare_id(
		document.getElementById("compare-0").value,
		document.getElementById("compare-1").value,
		document.getElementById("compare-out"));
}, false);
