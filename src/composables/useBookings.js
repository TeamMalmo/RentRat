import { ref } from "vue";
import { CONFIG } from "@/constant/config";
import { useAuth } from "@/composables/useUser";

export function useBookings() {
  const isAddingBooking = ref(false);
  const bookings = ref([]);
  const error = ref(null);
  const apiKey = CONFIG.JSONBIN_API_KEY;
  const url = "https://api.jsonbin.io/v3/b/67596fbeacd3cb34a8b7c8a7";

  const addBooking = async (newBooking) => {
    isAddingBooking.value = true;

    try {
      await fetchBookings();

      const conflict = bookings.value.find(
        (booking) =>
          booking.date === newBooking.date && booking.ratId === newBooking.ratId
      );

      if (conflict) {
        alert("You already have a booking for this date and time!");
        return;
      }

      const updatedBookings = [...bookings.value, newBooking];

      const response = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "X-Master-Key": apiKey,
        },
        body: JSON.stringify({ bookRats: updatedBookings }),
      });

      if (!response.ok) {
        alert("Booking failed, please try again.");
        throw new Error("Failed to add booking.");
      }

      alert("Booking successful!");
    } catch (err) {
      console.error(err);
      error.value = "An error occurred while adding the booking.";
    } finally {
      isAddingBooking.value = false;
    }
  };

  // Filter bookings specific to the authenticated user
  const filterBookingsByUser = (allBookings, renterId) => {
    return allBookings.filter((booking) => booking.RenterId === renterId);
  };

  const fetchBookings = async () => {
    try {
      const { auth } = useAuth();  // Access the logged-in user's auth state
      const renterId = auth?.value?.username;

      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "X-Master-Key": apiKey,
        },
      });

      if (response.ok) {
        const data = await response.json();
        const allBookings = data.record.bookRats || [];

        bookings.value = filterBookingsByUser(allBookings, renterId);
        console.log('Fetched bookings:', allBookings);
      }

    } catch (err) {
      console.error(err);
      error.value = err.message || "Failed to fetch bookings.";
    } finally {
      isAddingBooking.value = false;
    }
  };

  return { isAddingBooking, fetchBookings, addBooking, bookings, error };
}
