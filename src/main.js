import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

//firebase
var firebase = require('firebase/app');

require('firebase/auth');
// require('firebase/database');

var firebaseConfig = {
    apiKey: "AIzaSyCrTqsZZyp2-Kq4u90IVALsLInj0MxFiNA",
    authDomain: "crudvue-70b72.firebaseapp.com",
    databaseURL: "https://crudvue-70b72.firebaseio.com",
    projectId: "crudvue-70b72",
    storageBucket: "crudvue-70b72.appspot.com",
    messagingSenderId: "881395870806",
    appId: "1:881395870806:web:c49b8f50fd7e0d80"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

Vue.config.productionTip = false

firebase.auth().onAuthStateChanged((user) => {
    console.log(user);
    if (user) {
        //llamando una acction
        store.dispatch('detectarUsuario', { email: user.email, uid: user.uid })
    } else {
        store.dispatch('detectarUsuario', null)
    }
})

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')