import React, { useState, useEffect } from 'react';
import { Bell, Calendar, Mail, MessageCircle, Phone, FileText, Users, TrendingUp, Home, Plus, Edit2, Trash2, X, Menu } from 'lucide-react';

// Mock API service (in real app, this would connect to your backend)
const API_BASE = 'http://localhost:5000/api';

const mockNotices = [
  {
    _id: '1',
    title: 'Mid-Semester Exams Schedule',
    description: 'Mid-semester examinations will commence from 15th February 2026. Students are advised to check the timetable.',
    imageLink: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800',
    pdfLink: 'https://example.com/exam-schedule.pdf',
    expiryDate: '2026-02-14',
    priority: 'high',
    createdAt: new Date().toISOString()
  },
  {
    _id: '2',
    title: 'Guest Lecture on AI/ML',
    description: 'A special guest lecture by Dr. Rajesh Kumar on Artificial Intelligence and Machine Learning applications.',
    imageLink: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800',
    pdfLink: null,
    expiryDate: '2026-01-20',
    priority: 'medium',
    createdAt: new Date().toISOString()
  },
  {
    _id: '3',
    title: 'Placement Drive - TCS',
    description: 'TCS campus recruitment drive for final year students. Eligible students register through ERP portal.',
    imageLink: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800',
    pdfLink: 'https://example.com/tcs-placement.pdf',
    expiryDate: '2026-01-25',
    priority: 'high',
    createdAt: new Date().toISOString()
  }
];

function App() {
  const [currentScreen, setCurrentScreen] = useState('home');
  const [notices, setNotices] = useState(mockNotices);
  const [showAddNotice, setShowAddNotice] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [selectedNotice, setSelectedNotice] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);

  // Fetch notices from backend
  useEffect(() => {
    // In real app: fetch('/api/notices').then(res => res.json()).then(setNotices)
    setNotices(mockNotices);
  }, []);

  const renderScreen = () => {
    switch(currentScreen) {
      case 'home': return <HomeScreen notices={notices} isAdmin={isAdmin} onEdit={setSelectedNotice} onDelete={handleDeleteNotice} />;
      case 'resources': return <ResourcesScreen />;
      case 'chat': return <ChatScreen />;
      case 'fuel': return <FuelLogScreen />;
      case 'schedule': return <WeeklyScheduleScreen />;
      case 'email': return <EmailTemplatesScreen />;
      default: return <HomeScreen notices={notices} isAdmin={isAdmin} onEdit={setSelectedNotice} onDelete={handleDeleteNotice} />;
    }
  };

  const handleDeleteNotice = (id) => {
    // In real app: fetch(`/api/notices/${id}`, { method: 'DELETE' })
    setNotices(notices.filter(n => n._id !== id));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center">
              <Bell className="text-white" size={20} />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">MMDU Notice Board</h1>
              <p className="text-xs text-gray-500">Maharishi Markandeshwar University</p>
            </div>
          </div>
          <button 
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden p-2 hover:bg-gray-100 rounded-lg"
          >
            <Menu size={24} />
          </button>
          <div className="hidden md:flex gap-2">
            <button 
              onClick={() => setIsAdmin(!isAdmin)}
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 transition"
            >
              {isAdmin ? 'Admin Mode' : 'User Mode'}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden bg-white border-t px-4 py-2">
            <button 
              onClick={() => { setIsAdmin(!isAdmin); setMenuOpen(false); }}
              className="w-full px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium"
            >
              {isAdmin ? 'Switch to User' : 'Switch to Admin'}
            </button>
          </div>
        )}
      </header>

      {/* Quick Action Bar */}
      <div className="bg-white border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-3 flex gap-2 overflow-x-auto">
          <QuickButton icon={<Calendar size={16} />} text="Calendar" onClick={() => window.open('https://example.com/calendar.pdf')} />
          <QuickButton icon={<FileText size={16} />} text="ERP Portal" onClick={() => window.open('https://erp.mmumullana.org')} />
          <QuickButton icon={<Users size={16} />} text="Placements" onClick={() => window.open('https://placements.mmdu.edu.in')} />
          <QuickButton icon={<Mail size={16} />} text="Contact" onClick={() => setCurrentScreen('email')} />
          <QuickButton icon={<MessageCircle size={16} />} text="Chat" onClick={() => setCurrentScreen('chat')} />
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-6">
        {renderScreen()}
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-3 flex justify-around">
          <NavButton icon={<Home size={20} />} text="Home" active={currentScreen === 'home'} onClick={() => setCurrentScreen('home')} />
          <NavButton icon={<FileText size={20} />} text="Resources" active={currentScreen === 'resources'} onClick={() => setCurrentScreen('resources')} />
          <NavButton icon={<MessageCircle size={20} />} text="Chat" active={currentScreen === 'chat'} onClick={() => setCurrentScreen('chat')} />
          <NavButton icon={<TrendingUp size={20} />} text="Fuel" active={currentScreen === 'fuel'} onClick={() => setCurrentScreen('fuel')} />
          <NavButton icon={<Calendar size={20} />} text="Schedule" active={currentScreen === 'schedule'} onClick={() => setCurrentScreen('schedule')} />
        </div>
      </nav>

      {/* Add Notice Modal */}
      {showAddNotice && isAdmin && (
        <AddNoticeModal onClose={() => setShowAddNotice(false)} onAdd={(notice) => {
          setNotices([notice, ...notices]);
          setShowAddNotice(false);
        }} />
      )}

      {/* Edit Notice Modal */}
      {selectedNotice && isAdmin && (
        <EditNoticeModal 
          notice={selectedNotice} 
          onClose={() => setSelectedNotice(null)} 
          onSave={(updated) => {
            setNotices(notices.map(n => n._id === updated._id ? updated : n));
            setSelectedNotice(null);
          }} 
        />
      )}

      {/* Floating Add Button for Admin */}
      {isAdmin && currentScreen === 'home' && (
        <button 
          onClick={() => setShowAddNotice(true)}
          className="fixed bottom-24 right-6 w-14 h-14 bg-indigo-600 text-white rounded-full shadow-lg flex items-center justify-center hover:bg-indigo-700 transition"
        >
          <Plus size={24} />
        </button>
      )}
    </div>
  );
}

