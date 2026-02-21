import { useState } from 'react';
import { useApp } from '../../context/AppContext.jsx';
import Sidebar from './Sidebar.jsx';
import TopBar from './TopBar.jsx';
import ChatPanel from './ChatPanel.jsx';

export default function Layout({ children }) {
  const { state } = useApp();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden bg-surface-950">
      {/* Sidebar */}
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main content area */}
      <div className="flex-1 flex flex-col min-w-0">
        <TopBar onMenuToggle={() => setSidebarOpen(!sidebarOpen)} />

        <main
          className={`
            flex-1 overflow-y-auto transition-all duration-300
            ${state.chatOpen ? 'mr-80 sm:mr-96' : ''}
          `}
        >
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            {children}
          </div>
        </main>
      </div>

      {/* Chat panel */}
      <ChatPanel />
    </div>
  );
}
