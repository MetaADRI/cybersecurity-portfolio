import { useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { Shield, LayoutDashboard, FolderOpen, Terminal, Cpu, Clock, User, Menu, X } from 'lucide-react';

const navItems = [
  { to: '/', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/projects', icon: FolderOpen, label: 'Projects' },
  { to: '/log-tool', icon: Terminal, label: 'Log Analyzer' },
  { to: '/skills', icon: Cpu, label: 'Skills' },
  { to: '/timeline', icon: Clock, label: 'IR Timeline' },
  { to: '/about', icon: User, label: 'About' },
];

export default function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-cyber-black cyber-grid">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/60 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <aside className={`fixed lg:sticky top-0 left-0 h-screen w-64 bg-cyber-dark border-r border-cyber-border z-50 flex flex-col transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
        {/* Logo */}
        <div className="p-5 border-b border-cyber-border flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-cyber-green/10 border border-cyber-green/30 flex items-center justify-center">
            <Shield className="w-5 h-5 text-cyber-green" />
          </div>
          <div>
            <h1 className="text-sm font-bold text-cyber-green glow-green">CYBERSEC</h1>
            <p className="text-[10px] text-cyber-muted tracking-widest">PORTFOLIO</p>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 p-3 space-y-1">
          {navItems.map(({ to, icon: Icon, label }) => (
            <NavLink
              key={to}
              to={to}
              onClick={() => setSidebarOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all duration-200 ${
                  isActive
                    ? 'bg-cyber-green/10 text-cyber-green border border-cyber-green/20 box-glow-green'
                    : 'text-cyber-muted hover:text-cyber-text hover:bg-cyber-card'
                }`
              }
            >
              <Icon className="w-4 h-4" />
              <span>{label}</span>
            </NavLink>
          ))}
        </nav>

        {/* Status */}
        <div className="p-4 border-t border-cyber-border">
          <div className="flex items-center gap-2 text-xs text-cyber-muted">
            <span className="w-2 h-2 rounded-full bg-cyber-green pulse-dot" />
            <span>Systems Operational</span>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 min-h-screen">
        {/* Mobile header */}
        <header className="lg:hidden sticky top-0 z-30 bg-cyber-dark/80 backdrop-blur-md border-b border-cyber-border px-4 py-3 flex items-center justify-between">
          <button onClick={() => setSidebarOpen(true)} className="text-cyber-muted hover:text-cyber-green">
            <Menu className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-cyber-green" />
            <span className="text-sm font-bold text-cyber-green">CYBERSEC</span>
          </div>
          <div className="w-5" />
        </header>

        <div className="p-4 md:p-6 lg:p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
