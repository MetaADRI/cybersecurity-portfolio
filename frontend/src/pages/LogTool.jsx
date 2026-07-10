import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Terminal, Upload, Play, FileText, AlertTriangle, Shield, Search } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

const patterns = {
  'Failed Login Attempt': /failed password|authentication failure/i,
  'Suspicious File Access': /\/etc\/passwd|\.php/i,
  'SQL Injection Attempt': /(\%27)|(\')|(\-\-)|(\%23)|(#)|(\bOR\b.*\=)|(\b1=1\b)/i,
};

const sampleLogs = `2025-09-27 22:15:12 Failed password for invalid user root from 192.168.1.5 port 22 ssh2
2025-09-27 22:17:33 GET /etc/passwd HTTP/1.1 404 - 10.0.0.12
2025-09-27 22:19:44 Accepted password for admin from 172.16.0.2 port 22 ssh2
2025-09-27 22:20:01 POST /index.php?id=1' OR '1'='1 HTTP/1.1 200 - 192.168.1.9
2025-09-27 22:21:15 Failed password for user guest from 203.0.113.55 port 22 ssh2
2025-09-27 22:22:33 GET /admin/config.php HTTP/1.1 200 - 192.168.1.9
2025-09-27 22:23:01 POST /login.php username=admin'--&password=anything HTTP/1.1 302 - 10.0.0.55
2025-09-27 22:24:18 Failed password for invalid user admin from 45.33.32.156 port 22 ssh2
2025-09-27 22:24:19 Failed password for invalid user admin from 45.33.32.156 port 22 ssh2
2025-09-27 22:24:20 Failed password for invalid user admin from 45.33.32.156 port 22 ssh2
2025-09-27 22:24:21 Failed password for invalid user admin from 45.33.32.156 port 22 ssh2
2025-09-27 22:24:22 Failed password for invalid user admin from 45.33.32.156 port 22 ssh2
2025-09-27 22:25:00 Accepted password for root from 192.168.1.100 port 22 ssh2
2025-09-27 22:26:45 GET /etc/shadow HTTP/1.1 403 - 192.168.1.9
2025-09-27 22:27:01 POST /search?q=' UNION SELECT username,password FROM users-- HTTP/1.1 200 - 203.0.113.99`;

function extractTimestamp(line) {
  const m = line.match(/\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}/);
  return m ? m[0] : 'N/A';
}

function extractIP(line) {
  const m = line.match(/\b\d{1,3}(\.\d{1,3}){3}\b/);
  return m ? m[0] : 'N/A';
}

function analyzeLogs(text) {
  const lines = text.split('\n').filter(l => l.trim());
  const results = [];

  for (const line of lines) {
    for (const [eventType, regex] of Object.entries(patterns)) {
      if (regex.test(line)) {
        results.push({
          timestamp: extractTimestamp(line),
          ip: extractIP(line),
          event_type: eventType,
          raw_log: line.trim(),
        });
      }
    }
  }
  return results;
}

const typeColors = {
  'Failed Login Attempt': '#ff9500',
  'Suspicious File Access': '#ff3333',
  'SQL Injection Attempt': '#a855f7',
};

