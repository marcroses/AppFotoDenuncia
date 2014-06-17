var pictureSource;   // picture source
var destinationType; // estableix el format del valor retornat
var fotoCapturada;
var codi64="";

function peraparaCamara()
{
    pictureSource=navigator.camera.PictureSourceType;
    destinationType=navigator.camera.DestinationType;	
}



function takePicture() {
    navigator.camera.getPicture(
        function(uri) {
            
            
            $.mobile.showPageLoadingMsg( 'Searching' );

            //Establim el factor de resize
            var currentWidth=0;
            var currentHeight=0;         
            codi64=0;   
           
            window.imageResizer.getImageSize(
                  function(data) { 
                    currentWidth = data.width;
                    currentHeight = data.height;
                    var factor = 1;
                    if (currentWidth >= currentHeight)
                    {
                        factor = parseFloat(1024 / currentWidth).toFixed(3);
                    }
                    else{
                        factor = parseFloat(1024 / currentHeight).toFixed(3);
                    }
                    //alert(currentWidth + " " + currentHeight + " " + factor);
                    
                    //Caviem la mida de la imatge
                    window.imageResizer.resizeImage(
                          function(data) { 
                            var image = document.getElementById('largeImage');
                            image.src = "data:image/jpeg;base64," + data.imageData; 
                            //alert(data.width);
                            //$('#codi64').val(data.imageData);
                            codi64=data.imageData;
                            $.mobile.hidePageLoadingMsg( 'Searching' );
                            
                          }, function (error) {
                            console.log("Error : \r\n" + error);
                          }, 
                            uri,factor,factor,{resizeType:ImageResizer.RESIZE_TYPE_FACTOR ,format:'jpg'}
                    );                
                    
                    
                  }, function (error) {
                    console.log("Error : \r\n" + error);
                    $.mobile.hidePageLoadingMsg( 'Searching' );
                  }, 
                    uri,{resizeType:ImageResizer.RESIZE_TYPE_FACTOR ,format:'jpg'}
            );            
            
            
            
            
            /*
            //alert(uri);
            $.mobile.showPageLoadingMsg( 'Searching' );
            
            //var img = document.getElementById('largeImage');
            //img.style.visibility = "visible";
            //img.style.display = "block";
            //img.src = uri;
            //document.getElementById('camera_status').innerHTML = "Correcte";
            var can = document.getElementById('canvas');
            var ctx = can.getContext('2d');
            var img = new Image();
            img.onload = function () {
                var k = 0;
                var newWidth = 0;
                var newHeight = 0;
                if (img.width >= img.height) {
                    newWidth = 800;
                    k = 800 / img.width;
                    newHeight = parseInt(img.height * k);
                }
                else {
                    newHeight = 800;
                    k = 800 / img.height;
                    newWidth = parseInt(img.width * k);
                }
                //alert(img.width + " " + img.height + " / " + newWidth + " " + newHeight)
                can.width = newWidth;
                can.height = newHeight;
                ctx.drawImage(img, 0, 0, newWidth, newHeight);
                
                var b64Text = can.toDataURL();
                if (b64Text.length<50)
                {
                    window.canvasplugin(can,function(val){
                      b64Text =  val.data;
                    });                
                }
                document.getElementById('canvasImg').src = b64Text;
                b64Text = b64Text.replace("data:image/png;base64,", "");
                //upload(b64Text);
                $('#codi64').val(b64Text);
                document.getElementById('camera_status').innerHTML = "Correcte";
                $.mobile.hidePageLoadingMsg( 'Searching' );
            }
            img.src = uri;               
            */
        },
        function(e) {
            console.log("Error getting picture: " + e);
            document.getElementById('camera_status').innerHTML = "Error fent la foto.";
        },
        { 
        	quality: 50, 
        	//destinationType: navigator.camera.DestinationType.FILE_URI, 
        	destinationType: navigator.camera.DestinationType.DATA_URL,
        	//saveToPhotoAlbum: true,
    		//allowEdit : true,
  			//encodingType: Camera.EncodingType.JPEG,        	
        	correctOrientation:true
        	//,targetWidth: 800
    		//,targetHeight: 600

        }
	);
};


