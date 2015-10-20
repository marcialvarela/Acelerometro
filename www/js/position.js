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
/*          P O S I C I O N A M I E N T O    -    A C E L E R O M E T R O
 /* ****************************************************************************************** */

function obtenerXYZ(){

    var sensorAcc = null;
    try
    {
        alert('Antes getCurrentAcceleration');
        alert(navigator.Accelerometer);
        sensorAcc = navigator.accelerometer.getCurrentAcceleration(onSuccess, onError)
        alert('Después getCurrentAcceleration');
    }
    catch (ex9){alert('Error exception: '+ex9.message);}


}

function onSuccess(acceleration) {
    try
    {
        Xposition.innerHTML = acceleration.x;
        Yposition.innerHTML = acceleration.y;
        Zposition.innerHTML = acceleration.z;
    }
    catch (ex9){alert('Error exception: '+ex9.message);}
}

// onError: Failed to get the acceleration
//
function onError() {
    alert('onError!');
}


function obtenerXYZ_Motion(e){

    var sensorAcc = null;
    try
    {
        window.addEventListener("devicemotion", deviceMotionUpdate, true);
    }
    catch (ex9){alert('Error exception: '+ex9.message);}
}

function deviceMotionUpdate(e){
    try{

        var X = e.accelerationIncludingGravity.x.toFixed(2);
        var Y = e.accelerationIncludingGravity.y.toFixed(2);
        var Z = e.accelerationIncludingGravity.z.toFixed(2);
        Xposition.innerHTML = X;
        Yposition.innerHTML = Y;
        Zposition.innerHTML = Z;


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
        element.innerHTML = 'Heading: ' + heading.magneticHeading;
    }
    catch (ex9) {alert('Error exception: ' + ex9.message);}
}

function onErrorCompass(error) {
    alert('CompassError: ' + error.code);
};

function startWatch() {

    // Update compass every 3 seconds
    try
    {
        var compassOptions = { frequency: 3000 };
        watchID = navigator.compass.watchHeading(onSuccessCompass, onErrorCompass, compassOptions);
        //watchID = navigator.compass.getCurrentHeading(compassSuccess, compassError);

    }
    catch (ex9){alert('Error startWatch: '+ex9.message);}

}
function stopWatch() {
    if (watchID) {
        navigator.compass.clearWatch(watchID);
        watchID = null;
    }
}


function compassSuccess(heading) {
    //alert('Heading: ' + heading.magneticHeading);
    var element = document.getElementById('heading');
    element.innerHTML = 'Heading: ' + heading.magneticHeading;

};

function compassError(error) {
    alert('CompassError: ' + error.code);
};