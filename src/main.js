import { createApp } from 'vue';
import App from './App';
import router from '@/router/router';
import '@/assets/main.css';

createApp(App).use(router).mount('#app');
