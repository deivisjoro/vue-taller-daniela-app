<script setup>
  import { ref, onMounted, reactive } from 'vue';
  import FooterApp from "./components/common/FooterApp.vue";

  const linkActivo = ref('home');
  const checked = ref(false);
  const showModal = ref(false);
  const actionModal = ref('ingresar');
  const error = ref(false);

  const inputServidor = ref('');
  const inputSo = ref('');
  const inputVersion = ref('');
  const inputIp = ref('');
  const inputAmbiente = ref('');
  const inputAplicacion = ref('');
  let registroEditar = 0;

  onMounted(() => {
    inputServidor.value.focus();
  })
  
  const fnChecked = () => {
    checked.value = !checked.value;
  }

  const fnOpenModal = () =>{
    showModal.value = true;
    actionModal.value = 'ingresar';
    clearInputs();
    inputServidor.value.focus();
  }

  const clearInputs = ()=>{
    inputServidor.value.value = '';
    inputSo.value.value = '';
    inputVersion.value.value = '';
    inputIp.value.value = '';
    inputAmbiente.value.value = '';
    inputAplicacion.value.value = '';  
  }

  const fnCloseModal = (e) =>{
    if(!e.target.classList.contains('modal-container'))
            return;
    showModal.value = false;
  }

  let registros = reactive([
    { 
        servidor: 'Linux Centos', 
        so: 'Linux', 
        version: '8.3', 
        ip: '127.0.0.1', 
        ambiente: 'Desarrollo', 
        aplicacion: 'Contabilidad'
    },  
    { 
        servidor: 'Windows Server', 
        so: 'Windows', 
        version: '11', 
        ip: '127.0.0.1', 
        ambiente: 'Desarrollo', 
        aplicacion: 'Talento humano' 
    },  
    { 
        servidor: 'Debian', 
        so: 'Linux', 
        version: '12', 
        ip: '127.0.0.1', 
        ambiente: 'Produccion', 
        aplicacion: 'Facturacion' 
    }
  ]);

  const fnSaveItem = () => {

    error.value = false;

    if(inputServidor.value.value.trim()==='' || inputSo.value.value.trim()==='' || inputVersion.value.value.trim()==='' || inputIp.value.value.trim()==='' || inputAmbiente.value.value.trim()==='' || inputAplicacion.value.value.trim()===''){
        error.value = true;
        inputServidor.value.focus();
        return;
    }  
    
    const item = {
        servidor: inputServidor.value.value,
        so: inputSo.value.value,
        version: inputVersion.value.value,
        ip: inputIp.value.value,
        ambiente: inputAmbiente.value.value,
        aplicacion: inputAplicacion.value.value,
    }

    if(actionModal.value==='ingresar'){
        registros.push(item);
    } 
    else if(actionModal.value==='editar'){
        registros[registroEditar] = item;   
    } 
    
    showModal.value = false;
  }

  const fnLoadItem = (index)=>{
    actionModal.value = 'editar';
    registroEditar = index;
    inputServidor.value.value = registros[index].servidor;
    inputSo.value.value = registros[index].so;
    inputVersion.value.value = registros[index].version;
    inputIp.value.value = registros[index].ip;
    inputAmbiente.value.value = registros[index].ambiente;
    inputAplicacion.value.value = registros[index].aplicacion; 
    showModal.value = true;
    inputServidor.value.focus();

  }

  const fnDeleteItem = (index)=>{
    const item = registros[index];
    if(item===undefined){
        alert('Error al eliminar registro');
        return;
    }

    if(!confirm('Desea eliminar el registro '+item.servidor+' ?')) return;

    registros.splice(index, 1);
  }
  
</script>

