//these 5 are varibles
song="";
leftwristX=0;
leftwristy=0;
rightwristX=0;
rightwristY=0;

function preload(){
    song= loadSound("music.mp3");
}

function setup(){
    //in these two we have create canvas and we have set the position of the canvas
    canvas=createCanvas(550,450);
    canvas.position(500,150)
    //in these two we have add webcam to our website and we have set the size of the webcam
    video=createCapture(VIDEO);
    video.hide();

     // loading poseNet
     poseNet=ml5.poseNet(video,modelLoaded);
     //running poseNet
     poseNet.on('pose',gotPoses)
}
function modelLoaded(){
    console.log("model loaded");
}
//in this function we have set the webcam in our website
function draw(){
    image(video,0,0,550,450);

    fill("#34ebe5");
    stroke("#34ebe5");

    if (scoreLeftWrist > 0.2) {
       circle(leftwristX,leftwristY,20);
       inNumberLeftWrist=Number(leftWristY);
       remove_decimals=floor(inNumberLeftWrist);
       volume=remove_decimals/450; 
       document.getElementById("volume").innerHTML="volume  "+volume;
       song.setVolume(volume);
    }
}
//in this function we have play the song,volume and it's speed
function play_song(){
 song.play();
 song.volume(1);
 song.rate(1)
}

function gotPoses(results){
    if (results.length > 0) {

        console.log(results);

        scoreLeftWrist=results[0].pose.keypoints[9].score;
        console.log(scoreLeftWrist);
        //in these two varibles we are holding the position of leftwrist
        leftwristX=results[0].pose.leftWrist.x;
        leftwristY=results[0].pose.leftWrist.y;
        console.log("leftwristX=",leftwristX,"leftwristY=",leftwristY);

        //in these two varibles we are holding the position of rightwrist
        rightwristX=results[0].pose.rightWrist.x;
        rightwristY=results[0].pose.rightWrist.y;
        console.log("rightwristX=",rightwristX,"rightwristY=",rightwristY);
    }
}