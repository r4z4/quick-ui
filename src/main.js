import { createApp } from 'vue'
import { createStore } from 'vuex'
import App from './App.vue'
import { student } from './store/student.js';

const store = createStore({
    modules: {
        student
    }
})

createApp(App).use(store).mount('#app')
