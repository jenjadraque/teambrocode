// Set constraints for the video stream
var view1  = "user";
var view2 = "environment";

/*var constraints = {
    video: { facingMode: view1 }, 
    audio: false 
}; */

//toggle camera views
var constraints ={
        video:{facingMode: view1},
        audio: false
    } 

// Define constants
const cameraView = document.querySelector("#camera--view"),
    cameraOutput = document.querySelector("#camera--output"),
    cameraSensor = document.querySelector("#camera--sensor"),
    cameraTrigger = document.querySelector("#camera--trigger"),
    rearcameraTrigger = document.querySelector("#rearcamera--trigger")


rearcameraTrigger.onclick= function(){
    //console.log(constraints);
    constraints = {
            video:{
                facingMode: view2
            },
            audio: false
        }
        return constraints;
        
};
// Access the device camera and stream to cameraView
function cameraStart() {
    console.log(constraints);
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


// Take a picture when cameraTrigger is tapped
cameraTrigger.onclick = function() {
    cameraSensor.width = cameraView.videoWidth;
    cameraSensor.height = cameraView.videoHeight;
    cameraSensor.getContext("2d").drawImage(cameraView, 0, 0);
    cameraOutput.src = cameraSensor.toDataURL("image/webp");
    cameraOutput.classList.add("taken");
};

// Start the video stream when the window loads
window.addEventListener("load", cameraStart, false);