<template>
  <input type="checkbox" id="nav-toggle" v-model="checked">
  <aside class="sidebar">
      <h2 class="sidebar__brand">
          <span>
              <label for="nav-toggle" id="btn-menu">
                  <span class="las la-bars"></span>
              </label>
          </span>            
          <span id="link-inicio">
              <router-link to="/" @click="linkActivo='home'">StoreOnce</router-link>
          </span>
      </h2>
      <nav class="sidebar__menu">
          <ul>
              <li @click="linkActivo='monitor'">
                  <router-link to="/monitor" id="link-monitor" :class="{active: linkActivo==='monitor'}">
                      <span class="las la-igloo"></span>
                      <span>Monitor</span>
                  </router-link>
              </li>
              <li @click="linkActivo='registros'">
                  <router-link to="/registros" id="link-registros" :class="{active: linkActivo==='registros'}">
                      <span class="las la-clipboard-list"></span>
                      <span>Registros</span>
                  </router-link>
              </li>
              <li @click="linkActivo='datos'">
                  <router-link to="/datos" :class="{active: linkActivo==='datos'}">
                      <span class="las la-address-book"></span>
                      <span>Datos</span>
                  </router-link>                    
              </li>
              <li @click="linkActivo='ayuda'">
                  <router-link to="/ayuda" :class="{active: linkActivo==='ayuda'}">
                      <span class="las la-question-circle"></span>
                      <span>Ayuda</span>
                  </router-link>
              </li>
          </ul> 
      </nav>
  </aside>
  <main class="main-content">
    <router-view 
        @onCkeck="fnChecked" 
        :fnOpenModal="fnOpenModal" 
        :registros="registros" 
        @onEditar="fnLoadItem($event)" 
        @onEliminar="fnDeleteItem($event)"
    >
    </router-view>     
  </main>
  <FooterApp />
  <div class="modal-container" :class="{'modal-hide': !showModal}" @click="fnCloseModal($event)">    
      <div class="modal-dialog">
          <form @submit.prevent="fnSaveItem">
              <span>Registro</span>            
              <br>
              <input ref="inputServidor" type="text" name="servidor" id="servidor" placeholder="Nombre servidor" />
              <input ref="inputSo" type="text" name="so" id="so" placeholder="Sistema operativo" />
              <input ref="inputVersion" type="text" name="version" id="version" placeholder="Version" />
              <input ref="inputIp" type="text" name="ip" id="ip" placeholder="ip" />
              <input ref="inputAmbiente" type="text" name="ambiente" id="ambiente" placeholder="ambiente" />
              <input ref="inputAplicacion" type="text" name="aplicacion" id="aplicacion" placeholder="aplicacion" />
  
              <button type="submit">
                  Guardar
              </button>
              
              <div class="error" v-if="error">
                Todos los campos son obligatorios
              </div>
  
          </form>
  
      </div>
  </div>
</template>

<style>
:root{
    --principal: rgb(5, 21, 73);
    --oscuro: #1D2231;
    --texto-gris: #8390A2;
}

*{
    padding: 0;
    margin: 0;
    box-sizing: border-box;
    list-style-type: none;
    text-decoration: none;
    font-family: Arial, Helvetica, sans-serif;
}


#nav-toggle{
    display: none;
}

.sidebar{
    width: 300px;
    background-color: var(--principal);
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 100;
    transition: width 300ms;
}

.sidebar__brand{
    height: 90px;
    padding: 1rem 0 1rem 2rem;
    color: #fff;
    display: flex;
    align-items: center;
}

.sidebar__brand span a{
    color: #fff;
}

.sidebar__brand span{
    display: inline-block;
    padding-left: 1rem;
}

#btn-menu:hover{
    cursor: pointer;
}

.sidebar__menu{
    margin-top: 1rem;
}

.sidebar__menu li{
    width: 100%;
}

.sidebar__menu a{
    display: block;
    color: #fff;
    font-size: 1rem;
    padding: 1rem;
}

.sidebar__menu a:hover{
    color: #d8a80c;
    background-color: rgb(25, 50, 133);
}

.sidebar__menu a.active{
    background-color: #fff;
    padding-top: 0.8rem;
    padding-bottom: 0.8rem;
    color: var(--principal);
    border-radius: 30px 0 0 30px;
}

