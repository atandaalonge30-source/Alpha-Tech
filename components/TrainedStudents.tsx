import React from 'react';
import { Users, Award, Zap, BookOpen, UserCheck, Target } from 'lucide-react';

interface StudentData {
  program: string;
  count: number;
  description: string;
  icon: React.ReactNode;
  students?: Array<{
    name: string;
    image: string;
    specialization?: string;
  }>;
}

const TrainedStudents: React.FC = () => {
  const studentData: StudentData[] = [
    {
      program: 'UI/UX Design',
      count: 100,
      description: 'Talented designers trained in user-centric design principles, wireframing, prototyping, and digital interfaces.',
      icon: <Award className="w-6 h-6" />,
      students: [
        {
          name: 'Nkemdilim Chibuzor Goodluck',
          image: 'https://i.ibb.co/wZxSzRP6/image.jpg',
          specialization: 'UI/UX Designer'
        },
        {
          name: 'Sunday Ifeoluwa Richard',
          image: 'https://i.ibb.co/Qv0Wn4mJ/image.jpg',
          specialization: 'UI/UX Specialist'
        },
        {
          name: 'Morakinyo Samson Temidayo',
          image: 'https://res.cloudinary.com/dsylj1xnf/image/upload/v1768918582/samson_rbgs9c.jpg',
          specialization: 'UI/UX Designer'
        }
      ]
    },
    {
      program: 'Web & Mobile Development',
      count: 30,
      description: 'Expert developers proficient in full-stack web development, mobile applications, and modern frameworks.',
      icon: <Users className="w-6 h-6" />,
      students: [
        {
          name: 'Micheal Divine Oluwadammilare',
          image: 'https://i.ibb.co/HDY0ZNGN/image.jpg',
          specialization: 'Full-Stack Developer'
        },
        {
          name: 'Busari Abdulhaqq Dolapo',
          image: 'https://res.cloudinary.com/dsylj1xnf/image/upload/v1768918495/BUSARI_usrydx.jpg',
          specialization: 'Full-Stack Developer'
        },
        {
          name: 'Ayantade David Tolulope',
          image: 'https://res.cloudinary.com/dsylj1xnf/image/upload/v1768919915/AYANTADE_v7dsn7.jpg',
          specialization: 'Front-End Developer'
        }
      ]
    }
  ];

  return (
    <section id="students" className="py-24 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-block bg-[#003366]/5 px-4 py-1.5 rounded-full border border-[#003366]/10 text-[#003366] font-bold text-xs uppercase tracking-[0.2em] mb-6">
            Our Success Stories
          </div>
          <h2 className="text-4xl md:text-5xl font-brand font-extrabold text-[#003366] mb-6">
            Meet Our Trained <span className="text-[#FFCC00]">Professionals</span>
          </h2>
          <p className="text-slate-600 text-lg max-w-2xl mx-auto">
            Transforming ambitious learners into industry-ready professionals. Our alumni are making waves across the tech industry.
          </p>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {studentData.map((data, idx) => (
            <div 
              key={idx}
              className="group relative bg-white rounded-3xl overflow-hidden border-2 border-gray-100 hover:border-[#FFCC00] hover:shadow-2xl hover:shadow-yellow-500/10 transition-all duration-300 p-8 md:p-10"
            >
              {/* Background decoration */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#FFCC00] opacity-5 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-500"></div>
              
              <div className="relative z-10">
                {/* Icon and count */}
                <div className="flex items-start justify-between mb-6">
                  <div className="w-16 h-16 bg-[#003366]/10 group-hover:bg-[#FFCC00] text-[#003366] rounded-2xl flex items-center justify-center transition-colors duration-300">
                    {data.icon}
                  </div>
                  <div className="text-right">
                    <div className="text-5xl md:text-6xl font-brand font-extrabold text-[#FFCC00]">
                      {data.count}+
                    </div>
                    <p className="text-xs uppercase font-bold tracking-wider text-slate-400">Graduates</p>
                  </div>
                </div>

                {/* Program Title */}
                <h3 className="text-2xl md:text-3xl font-brand font-extrabold text-[#003366] mb-3">
                  {data.program}
                </h3>

                {/* Description */}
                <p className="text-slate-600 leading-relaxed mb-6">
                  {data.description}
                </p>

                {/* Student showcase placeholder */}
                <div className="pt-6 border-t border-gray-100">
                  <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4">
                    Featured Alumni
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {data.students && data.students.map((student, sidx) => (
                      <div key={sidx} className="flex flex-col items-center">
                        <div className="w-16 h-16 rounded-full overflow-hidden mb-3 ring-2 ring-[#FFCC00] ring-offset-2">
                          <img 
                            src={student.image} 
                            alt={student.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <p className="font-bold text-sm text-center text-slate-700">{student.name}</p>
                        {student.specialization && (
                          <p className="text-xs text-slate-500 text-center">{student.specialization}</p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 300+ Students Achievement Banner */}
        <div className="bg-gradient-to-r from-[#FFCC00] to-yellow-400 rounded-3xl p-8 md:p-12 mb-16 border-4 border-[#003366]/20">
          <div className="text-center">
            <h3 className="text-5xl md:text-6xl font-brand font-extrabold text-[#003366] mb-3">
              300+ <span className="text-white">Students</span>
            </h3>
            <p className="text-[#003366] text-lg font-bold mb-4">
              Successfully Trained and Placed in Top Tech Companies
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
              <div className="bg-white/80 backdrop-blur rounded-2xl p-4">
                <p className="text-2xl font-extrabold text-[#003366]">95%</p>
                <p className="text-sm text-slate-600 font-semibold">Success Rate</p>
              </div>
              <div className="bg-white/80 backdrop-blur rounded-2xl p-4">
                <p className="text-2xl font-extrabold text-[#003366]">5+</p>
                <p className="text-sm text-slate-600 font-semibold">Partner Companies</p>
              </div>
              <div className="bg-white/80 backdrop-blur rounded-2xl p-4">
                <p className="text-2xl font-extrabold text-[#003366]">6</p>
                <p className="text-sm text-slate-600 font-semibold">Training Programs</p>
              </div>
              <div className="bg-white/80 backdrop-blur rounded-2xl p-4">
                <p className="text-2xl font-extrabold text-[#003366]">7+</p>
                <p className="text-sm text-slate-600 font-semibold">Years Experience</p>
              </div>
            </div>
          </div>
        </div>

        {/* Why Choose Alpha Tech Section */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <div className="inline-block bg-[#003366]/5 px-4 py-1.5 rounded-full border border-[#003366]/10 text-[#003366] font-bold text-xs uppercase tracking-[0.2em] mb-6">
              Why Choose Us
            </div>
            <h2 className="text-4xl md:text-5xl font-brand font-extrabold text-[#003366] mb-6">
              Why Students Choose <span className="text-[#FFCC00]">Alpha Tech</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="group relative bg-white rounded-3xl overflow-hidden border-2 border-gray-100 hover:border-[#FFCC00] hover:shadow-2xl hover:shadow-yellow-500/10 transition-all duration-300 p-8">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#FFCC00] opacity-5 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-500"></div>
              <div className="relative z-10">
                <div className="w-14 h-14 bg-[#003366]/10 group-hover:bg-[#FFCC00] text-[#003366] rounded-2xl flex items-center justify-center mb-4 transition-colors duration-300">
                  <Zap className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-[#003366] mb-3">Industry-Aligned Curriculum</h3>
                <p className="text-slate-600 leading-relaxed">
                  Our courses are designed by industry experts and updated regularly to match current market demands and technological trends.
                </p>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="group relative bg-white rounded-3xl overflow-hidden border-2 border-gray-100 hover:border-[#FFCC00] hover:shadow-2xl hover:shadow-yellow-500/10 transition-all duration-300 p-8">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#FFCC00] opacity-5 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-500"></div>
              <div className="relative z-10">
                <div className="w-14 h-14 bg-[#003366]/10 group-hover:bg-[#FFCC00] text-[#003366] rounded-2xl flex items-center justify-center mb-4 transition-colors duration-300">
                  <UserCheck className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-[#003366] mb-3">Expert Instructors</h3>
                <p className="text-slate-600 leading-relaxed">
                  Learn directly from seasoned professionals with years of real-world experience in their respective fields and proven track records.
                </p>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="group relative bg-white rounded-3xl overflow-hidden border-2 border-gray-100 hover:border-[#FFCC00] hover:shadow-2xl hover:shadow-yellow-500/10 transition-all duration-300 p-8">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#FFCC00] opacity-5 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-500"></div>
              <div className="relative z-10">
                <div className="w-14 h-14 bg-[#003366]/10 group-hover:bg-[#FFCC00] text-[#003366] rounded-2xl flex items-center justify-center mb-4 transition-colors duration-300">
                  <BookOpen className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-[#003366] mb-3">Hands-On Projects</h3>
                <p className="text-slate-600 leading-relaxed">
                  Work on real-world projects and build a professional portfolio that showcases your skills to potential employers.
                </p>
              </div>
            </div>

            {/* Feature 4 */}
            <div className="group relative bg-white rounded-3xl overflow-hidden border-2 border-gray-100 hover:border-[#FFCC00] hover:shadow-2xl hover:shadow-yellow-500/10 transition-all duration-300 p-8">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#FFCC00] opacity-5 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-500"></div>
              <div className="relative z-10">
                <div className="w-14 h-14 bg-[#003366]/10 group-hover:bg-[#FFCC00] text-[#003366] rounded-2xl flex items-center justify-center mb-4 transition-colors duration-300">
                  <Zap className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-[#003366] mb-3">Real-World Projects</h3>
                <p className="text-slate-600 leading-relaxed">
                  Build portfolios with practical projects that demonstrate your capabilities to potential employers.
                </p>
              </div>
            </div>

            {/* Feature 5 */}
            <div className="group relative bg-white rounded-3xl overflow-hidden border-2 border-gray-100 hover:border-[#FFCC00] hover:shadow-2xl hover:shadow-yellow-500/10 transition-all duration-300 p-8">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#FFCC00] opacity-5 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-500"></div>
              <div className="relative z-10">
                <div className="w-14 h-14 bg-[#003366]/10 group-hover:bg-[#FFCC00] text-[#003366] rounded-2xl flex items-center justify-center mb-4 transition-colors duration-300">
                  <Award className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-[#003366] mb-3">Certification Programs</h3>
                <p className="text-slate-600 leading-relaxed">
                  Earn internationally recognized certifications that enhance your credibility and open doors to global opportunities.
                </p>
              </div>
            </div>

            {/* Feature 6 */}
            <div className="group relative bg-white rounded-3xl overflow-hidden border-2 border-gray-100 hover:border-[#FFCC00] hover:shadow-2xl hover:shadow-yellow-500/10 transition-all duration-300 p-8">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#FFCC00] opacity-5 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-500"></div>
              <div className="relative z-10">
                <div className="w-14 h-14 bg-[#003366]/10 group-hover:bg-[#FFCC00] text-[#003366] rounded-2xl flex items-center justify-center mb-4 transition-colors duration-300">
                  <Users className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-[#003366] mb-3">Community & Networking</h3>
                <p className="text-slate-600 leading-relaxed">
                  Join a vibrant community of 300+ alumni and connect with peers, mentors, and industry professionals.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Call to action */}
        <div className="bg-[#003366] rounded-3xl p-12 md:p-16 text-white text-center">
          <h3 className="text-3xl md:text-4xl font-brand font-extrabold mb-4">
            Join Our Community of <span className="text-[#FFCC00]">Success Stories</span>
          </h3>
          <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">
            Be part of the next generation of tech professionals. Our comprehensive training programs are designed to accelerate your career growth. Start your journey today with Alpha Tech!
          </p>
          <button className="px-10 py-4 bg-[#FFCC00] text-[#003366] font-bold rounded-xl shadow-lg shadow-yellow-500/20 hover:scale-105 active:scale-95 transition-all text-lg">
            Enroll Now & Transform Your Career
          </button>
        </div>
      </div>
    </section>
  );
};

export default TrainedStudents;
