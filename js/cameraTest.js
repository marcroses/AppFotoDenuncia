var currentMunicipi="";
//===================
//PAGE SPLASH
//===================
$(document).on ('pageinit', '#splash', function (event) {
    $("#tabExit0").bind('click', function(event, ui){
    	navigator.app.exitApp();
    }); 
});

//==================
//PAGE HOME
//==================
$(document).on ('pageinit', '#home', function (event) {
    $("#tabExit1").bind('click', function(event, ui){
    	navigator.app.exitApp();
    }); 
    
});
//==================
//PAGE MUNCIPIS
//==================
$(document).on ('pageinit', '#pageMainMunicipi', function (event) {
    // lllista de municipis
    $("#llistaMainMunicipis").on('click', 'li', function() {
        currentMunicipi=$(this).attr("key").substr(0, $(this).attr("key").indexOf("_") );
        $("#currentMunicipi").val(currentMunicipi);
        //alert($("#currentMunicipi").val());
        $('#selectMunicipi span').text("Municipi: " + $(this).attr("key").substr($(this).attr("key").indexOf("_") +1));
        getAreas();
        $.mobile.changePage("#home");
    });
    
});

function validarNif(dni) {
  //alert(dni);
  var numero;
  var let;
  var letra;
  var expresion_regular_dni;
  var resposta="ok";
 
  expresion_regular_dni = /^\d{8}[a-zA-Z]$/;
 
  if(expresion_regular_dni.test (dni) == true){
     numero = dni.substr(0,dni.length-1);
     let = dni.substr(dni.length-1,1);
     numero = numero % 23;
     letra='TRWAGMYFPDXBNJZSQVHLCKET';
     letra=letra.substring(numero,numero+1);
     if (letra!=let) {
       resposta ='Dni incorrecte, la lletra del NIF no es correspon';
     }else{
       resposta="ok";
     }
  }else{
     resposta= 'Dni incorrecte, format no vàlid';
   }
   return resposta
}


function validarEmail(email) {
    var resposta="ok";
    var atpos = email.indexOf("@");
    var dotpos = email.lastIndexOf(".");
    if (atpos< 1 || dotpos<atpos+2 || dotpos+2>=email.length) {
        resposta="Email incorrecte";
    }
    return resposta;
}