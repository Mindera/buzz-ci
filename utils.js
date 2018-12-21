let time;

// class Timer {

//     contructor(resolve){
//         this.resolve = resolve;
//     }

//     resolve(date){
//         this.resolve(date);
//     }

// }

export default (buzzers) => class Utils {

    event = {};

    blinkBuzzerLeds(){
        setInterval(() => {
            buzzers.setLeds(true, true, true, true);
            setTimeout(() => {
            buzzers.setLeds(false, false, false, false);
            }, 500);
        }, 5000);
    }

    getClickType(ev){
        const startTime = new Date();
        const endTime = await new Promise((resolve) => {
            this.event ={
                ...event,
                [ev.controller]: {
                    [ev.button]: ((resolve) => ({
                        released(date){
                            resolve(date);
                        }
                    })(resolve))
                }
            }
        })
        return endTime - startTime > 3000 ? 'LONGPRESS' : 'NORMAL';
    }

    releaseEvent(ev){
        this.event[ev.controller][ev.button].released(new Date());
    }

}