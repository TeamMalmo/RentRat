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
    <div>
      <GlowButton @click="test('all')">Show All</GlowButton>
      <GlowButton @click="test('pending')">Pending</GlowButton>
      <GlowButton @click="test('false')">Denied</GlowButton>
      <GlowButton @click="test('true')">Accepted</GlowButton>
    </div>
    <ul>
      <li v-for="booking in myNewHistory">
        Booking Id: {{ booking.Id }} Renter: {{ booking.RenterId }} Requested
        Date: {{ booking.date }} Status:
        {{
          booking.accepted === null
            ? "Pending Reply"
            : booking.accepted
            ? "Yes"
            : "No"
        }}
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
</style>
