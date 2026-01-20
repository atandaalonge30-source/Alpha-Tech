
// Alpha Tech - Latest Version 2.0
import React, { useState, useEffect } from 'react';
import { 
  Phone, 
  Mail, 
  Linkedin, 
  Globe, 
  Code, 
  Palette, 
  BarChart3, 
  ShieldCheck, 
  Monitor, 
  CheckCircle2, 
  User, 
  ChevronRight,
  MessageSquare,
  X,
  Send
} from 'lucide-react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './src/firebase';
import Logo from './components/Logo';
import ServiceCard from './components/ServiceCard';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import AdminLogin from './components/AdminLogin';
import UserLogin from './components/UserLogin';
import UserProfile from './components/UserProfile';
import TrainedStudents from './components/TrainedStudents';
import { GoogleGenAI } from "@google/genai";

// Data from the image flyer
const academicServices = [
  "Grant Proposal Writing",
  "Data Analysis & Interpretation",
  "Technical & Scientific Reports",
  "Thesis & Dissertation Assistance",
  "Systematic Reviews & Meta-Analysis",
  "Research Project Writing",
  "Conference Papers Writing",
  "Book Chapter & Academic Books",
  "Academic Editing & Proofreading",
  "Journal Article Writing & Reviewing"
];

// Tech Training Programs requested
const trainingPrograms = [
  { id: '1', title: 'UI/UX Trainee', description: 'Master user-centric design principles, wireframing, and high-fidelity prototyping.', status: 'active', icon: <Palette className="w-6 h-6" /> },
  { id: '2', title: 'Web Development', description: 'Full-stack mastery from HTML/CSS to advanced React and Backend systems.', status: 'active', icon: <Code className="w-6 h-6" /> },
  { id: '3', title: 'Computer Trainee Software', description: 'Essential software skills and computational logic for modern office environments.', status: 'active', icon: <Monitor className="w-6 h-6" /> },
  { id: '4', title: 'Data Analysis', description: 'Transform raw data into actionable insights using Python, R, and SQL.', status: 'coming_soon', icon: <BarChart3 className="w-6 h-6" /> },
  { id: '5', title: 'Cyber Security', description: 'Defense mechanisms, ethical hacking, and network security protocols.', status: 'coming_soon', icon: <ShieldCheck className="w-6 h-6" /> },
  { id: '6', title: 'Graphics Design Trainee', description: 'Visual communication through typography, color theory, and digital art.', status: 'active', icon: <Palette className="w-6 h-6" /> },
];

