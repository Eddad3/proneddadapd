import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Crown } from 'lucide-react';
import { LoginForm } from '../components/auth/LoginForm';
import { RegisterForm } from '../components/auth/RegisterForm';
import { Footer } from '../components/Footer';
import { useAuth } from '../hooks/useAuth';

export const Auth: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  return (
    <div className="min-h-screen bg-dark-lighter flex flex-col">
      <div className="flex-grow flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <div className="flex items-center justify-center gap-2 mb-6">
            <Crown className="text-primary h-6 w-6" />
            {!isLogin && (
              <span className="text-2xl font-bold bg-gradient-to-r from-primary via-yellow-500 to-primary bg-clip-text text-transparent animate-pulse hover:scale-105 transition-transform duration-300">
                PRONEDDAD
              </span>
            )}
          </div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
            {isLogin ? 'Connectez-vous à votre compte' : 'Créez votre compte'}
          </h2>
          <p className="mt-2 text-center text-sm text-gray-400">
            {isLogin ? "Pas encore de compte ?" : "Déjà inscrit ?"}{' '}
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="font-medium text-primary hover:text-primary-hover"
            >
              {isLogin ? "S'inscrire" : "Se connecter"}
            </button>
          </p>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-dark px-4 py-8 shadow sm:rounded-lg sm:px-10">
            <div className="space-y-6">
              {isLogin ? <LoginForm /> : <RegisterForm />}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};