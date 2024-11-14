import React, { useState } from 'react';
import { Phone } from 'lucide-react';
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
import { auth } from '../../lib/firebase';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export const PhoneLoginForm: React.FC = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [confirmationResult, setConfirmationResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const setupRecaptcha = () => {
    if (!(window as any).recaptchaVerifier) {
      (window as any).recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
        size: 'normal',
        callback: () => {
          // reCAPTCHA solved
        },
      });
    }
  };

  const handleSendCode = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      setLoading(true);
      setupRecaptcha();
      
      const formattedNumber = phoneNumber.startsWith('+') ? phoneNumber : `+${phoneNumber}`;
      const confirmation = await signInWithPhoneNumber(
        auth,
        formattedNumber,
        (window as any).recaptchaVerifier
      );
      
      setConfirmationResult(confirmation);
      toast.success('Code envoyé!');
    } catch (error: any) {
      let errorMessage = 'Erreur lors de l\'envoi du code';
      
      if (error.code === 'auth/billing-not-enabled') {
        errorMessage = 'La connexion par téléphone est temporairement indisponible. Veuillez utiliser une autre méthode de connexion.';
      } else if (error.code === 'auth/invalid-phone-number') {
        errorMessage = 'Numéro de téléphone invalide. Veuillez vérifier le format (+33612345678)';
      } else if (error.code === 'auth/too-many-requests') {
        errorMessage = 'Trop de tentatives. Veuillez réessayer plus tard.';
      }
      
      toast.error(errorMessage);
      if (error.code === 'auth/billing-not-enabled') {
        // Rediriger vers la connexion par email si la connexion par téléphone n'est pas disponible
        window.location.href = '/auth';
      }
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyCode = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!confirmationResult) return;

    try {
      setLoading(true);
      await confirmationResult.confirm(verificationCode);
      toast.success('Connexion réussie!');
      navigate('/');
    } catch (error: any) {
      let errorMessage = 'Code incorrect';
      if (error.code === 'auth/code-expired') {
        errorMessage = 'Le code a expiré. Veuillez demander un nouveau code.';
      }
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {!confirmationResult ? (
        <form onSubmit={handleSendCode} className="space-y-6">
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-200">
              Numéro de téléphone
            </label>
            <div className="mt-1 relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Phone className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="phone"
                type="tel"
                required
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="bg-dark-lighter block w-full pl-10 pr-3 py-2 border border-gray-600 rounded-md focus:ring-primary focus:border-primary text-white"
                placeholder="+33612345678"
                pattern="^\+[1-9]\d{1,14}$"
                title="Format: +33612345678"
              />
            </div>
            <p className="mt-1 text-sm text-gray-400">
              Format: +33612345678
            </p>
          </div>

          <div id="recaptcha-container"></div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Envoi...' : 'Envoyer le code'}
          </button>
        </form>
      ) : (
        <form onSubmit={handleVerifyCode} className="space-y-6">
          <div>
            <label htmlFor="code" className="block text-sm font-medium text-gray-200">
              Code de vérification
            </label>
            <input
              id="code"
              type="text"
              required
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
              className="mt-1 bg-dark-lighter block w-full px-3 py-2 border border-gray-600 rounded-md focus:ring-primary focus:border-primary text-white"
              placeholder="123456"
              pattern="[0-9]{6}"
              maxLength={6}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Vérification...' : 'Vérifier le code'}
          </button>
        </form>
      )}
    </div>
  );
};