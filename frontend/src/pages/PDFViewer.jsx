import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, FileText, Download, ExternalLink } from 'lucide-react';

const pdfFiles = {
  'security-audit': {
    title: 'Security Audit Report',
    file: '/cybersecurity-portfolio/projects/Security%20Audit.pdf',
    rawFile: '/projects/Security Audit.pdf',
  },
  'network-analysis': {
    title: 'Network Traffic Analysis Report',
    file: '/cybersecurity-portfolio/projects/network-traffic-analysis.pdf',
    rawFile: '/projects/network-traffic-analysis.pdf',
  },
  'incident-journal': {
    title: "Incident Handler's Journal",
    file: '/cybersecurity-portfolio/projects/incident-handlers-journal.pdf',
    rawFile: '/projects/incident-handlers-journal.pdf',
  },
};

export default function PDFViewer() {
  const { id } = useParams();
  const pdf = pdfFiles[id];

  if (!pdf) {
    return (
      <div className="space-y-4">
        <Link to="/projects" className="flex items-center gap-2 text-sm text-cyber-muted hover:text-cyber-green transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Projects
        </Link>
        <div className="bg-cyber-card border border-cyber-border rounded-xl p-12 text-center">
          <FileText className="w-12 h-12 text-cyber-muted mx-auto mb-3" />
          <p className="text-sm text-cyber-muted">PDF not found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4 h-[calc(100vh-8rem)]">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <Link to="/projects" className="flex items-center gap-2 text-sm text-cyber-muted hover:text-cyber-green transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Projects
        </Link>
        <div className="flex items-center gap-2">
          <h2 className="text-sm font-bold text-white">{pdf.title}</h2>
          <a
            href={pdf.rawFile}
            download
            className="flex items-center gap-1.5 text-[11px] px-3 py-1.5 rounded-lg bg-cyber-black border border-cyber-border text-cyber-muted hover:text-cyber-green hover:border-cyber-green/30 transition-colors"
          >
            <Download className="w-3 h-3" />
            Download
          </a>
          <a
            href={pdf.rawFile}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-[11px] px-3 py-1.5 rounded-lg bg-cyber-black border border-cyber-border text-cyber-muted hover:text-cyber-blue hover:border-cyber-blue/30 transition-colors"
          >
            <ExternalLink className="w-3 h-3" />
            Open Raw
          </a>
        </div>
      </motion.div>

      {/* PDF Embed */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1 }}
        className="bg-cyber-card border border-cyber-border rounded-xl overflow-hidden flex-1"
        style={{ height: 'calc(100% - 3rem)' }}
      >
        <iframe
          src={pdf.file}
          className="w-full h-full border-0"
          title={pdf.title}
        />
      </motion.div>
    </div>
  );
}
