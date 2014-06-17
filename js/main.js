function main() {
	document.getElementById('imgLogoIni').style.width = ((window.innerWidth) - (window.innerWidth/5)) + 'px';
    document.getElementById('imgLogoIni').style.visibility = 'visible';
    
	document.addEventListener("deviceready", aplicacionIniciada, false); // Al inciar la app
	document.addEventListener("pause", aplicacionPausada, false);        // Al pausar la app
	document.addEventListener("resume", aplicacionReiniciada, false);    // Al reiniciar la app
	document.addEventListener("online", phonegapOnline, false);          // Phonegap tiene acceso a internet
	document.addEventListener("offline", phonegapOffline, false);        // Phonegap NO tiene acceso a internet
	document.addEventListener("menubutton", menuPulsado, false);         // Se ha pulsado la tecla menú
	document.addEventListener("searchbutton", menuPulsado, false);       // Se ha pulsado la tecla búsqued
}

function aplicacionIniciada()
{
    currentMunicipi="07000";
    onSoc();
	FastClick.attach(document.body);
	document.addEventListener("backbutton", atrasPulsado, false);
}

function atrasPulsado()
{
    if  ($.mobile.activePage.is('#home')){
        navigator.app.exitApp();
    }
}
 
function aplicacionPausada()
{
}
 
function aplicacionReiniciada()
{
}
 
function phonegapOnline()
{
}
 
function phonegapOffline()
{
}
 
function menuPulsado()
{
	
}
 
function busquedaPulsado()
{
}