import { useState } from 'react';
import { Profile } from '../types/finance';
import { BriefcaseIcon, UserIcon } from '@heroicons/react/24/outline';

interface ProfileSelectorProps {
  profiles: Profile[];
  selectedProfileId: string;
  onProfileChange: (profileId: string) => void;
}

export default function ProfileSelector({
  profiles,
  selectedProfileId,
  onProfileChange
}: ProfileSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  
  const selectedProfile = profiles.find(p => p.id === selectedProfileId) || profiles[0] || { id: '', name: 'Select Profile', type: 'personal' };
  
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  
  const handleProfileSelect = (profileId: string) => {
    onProfileChange(profileId);
    setIsOpen(false);
  };
  
  const getProfileIcon = (type: string) => {
    return type === 'business' ? 
      <BriefcaseIcon className="h-4 w-4" /> : 
      <UserIcon className="h-4 w-4" />;
  };
  
  return (
    <div className="relative">
      <button
        type="button"
        onClick={toggleDropdown}
        className="flex items-center space-x-2 bg-white border border-gray-300 rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      >
        <span className="flex items-center">
          {getProfileIcon(selectedProfile.type)}
          <span className="ml-2">{selectedProfile.name}</span>
        </span>
        <svg
          className={`h-5 w-5 text-gray-400 transform transition-transform ${isOpen ? 'rotate-180' : ''}`}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      {isOpen && profiles.length > 0 && (
        <div className="absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50">
          <div className="py-1" role="menu" aria-orientation="vertical">
            {profiles.map((profile) => (
              <button
                key={profile.id}
                onClick={() => handleProfileSelect(profile.id)}
                className={`w-full text-left px-4 py-2 text-sm flex items-center ${
                  profile.id === selectedProfileId 
                    ? 'bg-gray-100 text-gray-900' 
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
                role="menuitem"
              >
                <span className="mr-3 text-gray-500">
                  {getProfileIcon(profile.type)}
                </span>
                {profile.name}
                {profile.isDefault && (
                  <span className="ml-auto text-xs text-gray-500">Default</span>
                )}
              </button>
            ))}
            
            <div className="border-t border-gray-100 my-1"></div>
            
            <button
              className="w-full text-left px-4 py-2 text-sm text-indigo-600 hover:bg-gray-50"
              onClick={() => setIsOpen(false)}
            >
              Manage Profiles
            </button>
          </div>
        </div>
      )}
    </div>
  );
} 