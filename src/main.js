import { createApp } from 'vue';
import VueLoading from 'vue-loading-overlay';
import axios from 'axios';
import VueAxios from 'vue-axios';
import 'bootstrap';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'animate.css';
import WaveUI from 'wave-ui';
import 'wave-ui/dist/wave-ui.css';
import 'vue-loading-overlay/dist/vue-loading.css';
import VueEasyLightbox from 'vue-easy-lightbox';
import {
  Field, Form, ErrorMessage, defineRule, configure,
} from 'vee-validate';
import { required, email, min } from '@vee-validate/rules';
import { localize, setLocale } from '@vee-validate/i18n';
import zhTW from '@vee-validate/i18n/dist/locale/zh_TW.json';
import AOS from 'aos';
import { date, currency } from './methods/filters';
import App from './App.vue';
import router from './router';
import 'aos/dist/aos.css';

defineRule('required', required);
defineRule('email', email);
defineRule('min', min);
configure({
  generateMessage: localize({ zh_TW: zhTW }),
  validateOnInput: true,
});
setLocale('zh_TW');
const app = createApp(App);
(() => new WaveUI(app, {}))();
app.component('VForm', Form);
app.component('VField', Field);
app.component('ErrorMessage', ErrorMessage);
app.config.globalProperties.$filters = {
  currency, date,
};
app.use(VueLoading);
app.use(VueAxios, axios);
app.use(router);
app.use(VueEasyLightbox);
AOS.init({
  duration: 1200,
});
app.mount('#app');
