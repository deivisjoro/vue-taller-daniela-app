<script setup>

    defineOptions({
        inheritAttrs: false
    })
   
    const props = defineProps({
        fnOpenModal: Function,
        registros: Array
    })

    const emisores = defineEmits(['onEditar', 'onEliminar']);

    const openModal = () =>{
        fnOpenModal();
    }

    const editar = (index)=>{
        emisores('onEditar', index);
    }

    const eliminar = (index)=>{  
        emisores('onEliminar', index);
    }


</script>

<template>
    <div class="table-options">

        <a href="#" id="link-crear-registro" @click.prevent="fnOpenModal"> 
            <img src="images/add_icon.png" alt="icono agregar">
            Crear registro
        </a>

    </div>
    <table class="table" id="tabla-registros">
        <thead>
            <tr>
                <th>Nombre Servidor</th>
                <th>Sistema Operativo</th>
                <th>Version</th>
                <th>IP</th>
                <th>Ambiente</th>
                <th>Aplicacion</th>
                <th>Acciones</th>
            </tr>
        </thead>

        <tbody>
            <tr v-for="(registro, i) in registros" :key="i+registro.servidor">
                <td>{{ registro.servidor }}</td>
                <td>{{ registro.so }}</td>
                <td>{{ registro.version }}</td>
                <td>{{ registro.ip }}</td>
                <td>{{ registro.ambiente }}</td>
                <td>{{ registro.aplicacion }}</td>
                
                <td>                
                    <a href="#">
                        <img src="images/edit_icon.png" alt="icono editar" class="editar" @click.prevent="editar(i)">
                    </a>               
                    <a href="#">
                        <img src="images/delete_icon.png" alt="icono eliminar"  class="eliminar" @click.prevent="eliminar(i)">
                    </a>
                </td>
            </tr>
        </tbody>
    </table>

</template>

<style scoped>

</style>