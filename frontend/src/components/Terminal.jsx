import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const lines = [
  { text: '$ nmap -sV --script=vuln target.local', delay: 0, type: 'command' },
  { text: 'Starting Nmap 7.94 ( https://nmap.org )', delay: 400, type: 'output' },
  { text: 'Nmap scan report for target.local (192.168.1.100)', delay: 800, type: 'output' },
  { text: 'PORT     STATE  SERVICE  VERSION', delay: 1200, type: 'output' },
  { text: '22/tcp   open   ssh      OpenSSH 8.9p1', delay: 1400, type: 'output' },
  { text: '80/tcp   open   http     nginx 1.18.0', delay: 1600, type: 'output' },
  { text: '443/tcp  open   https    nginx 1.18.0', delay: 1800, type: 'output' },
  { text: '3306/tcp open   mysql    MySQL 8.0.32', delay: 2000, type: 'output' },
  { text: '', delay: 2200, type: 'output' },
  { text: '[!] VULNERABLE: CVE-2023-44487 — HTTP/2 Rapid Reset', delay: 2400, type: 'vuln' },
  { text: '[!] VULNERABLE: CVE-2023-38408 — OpenSSH RCE (libssh)', delay: 2700, type: 'vuln' },
  { text: '', delay: 2900, type: 'output' },
  { text: '$ echo "Scan complete. 2 vulnerabilities found."', delay: 3100, type: 'command' },
  { text: 'Scan complete. 2 vulnerabilities found.', delay: 3400, type: 'success' },
  { text: '$ █', delay: 3600, type: 'cursor' },
];

export default function Terminal() {
  const [visibleLines, setVisibleLines] = useState([]);
  const containerRef = useRef(null);

  useEffect(() => {
    const timers = lines.map((line, i) =>
      setTimeout(() => {
        setVisibleLines(prev => [...prev, line]);
        if (containerRef.current) {
          containerRef.current.scrollTop = containerRef.current.scrollHeight;
        }
      }, line.delay)
    );
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-cyber-dark border border-cyber-border rounded-xl overflow-hidden"
    >
      {/* Title bar */}
      <div className="flex items-center gap-2 px-4 py-2.5 bg-cyber-card border-b border-cyber-border">
        <div className="w-3 h-3 rounded-full bg-cyber-red/80" />
        <div className="w-3 h-3 rounded-full bg-cyber-yellow/80" />
        <div className="w-3 h-3 rounded-full bg-cyber-green/80" />
        <span className="ml-2 text-xs text-cyber-muted font-mono">root@kali:~#</span>
      </div>

      {/* Terminal body */}
      <div ref={containerRef} className="p-4 font-mono text-sm h-72 overflow-y-auto space-y-1">
        {visibleLines.map((line, i) => (
          <div
            key={i}
            className={`${
              line.type === 'command' ? 'text-cyber-green' :
              line.type === 'vuln' ? 'text-cyber-red' :
              line.type === 'success' ? 'text-cyber-blue' :
              line.type === 'cursor' ? 'text-cyber-green typing-cursor' :
              'text-cyber-text'
            }`}
          >
            {line.text}
          </div>
        ))}
      </div>
    </motion.div>
  );
}
