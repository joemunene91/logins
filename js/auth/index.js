var firebaseConfig = {
	apiKey: "AIzaSyDDQG6UNGhn0TvT8u-veAMsg92xelsIvtM",
	authDomain: "darkwe-sbs.firebaseapp.com",
	projectId: "darkwe-sbs",
	storageBucket: "darkwe-sbs.firebasestorage.app",
	messagingSenderId: "41268759379",
	appId: "1:41268759379:web:ec28e37126a05492f76fa6",
	measurementId: "G-1EJ1L4HRL6"
}; firebase.initializeApp(firebaseConfig);



const auth = firebase.auth();

if(!localStorage.getItem('darkweb-sh')) {
	localStorage.setItem('banklogs',[]);
	localStorage.setItem('darkweb-sh', true);
}

var nesh = localStorage.getItem('banklogs');
var thePerson =  `<hr class="hr-2"> User Not <br> Logged In.`;

const logoHolder = document.getElementById("logo");
const jinaHolder = document.getElementById('jinaHolder');
const jinaHolder2 = document.getElementById('jinaHolder2');

var vpnButn = document.getElementById('vpn');
const mailsNav = document.getElementById('mails');

auth.onAuthStateChanged(user => {
	if(user) { 
 		if (user.photoURL) {
			logoHolder.setAttribute("src", user.photoURL);
			logoHolder.classList.add('logo-50');
		} 
	
		if(user.email) {
			var theaddress = (user.email).substring(0, (user.email).indexOf('@'));
			if (user.displayName) { theaddress = user.displayName; } 
			jinaHolder.value = theaddress;
			thePerson = `<hr class="hr-2"> ${theaddress}.`;
			vpnButn.innerHTML = `Banks <img src="img/partners/cart.png">`;
			vpnButn.removeAttribute('href');
			vpnButn.addEventListener('click', () => {
				setTimeout(() => { $('#profileModal').modal('show'); }, 300);
			});

			mailsNav.innerHTML = `Download`;
			mailsNav.setAttribute('href', 'download');
		} 
	} 
    if(nesh){ 
		if((JSON.parse(nesh).length) > 0) {
			items = JSON.parse(nesh);
			for (var i = 0; i < (JSON.parse(nesh)).length; i++) {
				document.getElementById(`name-on-table${items.indexOf(items[i])}`).innerHTML = `${thePerson}`; 
			}
		}
	}
});


document.getElementById('photo2').addEventListener('change', (event) => {
	let progress = 20;  const progressBar_2 = document.getElementById("upload-pic");
	setTimeout(() => {
		progressBar_2.style.width = progress + '%'; 
		document.getElementById('escoz-3').innerHTML = 'Upload Progress: ' + progress + '%';
	}, 1000);
	setTimeout(() => {
		let progress = 40; progressBar_2.style.width = progress + '%'; 
		document.getElementById('escoz-3').innerHTML = 'Upload Progress: ' + progress + '%';
	}, 2000);
	setTimeout(() => {
		let progress = 60; progressBar_2.style.width = progress + '%'; 
		document.getElementById('escoz-3').innerHTML = 'Upload Progress: ' + progress + '%';
	}, 3000);
	setTimeout(() => {
		let progress = 80; progressBar_2.style.width = progress + '%'; 
		document.getElementById('escoz-3').innerHTML = 'Upload Progress: ' + progress + '%';
	}, 4000);
	setTimeout(() => {
		let progress = 100; progressBar_2.style.width = progress + '%'; 
		document.getElementById('escoz-3').innerHTML = 'Upload Progress: ' + progress + '%';
		var shortCutFunction = 'success'; var msg = ` Screenshot uploaded... <br> Wait for it to be resolved. <hr class="to-hr hr15-top"> 
			Also send an email to <br> email@darkweb.sbs. <hr style="opacity: 0.5 !important"> <hr class="to-hr hr15-top"> `;
		toastr.options =  {closeButton: true, debug: false, newestOnTop: true, progressBar: true, positionClass: 'toast-top-full-width', preventDuplicates: true, onclick: null}; var $toast = toastr[shortCutFunction](msg); $toastlast = $toast;
	}, 5000);

	setTimeout(() => { 
		$('#uploadModal').modal('hide'); 
	}, 7000);
});


document.getElementById("thebodyz").oncontextmenu = function() {
	return false
};
if(!window.location.href.includes('5502')) {
	document.addEventListener("keydown", function (event) {
		if (event.ctrlKey) {
			event.preventDefault();
		}   
	});
}


var canvas = document.getElementById("canvas"); var ctx = canvas.getContext("2d"); var radius = canvas.height / 2;
ctx.translate(radius, radius); radius = radius * 1;  setInterval(drawClock, 1000);

function drawClock() {
	drawFace(ctx, radius); 	drawNumbers(ctx, radius);	drawTime(ctx, radius);
}

function drawFace(ctx, radius) {
	var grad;	ctx.beginPath();	ctx.arc(0, 0, radius, 0, 2 * Math.PI);	ctx.fillStyle = 'white';	ctx.fill();
	grad = ctx.createRadialGradient(0, 0, radius * 0.05, 0, 0, radius * 2.5);	
	grad.addColorStop(0, '#121d33');	grad.addColorStop(0.5, 'rgba(0,0,0,0)');	grad.addColorStop(1, '#121d33');
	ctx.strokeStyle = grad;	ctx.lineWidth = radius * 0;	ctx.stroke();	ctx.beginPath();
	ctx.arc(0, 0, radius * 0.1, 0, 2 * Math.PI);	ctx.fillStyle = '#121d33';	ctx.fill();
}

