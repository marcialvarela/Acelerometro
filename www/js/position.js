/**
 * Created by mvarela on 15/10/2015.
 */

/* URL de interes: Acelerometro y sensores de movil

 http://www.eldiario.es/hojaderouter/tecnologia/acelerometro-funciones-giroscopio-GPS-interior-magnetometro-sensor-sensor_de_humedad-sensor_de_temperatura-telefono_movil_0_275772515.html

   orientation document:
 http://www.html5rocks.com/en/tutorials/device/orientation/?redirect_from_locale=es


 TUTORIAL POR DIAPOSITIVAS: Brújula, Acelerómetro y Geolocalización con PhoneGap (Básico)

    http://es.slideshare.net/JessFontecha/sensors-compass-accelerometer

 */

/* ****************************************************************************************** */
/*          R E Q U E S T   A N I M A T I O N
 /* ****************************************************************************************** */
window.requestAnimationFrame=(function(){
    return window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        function(callback){window.setTimeout(callback,17);};
})();


/* ****************************************************************************************** */
/*          P O S I C I O N A M I E N T O    -    A C E L E R O M E T R O
 /* ****************************************************************************************** */
var watchID_ACC = null;

Xposition.innerHTML = '0.00';
Yposition.innerHTML = '0.00';
Zposition.innerHTML = '0.00';
Tposition.innerHTML = '0.00';

function verMenu(option){

    try
    {
        if (option==0){
            document.getElementById('divAceletarion').style.visibility='visible';
            document.getElementById('divBrujula').style.visibility='hidden';
            document.getElementById('divMapCanvas').style.visibility='hidden';
            document.getElementById('divMapFixed').style.visibility='hidden';
            document.getElementById('divPoint').style.visibility='hidden';
            document.getElementById('divMapLabel').style.visibility='hidden';
            document.getElementById('triangleCompass').style.visibility='hidden';
        }
        else if (option==1){
            document.getElementById('divAceletarion').style.visibility='hidden';
            document.getElementById('divBrujula').style.visibility='visible';
            document.getElementById('divMapCanvas').style.visibility='hidden';
            document.getElementById('divMapFixed').style.visibility='hidden';
            document.getElementById('divPoint').style.visibility='hidden';
            document.getElementById('divMapLabel').style.visibility='hidden';
            document.getElementById('divPodometer').style.visibility='hidden';
            document.getElementById('triangleCompass').style.visibility='visible';
        }
        else if (option==2){
            document.getElementById('divAceletarion').style.visibility='hidden';
            document.getElementById('divBrujula').style.visibility='hidden';
            document.getElementById('divMapCanvas').style.visibility='visible';
            document.getElementById('divMapFixed').style.visibility='hidden';
            document.getElementById('divPoint').style.visibility='hidden';
            document.getElementById('divMapLabel').style.visibility='visible';
            document.getElementById('divPodometer').style.visibility='hidden';
            document.getElementById('triangleCompass').style.visibility='hidden';
            initCanvas();
        }
        else if (option==3){
            document.getElementById('divAceletarion').style.visibility='hidden';
            document.getElementById('divBrujula').style.visibility='hidden';
            document.getElementById('divMapCanvas').style.visibility='visible';
            document.getElementById('divMapFixed').style.visibility='hidden';
            document.getElementById('divPoint').style.visibility='visible';
            document.getElementById('divMapLabel').style.visibility='hidden';
            document.getElementById('divPodometer').style.visibility='visible';
            document.getElementById('triangleCompass').style.visibility='hidden';
            initCanvas();
        }
        else{
            document.getElementById('divAceletarion').style.visibility='hidden';
            document.getElementById('divBrujula').style.visibility='hidden';
            document.getElementById('divMapCanvas').style.visibility='hidden';
            document.getElementById('divMapFixed').style.visibility='hidden';
            document.getElementById('divPoint').style.visibility='hidden';
            document.getElementById('divMapLabel').style.visibility='hidden';
            document.getElementById('divPodometer').style.visibility='hidden';
            document.getElementById('triangleCompass').style.visibility='hidden';
        }
    }
    catch (ex9){alert('Error exception: '+ex9.message);}
}

function clearWatchAcc()
{
    try
    {
        XYZpositionW.innerHTML = '';
    }
    catch (ex9){alert('Error exception: '+ex9.message);}

}

