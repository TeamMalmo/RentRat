import { ref } from 'vue';
// Axios for making HTTP requests
import axios from 'axios';
// Our API key and URL
import { CONFIG } from '@/constant/config';

// Reactive objext to store the auth state
const auth = ref({
  isAuthenticated: false, // Tracks if user is logged in
  userId: null, // Stores logged in users ID
  role: null, // Stores user's role
  username: null, // Stores username
  description: '', // Stores description
  areaOfMalmo: '', // Stores area
  profileImageUrl: '', // Stores profile img. url
  favorites: [], // Stores favorite rats
});

// JSON Bin endpoint and key for where our data will be stored
const JSON_BIN_URL = 'https://api.jsonbin.io/v3/b/675ab4e2ad19ca34f8d9e088';
const apiKey = CONFIG.JSONBIN_API_KEY;

const login = async (username, password) => {
  try {
    // Fetch data from JSON bin
    const response = await axios.get(JSON_BIN_URL, {
      headers: { 'X-Master-Key': apiKey },
    });

    // The list of users
    const users = response.data.record.users;
    // The session data
    const sessions = response.data.record.sessions;

    // Throw error if no match
    const user = users.find((u) => u.username === username && u.password === password);
    if (!user) throw new Error('Invalid username or password');

    // Update the auth state with the values from the user's data
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

    // Update session data for logged in user
    sessions[user.id] = {
      isAuthenticated: true,
      lastLogin: new Date().toISOString(),
    };

    // Save the updated data back to the bin
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

    // Indicate successful login with true status
    return true;
  } catch (error) {
    console.error('Login failed:', error);
    // Indicate failed login
    return false;
  }
};


const logout = async (userId) => {
  try {
    // Reset the local auth state 
    auth.value = {
      isAuthenticated: false,
      userId: null,
      role: null,
      username: null,
    };

    // Fetch current sessin data
    const response = await axios.get(JSON_BIN_URL, {
      headers: { 'X-Master-Key': apiKey },
    });

    const sessions = response.data.record.sessions;

    // Set the user's session as unauthenticated
    if (sessions[userId]) {
      sessions[userId].isAuthenticated = false;
    } else {
      throw new Error('Session not found for user');
    }

    // Save updated session data to bin
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
    // Fetch user and session data from bin
    const response = await axios.get(JSON_BIN_URL, {
      headers: { 'X-Master-Key': apiKey },
    });

    const users = response.data.record.users;
    const sessions = response.data.record.sessions;

    // Find first active session
    const activeSession = Object.entries(sessions).find(
      ([id, session]) => session.isAuthenticated
    );

    if (activeSession) {
      const [userId, session] = activeSession;
      const user = users.find((u) => u.id === userId);

      // If user exists update the auth state
      if (user) {
        auth.value = {
          isAuthenticated: true,
          userId,
          role: user.role,
          username: user.username,
          description: user.description || '',  // Add missing fields
          areaOfMalmo: user.areaOfMalmo || '',  // Add missing fields
          profileImageUrl: user.profileImageUrl || '',  // Add missing fields
          favorites: user.favorites || [],
        };
      }
    }
  } catch (error) {
    console.error('Failed to load user session:', error);
  }
};


export const addUser = async (newUser, confirmPassword) => {
  try {
    // Make sure passwords are the same
    if (newUser.password !== confirmPassword) {
      throw new Error('Passwords do not match.');
    }

    // Fetch curretn data from bin
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

    // Save the updated data to bin
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
    // Fetch current user data
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
      // If favorites are not provided, use the existing favorites
      favorites: updatedUser.favorites !== undefined 
      ? updatedUser.favorites 
      : (users[userIndex].favorites || [])
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
      favorites: updatedUser.favorites,
    };

    return true;
  } catch (error) {
    console.error('Failed to update user:', error);
    return false;
  }
};

const fetchAllUsers = async () => {
  try {
    const response = await axios.get(JSON_BIN_URL, {
      headers: {
        'Content-Type': 'application/json',
        'X-Master-Key': apiKey,
      },
    });

    return response.data.record.users; // Return users directly
  } catch (err) {
    console.error('Failed to fetch users:', err);
    return []; // Return an empty array on error
  }
};



loadUserSession(); // Initialize session on load

export const useAuth = () => {
  return {
    auth,
    login,
    logout,
    loadUserSession,
    addUser,
    editUser,
    fetchAllUsers
  };
};
