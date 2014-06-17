window.canvasplugin = function(canvasEl,callback){
    var canvasProps = {
        mimeType: "image/png", //this is hard coded right now, change it as per your need
        xpos: canvasEl.offsetLeft,
        ypos: canvasEl.offsetTop,
        width: canvasEl.width,
        height: canvasEl.height,
        screenWidth: window.innerWidth // no WebView.getContentWidth(), use this instead
    };
    
    //call the Plugin execute method()
    cordova.exec(callback,function(err){
        callback('Error: ' + err);  
    },"CanvasPlugin","toDataURL",[canvasProps.mimeType,
                            canvasProps.xpos,
                            canvasProps.ypos,
                            canvasProps.width,
                            canvasProps.height,
                            canvasProps.screenWidth]);  
};

/*
// Inspired by http://ryangillespie.com/phonegap.php
window.canvasplugin = function(canvas, mimeType, successCallback, failCallback) {
    //console.log(“CanvasPlugin.js: custom toDataURL called”);
    var canvasProps = {
    “mimeType” : “image/png”,
    “xpos” : 0,
    “ypos” : 0,
    “width” : 0,
    “height” : 0,
    “screenWidth” : document.getElementsByTagName(‘html’)[0].scrollWidth
    };

    if (canvas.toString().indexOf(“HTMLCanvasElement”) != -1) {
        canvasProps.mimeType = mimeType;
        canvasProps.xpos = canvas.offsetLeft;
        canvasProps.ypos = canvas.offsetTop;
        canvasProps.width = canvas.width;
        canvasProps.height = canvas.height;
    }

    function success(args) {
    successCallback(args);
    }

    function fail(args) {
    failCallback(args);
    }
    return cordova.exec(function(args) {
            success(args);
        }, 
        function(args) {
            fail(args);
        }, 
        ‘CanvasPlugin’, ‘toDataURL’, [ canvasProps.mimeType, canvasProps.xpos,canvasProps.ypos, canvasProps.width, canvasProps.height,canvasProps.screenWidth ]
    );
};
*/