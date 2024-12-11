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


router.beforeEach(async (to, from, next) => {
  const auth = await useAuth(); // Wait for the authentication state to load
  const isLoggedIn = auth.value.isAuthenticated; // Check if the user is authenticated

  // If the user is not logged in and the route requires authentication, redirect to the landing page
  if (to.meta.requiresAuth && !isLoggedIn) {
    return next({ name: 'Landing' });
  }

  // If the user is logged in and tries to access the Landing page, redirect to the respective HomeView
  if (to.name === 'Landing' && isLoggedIn) {
    if (auth.value.role === 'renter') {
      return next({ name: 'RenterHome' });
    } else if (auth.value.role === 'rentee') {
      return next({ name: 'RenteeHome' });
    }
  }

  // If the user is logged in but does not have the required role for the route, redirect to the respective HomeView
  if (to.meta.requiresAuth && to.meta.role && to.meta.role !== auth.value.role) {
    if (auth.value.role === 'renter') {
      return next({ name: 'RenterHome' });
    } else if (auth.value.role === 'rentee') {
      return next({ name: 'RenteeHome' });
    }
  }

  // For all other cases, proceed to the requested route
  next();
});

export default router;
