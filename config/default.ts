import { BUTTONS } from '../constants';

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


export default {
    [BUTTONS.BUZZER]: {
        cmd: {
            NORMAL: `DISPLAY=:0 chromium-browser ${BROWSER_SIZE} ${BROWSER_OPTIONS} ${FIRE_AMBIENT} ${NEW_RELIC_TITAN} ${NEW_RELIC_COMISSION_SERVICE} ${TRAINLINE_HOME} ${REACTION_GAME}`,
            LONGPRESS: ''
        }
    },
    [BUTTONS.BLUE]:{
        cmd: { 
            NORMAL: 'xdotool key ctrl+Tab',
            LONGPRESS: ''
        }
    },
    [BUTTONS.ORANGE]:{
        cmd: { 
            NORMAL: 'xdotool key ctrl+r',
            LONGPRESS: ''
        }
    },
    [BUTTONS.GREEN]:{
        cmd: { 
            NORMAL: 'xdotool key ctrl+f',
            LONGPRESS: ''
        }
    },
    [BUTTONS.YELLOW]:{
        cmd: { 
            NORMAL: 'xdotool key ctrl+w',
            LONGPRESS: ''
        }
    }
} 