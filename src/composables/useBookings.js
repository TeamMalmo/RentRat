import { ref } from "vue";
import { CONFIG } from "@/constant/config";

export function useBookings() {
  const isAddingBooking = ref(null); // Like loading phase
  const bookings = ref([]);
  const error = ref(null);
  const apiKey = CONFIG.JSONBIN_API_KEY;
  const url = "https://api.jsonbin.io/v3/b/67596fbeacd3cb34a8b7c8a7";

  const addBooking = async (newBooking) => {
    isAddingBooking.value = true;

    fetchBookings();

    // bookings.map(booking => {
    //   if(booking.date === newBooking.date)
    // })
  };

  const fetchBookings = async () => {
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "X-Master-Key": apiKey,
        },
      });

      if (response.ok) {
        const data = await response.json();
        bookings.value = data.record.bookRats;
      }
    } catch (err) {
      error.value = err.message || "Misslyckades med att hämta bokningar.";
    } finally {
      isAddingBooking.value = false;
    }
  };

  return { isAddingBooking, fetchBookings, addBooking, bookings, error };
}
