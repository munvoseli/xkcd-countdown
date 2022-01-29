let divFrames = document.getElementById("frames");
let divCompare = document.getElementById("div-compare");
let divAnim = document.getElementById("div-anim");

let sections = [
	g("frames"), "flex",
	g("div-compare"), "block",
	g("div-anim"), "block",
	g("div-uwu"), "block"
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
document.getElementById("view-uwu").addEventListener("click", function() {
	enableSection(3);
	document.body.classList.add("uwu");
	let apitag = document.createElement("script");
	apitag.src = "https://www.youtube.com/iframe_api";
	document.head.appendChild(apitag);
}, false);

let ytplayer;

function onYouTubeIframeAPIReady() {
	ytplayer = new YT.Player('player', {
		height: '390',
		width: '640',
		videoId: 'CNPdO5TZ1DQ',
		playerVars: {
			'playsinline': 1
		},
		events: {
			'onReady': ytPlayerReady
		}
	});
}

function ytPlayerReady(e) {
	e.target.playVideo();
	// get user to turn sound up
	ytplayer.setVolume(30);
	// crank volume up for lyrics
	setTimeout(function() {
		ytplayer.setVolume(100);
	}, 31000);
	// give it time for the lyrics to start
	// before user has the power to stop it
	setTimeout(function() {
		document.getElementById("player").style.display = "block";
	}, 35000);
	let beemovie = `According to all known laws of aviation, there is no way that a bee should be able to fly. Its wings are too small to get its fat little body off the ground. The bee, of course, flies anyway. Because bees don’t care what humans think is impossible.” SEQ. 75 - “INTRO TO BARRY” INT. BENSON HOUSE - DAY ANGLE ON: Sneakers on the ground. Camera PANS UP to reveal BARRY BENSON’S BEDROOM ANGLE ON: Barry’s hand flipping through different sweaters in his closet. BARRY Yellow black, yellow black, yellow black, yellow black, yellow black, yellow black...oohh, black and yellow... ANGLE ON: Barry wearing the sweater he picked, looking in the mirror. BARRY (CONT’D) Yeah, let’s shake it up a little. He picks the black and yellow one. He then goes to the sink, takes the top off a CONTAINER OF HONEY, and puts some honey into his hair. He squirts some in his mouth and gargles. Then he takes the lid off the bottle, and rolls some on like deodorant. CUT TO: INT. BENSON HOUSE KITCHEN - CONTINUOUS Barry’s mother, JANET BENSON, yells up at Barry. JANET BENSON Barry, breakfast is ready! CUT TO: "Bee Movie" - JS REVISIONS 8/13/07 1. INT. BARRY’S ROOM - CONTINUOUS BARRY Coming! SFX: Phone RINGING. Barry’s antennae vibrate as they RING like a phone. Barry’s hands are wet. He looks around for a towel. BARRY (CONT’D) Hang on a second! He wipes his hands on his sweater, and pulls his antennae down to his ear and mouth. BARRY (CONT'D) Hello? His best friend, ADAM FLAYMAN, is on the other end. ADAM Barry? BARRY Adam? ADAM Can you believe this is happening? BARRY Can’t believe it. I’ll pick you up. Barry sticks his stinger in a sharpener. SFX: BUZZING AS HIS STINGER IS SHARPENED. He tests the sharpness with his finger. SFX: Bing. BARRY (CONT’D) Looking sharp. ANGLE ON: Barry hovering down the hall, sliding down the staircase bannister. Barry’s mother, JANET BENSON, is in the kitchen. JANET BENSON Barry, why don’t you use the stairs? Your father paid good money for those. "Bee Movie" - JS REVISIONS 8/13/07 2. BARRY Sorry, I’m excited. Barry’s father, MARTIN BENSON, ENTERS. He’s reading a NEWSPAPER with the HEADLINE, “Queen gives birth to thousandtuplets: Resting Comfortably.” MARTIN BENSON Here’s the graduate. We’re very proud of you, Son. And a perfect report card, all B’s. JANET BENSON (mushing Barry’s hair) Very proud. BARRY Ma! I’ve got a thing going here. Barry re-adjusts his hair, starts to leave. JANET BENSON You’ve got some lint on your fuzz. She picks it off. BARRY Ow, that’s me! MARTIN BENSON Wave to us. We’ll be in row 118,000. Barry zips off. BARRY Bye! JANET BENSON Barry, I told you, stop flying in the house! CUT TO: SEQ. 750 - DRIVING TO GRADUATION EXT. BEE SUBURB - MORNING A GARAGE DOOR OPENS. Barry drives out in his CAR. "Bee Movie" - JS REVISION`;
	// diversion away from antonymph
	let bee = 0;
	setInterval(function() {
		if (beemovie[bee] == '\n')
			g("bee").innerHTML += "<br>";
		else
			g("bee").innerHTML += beemovie[bee];
		++bee;
	}, 100);
	setTimeout(function() {
		g("bee").innerHTML += "<br>DOWNLOAD MULTIPLAYER EMACS FOR ONLY 99 KROMER<br>";
	}, 10000);
	setTimeout(function() {
		g("bee").innerHTML += "<br>GEORGE IS IMMORTAL<br>";
	}, 20000);
}
