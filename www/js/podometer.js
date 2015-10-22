/* ****************************************************************************************** */
/*          P O D O M E T E R
 /* ****************************************************************************************** */



/* https://github.com/leecrossley/cordova-plugin-pedometer */

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
