function broadcast (componentName, eventName, ...args) {
    this.$children.forEach(child => {
        const name = child.$options.name;

        if (name === componentName) {
            child.$emit(eventName, ...args);
        } else {
            Reflect.apply(broadcast, child, [componentName, eventName, ...args]);
        }
    });
}
function globalEmit (eventName, ...args) {
    this.$children.forEach(child => {
        child.$emit(eventName, ...args);
        Reflect.apply(globalEmit, child, [eventName, ...args]);
    });
}

export default {
    methods: {
        dispatch (componentName, eventName, ...args) {
            let parent = this.$parent || this.$root;
            let name = parent.$options.name;

            while (parent && (!name || name !== componentName)) {
                parent = parent.$parent;

                if (parent) {
                    name = parent.$options.name;
                }
            }
            if (parent) {
                parent.$emit(eventName, ...args);
            }
        },
        global (event, ...args) {
            Reflect.apply(globalEmit, this.$root, [event, ...args]);
        },
        broadcast (componentName, eventName, ...args) {
            Reflect.apply(broadcast, this, [componentName, eventName, ...args]);
        }
    }
};
