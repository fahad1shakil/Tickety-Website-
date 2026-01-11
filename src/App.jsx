import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaCheckCircle, FaTwitter, FaLinkedin, FaFacebook, FaEnvelope } from "react-icons/fa";

// useState: ডাটা মনে রাখার জন্য (যেমন: কয়টা টিকিট আছে)।
// useEffect: ওয়েবসাইট লোড হওয়ার সাথে সাথে কিছু করার জন্য (যেমন: ডাটা ফেচ করা)।
// toast: নোটিফিকেশন বা পপ-আপ মেসেজ দেখানোর জন্য।

function App() {
  const [tickets, setTickets] = useState([]);
  const [taskStatusQueue, setTaskStatusQueue] = useState([]); 
  const [resolvedCount, setResolvedCount] = useState(0);
  const [resolvedQueue, setResolvedQueue] = useState([]);


// tickets: এখানে data.json থেকে আসা সব টিকিট জমা থাকবে। শুরুতে এটি খালি []।
// taskStatusQueue: যখন আপনি কোনো টিকিটে ক্লিক করবেন, সেটি এই বাক্সে এসে জমা হবে (ডান পাশের সেকশনের জন্য)।
// resolvedCount: কয়টি কাজ শেষ করেছেন তার সংখ্যা এখানে থাকবে। শুরুতে এটি 0।

  // Load data from public folder
  useEffect(() => {
    fetch("./data.json")
      .then((res) => res.json())
      .then((data) => setTickets(data))
      .catch((err) => console.error("Error loading data:", err));
  }, []);

// ১. data.json ফাইলটি খুঁজো
// 2. ডাটাগুলোকে জাভাস্ক্রিপ্ট অবজেক্টে কনভার্ট করো
// ৩. সেই ডাটাগুলো 'tickets' বাক্সে ভরে দাও
// ৪. কোনো সমস্যা হলে কনসোলে এরর দেখাও

// ১. চেক করা হচ্ছে এই টিকিটটি আগে থেকেই ডান পাশে আছে কিনা

  const handleTicketClick = (ticket) => {
    const exists = taskStatusQueue.find((t) => t.id === ticket.id);
    if (exists) {
      toast.info("Ticket is already in progress!");
      return;
    }
    // ২. ডান পাশের লিস্টে নতুন টিকিট যোগ করা
    setTaskStatusQueue([...taskStatusQueue, ticket]);

    // ৩. বাম পাশের মেইন লিস্ট থেকে টিকিটটি সরিয়ে ফেলা = state থেকে সেটা filter() করে বাদ দিলেই UI নিজে নিজে আপডেট হয়
    // jeta click korbe oita bad dite 
    //t.id → লিস্টের প্রতিটা টিকিটের id
    //ticket.id → যেটাতে আপনি ক্লিক করেছেন, তার id
    const remainingTickets = tickets.filter((t) => t.id !== ticket.id);
    setTickets(remainingTickets);
    toast.success("Ticket added to Task Status!");
  };

  const handleCompleteTask = (id) => {
    // ১. যে টাস্কটি কমপ্লিট হচ্ছে সেটি খুঁজে বের করা
    // taskStatusQueue = In-Progress টিকিটগুলোর লিস্ট
    // .map() = লিস্টের একটা একটা item বের করছে
    // প্রতিটা item-ই হলো 👉 task
    const taskToResolve = taskStatusQueue.find((task) => task.id === id);

    // ২. Resolved Queue-তে টাস্কটি যোগ করা (সবার উপরে দেখাবে)
    if (taskToResolve) {
      setResolvedQueue([taskToResolve, ...resolvedQueue]);

      // ৩. Task Status (In Progress) থেকে ডিলিট করা
      const updatedQueue = taskStatusQueue.filter((task) => task.id !== id);
      setTaskStatusQueue(updatedQueue);

      // ৪. কাউন্টার বাড়ানো
      setResolvedCount(resolvedCount + 1);

      // Alert Show bro
      toast.success("Task Resolved Successfully!");
    }
  };

  const removeResolvedTask = (id) => {
    const updatedResolved = resolvedQueue.filter((t) => t.id !== id);
    setResolvedQueue(updatedResolved);
  };

  return (
    <div className="min-h-screen flex flex-col font-sans bg-gray-50">
      <ToastContainer position="top-right" autoClose={3000} />

      {/* --- Navbar --- */}
      <nav className="bg-white shadow-sm px-6 py-4 flex justify-between items-center sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">CS</div>
          <h1 className="text-xl font-bold text-gray-800 tracking-tight">Ticket System</h1>
        </div>
        <div className="flex items-center gap-6 text-gray-600 font-medium text-sm">
          <a href="#" className="hover:text-blue-600 transition">Home</a>
          <a href="#" className="hover:text-blue-600 transition">FAQ</a>
          <a href="#" className="hover:text-blue-600 transition">Blog</a>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg font-semibold transition shadow-md cursor-pointer">
            + New Ticket
          </button>
        </div>
      </nav>

      <main className="flex-grow container mx-auto px-4 py-6 max-w-7xl">

        {/* --- Banner Section --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">

          {/* In Progress Card (Purple Gradient) */}
          <div className="relative bg-gradient-to-r from-violet-500 to-fuchsia-500 rounded-2xl p-8 text-white text-center shadow-lg transform hover:scale-[1.03] transition duration-400 overflow-hidden flex flex-col justify-center items-center h-[200px]">

            {/* Background Vector Image Logic (Fixed) */}
            <div className="absolute inset-0 flex justify-between items-center opacity-100 pointer-events-none">
                {/* বাম পাশের ইমেজ */}
                <img src="/vector1.png" alt="" className="h-full object-cover" />
                {/* ডান পাশের ইমেজ (উল্টানো/Rotated) */}
                <img src="/vector1.png" alt="" className="h-full object-cover transform scale-x-[-1]" />
            </div>

            {/* Content Layer */}
            <div className="relative z-10">
              <h2 className="text-2xl font-semibold opacity-90 mb-2">In-Progress</h2>
              <div className="text-5xl font-bold">
                {taskStatusQueue.length}</div>
              <div className="mt-2 text-sm opacity-75">Active Tickets</div>
            </div>
          </div>

          {/* Resolved Card (Green Gradient) */}
          <div className="relative bg-gradient-to-r from-emerald-400 to-teal-500 rounded-2xl p-8 text-white text-center shadow-lg transform hover:scale-[1.03] transition duration-400 overflow-hidden flex flex-col justify-center items-center h-[200px]">

            {/* Background Vector Image Logic (Fixed) */}
            <div className="absolute inset-0 flex justify-between items-center opacity-100 pointer-events-none">
                 {/* বাম পাশের ইমেজ */}
                 <img src="/vector1.png" alt="" className="h-full object-cover" />
                 {/* ডান পাশের ইমেজ (উল্টানো/Rotated) */}
                 <img src="/vector1.png" alt="" className="h-full object-cover transform scale-x-[-1]" />
            </div>

            {/* Content Layer */}
            <div className="relative z-10">
              <h2 className="text-2xl font-semibold opacity-90 mb-2">Resolved</h2>
              <div className="text-5xl font-bold">{resolvedCount}</div>
              <div className="mt-2 text-sm opacity-75">Completed Tasks</div>
            </div>
          </div>

        </div>

        {/* --- Main Content Grid --- */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

          {/* Left Column: Ticket List (Customer Tickets) */}
          <div className="lg:col-span-8">
            <h3 className="text-xl font-bold text-gray-800 mb-5 border-l-4 border-blue-500 pl-3">
              Customer Tickets ({tickets.length})
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {tickets.map((ticket) => (
                <div
                  key={ticket.id}
                  onClick={() => handleTicketClick(ticket)}
                  className="bg-white p-5 rounded-xl shadow-sm border border-gray-200 hover:shadow-md cursor-pointer transition border-l-4 group relative"
                  style={{ borderLeftColor: ticket.priority === 'High' ? '#ef4444' : ticket.priority === 'Medium' ? '#f59e0b' : '#3b82f6' }}
                >
                  {/* list name */}
                  <div className="flex flex-col w-full">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-bold text-gray-800 group-hover:text-blue-600 transition line-clamp-1 mr-2">
                        {ticket.title}
                      </h4>
                      <span className={`text-xs px-2 py-1 rounded-full font-semibold flex items-center gap-2 shrink-0 ${ticket.status === 'Open'
                            ? 'bg-green-100 text-green-700'
                            : 'bg-yellow-100 text-yellow-700'
                          }`}
                      >
                        {/* Green Dot */}
                        <span className={`w-2 h-2 rounded-full ${ticket.status === 'Open' ? 'bg-green-600' : 'bg-yellow-600'}`}></span>
                        {ticket.status}
                      </span>
                    </div>
                    {/* Description */}
                    <p className="text-sm text-gray-500 line-clamp-2">
                      {ticket.description}
                    </p>
                  </div>
                  {/* id */}
                  <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-medium text-gray-400">
                        #{ticket.id}</span>
                      <div
                       className="text-xs font-bold uppercase tracking-wider"
                        style={{ color: ticket.priority === 'High' ? '#ef4444' : ticket.priority === 'Medium' ? '#f59e0b' : '#3b82f6' }}
                      >
                        {/* priority */}
                        {ticket.priority} Priority
                      </div>
                    </div>
                    <div className="flex items-center gap-4 text-xs text-gray-500">
                      {/* customer */}
                      <div className="flex items-center gap-1 font-medium">
                        {ticket.customer}
                      </div>
                      {/* date */}
                      <div className="flex items-center gap-1 text-gray-400">
                        {ticket.createdAt || 'N/A'}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Task Status & Resolved List */}
          <div className="lg:col-span-4">
            <div className="sticky top-24 space-y-8">

              {/*  Task Status --------------------------------- --- */}
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-5 border-l-4 border-emerald-500 pl-3">
                  Task Status
                </h3>
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 min-h-[150px]">
                  {taskStatusQueue.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-32 text-gray-400">
                      <p>No active tasks</p>
                      <p className="text-xs">Click a ticket to start working</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {taskStatusQueue.map((task) => (
                        <div key={task.id} className="bg-gray-50 p-4 rounded-lg border border-gray-200 animate-fadeIn">
                          <div className="flex justify-between items-start mb-2">
                            <h4 className="font-semibold text-gray-800 text-sm">{task.title}</h4>
                            <span className="text-xs bg-purple-100 text-purple-700 px-2 py-0.5 rounded">
                              Running</span>
                          </div>
                          <p className="text-xs text-gray-500 mb-3 line-clamp-1">{task.description}</p>
                          <button
                            onClick={() => handleCompleteTask(task.id)}
                            className="w-full bg-emerald-500 hover:bg-emerald-600 text-white text-sm py-2 rounded-lg transition flex items-center justify-center gap-2 cursor-pointer shadow-sm"
                          >
                            <FaCheckCircle /> Mark as Completed
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* --- Resolved Task -------------------------------- */}
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-5 border-l-4 border-green-600 pl-3">
                  Resolved Task
                </h3>
                <div className="space-y-4">
                  {resolvedQueue.length === 0 ? (
                    <div className="text-center text-gray-400 text-sm py-4 italic bg-white rounded-xl border border-dashed border-gray-300">
                      No resolved tasks yet.
                    </div>
                  ) : (
                    resolvedQueue.map((task) => (
                      <div
                        key={task.id}
                        className="bg-gray-100 p-4 rounded-xl shadow-sm border-l-4 border-green-500 relative"
                      >
                        <h4 className="font-semibold text-gray-800 text-sm mb-2">{task.title}</h4>
                        <div className="flex justify-between items-center">
                          <div className="flex items-center gap-2 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-sm">
                            <FaCheckCircle /> Completed
                          </div>
                          <button
                            onClick={() => removeResolvedTask(task.id)}
                            className="text-xs text-gray-400 hover:text-red-500 transition cursor-pointer"
                          >
                            Click to remove
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>

            </div>
          </div>

        </div>
      </main>

      {/* --- Footer --- */}
      <footer className="bg-black text-white py-16 mt-12 font-sans">
        <div className="container mx-auto px-6 max-w-7xl">
           <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 border-b border-gray-800 pb-12">
              <div className="lg:col-span-4">
                  <h2 className="text-xl font-bold mb-4">
                    CS — Ticket System</h2>
                  <p className="text-gray-400 text-sm leading-relaxed pr-6">
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
                    Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.
                  </p>
              </div>
              <div className="lg:col-span-8 grid grid-cols-2 md:grid-cols-4 gap-6">
                  <div>
                    <h3 className="text-white font-medium mb-4">Company</h3>
                    <ul className="space-y-3 text-gray-400 text-sm">
                      <li><a href="#" className="hover:text-white transition">About Us</a></li>
                      <li><a href="#" className="hover:text-white transition">Our Mission</a></li>
                      <li><a href="#" className="hover:text-white transition">Contact Sales</a></li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-white font-medium mb-4">Services</h3>
                    <ul className="space-y-3 text-gray-400 text-sm">
                      <li><a href="#" className="hover:text-white transition">Products & Services</a></li>
                      <li><a href="#" className="hover:text-white transition">Customer Stories</a></li>
                      <li><a href="#" className="hover:text-white transition">Download Apps</a></li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-white font-medium mb-4">Information</h3>
                    <ul className="space-y-3 text-gray-400 text-sm">
                      <li><a href="#" className="hover:text-white transition">Privacy Policy</a></li>
                      <li><a href="#" className="hover:text-white transition">Terms & Conditions</a></li>
                      <li><a href="#" className="hover:text-white transition">Join Us</a></li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-white font-medium mb-4">Social Links</h3>
                    <ul className="space-y-3 text-gray-400 text-sm">
                      <li className="flex items-center gap-2">
                        <FaTwitter className="text-white" /> <a href="#" className="hover:text-white transition">@CS — Ticket System</a>
                      </li>
                      <li className="flex items-center gap-2">
                        <FaLinkedin className="text-white" /> <a href="#" className="hover:text-white transition">@CS — Ticket System</a>
                      </li>
                      <li className="flex items-center gap-2">
                        <FaFacebook className="text-white" /> <a href="#" className="hover:text-white transition">@CS — Ticket System</a>
                      </li>
                      <li className="flex items-center gap-2">
                        <FaEnvelope className="text-white" /> <a href="#" className="hover:text-white transition">support@cst.com</a>
                      </li>
                    </ul>
                  </div>
              </div>
           </div>
          <div className="pt-8 text-center text-gray-100 text-sm">
            &copy; 2025 CS — Ticket System. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;