// Quick Action Button Component
function QuickButton({ icon, text, onClick }) {
  return (
    <button 
      onClick={onClick}
      className="flex items-center gap-2 px-4 py-2 bg-gray-50 hover:bg-gray-100 rounded-lg text-sm font-medium text-gray-700 whitespace-nowrap transition"
    >
      {icon}
      <span>{text}</span>
    </button>
  );
}

// Navigation Button Component
function NavButton({ icon, text, active, onClick }) {
  return (
    <button 
      onClick={onClick}
      className={`flex flex-col items-center gap-1 px-3 py-2 rounded-lg transition ${
        active ? 'text-indigo-600 bg-indigo-50' : 'text-gray-500 hover:text-gray-700'
      }`}
    >
      {icon}
      <span className="text-xs font-medium">{text}</span>
    </button>
  );
}

// Home Screen Component
function HomeScreen({ notices, isAdmin, onEdit, onDelete }) {
  return (
    <div className="pb-24">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Latest Notices</h2>
        <p className="text-gray-600">Stay updated with campus announcements</p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {notices.map(notice => (
          <NoticeCard 
            key={notice._id} 
            notice={notice} 
            isAdmin={isAdmin}
            onEdit={() => onEdit(notice)}
            onDelete={() => onDelete(notice._id)}
          />
        ))}
      </div>

      {notices.length === 0 && (
        <div className="text-center py-16">
          <Bell size={48} className="mx-auto text-gray-300 mb-4" />
          <p className="text-gray-500">No notices available</p>
        </div>
      )}
    </div>
  );
}