const App: React.FC = () => {
  const [chatOpen, setChatOpen] = useState(false);
  const [chatMessage, setChatMessage] = useState('');
  const [chatHistory, setChatHistory] = useState<{role: string, text: string}[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [showDashboard, setShowDashboard] = useState(false);
  const [userType, setUserType] = useState<'regular' | 'admin' | null>(null); // Track user type
  const [showUserLogin, setShowUserLogin] = useState(false); // Track if showing user login
  const [showUserProfile, setShowUserProfile] = useState(false); // Track if showing user profile
  
  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<'contact' | 'training'>('contact');
  const [selectedProgram, setSelectedProgram] = useState<string | null>(null);
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Check if user is logged in
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        // Check if user is admin or regular user
        // For now, we'll assume regular users unless they login via admin login
        // If they came through normal login, show their profile
        if (!showDashboard) {
          setUserType('regular');
          setShowUserProfile(true);
        }
      } else {
        setShowUserProfile(false);
        setShowDashboard(false);
        setUserType(null);
      }
    });
    return unsubscribe;
  }, []);

  // Smooth scroll helper
  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const openTrainingModal = (programTitle?: string) => {
    setModalType('training');
    setSelectedProgram(programTitle || null);
    setIsModalOpen(true);
    setFormSubmitted(false);
  };

  const openContactModal = () => {
    setModalType('contact');
    setIsModalOpen(true);
    setFormSubmitted(false);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => {
      setIsModalOpen(false);
      setFormSubmitted(false);
    }, 3000);
  };

  const handleSendMessage = async () => {
    if (!chatMessage.trim()) return;
    
    const userMsg = chatMessage;
    setChatMessage('');
    setChatHistory(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsTyping(true);

    try {
      // Corrected: Initializing GoogleGenAI using process.env.API_KEY directly as per guidelines
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: userMsg,
        config: {
          systemInstruction: `You are an AI assistant for ALPHA TECH. CEO: Alonge Muhammed. Services: Academic writing, Data Analysis, Web Dev, UI/UX, Cyber Security. Location: Nigeria. Be professional, helpful, and concise.`
        }
      });
      // Corrected: accessing response.text property directly
      setChatHistory(prev => [...prev, { role: 'model', text: response.text || "I'm sorry, I couldn't process that." }]);
    } catch (error) {
      console.error(error);
      setChatHistory(prev => [...prev, { role: 'model', text: "Service temporarily unavailable. Please contact us directly!" }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <>
      {/* Admin Dashboard - shown when admin logs in */}
      {showDashboard && user && userType === 'admin' ? (
        <Dashboard />
      ) : showDashboard && !user && userType === 'admin' ? (
        <AdminLogin onLoginSuccess={() => setShowDashboard(true)} />
      ) : 
      /* User Profile - shown when regular user logs in */
      showUserProfile && user && userType === 'regular' ? (
        <UserProfile userId={user.uid} />
      ) :
      /* User Login - shown when user clicks login button */
      showUserLogin ? (
        <UserLogin onLoginSuccess={() => {
          setShowUserLogin(false);
          setShowUserProfile(true);
          setUserType('regular');
        }} />
      ) :
      /* Main Website - default view */
      (
        <div className="min-h-screen flex flex-col font-sans text-slate-900 overflow-x-hidden scroll-smooth">
      {/* Lead Generation Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center px-4">
          <div className="absolute inset-0 bg-[#003366]/60 backdrop-blur-sm" onClick={() => setIsModalOpen(false)}></div>
          <div className="relative bg-white w-full max-w-md rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
            <button onClick={() => setIsModalOpen(false)} className="absolute top-4 right-4 text-slate-400 hover:text-slate-600">
              <X className="w-6 h-6" />
            </button>
            
            {formSubmitted ? (
              <div className="p-12 text-center">
                <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-brand font-bold text-[#003366] mb-2">Success!</h3>
                <p className="text-slate-500">Thank you for reaching out. An Alpha Tech representative will contact you shortly.</p>
              </div>
            ) : (
              <div className="p-8">
                <h3 className="text-2xl font-brand font-bold text-[#003366] mb-2">
                  {modalType === 'training' ? `Join ${selectedProgram || 'Our Academy'}` : 'Get in Touch'}
                </h3>
                <p className="text-slate-500 text-sm mb-6 italic">Enter your details and our team will handle the rest.</p>
                
                <form onSubmit={handleFormSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-slate-400 mb-1">Full Name</label>
                    <input required type="text" className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-100 focus:ring-2 focus:ring-[#FFCC00] focus:outline-none" placeholder="John Doe" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-slate-400 mb-1">Email Address</label>
                    <input required type="email" className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-100 focus:ring-2 focus:ring-[#FFCC00] focus:outline-none" placeholder="john@example.com" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-slate-400 mb-1">Phone Number</label>
                    <input required type="tel" className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-100 focus:ring-2 focus:ring-[#FFCC00] focus:outline-none" placeholder="+234 ..." />
                  </div>
                  {modalType === 'contact' && (
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-widest text-slate-400 mb-1">Message</label>
                      <textarea className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-100 focus:ring-2 focus:ring-[#FFCC00] focus:outline-none h-24" placeholder="How can we help?"></textarea>
                    </div>
                  )}
                  <button type="submit" className="w-full py-4 bg-[#003366] text-white font-bold rounded-xl shadow-lg shadow-blue-900/20 hover:scale-[1.02] active:scale-95 transition-all">
                    Submit Request
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 px-6 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <Logo className="w-12 h-12" />
          <span className="font-brand text-xl font-extrabold tracking-tight text-[#003366]">ALPHA TECH</span>
        </div>
        <div className="hidden md:flex space-x-8 text-sm font-semibold uppercase tracking-wider text-slate-600">
          <a href="#services" onClick={(e) => scrollToSection(e, 'services')} className="hover:text-[#003366] transition-colors">Services</a>
          <a href="#training" onClick={(e) => scrollToSection(e, 'training')} className="hover:text-[#003366] transition-colors">Training</a>
          <a href="#students" onClick={(e) => scrollToSection(e, 'students')} className="hover:text-[#003366] transition-colors">Students</a>
          <a href="#ceo" onClick={(e) => scrollToSection(e, 'ceo')} className="hover:text-[#003366] transition-colors">Our CEO</a>
          <a href="#contact" onClick={(e) => scrollToSection(e, 'contact')} className="hover:text-[#003366] transition-colors">Contact</a>
        </div>
        <button 
          onClick={openContactModal}
          className="bg-[#003366] text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg shadow-blue-900/20 hover:scale-105 active:scale-95 transition-all"
        >
          Get Started
        </button>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-20 pb-32 px-6 overflow-hidden bg-white">
        <div className="absolute top-10 right-10 opacity-20 hidden lg:block">
           <div className="grid grid-cols-5 gap-2">
              {[...Array(25)].map((_, i) => <div key={i} className="w-3 h-3 rounded-full bg-[#FFCC00]"></div>)}
           </div>
        </div>
        <div className="absolute bottom-10 left-10 opacity-20 hidden lg:block rotate-45">
           <div className="grid grid-cols-5 gap-2">
              {[...Array(25)].map((_, i) => <div key={i} className="w-3 h-3 rounded-full bg-[#003366]"></div>)}
           </div>
        </div>

        <div className="max-w-6xl mx-auto text-center relative z-10">
          <div className="mb-6 inline-block bg-[#003366]/5 px-4 py-1.5 rounded-full border border-[#003366]/10 text-[#003366] font-bold text-xs uppercase tracking-[0.2em]">
            Beyond the Ordinary
          </div>
          <h1 className="text-5xl md:text-7xl font-brand font-extrabold text-[#003366] mb-6 leading-tight">
            Transforming Ideas Into <br />
            <span className="text-[#FFCC00] italic">Digital Excellence</span>
          </h1>
          <p className="max-w-2xl mx-auto text-slate-500 text-lg md:text-xl mb-10 leading-relaxed">
            Leading the charge in academic research, high-end software development, 
            and industry-standard tech training.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6">
            <button 
              onClick={(e: any) => scrollToSection(e, 'services')}
              className="w-full sm:w-auto px-10 py-4 bg-[#FFCC00] text-[#003366] font-black rounded-xl shadow-xl shadow-yellow-500/20 hover:translate-y-[-2px] active:translate-y-[1px] transition-all flex items-center justify-center"
            >
              Explore Our Services <ChevronRight className="ml-2 w-5 h-5" />
            </button>
            <button 
              // Fixed: Wrapped in arrow function to avoid passing MouseEvent as string argument
              onClick={() => openTrainingModal()}
              className="w-full sm:w-auto px-10 py-4 border-2 border-[#003366] text-[#003366] font-bold rounded-xl hover:bg-[#003366] hover:text-white active:scale-95 transition-all"
            >
              Join Training
            </button>
          </div>
        </div>
      </section>

      {/* Academic Services Section */}
      <section id="services" className="py-24 bg-gray-50 border-y border-gray-100">
        <div className="max-w-6xl mx-auto px-6">
          <div className="bg-white rounded-3xl overflow-hidden shadow-2xl shadow-blue-900/5 border border-gray-100">
            <div className="bg-[#FFCC00] p-6 md:p-10 text-center">
              <h2 className="text-2xl md:text-3xl font-brand font-extrabold text-[#003366] uppercase tracking-wider">
                Our Academic Excellence Services
              </h2>
            </div>
            <div className="p-8 md:p-12">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {academicServices.map((service, idx) => (
                  <ServiceCard key={idx} title={service} />
                ))}
              </div>
              <div className="mt-12 text-center">
                <button 
                  onClick={openContactModal}
                  className="px-8 py-3 bg-[#003366] text-white font-bold rounded-xl shadow-lg hover:scale-105 active:scale-95 transition-all"
                >
                  Request Academic Assistance
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tech Training Programs */}
      <section id="training" className="py-24 bg-white relative">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-brand font-extrabold text-[#003366] mb-4">Tech Training Hub</h2>
            <p className="text-slate-500 max-w-xl mx-auto">Equipping the next generation of digital leaders with market-ready skills and professional mentorship.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {trainingPrograms.map((program) => (
              <div 
                key={program.id} 
                className={`group relative p-8 rounded-2xl border-2 transition-all duration-300 ${
                  program.status === 'coming_soon' 
                  ? 'border-gray-100 bg-gray-50/50 cursor-not-allowed' 
                  : 'border-white bg-white shadow-xl shadow-slate-100 hover:border-[#FFCC00] hover:shadow-yellow-500/5'
                }`}
              >
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-colors ${
                  program.status === 'coming_soon' ? 'bg-gray-200 text-gray-400' : 'bg-[#003366]/5 text-[#003366] group-hover:bg-[#FFCC00] group-hover:text-[#003366]'
                }`}>
                  {program.icon}
                </div>
                <h3 className="text-xl font-extrabold text-[#003366] mb-3">{program.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed mb-6">
                  {program.description}
                </p>
                {program.status === 'coming_soon' ? (
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest bg-amber-100 text-amber-700">
                    Coming Soon
                  </span>
                ) : (
                  <button 
                    onClick={() => openTrainingModal(program.title)}
                    className="text-[#003366] font-bold text-sm flex items-center group-hover:underline underline-offset-4"
                  >
                    Learn More & Enroll <ChevronRight className="ml-1 w-4 h-4" />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trained Students Section */}
      <TrainedStudents />

      {/* Registration Section */}
      <section id="register" className="py-24 bg-gradient-to-b from-gray-50 to-white px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-block bg-[#FFCC00] text-[#003366] px-4 py-1 rounded font-black text-xs uppercase mb-4">
              Join Us
            </div>
            <h2 className="text-4xl md:text-5xl font-brand font-extrabold text-[#003366] mb-4">
              Create Your Account
            </h2>
            <p className="text-slate-500 text-lg max-w-2xl mx-auto">
              Register now to get started with our training programs and services.
            </p>
          </div>

          {/* Register and Login Tabs */}
          <div className="max-w-2xl mx-auto mb-8 flex gap-4 justify-center">
            <button 
              onClick={() => setShowUserLogin(false)}
              className="px-8 py-3 bg-[#003366] text-white font-bold rounded-lg hover:shadow-lg transition-all"
            >
              Create Account
            </button>
            <button 
              onClick={() => setShowUserLogin(true)}
              className="px-8 py-3 border-2 border-[#003366] text-[#003366] font-bold rounded-lg hover:bg-[#003366] hover:text-white transition-all"
            >
              Login to Account
            </button>
          </div>

          {showUserLogin ? (
            <UserLogin onLoginSuccess={() => {
              setShowUserLogin(false);
              setShowUserProfile(true);
              setUserType('regular');
            }} />
          ) : (
            <Register />
          )}
        </div>
      </section>

      {/* CEO Section */}
      <section id="ceo" className="py-24 bg-[#003366] text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#FFCC00]/5 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2"></div>

        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="lg:w-1/2 space-y-8">
              <div className="inline-block bg-[#FFCC00] text-[#003366] px-4 py-1 rounded font-black text-xs uppercase">
                Leadership
              </div>
              <h2 className="text-4xl md:text-5xl font-brand font-extrabold leading-tight">
                Meet Our Visionary Leader, <br />
                <span className="text-[#FFCC00]">Alonge Muhammed Ademola</span>
              </h2>
              <p className="text-blue-100 text-lg leading-relaxed mb-4">
                My name is Alonge Muhammed, the Founder and CEO of Alpha Tech Company. I am a multidisciplinary professional with expertise in UI/UX Design, Product Management, Technical Writing, and Data Analysis.
              </p>
              <p className="text-blue-100 text-base leading-relaxed mb-4">
                My work involves extensive research, documentation, and strategic product development, with a strong commitment to originality, integrity, and excellence. At Alpha Tech, we do not engage in plagiarism—every project is carefully researched and uniquely crafted to deliver high-quality, innovative, and reliable solutions.
              </p>
              <p className="text-blue-100 text-base leading-relaxed">
                In addition to my professional practice, I am also a tutor and mentor, training students in various tech skills most notably UI/UX Design and Data Analysis to help them build practical, industry-ready expertise.
              </p>
              <div className="flex items-center space-x-4">
                <div className="h-1 w-12 bg-[#FFCC00]"></div>
                <span className="font-bold tracking-widest uppercase text-sm">CEO & Founder, Alpha Tech</span>
              </div>
              <div className="pt-4">
                <button 
                  onClick={openContactModal}
                  className="px-8 py-3 border-2 border-[#FFCC00] text-[#FFCC00] font-bold rounded-xl hover:bg-[#FFCC00] hover:text-[#003366] transition-all"
                >
                  Consult with CEO
                </button>
              </div>
            </div>
            <div className="lg:w-1/2 flex justify-center items-center">
              <div className="w-full">
                <img 
                  src="https://res.cloudinary.com/dsylj1xnf/image/upload/v1768917805/MUHAMMED_-removebg-preview_uwyjco.png" 
                  alt="Alonge Muhammed Ademola" 
                  className="w-full h-auto rounded-2xl shadow-2xl"
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-brand font-extrabold text-[#003366] mb-4 uppercase">Contact Us</h2>
            <p className="text-slate-500">Available 24/7 for your academic and technical inquiries.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <a href="tel:+2349065709477" className="bg-[#003366] rounded-2xl p-8 text-center text-white flex flex-col items-center hover:scale-105 active:scale-95 transition-transform shadow-xl shadow-blue-900/10 group">
              <div className="w-16 h-16 bg-[#FFCC00] rounded-full flex items-center justify-center mb-6 group-hover:rotate-12 transition-transform">
                <Phone className="w-8 h-8 text-[#003366]" />
              </div>
              <h3 className="font-bold text-xl mb-2">Phone</h3>
              <p className="text-blue-100 font-medium">+234 906 570 9477</p>
            </a>

            <a href="mailto:ademolaalonge30@gmail.com" className="bg-[#003366] rounded-2xl p-8 text-center text-white flex flex-col items-center hover:scale-105 active:scale-95 transition-transform shadow-xl shadow-blue-900/10 group">
              <div className="w-16 h-16 bg-[#FFCC00] rounded-full flex items-center justify-center mb-6 group-hover:rotate-12 transition-transform">
                <Mail className="w-8 h-8 text-[#003366]" />
              </div>
              <h3 className="font-bold text-xl mb-2">Email</h3>
              <p className="text-blue-100 font-medium break-all">ademolaalonge30@gmail.com</p>
            </a>

            <a href="https://linkedin.com/in/ademola-alonge" target="_blank" rel="noopener noreferrer" className="bg-[#003366] rounded-2xl p-8 text-center text-white flex flex-col items-center hover:scale-105 active:scale-95 transition-transform shadow-xl shadow-blue-900/10 group">
              <div className="w-16 h-16 bg-[#FFCC00] rounded-full flex items-center justify-center mb-6 group-hover:rotate-12 transition-transform">
                <Linkedin className="w-8 h-8 text-[#003366]" />
              </div>
              <h3 className="font-bold text-xl mb-2">LinkedIn</h3>
              <p className="text-blue-100 font-medium">Connect with Us</p>
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12 border-t border-gray-800">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center mb-8">
            <div className="flex items-center space-x-3 mb-6 md:mb-0">
               <Logo className="w-10 h-10 border-2" />
               <span className="font-brand text-lg font-bold text-white uppercase tracking-widest">ALPHA TECH</span>
            </div>
            <div className="flex space-x-6 text-sm">
              <button onClick={openContactModal} className="hover:text-white transition-colors">Support</button>
              <button className="hover:text-white transition-colors">Privacy Policy</button>
              <button className="hover:text-white transition-colors">Terms</button>
              {/* Fixed: Wrapped in arrow function to avoid passing MouseEvent as string argument */}
              <button onClick={() => openTrainingModal()} className="hover:text-white transition-colors">Apply Now</button>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-sm">
            <p>© 2025 ALPHA TECH. Crafting Digital Excellence. All Rights Reserved.</p>
            <p className="mt-2 text-xs text-gray-600">Built by the Alpha Tech Engineering Team.</p>
          </div>
        </div>
      </footer>

      {/* Floating AI Assistant Toggle */}
      <button 
        onClick={() => setChatOpen(!chatOpen)}
        className="fixed bottom-8 right-8 z-[100] w-16 h-16 bg-[#FFCC00] text-[#003366] rounded-full shadow-2xl flex items-center justify-center hover:scale-110 active:scale-90 transition-transform"
      >
        <MessageSquare className="w-8 h-8" />
      </button>

      {/* Chat Window */}
      {chatOpen && (
        <div className="fixed bottom-28 right-8 z-[100] w-[90vw] md:w-96 h-[500px] bg-white rounded-3xl shadow-2xl flex flex-col border border-gray-100 overflow-hidden animate-in slide-in-from-bottom-5">
          <div className="bg-[#003366] p-6 text-white flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-[#FFCC00] rounded-full flex items-center justify-center">
                <User className="w-4 h-4 text-[#003366]" />
              </div>
              <div>
                <h3 className="font-bold text-sm">Alpha Assistant</h3>
                <div className="flex items-center">
                  <span className="w-1.5 h-1.5 bg-green-400 rounded-full mr-1 animate-pulse"></span>
                  <p className="text-[10px] text-blue-200 uppercase tracking-tighter">Online Now</p>
                </div>
              </div>
            </div>
            <button onClick={() => setChatOpen(false)} className="text-white/60 hover:text-white p-1">
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50/50">
            {chatHistory.length === 0 && (
              <div className="text-center py-10 px-4">
                <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Globe className="w-6 h-6" />
                </div>
                <p className="text-slate-500 text-sm">Hello! I'm the Alpha Tech Assistant. How can I guide you today?</p>
                <div className="mt-4 flex flex-wrap justify-center gap-2">
                   {['Training Fees', 'Contact CEO', 'Writing Services'].map(q => (
                     <button 
                        key={q} 
                        onClick={() => {setChatMessage(q);}}
                        className="text-[10px] bg-white border border-gray-200 px-3 py-1 rounded-full text-slate-500 hover:bg-gray-100"
                      >
                       {q}
                     </button>
                   ))}
                </div>
              </div>
            )}
            {chatHistory.map((chat, i) => (
              <div key={i} className={`flex ${chat.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] p-3 rounded-2xl text-sm ${
                  chat.role === 'user' 
                  ? 'bg-[#003366] text-white rounded-tr-none' 
                  : 'bg-white text-slate-700 shadow-sm border border-gray-200 rounded-tl-none'
                }`}>
                  {chat.text}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white border border-gray-200 p-3 rounded-2xl rounded-tl-none flex space-x-1">
                  <div className="w-1.5 h-1.5 bg-gray-300 rounded-full animate-bounce"></div>
                  <div className="w-1.5 h-1.5 bg-gray-300 rounded-full animate-bounce delay-75"></div>
                  <div className="w-1.5 h-1.5 bg-gray-300 rounded-full animate-bounce delay-150"></div>
                </div>
              </div>
            )}
          </div>
          <div className="p-4 bg-white border-t">
            <div className="flex space-x-2">
              <input 
                value={chatMessage}
                onChange={(e) => setChatMessage(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Type your question..."
                className="flex-1 bg-gray-100 border-none rounded-xl px-4 py-2 text-sm focus:ring-2 focus:ring-[#003366]"
              />
              <button 
                onClick={handleSendMessage}
                disabled={!chatMessage.trim() || isTyping}
                className="bg-[#003366] text-white p-2 rounded-xl disabled:opacity-50 active:scale-95 transition-transform"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Floating AI Assistant Toggle */}
      <button 
        onClick={() => setChatOpen(!chatOpen)}
        className="fixed bottom-8 right-8 z-[100] w-16 h-16 bg-[#FFCC00] text-[#003366] rounded-full shadow-2xl flex items-center justify-center hover:scale-110 active:scale-90 transition-transform"
      >
        <MessageSquare className="w-8 h-8" />
      </button>

      {/* Chat Window */}
      {chatOpen && (
        <div className="fixed bottom-28 right-8 z-[100] w-[90vw] md:w-96 h-[500px] bg-white rounded-3xl shadow-2xl flex flex-col border border-gray-100 overflow-hidden animate-in slide-in-from-bottom-5">
          <div className="bg-[#003366] p-6 text-white flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-[#FFCC00] rounded-full flex items-center justify-center">
                <User className="w-4 h-4 text-[#003366]" />
              </div>
              <div>
                <h3 className="font-bold text-sm">Alpha Assistant</h3>
                <div className="flex items-center">
                  <span className="w-1.5 h-1.5 bg-green-400 rounded-full mr-1 animate-pulse"></span>
                  <p className="text-[10px] text-blue-200 uppercase tracking-tighter">Online Now</p>
                </div>
              </div>
            </div>
            <button onClick={() => setChatOpen(false)} className="text-white/60 hover:text-white p-1">
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50/50">
            {chatHistory.length === 0 && (
              <div className="text-center py-10 px-4">
                <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Globe className="w-6 h-6" />
                </div>
                <p className="text-slate-500 text-sm">Hello! I'm the Alpha Tech Assistant. How can I guide you today?</p>
                <div className="mt-4 flex flex-wrap justify-center gap-2">
                   {['Training Fees', 'Contact CEO', 'Writing Services'].map(q => (
                     <button 
                        key={q} 
                        onClick={() => {setChatMessage(q);}}
                        className="text-[10px] bg-white border border-gray-200 px-3 py-1 rounded-full text-slate-500 hover:bg-gray-100"
                      >
                       {q}
                     </button>
                   ))}
                </div>
              </div>
            )}
            {chatHistory.map((chat, i) => (
              <div key={i} className={`flex ${chat.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] p-3 rounded-2xl text-sm ${
                  chat.role === 'user' 
                  ? 'bg-[#003366] text-white rounded-tr-none' 
                  : 'bg-white text-slate-700 shadow-sm border border-gray-200 rounded-tl-none'
                }`}>
                  {chat.text}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white border border-gray-200 p-3 rounded-2xl rounded-tl-none flex space-x-1">
                  <div className="w-1.5 h-1.5 bg-gray-300 rounded-full animate-bounce"></div>
                  <div className="w-1.5 h-1.5 bg-gray-300 rounded-full animate-bounce delay-75"></div>
                  <div className="w-1.5 h-1.5 bg-gray-300 rounded-full animate-bounce delay-150"></div>
                </div>
              </div>
            )}
          </div>
          <div className="p-4 bg-white border-t">
            <div className="flex space-x-2">
              <input 
                value={chatMessage}
                onChange={(e) => setChatMessage(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Type your question..."
                className="flex-1 bg-gray-100 border-none rounded-xl px-4 py-2 text-sm focus:ring-2 focus:ring-[#003366]"
              />
              <button 
                onClick={handleSendMessage}
                disabled={!chatMessage.trim() || isTyping}
                className="bg-[#003366] text-white p-2 rounded-xl disabled:opacity-50 active:scale-95 transition-transform"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      )}
        </div>
      )}
    </>
  );
};

export default App;