/**
 * Select picture from library
 */
function selectPicture() {
    navigator.camera.getPicture(
        function(uri) {
            $.mobile.showPageLoadingMsg( 'Searching' );
            //Establim el factor de resize
            var currentWidth=0;
            var currentHeight=0;        
            codi64=0;    
            
            window.imageResizer.getImageSize(
                  function(data) { 
                    currentWidth = data.width;
                    currentHeight = data.height;
                    var factor = 1;
                    if (currentWidth >= currentHeight)
                    {
                        factor = parseFloat(1024 / currentWidth).toFixed(3);
                    }
                    else{
                        factor = parseFloat(1024 / currentHeight).toFixed(3);
                    }
                    //alert(currentWidth + " " + currentHeight + " " + factor);
                    
                    //Caviem la mida de la imatge
                    window.imageResizer.resizeImage(
                          function(data) { 
                            var image = document.getElementById('largeImage');
                            image.src = "data:image/jpeg;base64," + data.imageData; 
                            //alert(data.width);
                            //$('#codi64').val(data.imageData);
                            codi64=data.imageData
                            $.mobile.hidePageLoadingMsg( 'Searching' );
                            
                          }, function (error) {
                            console.log("Error : \r\n" + error);
                          }, 
                            uri,factor,factor,{resizeType:ImageResizer.RESIZE_TYPE_FACTOR ,format:'jpg'}
                    );                
                    
                    
                  }, function (error) {
                    console.log("Error : \r\n" + error);
                    $.mobile.hidePageLoadingMsg( 'Searching' );
                  }, 
                    uri,{resizeType:ImageResizer.RESIZE_TYPE_FACTOR ,format:'jpg'}
            );
            
            
            /*
            $.mobile.showPageLoadingMsg( 'Searching' );
           
            var can = document.getElementById('canvas');
            var ctx = can.getContext('2d');
            var img = new Image();
            img.onload = function () {
                var k = 0;
                var newWidth = 0;
                var newHeight = 0;
                if (img.width >= img.height) {
                    newWidth = 800;
                    k = 800 / img.width;
                    newHeight = parseInt(img.height * k);
                }
                else {
                    newHeight = 800;
                    k = 800 / img.height;
                    newWidth = parseInt(img.width * k);
                }
                //alert(img.width + " " + img.height + " / " + newWidth + " " + newHeight)
                can.width = newWidth;
                can.height = newHeight;
                ctx.drawImage(img, 0, 0, newWidth, newHeight);
                
                var b64Text = can.toDataURL();
                if (b64Text.length<50)
                {
                    //PlugIn vell
                    //window.canvasplugin(can,function(val){
                    //  b64Text =  val.data;
                    //});
                }
                document.getElementById('canvasImg').src = b64Text;
                b64Text = b64Text.replace("data:image/png;base64,", "");
                $('#codi64').val(b64Text);
                $.mobile.hidePageLoadingMsg( 'Searching' );
            }
            img.src = "data:image/png;base64," + uri;           
            */ 
            
        },
        function(e) {
            console.log("Error getting picture: " + e);
            document.getElementById('camera_status').innerHTML = "Error getting picture.";
        },
        {   
            quality: 50, 
            destinationType: navigator.camera.DestinationType.DATA_URL, 
            //destinationType: navigator.camera.DestinationType.FILE_URI,
            sourceType: navigator.camera.PictureSourceType.PHOTOLIBRARY,
            correctOrientation:true
        }
    );
};

    

