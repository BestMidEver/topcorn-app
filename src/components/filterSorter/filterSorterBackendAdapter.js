export default {
    computed: {
        filterRequest() {
            return this.arrayOfBasicObjectsToObject(this.selectedFilters.map(a => {
                if(a.attributes) {
                    if(Array.isArray(a.selected)) return { [a.request]: a.selected.map(selected => a.attributes[a.items.findIndex(attr => attr === (selected || a.default[0]))]) }
                    const returnData = a.attributes[a.items.findIndex(attr => attr == (a.selected || a.default))]
                    return { [a.request]: a.type === 'custom-multi-select' ? this.parseArray(returnData) : returnData }
                }
                const returnData = a.selected || a.default
                return { [a.request]: a.type === 'custom-multi-select' ? this.parseArray(returnData) : returnData }
            }))
        },
    },
}