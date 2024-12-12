import { createRouter, createWebHistory } from 'vue-router';
import { useAuth } from '@/composables/useUser'; // Authentication composable

// Define routes
const routes = [
  {
    path: '/',
    name: 'Landing',
    component: () => import('@/views/LandingView.vue'), // Dynamic import
  },
  {
    path: '/renter',
    name: 'Renter',
    component: () => import('@/components/Layouts/RenterLayout.vue'), // Dynamic import
    meta: { requiresAuth: true, role: 'renter' }, // Protected route
    children: [
      {
        path: '',
        name: 'RenterHome',
        component: () => import('@/views/RenterHomeView.vue'),
      },
      {
        path: 'profile',
        name: 'RenterProfile',
        component: () => import('@/views/RenterProfileView.vue'),
      },
      {
        path: 'about',
        name: 'RenterAbout',
        component: () => import('@/views/RenterAboutView.vue'),
      },
    ],
  },
  {
    path: '/rentee',
    name: 'Rentee',
    component: () => import('@/components/Layouts/RenteeLayout.vue'), // Dynamic import
    // meta: { requiresAuth: true, role: 'rentee' }, // Protected route
    children: [
      {
        path: '',
        name: 'RenteeHome',
        component: () => import('@/views/RenteeHomeView.vue'),
      },
      {
        path: 'rats',
        name: 'RenteeRats',
        component: () => import('@/views/RenteeRatsView.vue'),
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
        component: () => import('@/views/RenteeProfileView.vue'),
      },
      {
        path: 'inbox',
        name: 'RenteeInbox',
        component: () => import('@/views/RenteeInboxView.vue'),
      },
    ],
  },
  // Fallback route for undefined paths
  // {
  //   path: '/:pathMatch(.*)*',
  //   name: 'NotFound',
  //   component: () => import('@/views/NotFoundView.vue'),
  // },
];

// Create the router
const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Navigation guard for route protection
router.beforeEach(  (to, from, next) => {
  const { auth } = useAuth(); // Get the auth state
  const isLoggedIn = auth.value ? auth.value.isAuthenticated : false; // Safely access
  
  const userRole = auth.value.role; // Get the user's role

  // Redirect unauthenticated users from protected routes
  if (to.meta.requiresAuth && !isLoggedIn) {
    return next({ name: 'Landing' });
  }

  // Redirect logged-in users from the Landing page to their respective home page
  if (to.name === 'Landing' && isLoggedIn) {
    if (userRole === 'renter') return next({ name: 'RenterHome' });
    if (userRole === 'rentee') return next({ name: 'RenteeHome' });
  }

  // Restrict users from accessing routes not permitted for their role
  if (to.meta.requiresAuth && to.meta.role && to.meta.role !== userRole) {
    if (userRole === 'renter') return next({ name: 'RenterHome' });
    if (userRole === 'rentee') return next({ name: 'RenteeHome' });
  }

  // Proceed to the requested route
  next();
});

export default router;
