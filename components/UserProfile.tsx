import React, { useState, useEffect } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { signOut } from 'firebase/auth';
import { db, auth } from '../src/firebase';
import { LogOut, User, Mail, Calendar, Lock, Edit2, BookOpen, DollarSign } from 'lucide-react';

interface Course {
  id: string;
  title: string;
  description: string;
  priceNGN: number;
  priceUSD: number;
  duration: string;
  level: string;
  enrolled?: boolean;
}

interface UserProfileProps {
  userId: string;
}

export default function UserProfile({ userId }: UserProfileProps) {
  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [showCourseModal, setShowCourseModal] = useState(false);

  const courses: Course[] = [
    {
      id: '1',
      title: 'UI/UX Design Training',
      description: 'Master user-centric design principles, wireframing, prototyping, and high-fidelity design in Figma.',
      priceNGN: 150000,
      priceUSD: 98,
      duration: '8 weeks',
      level: 'Beginner to Advanced'
    },
    {
      id: '2',
      title: 'Web & Mobile Development',
      description: 'Full-stack web development with React, Node.js, and modern frameworks. Build real-world projects.',
      priceNGN: 200000,
      priceUSD: 130,
      duration: '12 weeks',
      level: 'Intermediate to Advanced'
    },
    {
      id: '3',
      title: 'Data Analysis',
      description: 'Transform data into insights using Python, SQL, and analytics tools. Coming soon!',
      priceNGN: 0,
      priceUSD: 0,
      duration: '10 weeks',
      level: 'Intermediate',
      enrolled: false
    },
    {
      id: '4',
      title: 'Computer Basics - MS Office',
      description: 'Master MS Word, Excel, PowerPoint, and essential office tools. Perfect for beginners.',
      priceNGN: 70000,
      priceUSD: 46,
      duration: '4 weeks',
      level: 'Beginner'
    }
  ];

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

  const handleCourseSelect = (course: Course) => {
    setSelectedCourse(course);
    setShowCourseModal(true);
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
        <div className="max-w-6xl mx-auto flex justify-between items-center">
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
      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Profile Card */}
        <div className="bg-white rounded-3xl shadow-lg overflow-hidden border-2 border-gray-100 mb-12">
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

        {/* Available Courses Section */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-[#003366] mb-8 flex items-center gap-3">
            <BookOpen className="w-8 h-8 text-[#FFCC00]" />
            Available Courses
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {courses.map((course) => (
              <div 
                key={course.id}
                className="group bg-white rounded-3xl shadow-lg overflow-hidden border-2 border-gray-100 hover:border-[#FFCC00] hover:shadow-2xl hover:shadow-yellow-500/10 transition-all duration-300 p-6"
              >
                <div className="mb-4">
                  <div className="inline-block px-3 py-1 bg-[#FFCC00]/20 text-[#003366] rounded-full text-xs font-bold">
                    {course.level}
                  </div>
                </div>

                <h3 className="text-xl font-bold text-[#003366] mb-2">
                  {course.title}
                </h3>

                <p className="text-slate-600 text-sm mb-4 leading-relaxed">
                  {course.description}
                </p>

                <div className="space-y-3 mb-6 py-4 border-t border-b border-gray-200">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-600 font-semibold">Duration:</span>
                    <span className="text-[#003366] font-bold">{course.duration}</span>
                  </div>
                  {course.priceNGN > 0 && (
                    <>
                      <div className="flex items-center justify-between">
                        <span className="text-slate-600 font-semibold">Price (NGN):</span>
                        <span className="text-lg font-extrabold text-[#FFCC00]">
                          ₦{course.priceNGN.toLocaleString()}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-slate-600 font-semibold">Price (USD):</span>
                        <span className="text-lg font-extrabold text-[#FFCC00]">
                          ${course.priceUSD}
                        </span>
                      </div>
                    </>
                  )}
                  {course.priceNGN === 0 && (
                    <div className="flex items-center justify-between">
                      <span className="text-slate-600 font-semibold">Status:</span>
                      <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-bold">
                        Coming Soon
                      </span>
                    </div>
                  )}
                </div>

                {course.priceNGN > 0 && (
                  <button
                    onClick={() => handleCourseSelect(course)}
                    className="w-full px-6 py-3 bg-gradient-to-r from-[#003366] to-[#FFCC00] text-white font-bold rounded-lg hover:shadow-lg transition-all group-hover:scale-105 active:scale-95"
                  >
                    Enroll Now
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Account Security */}
        <div className="bg-white rounded-3xl shadow-lg overflow-hidden border-2 border-gray-100 p-8">
          <h3 className="text-xl font-bold text-[#003366] mb-6 flex items-center gap-2">
            <Lock className="w-6 h-6 text-[#FFCC00]" />
            Account Security
          </h3>
          <div className="p-4 bg-green-50 rounded-lg border border-green-200">
            <p className="text-sm text-green-700">
              ✅ Your account is secure and private. Only you can access this information.
            </p>
          </div>
        </div>
      </div>

      {/* Course Detail Modal */}
      {showCourseModal && selectedCourse && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          <div className="absolute inset-0 bg-[#003366]/60 backdrop-blur-sm" onClick={() => setShowCourseModal(false)}></div>
          <div className="relative bg-white w-full max-w-md rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200 p-8">
            <button 
              onClick={() => setShowCourseModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 text-2xl"
            >
              ✕
            </button>

            <h2 className="text-2xl font-bold text-[#003366] mb-4">
              {selectedCourse.title}
            </h2>

            <p className="text-slate-600 mb-6">
              {selectedCourse.description}
            </p>

            <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-2xl p-6 mb-6 border-2 border-[#FFCC00]/20">
              <p className="text-sm text-slate-600 mb-2">Course Fee</p>
              <div className="space-y-2">
                <p className="text-3xl font-extrabold text-[#003366]">
                  ₦{selectedCourse.priceNGN.toLocaleString()}
                </p>
                <p className="text-lg font-bold text-[#FFCC00]">
                  ${selectedCourse.priceUSD} USD
                </p>
              </div>
            </div>

            <div className="space-y-3 mb-6">
              <div className="flex items-center gap-2">
                <span className="text-[#003366] font-bold">📅</span>
                <span>{selectedCourse.duration}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[#003366] font-bold">📊</span>
                <span>{selectedCourse.level}</span>
              </div>
            </div>

            <button 
              onClick={() => {
                alert(`Payment processing for ${selectedCourse.title} will be available soon!`);
                setShowCourseModal(false);
              }}
              className="w-full px-6 py-4 bg-gradient-to-r from-[#003366] to-[#FFCC00] text-white font-bold rounded-xl hover:shadow-lg transition-all"
            >
              Proceed to Enroll
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