function obtenerWatchAcc()
{
    try
    {
        var options = { frequency: 500 }
        watchID_ACC = navigator.accelerometer.watchAcceleration(onSuccessWatchAcc, onErrorWatchAcc, options);
    }
    catch (ex9){alert('Error exception: '+ex9.message);}
}

function onSuccessWatchAcc(acceleration) {
    try
    {
        var a_x = (acceleration.x)/4;
        var a_y = (acceleration.y)/4;
        var a_z = (acceleration.z)/4;
        var a_time = acceleration.timestamp;

        Xposition.innerHTML = a_x.toFixed(3);
        Yposition.innerHTML = a_y.toFixed(3);
        Zposition.innerHTML = a_z.toFixed(3);
        Tposition.innerHTML = a_time;

        if(a_x >= 0)
            Xposition.innerHTML = '&nbsp;' + Xposition.innerHTML;
        if(a_y >= 0)
            Yposition.innerHTML = '&nbsp;' + Yposition.innerHTML;
        if(a_z >= 0)
            Zposition.innerHTML = '&nbsp;' + Zposition.innerHTML;


        var XposWatch = 'X: ' + Xposition.innerHTML + '; ';
        var YposWatch = 'Y: ' + Yposition.innerHTML + '; ';
        var ZposWatch = 'Z: ' + Zposition.innerHTML;

        XYZpositionW.innerHTML = XYZpositionW.innerHTML + XposWatch + YposWatch +ZposWatch + '<br/>';
    }
    catch (ex9){alert('Error exception: '+ex9.message);}
}

function onErrorWatchAcc() {
    alert('onErrorWatchAcc!');
}

function obtenerXYZ(){

    var sensorAcc = null;
    try
    {
        alert('Antes getCurrentAcceleration');
        alert(navigator.Accelerometer);
        sensorAcc = navigator.accelerometer.getCurrentAcceleration(onSuccess, onError)
        alert('Después getCurrentAcceleration');
    }
    catch (ex9){alert('Error obtenerXYZ: '+ex9.message);}


}

function onSuccess(acceleration) {
    try
    {
        Xposition.innerHTML = acceleration.x;
        Yposition.innerHTML = acceleration.y;
        Zposition.innerHTML = acceleration.z;
        Tposition.innerHTML = acceleration.timestamp ;
    }
    catch (ex9){alert('Error exception: '+ex9.message);}
}

// onError: Failed to get the acceleration
//
function onError() {
    alert('onError!');
}

function fixedXYZ_Motion(){

    try
    {
        XpositionF.innerHTML = document.getElementById('XpositionM').innerHTML;
        YpositionF.innerHTML = document.getElementById('YpositionM').innerHTML;
        ZpositionF.innerHTML = document.getElementById('ZpositionM').innerHTML;


    }
    catch (ex9){alert('Error fixedXYZ_Motion: '+ex9.message);}

}

function obtenerXYZ_Motion_Stop(e) {
    try
    {
        //STOP motion
        XpositionM.innerHTML = '0.00';
        YpositionM.innerHTML = '0.00';
        ZpositionM.innerHTML = '0.00';
        TpositionM.innerHTML = '0.00';

        window.removeEventListener("devicemotion", deviceMotionUpdate, true);


        //STOP Watch
        if (watchID_ACC) {
            navigator.accelerometer.clearWatch(watchID_ACC);
            watchID_ACC = null;
        }

        //STOP Acceleration

    }
    catch (ex9){alert('Error obtenerXYZ_Motion_Stop: '+ex9.message);}
}

function obtenerXYZ_Motion(e){

    try
    {
        window.addEventListener("devicemotion", deviceMotionUpdate, true);
    }
    catch (ex9){alert('Error obtenerXYZ_Motion: '+ex9.message);}
}