// Notice Card Component
function NoticeCard({ notice, isAdmin, onEdit, onDelete }) {
  const isExpired = new Date(notice.expiryDate) < new Date();
  const priorityColors = {
    high: 'bg-red-100 text-red-700',
    medium: 'bg-yellow-100 text-yellow-700',
    low: 'bg-green-100 text-green-700'
  };

  return (
    <div className={`bg-white rounded-2xl shadow-sm hover:shadow-md transition overflow-hidden ${isExpired ? 'opacity-60' : ''}`}>
      {notice.imageLink && (
        <img src={notice.imageLink} alt={notice.title} className="w-full h-48 object-cover" />
      )}
      <div className="p-5">
        <div className="flex justify-between items-start mb-3">
          <span className={`text-xs font-semibold px-3 py-1 rounded-full ${priorityColors[notice.priority] || priorityColors.low}`}>
            {notice.priority?.toUpperCase()}
          </span>
          {isAdmin && (
            <div className="flex gap-2">
              <button onClick={onEdit} className="p-1.5 hover:bg-gray-100 rounded-lg transition">
                <Edit2 size={16} className="text-gray-600" />
              </button>
              <button onClick={onDelete} className="p-1.5 hover:bg-red-50 rounded-lg transition">
                <Trash2 size={16} className="text-red-600" />
              </button>
            </div>
          )}
        </div>
        <h3 className="font-bold text-gray-900 mb-2 text-lg">{notice.title}</h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-3">{notice.description}</p>
        <div className="flex justify-between items-center text-xs text-gray-500">
          <span>Expires: {new Date(notice.expiryDate).toLocaleDateString()}</span>
          {notice.pdfLink && (
            <a href={notice.pdfLink} target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline font-medium">
              View PDF
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

// Resources Screen Component
function ResourcesScreen() {
  const resources = [
    { name: 'Academic Calendar', icon: <Calendar />, link: 'https://example.com/calendar.pdf', color: 'from-blue-500 to-blue-600' },
    { name: 'ERP Portal', icon: <FileText />, link: 'https://erp.mmumullana.org', color: 'from-purple-500 to-purple-600' },
    { name: 'Placement Cell', icon: <Users />, link: 'https://placements.mmdu.edu.in', color: 'from-green-500 to-green-600' },
    { name: 'CSE Placement', icon: <TrendingUp />, link: 'https://cse.mmdu.edu.in/placements', color: 'from-orange-500 to-orange-600' },
    { name: 'Department of CSE', icon: <FileText />, link: 'https://cse.mmdu.edu.in', color: 'from-indigo-500 to-indigo-600' },
    { name: 'Exams & Notices', icon: <Bell />, link: 'https://mmdu.edu.in/exams', color: 'from-red-500 to-red-600' }
  ];

  return (
    <div className="pb-24">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Resources & Links</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {resources.map((resource, idx) => (
          <a
            key={idx}
            href={resource.link}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white rounded-2xl shadow-sm hover:shadow-md transition p-6 flex items-center gap-4 group"
          >
            <div className={`w-12 h-12 bg-gradient-to-br ${resource.color} rounded-xl flex items-center justify-center text-white group-hover:scale-110 transition`}>
              {resource.icon}
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">{resource.name}</h3>
              <p className="text-xs text-gray-500">Click to access</p>
            </div>
          </a>
        ))}
      </div>

      {/* Campus Images Section */}
      <div className="mt-12">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Campus Gallery</h3>
        <div className="grid md:grid-cols-3 gap-4">
          <img src="https://images.unsplash.com/photo-1562774053-701939374585?w=600" alt="University Gate" className="w-full h-48 object-cover rounded-xl shadow" />
          <img src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=600" alt="Campus Building" className="w-full h-48 object-cover rounded-xl shadow" />
          <img src="https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=600" alt="Library" className="w-full h-48 object-cover rounded-xl shadow" />
        </div>
      </div>
    </div>
  );
}

// Email Templates Screen
function EmailTemplatesScreen() {
  const templates = [
    {
      title: 'Mail to Principal',
      email: 'principal@mmdu.edu.in',
      subject: 'Request for Meeting/Information',
      body: `Dear Sir/Ma'am,

I am Gokul Kumar Sant, from CSE department at MMDU.

[Write your message here]

Thanking You,
Gokul Kumar Sant
CSE Department
Roll No: [Your Roll Number]`
    },
    {
      title: 'Mail to HOD (CSE)',
      email: 'hod.cse@mmdu.edu.in',
      subject: 'Request Regarding CSE Department',
      body: `Dear Sir/Ma'am,

I am Gokul Kumar Sant, from CSE department at MMDU.

[Write your message here]

Thanking You,
Gokul Kumar Sant
CSE Department
Roll No: [Your Roll Number]`
    },
    {
      title: 'Mail to Placement Cell (CSE)',
      email: 'placement.cse@mmdu.edu.in',
      subject: 'Query Regarding Placement Drive',
      body: `Dear Sir/Ma'am,

I am Gokul Kumar Sant, from CSE department at MMDU.

[Write your message here]

Thanking You,
Gokul Kumar Sant
CSE Department
Roll No: [Your Roll Number]`
    }
  ];

  const handleEmailClick = (template) => {
    const mailtoLink = `mailto:${template.email}?subject=${encodeURIComponent(template.subject)}&body=${encodeURIComponent(template.body)}`;
    window.location.href = mailtoLink;
  };

  return (
    <div className="pb-24">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Email Templates</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {templates.map((template, idx) => (
          <div key={idx} className="bg-white rounded-2xl shadow-sm p-6">
            <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center text-white mb-4">
              <Mail />
            </div>
            <h3 className="font-bold text-gray-900 mb-2">{template.title}</h3>
            <p className="text-sm text-gray-600 mb-4">{template.email}</p>
            <button
              onClick={() => handleEmailClick(template)}
              className="w-full px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 transition"
            >
              Open Mail App
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

// Chat Screen Component
function ChatScreen() {
  const [messages, setMessages] = useState([
    { id: 1, text: 'Hey everyone! Meeting at 4 PM today?', sender: 'other', time: '10:30 AM' },
    { id: 2, text: 'Yes, I will be there!', sender: 'me', time: '10:32 AM' },
    { id: 3, text: 'Count me in too', sender: 'other', time: '10:35 AM' }
  ]);
  const [newMessage, setNewMessage] = useState('');

  const sendMessage = () => {
    if (newMessage.trim()) {
      setMessages([...messages, { 
        id: Date.now(), 
        text: newMessage, 
        sender: 'me', 
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);
      setNewMessage('');
    }
  };

  return (
    <div className="pb-24 max-w-2xl mx-auto">
      {/* Chat Header */}
      <div className="bg-white rounded-t-2xl shadow-sm p-4 flex justify-between items-center mb-4">
        <div>
          <h3 className="font-bold text-gray-900">Group Chat</h3>
          <p className="text-xs text-gray-500">5 members online</p>
        </div>
        <button className="w-10 h-10 bg-green-100 text-green-600 rounded-full flex items-center justify-center hover:bg-green-200 transition">
          <Phone size={20} />
        </button>
      </div>

      {/* Messages */}
      <div className="bg-white rounded-2xl shadow-sm p-4 h-96 overflow-y-auto mb-4">
        {messages.map(msg => (
          <div key={msg.id} className={`mb-4 flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-xs px-4 py-2 rounded-2xl ${
              msg.sender === 'me' 
                ? 'bg-indigo-600 text-white rounded-br-sm' 
                : 'bg-gray-100 text-gray-900 rounded-bl-sm'
            }`}>
              <p className="text-sm">{msg.text}</p>
              <span className={`text-xs ${msg.sender === 'me' ? 'text-indigo-200' : 'text-gray-500'}`}>
                {msg.time}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="bg-white rounded-2xl shadow-sm p-4 flex gap-2">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
          placeholder="Type a message..."
          className="flex-1 px-4 py-2 bg-gray-50 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <button 
          onClick={sendMessage}
          className="w-10 h-10 bg-indigo-600 text-white rounded-xl flex items-center justify-center hover:bg-indigo-700 transition"
        >
          <MessageCircle size={20} />
        </button>
      </div>
    </div>
  );
}

// Fuel Log Screen Component
function FuelLogScreen() {
  const fuelLogs = [
    { id: 1, name: 'Gokul Kumar Sant', amount: 500, date: '2026-01-05', type: 'Petrol' },
    { id: 2, name: 'Rahul Sharma', amount: 450, date: '2026-01-03', type: 'Diesel' },
    { id: 3, name: 'Priya Singh', amount: 520, date: '2026-01-01', type: 'Petrol' }
  ];

  const totalAmount = fuelLogs.reduce((sum, log) => sum + log.amount, 0);
  const perPerson = totalAmount / 3;

  return (
    <div className="pb-24">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Fuel Contribution Log</h2>

      {/* Summary Cards */}
      <div className="grid md:grid-cols-3 gap-4 mb-6">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-2xl p-6">
          <p className="text-sm opacity-90 mb-1">Total This Month</p>
          <p className="text-3xl font-bold">₹{totalAmount}</p>
        </div>
        <div className="bg-gradient-to-br from-green-500 to-green-600 text-white rounded-2xl p-6">
          <p className="text-sm opacity-90 mb-1">Per Person</p>
          <p className="text-3xl font-bold">₹{perPerson.toFixed(0)}</p>
        </div>
        <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white rounded-2xl p-6">
          <p className="text-sm opacity-90 mb-1">Total Entries</p>
          <p className="text-3xl font-bold">{fuelLogs.length}</p>
        </div>
      </div>

      {/* Fuel Logs List */}
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        {fuelLogs.map(log => (
          <div key={log.id} className="p-4 border-b last:border-b-0 hover:bg-gray-50 transition">
            <div className="flex justify-between items-center">
              <div>
                <h4 className="font-semibold text-gray-900">{log.name}</h4>
                <p className="text-sm text-gray-500">{new Date(log.date).toLocaleDateString()} • {log.type}</p>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold text-gray-900">₹{log.amount}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Graph Placeholder */}
      <div className="mt-6 bg-white rounded-2xl shadow-sm p-6">
        <h3 className="font-bold text-gray-900 mb-4">Monthly Trend</h3>
        <div className="h-48 bg-gradient-to-t from-indigo-100 to-transparent rounded-xl flex items-end justify-center">
          <p className="text-gray-400 mb-8">Graph visualization coming soon</p>
        </div>
      </div>
    </div>
  );
}

// Weekly Schedule Screen Component
function WeeklyScheduleScreen() {
  const [selectedDay, setSelectedDay] = useState('Mon');
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  
  const schedules = [
    { day: 'Mon', pickup: 'Ambala Cantt', destination: 'MMDU Campus', time: '8:00 AM', participants: ['Gokul', 'Rahul', 'Priya'] },
    { day: 'Wed', pickup: 'Mullana', destination: 'MMDU Campus', time: '8:30 AM', participants: ['Gokul', 'Amit'] },
    { day: 'Fri', pickup: 'Ambala Cantt', destination: 'MMDU Campus', time: '7:45 AM', participants: ['Gokul', 'Rahul', 'Priya', 'Neha'] }
  ];

  const selectedSchedule = schedules.find(s => s.day === selectedDay);

  return (
    <div className="pb-24">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Weekly Ride Schedule</h2>

      {/* Week Strip */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
        {days.map(day => (
          <button
            key={day}
            onClick={() => setSelectedDay(day)}
            className={`px-6 py-3 rounded-xl font-medium whitespace-nowrap transition ${
              selectedDay === day
                ? 'bg-indigo-600 text-white shadow-lg'
                : 'bg-white text-gray-600 hover:bg-gray-50'
            }`}
          >
            {day}
          </button>
        ))}
      </div>

      {/* Schedule Card */}
      {selectedSchedule ? (
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="font-bold text-gray-900 text-lg mb-2">Ride Details</h3>
              <p className="text-sm text-gray-600">{selectedSchedule.pickup} → {selectedSchedule.destination}</p>
            </div>
            <span className="px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-semibold">
              {selectedSchedule.time}
            </span>
          </div>
          
          <div className="mb-4">
            <h4 className="font-semibold text-gray-700 mb-2">Participants ({selectedSchedule.participants.length})</h4>
            <div className="flex gap-2">
              {selectedSchedule.participants.map((p, idx) => (
                <span key={idx} className="px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full text-sm">
                  {p}
                </span>
              ))}
            </div>
          </div>

          <div className="flex gap-3">
            <button className="flex-1 px-4 py-3 bg-indigo-600 text-white rounded-xl font-medium hover:bg-indigo-700 transition flex items-center justify-center gap-2">
              <MessageCircle size={18} />
              Group Chat
            </button>
            <button className="px-4 py-3 bg-green-600 text-white rounded-xl font-medium hover:bg-green-700 transition flex items-center justify-center">
              <Phone size={18} />
            </button>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-2xl shadow-sm p-12 text-center">
          <Calendar size={48} className="mx-auto text-gray-300 mb-4" />
          <p className="text-gray-500">No rides scheduled for this day</p>
        </div>
      )}
    </div>
  );