function upload() {
    if (validarNif($("#NIF").val().toUpperCase())!="ok")
    {
        alert(validarNif($("#NIF").val().toUpperCase()));
        return;
    }
    
    if (validarEmail($("#Mail").val().toUpperCase())!="ok")
    {
        alert(validarEmail($("#Mail").val().toUpperCase()));
        return;
    }
    
    if (currentMunicipi=="")
    {
        alert("No s'ha escollit cap municipi");
        return;
    }    
    
    if ($("#IdArea").val()==null)
    {
        alert("No s'ha escollit cap àrea de l'ajuntament");
        return;
    }      
  

    // Get URI of picture to upload
    //var img = document.getElementById('canvasImg');
    //var imageURI = img.src;
    
    //imageURI=$('#codi64').val();
    imageURI = codi64;
    
    var totOk=true;
    if (!imageURI ) {
        totOk=false;
        var r = confirm("No s'ha escollit cap fotografia... Segur que vols enviar la sol·licitiud?");
        if (r == true) totOk=true;
    }
    
    if (totOk==true)
    {
        try {
    
            $.mobile.showPageLoadingMsg( 'Searching' );
            
            var vTexte = $("#Texte").val();
            var vMunicipi = $("#currentMunicipi").val();
            var vNom = $("#Nom").val();
            var vMail = $("#Mail").val();
            var vIdArea = $("#IdArea").val();
            /*
            var vDomicili = $("#Domicili").val();
            var vPoblacio = $("#Poblacio").val();
            var vCPostal = $("#CPostal").val();
            var vTelefon = $("#Telefon").val();
            */
            var vNIF = $("#NIF").val();
            
            var url="http://ide.cime.es/test/";
            
            //alert(currentLon  + "  "  + currentLat);
            
            if (currentMunicipi=="07002") url='http://www.aj-alaior.org/';
            if (currentMunicipi=="07015") url='http://www.ajciutadella.org/';
            if (currentMunicipi=="07023") url='http://www.ajferreries.org/';
            if (currentMunicipi=="07032") url='http://www.ajmao.org/';
            if (currentMunicipi=="07037") url='http://www.aj-esmercadal.org/';
            if (currentMunicipi=="07052") url='http://www.ajsantlluis.org/';
            if (currentMunicipi=="07064") url='http://www.aj-escastell.org/';
            if (currentMunicipi=="07067") url='http://www.ajmigjorngran.org/';              
    
            url += "wssaveimage/saveImage.aspx";         
            //alert(url);   
            document.getElementById('camera_status').innerHTML ='';
    
                
                $.ajax({
                    type: "POST",
                    //url: "http://ide.cime.es/test/saveImage.aspx",
                    url : url,
                    data: { 
                        app: "sitmunmobil"
                        , image: imageURI
                        , opcio: "queixa"
                        , vNom: vNom 
                        , vMail: vMail 
                        , vIdArea: vIdArea 
                        //, vDomicili: vDomicili 
                        //, vPoblacio: vPoblacio 
                        //, vCPostal: vCPostal 
                        //, vTelefon: vTelefon 
                        , vNIF: vNIF 
                        , vTexte: vTexte
                        , vMunicipi: vMunicipi
                        , vLongitud: currentLon
                        , vLatitud: currentLat
                    }
                }).done(function (msg) {
                    
                    var respHeader="L'ajuntament MUNI notifica que:"

                    if (currentMunicipi=="07002") respHeader = respHeader.replace("MUNI","d'Alaior");
                    if (currentMunicipi=="07015") respHeader = respHeader.replace("MUNI","de Ciutadella");
                    if (currentMunicipi=="07023") respHeader = respHeader.replace("MUNI","de Ferreries");
                    if (currentMunicipi=="07032") respHeader = respHeader.replace("MUNI","de Maó");
                    if (currentMunicipi=="07037") respHeader = respHeader.replace("MUNI","des Mercadal");
                    if (currentMunicipi=="07052") respHeader = respHeader.replace("MUNI","de Sant Llu&iacute;s");
                    if (currentMunicipi=="07064") respHeader = respHeader.replace("MUNI","des Castell");
                    if (currentMunicipi=="07067") respHeader = respHeader.replace("MUNI","des Migjorn Gran");              
            


                    var resultat = msg.split("|");
                    var res1 = "- Fotografia NO guardada correctament";
                    var res2 = "- Incidència NO reportada correctament";
                    if (resultat[0].trim()=="true")
                    {
                        res1 = "- la fotografia s'ha guardat correctament";
                    }
                    if (resultat[1].trim()=="true")
                    {
                        var res2 = "- La incidència s'ha reportat correctament";
                    }
                    $.mobile.hidePageLoadingMsg( 'Searching' );
                    document.getElementById('camera_status').innerHTML = '<p>' + respHeader + '<p>' + res1 + '<br>' + res2;
                }).fail(function (a, b) {
                    $.mobile.hidePageLoadingMsg( 'Searching' );
                    document.getElementById('camera_status').innerHTML = "Errada en guardar:" + b;
                });
                
    
        }
        catch (ex) {
            alert(ex);
        }
    }
}

