function deviceMotionUpdate(e){
    try{

        var X = e.accelerationIncludingGravity.x.toFixed(2);
        var Y = e.accelerationIncludingGravity.y.toFixed(2);
        var Z = e.accelerationIncludingGravity.z.toFixed(2);
        var T = e.accelerationIncludingGravity.timestamp;

        XpositionM.innerHTML = X;
        YpositionM.innerHTML = Y;
        ZpositionM.innerHTML = Z;
        TpositionM.innerHTML = T;


/*
        var acceleration = e.acceleration;
        var X_a = acceleration.x.toFixed(2);
        var Y_a = acceleration.y.toFixed(2);
        var Z_a = acceleration.z.toFixed(2);
        Xposition_a.innerHTML = X_a;
        Yposition_a.innerHTML = Y_a;
        Zposition_a.innerHTML = Z_a;

        var rotation = e.rotationRate;
        var X_r = rotation.alpha.toFixed(2);
        var Y_r = rotation.beta.toFixed(2);
        var Z_r = rotation.gamma.toFixed(2);
        Xposition_r.innerHTML = X_r;
        Yposition_r.innerHTML = Y_r;
        Zposition_r.innerHTML = Z_r;
 */

    }
    catch (ex9){alert('Error deviceMotionUpdate: '+ex9.message);}

}

/* ****************************************************************************************** */
/*          B R U J U L A    - M A G N E T R O N O M O
/* ****************************************************************************************** */
// The watch id references the current `watchHeading`
var watchID = null;

function brujula()
{
    alert('Entra en brujula()');
    startWatch();
    //navigator.compass.getCurrentHeading(compassSuccess, compassError, compassOptions);
}
function onSuccessCompass(heading) {
    try {
        var element = document.getElementById('heading');
        var degrees = heading.magneticHeading;
        //element.innerHTML = degrees + 'º';
        element.innerHTML = calculateDegrees(degrees);

        var elemRose = document.getElementById('divCompassGraph');
        var iDeg = degrees * (-1);
        elemRose.style.transform = "rotate("+ iDeg +"deg)";
    }
    catch (ex9) {alert('Error exception: ' + ex9.message);}
}

function calculateDegrees(p_degrees){

    p_degrees = p_degrees.toFixed(0);

    var iDegreePlus = p_degrees + 22.5;
    var iDegreeMinor = p_degrees - 22.5;
    var degree = '';

    if(p_degrees <= 22.5 && p_degrees >= 0){
        degree = p_degrees+'º N';
    }
    if(p_degrees <= 67.5 && p_degrees > 22.5){
        degree = p_degrees+'º NE';
    }
    if(p_degrees <= 112.5 && p_degrees > 67.5){
        degree = p_degrees+'º E';
    }
    if(p_degrees <= 157.5 && p_degrees > 112.5){
        degree = p_degrees+'º SE';
    }
    if(p_degrees <= 202.5 && p_degrees > 157.5){
        degree = p_degrees+'º S';
    }
    if(p_degrees <= 247.5 && p_degrees > 202.5){
        degree = p_degrees+'º SW';
    }
    if(p_degrees <= 292.5 && p_degrees > 247.5){
        degree = p_degrees+'º W';
    }
    if(p_degrees <= 337.5 && p_degrees > 292.5){
        degree = p_degrees+'º NW';
    }
    if(p_degrees <= 360 && p_degrees > 337.5){
        degree = p_degrees+'º N';
    }

    return degree;


}


function onErrorCompass(error) {
    alert('CompassError: ' + error.code);
};

function startWatch() {

    // Update compass every 3 seconds
    try
    {
        var compassOptions = { frequency: 300 };
        watchID = navigator.compass.watchHeading(onSuccessCompass, onErrorCompass, compassOptions);

    }
    catch (ex9){alert('Error startWatch: '+ex9.message);}

}
function stopWatch() {
    if (watchID) {
        navigator.compass.clearWatch(watchID);
        watchID = null;
        var element = document.getElementById('heading');
        element.innerHTML = '...';
    }
}


/* ****************************************************************************************** */
/*          M A P
 /* ****************************************************************************************** */
var time=0;
var iDegreeSTEP = 0;
var iDiffDegreeSTEP = 0;

var canvas=null,ctx=null;
var ctxPoint=null;
var ctxPointT=null;
var scaleX=1,scaleY=1;

var PointX_a=0, PointY_a=0;
var PointX=0, PointY=0;
var unitFoot = 20;

var touches=[];
var lastPress=null;
var pause=false;
var motionSupport=false;
var accelerationX=0;
var accelerationY=0;
var accelerationZ=0;
var time=0;


function initCanvas(){
    try{
        canvas=document.getElementById('myCanvas');
        ctx=canvas.getContext('2d');
        ctxPoint=canvas.getContext('2d');
        ctxPointT=canvas.getContext('2d');
        canvas.width=200;
        canvas.height=300;

        enableInputs();
        resize();
        InitPositionMap();
        InitPositionPoint();
        //paintPoint();
        //paintPointT();

        //run();
        //startWatchMap();


    }
    catch (ex9){alert('Error exception: '+ex9.message);}
}

