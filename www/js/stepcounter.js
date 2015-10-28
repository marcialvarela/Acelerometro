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


//Xposition.innerHTML = '0.00';
//Yposition.innerHTML = '0.00';
Zposition.innerHTML = '0.00';
Tposition.innerHTML = '0.00';


var start = 0;
var end = 0;
var diff = 0;
var timerID = 0;
var msec = 0;
var sec = 0;
var primerLectura = 1;

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
        primerLectura = 1;

        start = new Date();
        millisecondCounter();

        var options = { frequency: 300 }
        watchID_STEP = navigator.accelerometer.watchAcceleration(onSuccessWatchStep, onErrorWatchStep, options);
    }
    catch (ex9){alert('Error exception: '+ex9.message);}
}

function clearCounter(){

    try
    {
        ChronoPos.innerHTML = "0:00:000";
        XYZpositionW.innerHTML = "";
    }
    catch (ex9){alert('Error obtenerXYZ_Motion_Stop: '+ex9.message);}

}

function stepCounter_Stop(e) {
    try
    {

        //STOP CHRONO
        clearTimeout(timerID);

        if (watchID_STEP) {

            //STOP Watch
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

        if(primerLectura == 1){
            MAX_z = a_z;
            MIN_z = a_z;
            primerLectura = 0;
        }

        Zposition.innerHTML = a_z.toFixed(3);

        if(a_z >= 0)
            Zposition.innerHTML = '&nbsp;' + Zposition.innerHTML;

        var ZposWatch = 'Z: ' + Zposition.innerHTML;
        var Ztime = ChronoPos.innerHTML;


        if (msec >= 0 && sec <=5) {

            if (msec >= 200 && sec <=2){
                //Estoy dentro de un PASO "correcto"
                //Obtener MAX Z
                if(a_z > MAX_z){
                    MAX_z = a_z;
                    ZposWatch  = '+&nbsp;' + ZposWatch;
                }
                else{
                    if(a_z < MIN_z){
                        MIN_z = a_z;
                        ZposWatch  = '-&nbsp;' + ZposWatch;
                    }
                    else{
                        ZposWatch  = '&nbsp;&nbsp;' + ZposWatch;
                    }
                }

                XYZpositionW.innerHTML = XYZpositionW.innerHTML + Ztime + ' 1** ' + ZposWatch + '<br/>';

            }
            else{
                Ztime = '-:--:---';
                XYZpositionW.innerHTML = XYZpositionW.innerHTML + Ztime + ' 2**&nbsp;&nbsp;&nbsp;' + ZposWatch + '<br/>';
            }
        }
        else {
            // INICIAR CRONO !!!
            Ztime = '-:--:---';
            XYZpositionW.innerHTML = XYZpositionW.innerHTML + Ztime + ' 3**&nbsp;&nbsp;&nbsp;' + ZposWatch + '<br/>';
            if (watchID_STEP) {
                //STOP Watch
                navigator.accelerometer.clearWatch(watchID_STEP);
                watchID_STEP = null;
            }
            stepCounter();
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


/* ******************************************************************** */
/*              P A I N T   S T E P
/* ******************************************************************** */

function pintaPaso(p_ant_x, p_ant_y, p_degree)
{
    // Canvas http://www.html5canvastutorials.com/tutorials/html5-canvas-line-color/
    //https://www.youtube.com/watch?v=RY_cl4GFM1U

    try{
        ctx.beginPath();
        ctx.moveTo(p_ant_x, p_ant_y);
        //Ver dirección de la brújula y pintar linea

        //Calcular X e Y en funcion de los grados
        //var y = 10 * -1; //Math.sin(p_degree)*10;
        //var x = 0; // (Math.cos(p_degree - 90)*10)*-1;
        var y = (Math.sin(p_degree)*10)*-1;
        var x = (Math.cos(p_degree)*10)*-1;

        p_x =  p_ant_x + x;
        p_y =  p_ant_y + y;

        ctx.lineTo(p_x, p_y);
        ctx.lineWidth = 5;

        // Azul: #385D8A
        // Naranja: #F97912
        ctx.strokeStyle = '#F97912';// set line color
        ctx.stroke();

        PointX_a = p_x;
        PointY_a = p_y;

        // Mueve PunteroMapa
        movePositionSTEP(PointX_a, PointY_a);

    }
    catch (ex9){alert('Error exception: '+ex9.message);}

}

function onSuccessWatchStep2(acceleration) {
    try
    {

        //if (msec >= 200 && sec <=2) {
        if (sec == 2) {
            var margeWindow = 10;

            if((PointX_a > margeWindow && PointX_a <canvas.width - margeWindow)
               && (PointY_a > margeWindow && PointY_a <canvas.height - margeWindow) ){
                // Pintar paso en dirección a la brújula
                pintaPaso(PointX_a, PointY_a, iDiffDegreeSTEP);
            }
        }
        else{
            if (sec > 2){
                //Estarse quieto
                msec = 0;
                sec = 0;
                stepCounterIni()
            }
        }
    }
    catch (ex9){alert('Error exception: '+ex9.message);}
}


function paintStep()
{
    try{
        startWatchMap();
        stepCounterIni();

        var options = { frequency: 300 }
        watchID_STEP = navigator.accelerometer.watchAcceleration(onSuccessWatchStep2, onErrorWatchStep, options);
    }
    catch (ex9){alert('Error exception: '+ex9.message);}
}

function stopStep(){

    try{
        //STOP CHRONO
        clearTimeout(timerID);
        clearCounter();

        if (watchID_STEP) {
            navigator.compass.clearWatch(watchID_STEP);
            watchID_STEP = null;
        }
    }
    catch (ex9){alert('Error exception: '+ex9.message);}
}