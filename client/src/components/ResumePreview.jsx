import { useRef, useState } from 'react';
import { useReactToPrint } from 'react-to-print';
import { toast } from 'react-toastify';
import { useResume } from '../context/ResumeContext';
import PolishResume from './PolishResume';
import Modern from '../templates/Modern';
import Classic from '../templates/Classic';
import Minimal from '../templates/Minimal';
import Executive from '../templates/Executive';
import Creative from '../templates/Creative';
import Corporate from '../templates/Corporate';
import api from '../services/api';

const TEMPLATES = [
  { id: 'executive', label: 'Executive', color: '#1e293b', desc: 'Dark header, sidebar' },
  { id: 'creative', label: 'Creative', color: '#6366f1', desc: 'Dark sidebar, skill bars' },
  { id: 'corporate', label: 'Corporate', color: '#2563eb', desc: 'Blue accents, formal' },
  { id: 'modern', label: 'Modern', color: '#7c3aed', desc: 'Purple gradient header' },
  { id: 'classic', label: 'Classic', color: '#374151', desc: 'Traditional serif' },
  { id: 'minimal', label: 'Minimal', color: '#10b981', desc: 'Clean & spacious' },
];

const TemplateMap = { modern: Modern, classic: Classic, minimal: Minimal, executive: Executive, creative: Creative, corporate: Corporate };

export default function ResumePreview() {
  const { resume, template, setTemplate } = useResume();
  const printRef = useRef();
  const [scoring, setScoring] = useState(false);
  const [atsResult, setAtsResult] = useState(null);

  const handlePrint = useReactToPrint({
    content: () => printRef.current,
    documentTitle: `${resume.personalInfo.name || 'Resume'}_Resume`,
  });

  const handleATSScore = async () => {
    setScoring(true);
    setAtsResult(null);
    try {
      const res = await api.post('/ai/ats-score', { resumeData: resume });
      setAtsResult(res.data);
      toast.success('ATS score ready!');
    } catch {
      toast.error('ATS scoring failed');
    } finally {
      setScoring(false);
    }
  };

  const TemplateComponent = TemplateMap[template];
  const scoreColor = atsResult ? (atsResult.score >= 80 ? 'text-success' : atsResult.score >= 60 ? 'text-warning' : 'text-danger') : '';
  const scoreBg = atsResult ? (atsResult.score >= 80 ? 'bg-success' : atsResult.score >= 60 ? 'bg-warning' : 'bg-danger') : '';

  return (
    <div className="flex flex-col gap-5 h-full">
      {/* Template selector */}
      <div className="card p-4">
        <p className="text-xs font-semibold text-ink-muted uppercase tracking-widest mb-3">Choose Template</p>
        <div className="grid grid-cols-3 gap-2">
          {TEMPLATES.map((t) => (
            <button
              key={t.id}
              onClick={() => setTemplate(t.id)}
              className={`flex flex-col items-center gap-1.5 p-2.5 rounded-xl border-2 transition-all duration-200 ${
                template === t.id
                  ? 'border-primary bg-primary/5 shadow-lg shadow-primary/10'
                  : 'border-surface-border hover:border-primary/30 bg-surface'
              }`}
            >
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-xs font-bold shadow-md"
                style={{ background: t.color }}
              >
                {t.label[0]}
              </div>
              <p className={`text-xs font-semibold ${template === t.id ? 'text-primary' : 'text-ink'}`}>{t.label}</p>
              <p className="text-xs text-ink-faint hidden sm:block text-center leading-tight">{t.desc}</p>
              {template === t.id && <span className="text-xs text-primary font-bold">✓</span>}
            </button>
          ))}
        </div>
      </div>

      {/* Polish entire resume */}
      <PolishResume />

      {/* Actions */}
      <div className="flex gap-2 flex-wrap">
        <button onClick={handlePrint} className="btn-primary btn-sm flex-1 sm:flex-none shadow-lg shadow-primary/20">
          🖨️ Download PDF
        </button>
        <button onClick={handleATSScore} disabled={scoring} className="btn-ghost btn-sm flex-1 sm:flex-none">
          {scoring ? (
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 border border-ink-muted border-t-transparent rounded-full animate-spin" />
              Scoring…
            </span>
          ) : '🎯 ATS Score'}
        </button>
      </div>

      {/* ATS Result */}
      {atsResult && (
        <div className="card space-y-4 border-2 border-surface-border/50">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-ink">🎯 ATS Score</h3>
            <div className="flex items-center gap-1">
              <span className={`text-3xl font-black font-mono ${scoreColor}`}>{atsResult.score}</span>
              <span className="text-ink-faint text-sm">/100</span>
            </div>
          </div>
          <div className="h-2 bg-surface-border rounded-full overflow-hidden">
            <div className={`h-full rounded-full transition-all duration-700 ${scoreBg}`} style={{ width: `${atsResult.score}%` }} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs font-bold text-success mb-2">✅ Strengths</p>
              <ul className="space-y-1.5">
                {atsResult.strengths?.map((s, i) => (
                  <li key={i} className="text-xs text-ink-muted flex items-start gap-1.5">
                    <span className="text-success mt-0.5 shrink-0">•</span>{s}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-xs font-bold text-warning mb-2">⚠️ Improve</p>
              <ul className="space-y-1.5">
                {atsResult.improvements?.map((s, i) => (
                  <li key={i} className="text-xs text-ink-muted flex items-start gap-1.5">
                    <span className="text-warning mt-0.5 shrink-0">•</span>{s}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <button onClick={() => setAtsResult(null)} className="text-xs text-ink-faint hover:text-ink transition-colors">Dismiss ×</button>
        </div>
      )}

      {/* Resume preview */}
      <div className="flex-1 border border-surface-border rounded-2xl overflow-hidden bg-white shadow-xl min-h-64">
        <div ref={printRef} style={{ transform: 'scale(0.72)', transformOrigin: 'top left', width: '138.9%' }}>
          <TemplateComponent resume={resume} />
        </div>
      </div>

      <p className="text-xs text-ink-faint text-center">Live preview · Updates as you type</p>
    </div>
  );
}