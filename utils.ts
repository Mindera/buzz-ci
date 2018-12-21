
class Timer {

    private resolve;
    private alreadyResolved = false;
    private releaseDate;

    released(date){
        if(this.resolve){
            this.resolve(date);
        } else {
            this.alreadyResolved = true;
            this.releaseDate = date;
        }
    }

    setResolve(resolve){
        if(this.alreadyResolved){
            resolve(this.releaseDate);
        }
        this.resolve = resolve;
    }

}

export default (buzzers: any) => class Utils {

    private event = {};

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
            this.event[ev.controller][ev.button].setResolve(resolve);
        })
        return (endTime - startTime) > 3000 ? 'LONGPRESS' : 'NORMAL';
    }

    clickEvent(ev){
        this.event ={
            ...this.event,
            [ev.controller]: {
                [ev.button]: new Timer()
            }
        }
    }

    releaseEvent(ev){
        this.event[ev.controller][ev.button].released(new Date());
    }

}