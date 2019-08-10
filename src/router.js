import Vue from 'vue'
import Router from 'vue-router'
var firebase = require('firebase/app')

Vue.use(Router)

const router = new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [

        {
            path: '/registro',
            name: 'registro',
            component: () =>
                import ( /* webpackChunkName: "about" */ './views/Registro.vue')
        },
        {
            path: '/inicio',
            name: 'inicio',
            component: () =>
                import ( /* webpackChunkName: "about" */ './views/Inicio.vue'),
            meta: { requiresAuth: true }
        },
        {
            path: '/ingreso',
            name: 'ingreso',
            component: () =>
                import ( /* webpackChunkName: "about" */ './views/Ingreso.vue')
        }
    ]
})

//esto hara un recorrido por todas las rutas
router.beforeEach((to, from, next) => {
    //# Route Meta Fields esto regresa un true o false
    const rutaProtegida = to.matched.some(record => record.meta.requiresAuth);
    //si existe un usuario tendremo su info, else regresa u null
    const user = firebase.auth().currentUser;

    if (rutaProtegida === true && user === null) {
        //si no esta registrado, redirigeme a ingreso
        next({ name: 'ingreso' })
    } else {
        //el meta va ir directo aqui
        next()
    }

})

export default router;