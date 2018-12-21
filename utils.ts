
class Timer {

    constructor(public resolve: any){
    }

    released(date){
        this.resolve(date);
    }

}

export default (buzzers: any) => class Utils {

    event = {};

    blinkBuzzerLeds(){
        setInterval(() => {
            buzzers.setLeds(true, true, true, true);
            setTimeout(() => {
            buzzers.setLeds(false, false, false, false);
            }, 500);
        }, 5000);
    }

    async getClickType(ev){
        const startTime: any = new Date();
        const endTime: any = await new Promise<Date>((resolve) => {
            this.event ={
                ...event,
                [ev.controller]: {
                    [ev.button]: new Timer(resolve)
                }
            }
        })
        return (endTime - startTime) > 3000 ? 'LONGPRESS' : 'NORMAL';
    }

    releaseEvent(ev){
        this.event[ev.controller][ev.button].released(new Date());
    }

}