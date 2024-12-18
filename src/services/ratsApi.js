// API URL and keys
import { CONFIG } from "@/constant/config";

// Define the headers to be used for API requests
const headers = {
  // Request payload format is JSON
  "Content-Type": "application/json",
  // API key for auth
  "X-Master-Key": CONFIG.JSONBIN_API_KEY,
};

// ratsAPI object contains methots for CRUD operations on "rats"
export const ratsApi = {
  // Fetch the list of rats from the "API"
  async fetchRats() {
    // Use the predefined headers to make GET req.
    const response = await fetch(CONFIG.ITEMS_API_URL, { headers });
    // Parse JSON response
    const data = await response.json();
    // Return the array of rats from the response "record" object
    return data.record.rats;
  },

  // Create new rat and add it to the array of rats
  async createRat(newRat) {
    // Fetch the existing rats
    const currentRats = await this.fetchRats();
    const response = await fetch(CONFIG.ITEMS_API_URL, {
      // Have to use PUT to update entire list for JSON bin
      method: "PUT",
      // The predefined headers for auth and content type = JSON
      headers,
      // Make the updated rats array JSON
      body: JSON.stringify({
        // Append new rat to old rats
        rats: [...currentRats, newRat],
      }),
    });
    // Parse the response
    const data = await response.json();
    // Return the updated rats array as JS object
    return data.record.rats;
  },

  // Update existing rat based on id
  async updateRat(id, updatedRat) {
    // Fetch current list of rats
    const currentRats = await this.fetchRats();
    // Map through the list to find the rat to update
    const updatedRats = currentRats.map((rat) =>
      // If rat.is is the id we passed, we merge the updated properties to the rat with spread syntax, else return original rat
      rat.id === id ? { ...rat, ...updatedRat } : rat
    );

    const response = await fetch(CONFIG.ITEMS_API_URL, {
      method: "PUT",
      headers,
      body: JSON.stringify({
        // Replace old list with the new list
        rats: updatedRats,
      }),
    });
    const data = await response.json();
    return data.record.rats;
  },

  // Delete rat based on id
  async deleteRat(id) {
    const currentRats = await this.fetchRats();
    // Find the rat with the id matching passed in id and filter out 
    const filteredRats = currentRats.filter((rat) => rat.id !== id);

    const response = await fetch(CONFIG.ITEMS_API_URL, {
      method: "PUT",
      headers,
      body: JSON.stringify({
        rats: filteredRats,
      }),
    });
    const data = await response.json();
    return data.record.rats;
  },
};