/*
function selectPicture9() {
    navigator.camera.getPicture(
        function(uri) {

           
            var image = new Image();
            //console.log(uri);
            var can = document.getElementById('canvas');
            var ctx = can.getContext('2d');
            image.onload = function () {
                alert("1");
                var k = 0;
                var newWidth = 0;
                var newHeight = 0;
                if (image.width >= image.height) {
                    newWidth = 800;
                    k = 800 / image.width;
                    newHeight = parseInt(image.height * k);
                }
                else {
                    newHeight = 600;
                    k = 600 / image.height;
                    newWidth = parseInt(image.width * k);
                }
                alert(img.width + " " + img.height + " / " + newWidth + " " + newHeight)
                can.width = newWidth;
                can.height = newHeight;
                ctx.drawImage(img, 0, 0, newWidth, newHeight);
                var b64Text = can.toDataURL();
                document.getElementById('canvasImg').src = b64Text;
                b64Text = b64Text.replace("data:image/png;base64,", "");
                //upload(b64Text)
                $('#codi64').val(b64Text);
            }
            image.src = "data:image/png;base64," + uri;
          
           
        },
        function(e) {
            console.log("Error getting picture: " + e);
            document.getElementById('camera_status').innerHTML = "Error obtinguent la imatge.";
        },
        { 
            quality: 50, 
            destinationType: navigator.camera.DestinationType.DATA_URL, 
            sourceType: navigator.camera.PictureSourceType.PHOTOLIBRARY,
            correctOrientation:true
        }
    );
};


function uploadPicture9() {
    
    // Get URI of picture to upload
    var img = document.getElementById('largeImage');
    var imageURI = img.src;
    if (!imageURI || (img.style.display == "none")) {
        document.getElementById('camera_status').innerHTML = "Take picture or select picture from library first.";
        return;
    }
    
    // Verify server has been entered
    server = "http://ide.cime.es/test/saveImage.ashx";//document.getElementById('serverUrl').value;
    if (server) {
        // Specify transfer options
        var options = new FileUploadOptions();
        options.fileKey="recFile";
        options.fileName=imageURI.substr(imageURI.lastIndexOf('/')+1);
        options.mimeType="image/jpeg";
        options.chunkedMode = false;
        

        var vTexte = $("#Texte").val();
        var vNom = $("#Nom").val();
        var vMail = $("#Mail").val();
        var vIdArea = $("#IdArea").val();
        var vDomicili = $("#Domicili").val();
        var vPoblacio = $("#Poblacio").val();
        var vCPostal = $("#CPostal").val();
        var vTelefon = $("#Telefon").val();
        var vNIF = $("#NIF").val();
        
        
        var params = new Object(); 
        params.vNom = vNom; 
        params.vMail = vMail;
        params.vIdArea = vIdArea;
        params.vDomicili = vDomicili;
        params.vPoblacio = vPoblacio;
        params.vCPostal = vCPostal;                                     
        params.vTelefon = vTelefon;
        params.vNIF = vNIF;
        params.vTexte = vTexte;


        options.params = params;             

        // Transfer picture to server
        var ft = new FileTransfer();
        ft.onprogress = function(progressEvent) {
            if (progressEvent.lengthComputable) {
                var perc = Math.floor(progressEvent.loaded / progressEvent.total * 100);
                document.getElementById('camera_status').innerHTML = perc + " %. Cargando foto, por Favor, espere..." ;
            } 
        };              
        ft.upload(imageURI, server, function(r) {
            alert(r.response);
            document.getElementById('camera_status').innerHTML = "Upload correcte: "+r.bytesSent+" bytes uploaded.";                
        }, function(error) {
            document.getElementById('camera_status').innerHTML = "Upload errada: Code = "+error.code;               
        }, options);
    }
}


function uploadPicture() 
{

    if (validarNif($("#NIF").val().toUpperCase())!="ok")
    {
        alert(validarNif($("#NIF").val().toUpperCase()));
        return;
    }
    
    if (validarEmail($("#Mail").val().toUpperCase())!="ok")
    {
        alert(validarEmail($("#Mail").val().toUpperCase()));
        return;
    }
    
    if (currentMunicipi=="")
    {
        alert("No s'ha escollit cap municipi");
        return;
    }    
    
    if ($("#IdArea").val()==null)
    {
        alert("No s'ha escollit cap àrea de l'ajuntament");
        return;
    }      
  

    // Get URI of picture to upload
    var img = document.getElementById('canvasImg');
    var imageURI = img.src;
    var totOk=true;
    if (!imageURI ) {
        totOk=false;
        var r = confirm("No s'ha escollit cap fotografia... Segur que vols enviar la sol·licitiud?");
        if (r == true) totOk=true;
    }
    
    if (totOk==true)
    {
        // Verify server has been entered
        server = "http://ide.cime.es/infoIDE/saveImage.ashx";
        if (server) {
            // Specify transfer options
            var options = new FileUploadOptions();
            options.fileKey="recFile";
            options.fileName=imageURI.substr(imageURI.lastIndexOf('/')+1);
            options.mimeType="image/jpeg";
            options.chunkedMode = false;
            
    
            var vTexte = $("#Texte").val();
            var vNom = $("#Nom").val();
            var vMunicipi = $("#currentMunicipi").val();
            var vMail = $("#Mail").val();
            var vIdArea = $("#IdArea").val();
            var vDomicili = $("#Domicili").val();
            var vPoblacio = $("#Poblacio").val();
            var vCPostal = $("#CPostal").val();
            var vTelefon = $("#Telefon").val();
            var vNIF = $("#NIF").val();
            
            
            var params = new Object(); 
            params.vNom = vNom; 
            params.vMail = vMail;
            params.vIdArea = vIdArea;
            params.vDomicili = vDomicili;
            params.vPoblacio = vPoblacio;
            params.vCPostal = vCPostal;                                     
            params.vTelefon = vTelefon;
            params.vNIF = vNIF;
            params.vTexte = vTexte;
            params.vMunicipi = vMunicipi;
    
    
            options.params = params;             
    
            // Transfer picture to server
            var ft = new FileTransfer();
            ft.onprogress = function(progressEvent) {
                if (progressEvent.lengthComputable) {
                    var perc = Math.floor(progressEvent.loaded / progressEvent.total * 100);
                    document.getElementById('camera_status').innerHTML = perc + " %. Cargando foto, por Favor, espere..." ;
                } 
            };              
            ft.upload(imageURI, server, function(r) {
                alert(r.response);
                document.getElementById('camera_status').innerHTML = "Upload correcte: "+r.bytesSent+" bytes uploaded.";                
            }, function(error) {
                document.getElementById('camera_status').innerHTML = "Upload errada: Code = "+error.code;               
            }, options);
        }        
    }
}
*/