module.exports = function(RED) {
    function OnkyoRiDevice(config) {

        
        //const devices = fs.readdirSync("./resources/");
        
     
        // const devNames = devices.map( device => device.substr(0, device.lastIndexOf(".")))


        RED.nodes.createNode(this,config);
        var node = this;

        
        
        node.on('input', function(msg) {
            //const select= $("#node-input-device");    
            //node.error("HalloIchBinFehler... "+select);
            msg.topic = config.device ?? "-1";
            msg.payload = "HALLOOOOOO!!!!";
            node.send(msg);
        });
    }
    RED.nodes.registerType("onkyo-ri-device",OnkyoRiDevice);


    
}


