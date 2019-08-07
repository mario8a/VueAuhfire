<template>
    <div>
        <h1>Registro de usuarios</h1>
        <!-- los data de la vista estan pasando como parametros -->
        <form @submit.prevent="crearUsuario({email: email, pass:pass1})">
            <input type="email" v-model="email">
            <input type="password" v-model="pass1">
            <input type="password" v-model="pass2">
            <button type="submit" :disabled="!desactivar" >Crear usuario</button>
        </form>
        <p>{{error}}</p>
    </div>
</template>

<script>

import {mapActions, mapState} from 'vuex'

export default {
    name: 'Registro',
    data() {
        return {
            email: '',
            pass1: '',
            pass2: ''
        }
    },
    methods: {
        ...mapActions(['crearUsuario'])
    },
    computed: {
        ...mapState(['error']),
        desactivar(){
            return this.pass1 === this.pass2 && this.pass2 != ''
        }
    }
}
</script>