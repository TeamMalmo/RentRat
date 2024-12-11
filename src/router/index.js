import { createRouter, createWebHistory } from 'vue-router';
//hämtar authentication
import { useAuth } from '@/composables/useUser'; 
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
    meta: { requiresAuth: true, role: 'renter' }, //protected route
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
    meta: { requiresAuth: true, role: 'rentee' }, // protected route
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
        path: 'rats/:id',
        name: 'RenteeRatDetail',
        component: () => import('@/components/RatSpecComponent.vue'),
        props: true,
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

router.beforeEach((to, from, next) => {
  // innan varje route körs hämtas den inloggade användarens data
  const auth = useAuth();

  // kontrollerar om användaren är inloggad
  if (to.meta.requiresAuth) {
    if (!auth.value.isAuthenticated) {
      return next({ name: 'Landing' }); // hoppa till inloggningssidan
    }
    // kontrollerar om användaren har rätt roll
    if (to.meta.role && to.meta.role !== auth.value.role) {
      return next({ name: 'Landing' }); // hoppa till inloggningssidan
    }
  }

  next();
});

export default router;
