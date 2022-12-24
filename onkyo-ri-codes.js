module.exports = function(RED) {
    function OnkyoRiCodes(config) {

    const fs = require('fs');
    const path = require('path');

    const basename = path.basename(__filename);
    const functions = {}

    fs
    .readdirSync("./devices/")
    .filter(file => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-6) === '.jason'))
    .map((file) => {functions[file.slice(0, -6)] = require(path.join(__dirname, file))});


        RED.nodes.createNode(this,config);
        var node = this;
        node.on('input', function(msg) {
            msg.payload = msg.payload.toLowerCase();
            node.send(msg);
        });
    

}
RED.nodes.registerType("onkyo-ri-codes",OnkyoRiCodes);
}