function paintPointT(){

    ctxPointT.beginPath();
    ctxPointT.moveTo(PointX, PointY-10);
    ctxPointT.lineTo(PointX-10,PointY+10);
    ctxPointT.lineTo(PointX+10,PointY+10);
    ctxPointT.fillStyle = "#E55100";
    ctxPointT.fill();
}

function paintPoint(){

    /* PINTA EL CIRCULO AMARILLO */
    var radius = 10;
    ctxPoint.beginPath();
    ctxPoint.arc(PointX, PointY, radius, 0, Math.PI * 2, false);
    ctxPoint.closePath();
    ctxPoint.fillStyle = "#FFFF00";
    ctxPoint.fill();

}

function refreshPoint(x, y){

    /* PINTA EL CIRCULO AMARILLO */
    var radius = 10;
    ctxPoint.beginPath();
    ctxPoint.arc(x, y, radius, 0, Math.PI * 2, false);
    ctxPoint.closePath();
    ctxPoint.fillStyle = "#FFFF00";
    ctxPoint.fill();

}

function enableInputs(){
    try{
        if(window.DeviceOrientationEvent){
            motionSupport=true;
            window.addEventListener('devicemotion',function(evt){
                accelerationX=evt.accelerationIncludingGravity.x;
                accelerationY=evt.accelerationIncludingGravity.y;
                accelerationZ=evt.accelerationIncludingGravity.z;
                //MVL
                XpositionLabel.innerHTML = accelerationX.toFixed(2);
                YpositionLabel.innerHTML = accelerationY.toFixed(2);
                ZpositionLabel.innerHTML = accelerationZ.toFixed(2);

            },false);
        }
    }
    catch (ex9){alert('Error exception: '+ex9.message);}
}

function InitPositionMap(){

    var elemMap = document.getElementById('mapFixed');
    var divElemMap = document.getElementById('divMapFixed');

    try{

        var x = 0;
        var y = 0;

        x = (canvas.width/2) - (elemMap.width/2);
        y = (canvas.height/2) - (elemMap.height/2);

        divElemMap.style.top = y+'px';
        divElemMap.style.left = x+'px';

    }
    catch (ex9){alert('Error exception: '+ex9.message);}

}

function InitPositionPoint(){

    var elemPoint = document.getElementById('divPoint');
    var elemPointPosition = document.getElementById('divPosition');

    try{

        var x = 0;
        var y = 0;

        x = (canvas.width/2) - (elemPointPosition.width/2);
        y = (canvas.height/2) - (elemPointPosition.height/2) + 50;

        elemPoint.style.top = y+'px';
        elemPoint.style.left = x+'px';

        PointX_a=canvas.width/2;
        PointY_a=canvas.height/2;

        PointX=PointX_a;
        PointY=PointY_a;

        document.getElementById("divPoint").style.zIndex = "99";
        document.getElementById("divMapCanvas").style.zIndex = "2";
        document.getElementById("divMapFixed").style.zIndex = "1";

        document.getElementById('divPoint').style.visibility='visible';
        document.getElementById('divMapCanvas').style.visibility='visible';
        document.getElementById('divMapFixed').style.visibility='visible';


    }
    catch (ex9){alert('Error exception: '+ex9.message);}

}


function startWatchMap() {

    // Update compass every 3 seconds
    try
    {
        var compassOptionsMap = { frequency: 300 };
        watchID = navigator.compass.watchHeading(onSuccessCompassMap, onErrorCompassMap, compassOptionsMap);

    }
    catch (ex9){alert('Error startWatchMap: '+ex9.message);}
}

function stopWatchMap() {
    if (watchID) {
        navigator.compass.clearWatch(watchID);
        watchID = null;
        //var element = document.getElementById('heading');
        //element.innerHTML = '...';
    }
}

