# Rent-a-Rat 

This is a Vue.js application for renting and renting out rats and their services. with various layout components, UI effects, and reusable components designed for a dynamic user experience. It includes two main layouts (`RenteeLayout` and `RenterLayout`), a series of visual effects like particle and noise overlays.


## Project Structure
public/
  - Images
  - CSS
  - JavaScript
src/
  - App.vue
  - components/
    - Auth/
      - LoginForm.vue
      - LogoutButton.vue
      - RegisterForm.vue
      - WelcomeMessage.vue
    - AddRats/
      - AddRats.vue
      - AddRatsForm.vue
    - EditRats/
      - EditRats.vue
      - EditRatsForm.vue
    - EditUser/
      - UpdateUser.vue
      - UpdateUserForm.vue
    - FindRats/
      - FindRats.vue
      - RatFilter.vue
      - RatItem.vue
    - Layouts/
      - RenteeLayout.vue
      - RenterLayout.vue
    - StyleComponents/
      - GlowButton.vue
      - HeroOverlayEffect.vue
      - NoiseOverlay.vue
      - NoiseOverlay.vue
  views/
    - LandingView.vue
    - RenterHomeView.vue
    - RenterProfileView.vue
    - RenteeHomeView.vue
    - RenteeRatsView.vue
    - RatSpecificationView.vue
    - RenteeProfileView.vue
    - RenterAboutView.vue
    - NotFoundView.vue
  router/
    index.js
  constant/
    config.js
  composables/
    useAddRat.js
    useAuth.js
    useBookings.js
    useFetchRats.js
    useRemoveRat.js
    useUpdateRat.js
    useUser.js
  services/
    ratsApi.js

## Features
- Authentication
- User Profile
- Rat Finder
- Rat Booking
- Rat Rental
- Rat Favorites
- Rat Editing
- Layouts
- UI Effects
- Reusable Components

## Dependencies
    - Vue 3
    - Vue Router 4

## Getting Started
To get started with this project, follow these steps:

1. Clone the repository:
   ```bash
   git clone https://github.com/chasacademy/Rent-a-Rat.git
   ```
2. Install the required dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
4. Open your browser and navigate to `http://localhost:5173`.

### By: 
- [Eva Bjorling](https://github.com/evesteve94)
- [Aleksei Nilsson](https://github.com/Alenil00)
- [Mirza Mesinovic](https://github.com/Strimlaren)
- [Caroline Edgren](https://github.com/carstern)
- [Jumi Strandberg](https://github.com/jumistrandberg)
- [Jason Lin](https://github.com/JasiOW)
