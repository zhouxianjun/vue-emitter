# vue-emitter

Simple vue emitter mixin

### Installation

```
npm install vue-emitter --save
```

```
import VueEmitter from 'vue-emitter'

export default {
    name: 'example',
    mixins: [ VueEmitter ]
}
```

### Usage

Send event

```
this.dispatch(`component name`, 'event name', this.data);
```

Listen event

```
this.$on('event name', fn);
```
