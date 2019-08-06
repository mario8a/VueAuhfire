<template>
    <div>
        <h1>Registro de usuarios</h1>
        <form>
            <input type="email" v-model="email">
            <input type="password" v-model="pass1">
            <input type="password" v-model="pass2">
            <button type="submit">Crear usuario</button>
        </form>
    </div>
</template>

<script>
export default {
    name: 'Registro',
    data() {
        return {
            email: '',
            pass1: '',
            pass2: ''
        }
    },
}
</script>