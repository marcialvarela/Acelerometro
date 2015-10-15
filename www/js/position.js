/**
 * Created by mvarela on 15/10/2015.
 */

/* URL de interes: Acelerometro y sensores de movil

 http://www.eldiario.es/hojaderouter/tecnologia/acelerometro-funciones-giroscopio-GPS-interior-magnetometro-sensor-sensor_de_humedad-sensor_de_temperatura-telefono_movil_0_275772515.html

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
        alert('Entra onSuccess');
        alert('Acceleration X: ' + acceleration.x + '\n' +
        'Acceleration Y: ' + acceleration.y + '\n' +
        'Acceleration Z: ' + acceleration.z + '\n' +
        'Timestamp: '      + acceleration.timestamp + '\n');

        Xposition.innerHTML = acceleration.x;
        Yposition.innerHTML = acceleration.x;
        Zposition.innerHTML = acceleration.x;
    }
    catch (ex9){alert('Error exception: '+ex9.message);}
}

// onError: Failed to get the acceleration
//
function onError() {
    alert('onError!');
}


function obtenerXYZ_2(e){

    var sensorAcc = null;
    try
    {
        alert('Antes deviceMotionUpdate');

        window.addEventListener("devicemotion", deviceMotionUpdate, true);

        alert('Después getCurrentAcceleration');
    }
    catch (ex9){alert('Error exception: '+ex9.message);}
}

function deviceMotionUpdate(e){
    try{

        //console.log("x: ", e.accelerationIncludingGravity.x);
        //console.log("y: ", e.accelerationIncludingGravity.y);
        //console.log("z: ", e.accelerationIncludingGravity.z);

        Xposition.innerHTML = e.accelerationIncludingGravity.x;
        Yposition.innerHTML = e.accelerationIncludingGravity.y;
        Zposition.innerHTML = e.accelerationIncludingGravity.z;

    }
    catch (ex9){alert('Error deviceMotionUpdate: '+ex9.message);}

}