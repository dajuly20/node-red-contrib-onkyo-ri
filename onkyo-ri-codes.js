module.exports = function(RED) {
    function LowerCaseNode(config) {
        RED.nodes.createNode(this,config);
        var node = this;
        node.on('input', function(msg) {
            
            msg.payload = config.device;
            node.send(msg);
        });
    }
    RED.nodes.registerType("onkyo-ri-codes",LowerCaseNode);


    
}


