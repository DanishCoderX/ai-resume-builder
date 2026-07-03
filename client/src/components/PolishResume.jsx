import { useState } from 'react';
import { useResume } from '../context/ResumeContext';
import api from '../services/api';

const STEPS = [
  { key: 'summary', label: 'Enhancing summary' },
  { key: 'bullets', label: 'Improving experience bullets' },
  { key: 'skills', label: 'Suggesting missing skills' },
  { key: 'ats', label: 'Scoring resume' },
];

export default function PolishResume() {
  const { resume, updatePersonalInfo, updateExperience, updateSkills } = useResume();
  const [open, setOpen] = useState(false);
  const [running, setRunning] = useState(false);
  const [progress, setProgress] = useState({});
  const [atsResult, setAtsResult] = useState(null);
  const [done, setDone] = useState(false);

  const reset = () => {
    setProgress({});
    setAtsResult(null);
    setDone(false);
  };

  const handlePolish = async () => {
    setRunning(true);
    setDone(false);
    setAtsResult(null);
    setProgress({});

    // Step 1 — Enhance summary
    setProgress((p) => ({ ...p, summary: 'running' }));
    try {
      if (resume.personalInfo.summary) {
        const res = await api.post('/ai/enhance-summary', {
          summary: resume.personalInfo.summary,
          jobTitle: resume.personalInfo.title,
          skills: resume.skills.technical,
        });
        updatePersonalInfo({ summary: res.data.enhanced });
        setProgress((p) => ({ ...p, summary: 'done' }));
      } else {
        setProgress((p) => ({ ...p, summary: 'skipped' }));
      }
    } catch {
      setProgress((p) => ({ ...p, summary: 'error' }));
    }

    // Step 2 — Improve experience bullets
    setProgress((p) => ({ ...p, bullets: 'running' }));
    try {
      const hasExp = resume.experience.some((e) => e.description);
      if (hasExp) {
        const improved = await Promise.all(
          resume.experience.map(async (exp) => {
            if (!exp.description) return exp;
            const res = await api.post('/ai/improve-bullets', {
              description: exp.description,
              role: exp.role,
              company: exp.company,
            });
            return { ...exp, bullets: res.data.bullets };
          })
        );
        updateExperience(improved);
        setProgress((p) => ({ ...p, bullets: 'done' }));
      } else {
        setProgress((p) => ({ ...p, bullets: 'skipped' }));
      }
    } catch {
      setProgress((p) => ({ ...p, bullets: 'error' }));
    }

    // Step 3 — Suggest skills
    setProgress((p) => ({ ...p, skills: 'running' }));
    try {
      if (resume.personalInfo.title) {
        const res = await api.post('/ai/suggest-skills', {
          jobTitle: resume.personalInfo.title,
          currentSkills: resume.skills.technical,
        });
        const newSkills = res.data.skills.filter((s) => !resume.skills.technical.includes(s));
        if (newSkills.length > 0) {
          updateSkills({ ...resume.skills, technical: [...resume.skills.technical, ...newSkills] });
        }
        setProgress((p) => ({ ...p, skills: 'done' }));
      } else {
        setProgress((p) => ({ ...p, skills: 'skipped' }));
      }
    } catch {
      setProgress((p) => ({ ...p, skills: 'error' }));
    }

    // Step 4 — ATS score
    setProgress((p) => ({ ...p, ats: 'running' }));
    try {
      const res = await api.post('/ai/ats-score', { resumeData: resume });
      setAtsResult(res.data);
      setProgress((p) => ({ ...p, ats: 'done' }));
    } catch {
      setProgress((p) => ({ ...p, ats: 'error' }));
    }

    setRunning(false);
    setDone(true);
  };

  const statusIcon = (key) => {
    const s = progress[key];
    if (!s) return <span className="w-5 h-5 rounded-full border border-surface-border inline-block" />;
    if (s === 'running') return <span className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin inline-block" />;
    if (s === 'done') return <span className="text-success text-lg">✓</span>;
    if (s === 'skipped') return <span className="text-ink-faint text-lg">–</span>;
    if (s === 'error') return <span className="text-danger text-lg">✗</span>;
  };

  const scoreColor = atsResult
    ? atsResult.score >= 80 ? 'text-success' : atsResult.score >= 60 ? 'text-warning' : 'text-danger'
    : '';
  const scoreBg = atsResult
    ? atsResult.score >= 80 ? 'bg-success' : atsResult.score >= 60 ? 'bg-warning' : 'bg-danger'
    : '';

  return (
    <>
      {/* Trigger button */}
      <button
        onClick={() => { setOpen(true); reset(); }}
        className="btn-primary w-full justify-center gap-2 shadow-lg shadow-primary/20"
      >
        ✨ Polish Entire Resume with AI
      </button>

      {/* Modal */}
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => !running && setOpen(false)} />
          <div className="relative bg-surface-card border border-surface-border rounded-2xl w-full max-w-md shadow-2xl overflow-hidden">
            {/* Header */}
            <div className="px-6 py-5 border-b border-surface-border">
              <h2 className="text-lg font-bold text-ink flex items-center gap-2">
                ✨ Polish Entire Resume
              </h2>
              <p className="text-xs text-ink-muted mt-1">
                AI will enhance your summary, improve experience bullets, suggest missing skills, and score your resume.
              </p>
            </div>

            {/* Progress steps */}
            <div className="px-6 py-5 space-y-4">
              {STEPS.map((step) => (
                <div key={step.key} className="flex items-center gap-3">
                  <div className="w-6 flex items-center justify-center shrink-0">
                    {statusIcon(step.key)}
                  </div>
                  <p className={`text-sm transition-colors ${
                    progress[step.key] === 'running' ? 'text-primary font-medium' :
                    progress[step.key] === 'done' ? 'text-success' :
                    progress[step.key] === 'error' ? 'text-danger' :
                    progress[step.key] === 'skipped' ? 'text-ink-faint' :
                    'text-ink-muted'
                  }`}>
                    {step.label}
                    {progress[step.key] === 'running' && '…'}
                    {progress[step.key] === 'skipped' && ' (skipped — no content)'}
                    {progress[step.key] === 'error' && ' (failed)'}
                  </p>
                </div>
              ))}
            </div>

            {/* ATS Result */}
            {atsResult && (
              <div className="px-6 pb-4 space-y-3">
                <div className="card p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-bold text-ink">🎯 ATS Score</p>
                    <span className={`text-2xl font-black font-mono ${scoreColor}`}>{atsResult.score}/100</span>
                  </div>
                  <div className="h-2 bg-surface-border rounded-full overflow-hidden">
                    <div className={`h-full rounded-full transition-all duration-700 ${scoreBg}`} style={{ width: `${atsResult.score}%` }} />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <p className="text-xs font-bold text-success mb-1.5">✅ Strengths</p>
                      <ul className="space-y-1">
                        {atsResult.strengths?.map((s, i) => (
                          <li key={i} className="text-xs text-ink-muted flex items-start gap-1">
                            <span className="text-success shrink-0">•</span>{s}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <p className="text-xs font-bold text-warning mb-1.5">⚠️ Improve</p>
                      <ul className="space-y-1">
                        {atsResult.improvements?.map((s, i) => (
                          <li key={i} className="text-xs text-ink-muted flex items-start gap-1">
                            <span className="text-warning shrink-0">•</span>{s}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Done message */}
            {done && (
              <div className="px-6 pb-2">
                <div className="flex items-center gap-2 p-3 bg-success/10 border border-success/20 rounded-xl">
                  <span className="text-lg">🎉</span>
                  <p className="text-xs font-semibold text-success">Resume polished! Check the preview to see all improvements.</p>
                </div>
              </div>
            )}

            {/* Footer */}
            <div className="px-6 py-4 border-t border-surface-border flex justify-between items-center">
              <button
                onClick={() => setOpen(false)}
                disabled={running}
                className="btn-ghost btn-sm disabled:opacity-30"
              >
                {done ? 'Close' : 'Cancel'}
              </button>
              {!done ? (
                <button
                  onClick={handlePolish}
                  disabled={running}
                  className="btn-primary btn-sm gap-2"
                >
                  {running ? (
                    <span className="flex items-center gap-2">
                      <span className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Polishing…
                    </span>
                  ) : '✨ Start Polishing'}
                </button>
              ) : (
                <button onClick={() => { reset(); }} className="btn-ghost btn-sm">
                  🔄 Run Again
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}