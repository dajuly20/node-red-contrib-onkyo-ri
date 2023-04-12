module.exports = function(RED) {
    function OnkyoRiDevice(config) {

        const { exec } = require("child_process");
        const fs = require("fs");
        const path = require("path");
        const basename = path.basename(__filename);
        const functions = {};
        const devices = fs.readdirSync("./resources/");
        
     
        const devNames = devices.map( device => device.substr(0, device.lastIndexOf(".")))


        RED.nodes.createNode(this,config);
        var node = this;

        const select= $("#node-input-device");
        node.on('input', function(msg) {
            
            msg.payload = config.device;
            node.send(msg);
        });
    }
    RED.nodes.registerType("onkyo-ri-device",OnkyoRiDevice);


    
}


