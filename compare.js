
function compare_im(ima, imb, canvas) {
	// must do this with globalCompositeOperation bc cors
	let can1 = document.createElement("canvas");
	let ctx1 = can1.getContext("2d");
	can1.width = ima.naturalWidth;
	can1.height = ima.naturalHeight;
	ctx1.drawImage(ima, 0, 0);
	ctx1.globalCompositeOperation = "multiply";
	ctx1.fillStyle = "#ff7f00";
	ctx1.fillRect(0, 0, can1.width, can1.height);

	let can2 = document.createElement("canvas");
	let ctx2 = can2.getContext("2d");
	can2.width = imb.naturalWidth;
	can2.height = imb.naturalHeight;
	ctx2.drawImage(imb, 0, 0);
	ctx2.globalCompositeOperation = "multiply";
	ctx2.fillStyle = "#0080ff";
	ctx2.fillRect(0, 0, can2.width, can2.height);

	canvas.width = ima.naturalWidth;
	canvas.height = ima.naturalHeight;
	let ctx = canvas.getContext("2d");
	ctx.globalCompositeOperation = "lighter";
	ctx.drawImage(can1, 0, 0);
	ctx.drawImage(can2, 0, 0);
//	ctx.drawImage(ima, 0, 0);
//	ctx.globalCompositeOperation = "difference";
//	ctx.drawImage(imb, 0, 0);
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
