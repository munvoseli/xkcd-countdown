let divFrames = document.getElementById("frames");
let divCompare = document.getElementById("div-compare");
let divAnim = document.getElementById("div-anim");

document.getElementById("view-tile").addEventListener("click", function() {
	divFrames.style.display = "flex";
	divCompare.style.display = "none";
	divAnim.style.display = "none";
}, false);
document.getElementById("view-compare").addEventListener("click", function() {
	divFrames.style.display = "none";
	divCompare.style.display = "block";
	divAnim.style.display = "none";
}, false);
document.getElementById("view-anim").addEventListener("click", function() {
	divFrames.style.display = "none";
	divCompare.style.display = "none";
	divAnim.style.display = "block";
}, false);
