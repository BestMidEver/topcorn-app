import Vue from 'vue'

Vue.mixin({
    filters: {
        plural: function (singularVersion, count, pluralVersion) { return count > 1 ? pluralVersion : singularVersion }
    },
    methods: {
        mergeArrayWith: (array, mergeWith = ', ') => array && array.join(mergeWith),
        isTrue: value => ((value && value.length > 0) || value > 0 || value === true || !$.isEmptyObject(value)),
        isFalse(value){ return !this.isTrue(value) },
        isAnyTrue(array){ return array.map(a => this.isTrue(a)).includes(true) },
        isAnyFalse(array){ return array.map(a => this.isTrue(a)).includes(false) },
        isAllTrue(array){ return !this.isAnyFalse(array) },
        isAllFalse(array){ return !this.isAnyTrue(array) },
        randomString(length = 7){ return Math.random().toString(36).substr(2, length) },
        capitalizeFirstLetter: (string) => string.charAt(0).toUpperCase() + string.slice(1),
        dateToYear: (date, seperator) => date.split(seperator || '-')[0],
        isStringStartWith: (str, startWith) => {const paths = Array.isArray(startWith) ? startWith : [startWith]; return paths.some(path => { return str.indexOf(path) === 0 })},
        roundTo: (number, over = 1) => Math.round((number + Number.EPSILON) * over) / over
    }
})