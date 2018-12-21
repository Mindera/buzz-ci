import config from 'config';
import { exec } from 'child_process';
import buzzBuzzers from 'buzz-buzzers';
import utilsClass from './utils';

/**
 * INITAL SETUP
 */
const buzzers = buzzBuzzers();
const utils = utilsClass(buzzers);

utils.blinkBuzzerLeds();


buzzers.onPress(ev => {
    buzzers.setLeds(true, true, true, true);

    utils.events = utils.newRef(ev);
    const clickType = await utils.getClickType();

    const configuration = config.get(ev.button);
    exec(configuration.cmd[clickType]);

    console.log(
        `PRESSED: { "Controller": ${ev.controller}, "Button": ${ev.button} }`
      );

});

buzzers.onRelease(ev => {
    buzzers.setLeds(false, false, false, false);

    utils.releaseEvent(ev);

});