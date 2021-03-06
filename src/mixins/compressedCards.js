export default {
    computed: {
        buttonClass: function() {
            if(['movie', 'series', 'list'].includes(this.type)) {
                if(this.dataLength < 3) return 'd-none'
                if(this.dataLength < 4) return 'd-md-none'
                if(this.dataLength < 5) return 'd-lg-none'
                if(this.dataLength < 7) return 'd-xl-none'
                return ''
            }
            if(['person'].includes(this.type)) {
                if(this.dataLength < 4) return 'd-none'
                if(this.dataLength < 5) return 'd-sm-none'
                if(this.dataLength < 7) return 'd-md-none'
                return ''
            }
            if(['user'].includes(this.type)) {
                if(this.dataLength < 1) return 'd-none'
                return ''
            }
            if(['profile-image-card'].includes(this.type)) {
                if(this.dataLength < 2) return 'd-none'
                if(this.dataLength < 3) return 'd-md-none'
                if(this.dataLength < 4) return 'd-lg-none'
                if(this.dataLength < 5) return 'd-xl-none'
                return ''
            }
        }
    },
}