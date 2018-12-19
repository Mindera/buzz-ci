// this line would be require('buzz-buzzers'); for you
const { exec, spawnSync, spawn } = require("child_process");
const buzzBuzzers = require("buzz-buzzers");

let BROWSER_OPENED = false;
const TRAINLINE_HOME = "https://trainline.com";
const MIGUEL_IP = "10.10.16.37:3000";

const BUTTONS = {
  BUZZER: 0,
  BLUE: 1,
  ORANGE: 2,
  GREEN: 3,
  YELLOW: 4
};

let buzzers;

try {
  buzzers = buzzBuzzers();
} catch (e) {
  buzzers = {
    onError: () => {},
    onPress: () => {},
    onRelease: () => {}
  };
  console.log("Error", e);
}

// buzzers.prototype.onLongPress = function (params) {
//   buzzers.onPress(function(){

//   })
// }

function blinkBuzzerLeds() {
  setInterval(function() {
    buzzers.setLeds(true, true, true, true);
    setTimeout(function() {
      buzzers.setLeds(false, false, false, false);
    }, 500);
  }, 5000);
}

blinkBuzzerLeds();

buzzers.onError(function(err) {
  console.log("Error: ", err);
});

buzzers.onPress(function(ev) {
  buzzers.setLeds(true, true, true, true);
  switch (ev.button) {
    case BUTTONS.BUZZER:
      console.log("BUZZER clicked");
      console.log("browser closed", BROWSER_OPENED);
      if (!BROWSER_OPENED) {
        exec(
          `DISPLAY=:0 chromium-browser --no-sandbox --noerrdialogs --no-message-box --kiosk ${MIGUEL_IP} ${TRAINLINE_HOME}`,
          function(arg) {
            console.log("finished opening chrome", arg);
          }
        );
      }
      exec(`curl ${MIGUEL_IP}/winner/${ev.controller}`);
      break;

    case BUTTONS.BLUE:
      console.log("BLUE clicked");
      exec("xdotool key ctrl+Tab");
      break;

    case BUTTONS.ORANGE:
      console.log("BLUE clicked");
      exec("xdotool key ctrl+r");
      break;

    case BUTTONS.GREEN:
      console.log("GREEN clicked");
      exec("xdotool key f");
      break;

    case BUTTONS.YELLOW:
      console.log("YELLOW clicked");
      exec("xdotool key ctrl+w");
      break;
    default:
      break;
  }
  console.log(
    `PRESSED: { "Controller": ${ev.controller}, "Button": ${ev.button} }`
  );
});

buzzers.onRelease(function(ev) {
  buzzers.setLeds(false, false, false, false);
  console.log(
    `RELEASED: { "Controller": ${ev.controller}, "Button": ${ev.button} }`
  );
});

// process.stdin.on("keypress", (str, key) => {
//   console.log("str", str, "key", key);
//   console.log(`stdout: ${ls.stdout.toString()}`);
// });

const BROWESER =
  "DISPLAY =: 0 chromium - browser--noerrdialogs--disable - features=TranslateUI--no - message - box http://trainline.com http://hydra.teamcity.ci.ttldev/project.html?projectId=MyAccountWeb&tab=projectOverview";

const openLs = () => {
  const ls = spawn("ls", ["-lh", "/usr"]);

  ls.stdout.on("data", data => {
    console.log(`stdout: ${data}`);
  });

  ls.stderr.on("data", data => {
    console.log(`stderr: ${data}`);
  });

  ls.on("close", code => {
    console.log(`child process exited with code ${code}`);
  });
};
