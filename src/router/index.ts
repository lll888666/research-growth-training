import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'home', component: () => import('../views/HomeView.vue') },
    { path: '/map', name: 'map', component: () => import('../views/TaskMapView.vue') },
    {
      path: '/level/risk-identification',
      name: 'risk-identification',
      component: () => import('../views/levels/TopicFocusLevelView.vue')
    },
    {
      path: '/level/topic-focus',
      redirect: '/level/risk-identification'
    },
    {
      path: '/level/paper-select',
      name: 'paper-select',
      component: () => import('../views/levels/PaperSelectLevelView.vue')
    },
    {
      path: '/level/experiment-design',
      name: 'experiment-design',
      component: () => import('../views/levels/ExperimentDesignLevelView.vue')
    },
    {
      path: '/level/academic-writing',
      name: 'academic-writing',
      component: () => import('../views/levels/AcademicWritingLevelView.vue')
    },
    { path: '/summary', name: 'summary', component: () => import('../views/SummaryView.vue') }
  ]
})

export default router
