<!--<template>
    <div>
        <h1>Ruta protegida</h1>
        {{usuario}}
        <h3>Bienvenido!! {{usuario.email}}</h3>
    </div>
</template> -->

<template>
    <div>
        <h1>Lista de tareas</h1>
        <router-link :to="{name: 'agregar'}">
            <button class="btn btn-success btn-block">Agregar</button>
        </router-link>

        <div v-if="carga" class="text-center mt-5">
            <h3>Cargando contenido... </h3>    
            <pulse-loader :loading="loading"></pulse-loader>
        </div>

        <ul class="list-group mt-5" v-if="!carga">
            <li class="list-group-item"
                v-for="item of tareas" :key="item.id">
                {{item.id}} - {{item.nombre}}
                <div class="float-right">
                    <router-link class="btn btn-warning btn-sm mr-2" 
                                :to="{name: 'editar', params: {id: item.id}}">
                        Editar
                    </router-link>
                    <button @click="eliminarTarea(item.id)" class="btn btn-danger btn-sm">Eliminar</button>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
import {mapState, mapActions} from 'vuex';
import PulseLoader from 'vue-spinner/src/PulseLoader.vue'
export default {
    name: 'Inicio',
    computed: {
        ...mapState(['usuario', 'tareas','carga'])
    },
    methods: {
        ...mapActions(['getTareas', 'eliminarTarea'])
    },
    created() {
        this.getTareas()
    },
    components: {
    PulseLoader
  }
}
</script>