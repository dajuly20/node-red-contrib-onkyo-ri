module.exports = function (RED) {
	function OnkyoRi(config) {
		const { exec } = require("child_process");
		RED.nodes.createNode(this, config);
		var node = this;
		node.on('input', function (msg) {
			//RED.settings.sampleNodeColour
			console.log("TEST");
			const payload = msg.payload; // TODO put field for that as well
			const path = config.path;
			console.log(payload);
			node.warn(payload);
			const command = `python3 ${path}main.py --gpio ${config.gpioPin} ${payload}`;
			exec(command, (error, stdout, stderr) => {
				if (error) {
					node.status({fill:"red",shape:"square",text: error.message});
					console.log(`error: ${error.message}`);
					return;
				} 
				if (stderr) {
					node.status({fill:"red",shape:"ring",text:stderr});
					console.log(`stderr: ${stderr}`);
					return;
				}
				console.log(`stdout: ${stdout}`);
				node.send(command);
			});

			
			
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
			},
			logging: {
				// Console logging
				console: {
					level: "info",
					metrics: false,
					audit: false
				}
			}
		}
	});
}
