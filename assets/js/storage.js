/*
  Module for handling localStorage interactions.
  ---
  This keeps the storage contracts centralized so every page uses the
  same keys and parsing logic.
*/

const USER_PROFILE_KEY = 'rodaVidaUser';
const RODA_VIDA_STORAGE_KEY = 'rodaVidaScores';
const LEGACY_STORAGE_KEY = 'rodaVida10x';

const isLocalStorageAvailable = () => {
  try {
    return typeof window !== 'undefined' && 'localStorage' in window;
  } catch (error) {
    return false;
  }
};

const saveAssessmentData = (data) => {
  if (!isLocalStorageAvailable()) {
    console.warn('localStorage is not available in this environment.');
    return false;
  }

  try {
    window.localStorage.setItem(RODA_VIDA_STORAGE_KEY, JSON.stringify(data));
    return true;
  } catch (error) {
    console.error('Failed to save assessment data:', error);
    return false;
  }
};

const getStoredAssessment = () => {
  if (!isLocalStorageAvailable()) {
    return null;
  }

  try {
    const storedValue = window.localStorage.getItem(RODA_VIDA_STORAGE_KEY)
      || window.localStorage.getItem(LEGACY_STORAGE_KEY);
    return storedValue ? JSON.parse(storedValue) : null;
  } catch (error) {
    console.error('Failed to parse assessment data from storage:', error);
    return null;
  }
};

const clearStoredAssessment = () => {
  if (!isLocalStorageAvailable()) {
    return false;
  }

  try {
    window.localStorage.removeItem(RODA_VIDA_STORAGE_KEY);
    return true;
  } catch (error) {
    console.error('Failed to clear assessment data:', error);
    return false;
  }
};

const saveUserProfile = (data) => {
  if (!isLocalStorageAvailable()) {
    console.warn('localStorage is not available for saving the user profile.');
    return false;
  }

  try {
    window.localStorage.setItem(USER_PROFILE_KEY, JSON.stringify(data));
    return true;
  } catch (error) {
    console.error('Failed to save user profile:', error);
    return false;
  }
};

const getStoredUserProfile = () => {
  if (!isLocalStorageAvailable()) {
    return null;
  }

  try {
    const raw = window.localStorage.getItem(USER_PROFILE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch (error) {
    console.error('Failed to parse user profile from storage:', error);
    return null;
  }
};
