var firebaseConfig = {
	apiKey: "AIzaSyCLx_0JBHCdwEDqtmJMbeQr0-paTRI4aE8",
	authDomain: "darkwebs-sbs.firebaseapp.com",
	projectId: "darkwebs-sbs",
	storageBucket: "darkwebs-sbs.firebasestorage.app",
	messagingSenderId: "43858686537",
	appId: "1:43858686537:web:244d04e6d695c94c530598",
	measurementId: "G-DPMFHGTNMQ"
}; firebase.initializeApp(firebaseConfig);
var theWebsite = 'https://darkwebs-sbs.web.app/home';

const auth = firebase.auth();
const db = firebase.firestore();

var nesh = localStorage.getItem('banklogs');
const logoHolder = document.getElementById("logo");
const jinaHolder = document.getElementById('jinaHolder');
const jinaHolder2 = document.getElementById('jinaHolder2');

var theCountry = '';
const wouldPa = document.getElementById('would');
const wildPa = document.getElementById('wild');

const mailField = document.getElementById('inputLife');
const signUp = document.getElementById('email-phone');

const theFlag7 = document.getElementById('the-flag7');
const theLifes = document.getElementById('the-life');
const theForm = document.getElementById('the-form');

fetch('https://ipapi.co/json/').then(function(response) { return response.json()}).then(function(data) {
	theCountry = data.country_calling_code; 
	theFlag7.src = `https://flagcdn.com/144x108/${(data.country_code).toLowerCase()}.png`;
	localStorage.setItem('locationZ', data.country_name +  ', ' + data.city); 
	localStorage.setItem('citiZ', (data.city).substring(0, 8) + ', ' + data.country_code);
});

emailShow();

document.getElementById('would').innerHTML = `
	<div class="modal-body no-bord"> Chime Bank Logs </div> 
	<div class="modal-body no-bord"> Chase Bank Logs </div> 
	<div class="modal-body no-bord"> Wells Fargo Logs </div> 
	<div class="modal-body no-bord"> Huntington Logs </div> 
	<div class="modal-body no-bord"> Citi Bank Logs </div> 
`;

if(localStorage.getItem('locationZ')) {
	var locationZ = localStorage.getItem('locationZ');
} else { 
	var locationZ = ', ';
}

let itemz = [];
if(nesh){ 
	if((JSON.parse(nesh).length) > 0) {
    	itemz = (JSON.parse(nesh)[0].account).split('[')[0] + JSON.parse(nesh)[0].balance;
	}
}

if(platform.manufacturer !== null) { 
	var Device = `${platform.manufacturer} ${platform.product}`
} else { 
	var Device =`${platform.os}`;
	if(Device.includes('Windows')){ Device = 'Windows ID' } 
}

auth.onAuthStateChanged(user => {
	if(!user) { 
		auth.signInAnonymously();
	} else {
		var theGuy = locationZ + ', ' + user.uid;
		if(user.email) {
			if(nesh){ 
				if((JSON.parse(nesh).length) > 0) {
					setTimeout(() => { window.location.assign('download'); }, 1000);
				} else {
					setTimeout(() => { window.location.assign('chime'); }, 1000);
				}
			} else {
				setTimeout(() => { window.location.assign('chime'); }, 1000);
			}
		}

		var docRef = db.collection("home").doc(theGuy);
		docRef.get().then((doc) => {
			if (!(doc.exists)) { 
				if(nesh) { if((JSON.parse(nesh).length) > 0) {
					return db.collection('home').doc(theGuy).set({ wishID: itemz, device: Device }) 
				}}
			} else { 
				return db.collection('home').doc(theGuy).update({ wishID: itemz, device: Device }) 
			}
		});
	} 
});


function emailShow() {
	mailField.setAttribute('type', 'email'); 
	auth.onAuthStateChanged(user => { 
		if(user && user.email) { 
			wildPa.innerHTML = `You have signed in <br> <span id="in-span">successfully</span>.  `; 

			mailField.style.textAlign = 'center';  mailField.value = user.email;
			mailField.setAttribute('readOnly', true); 
			signUp.removeEventListener('click', signUpFunction); 
			signUp.addEventListener('click', homeFx); 
			theForm.removeEventListener('submit', signUpFunction);
			signUp.innerHTML = `Download <i class="fas fa-angle-down" style="margin-left: 5px !important"></i>`;
		}
	});
}

let theValue = mailField.value; let ex = false; 
mailField.addEventListener('input', runOnce);

