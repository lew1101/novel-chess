export default function reactiveClass(
    constructor: { new (...props: any): any },
    notifyUponUpdate: boolean = false
) {
    class contractifiedConstructor extends constructor {
        subs = [];

        constructor(...props) {
            super(...props);
        }

        subscribe(cb) {
            this.subs.push(cb);
            cb(this);

            return () => {
                const i = this.subs.findIndex((fn) => fn === cb);
                this.subs.splice(i, 1);
            };
        }

        notifySubscribers() {
            this.subs.forEach((sub) => sub(this));
        }
    }

    return function proxyConstructor(
        ...props: any
    ): ProxyHandler<contractifiedConstructor> | contractifiedConstructor {
        const instance = new contractifiedConstructor(...props);
        if (notifyUponUpdate)
            return new Proxy(instance, {
                set: function (target, key, value) {
                    target[key as string] = value;
                    target.notifySubscribers();
                    return true;
                },
            });
        else return instance;
    };
}
