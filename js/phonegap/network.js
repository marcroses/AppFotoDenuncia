var internetOn;

function checkConnection() 
{
	$('#lblInfo0').html("Verificant conexions...")
    var networkState = navigator.network.connection.type;
    
    var states = {};
    states[Connection.UNKNOWN]  = 'Unknown connection';
    states[Connection.ETHERNET] = 'Ethernet connection';
    states[Connection.WIFI]     = 'WiFi connection';
    states[Connection.CELL_2G]  = 'Cell 2G connection';
    states[Connection.CELL_3G]  = 'Cell 3G connection';
    states[Connection.CELL_4G]  = 'Cell 4G connection';
    states[Connection.NONE]     = 'No network connection';
    
    if ((states[networkState] != 'No network connection') && (states[networkState] != 'Unknown connection'))
    {
        internetOn=true;    
    }
    else{
        internetOn=false;
    }
    return networkState
}

function obreNavegador(url)
{
	//alert(url)
	window.open(url,'_system')
}
