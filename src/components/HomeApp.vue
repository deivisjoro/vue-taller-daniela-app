<script setup>

    import { getCurrentInstance } from "vue";
    const instance = getCurrentInstance();

    const emisores = defineEmits(['onCkeck']);

    const emitirCheck = () => {
        emisores('onCkeck');    
    }

</script>


<template>
    <header class="header">
        <div>
            <img src="images/computer_icon.png" alt="Icono del pc" id="icono-pc" @click="emitirCheck">
            <div>
                <h1>Tablero del Sistema</h1>
                <small>unicordoba-vsa</small>
            </div>
        </div>
        <div>
            <img src="images/table_icon.png" alt="Icono de tabla">
        </div>
    </header>
    <div class="contenido-principal">

        <section class="izquierda">

            <header>
                <h3>
                    Estado
                </h3>
            </header>
            <ul>
                <li>
                    <span>Servicios de datos</span>
                    <span>
                        <span class="circulo"></span>
                        <a href="#">Aceptar</a>
                    </span>                        
                </li>
                <li>
                    <span>Licencia</span>
                    <span>                            
                        <span class="circulo"></span>
                        <a href="#">Aceptar</a>
                    </span>
                </li>
                <li>
                    <span>Almacenamiento</span>
                    <span>
                        <span class="circulo"></span>
                        <a href="#">Aceptar</a>
                    </span>
                </li>
                <li>
                    <span>Soporte remoto</span>
                    <span>
                        <span class="circulo"></span>
                        <a href="#">Aceptar</a>
                    </span>
                </li>
            </ul>

        </section>

        <section class="derecha">

            <header>
                <h3>
                    Informacion del Sistema
                </h3>
                <img src="images/pencil_icon.png" alt="Icono editar">
            </header>

            <article>

                <section>
                    <ul>
                        <li>
                            <strong>Nombre VM:</strong>
                            App Server
                        </li>
                        <li>
                            <strong>Memoria Asignada:</strong>
                            32GiB
                        </li>
                        <li>
                            <strong>Disco asignado:</strong>
                            200GiB
                        </li>
                        <li>
                            <strong>Procesadores:</strong>
                            4Vcpu
                        </li>
                        <li>
                            <strong>Version SO:</strong>
                            Ubuntu Server 22.04
                        </li>
                        <li>
                            <strong>IP privada:</strong>
                            10.0.23.12
                        </li>
                        <li>
                            <strong>Nombre Dominio:</strong>
                            appdllo.unicordoba.edu.co
                        </li>
                        <li>
                            <strong>Ubicacion:</strong>
                            Datacenter
                        </li>
                    </ul>

                </section>

                <section>
                    <h4>Aplicaciones instaladas</h4>
                    <ul>
                        <li>MySQL 8.0</li>
                        <li>Apache 2.4</li>
                        <li>Certificados en linea</li>
                        <li>Egresados</li>
                    </ul>
                </section>

            </article>
            
        </section>

    </div>
</template>

<style scoped>

</style>