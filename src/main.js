import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';
import 'element-plus/dist/index.css';
// import './index.css';

import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

library.add(fas);

createApp(App).component('fa', FontAwesomeIcon).use(store).use(router)
  .mount('#app');
