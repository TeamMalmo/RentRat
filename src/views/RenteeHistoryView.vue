<script setup>
import { useAuth } from "@/composables/useUser";
import { useBookings } from "@/composables/useBookings";
import { onMounted, ref, computed, watch } from "vue";
import GlowButton from "@/components/GlowButton.vue";

const chosenFilter = ref(null);
const { auth } = useAuth();
const { isAddingBooking, fetchBookings, addBooking, bookings, error } =
  useBookings();

onMounted(async () => {
  await fetchBookings();
});

const myNewHistory = computed(() => {
  let newHistory = bookings.value.filter(
    (booking) => booking.Booker === auth.value.username
  );

  if (chosenFilter.value === "pending") {
    newHistory = newHistory.filter((booking) => {
      return booking.accepted === null;
    });
  }
  if (chosenFilter.value === "true") {
    newHistory = newHistory.filter((booking) => {
      return booking.accepted === true;
    });
  }
  if (chosenFilter.value === "false") {
    newHistory = newHistory.filter((booking) => {
      return booking.accepted === false;
    });
  }
  return newHistory;
});

const test = (filter) => {
  chosenFilter.value = filter;
};
</script>

<template>
  <main>
    <h1>{{ auth.username }}s booking history</h1>
    <div class="filter-buttons">
      <GlowButton @click="test('all')">Show All</GlowButton>
      <GlowButton @click="test('pending')">Pending</GlowButton>
      <GlowButton @click="test('false')">Denied</GlowButton>
      <GlowButton @click="test('true')">Accepted</GlowButton>
    </div>
    <ul class="cards">
      <li v-for="booking in myNewHistory">
        <div class="card">
          <p>Booking Id: {{ booking.Id }}</p>

          <p>Renter: {{ booking.RenterId }}</p>
          <p>Requested Date: {{ booking.date }}</p>
          <p>
            Booking Status:
            {{
              booking.accepted === null
                ? "Pending Reply"
                : booking.accepted
                ? "Accepted"
                : "Denied"
            }}
          </p>
        </div>
      </li>
    </ul>
  </main>
</template>

<style scoped>
* {
  margin: 0;
  list-style: none;
}

main {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding-top: 2rem;
}

.filter-buttons {
  margin-bottom: 2rem;
}

.cards {
  display: flex;
  gap: 0.5rem;
}

.card {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 1px solid black;
  border-radius: 5px;
  padding: 0.5rem;
}
</style>
