<script setup>

</script>


<template>
    <div class="table-options">

        <a href="#" id="link-crear-registro"> 
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
            <tr id="fila-1">
                <td>Linux Centos</td>
                <td>Linux</td>
                <td>8.3</td>
                <td>127.0.0.1</td>
                <td>Desarrollo</td>
                <td>Contabilidad</td>
                <td>                
                    <a href="#" data-fila="1">
                        <img src="images/edit_icon.png" alt="icono editar"  class="editar">
                    </a>               
                    <a href="#" data-fila="1">
                        <img src="images/delete_icon.png" alt="icono eliminar"  class="eliminar">
                    </a>
                </td>
            </tr>
            <tr id="fila-2">
                <td>Windows Server</td>
                <td>Windows</td>
                <td>11</td>
                <td>127.0.0.1</td>
                <td>Desarrollo</td>
                <td>Talento humano</td>
                <td>
                    <a href="#" data-fila="2">
                        <img src="images/edit_icon.png" alt="icono editar" class="editar">
                    </a> 
                    <a href="#" data-fila="2">
                        <img src="images/delete_icon.png" alt="icono eliminar" class="eliminar">
                    </a>          
                </td>
            </tr>
            <tr id="fila-3">
                <td>Debian</td>
                <td>Linux</td>
                <td>12</td>
                <td>127.0.0.1</td>
                <td>Produccion</td>
                <td>Facturacion</td>
                <td>
                    <a href="#" data-fila="3">
                        <img src="images/edit_icon.png" alt="icono editar" class="editar">
                    </a>
                    <a href="#" data-fila="3">
                        <img src="images/delete_icon.png" alt="icono eliminar" class="eliminar">
                    </a>           
                </td>
            </tr>
        </tbody>
    </table>

</template>

<style scoped>

</style>