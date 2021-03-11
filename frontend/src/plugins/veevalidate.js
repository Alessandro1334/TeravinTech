import Vue from 'vue'
import * as VeeValidate from 'vee-validate'
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import id from 'vee-validate/dist/locale/id.json';
import { localize, extend } from 'vee-validate'
import { required, email, min, confirmed, mimes, numeric } from 'vee-validate/dist/rules'

// The types of validators used in the project
extend('required', required)
extend('confirmed', confirmed)
extend('email', email)
extend('min', min)
extend('mimes', mimes)
extend('numeric', numeric)
extend('url', {
    validate: (str) => {
        const pattern = new RegExp(
            '^(https?:\\/\\/)?' + // protocol
            '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
            '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
            '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
            '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
            '(\\#[-a-z\\d_]*)?$',
            'i'
        ) // fragment locator
        return !!pattern.test(str)
    }
})

localize('id', id)

Vue.use(VeeValidate)
Vue.component('ValidationProvider', ValidationProvider)
Vue.component('ValidationObserver', ValidationObserver)
export default VeeValidate