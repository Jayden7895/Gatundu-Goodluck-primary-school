import { Announcement, Event, StaffMember, AdmissionApplication, ContactMessage, SchoolStats } from '../types';

// Initial Mock Data
const INITIAL_ANNOUNCEMENTS: Announcement[] = [
  { id: '1', title: 'End of Term Exams', content: 'Exams for Grades 4-8 begin next week. Please ensure all fees are cleared.', date: '2023-11-15', author: 'Principal', category: 'Academic' },
  { id: '2', title: 'Sports Day 2023', content: 'Join us for our annual sports day. Parents are welcome!', date: '2023-10-20', author: 'Sports Dept', category: 'Event' },
  { id: '3', title: 'New Science Lab Opening', content: 'We are proud to announce the opening of our state-of-the-art science laboratory.', date: '2023-09-01', author: 'Admin', category: 'News' },
];

const INITIAL_EVENTS: Event[] = [
  { id: '1', title: 'Parent-Teacher Meeting', date: '2023-12-05', time: '09:00 AM', location: 'Main Hall', description: 'Discussing student progress.' },
  { id: '2', title: 'Christmas Concert', date: '2023-12-15', time: '02:00 PM', location: 'School Auditorium', description: 'Performances by the school choir and drama club.' },
];

const INITIAL_STAFF: StaffMember[] = [
  { id: '1', name: 'Mrs. Jane Doe', role: 'Headteacher', department: 'Administration', bio: 'Over 20 years of experience in education management.', imageUrl: 'https://picsum.photos/200/200?random=1' },
  { id: '2', name: 'Mr. John Smith', role: 'Deputy Head', department: 'Academics', bio: 'Passionate about curriculum development and student welfare.', imageUrl: 'https://picsum.photos/200/200?random=2' },
  { id: '3', name: 'Ms. Alice Johnson', role: 'Senior Teacher', department: 'Sciences', bio: 'Leading our STEM initiatives.', imageUrl: 'https://picsum.photos/200/200?random=3' },
];

const INITIAL_STATS: SchoolStats = {
  totalStudents: 850,
  totalTeachers: 42,
  activeEvents: 5,
  newAdmissions: 12,
};

// Generic LocalStorage Helper
const getData = <T,>(key: string, initial: T): T => {
  const stored = localStorage.getItem(key);
  if (!stored) {
    localStorage.setItem(key, JSON.stringify(initial));
    return initial;
  }
  return JSON.parse(stored);
};

const setData = <T,>(key: string, data: T) => {
  localStorage.setItem(key, JSON.stringify(data));
};

// Service Exports
export const StorageService = {
  getAnnouncements: () => getData<Announcement[]>('announcements', INITIAL_ANNOUNCEMENTS),
  saveAnnouncements: (data: Announcement[]) => setData('announcements', data),
  
  getEvents: () => getData<Event[]>('events', INITIAL_EVENTS),
  saveEvents: (data: Event[]) => setData('events', data),
  
  getStaff: () => getData<StaffMember[]>('staff', INITIAL_STAFF),
  saveStaff: (data: StaffMember[]) => setData('staff', data),
  
  getAdmissions: () => getData<AdmissionApplication[]>('admissions', []),
  addAdmission: (app: AdmissionApplication) => {
    const current = getData<AdmissionApplication[]>('admissions', []);
    setData('admissions', [app, ...current]);
  },
  
  getMessages: () => getData<ContactMessage[]>('messages', []),
  addMessage: (msg: ContactMessage) => {
    const current = getData<ContactMessage[]>('messages', []);
    setData('messages', [msg, ...current]);
  },

  getStats: () => getData<SchoolStats>('stats', INITIAL_STATS),
};