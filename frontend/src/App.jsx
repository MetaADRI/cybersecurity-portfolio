import { HashRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Projects from './pages/Projects';
import LogTool from './pages/LogTool';
import Skills from './pages/Skills';
import IRPage from './pages/IRTimeline';
import About from './pages/About';
import PDFViewer from './pages/PDFViewer';

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/projects/:id" element={<PDFViewer />} />
          <Route path="/log-tool" element={<LogTool />} />
          <Route path="/skills" element={<Skills />} />
          <Route path="/timeline" element={<IRPage />} />
          <Route path="/about" element={<About />} />
        </Route>
      </Routes>
    </HashRouter>
  );
}
