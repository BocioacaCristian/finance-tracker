import { Profile } from '../types/finance';

// Initial profiles data
let profiles: Profile[] = [
  {
    id: 'personal',
    name: 'Personal',
    type: 'personal',
    currency: 'RON',
    isDefault: true
  },
  {
    id: 'business',
    name: 'My Firm',
    type: 'business',
    currency: 'RON'
  }
];

// Get all profiles
export const getAllProfiles = (): Profile[] => {
  return [...profiles];
};

// Get profile by ID
export const getProfileById = (id: string): Profile | undefined => {
  return profiles.find(profile => profile.id === id);
};

// Get default profile
export const getDefaultProfile = (): Profile => {
  const defaultProfile = profiles.find(profile => profile.isDefault);
  return defaultProfile || profiles[0];
};

// Add a new profile
export const addProfile = (profile: Omit<Profile, 'id'>): Profile => {
  const newProfile = {
    ...profile,
    id: Date.now().toString()
  };
  
  // If this is marked as default, update other profiles
  if (newProfile.isDefault) {
    profiles = profiles.map(p => ({
      ...p,
      isDefault: false
    }));
  }
  
  profiles = [...profiles, newProfile];
  return newProfile;
};

// Update a profile
export const updateProfile = (updatedProfile: Profile): Profile | null => {
  const index = profiles.findIndex(p => p.id === updatedProfile.id);
  if (index === -1) return null;
  
  // If this is marked as default, update other profiles
  if (updatedProfile.isDefault) {
    profiles = profiles.map(p => ({
      ...p,
      isDefault: p.id === updatedProfile.id
    }));
  }
  
  profiles[index] = updatedProfile;
  return updatedProfile;
};

// Delete a profile
export const deleteProfile = (id: string): boolean => {
  const initialLength = profiles.length;
  const profileToDelete = profiles.find(p => p.id === id);
  
  // Don't allow deleting if it's the only profile
  if (profiles.length <= 1) {
    return false;
  }
  
  // If deleting the default profile, make another one default
  if (profileToDelete?.isDefault) {
    const remainingProfiles = profiles.filter(p => p.id !== id);
    if (remainingProfiles.length > 0) {
      remainingProfiles[0].isDefault = true;
    }
  }
  
  profiles = profiles.filter(profile => profile.id !== id);
  return profiles.length < initialLength;
}; 