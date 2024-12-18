<script setup>
import { onMounted } from "vue";
import { useBookings } from "@/composables/useBookings";

const { fetchBookings, bookings, error, isAddingBooking } = useBookings();

onMounted(async () => {
  await fetchBookings();
});
</script>

<template>
  <div class="inbox">
    <h2>Your Bookings</h2>

    <!-- Display loading state -->
    <div v-if="isAddingBooking">Loading...</div>

    <!-- Show error if fetching bookings fails -->
    <p v-if="error" class="error">{{ error }}</p>

    <!-- List all bookings -->
    <div v-if="bookings.length > 0">
      <div v-for="booking in bookings" :key="booking.Id" class="booking-card">
        <p><strong>Booker:</strong> {{ booking.Booker }}</p>
        <p><strong>Date:</strong> {{ booking.date }}</p>
        <p><strong>Accepted:</strong> {{ booking.accepted }}</p>
      </div>
    </div>

    <!-- No bookings message -->
    <p v-else>No bookings found. Book a rat now!</p>
  </div>
</template>

<style scoped>
.inbox {
  padding: 2rem;
  text-align: center;
}

.booking-card {
  border: 1px solid #ccc;
  padding: 1rem;
  margin: 1rem;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0px 3px 5px rgba(0, 0, 0, 0.2);
}

.error {
  color: red;
  font-weight: bold;
  margin-top: 1rem;
}
</style>