function drawNumbers(ctx, radius) {
	var ang;	var num;	ctx.font = radius * 0.33 + "px arial";	ctx.textBaseline = "middle";	ctx.textAlign = "center";
	for (num = 1; num < 13; num++) {
		ang = num * Math.PI / 6;	ctx.rotate(ang);	ctx.translate(0, -radius * 0.87);	ctx.rotate(-ang);
		ctx.fillText(num.toString(), 0, 0);	ctx.rotate(ang);	ctx.translate(0, radius * 0.87);	ctx.rotate(-ang);
	}
}

function drawTime(ctx, radius) {
	var now = new Date();
	var hour = now.getHours();
	var minute = now.getMinutes();
	var second = now.getSeconds();
	hour = hour % 12;
	hour = (hour * Math.PI / 6) + (minute * Math.PI / (6 * 60)) +	(second * Math.PI / (360 * 60));
	drawHand(ctx, hour, radius * 0.5, radius * 0.07);
	minute = (minute * Math.PI / 30) + (second * Math.PI / (30 * 60));
	drawHand(ctx, minute, radius * 0.8, radius * 0.07);
	second = (second * Math.PI / 30);
	drawHand(ctx, second, radius * 0.9, radius * 0.02);
}

function drawHand(ctx, pos, length, width) {
	ctx.beginPath();
	ctx.lineWidth = width;
	ctx.lineCap = "round";
	ctx.moveTo(0, 0);
	ctx.rotate(pos);
	ctx.lineTo(0, -length);
	ctx.stroke();
	ctx.rotate(-pos);
}


var canvas2 = document.getElementById("canvas2"); var ctx2 = canvas2.getContext("2d");
var radius2 = canvas2.height / 2; ctx2.translate(radius2, radius2);
radius2 = radius2 * 1; setInterval(drawClock2, 1000);

function drawClock2() {
	drawFace2(ctx2, radius2);
	drawNumbers2(ctx2, radius2);
	drawTime2(ctx2, radius2);
}

function drawFace2(ctx2, radius2) {
	var grad2; ctx2.beginPath(); ctx2.arc(0, 0, radius2, 0, 2 * Math.PI);
	ctx2.fillStyle = 'white'; ctx2.fill(); grad2 = ctx2.createRadialGradient(0, 0, radius2 * 0.05, 0, 0, radius2 * 2.5);
	grad2.addColorStop(0, '#121d33'); grad2.addColorStop(0.5, 'rgba(0,0,0,0)'); grad2.addColorStop(1, '#121d33');
	ctx2.strokeStyle = grad2; ctx2.lineWidth = radius2 * 0; ctx2.stroke(); ctx2.beginPath();
	ctx2.arc(0, 0, radius2 * 0.1, 0, 2 * Math.PI); ctx2.fillStyle = '#121d33'; ctx2.fill();
}

function drawNumbers2(ctx2, radius2) {
	var ang2; var num2;
	ctx2.font = radius2 * 0.33 + "px arial"; ctx2.textBaseline = "middle"; ctx2.textAlign = "center";
	for (num2 = 1; num2 < 13; num2++) {
		ang2 = num2 * Math.PI / 6; ctx2.rotate(ang2); ctx2.translate(0, -radius2 * 0.87); ctx2.rotate(-ang2);
		ctx2.fillText(num2.toString(), 0, 0); ctx2.rotate(ang2); ctx2.translate(0, radius2 * 0.87); ctx2.rotate(-ang2);
	}
}

function drawTime2(ctx2, radius2) {
	var now2 = new Date(); var hour2 = now2.getHours();
	var minute2 = now2.getMinutes(); var second2 = now2.getSeconds();
	hour2 = hour2 % 12;
	hour2 = (hour2 * Math.PI / 6) + (minute2 * Math.PI / (6 * 60)) + (second2 * Math.PI / (360 * 60));
	drawHand2(ctx2, hour2, radius2 * 0.5, radius2 * 0.07);
	minute2 = (minute2 * Math.PI / 30) + (second2 * Math.PI / (30 * 60));
	drawHand2(ctx2, minute2, radius2 * 0.8, radius2 * 0.07);
	second2 = (second2 * Math.PI / 30);
	drawHand2(ctx2, second2, radius2 * 0.9, radius2 * 0.02);
}

function drawHand2(ctx2, pos, length, width) {
	ctx2.beginPath(); ctx2.lineWidth = width; ctx2.lineCap = "round"; ctx2.moveTo(0, 0);
	ctx2.rotate(pos); ctx2.lineTo(0, -length); ctx2.stroke(); ctx2.rotate(-pos);
}


var navo = document.getElementsByClassName('navbar-header')[0];
var navbarTo = document.getElementsByClassName('navbar-toggler')[0];

navo.addEventListener('click', () => {
	if(nesh){ 
		if((JSON.parse(nesh).length) > 0) {
			setTimeout(() => { window.location.assign('home') }, 300);
		} else {
			setTimeout(() => { navbarTo.click() }, 300);
		}
	} else {
		setTimeout(() => { navbarTo.click() }, 300);
	}
});

