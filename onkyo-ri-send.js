module.exports = function (RED) {
  function OnkyoRiSend(config) {
    try {
      const { exec } = require("child_process");
      const functions = {};

      module.exports = functions;
      RED.nodes.createNode(this, config);
      var node = this;
      node.on("input", function (msg) {
        const dbg = false;
        const node = this;
        const payload = msg.payload;
        const path = config.path;
        const nodeRedDir =
          RED.settings.userDir ||
          process.env.NODE_RED_HOME ||
          path.resolve(".");
        const completePath = `${nodeRedDir}/node_modules/node-red-contrib-onkyo-ri/Onkyo-RI-Rasperrypi/onkyoricli -p ${config.gpio} -c ${payload}`;

        if(dbg) node.warn("Dir: " + nodeRedDir);
        if(dbg) node.warn(`Selected GPIO Pin: ${config.gpio}`);
        if(dbg) node.warn("Complete: " + completePath);

        const command = `pwd`;
        exec(completePath, (error, stdout, stderr) => {
          
          if (error) {
            node.warn(`error: ${error.message}`);
            return;
          }
          if (stderr) {
            node.warn(`stderr: ${stderr}`);

            return;
          }

          node.send({cmd: command, payload: stdout, pin: config.gpio, path: completePath});
        });
      });
    } catch (e) {
      node.error(`Errorrrrr!!!:}`, e);
    }
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
