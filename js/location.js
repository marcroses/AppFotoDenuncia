var idTemporitzador=null; 
var watch_idGPS = null;    
var watch_idHTML5 = null;    

var currentLat=0
var currentLon=0
var currentLat4326=null
var currentLon4326=null


var currentAccuracy=null

var currentLatGPS=0
var currentLonGPS=0
var currentHeadingGPS=0
var currentSpeedGPS=0
var currentAccuracyGPS=0

var currentLatHTML5=0
var currentLonHTML5=0
var currentHeadingHTML5=0
var currentSpeedHTML5=0
var currentAccuracyHTML5=0

var sucessGPS=false;
var sucessHTML5=false;
var currentMunicipi;
var selectedMunicipi;


function startMonitor()
{
    if (idTemporitzador==null) 
    {
        tempsInicialCerca = 0;
        tempsExcedit = false;
        idTemporitzador = setInterval("getLoc()",5000)
    }
}

function stopMonitor()
{
    if (idTemporitzador!=null) clearInterval(idTemporitzador)
}

function getLoc()
{
    tempsInicialCerca = parseInt(parseInt(tempsInicialCerca) + 5);
    if (tempsInicialCerca>10)
    {
        if (tempsExcedit==false)
        {
            //alert("temps excedit")
            tempsExcedit=true
            initMunicipi();
            $.mobile.hidePageLoadingMsg( 'Searching' );
            return;
        }
    }
        
	if (sucessGPS==true)
	{
		currentAccuracy = currentAccuracyGPS;
        currentLat4326=currentLatGPS;
        currentLon4326=currentLonGPS;
		var p1 = new OpenLayers.LonLat(currentLonGPS, currentLatGPS);
		p1.transform(new OpenLayers.Projection("EPSG:4326" ), new OpenLayers.Projection("EPSG:25831"));	
		currentLon = parseFloat(p1.lon).toFixed(0);
		currentLat = parseFloat(p1.lat).toFixed(0);
	}
	else{
		if (sucessHTML5==true)
		{
			currentAccuracy = currentAccuracyHTML5;
	        currentLat4326=currentLatHTML5;
            currentLon4326=currentLonHTML5;

			var p1 = new OpenLayers.LonLat(currentLonHTML5, currentLatHTML5);
			p1.transform(new OpenLayers.Projection("EPSG:4326" ), new OpenLayers.Projection("EPSG:25831"));	
			currentLon = parseFloat(p1.lon).toFixed(0);
			currentLat = parseFloat(p1.lat).toFixed(0);
		}	
	}
	
}

function onSoc()
{
    $.mobile.showPageLoadingMsg( 'Searching' );
    if (navigator.geolocation)
    {
        navigator.geolocation.getCurrentPosition(showPosition);
    }
	sucessGPS=false;
	sucessHTML5=false;
	initLocationHTML5();
	initLocationGPS();
	startMonitor();
}

function showPosition(position)
{
    
        currentAccuracy = position.coords.accuracy;
        currentLon4326=position.coords.longitude;
        currentLat4326=position.coords.latitude;
        var p1 = new OpenLayers.LonLat(position.coords.longitude, position.coords.latitude);
        p1.transform(new OpenLayers.Projection("EPSG:4326" ), new OpenLayers.Projection("EPSG:25831")); 
        currentLon = parseFloat(p1.lon).toFixed(0);
        currentLat = parseFloat(p1.lat).toFixed(0);
        //alert(currentMunicipi)
        initMunicipi();
}

//================================================================
//SILME
//================================================================
/**
 * Inicialitza els controls per la cerca de candidats
 */
function initMunicipi() {
    try {
        //alert("0");
        console.log("initMunicipi");
        $.ajax({
            type: "POST",
            url: "http://ide.cime.es/sitmun/rest/consulta",
            data: {
                id: 61
                ,valor: currentLon
                ,valor2: currentLat
            },
            cache: false,
            dataType: 'json',
            success: function(data) { //Si se ejecuta correctamente
                if(!data.error){
                    if(data.data!=null){
                        $.each(data.data, function(i, item) {
                            //alert("1");
                            currentMunicipi=item.IDMUN
                            //alert(currentMunicipi);
                        });
                        setHeader();
                    }
                    else{
                        setHeader();
                    }
                }else{
                    setHeader();
                }
            },
            error: function(data) {
                setHeader();
            }
        });
    } catch (e) {
        console.error("Error a initMunicipi()",e);
    }
}


