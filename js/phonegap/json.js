var pwdWebService="silme1988";

function getAreas()
{
    
    var soapMessage="";
    
    soapMessage = '<?xml version="1.0" encoding="utf-8"?>';
    soapMessage += '<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">';
    soapMessage += '      <soap:Body>';
    soapMessage += '    <DevolverAreas xmlns="SilAdmin">';
    soapMessage += '      <Password>' + pwdWebService + '</Password>';
    soapMessage += '    </DevolverAreas>';
    soapMessage += '  </soap:Body>';
    soapMessage += '</soap:Envelope>';   
    
    //alert(soapMessage);
    var url="";
    
    if (currentMunicipi=="07002") url='http://www.aj-alaior.org/';
    if (currentMunicipi=="07015") url='http://www.ajciutadella.org/';
    if (currentMunicipi=="07023") url='http://www.ajferreries.org/';
    if (currentMunicipi=="07032") url='http://www.ajmao.org/';
    if (currentMunicipi=="07037") url='http://www.aj-esmercadal.org/';
    if (currentMunicipi=="07052") url='http://www.ajsantlluis.org/';
    if (currentMunicipi=="07064") url='http://www.aj-escastell.org/';
    if (currentMunicipi=="07067") url='http://www.ajmigjorngran.org/';     
    
    url +=  "wsSilAdmin/ConsOnLine.asmx?op=DevolverAreas";
    
    $.ajax({
        url: url,
        type: "POST",
        dataType: "xml",
        data: soapMessage,
        complete: endGetAreas,
        contentType: "text/xml; charset=\"utf-8\""
    });
    
    return false;
}


function endGetAreas(xmlHttpRequest, status)
{
    //alert(xmlHttpRequest.responseText);
    $("#IdArea").empty(); 
    $(xmlHttpRequest.responseXML).find('Area').each(function(){
        
        var idArea = $(this).find('Id').text();
        var descripcionArea = $(this).find('Descripcion').text();
        $('#IdArea').append('<option value='+idArea+'>'+descripcionArea+'</option>');       

    });
    $('#IdArea').listview('refresh');
}

