/**
 * Screen Timeout Control
 */
document.addEventListener("DOMContentLoaded", function (event) {

    var domScript = document.getElementById('reset_timeout')
    if (!domScript) {
        var script = document.createElement("script");
        script.id = 'reset_timeout'
        script.innerHTML = "var ipcRenderer = require('electron').ipcRenderer;ipcRenderer.sendToHost('RESET_SCREEN_TIME');document.body.onclick = function(){ipcRenderer.sendToHost('RESET_SCREEN_TIME')}";
        document.body.appendChild(script);
    }

});
