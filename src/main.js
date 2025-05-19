
import { createApp } from 'vue'


import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { aliases, mdi } from 'vuetify/iconsets/mdi'

import App from './App.vue'
import store from './store';
import router from './router';
import './style.css'


import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import { faUser, faLock } from '@fortawesome/free-solid-svg-icons'

import { ModuleRegistry, AllCommunityModule } from 'ag-grid-community';


import VueToast from 'vue-toast-notification'
import 'vue-toast-notification/dist/theme-sugar.css' 



const vuetify = createVuetify({
    components,
    directives,
    icons: {
        defaultSet: 'mdi',
        aliases,
        sets: {
            mdi,
        },
    },
})

const appInstance = createApp(App);
appInstance.use(store);
appInstance.use(router);

appInstance.use(VueToast)


ModuleRegistry.registerModules([AllCommunityModule]);


library.add(faUser, faLock)

appInstance.component('font-awesome-icon', FontAwesomeIcon)

appInstance.use(vuetify).mount('#app')


