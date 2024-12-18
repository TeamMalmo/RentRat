<script setup>
import { ref, onMounted, watch } from "vue";
import { useAuth } from "@/composables/useUser";
import { useBookings } from "@/composables/useBookings";

const p = defineProps({ rat: Object });
const emit = defineEmits(["closeModal"]);

const { isAddingBooking, fetchBookings, addBooking, bookings, error } =
  useBookings();

const { auth } = useAuth();
const bookDate = ref("");

// Fetch all bookings on load
onMounted(() => {
  fetchBookings();
});

// Close the modal when adding of booking is complete
watch(
  () => isAddingBooking.value,
  (newValue) => {
    if (!newValue) emit("closeModal");
  }
);

// Add a booking
const handleAddBooking = () => {
  if (!p.rat) {
    console.error("No rat data available!");
    alert("No rat data was found!");
    return;
  }

  if (bookDate.value === "") {
    alert("Date and time cannot be omitted!");
    return;
  }

  const loggedInUsername = auth?.value?.username;

  if (!loggedInUsername) {
    alert("No user is currently logged in.");
    return;
  }

  addBooking({
    Id: Date.now() % 100000,
    Booker: loggedInUsername,
    RenterId: p.rat.renter,
    date: bookDate.value,
    accepted: false,
  });
};

</script>

<template>
  <div class="bookFormModal">
    <div class="bookFormContainer">
      <h3>Boka {{ p.rat.name }}</h3>
      <form @submit.prevent="bookRat">
        <div class="formDateTime">
          <label for="date">Välj Datum:</label>
          <input type="date" id="date" v-model="bookDate" required />
          <div class="formAction">
            <button type="submit" @click="handleAddBooking">
              Bekräfta Bokning
            </button>
            <button @click="emit('closeModal')">Avbryt</button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped>
/*-- Bokningsformulär --*/

.bookFormModal {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.bookFormContainer {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(5px);
  border-radius: 1rem;
  padding: 1rem;
  width: 300px;
}

.formDateTime {
  margin-bottom: 1rem;
}

.formDateTime label {
  display: block;
  margin-bottom: 0.5rem;
}

.formDateTime input {
  width: 100%;
  padding: 0.5rem;
  border-radius: 0.5rem;
  border: 1px solid black;
}

.formAction {
  display: flex;
  justify-content: space-between;
}

.formAction button {
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  cursor: pointer;
}

.formAction button:hover {
  opacity: 1;
}

input {
  background-color: transparent;
}
</style>
