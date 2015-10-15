/**
 * Created by mvarela on 15/10/2015.
 */

/* URL de interes: Acelerometro y sensores de movil

 http://www.eldiario.es/hojaderouter/tecnologia/acelerometro-funciones-giroscopio-GPS-interior-magnetometro-sensor-sensor_de_humedad-sensor_de_temperatura-telefono_movil_0_275772515.html

 */

function obtenerXYZ(){
    alert('Entra obtenerXYZ');

    try
    {
        navigator.accelerometer.getCurrentAcceleration(onSuccess, onError)
    }
    catch (ex9){alert('Error exception: '+ex9.message);}


}

function onSuccess(acceleration) {
    try
    {
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