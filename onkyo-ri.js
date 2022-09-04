module.exports = function (RED) {
	function OnkyoRi(config) {
		RED.nodes.createNode(this, config);
		var node = this;
		node.on('input', function (msg) {
			//RED.settings.sampleNodeColour
			const { exec } = require("child_process");
			const payload = msg.payload; // TODO put field for that as well
			exec("python3 $(path) main.py --gpio $(RED.settings.gpioPin $(payload)", (error, stdout, stderr) => {
				if (error) {
					console.log(`error: ${error.message}`);
					return;
				}
				if (stderr) {
					console.log(`stderr: ${stderr}`);
					return;
				}
				console.log(`stdout: ${stdout}`);
			});

			msg.payload = msg.payload.toLowerCase();
			node.send(msg);
		});
	}
	RED.nodes.registerType("onkyo-ri", OnkyoRi, {
		settings: {
			path: {
				value: "~/onkyo-rpi/onkyo-rpi/",
				exportable: true
			},
			gpioPin: {
				value: "25",
				exportable: true
			}
		}
	});
}
