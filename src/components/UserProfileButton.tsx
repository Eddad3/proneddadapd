import React, { useState } from 'react';
import { User as UserIcon } from 'lucide-react';
import { UserProfileModal } from './UserProfileModal';
import { useAuth } from '../hooks/useAuth';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';

export const UserProfileButton: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userName, setUserName] = useState<string>('');
  const { user } = useAuth();

  React.useEffect(() => {
    const fetchUserName = async () => {
      if (user) {
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        if (userDoc.exists()) {
          setUserName(userDoc.data().fullName);
        }
      }
    };
    fetchUserName();
  }, [user]);

  return (
    <div className="relative">
      <button
        onClick={() => setIsModalOpen(true)}
        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-primary/20 to-primary/10 hover:from-primary/30 hover:to-primary/20 transition-all duration-300 border border-primary/20 hover:border-primary/30"
      >
        <div className="bg-primary/20 p-1.5 rounded-full">
          <UserIcon size={18} className="text-primary" />
        </div>
        <span className="text-sm text-white font-medium truncate max-w-[120px]">
          {userName}
        </span>
      </button>

      {isModalOpen && (
        <UserProfileModal onClose={() => setIsModalOpen(false)} userName={userName} />
      )}
    </div>
  );
};