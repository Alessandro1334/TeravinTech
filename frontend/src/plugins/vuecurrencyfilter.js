import Vue from 'vue';
import VueCurrencyFilter from 'vue-currency-filter'

const config = {
    symbol: 'Rp.',
    thousandsSeparator: '.',
    fractionCount: 0,
    fractionSeparator: ',',
    symbolPosition: 'front',
    symbolSpacing: true
}

Vue.use(VueCurrencyFilter, [config])

export default VueCurrencyFilter
