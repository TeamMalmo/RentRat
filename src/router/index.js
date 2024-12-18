import { createRouter, createWebHistory } from "vue-router";
// Our own custom auth composable for user state management
import { useAuth } from "@/composables/useUser";
import { reactive } from "vue";

// Reactive object- changes to show and message will trigger updates in dependent UI
export const authMessage = reactive({
  show: false,
  message: "",
});

// Define routes
const routes = [
  {
    // URL for the route
    path: "/",
    // Name for identification
    name: "Landing",
    // Dynamic import of view component
    component: () => import("@/views/LandingView.vue"),
  },
  {
    // Base path for renter aka. I have rats
    path: "/renter",
    name: "Renter",
    component: () => import("@/components/Layouts/RenterLayout.vue"),
    // Protected route- specifies that auth is required and access is limited to users with "renter" role
    meta: { requiresAuth: true, role: "renter" },
    // "/renter"s nested routes (babies hihihi)
    children: [
      {
        // The default sub path = "/renter"
        path: "",
        name: "RenterHome",
        component: () => import("@/views/RenterHomeView.vue"),
      },
      {
        path: "profile",
        name: "RenterProfile",
        component: () => import("@/views/RenterProfileView.vue"),
      },
      {
        path: "about",
        name: "RenterAbout",
        component: () => import("@/views/RenterAboutView.vue"),
      },
    ],
  },
  {
    // Base path for rentee aka. I want rats!
    path: "/rentee",
    name: "Rentee",
    component: () => import("@/components/Layouts/RenteeLayout.vue"),

    children: [
      {
        path: "",
        name: "RenteeHome",
        component: () => import("@/views/RenteeHomeView.vue"),
      },
      {
        path: "rats",
        name: "RenteeRats",
        component: () => import("@/views/RenteeRatsView.vue"),
      },
      {
        path: "rats/:id",
        name: "RenteeRatDetail",
        component: () => import("@/views/RatSpecificationView.vue"),
        props: true,
      },
      {
        path: "profile",
        name: "RenteeProfile",
        component: () => import("@/views/RenteeProfileView.vue"),
        meta: { requiresAuth: true, role: "rentee" }, // Protected route
      },

      {
        path: "inbox",
        name: "RenteeInbox",
        component: () => import("@/views/RenteeInboxView.vue"),
        meta: { requiresAuth: true, role: "rentee" }, // Protected route
      },
      {
        path: "history",
        name: "RenteeHistory",
        component: () => import("@/views/RenteeHistoryView.vue"),
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

// Create the router instance
const router = createRouter({
  // Uses HTML5 history mode so we can have "/" in URLs instead of #-based nav yippie!
  history: createWebHistory(),
  // Pass routes array to the router
  routes,
});

// Global navigation guard for handling access control for routes
// Is called before every route change so we can check auth. before going to the target route
router.beforeEach((to, from, next) => {
  // Get the auth state from the composable
  const { auth } = useAuth();
  // If auth.value exists- access the isAuthenticated property else- default to false
  // Prevents runtime errors if properties are undefined or null = safe access
  const isLoggedIn = auth.value ? auth.value.isAuthenticated : false;
  // Get user's role from auth state
  const userRole = auth.value.role;

  // Redirect unauthenticated users from protected routes
  if (to.meta.requiresAuth && !isLoggedIn) {
    authMessage.show = true;
    authMessage.message = "Please log in to access this page 🐀";
    // Prevent nav
    return next(false);
  } else {
    // Hide and clear
    authMessage.show = false;
    authMessage.message = "";
  }

  // Redirect logged-in users from the Landing page to their respective home page
  if (to.name === "Landing" && isLoggedIn) {
    if (userRole === "renter") return next({ name: "RenterHome" });
    if (userRole === "rentee") return next({ name: "RenteeHome" });
  }

  // Restrict users from accessing routes not permitted for their role
  if (to.meta.requiresAuth && to.meta.role && to.meta.role !== userRole) {
    if (userRole === "renter") return next({ name: "RenterHome" });
    if (userRole === "rentee") return next({ name: "RenteeHome" });
  }

  // Proceed to the requested route
  next();
});

export default router;
