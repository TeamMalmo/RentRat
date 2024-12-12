import axios from 'axios';
import { ref } from 'vue';
import { CONFIG } from '@/constant/config';

const auth = ref({
  isAuthenticated: false,
  role: null,
  username: null,
});

const JSON_BIN_URL = 'https://api.jsonbin.io/v3/b/67595726acd3cb34a8b7b992';
const apiKey = CONFIG.JSONBIN_API_KEY;

// Ladda autentiseringstillstånd från JSONbin
const loadAuthFromDB = async () => {
  try {
    const response = await axios.get(JSON_BIN_URL, {
      headers: { 'X-Master-Key': apiKey },
    });

    const session = response.data.record.session;

    if (session && session.isAuthenticated) {
      // Set the auth state based on the session
      auth.value = session;
    } else {
      console.log('Ingen session hittades, användaren måste logga in.');
      auth.value.isAuthenticated = false;
      auth.value.role = null;
      auth.value.username = null;
    }
  } catch (e) {
    console.error('Fel vid laddning av session från DB:', e);
  }
};

// Spara endast autentiseringstillståndet till JSONbin
const saveAuthToDB = async () => {
  try {
    // Hämtar den aktuella användardatan från JSONbin
    const response = await axios.get(JSON_BIN_URL, {
      headers: { 'X-Master-Key': apiKey },
    });

    // Vi gör inte några ändringar i användarlistan, vi sparar bara sessionen
    const users = response.data.record.users;

    await axios.put(
      JSON_BIN_URL,
      {
        users, // Behåll användarna oförändrade
        session: auth.value, // Uppdatera bara sessionen
      },
      {
        headers: {
          'X-Master-Key': apiKey,
          'Content-Type': 'application/json',
        },
      }
    );
    console.log('Session sparad i DB');
  } catch (e) {
    console.error('Fel vid sparande av session till DB:', e);
  }
};

// Inloggningsfunktion
export const login = async (username, password) => {
  try {
    const response = await axios.get(JSON_BIN_URL, {
      headers: { 'X-Master-Key': apiKey },
    });

    const users = response.data.record.users;

    // Verifiera användarens uppgifter
    const user = users.find((u) => u.username === username && u.password === password);

    if (user) {
      // Sätt auth-state och spara session i DB
      auth.value.isAuthenticated = true;
      auth.value.role = user.role;
      auth.value.username = user.username;

      // Spara sessiondata i JSONbin utan att ändra användarlistan
      await saveAuthToDB();
      return true;
    } else {
      throw new Error('Ogiltigt användarnamn eller lösenord');
    }
  } catch (error) {
    console.error('Inloggning misslyckades:', error);
    return false;
  }
};

// Utloggningsfunktion
export const logout = async () => {
  try {
    // Återställ auth-state lokalt
    auth.value.isAuthenticated = false;
    auth.value.role = null;
    auth.value.username = null;

    // Ta bort sessiondata från JSONbin
    const response = await axios.get(JSON_BIN_URL, {
      headers: { 'X-Master-Key': apiKey },
    });

    const users = response.data.record.users;

    await axios.put(
      JSON_BIN_URL,
      {
        users, // Behåll användarlistan oförändrad
        session: null, // Radera sessionen
      },
      {
        headers: {
          'X-Master-Key': apiKey,
          'Content-Type': 'application/json',
        },
      }
    );

    console.log('Session raderad från DB');
    return true;
  } catch (error) {
    console.error('Fel vid utloggning:', error);
    return false;
  } 
};


// Lägg till ny användare
export const addUser = async (newUser, confirmPassword) => {
  try {
    if (newUser.password !== confirmPassword) {
      throw new Error('Lösenorden matchar inte.');
    }

    const response = await axios.get(JSON_BIN_URL, {
      headers: { 'X-Master-Key': apiKey },
    });

    const users = response.data.record.users;

    const existingUser = users.find((u) => u.username === newUser.username);
    if (existingUser) {
      throw new Error('Användarnamnet är redan upptaget.');
    }

    users.push(newUser);

    await axios.put(
      JSON_BIN_URL,
      { users }, // Endast användarlistan ändras
      {
        headers: {
          'X-Master-Key': apiKey,
          'Content-Type': 'application/json',
        },
      }
    );

    console.log('Användare har lagts till.');
    return true;
  } catch (error) {
    console.error('Misslyckades med att lägga till användare:', error);
    return false;
  }
};

// Ge åtkomst till auth-state
export const useAuth = () => {
  loadAuthFromDB(); // Ladda autentiseringstillstånd från DB vid appens start
  return auth;
};
