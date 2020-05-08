import Vue from 'vue'

Vue.mixin({
    methods: {
        rateCodeToText: rateCode => {
            if(rateCode === 1) return 'Garbage'
            if(rateCode === 2) return 'Bad'
            if(rateCode === 3) return 'Not Sure'
            if(rateCode === 4) return 'Good'
            if(rateCode === 5) return 'Legendary'
        }
    }
})