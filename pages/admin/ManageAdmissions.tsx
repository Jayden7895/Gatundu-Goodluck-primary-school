import React, { useEffect, useState } from 'react';
import { StorageService } from '../../services/storage';
import { AdmissionApplication } from '../../types';
import { Check, X, Search } from 'lucide-react';

export const ManageAdmissions: React.FC = () => {
  const [apps, setApps] = useState<AdmissionApplication[]>([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    setApps(StorageService.getAdmissions());
  }, []);

  const handleStatusChange = (id: string, newStatus: 'Approved' | 'Rejected') => {
    // In a real app, API call here. 
    // For now we just update local state visually as the storage service is simple getters/setters 
    // (A full implementation would allow update, omitted for brevity in this simplified scope)
    const updated = apps.map(a => a.id === id ? { ...a, status: newStatus } : a);
    setApps(updated);
    localStorage.setItem('admissions', JSON.stringify(updated));
  };

  const filteredApps = apps.filter(a => 
    a.studentName.toLowerCase().includes(filter.toLowerCase()) || 
    a.grade.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-slate-900">Admissions</h1>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text" 
            placeholder="Search students..." 
            className="pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          />
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <table className="w-full text-sm text-left">
          <thead className="bg-slate-50 text-slate-500 font-medium border-b border-slate-200">
            <tr>
              <th className="px-6 py-4">Student Name</th>
              <th className="px-6 py-4">Grade</th>
              <th className="px-6 py-4">Parent Contact</th>
              <th className="px-6 py-4">Date</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filteredApps.length === 0 ? (
                <tr>
                    <td colSpan={6} className="px-6 py-8 text-center text-slate-400">No applications found.</td>
                </tr>
            ) : (
                filteredApps.map((app) => (
                <tr key={app.id} className="hover:bg-slate-50/50 transition">
                    <td className="px-6 py-4 font-medium text-slate-900">{app.studentName}</td>
                    <td className="px-6 py-4">
                        <span className="bg-blue-50 text-blue-700 px-2 py-1 rounded-md text-xs font-bold">{app.grade}</span>
                    </td>
                    <td className="px-6 py-4">
                        <div className="flex flex-col">
                            <span className="text-slate-900">{app.parentName}</span>
                            <span className="text-xs text-slate-500">{app.email}</span>
                        </div>
                    </td>
                    <td className="px-6 py-4 text-slate-500">{app.dateApplied}</td>
                    <td className="px-6 py-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                            app.status === 'Approved' ? 'bg-green-100 text-green-700' :
                            app.status === 'Rejected' ? 'bg-red-100 text-red-700' :
                            'bg-amber-100 text-amber-700'
                        }`}>
                            {app.status}
                        </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                        {app.status === 'Pending' && (
                            <div className="flex justify-end gap-2">
                                <button onClick={() => handleStatusChange(app.id, 'Approved')} className="p-1 hover:bg-green-100 text-green-600 rounded transition" title="Approve">
                                    <Check size={18} />
                                </button>
                                <button onClick={() => handleStatusChange(app.id, 'Rejected')} className="p-1 hover:bg-red-100 text-red-600 rounded transition" title="Reject">
                                    <X size={18} />
                                </button>
                            </div>
                        )}
                    </td>
                </tr>
                ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};