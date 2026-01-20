import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../src/firebase';
import { Mail, Lock, LogIn, AlertCircle } from 'lucide-react';

interface UserLoginProps {
  onLoginSuccess?: () => void;
}

export default function UserLogin({ onLoginSuccess }: UserLoginProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState<'success' | 'error' | ''>('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    setMessageType('');

    try {
      await signInWithEmailAndPassword(auth, email, password);
      setMessage('✅ Login successful! Redirecting...');
      setMessageType('success');
      setEmail('');
      setPassword('');
      
      setTimeout(() => {
        if (onLoginSuccess) onLoginSuccess();
        window.location.reload();
      }, 1500);
    } catch (error: any) {
      let errorMsg = '❌ Login failed';
      if (error.code === 'auth/user-not-found') {
        errorMsg = '❌ Email not found. Please register first.';
      } else if (error.code === 'auth/wrong-password') {
        errorMsg = '❌ Incorrect password';
      } else if (error.code === 'auth/invalid-email') {
        errorMsg = '❌ Invalid email address';
      } else {
        errorMsg = '❌ ' + error.message;
      }
      setMessage(errorMsg);
      setMessageType('error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#003366] via-[#004D99] to-[#003366] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        {/* Card Container */}
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-[#003366] to-[#FFCC00] p-8 text-center">
            <h2 className="text-4xl font-brand font-extrabold text-white mb-2">
              Welcome Back
            </h2>
            <p className="text-blue-100 text-sm font-medium">
              Access your Alpha Tech learning portal
            </p>
          </div>

          {/* Form Container */}
          <div className="p-8">
            <form onSubmit={handleLogin} className="space-y-4">
              {/* Email */}
              <div>
                <label className="block text-sm font-bold text-[#003366] mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 w-5 h-5 text-[#FFCC00]" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="you@example.com"
                    className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[#FFCC00] transition-colors"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-bold text-[#003366] mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 w-5 h-5 text-[#FFCC00]" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    placeholder="••••••••"
                    className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[#FFCC00] transition-colors"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full mt-6 px-6 py-3 bg-gradient-to-r from-[#003366] to-[#FFCC00] text-white font-bold rounded-lg hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading ? 'Logging in...' : (
                  <>
                    <LogIn className="w-5 h-5" />
                    Login to Your Account
                  </>
                )}
              </button>
            </form>

            {/* Message Display */}
            {message && (
              <div className={`mt-4 p-4 rounded-lg text-center font-semibold flex items-center gap-2 ${
                messageType === 'success' 
                  ? 'bg-green-100 text-green-700 border-2 border-green-300' 
                  : 'bg-red-100 text-red-700 border-2 border-red-300'
              }`}>
                {messageType === 'error' && <AlertCircle className="w-5 h-5 flex-shrink-0" />}
                <span>{message}</span>
              </div>
            )}

            {/* Register Link */}
            <div className="mt-6 pt-6 border-t border-gray-200">
              <p className="text-center text-slate-600">
                Don't have an account?{' '}
                <a href="#register" className="text-[#003366] font-bold hover:text-[#FFCC00] transition-colors">
                  Register here
                </a>
              </p>
            </div>

            {/* Help Section */}
            <div className="mt-6 p-4 bg-blue-50 rounded-lg border-2 border-[#003366]/10">
              <p className="text-xs text-slate-600 text-center">
                <span className="font-bold text-[#003366]">💡 Tip:</span> Use the email and password you registered with to access your account.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
