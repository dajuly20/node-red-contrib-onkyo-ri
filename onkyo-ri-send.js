import fetch from 'node-fetch';

module.exports = function (RED) {
  function OnkyoRiSend(config) {

    const { exec } = require("child_process");

    const fs = require("fs");
    const path = require("path");
    
    //const fetch = require( 'node-fetch');


    const basename = path.basename(__filename);
    const functions = {};
   
    // Shoould be: http://localhost:1880/resources/node-red-node-example/image.png
    
    // devices
    //   .filter(
    //     (file) =>
    //       file.indexOf(".") !== 0 &&
    //       file !== basename &&
    //       file.slice(-6) === ".json"
    //   )
    //   .map((file) => {
    //     //functions[file.slice(0, -6)] = require(path.join(__dirname, file));

        
       

    //   });


      module.exports = functions;
      RED.nodes.createNode(this, config);
        


      var node = this;
      node.on("input", function (msg) {

        var url = "http://localhost:1880/resources/node-red-contrib-onkyo-ri/"+msg.topic+".json";
        node.warn("URL is: "+ url)


        const importDynamic = new Function('modulePath', 'return import(modulePath)');
        // eslint-disable-next-line no-new-func
        const fetch = async (...args:any[]) => {
          const module = await importDynamic('node-fetch');
          return module.default(...args);
        };

        // TODO: Fetch funtzt noch nicht :-(   ABR! ich hab jetzt KAi bock mehr 

        const response = await fetch(url);
        const data = await response.json();
        

        request.get(url, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            var csv = JSON.parse(body);
            node.warn(csv);
            // Continue with your processing here.
        }
});
        //var file = JSON.parse(fs.readFileSync(url, "utf8"));
        //const devices = fs.readdirSync("./resources/");
        
        node.warn(file);
        node.warn("Halloooo");
        

        //RED.settings.sampleNodeColour
        node.error("HILFEEEE");
        node.warn(basename)
        node.warn(devices);
       
        const payload = msg.payload;
        const path = config.path;
        const nodeRedDir =
          RED.settings.userDir ||
          process.env.NODE_RED_HOME ||
          path.resolve(".");
        const completePath = `${nodeRedDir}/node_modules/node-red-contrib-onkyo-ri/Onkyo-RI-Rasperrypi/onkyoricli -p ${config.gpio} -c ${payload}`;

        node.warn("Dir: " + nodeRedDir);
        node.warn(`Selected GPIO Pin: ${config.gpio}`);
        node.warn("Complete: " + completePath);
        const command = `pwd`;
        //var path = require('path');
        //userdir = path.resolve(process.execPath,'..');
        //node.warn(userdir);
        // && ../node_modules/Onkyo-RI-Rasperrypi/onkyoricli -p 24 -c ${payload}`;
        node.warn("HERE WE R" + command);
        exec(completePath, (error, stdout, stderr) => {
          if (error) {
            node.error(`error: ${error.message}`);
            return;
          }
          if (stderr) {
            node.error(`stderr: ${stderr}`);

            return;
          }
      
          node.send(command + " ...aha:" + stdout);
        });

     
      });

  }


  RED.nodes.registerType("onkyo-ri-send", OnkyoRiSend, {
	settings: {
	  path: {
		value: "~/onkyo-rpi/onkyo-rpi/",
		exportable: true,
	  },
	  gpioPin: {
		value: "25",
		exportable: true,
	  },
	  logging: {
		// Console logging
		console: {
		  level: "info",
		  metrics: false,
		  audit: false,
		},
	  },
	},
  }); 

  
};
