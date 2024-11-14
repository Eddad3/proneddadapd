import React, { useState } from 'react';
import { X, Edit2, Save, MessageCircle, Youtube, LogOut, User as UserIcon } from 'lucide-react';
import { auth, db } from '../lib/firebase';
import { doc, updateDoc } from 'firebase/firestore';
import { updateEmail, signOut } from 'firebase/auth';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

interface UserProfileModalProps {
  onClose: () => void;
  userName: string;
}

export const UserProfileModal: React.FC<UserProfileModalProps> = ({ onClose, userName: initialUserName }) => {
  const [isEditingName, setIsEditingName] = useState(false);
  const [isEditingEmail, setIsEditingEmail] = useState(false);
  const [newName, setNewName] = useState(initialUserName);
  const [newEmail, setNewEmail] = useState(auth.currentUser?.email || '');
  const navigate = useNavigate();

  const handleUpdateProfile = async () => {
    if (!auth.currentUser) return;

    try {
      const userRef = doc(db, 'users', auth.currentUser.uid);
      
      if (newName !== initialUserName) {
        await updateDoc(userRef, {
          fullName: newName
        });
      }

      if (newEmail !== auth.currentUser.email) {
        await updateEmail(auth.currentUser, newEmail);
        await updateDoc(userRef, {
          email: newEmail
        });
      }

      toast.success('Profil mis à jour avec succès');
      setIsEditingName(false);
      setIsEditingEmail(false);
    } catch (error: any) {
      toast.error('Erreur lors de la mise à jour du profil');
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      toast.success('Déconnexion réussie');
      navigate('/auth');
    } catch (error) {
      toast.error('Erreur lors de la déconnexion');
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-gradient-to-b from-dark to-dark-lighter rounded-2xl w-full max-w-md mx-4 overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="relative bg-gradient-to-r from-primary/20 to-primary/10 p-6 pb-12">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
          >
            <X size={20} />
          </button>
          <div className="absolute -bottom-8 left-1/2 -translate-x-1/2">
            <div className="bg-dark-lighter p-4 rounded-full border-4 border-dark">
              <UserIcon size={32} className="text-primary" />
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 pt-12 space-y-6">
          {/* Profile Info */}
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-xs font-medium text-gray-400">Nom complet</label>
              <div className="flex items-center gap-2 bg-dark-lighter p-2 rounded-lg">
                {isEditingName ? (
                  <input
                    type="text"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    className="flex-1 bg-transparent border-none focus:ring-0 text-white"
                  />
                ) : (
                  <span className="flex-1 text-white">{newName}</span>
                )}
                <button
                  onClick={() => {
                    if (isEditingName) {
                      handleUpdateProfile();
                    } else {
                      setIsEditingName(true);
                    }
                  }}
                  className="p-1 hover:bg-dark rounded-md text-primary hover:text-primary-hover transition-colors"
                >
                  {isEditingName ? <Save size={16} /> : <Edit2 size={16} />}
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-medium text-gray-400">Email</label>
              <div className="flex items-center gap-2 bg-dark-lighter p-2 rounded-lg">
                {isEditingEmail ? (
                  <input
                    type="email"
                    value={newEmail}
                    onChange={(e) => setNewEmail(e.target.value)}
                    className="flex-1 bg-transparent border-none focus:ring-0 text-white"
                  />
                ) : (
                  <span className="flex-1 text-white">{newEmail}</span>
                )}
                <button
                  onClick={() => {
                    if (isEditingEmail) {
                      handleUpdateProfile();
                    } else {
                      setIsEditingEmail(true);
                    }
                  }}
                  className="p-1 hover:bg-dark rounded-md text-primary hover:text-primary-hover transition-colors"
                >
                  {isEditingEmail ? <Save size={16} /> : <Edit2 size={16} />}
                </button>
              </div>
            </div>
          </div>

          {/* Contact Links */}
          <div className="grid grid-cols-2 gap-4">
            <a
              href="https://t.me/pronostic70"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 p-3 rounded-lg bg-secondary/10 hover:bg-secondary/20 text-secondary hover:text-secondary-hover transition-all duration-300"
            >
              <MessageCircle size={20} />
              <span className="font-medium">Telegram</span>
            </a>
            <a
              href="https://youtube.com/@proneddad"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 p-3 rounded-lg bg-premium/10 hover:bg-premium/20 text-premium hover:text-premium-hover transition-all duration-300"
            >
              <Youtube size={20} />
              <span className="font-medium">YouTube</span>
            </a>
          </div>

          {/* Logout */}
          <button
            onClick={handleLogout}
            className="w-full p-3 flex items-center justify-center gap-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-500 transition-all duration-300"
          >
            <LogOut size={20} />
            <span className="font-medium">Se déconnecter</span>
          </button>
        </div>
      </div>
    </div>
  );
};