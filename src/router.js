import { createRouter, createWebHistory } from 'vue-router';

import HomeApp from './components/HomeApp.vue';
import MonitorApp from './components/MonitorApp.vue';
import RegistrosApp from './components/RegistrosApp.vue';
import DatosApp from './components/DatosApp.vue';
import AyudaApp from './components/AyudaApp.vue';
import NotFound from './components/NotFound.vue';

const routes = [
  {
    path: '/',
    component: HomeApp
  },
  {
    path: '/monitor',
    component: MonitorApp
  },
  {
    path: '/registros',
    component: RegistrosApp
  },
  {
    path: '/datos',
    component: DatosApp
  },
  {
    path: '/ayuda',
    component: AyudaApp
  },
  {
    path: '/:catchAll(.*)',
    component: NotFound
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
