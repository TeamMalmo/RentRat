<script setup>
import { useAuth } from "@/composables/useUser";
import { useBookings } from "@/composables/useBookings";
import { onMounted, ref } from "vue";
import GlowButton from "@/components/GlowButton.vue";

let myHistory = ref([]);
const { auth } = useAuth();
const { isAddingBooking, fetchBookings, addBooking, bookings, error } =
  useBookings();

onMounted(async () => {
  await fetchBookings();
  getMyHistory();
});

const getMyHistory = () => {
  const newHistory = bookings.value.filter(
    (booking) =>
      booking.Booker === auth.value.username && booking.accepted !== null
  );
  console.log(newHistory);
  myHistory.value = newHistory;
};
</script>

<template>
  <main>
    <h1>{{ auth.username }}s booking history</h1>
    <div>
      <GlowButton>Show All</GlowButton>
      <GlowButton>Pending</GlowButton>
      <GlowButton>Denied</GlowButton>
      <GlowButton>Accepted</GlowButton>
    </div>
    <ul>
      <li></li>
    </ul>
  </main>
</template>

<style scoped>
main {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding-top: 2rem;
}
</style>
