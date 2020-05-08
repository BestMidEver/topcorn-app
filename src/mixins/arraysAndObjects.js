import Vue from 'vue'

Vue.mixin({
    methods: {
        distinctArrayOfObjects(array) {
            const map = new Map();
            const result = [];
            for (const item of array) {
                if(!map.has(item.id)){
                    map.set(item.id, true);
                    result.push(item);
                }
            }
            return result
        },
    }
})