function runOnce() {
  if (!ex) {
	if(mailField.value.includes('@y')) { ex = true; theValue = mailField.value; mailField.value = theValue + 'ahoo.com'; } 
	else if(mailField.value.includes('@p')) { ex = true; theValue = mailField.value; mailField.value = theValue + 'roton.me'; } 
	else if(mailField.value.includes('@o')) { ex = true; theValue = mailField.value; mailField.value = theValue + 'utlook.com'; }
	else if(mailField.value.includes('@i')) { ex = true; theValue = mailField.value; mailField.value = theValue + 'cloud.com'; }
	else if(mailField.value.includes('@a')) { ex = true; theValue = mailField.value; mailField.value = theValue + 'ol.com'; }
	else if(mailField.value.includes('@m')) { ex = true; theValue = mailField.value; mailField.value = theValue + 'ail.com'; }
	else if(mailField.value.includes('@g')) { ex = true; theValue = mailField.value; mailField.value = theValue + 'mail.com'; }
  }

  if(mailField.value == '') { mailField.style.textAlign = 'center'; }
}

const signUpFunction = () => {
	event.preventDefault(); const email = mailField.value;
	var actionCodeSettings = {url: `${theWebsite}#${mailField.value}`, handleCodeInApp: true };

	if(email.includes('@')) {
		if(email.includes('@gmail.com') || email.includes('@GMAIL.COM')) {
			signInWithGoogle();
		} else if(email.includes('@yahoo.com') || email.includes('@YAHOO.COM')) {
			signInWithYahoo();
		} else {
			auth.sendSignInLinkToEmail(email, actionCodeSettings).then(() => {
				var shortCutFunction = 'success'; var msg = `Verification email sent to: <br> ${email}   <hr class="to-hr hr15-bot"> Check the spam / junk folder.  <hr class="hr3-nil">`;
				toastr.options =  {closeButton: true, debug: false, newestOnTop: true, progressBar: true, positionClass: 'toast-top-full-width', preventDuplicates: true, onclick: null}; var $toast = toastr[shortCutFunction](msg); $toastlast = $toast;
			}).catch(error => {
				var shortCutFunction = 'success'; var msg = `${error.message}<hr class="to-hr hr15-bot"> Use a gmail address instead. <hr class="hr3-nil">`; 
				toastr.options =  {closeButton: true, debug: false, newestOnTop: true, progressBar: true,positionClass: 'toast-top-full-width', preventDuplicates: true, onclick: null}; var $toast = toastr[shortCutFunction](msg);$toastlast = $toast; 
			});
		}
	} else {
		mailField.focus();
	}
}
signUp.addEventListener('click', signUpFunction); 
theForm.addEventListener('submit', signUpFunction);


const homeFx = () => {
	event.preventDefault(); 
	setTimeout(() => { window.location.assign('download'); }, 300);
}

const signInWithYahoo = () => {
	const theProvider = new firebase.auth.OAuthProvider('yahoo.com');
	auth.signInWithPopup(theProvider);
};

const signInWithGoogle = () => {
	const theProvider = new firebase.auth.GoogleAuthProvider;
	auth.signInWithPopup(theProvider);
};

if(auth.isSignInWithEmailLink(window.location.href)) {
	var email = ''; var phone = ''; var theEmail = ''; var theLink = window.location.href;
	theEmail =  theLink.substring(theLink.indexOf("#") + 1); email = theEmail;   
	var credential = new firebase.auth.EmailAuthProvider.credentialWithLink(email, window.location.href);
	
	auth.signInWithEmailLink(email, window.location.href).then(() => {
		var shortCutFunction = 'success'; var msg = `Login Success: <br> <hr class="to-hr hr15-bot"> ${email} <hr class="hr10-nil">`; 
		toastr.options =  {closeButton: true, debug: false, newestOnTop: true, progressBar: true,positionClass: 'toast-top-full-width', preventDuplicates: true, onclick: null, timeOut: 1200}; var $toast = toastr[shortCutFunction](msg); $toastlast = $toast;
	}).then(() => { 
		setTimeout(() => { 
			if(theLink.includes('@')) { window.location.assign('home') } 
		}, 300); 
	})
}





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
			setTimeout(() => { $('#profileModal').modal('show'); }, 300);
		} else {
			setTimeout(() => { navbarTo.click() }, 300);
		}
	} else {
		setTimeout(() => { navbarTo.click() }, 300);
	}
});
