import { createApp } from 'vue';
import App from './App';
import components from '@/components/UI';
import router from '@/router/router';
import store from '@/store';
import '@/assets/main.css';
import '@/assets/fonts.css';

const app = createApp(App);

components.forEach((component) => {
  app.component(component.name, component);
});

app.use(router).use(store).mount('#app');
