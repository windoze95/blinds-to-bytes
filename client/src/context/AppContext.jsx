import { createContext, useContext, useReducer, useEffect } from 'react';
import apiFetch from '../utils/apiFetch.js';

const AppContext = createContext(null);

const initialState = {
  darkMode: true,
  currentSection: 1,
  chatOpen: false,
  chatMessages: [],
  progress: {},
  flashcardProgress: {},
  loading: true,
  isAuthenticated: false,
  authChecking: true,
  username: null,
};

function appReducer(state, action) {
  switch (action.type) {
    case 'SET_DARK_MODE':
      return { ...state, darkMode: action.payload };
    case 'SET_CURRENT_SECTION':
      return { ...state, currentSection: action.payload };
    case 'TOGGLE_CHAT':
      return { ...state, chatOpen: !state.chatOpen };
    case 'SET_CHAT_OPEN':
      return { ...state, chatOpen: action.payload };
    case 'ADD_CHAT_MESSAGE':
      return { ...state, chatMessages: [...state.chatMessages, action.payload] };
    case 'SET_PROGRESS':
      return { ...state, progress: action.payload };
    case 'UPDATE_PROGRESS':
      return {
        ...state,
        progress: {
          ...state.progress,
          [action.payload.key]: action.payload.value,
        },
      };
    case 'SET_FLASHCARD_PROGRESS':
      return { ...state, flashcardProgress: action.payload };
    case 'UPDATE_FLASHCARD':
      return {
        ...state,
        flashcardProgress: {
          ...state.flashcardProgress,
          [action.payload.cardId]: action.payload.data,
        },
      };
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_AUTH':
      return {
        ...state,
        isAuthenticated: action.payload.isAuthenticated,
        username: action.payload.username,
        authChecking: false,
      };
    case 'LOGOUT':
      return { ...state, isAuthenticated: false, username: null, authChecking: false };
    default:
      return state;
  }
}

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  // Auth verification
  useEffect(() => {
    async function verifyAuth() {
      const token = localStorage.getItem('btb_token');
      if (!token) {
        dispatch({ type: 'SET_AUTH', payload: { isAuthenticated: false, username: null } });
        return;
      }
      try {
        const res = await fetch('/api/auth/verify', {
          headers: { Authorization: 'Bearer ' + token },
        });
        if (res.ok) {
          const data = await res.json();
          dispatch({ type: 'SET_AUTH', payload: { isAuthenticated: true, username: data.username } });
        } else {
          localStorage.removeItem('btb_token');
          dispatch({ type: 'SET_AUTH', payload: { isAuthenticated: false, username: null } });
        }
      } catch {
        localStorage.removeItem('btb_token');
        dispatch({ type: 'SET_AUTH', payload: { isAuthenticated: false, username: null } });
      }
    }
    verifyAuth();
  }, []);

  // Listen for auth:logout events from apiFetch
  useEffect(() => {
    function handleLogout() {
      dispatch({ type: 'LOGOUT' });
    }
    window.addEventListener('auth:logout', handleLogout);
    return () => window.removeEventListener('auth:logout', handleLogout);
  }, []);

  // Load progress only when authenticated
  useEffect(() => {
    if (!state.isAuthenticated) return;

    async function loadProgress() {
      try {
        const res = await apiFetch('/api/progress');
        if (res.ok) {
          const data = await res.json();
          dispatch({ type: 'SET_PROGRESS', payload: data.progress || {} });
          dispatch({ type: 'SET_FLASHCARD_PROGRESS', payload: data.flashcardProgress || {} });
        }
      } catch {
        // Server not running — offline mode
      } finally {
        dispatch({ type: 'SET_LOADING', payload: false });
      }
    }
    loadProgress();
  }, [state.isAuthenticated]);

  useEffect(() => {
    if (state.darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [state.darkMode]);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
}
