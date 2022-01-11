let divFrames = document.getElementById("frames");
let divCompare = document.getElementById("div-compare");

document.getElementById("view-tile").addEventListener("click", function() {
	divFrames.style.display = "block";
	divCompare.style.display = "none";
}, false);
document.getElementById("view-compare").addEventListener("click", function() {
	divFrames.style.display = "none";
	divCompare.style.display = "block";
}, false);
