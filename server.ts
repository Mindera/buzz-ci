
/// <reference path="./server.d.ts" />

import * as config from 'config';
import { exec } from 'child_process';
import * as buzzBuzzers from 'buzz-buzzers';
import utilsClass from './utils';

/**
 * INITAL SETUP
 */
const buzzers = buzzBuzzers();
const classUtils = utilsClass(buzzers);
const utils = new classUtils();

utils.blinkBuzzerLeds();


buzzers.onPress(async ev => {
    buzzers.setLeds(true, true, true, true);

    utils.clickEvent(ev);
    const clickType = await utils.getClickType(ev);
    console.log('asdpifuhasiudfasd > \n\n',clickType);

    const configuration = config.get(`${ev.button}`);
    exec(configuration.cmd[clickType]);
    console.log(

        `PRESSED: { "Controller": ${ev.controller}, "Button": ${ev.button}, "ClickType": ${clickType} }`
      );

});

buzzers.onRelease(ev => {
    buzzers.setLeds(false, false, false, false);

    utils.releaseEvent(ev);

}); 

buzzers.onChange((state) => {
    if (state.filter(v => v).length === 5) {
        console.log("detected overload!");
        exec("sudo reboot");
    }
})