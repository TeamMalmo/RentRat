import axios from 'axios';
import { ref } from 'vue';
import { CONFIG } from '@/constant/config';

// state för att hantera användarens roll/access
const auth = ref({
  isAuthenticated: false,
  role: null,
  username: null,
});

const JSON_BIN_URL = 'https://api.jsonbin.io/v3/b/67595726acd3cb34a8b7b992';
const apiKey = CONFIG.JSONBIN_API_KEY;

// login
export const login = async (username, password) => {
  try {
    const response = await axios.get(JSON_BIN_URL, {
      headers: { 'X-Master-Key': apiKey },
    });

    const users = response.data.record.users;

    // verifierar att användaren finns och har rätt lösenord
    const user = users.find((u) => u.username === username && u.password === password);

    // sätter auth till användarens data
    if (user) {
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

// logout
export const logout = () => {
  auth.value.isAuthenticated = false;
  auth.value.role = null;
  auth.value.username = null;
};

export const addUser = async (newUser, confirmPassword) => {
  try {
    // säkerställer att lösenorden matchar
    if (newUser.password !== confirmPassword) {
      throw new Error('Passwords do not match.');
    }

    // hämtar alla users
    const response = await axios.get(JSON_BIN_URL, {
      headers: { 'X-Master-Key': apiKey },
    });

    const users = response.data.record.users;

    // undersöker om användarnamnet är redan upptaget
    const existingUser = users.find((u) => u.username === newUser.username);
    if (existingUser) {
      throw new Error('Username is already taken.');
    }

    // lägger till användaren i listan
    users.push(newUser);

    // uppdaterar databasen med den nya listan
    await axios.put(
      JSON_BIN_URL,
      { users },
      {
        headers: {
          'X-Master-Key': apiKey,
          'Content-Type': 'application/json',
        },
      }
    );

    console.log('User successfully added.');
    return true;
  } catch (error) {
    console.error('Failed to add user:', error);
    return false;
  }
};

// Provide access to the `auth` state
export const useAuth = () => auth;
