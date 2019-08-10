import Vue from 'vue'
import Vuex from 'vuex'
var firebase = require('firebase/app');

import router from './router'

import db from './main'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        usuario: '',
        error: '',
        tareas: [],
        tarea: { nombre: '', id: '' }
    },
    mutations: {
        setUsuario(state, payload) {
            state.usuario = payload
        },
        setError(state, payload) {
            state.error = payload
        },
        //aqui vamos a llenar el array de tareas
        setTareas(state, tareas) {
            //entra al arreglo vacio de state y lo iguala la coleccion que esta en firebase tareas
            state.tareas = tareas
        },
        setTarea(state, tarea) {
            state.tarea = tarea
        },
        eliminarTarea(state, id) {
            state.tareas = state.tareas.filter(doc => {
                return doc.id != id
            })
        }
    },
    actions: {
        crearUsuario({ commit }, payload) {
            firebase.auth().createUserWithEmailAndPassword(payload.email, payload.pass)
                .then(res => {
                    //console.log(res);
                    console.log(res.user.email);
                    console.log(res.user.uid);
                    commit('setUsuario', { email: res.user.email, uid: res.user.uid })

                    //crear una coleccion para el usuario
                    db.collection(res.user.email).add({
                            nombre: 'Tarea de ejemplo'
                        })
                        .then(() => {
                            router.push({ name: 'inicio' })
                        })
                })
                .catch(err => {
                    console.log(err.message);
                    commit('setError', err.message)
                })
        },
        ingresoUsuario({ commit }, payload) {
            firebase.auth().signInWithEmailAndPassword(payload.email, payload.pass)
                .then(res => {
                    console.log(res);
                    //console.log('Ingreso correctamente');
                    commit('setUsuario', { email: res.user.email, uid: res.user.uid })
                    router.push({ name: 'inicio' })
                })
                .catch(err => {
                    console.log(err.message);
                    commit('setError', err.message)
                })
        },
        detectarUsuario({ commit }, payload) {
            if (payload != null) {
                commit('setUsuario', { email: payload.email, uid: payload.uid })
            } else {
                commit('setUsuario', null)
            }
        },
        cerrarSesion({ commit }) {
            firebase.auth().signOut()
            commit('setUsuario', null)
            router.push({ name: 'ingreso' })
        },
        //aqui obtendremos las tareas que vienen de la db
        getTareas({ commit }) {
            //accediendo a info del usuairo activo, eso regresa
            const usuario = firebase.auth().currentUser
                //
            const tareas = []
            db.collection(usuario.email).get().then(snapchot => {
                snapchot.forEach(doc => {
                    // console.log(doc.id);
                    // console.log(doc.data());
                    let tarea = doc.data();
                    tarea.id = doc.id
                    tareas.push(tarea)
                })
            })

            commit('setTareas', tareas)
        },
        getTarea({ commit }, id) {
            //accediendo a info del usuairo activo, eso regresa
            const usuario = firebase.auth().currentUser
                //
            db.collection(usuario.email).doc(id).get()
                .then(doc => {
                    // console.log(doc.data());
                    // console.log(doc.id);
                    let tarea = doc.data();
                    tarea.id = doc.id
                    commit('setTarea', tarea)
                })
        },
        editarTarea({ commit }, tarea) {
            //accediendo a info del usuairo activo, eso regresa
            const usuario = firebase.auth().currentUser
                //
            db.collection(usuario.email).doc(tarea.id).update({
                    nombre: tarea.nombre
                })
                .then(() => {
                    router.push({ name: 'inicio' })
                })
        },
        agregarTarea({ commit }, nombre) {
            //accediendo a info del usuairo activo, eso regresa
            const usuario = firebase.auth().currentUser
                //
            db.collection(usuario.email).add({
                    nombre: nombre
                })
                .then(doc => {
                    console.log(doc.id);
                    router.push({ name: 'inicio' })
                })
        },
        eliminarTarea({ commit, dispatch }, id) {
            //accediendo a info del usuairo activo, eso regresa
            const usuario = firebase.auth().currentUser
                //
            db.collection(usuario.email).doc(id).delete()
                .then(() => {
                    console.log('Tarea eliminada');
                    //dispatch('getTareas')
                    commit('eliminarTarea', id)
                })
        }
    },
    getters: {
        //en los getters obtendremos un state para tener una respuesta de true o false
        existeUsuario(state) {
            if (state.usuario === null || state.usuario === '' || state.usuario === undefined) {
                return false
            } else {
                return true
            }
        }
    }
})