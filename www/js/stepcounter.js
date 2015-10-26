/**
 * Created by mvarela on 26/10/2015.
 */

var watchID_STEP = null;
var MAX_x =0;
var MAX_y =0;
var MAX_z =0;
var MIN_x =0;
var MIN_y =0;
var MIN_z =0;
var MIN_time = 0.2;
var MIN_max = 2.0;
var INI_time;
var FIN_time;


Xposition.innerHTML = '0.00';
Yposition.innerHTML = '0.00';
Zposition.innerHTML = '0.00';
Tposition.innerHTML = '0.00';


var start = 0;
var end = 0;
var diff = 0;
var timerID = 0;
var msec = 0;
var sec = 0;

function millisecondCounter(){

    // http://www.proglogic.com/code/javascript/time/chronometer.php

    end = new Date();
    diff = end - start;
    diff = new Date(diff);
    msec = diff.getMilliseconds();
    sec = diff.getSeconds();
    if (sec < 10){
        sec = "0" + sec;
    }
    if(msec < 10){
        msec = "00" +msec;
    }
    else if(msec < 100){
        msec = "0" +msec;
    }
    //document.getElementById("chronotime").innerHTML = hr + ":" + min + ":" + sec + ":" + msec
    ChronoPos.innerHTML = "0:" + sec + ":" + msec;

    timerID = setTimeout("millisecondCounter()", 10);
}

function stepCounterIni()
{
    try
    {
        start = new Date();
        millisecondCounter();

    }
    catch (ex9){alert('Error exception: '+ex9.message);}
}

function stepCounter()
{
    try
    {
        start = new Date();
        millisecondCounter();

        var options = { frequency: 100 }
        watchID_STEP = navigator.accelerometer.watchAcceleration(onSuccessWatchStep, onErrorWatchStep, options);
    }
    catch (ex9){alert('Error exception: '+ex9.message);}
}

function clearCounter(){

    ChronoPos.innerHTML = "0:00:000";
    //clearTimeout(timerID);

}

function stepCounter_Stop(e) {
    try
    {
        //STOP CHRONO
        //ChronoPos.innerHTML = "00:00:000";
        clearTimeout(timerID);

        //STOP motion
        XpositionM.innerHTML = '0.00';
        YpositionM.innerHTML = '0.00';
        ZpositionM.innerHTML = '0.00';
        TpositionM.innerHTML = '0.00';

        window.removeEventListener("devicemotion", deviceMotionUpdate, true);


        //STOP Watch
        if (watchID_STEP) {
            navigator.accelerometer.clearWatch(watchID_STEP);
            watchID_STEP = null;
        }

    }
    catch (ex9){alert('Error obtenerXYZ_Motion_Stop: '+ex9.message);}
}

function onSuccessWatchStep(acceleration) {
    try
    {
        var d = new Date();
        var ms = d.getMilliseconds().toFixed(3);


        var a_x = (acceleration.x)/4;
        var a_y = (acceleration.y)/4;
        var a_z = (acceleration.z)/4;
        var a_time = acceleration.timestamp;

        Xposition.innerHTML = a_x.toFixed(3);
        Yposition.innerHTML = a_y.toFixed(3);
        Zposition.innerHTML = a_z.toFixed(3);

        //var ss_time = a_time.format("HH/mm/ss");
        //Tposition.innerHTML = ss_time;

        if(a_x >= 0)
            Xposition.innerHTML = '&nbsp;' + Xposition.innerHTML;
        if(a_y >= 0)
            Yposition.innerHTML = '&nbsp;' + Yposition.innerHTML;
        if(a_z >= 0)
            Zposition.innerHTML = '&nbsp;' + Zposition.innerHTML;

        var XposWatch = 'X: ' + Xposition.innerHTML + '; ';
        var YposWatch = 'Y: ' + Yposition.innerHTML + '; ';
        var ZposWatch = 'Z: ' + Zposition.innerHTML;

        //Obtener MAX X
/*        if(a_x >= MAX_x){
            MAX_x = a_x;
        }

        //Obtener MAX Y
        if(a_y >= MAX_y){
            MAX_y = a_y;
        }
*/

        // Pintar los picos Min y Max en otro color (tiempo entre 200ms y 2000ms)
        //XYZpositionW.style.color='#00FF00';
        //XYZpositionW.style.color='#FF0000';

        if (msec >= 0 && sec <=5) {

            if (msec >= 200 && sec <=2){
                //Estoy dentro de un PASO "correcto"
                //Obtener MAX Z
                if(a_z >= MAX_z){
                    MAX_z = a_z;
                    ZposWatch  = '+&nbsp;' + ZposWatch;
                }
                else{
                    MIN_z = a_z;
                }

                if(a_z < MIN_z){
                    MIN_z = a_z;
                    ZposWatch  = '-&nbsp;' + ZposWatch;
                }
                XYZpositionW.innerHTML = XYZpositionW.innerHTML + XposWatch + YposWatch +ZposWatch + '<br/>';

                // INICIAR CRONO !!!
                start = new Date();
                millisecondCounter();
            }
            else{
                XYZpositionW.innerHTML = XYZpositionW.innerHTML + XposWatch + YposWatch +ZposWatch + '<br/>';
            }
        }
        else {
            // INICIAR CRONO !!!
            start = new Date();
            millisecondCounter();
        }


    }
    catch (ex9){alert('Error exception: '+ex9.message);}
}


function onErrorWatchStep() {
    alert('Error: onErrorWatchStep()');
}


function step_NEW(){
    //Un paso se define como ocurre si hay una pendiente negativa de la trama de aceleración
    // (sample_new <sample_old) cuando la curva de aceleración cruza por debajo del umbral dinámico

}

function step_OLD(){

}