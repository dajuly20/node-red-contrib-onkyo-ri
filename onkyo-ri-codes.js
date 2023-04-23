module.exports = function(RED) {
    function LowerCaseNode(config) {
        RED.nodes.createNode(this,config);
        var node = this;
        node.on('input', function(msg) {

            node.warn(config.codes);
            msg.payload = config.codes;
            node.send(msg);
        });
    }
    RED.nodes.registerType("onkyo-ri-codes",LowerCaseNode);


    
}


