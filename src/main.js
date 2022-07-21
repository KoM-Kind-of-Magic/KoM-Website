import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';
// import * as fbrand from '@fortawesome/free-brands-svg-icons';
// import * as fregular from '@fortawesome/free-regular-svg-icons';

import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

library.add(fas);

createApp(App).component('fa', FontAwesomeIcon).use(store).use(router)
  .mount('#app');
