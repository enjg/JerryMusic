import App from './App.vue'
import {
	createApp
} from 'vue'
import {
	createPinia
} from 'pinia'
import Player from '@/pages/module/player.vue'

const app = createApp(App);
app.use(createPinia());
app.component("Player", Player);
app.mount('#app');