.sidebar__menu a span:first-child{
    padding-right: .5rem;
}

#nav-toggle:checked + .sidebar{
    width: 70px;
}

#nav-toggle:checked + .sidebar .sidebar__brand,
#nav-toggle:checked + .sidebar li{
    padding-left: .2rem;
    text-align: center;
}

#nav-toggle:checked + .sidebar .sidebar__brand > span:last-child,
#nav-toggle:checked + .sidebar li a span:last-child{
    display: none;
}

#nav-toggle:checked + .sidebar .sidebar__brand > span:first-child{
    margin-left: -15px;
}

#nav-toggle:checked ~ .main-content{
    margin-left: 70px;
}

#nav-toggle:checked ~ .main-content header{
    width: calc(100% - 70px);
    left: 70px;
}

.main-content{
    margin-left: 300px;
    transition: margin-left 300ms;
    padding: 30px;
}

.header{
    display: flex;
    justify-content: space-between;
}

.header div:first-child{
    display: flex;
    align-items: center;
}

.header div:first-child img{
    height: 30px;
}

.header div:first-child div{
    margin-left: 10px;
    color: var(--principal);
}

.header div:first-child div h1{
    font-weight: bold;
    font-size: 20px;
}

.header div:first-child div small{
    font-size: 14px;
    margin-left: 2px;
    color: rgb(77, 73, 73);
}

.contenido-principal{
    margin-top: 30px;
    display: flex;
}

.contenido-principal .izquierda{
    flex: 3;
}

.contenido-principal .derecha{
    flex: 7;
    margin-left: 20px;
}

.contenido-principal > section{
    border: 1px solid #bebbbbaf;
    padding: 20px;
}

.contenido-principal h3{
    font-size: 16px;
}

.contenido-principal ul{
    margin-top: 20px;
}

.contenido-principal .izquierda li{
    width: 100%;
    display: flex;
    justify-content: space-between;
    padding: 5px 0;
    font-size: 13px;
}

.contenido-principal .izquierda li span:last-child{
    margin-right: 20px;
    display: flex;
    align-items: center;
}

.contenido-principal .izquierda li a{
    text-decoration: underline;
    color: #166d16;
}

.circulo{
    display: inline-block;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background-color: rgb(5, 88, 5);
    margin: 0 5px;
}

.contenido-principal .derecha header{
    display: flex;
    justify-content: space-between;
}

.derecha article{
    display: flex;
}

.derecha article > section:first-child{
    border-right: 1px solid #ccc;
    padding-right: 10px;
}

.derecha article > section:last-child{
    padding-left: 10px;
}

.derecha li{
    padding: 5px 0;
    font-size: 13px;
}

.derecha h4{
    font-size: 13px;
    margin-top: 30px;
}

footer{
  position: fixed;
  bottom: 0;
  width: 100%;
  z-index: 1000;
  text-align: center;
  background-color: #fff;
  color: #494a4b;
  border-top: 1px solid rgba(0, 0, 0, 0.2);
  padding: 15px;
}

#icono-pc:hover{
    cursor: pointer;
}

.table {
    border-collapse: collapse;
    margin: 25px 0;
    font-size: 0.9em;
    min-width: 400px;
    border-radius: 5px 5px 0 0;
    overflow: hidden;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);
    width: 100%;
}

.table thead tr {
    background-color: #7864d3;
    color: #ffffff;
    text-align: left;
    font-weight: bold;
}

.table th,
.table td {
    padding: 12px 15px;
}

.table tbody tr {
    border-bottom: 1px solid #dddddd;
}

.table tbody tr:nth-of-type(even) {
    background-color: #f3f3f3;
}

.table tbody tr:last-of-type {
    border-bottom: 2px solid #7864d3;
}

.table tbody tr:hover {
    color: #fff;
    background-color: #654cd4;
    cursor: pointer;
}

.modal-container{
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
}

