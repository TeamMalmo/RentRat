<script setup>
// import { useRats } from '@/composables/useRats';
import { ref, onMounted } from 'vue';

// const { rats, isLoading, fetchrats } = useRats();
defineProps({ rat: Object });
const showBookForm = ref(false);
const selectedRat = ref(null);
const bookDate = ref('');
const bookTime = ref('');

const bookedRats = ref([]);

// Öppna bokningsformuläret
const openBookForm = (rat) => {
    selectedRat.value = rat;
    showBookForm.value = true;
};

// Stäng bokningsformuläret
const closeBookForm = () => {
    showBookForm.value = false;
    selectedRat.value = null;
    bookDate.value = '';
    bookTime.value = '';
};

// Boka objekt med dag och tid
const bookRat = () => {
    const bookDetails = {
        rat: selectedRat.value.id,
        date: bookDate.value,
        time: bookTime.value,
    };
    bookedRats.value.push(bookDetails);
    alert(`Du har nu bokat råtan: ${selectedRat.value.title} den %{bookDate.value} kl. ${bookTime.value}`);
    closeBookForm();    
};



</script>