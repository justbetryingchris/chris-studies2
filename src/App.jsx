import React, { useState, useEffect } from 'react';
import { BookOpen, CheckCircle, Clock, Plus, Trash2, Search, Award } from 'lucide-react';

export default function App() {
  // Safe state initialization with localStorage fallback
  const [subjects, setSubjects] = useState(() => {
    try {
      const saved = localStorage.getItem('chris_studies_subjects');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error("Failed to load from localStorage:", e);
    }
    return [
      { id: 1, title: 'React & Vite Deployment', category: 'Frontend', completed: false, hours: 3 },
      { id: 2, title: 'Tailwind CSS Layouts', category: 'Design', completed: true, hours: 2 },
      { id: 3, title: 'Java Spring Boot Basics', category: 'Backend', completed: false, hours: 5 }
    ];
  });

  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState('Frontend');
  const [newHours, setNewHours] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  // Save to localStorage whenever subjects change
  useEffect(() => {
    try {
      localStorage.setItem('chris_studies_subjects', JSON.stringify(subjects));
    } catch (e) {
      console.error("Failed to save to localStorage:", e);
    }
  }, [subjects]);

  const addSubject = (e) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const newItem = {
      id: Date.now(),
      title: newTitle.trim(),
      category: newCategory,
      completed: false,
      hours: Number(newHours) || 1
    };

    setSubjects([newItem, ...subjects]);
    setNewTitle('');
    setNewHours('');
  };

  const toggleComplete = (id) => {
    setSubjects(subjects.map(sub => 
      sub.id === id ? { ...sub, completed: !sub.completed } : sub
    ));
  };

  const deleteSubject = (id) => {
    setSubjects(subjects.filter(sub => sub.id !== id));
  };

  const filteredSubjects = subjects.filter(sub => 
    sub.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    sub.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalHours = subjects.reduce((acc, curr) => acc + (curr.completed ? curr.hours : 0), 0);
  const completedCount = subjects.filter(s => s.completed).length;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 sm:p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Header */}
        <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-xl">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent flex items-center gap-2">
              <BookOpen className="w-8 h-8 text-blue-400" /> Chris Studies
            </h1>
            <p className="text-slate-400 text-sm mt-1">Track your learning goals, hours, and modules efficiently.</p>
          </div>
          <div className="flex gap-4">
            <div className="bg-slate-950 border border-slate-800 px-4 py-2 rounded-xl text-center">
              <div className="text-2xl font-bold text-blue-400">{completedCount}/{subjects.length}</div>
              <div className="text-xs text-slate-400 uppercase tracking-wider">Completed</div>
            </div>
            <div className="bg-slate-950 border border-slate-800 px-4 py-2 rounded-xl text-center">
              <div className="text-2xl font-bold text-emerald-400">{totalHours}h</div>
              <div className="text-xs text-slate-400 uppercase tracking-wider">Hours Studied</div>
            </div>
          </div>
        </header>

        {/* Add Form & Search */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <form onSubmit={addSubject} className="md:col-span-2 bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-xl space-y-4">
            <h2 className="text-lg font-semibold text-slate-200 flex items-center gap-2">
              <Plus className="w-5 h-5 text-blue-400" /> Add New Study Goal
            </h2>
            <div className="space-y-3">
              <input
                type="text"
                placeholder="What are you studying today?"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-500 transition-colors"
              />
              <div className="flex gap-3">
                <select
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-500 transition-colors text-slate-300"
                >
                  <option value="Frontend">Frontend</option>
                  <option value="Backend">Backend</option>
                  <option value="Design">Design</option>
                  <option value="General">General</option>
                </select>
                <input
                  type="number"
                  placeholder="Hours"
                  min="1"
                  value={newHours}
                  onChange={(e) => setNewHours(e.target.value)}
                  className="w-28 bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-500 transition-colors"
                />
              </div>
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-500 text-white font-medium py-3 rounded-xl transition-colors shadow-lg shadow-blue-600/20"
            >
              Add Task
            </button>
          </form>

          {/* Search Panel */}
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-xl space-y-4 flex flex-col justify-between">
            <div>
              <h2 className="text-lg font-semibold text-slate-200 flex items-center gap-2 mb-4">
                <Search className="w-5 h-5 text-blue-400" /> Filter Tasks
              </h2>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search topics..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-500 transition-colors"
                />
              </div>
            </div>
            <div className="text-xs text-slate-500 flex items-center gap-1">
              <Award className="w-4 h-4 text-amber-400" /> Keep pushing towards your goals!
            </div>
          </div>
        </div>

        {/* List of Subjects */}
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-xl space-y-4">
          <h2 className="text-lg font-semibold text-slate-200 flex items-center gap-2">
            <Clock className="w-5 h-5 text-blue-400" /> Your Study Queue ({filteredSubjects.length})
          </h2>
          {filteredSubjects.length === 0 ? (
            <div className="text-center py-12 text-slate-500 border border-dashed border-slate-800 rounded-xl">
              No study topics found. Add one above to get started!
            </div>
          ) : (
            <div className="space-y-3">
              {filteredSubjects.map((sub) => (
                <div
                  key={sub.id}
                  className={`flex items-center justify-between p-4 rounded-xl border transition-all ${
                    sub.completed
                      ? 'bg-slate-950/40 border-slate-800/50 opacity-60'
                      : 'bg-slate-950 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => toggleComplete(sub.id)}
                      className={`w-6 h-6 rounded-full border flex items-center justify-center transition-colors ${
                        sub.completed
                          ? 'bg-emerald-500 border-emerald-500 text-slate-950'
                          : 'border-slate-700 hover:border-blue-500'
                      }`}
                    >
                      {sub.completed && <CheckCircle className="w-4 h-4" />}
                    </button>
                    <div>
                      <h3 className={`font-medium ${sub.completed ? 'line-through text-slate-400' : 'text-slate-200'}`}>
                        {sub.title}
                      </h3>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs bg-blue-950 text-blue-400 border border-blue-900/50 px-2 py-0.5 rounded-md">
                          {sub.category}
                        </span>
                        <span className="text-xs text-slate-500">{sub.hours} hrs</span>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => deleteSubject(sub.id)}
                    className="text-slate-500 hover:text-red-400 p-2 transition-colors"
                    title="Delete task"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}