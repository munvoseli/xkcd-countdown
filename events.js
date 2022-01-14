let divFrames = document.getElementById("frames");
let divCompare = document.getElementById("div-compare");
let divAnim = document.getElementById("div-anim");

let sections = [
	g("frames"), "flex",
	g("div-compare"), "block",
	g("div-anim"), "block"
];
let enabledSection = 0;

function enableSection(n) {
	sections[enabledSection].style.display = "none";
	sections[n * 2].style.display = sections[n * 2 + 1];
	enabledSection = n * 2;
}

document.getElementById("view-tile").addEventListener("click", function() {
	enableSection(0);
}, false);
document.getElementById("view-compare").addEventListener("click", function() {
	enableSection(1);
}, false);
document.getElementById("view-anim").addEventListener("click", function() {
	enableSection(2);
}, false);
