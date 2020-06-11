export default {
    computed: {
        filterRequest() { return this.arrayOfBasicObjectsToObject(this.selectedFilters.map(a => { return { [a.request]: a.attributes ? a.attributes[a.items.findIndex(attr => attr === (a.selected || a.default))] : (a.selected || a.default) } })) },
    },
}