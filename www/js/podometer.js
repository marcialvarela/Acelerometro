/* ****************************************************************************************** */
/*          P O D O M E T E R
 /* ****************************************************************************************** */



/* https://github.com/leecrossley/cordova-plugin-pedometer
*
* https://libraries.io/npm/cordova-plugin-pedometer
*
*  cordova-plugin-pedometer 0.3.3

 Cordova / PhoneGap Plugin for the Core Motion Pedometer to fetch pedestrian-related data, such as step counts and other information about the distance travelled.

 Homepage: https://github.com/leecrossley/cordova-plugin-pedometer#readme

 Platform: npm

 License: MIT

 Keywords: cordova, core motion, pedometer, steps, distance, pedestrian, ecosystem:cordova, cordova-ios

 Repository: https://github.com/leecrossley/cordova-plugin-pedometer

 View on registry: https://www.npmjs.com/package/cordova-plugin-pedometer

 Install: npm install cordova-plugin-pedometer



 cordova-plugin-stepcounter ANDROID KIT-KAT 4.4
 https://github.com/texh/cordova-plugin-stepcounter

* */

function startPodometer()
{
  alert('entra startPodometer');

  try {
   //Pedometer.startPedometerUpdates(successHandler, onError);
   Pedometer.prototype.startPedometerUpdates(successHandler, onError);

   alert('Pasa en startPodometer');

  }
 catch (ex9) {alert('Error startPodometer: ' + ex9.message);}

}


var successHandler = function (pedometerData) {
 alert('entra successHandler');
 // pedometerData.startDate; -> ms since 1970
 // pedometerData.endDate; -> ms since 1970
 // pedometerData.numberOfSteps;
 // pedometerData.distance;
 // pedometerData.floorsAscended;
 // pedometerData.floorsDescended;
};

function onError(error) {
 alert('onError: ' + error.code);
};


/* ---------------------------------------------------- */

/*
    Web con codigo sobre los diferentes sensore . CODIGO ANDROID NATIVO ???
    http://developer.android.com/reference/android/hardware/SensorEvent.html


    Cómo contar paso utilizando el acelerómetro en Android
    http://es.androids.help/q20207

 */

function onPedometer()
{


}