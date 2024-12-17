import { ref } from 'vue';
import axios from 'axios';
import { CONFIG } from '@/constant/config';

// Auth state
const auth = ref({
  isAuthenticated: false,
  userId: null,
  role: null,
  username: null,
  description: '',
  areaOfMalmo: '',
  profileImageUrl: '',
  favorites: [],
});

const JSON_BIN_URL = 'https://api.jsonbin.io/v3/b/675ab4e2ad19ca34f8d9e088';
const apiKey = CONFIG.JSONBIN_API_KEY;

const login = async (username, password) => {
  try {
    const response = await axios.get(JSON_BIN_URL, {
      headers: { 'X-Master-Key': apiKey },
    });

    const users = response.data.record.users;
    const sessions = response.data.record.sessions;

    const user = users.find((u) => u.username === username && u.password === password);
    if (!user) throw new Error('Invalid username or password');

    auth.value = {
      isAuthenticated: true,
      userId: user.id,  // Ensure the user ID is set here
      role: user.role,
      username: user.username,
      description: user.description || '', 
      areaOfMalmo: user.areaOfMalmo || '', 
      profileImageUrl: user.profileImageUrl || '', 
      favorites: user.favorites || [],
    };

    sessions[user.id] = {
      isAuthenticated: true,
      lastLogin: new Date().toISOString(),
    };

    await axios.put(
      JSON_BIN_URL,
      { users, sessions },
      {
        headers: {
          'X-Master-Key': apiKey,
          'Content-Type': 'application/json',
        },
      }
    );

    return true;
  } catch (error) {
    console.error('Login failed:', error);
    return false;
  }
};


const logout = async (userId) => {
  try {
    auth.value = {
      isAuthenticated: false,
      userId: null,
      role: null,
      username: null,
    };

    const response = await axios.get(JSON_BIN_URL, {
      headers: { 'X-Master-Key': apiKey },
    });

    const sessions = response.data.record.sessions;

    if (sessions[userId]) {
      sessions[userId].isAuthenticated = false;
    } else {
      throw new Error('Session not found for user');
    }

    await axios.put(
      JSON_BIN_URL,
      response.data.record,
      {
        headers: {
          'X-Master-Key': apiKey,
          'Content-Type': 'application/json',
        },
      }
    );

    console.log('Logout successful');
    return true;
  } catch (error) {
    console.error('Logout failed:', error);
    return false;
  }
};

const loadUserSession = async () => {
  try {
    const response = await axios.get(JSON_BIN_URL, {
      headers: { 'X-Master-Key': apiKey },
    });

    const users = response.data.record.users;
    const sessions = response.data.record.sessions;

    const activeSession = Object.entries(sessions).find(
      ([id, session]) => session.isAuthenticated
    );

    if (activeSession) {
      const [userId, session] = activeSession;
      const user = users.find((u) => u.id === userId);

      if (user) {
        auth.value = {
          isAuthenticated: true,
          userId,
          role: user.role,
          username: user.username,
          description: user.description || '',  // Add missing fields
          areaOfMalmo: user.areaOfMalmo || '',  // Add missing fields
          profileImageUrl: user.profileImageUrl || '',  // Add missing fields
        };
      }
    }
  } catch (error) {
    console.error('Failed to load user session:', error);
  }
};


export const addUser = async (newUser, confirmPassword) => {
  try {
    if (newUser.password !== confirmPassword) {
      throw new Error('Passwords do not match.');
    }

    const response = await axios.get(JSON_BIN_URL, {
      headers: { 'X-Master-Key': apiKey },
    });

    const users = response.data.record.users;
    const sessions = response.data.record.sessions;

    // Check if the username already exists
    const existingUser = users.find((u) => u.username === newUser.username);
    if (existingUser) {
      throw new Error('Username is already taken.');
    }

    // Add the user
    users.push(newUser);

    // Initialize a session for the new user
    sessions[newUser.id] = {
      isAuthenticated: false,
      lastLogin: null,
    };

    // Save the updated data
    await axios.put(
      JSON_BIN_URL,
      { users, sessions },
      {
        headers: {
          'X-Master-Key': apiKey,
          'Content-Type': 'application/json',
        },
      }
    );

    console.log('User added successfully');
    return true;
  } catch (error) {
    console.error('Failed to add user:', error);
    return false;
  }
};

const editUser = async (updatedUser) => {
  try {
    const response = await axios.get(JSON_BIN_URL, {
      headers: { 'X-Master-Key': apiKey },
    });

    const users = response.data.record.users;

    console.log('Updated User:', updatedUser); // Log to check the passed user data
    console.log('Users in the database:', users); // Log the current users in the database

    // Find the user by ID and update their information
    const userIndex = users.findIndex((u) => u.id === updatedUser.userId);

    if (userIndex === -1) {
      throw new Error('User not found');
    }

    console.log('User found at index:', userIndex); // Log to see which user was found

    // Update the user data
    users[userIndex] = {
      ...users[userIndex], // Keep other data intact
      description: updatedUser.description,
      areaOfMalmo: updatedUser.areaOfMalmo,
      profileImageUrl: updatedUser.profileImageUrl,
    };

    // Save the updated users list back to JSON bin
    await axios.put(
      JSON_BIN_URL,
      { users, sessions: response.data.record.sessions },
      {
        headers: {
          'X-Master-Key': apiKey,
          'Content-Type': 'application/json',
        },
      }
    );

    // Update the auth state with the new user data
    auth.value = {
      ...auth.value,
      description: updatedUser.description,
      areaOfMalmo: updatedUser.areaOfMalmo,
      profileImageUrl: updatedUser.profileImageUrl,
    };

    return true;
  } catch (error) {
    console.error('Failed to update user:', error);
    return false;
  }
};

const addFavorite = async (userId, ratId) => {
  const response = await axios.get(JSON_BIN_URL, {
    headers: {'X-Master-Key: apiKey'},
  })
};

loadUserSession(); // Initialize session on load

export const useAuth = () => {
  return {
    auth,
    login,
    logout,
    loadUserSession,
    addUser,
    editUser
  };
};
