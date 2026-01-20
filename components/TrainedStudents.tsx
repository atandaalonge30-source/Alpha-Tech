import React from 'react';
import { Users, Award } from 'lucide-react';

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
          name: 'Micheal Divine Oluwadammilare',
          image: 'https://ibb.co/wZxSzRP6',
          specialization: 'UI/UX Designer'
        },
        {
          name: 'Sunday Ifeoluwa Richard',
          image: 'https://ibb.co/Qv0Wn4mJ',
          specialization: 'UI/UX Specialist'
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
          name: 'Nkemdilim Chibuzor Goodluck',
          image: 'https://ibb.co/HDY0ZNGN',
          specialization: 'Full-Stack Developer'
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

        {/* Call to action */}
        <div className="bg-[#003366] rounded-3xl p-12 md:p-16 text-white text-center">
          <h3 className="text-3xl md:text-4xl font-brand font-extrabold mb-4">
            Join Our Community of <span className="text-[#FFCC00]">Success Stories</span>
          </h3>
          <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">
            Be part of the next generation of tech professionals. Our comprehensive training programs are designed to accelerate your career growth.
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
