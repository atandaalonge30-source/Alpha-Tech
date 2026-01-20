import React, { useState, useEffect } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc, collection, getDocs } from 'firebase/firestore';
import { auth, db } from '../src/firebase';
import { CheckCircle, User, Mail, Lock } from 'lucide-react';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState<'success' | 'error' | ''>('');
  const [totalUsers, setTotalUsers] = useState(0);

  // Fetch total registered users
  useEffect(() => {
    const fetchTotalUsers = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'users'));
        setTotalUsers(querySnapshot.size);
      } catch (error) {
        console.error('Error fetching total users:', error);
      }
    };
    fetchTotalUsers();
  }, []);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    setMessageType('');

    // Validation
    if (password !== confirmPassword) {
      setMessage('❌ Passwords do not match');
      setMessageType('error');
      setLoading(false);
      return;
    }

    if (password.length < 6) {
      setMessage('❌ Password must be at least 6 characters');
      setMessageType('error');
      setLoading(false);
      return;
    }

    try {
      // Create user account
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Store user data in Firestore (private to user)
      await setDoc(doc(db, 'users', user.uid), {
        name: name,
        email: email,
        createdAt: new Date().toISOString(),
        userId: user.uid
      });

      setMessage('✅ Registration successful! Welcome to Alpha Tech');
      setMessageType('success');
      setTotalUsers(totalUsers + 1);
      
      // Clear form
      setName('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');

      // Reset message after 3 seconds
      setTimeout(() => {
        setMessage('');
        setMessageType('');
      }, 3000);
    } catch (error: any) {
      let errorMsg = '❌ Registration failed';
      if (error.code === 'auth/email-already-in-use') {
        errorMsg = '❌ Email already in use';
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
              Join Alpha Tech
            </h2>
            <p className="text-blue-100 text-sm font-medium">
              Create your account and start learning
            </p>
          </div>

          {/* Form Container */}
          <div className="p-8">
            {/* User Stats */}
            <div className="bg-blue-50 rounded-2xl p-4 mb-6 border border-[#003366]/10">
              <div className="flex items-center justify-center gap-2">
                <User className="w-5 h-5 text-[#003366]" />
                <p className="text-sm text-[#003366] font-semibold">
                  <span className="text-2xl font-bold text-[#FFCC00]">{totalUsers}+</span> Students Already Registered
                </p>
              </div>
            </div>

            <form onSubmit={handleRegister} className="space-y-4">
              {/* Full Name */}
              <div>
                <label className="block text-sm font-bold text-[#003366] mb-2">
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-3 w-5 h-5 text-[#FFCC00]" />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    placeholder="John Doe"
                    className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[#FFCC00] transition-colors"
                  />
                </div>
              </div>

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

              {/* Confirm Password */}
              <div>
                <label className="block text-sm font-bold text-[#003366] mb-2">
                  Confirm Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 w-5 h-5 text-[#FFCC00]" />
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
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
                {loading ? 'Creating Account...' : (
                  <>
                    <CheckCircle className="w-5 h-5" />
                    Create Account
                  </>
                )}
              </button>
            </form>

            {/* Message Display */}
            {message && (
              <div className={`mt-4 p-4 rounded-lg text-center font-semibold ${
                messageType === 'success' 
                  ? 'bg-green-100 text-green-700 border-2 border-green-300' 
                  : 'bg-red-100 text-red-700 border-2 border-red-300'
              }`}>
                {message}
              </div>
            )}

            {/* Privacy Notice */}
            <div className="mt-6 p-4 bg-yellow-50 rounded-lg border-2 border-[#FFCC00]/30">
              <p className="text-xs text-slate-600 text-center">
                <span className="font-bold text-[#003366]">🔒 Your Privacy Matters:</span> Your account is private and only visible to you. Your information is secure and will not be shared with other users.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