function initLocationGPS()
{
    watch_idGPS = navigator.geolocation.watchPosition(
    
        // Success
        function(position){

            currentLatGPS = position.coords.latitude
            currentLonGPS = position.coords.longitude
            currentHeadingGPS = position.coords.heading
            currentSpeedGPS = position.coords.speed
            currentAccuracyGPS = position.coords.accuracy   
            
            try{
                if (parseFloat(currentAccuracyGPS)<50)
                {
                	sucessGPS=true;
                }
                else{
                	sucessGPS=false;
                }
            }
            catch(err)
            {
                console.log(err.toString())
            }
        },
        
        // Error
        function(error){
        	//alert("error loc GPS")
        	sucessGPS=false;
        },
        // Settings
        { frequency: 1000, enableHighAccuracy: true, timeout: 20000});
}

function stopLocationGPS()
{
	 if (watch_idGPS != null) {
         navigator.geolocation.clearWatch(watch_idGPS);
         watch_idGPS = null;
     }
}

function initLocationHTML5()
{
    watch_idHTML5 = navigator.geolocation.watchPosition(
    
        // Success
        function(position){

            currentLatHTML5 = position.coords.latitude
            currentLonHTML5 = position.coords.longitude
            currentHeadingHTML5 = position.coords.heading
            currentSpeedHTML5 = position.coords.speed
            currentAccuracyHTML5 = position.coords.accuracy   
            
            try{
                if (parseFloat(currentLatHTML5)>0)
                {
                    if (parseFloat(currentAccuracyHTML5)<2500)
                    {
                    	sucessHTML5=true;
                    }
                	
                }
                else{
                	sucessHTML5=false;
                }
            }
            catch(err)
            {
                console.log(err.toString())
            }
        },
        
        // Error
        function(error){
        	sucessHTML5=false;
        },
        // Settings
        { frequency: 1000, enableHighAccuracy: false});
}

function stopLocationHTML5()
{
	 if (watch_idHTML5 != null) {
         navigator.geolocation.clearWatch(watch_idHTML5);
         watch_idHTML5 = null;
     }
}


function setHeader()
{
    $.mobile.hidePageLoadingMsg( 'Searching' );
    if (selectedMunicipi!=currentMunicipi) 
    {
        $("#currentMunicipi").val(currentMunicipi);
        getAreas();
        setHeaderFixe();
        selectedMunicipi=currentMunicipi;
    }
     
    
}

function setHeaderFixe()
{
        if(currentMunicipi=="07902") currentMunicipi="07067";
        document.getElementById('imgLogoMuni').src="img/fons/" + currentMunicipi + ".jpg"
        document.getElementById('imgLogoMuni').style.width = window.innerWidth + 'px';
        //alert(currentMunicipi)
        var eti="<center>Et trobes a:<br><font size=5><b>MUNICIPI</b></font></center>";        
        if (currentMunicipi!="07000")
        {
            if (currentMunicipi=="07002") $('#lbl_Muni_0').html(eti.replace("MUNICIPI", "Alaior"))
            if (currentMunicipi=="07015") $('#lbl_Muni_0').html(eti.replace("MUNICIPI", "Ciutadella"))
            if (currentMunicipi=="07023") $('#lbl_Muni_0').html(eti.replace("MUNICIPI", "Ferreries"))
            if (currentMunicipi=="07032") $('#lbl_Muni_0').html(eti.replace("MUNICIPI", "Maó"))
            if (currentMunicipi=="07037") $('#lbl_Muni_0').html(eti.replace("MUNICIPI", "Es Mercadal"))
            if (currentMunicipi=="07052") $('#lbl_Muni_0').html(eti.replace("MUNICIPI", "Sant Llu&iacute;s"))
            if (currentMunicipi=="07064") $('#lbl_Muni_0').html(eti.replace("MUNICIPI", "Es Castell"))
            if (currentMunicipi=="07067") $('#lbl_Muni_0').html(eti.replace("MUNICIPI", "Es Migjorn Gran"))
            if (currentMunicipi=="07070") $('#lbl_Muni_0').html(eti.replace("MUNICIPI", "Consell Insular de Menorca"))

        }
        else{
            $('#lbl_Muni_0').html("<center><font size=5>Envia'ns la teva queixa</font></center>")
        }       
        
        
}
