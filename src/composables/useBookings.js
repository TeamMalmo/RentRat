import { ref } from "vue";
import { CONFIG } from "@/constant/config";

export function useBookings() {
  const isAddingBooking = ref(false); // Used like a loading variable
  const bookings = ref([]);
  const error = ref(null);
  const apiKey = CONFIG.JSONBIN_API_KEY;
  const url = "https://api.jsonbin.io/v3/b/67596fbeacd3cb34a8b7c8a7";

  // Add a new booking
  const addBooking = async (newBooking) => {
    isAddingBooking.value = true;

    try {
      // Making sure bookings is populated with latest data
      await fetchBookings();

      // Check if there is already a booking with the same date and time
      for (const booking of bookings.value) {
        if (
          booking.date === newBooking.date &&
          booking.time === newBooking.time &&
          booking.ratId === newBooking.ratId
        ) {
          alert("You have already made a booking on this date and time!");
          return; // Exit early if booking already exists
        }
      }

      // const updatedBookings = []; // Reset-the-JSONBIN-hack-2000
      const updatedBookings = [...bookings.value, newBooking];

      // Send the updated bookings to the JSONBIN
      const response = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "X-Master-Key": apiKey,
        },
        body: JSON.stringify({ bookRats: updatedBookings }),
      });

      if (!response.ok) {
        alert("Could not add booking. Try again.");
        throw new Error("Failed to add booking. Please try again.");
      }
      alert("Booking successful!");
    } catch (err) {
      error.value = "An error occurred while adding the booking.";
      console.error(err); // Log the error for debugging
    } finally {
      isAddingBooking.value = false;
    }
  };

  // Fetch all bookings and populate bookings
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
