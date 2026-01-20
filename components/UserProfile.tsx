import React, { useState, useEffect } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { signOut } from 'firebase/auth';
import { db, auth } from '../src/firebase';
import { LogOut, User, Mail, Calendar, Lock, Edit2 } from 'lucide-react';

interface UserProfileProps {
  userId: string;
}

export default function UserProfile({ userId }: UserProfileProps) {
  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchUserData();
  }, [userId]);

  const fetchUserData = async () => {
    try {
      const userDoc = await getDoc(doc(db, 'users', userId));
      if (userDoc.exists()) {
        setUserData(userDoc.data());
      }
      setLoading(false);
    } catch (error) {
      console.error('Error fetching user data:', error);
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      window.location.reload();
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#003366] to-[#004D99] flex items-center justify-center">
        <div className="text-white text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-white mb-4"></div>
          <p className="text-lg">Loading your profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#003366] to-[#FFCC00] text-white p-8">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-brand font-extrabold mb-2">
              My Profile
            </h1>
            <p className="text-blue-100">Welcome back to Alpha Tech!</p>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-6 py-3 bg-white/20 hover:bg-white/30 rounded-lg transition-all font-bold"
          >
            <LogOut size={20} /> Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Profile Card */}
        <div className="bg-white rounded-3xl shadow-lg overflow-hidden border-2 border-gray-100 mb-8">
          {/* Cover Section */}
          <div className="h-32 bg-gradient-to-r from-[#003366] to-[#FFCC00]"></div>

          {/* Profile Content */}
          <div className="px-8 pb-8 -mt-16 relative z-10">
            {/* Avatar */}
            <div className="mb-6">
              <div className="w-32 h-32 bg-gradient-to-br from-[#003366] to-[#FFCC00] rounded-2xl flex items-center justify-center border-4 border-white shadow-lg">
                <User className="w-16 h-16 text-white" />
              </div>
            </div>

            {/* User Info */}
            <div className="pt-4">
              <h2 className="text-3xl font-bold text-[#003366] mb-8">
                {userData?.name || 'User Profile'}
              </h2>

              {/* Info Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Email Card */}
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-6 border-2 border-[#003366]/20">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-[#003366] rounded-lg flex items-center justify-center">
                      <Mail className="w-6 h-6 text-[#FFCC00]" />
                    </div>
                    <label className="text-sm font-bold text-[#003366] uppercase">Email</label>
                  </div>
                  <p className="text-slate-700 font-semibold break-all">
                    {userData?.email || 'Not available'}
                  </p>
                </div>

                {/* Registration Date Card */}
                <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-2xl p-6 border-2 border-[#FFCC00]/20">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-[#FFCC00] rounded-lg flex items-center justify-center">
                      <Calendar className="w-6 h-6 text-[#003366]" />
                    </div>
                    <label className="text-sm font-bold text-[#003366] uppercase">Joined</label>
                  </div>
                  <p className="text-slate-700 font-semibold">
                    {userData?.createdAt 
                      ? new Date(userData.createdAt).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })
                      : 'Not available'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-[#003366] to-[#004D99] rounded-3xl p-8 md:p-12 text-white">
          <h3 className="text-2xl font-bold mb-4">Welcome to Your Learning Journey! 🎓</h3>
          <p className="text-blue-100 mb-6 leading-relaxed">
            You're now part of the Alpha Tech community with access to premium learning resources. Explore our training programs, connect with other learners, and build your career in tech.
          </p>
          
          {/* Quick Links */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-6 border-t border-blue-400/30">
            <a href="#" className="block p-4 bg-white/10 hover:bg-white/20 rounded-lg transition-all">
              <p className="font-bold text-[#FFCC00]">📚 View Courses</p>
              <p className="text-sm text-blue-100 mt-1">Explore training programs</p>
            </a>
            <a href="#" className="block p-4 bg-white/10 hover:bg-white/20 rounded-lg transition-all">
              <p className="font-bold text-[#FFCC00]">👥 Connect</p>
              <p className="text-sm text-blue-100 mt-1">Join the community</p>
            </a>
            <a href="#" className="block p-4 bg-white/10 hover:bg-white/20 rounded-lg transition-all">
              <p className="font-bold text-[#FFCC00]">📊 Progress</p>
              <p className="text-sm text-blue-100 mt-1">Track your learning</p>
            </a>
          </div>
        </div>

        {/* Account Info */}
        <div className="mt-8 bg-white rounded-3xl shadow-lg overflow-hidden border-2 border-gray-100 p-8">
          <h3 className="text-xl font-bold text-[#003366] mb-6 flex items-center gap-2">
            <Lock className="w-6 h-6 text-[#FFCC00]" />
            Account Security
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200">
              <div>
                <p className="font-semibold text-slate-700">Password</p>
                <p className="text-sm text-slate-500">Last changed: Never</p>
              </div>
              <button className="px-4 py-2 bg-[#003366] text-white rounded-lg hover:shadow-lg transition-all flex items-center gap-2">
                <Edit2 className="w-4 h-4" />
                Update
              </button>
            </div>
            <div className="p-4 bg-green-50 rounded-lg border border-green-200">
              <p className="text-sm text-green-700">
                ✅ Your account is secure and private. Only you can access this information.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
