import axios from 'axios';
import { ref } from 'vue';
import { CONFIG } from '@/constant/config';

// enkelt state för att hantera användarens roll/access
const auth = ref({
  isAuthenticated: false,
  role: null,
  username: null,
});

// url för users i jsonbin
const JSON_BIN_URL = 'https://api.jsonbin.io/v3/b/67595726acd3cb34a8b7b992'; 
const apiKey = CONFIG.JSONBIN_API_KEY;

// tar in inloggningsuppgifter
export const login = async (username, password) => {
  try {
    // hämtar alla users
    const response = await axios.get(JSON_BIN_URL, {
      headers: { 'X-Master-Key': apiKey },
    });

    const users = response.data.record.users;

    // verifierar att användaren finns och har rätt lösenord
    const user = users.find((u) => u.username === username && u.password === password);

    if (user) {
      // sätter auth till användarens data
      auth.value.isAuthenticated = true;
      auth.value.role = user.role;
      auth.value.username = user.username;

      return true;
    } else {
      throw new Error('Invalid username or password');
    }
  } catch (error) {
    console.error('Login failed:', error);
    return false;
  }
};

export const logout = () => {
  auth.value.isAuthenticated = false;
  auth.value.role = null;
  auth.value.username = null;
};

export const useAuth = () => auth; // Provide access to the `auth` state
