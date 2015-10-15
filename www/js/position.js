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

        var X = e.accelerationIncludingGravity.x.toFixed(2);
        var Y = e.accelerationIncludingGravity.y.toFixed(2);
        var Z = e.accelerationIncludingGravity.z.toFixed(2);
        Xposition.innerHTML = X;
        Yposition.innerHTML = Y;
        Zposition.innerHTML = Z;

        var X_a = e.acceleration.x.toFixed(2);
        var Y_a = e.acceleration.y.toFixed(2);
        var Z_a = e.acceleration.z.toFixed(2);
        Xposition_a.innerHTML = X_a;
        Yposition_a.innerHTML = Y_a;
        Zposition_a.innerHTML = Z_a;

        var X_r = e.rotationRate.x.toFixed(2);
        var Y_r = e.rotationRate.y.toFixed(2);
        var Z_r = e.rotationRate.z.toFixed(2);
        Xposition_r.innerHTML = X_r;
        Yposition_r.innerHTML = Y_r;
        Zposition_r.innerHTML = Z_r;

    }
    catch (ex9){alert('Error deviceMotionUpdate: '+ex9.message);}

}