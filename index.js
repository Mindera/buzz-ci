const { exec } = require("child_process");
const buzzBuzzers = require("buzz-buzzers");

let BROWSER_OPENED = false;
const NEW_RELIC_TITAN =
  "https://rpm.newrelic.com/accounts/417057/applications/64178797/filterable_errors";
const NEW_RELIC_COMISSION_SERVICE =
  "https://insights.newrelic.com/accounts/417057/dashboards/634938";
const TRAINLINE_HOME = "https://trainline.com";
const REACTION_GAME = "localhost:3000";
const FLAPPY_BIRD = "https://flappybird.io/";
const FIRE_AMBIENT = "https://www.youtube.com/watch?v=NpQSEvPMLGA";
const BROWSER_SIZE = "--window-size=1920,1080";
const BROWSER_OPTIONS =
  "--kiosk --no-sandbox --noerrdialogs --no-message-box --no-first-run --fast --fast-start --disable-infobars";

const BUTTONS = {
  BUZZER: 0,
  BLUE: 1,
  ORANGE: 2,
  GREEN: 3,
  YELLOW: 4
};

let buzzers = buzzBuzzers();
function blinkBuzzerLeds() {
  setInterval(function() {
    buzzers.setLeds(true, true, true, true);
    setTimeout(function() {
      buzzers.setLeds(false, false, false, false);
    }, 500);
  }, 5000);
}

blinkBuzzerLeds();

const tabSwitcher = setInterval(() => {
  console.log("Tab switched...");
  if (BROWSER_OPENED) {
    exec("xdotool key ctrl+Tab");
  }
}, 10000);

if (tabSwitcher) {
  clearTimeout(tabSwitcher);
}

buzzers.onError(function(err) {
  console.log("Error: ", err);
});

buzzers.onPress(function(ev) {
  buzzers.setLeds(true, true, true, true);
  switch (ev.button) {
    case BUTTONS.BUZZER:
      console.log("BUZZER clicked");
      console.log("browser is open", BROWSER_OPENED);
      if (!BROWSER_OPENED) {
        BROWSER_OPENED = true;
        exec(
          `DISPLAY=:0 chromium-browser ${BROWSER_SIZE} ${BROWSER_OPTIONS} ${FIRE_AMBIENT} ${NEW_RELIC_TITAN} ${NEW_RELIC_COMISSION_SERVICE} ${TRAINLINE_HOME} ${REACTION_GAME}`,
          function(arg) {
            console.log("finished opening chrome", arg);
          }
        );
      }
      exec(`curl ${REACTION_GAME}/winner/${ev.controller}`);
      exec("xdotool key space");
      break;

    case BUTTONS.BLUE:
      console.log("BLUE clicked");
      exec("xdotool key ctrl+Tab");
      clearTimeout(tabSwitcher);
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

buzzers.onChange(function(state) {
  if (state.filter(v => v).length === 5) {
    console.log("detected overload!");
    exec("sudo reboot");
  }
});
