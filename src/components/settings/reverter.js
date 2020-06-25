export default {
    data() {
        return {
            tcResponse: {},
            savedResponse: '{}',
        }
    },
    computed: {
        saveDisabled() { return this.loading || this.savedResponse == JSON.stringify(this.tcResponse) },
    },
    methods: {
        saveResponse() { this.savedResponse = JSON.stringify(this.tcResponse) },
        revert() { this.tcResponse = JSON.parse(this.savedResponse) },
    },
}