.modal-hide{
    display: none!important;
}

.modal-dialog{
    background-color: #fff;
    border-radius: 5px;
    padding: 15px;
    box-shadow: 0 5px 15px rgba(255, 255, 255, 0.2);
}

.modal-dialog form{
    display: flex;
    flex-direction: column;
    align-items: start;
}

.modal-dialog form > input{
    margin-bottom: 10px;
    width: 100%;
    height: 20px;
}

.modal-dialog button{
    margin: 5px 0!important;
    width: 100%;
    padding: 5px!important;
}

.modal-dialog span, .modal-dialog label{
    color: #000;
}

.table-options{
    display: flex;
    justify-content: end;
    align-items: center;
    text-align: right;
    padding-right: 20px;
}

.monitor-container{
    width: 100%;
    background-color: #e8e9eb;
    padding: 10px;
    padding-bottom: 30px;
    border-radius: 5px;
}

.cards{
    width: 100%;
    display: flex;
    gap: 10px;
}

.cards > div{
    background-color: red;
    flex: 1;
    padding: 10px;
    height: 80px;
    color: #fff;
    font-size: 12px;
    border-radius: 5px;
}

.cards > div:first-child{
    font-size: 18px;
    display: flex;
    align-items: center;
}

.cards > div.blue{
    background-color: #2d86ec;
}
.cards > div.lightblue{
    background-color: #a4c1e2;
}
.cards > div.yellow{
    background-color: #d3d609;
}
.cards > div.red{
    background-color: #ff7856;
}

.monitor-content{
    background-color: #fff;
    padding: 10px;
    margin-top: 20px;
    border-radius: 5px;
}

.monitor-content .head{
    display: flex;
    justify-content: flex-end;
    gap: 10px;
    align-items: center;
}

.monitor-content .head > div{
    height: 30px;
    border-radius: 5px;
    cursor: pointer;
}

.monitor-content .head > div:first-child{    
    border: 1px solid #ccc;    
    display: flex;
    align-items: center;
}

.monitor-content .head > div span{    
    padding: 0 10px;
    color: #ccc;
}

.monitor-content .head > div:first-child span.active{ 
    display: inline-block;   
    background-color: #8b8c8d;
    height: 30px;
    display: flex;
    align-items: center;
    color: #000;
}

.monitor-content .head .download{
    background-color: #2d86ec;
    display: flex;
    align-items: center;
    padding: 0 10px;
}

.download img{
    height: 16px;
}

.monitor-content .body{
    margin-top: 30px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-bottom: 10px;
}

.monitor-content .body.title .text{
    font-weight: bold;
    text-decoration: underline;
}

.monitor-content .body.content{
    display: flex;
}

.monitor-content .body.content section{
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.monitor-content .body.content section h3{
    font-size: 16px;
    padding: 20px 0;
}

.monitor-content .body.content section > div{
    width: 90%;
    height: 10px;
    background-color: #ccc;
    margin: 15px auto;
}

.monitor-content .body.content section > div > div{
    width: 0;
    height: 100%;
    background-color: #166d16;
}

.monitor-content .body.content section > p.capacity{
    font-size: 28px;
}

.monitor-content .body.content section > p.capacity span{
    font-weight: bold;
}

.monitor-content .body.content section > p.total{
    font-size: 14px;
    margin: 10px 0;
    font-weight: bold;
}

.monitor-content .body.content section ul{
    width: 90%;
}

.monitor-content .body.content section li{
    display: flex;
    width: 100%;
    justify-content: space-between;
    font-size: 14px;
    color: #696767;
    padding: 5px 0;
}

.monitor-content .body.content section li > div:first-child > span:first-child{
    display: inline-block;
    width: 10px;
    height: 10px;
    background-color: #ccc;
}

.monitor-content .body.content span.fill{
    background-color: #166d16!important;
}

.error{
    background-color: red;
    color: #fff;
    padding: 5px;
    font-size: 12px;
}


</style>