function onSuccessCompassMap(heading) {
    try {
        var element = document.getElementById('heading');
        var degrees = heading.magneticHeading;

        //element.innerHTML = calculateDegrees(degrees);

        var elemPoint = document.getElementById('divPoint');
        var elemPointPos = document.getElementById('divPosition');

        iDegreeSTEP = degrees;
        iDiffDegreeSTEP = 360 - iDegreeSTEP;
        //elemPoint.style.transform = "rotate("+ iDegreeSTEP +"deg)";
        //elemPoint.style.transform = "rotate("+ iDiffDegreeSTEP +"deg)";
        elemPointPos.style.transform = "rotate("+ iDiffDegreeSTEP +"deg)";

        var element = document.getElementById('STEPpositionDeg');
        element.innerHTML = calculateDegrees(iDegreeSTEP);

    }
    catch (ex9) {alert('Error onSuccessCompassMap: ' + ex9.message);}
}

function onErrorCompassMap(error) {
    alert('CompassError: ' + error.code);
};


function resize(){

    try{
        /*
        //Fijar al ancho y alto de la pantalla
        canvas.style.position='fixed';
        canvas.style.top='50px';
        canvas.style.left='0';
        canvas.style.width='100%';
        canvas.style.height='100%';
        scaleX=canvas.width/window.innerWidth;
        scaleY=canvas.height/window.innerHeight;
         */
        canvas.style.position='fixed';
        canvas.style.top='50px';
        canvas.style.left='0';
        canvas.width = screen.width;
        canvas.height = screen.height - 50;


        /* pinta la Diagonal que muestra el centro del canvas         */
        /*ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(canvas.width, canvas.height);
        ctx.moveTo(canvas.width, 0);
        ctx.lineTo(0, canvas.height);
        ctx.stroke();
        */

    }
    catch (ex9){alert('Error resize: '+ex9.message);}
}

Rectangle.prototype.fill=function(ctx){
    ctx.fillRect(this.x,this.y,this.width,this.height);
}

function runLine_example(){

    paintLine(PointX, PointY, PointX, PointY-unitFoot);
    paintLine(PointX, PointY, PointX-unitFoot, PointY);
    paintLine(PointX, PointY, PointX-unitFoot, PointY);
    paintLine(PointX, PointY, PointX-unitFoot, PointY);
    paintLine(PointX, PointY, PointX, PointY-unitFoot);

    movePositionPoint(PointX, PointY);

}

function movePositionSTEP(x, y){

    var x_1 = 0;
    var y_1 = 0;

    var elemPoint = document.getElementById('divPoint');
    var elemPointPosition = document.getElementById('divPosition');

    try
    {
        x_1 = x - (elemPointPosition.width/2);
        y_1 = y - (elemPointPosition.height/2) + 50;

        elemPoint.style.top = y_1+'px';
        elemPoint.style.left = x_1+'px';
    }
    catch (ex9){alert('Error paintLine: '+ex9.message);}

}


function movePositionPoint(x, y){

    var x_1 = 0;
    var y_1 = 0;

    var elemPoint = document.getElementById('divPoint');
    var elemPointPosition = document.getElementById('divPosition');

    try
    {
        x_1 = x - (elemPointPosition.width/2);
        y_1 = y - (elemPointPosition.height/2) + 50;

        elemPoint.style.top = y_1+'px';
        elemPoint.style.left = x_1+'px';

        PointX_a=canvas.width/2;
        PointY_a=canvas.height/2;

        ctxPoint.x=PointX_a;
        ctxPoint.y=PointY_a;

    }
    catch (ex9){alert('Error paintLine: '+ex9.message);}

}

function paintLine(x_a, y_a, x, y){

    try{

        //Dibujar linea
        ctx.beginPath();
        ctx.moveTo(x_a, y_a);
        ctx.lineTo(x, y);
        ctx.stroke();

        PointX = x;
        PointY = y;

    }
    catch (ex9){alert('Error paintLine: '+ex9.message);}

}


function run(){
    requestAnimationFrame(run);

    var now=Date.now();
    var deltaTime=(now-time)/1000;
    if(deltaTime>1){
        deltaTime=0;
    }
    time=now;

    act();
}



function act(deltaTime){

    if(!pause){

        // Move Rect RIGHT
        if(accelerationX>2){
            //ctxPoint.x+=120*deltaTime;
            PointX+=120*deltaTime;
        }

        // Move Rect LEFT
        if(accelerationX<-2){
            //ctxPoint.x-=120*deltaTime;
            PointX-=120*deltaTime;
        }

        // Out Screen
        if(ctxPoint.x>canvas.width-ctxPoint.width){
            PointX=canvas.width-ctxPoint.width;
        }

        if(ctxPoint.x<0){
            PointX==0;
        }

        refreshPoint(PointX, PointY);
    }
}


