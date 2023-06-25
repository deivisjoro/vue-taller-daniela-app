<script setup>
    import { computed, reactive } from "vue";

    const array = reactive(
                            [ 
                                {server: "Server Up", tam: 10,},
                                {server: "Servers development", tam: 20,}, 
                                {server: "Server Production", tam: 40,},
                                {server: "Server Offline", tam: 10,}
                            ]
    );

    const utilizado = computed(()=>{
        const suma = array.reduce((acumulador, server)=>{
            return acumulador + server.tam;
        }, 0);
        return suma;
    })

    const libre = computed(()=>{
        const resultado = 1000 -  array.reduce((acumulador, server)=>{
            return acumulador + server.tam;
        }, 0);
        return resultado;
    })

    const aumentar = (index) =>{
        array[index].tam++;
    }

    const porcentaje = computed(() => {
        const resultado = (array.reduce((acumulador, server)=>{
            return acumulador + server.tam;
        }, 0) / 1000) * 100;
        return resultado;
    })

</script>


<template>
    <h2>Prueba los botones de cada servidor</h2>
    <div class="monitor-container">

        <div class="cards">
            <div 
                :class="{blue:i===0, lightblue:i===1, yellow:i===2, red:i===3}" 
                v-for="(server, i) in array" 
                :key="i">
                {{ server.server }}: {{ server.tam }}
                <br>
                <button @click="aumentar(i)"> + </button>
            </div>
        </div>

        <div class="monitor-content">

            <div class="head">
                <div>
                    <span>Day</span>
                    <span class="active">Month</span>
                    <span>Year</span>
                </div>
                <div class="download">
                    <img src="images/download_icon.png" alt="icono download">
                </div>
            </div>

            <div class="body title">
                <span class="text">
                    Uso de almacenamiento
                </span>
                <img src="images/close_icon.png" alt="icono cerrar">
            </div>

            <div class="body content">
                <section>
                    <h3>Almacenamiento local</h3>
                    <div>
                        <div :style="{width: porcentaje+'%'}"></div>
                    </div>
                    <p class="capacity"><span>{{ utilizado }}</span> GB</p>
                    <p class="total">Total</p>
                    <ul>
                        <li>                       
                            <div>
                                <span class="fill"></span>
                                <span>Espacio utilizado </span>
                            </div>
                            <div>{{ utilizado }} GB</div>
                        </li>
                        <li>                       
                            <div>
                                <span></span>
                                <span>Espacio libre </span>
                            </div>
                            <div>{{ libre }} GB</div>
                        </li>
                    </ul>
                </section>
                <section>
                    <h3>Almacenamiento de Cloud Bank</h3>
                    <div></div>
                    <p class="capacity"><span>0</span> B</p>
                    <p class="total">Total</p>
                    <ul>
                        <li>                       
                            <div>
                                <span class="fill"></span>
                                <span>Espacio utilizado </span>
                            </div>
                            <div>0 B</div>
                        </li>
                        <li>                       
                            <div>
                                <span></span>
                                <span>Espacio libre </span>
                            </div>
                            <div>0 B</div>
                        </li>
                    </ul>
                </section>
            </div>

        </div>

    </div>
</template>

<style scoped>

</style>