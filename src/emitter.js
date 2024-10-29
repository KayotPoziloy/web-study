export class EventEmitter {
    subscribe(callback) {
        this.subscribers.push(callback)
        return () => {
            this.subscribers = this.subscribers.filter((s) => callback !== s)
        }
    }

    dispatchEvent() {
        this.subscribers.forEach((subscriber) => {
            subscriber();
        })
    }
}