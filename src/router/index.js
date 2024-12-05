import { createRouter, createWebHistory } from 'vue-router';
//ALLA VIEWS BORDE HA NAMING CONVENTION NameView.vue
// Import views
import LandingView from '@/views/LandingView.vue';
import RenterHomeView from '@/views/RenterHomeView.vue';
import RenterProfileView from '@/views/RenterProfileView.vue';
import RenterAboutView from '@/views/RenterAboutView.vue';
import RenteeHomeView from '@/views/RenteeHomeView.vue';
import RenteeRatsView from '@/views/RenteeRatsView.vue';
import RenteeProfileView from '@/views/RenteeProfileView.vue';
import RenteeInboxView from '@/views/RenteeInboxView.vue';


const routes = [
  {
    path: '/',
    name: 'Landing',
    component: LandingView,
  },
  {
    path: '/renter',
    name: 'Renter',
    component: () => import('@/components/Layouts/RenterLayout.vue'), // Dynamic import
    children: [
      {
        path: '',
        name: 'RenterHome',
        component: RenterHomeView,
      },
      {
        path: 'profile',
        name: 'RenterProfile',
        component: RenterProfileView,
      },
      {
        path: 'about',
        name: 'RenterAbout',
        component: RenterAboutView,
      },
    ],
  },
  {
    path: '/rentee',
    name: 'Rentee',
    component: () => import('@/components/Layouts/RenteeLayout.vue'), // Dynamic import
    children: [
      {
        path: '',
        name: 'RenteeHome',
        component: RenteeHomeView,
      },
      {
        path: 'rats',
        name: 'RenteeRats',
        component: RenteeRatsView,
      },
      {
        path: 'profile',
        name: 'RenteeProfile',
        component: RenteeProfileView,
      },
      {
        path: 'inbox',
        name: 'RenteeInbox',
        component: RenteeInboxView,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;