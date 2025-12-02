import React, { useState } from 'react';
import { CheckCircle, Download, Send } from 'lucide-react';
import { StorageService } from '../services/storage';

export const Admissions: React.FC = () => {
  const [formData, setFormData] = useState({
    studentName: '',
    parentName: '',
    email: '',
    phone: '',
    grade: 'Grade 1'
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    StorageService.addAdmission({
      id: Date.now().toString(),
      ...formData,
      status: 'Pending',
      dateApplied: new Date().toISOString().split('T')[0]
    });
    setSubmitted(true);
  };

  return (
    <div className="bg-slate-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">Join Our Community</h1>
          <p className="text-slate-600 max-w-2xl mx-auto">
            We are excited to welcome new families to Gatundu Goodluck. Follow the simple steps below to begin your journey with us.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Requirements Section */}
          <div className="space-y-8">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
              <h3 className="text-xl font-bold text-slate-900 mb-6">Admission Requirements</h3>
              <ul className="space-y-4">
                {[
                  "Copy of Birth Certificate",
                  "2 Passport sized photographs",
                  "Previous School Report Card (if applicable)",
                  "Completion of Admission Form",
                  "Interview with the Headteacher"
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle className="text-green-500 shrink-0 mt-0.5" size={20} />
                    <span className="text-slate-700">{item}</span>
                  </li>
                ))}
              </ul>
              
              <div className="mt-8 pt-8 border-t border-slate-100">
                <h4 className="font-semibold mb-4">Downloadable Resources</h4>
                <div className="flex flex-col gap-3">
                    <button className="flex items-center justify-between p-4 border border-slate-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition group">
                        <span className="font-medium text-slate-700 group-hover:text-blue-700">Fee Structure 2024.pdf</span>
                        <Download size={18} className="text-slate-400 group-hover:text-blue-500"/>
                    </button>
                    <button className="flex items-center justify-between p-4 border border-slate-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition group">
                        <span className="font-medium text-slate-700 group-hover:text-blue-700">School Rules & Regulations.pdf</span>
                        <Download size={18} className="text-slate-400 group-hover:text-blue-500"/>
                    </button>
                </div>
              </div>
            </div>
          </div>

          {/* Application Form */}
          <div>
            <div className="bg-white p-8 rounded-2xl shadow-xl border border-slate-100">
              <h3 className="text-2xl font-bold text-slate-900 mb-2">Online Application</h3>
              <p className="text-slate-500 text-sm mb-8">Fill out the form below to initiate the admission process.</p>

              {submitted ? (
                <div className="bg-green-50 border border-green-200 rounded-xl p-8 text-center">
                    <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                        <CheckCircle size={32} />
                    </div>
                    <h4 className="text-xl font-bold text-green-800 mb-2">Application Received!</h4>
                    <p className="text-green-700">Thank you for applying. Our admissions office will contact you shortly via email.</p>
                    <button onClick={() => setSubmitted(false)} className="mt-6 text-green-800 font-semibold underline">Submit another application</button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-700">Student Name</label>
                            <input 
                                required
                                type="text" 
                                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition"
                                placeholder="John Doe"
                                value={formData.studentName}
                                onChange={e => setFormData({...formData, studentName: e.target.value})}
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-700">Grade Applying For</label>
                            <select 
                                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition"
                                value={formData.grade}
                                onChange={e => setFormData({...formData, grade: e.target.value})}
                            >
                                {['PP1', 'PP2', 'Grade 1', 'Grade 2', 'Grade 3', 'Grade 4', 'Grade 5', 'Grade 6', 'Grade 7', 'Grade 8'].map(g => (
                                    <option key={g} value={g}>{g}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-700">Parent/Guardian Name</label>
                        <input 
                            required
                            type="text" 
                            className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition"
                            placeholder="Jane Doe"
                            value={formData.parentName}
                            onChange={e => setFormData({...formData, parentName: e.target.value})}
                        />
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-700">Email Address</label>
                            <input 
                                required
                                type="email" 
                                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition"
                                placeholder="parent@example.com"
                                value={formData.email}
                                onChange={e => setFormData({...formData, email: e.target.value})}
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-700">Phone Number</label>
                            <input 
                                required
                                type="tel" 
                                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition"
                                placeholder="+254..."
                                value={formData.phone}
                                onChange={e => setFormData({...formData, phone: e.target.value})}
                            />
                        </div>
                    </div>

                    <button type="submit" className="w-full bg-blue-900 text-white py-4 rounded-lg font-bold hover:bg-blue-800 transition flex items-center justify-center gap-2">
                        Submit Application <Send size={18} />
                    </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};