export default function LogTool() {
  const [logText, setLogText] = useState('');
  const [results, setResults] = useState(null);
  const [analyzing, setAnalyzing] = useState(false);

  const handleAnalyze = useCallback(() => {
    if (!logText.trim()) return;
    setAnalyzing(true);
    setTimeout(() => {
      const r = analyzeLogs(logText);
      setResults(r);
      setAnalyzing(false);
    }, 800);
  }, [logText]);

  const loadSample = () => {
    setLogText(sampleLogs);
    setResults(null);
  };

  const downloadCSV = () => {
    if (!results) return;
    const header = 'timestamp,ip,event_type,raw_log\n';
    const rows = results.map(r =>
      `"${r.timestamp}","${r.ip}","${r.event_type}","${r.raw_log.replace(/"/g, '""')}"`
    ).join('\n');
    const blob = new Blob([header + rows], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = 'security_report.csv'; a.click();
    URL.revokeObjectURL(url);
  };

  const typeCounts = results
    ? Object.entries(results.reduce((acc, r) => { acc[r.event_type] = (acc[r.event_type] || 0) + 1; return acc; }, {}))
        .map(([name, value]) => ({ name, value, fill: typeColors[name] || '#00d4ff' }))
    : [];

  const severityCounts = results
    ? Object.entries(results.reduce((acc, r) => {
        const sev = r.event_type === 'SQL Injection Attempt' ? 'critical'
          : r.event_type === 'Suspicious File Access' ? 'high' : 'medium';
        acc[sev] = (acc[sev] || 0) + 1;
        return acc;
      }, {}))
    : [];

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="space-y-1">
        <div className="flex items-center gap-2">
          <Terminal className="w-5 h-5 text-cyber-green" />
          <h1 className="text-2xl md:text-3xl font-bold text-white">
            Log <span className="text-cyber-green glow-green">Analyzer</span>
          </h1>
        </div>
        <p className="text-sm text-cyber-muted">Upload or paste logs to detect brute-force, SQL injection, and file access attempts.</p>
      </motion.div>

      {/* Input Area */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-cyber-card border border-cyber-border rounded-xl overflow-hidden"
      >
        <div className="flex items-center justify-between px-4 py-2.5 border-b border-cyber-border">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-cyber-red/80" />
            <div className="w-3 h-3 rounded-full bg-cyber-yellow/80" />
            <div className="w-3 h-3 rounded-full bg-cyber-green/80" />
            <span className="ml-2 text-xs text-cyber-muted">log_input.txt</span>
          </div>
          <div className="flex gap-2">
            <button onClick={loadSample} className="text-[11px] px-3 py-1 rounded bg-cyber-black border border-cyber-border text-cyber-muted hover:text-cyber-green hover:border-cyber-green/30 transition-colors">
              Load Sample
            </button>
            <label className="text-[11px] px-3 py-1 rounded bg-cyber-black border border-cyber-border text-cyber-muted hover:text-cyber-blue hover:border-cyber-blue/30 transition-colors cursor-pointer flex items-center gap-1">
              <Upload className="w-3 h-3" />
              Upload
              <input
                type="file"
                accept=".log,.txt"
                className="hidden"
                onChange={e => {
                  const file = e.target.files[0];
                  if (file) {
                    const reader = new FileReader();
                    reader.onload = ev => { setLogText(ev.target.result); setResults(null); };
                    reader.readAsText(file);
                  }
                }}
              />
            </label>
          </div>
        </div>
        <textarea
          value={logText}
          onChange={e => { setLogText(e.target.value); setResults(null); }}
          placeholder="Paste your log data here or load sample data..."
          className="w-full h-48 bg-transparent p-4 font-mono text-xs text-cyber-text placeholder-cyber-muted/50 resize-none focus:outline-none"
        />
        <div className="px-4 py-3 border-t border-cyber-border flex items-center justify-between">
          <span className="text-[11px] text-cyber-muted">{logText.split('\n').filter(l => l.trim()).length} lines loaded</span>
          <button
            onClick={handleAnalyze}
            disabled={!logText.trim() || analyzing}
            className="flex items-center gap-2 text-xs px-4 py-2 rounded-lg bg-cyber-green/10 border border-cyber-green/30 text-cyber-green hover:bg-cyber-green/20 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {analyzing ? (
              <>
                <div className="w-3.5 h-3.5 border-2 border-cyber-green/30 border-t-cyber-green rounded-full animate-spin" />
                Analyzing...
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5" />
                Analyze Logs
              </>
            )}
          </button>
        </div>
      </motion.div>

      {/* Results */}
      {results && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
          {/* Summary Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            <div className="bg-cyber-card border border-cyber-border rounded-xl p-4">
              <p className="text-2xl font-bold text-cyber-red">{results.length}</p>
              <p className="text-[11px] text-cyber-muted">Threats Detected</p>
            </div>
            <div className="bg-cyber-card border border-cyber-border rounded-xl p-4">
              <p className="text-2xl font-bold text-cyber-blue">{new Set(results.map(r => r.ip)).size}</p>
              <p className="text-[11px] text-cyber-muted">Unique IPs</p>
            </div>
            <div className="bg-cyber-card border border-cyber-border rounded-xl p-4">
              <p className="text-2xl font-bold text-cyber-orange">{Object.keys(typeCounts).length}</p>
              <p className="text-[11px] text-cyber-muted">Attack Types</p>
            </div>
            <div className="bg-cyber-card border border-cyber-border rounded-xl p-4">
              <p className="text-2xl font-bold text-cyber-purple">{severityCounts.find(s => s[0] === 'critical')?.[1] || 0}</p>
              <p className="text-[11px] text-cyber-muted">Critical Findings</p>
            </div>
          </div>

          {/* Charts + Table */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {/* Pie Chart */}
            <div className="bg-cyber-card border border-cyber-border rounded-xl p-4">
              <h3 className="text-xs font-bold text-white mb-3">Attack Breakdown</h3>
              <div className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={typeCounts} cx="50%" cy="50%" innerRadius={40} outerRadius={70} paddingAngle={3} dataKey="value">
                      {typeCounts.map((entry, i) => (
                        <Cell key={i} fill={entry.fill} stroke="transparent" />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={{ background: '#161b22', border: '1px solid #21262d', borderRadius: '8px', fontSize: '11px' }} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="space-y-1 mt-2">
                {typeCounts.map(t => (
                  <div key={t.name} className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full" style={{ background: t.fill }} />
                      <span className="text-[10px] text-cyber-muted">{t.name}</span>
                    </div>
                    <span className="text-[10px] text-white font-mono">{t.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Results Table */}
            <div className="lg:col-span-2 bg-cyber-card border border-cyber-border rounded-xl overflow-hidden">
              <div className="flex items-center justify-between px-4 py-2.5 border-b border-cyber-border">
                <div className="flex items-center gap-2">
                  <Search className="w-3.5 h-3.5 text-cyber-green" />
                  <span className="text-xs font-bold text-white">Detection Results</span>
                </div>
                <button onClick={downloadCSV} className="text-[11px] px-3 py-1 rounded bg-cyber-black border border-cyber-border text-cyber-muted hover:text-cyber-green transition-colors flex items-center gap-1">
                  <FileText className="w-3 h-3" />
                  Export CSV
                </button>
              </div>
              <div className="overflow-x-auto max-h-64 overflow-y-auto">
                <table className="w-full text-left">
                  <thead className="bg-cyber-black/50 sticky top-0">
                    <tr>
                      <th className="px-4 py-2 text-[10px] text-cyber-muted font-medium uppercase">Time</th>
                      <th className="px-4 py-2 text-[10px] text-cyber-muted font-medium uppercase">IP</th>
                      <th className="px-4 py-2 text-[10px] text-cyber-muted font-medium uppercase">Type</th>
                      <th className="px-4 py-2 text-[10px] text-cyber-muted font-medium uppercase">Raw Log</th>
                    </tr>
                  </thead>
                  <tbody>
                    {results.map((r, i) => (
                      <tr key={i} className="border-t border-cyber-border hover:bg-cyber-black/30">
                        <td className="px-4 py-2 text-[11px] text-cyber-muted font-mono whitespace-nowrap">{r.timestamp}</td>
                        <td className="px-4 py-2 text-[11px] text-cyber-blue font-mono">{r.ip}</td>
                        <td className="px-4 py-2">
                          <span
                            className="text-[10px] px-2 py-0.5 rounded-full font-medium"
                            style={{
                              background: `${typeColors[r.event_type]}20`,
                              color: typeColors[r.event_type],
                            }}
                          >
                            {r.event_type}
                          </span>
                        </td>
                        <td className="px-4 py-2 text-[10px] text-cyber-text font-mono max-w-xs truncate">{r.raw_log}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
