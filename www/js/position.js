/**
 * Created by mvarela on 15/10/2015.
 */

/* URL de interes: Acelerometro y sensores de movil

 http://www.eldiario.es/hojaderouter/tecnologia/acelerometro-funciones-giroscopio-GPS-interior-magnetometro-sensor-sensor_de_humedad-sensor_de_temperatura-telefono_movil_0_275772515.html

   orientation document:
 http://www.html5rocks.com/en/tutorials/device/orientation/?redirect_from_locale=es

 */

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

        var X = e.accelerationIncludingGravity.x;
        var Y = e.accelerationIncludingGravity.y;
        var Z = e.accelerationIncludingGravity.z;

        Xposition.innerHTML = Math.round(X);
        Yposition.innerHTML = Math.round(Y);
        Zposition.innerHTML = Math.round(Z);

    }
    catch (ex9){alert('Error deviceMotionUpdate: '+ex9.message);}

}