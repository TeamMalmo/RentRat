<script setup>
// import { useRats } from '@/composables/useRats';
import { ref, onMounted, defineProps } from "vue";
import { useBookings } from "../composables/useBookings";

// const { rats, isLoading, fetchrats } = useRats();
const props = defineProps({ rat: Object, renterId: String });
// const renterId = route.params.id;

const { isAddingBooking, fetchBookings, addBooking, bookings, error } =
  useBookings();

const selectedRat = ref(null);
const bookDate = ref("");
const bookTime = ref("");

const bookedRats = ref([]);

// Boka objekt med dag och tid
// const bookRat = () => {
//   const bookDetails = {
//     rat: selectedRat.value.id,
//     date: bookDate.value,
//     time: bookTime.value,
//   };
//   bookedRats.value.push(bookDetails);
//   alert(
//     `Du har nu bokat råttan: ${selectedRat.value.title} den ${bookDate.value} kl. ${bookTime.value}`
//   );
// };

const handleAddBooking = () => {
  addBooking({
    id: Date.now() % 100000,
    ratId: props.rat.id,
    RenterId: props.renterId,
    date: bookDate.value,
    time: bookTime.value,
  });
};

fetchBookings();
</script>

<template>
  <!-- placeholder <div v-if="filteredRats.length > 0"><RatListItem v-for="rat in filteredRats" :key="rat.id" :rat="rat" /></div> -->

  <!-- Bokningsformulär -->
  <div class="bookFormModal">
    <div class="bookFormContainer">
      <h3>Boka {{ rat.name }}</h3>
      <form @submit.prevent="bookRat">
        <div class="formDateTime">
          <label for="date">Välj Datum:</label>
          <input type="date" id="date" v-model="bookDate" required />
          <div class="formDateTime">
            <label for="time">Tid:</label>
            <input type="time" id="time" v-model="bookTime" required />
          </div>
          <div class="formAction">
            <button type="submit" @click="handleAddBooking">
              Bekräfta Bokning
            </button>
            <button @click="$emit('closeModal')">Avbryt</button>
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
