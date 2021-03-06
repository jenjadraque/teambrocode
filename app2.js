// Define constants
const cameraView = document.querySelector("#camera--view"),
    cameraOutput = document.querySelector("#camera--output"),
    cameraSensor = document.querySelector("#camera--sensor"),
    cameraTrigger = document.querySelector("#camera--trigger"),
    rearcameraTrigger = document.querySelector("#rearcamera--trigger")

//Identify 2 views, Front Camera shooting and Rear Camera Shooting
var constraints = {
	video:{
		facingMode: "environment"
	},
	audio: false
}
var rearconstraints = {
	video:{
		facingMode: "user"
	},
	audio: false
}

// Access the device camera and stream to cameraView (frontview)
function cameraStart() {
    navigator.mediaDevices
        .getUserMedia(constraints)
        .then(function(stream) {
        track = stream.getTracks()[0];
        cameraView.srcObject = stream;
    })
    .catch(function(error) {
        console.error("Oops. Something is broken.", error);
    });
}

//rearcamera
function rearcameraStart(){
	navigator.mediaDevices
	.getUserMedia(rearconstraints)
	.then(function(stream){
		track = stream.getTracks()[0];
		cameraView.srcObject = stream;
		alert("success");
	})
	.catch(function(error){
		console.error("Error. Rear Camera not found.", error);
	});
}

cameraTrigger.onclick = function() {
    cameraSensor.width = cameraView.videoWidth;
    cameraSensor.height = cameraView.videoHeight;
    cameraSensor.getContext("2d").drawImage(cameraView, 0, 0);
    cameraOutput.src = cameraSensor.toDataURL("image/webp");
    cameraOutput.classList.add("taken");
};

rearcameraTrigger.onclick= function(){
	rearcameraStart();
};
// Start the video stream when the window loads
window.addEventListener("load", cameraStart, rearcameraStart, false);
