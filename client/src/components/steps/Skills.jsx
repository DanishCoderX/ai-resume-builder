import { useState } from 'react';
import { toast } from 'react-toastify';
import { useResume } from '../../context/ResumeContext';
import api from '../../services/api';

export default function Skills() {
  const { resume, updateSkills } = useResume();
  const { skills } = resume;
  const [techInput, setTechInput] = useState('');
  const [softInput, setSoftInput] = useState('');
  const [suggesting, setSuggesting] = useState(false);

  const addTech = () => {
    const val = techInput.trim();
    if (!val) return;
    if (skills.technical.includes(val)) return toast.error('Already added');
    updateSkills({ ...skills, technical: [...skills.technical, val] });
    setTechInput('');
  };

  const addSoft = () => {
    const val = softInput.trim();
    if (!val) return;
    if (skills.soft.includes(val)) return toast.error('Already added');
    updateSkills({ ...skills, soft: [...skills.soft, val] });
    setSoftInput('');
  };

  const removeTech = (s) => updateSkills({ ...skills, technical: skills.technical.filter((x) => x !== s) });
  const removeSoft = (s) => updateSkills({ ...skills, soft: skills.soft.filter((x) => x !== s) });
  const onKey = (e, fn) => e.key === 'Enter' && (e.preventDefault(), fn());

  const handleSuggest = async () => {
    if (!resume.personalInfo.title) return toast.error('Add your job title in Step 1 first');
    setSuggesting(true);
    try {
      const res = await api.post('/ai/suggest-skills', {
        jobTitle: resume.personalInfo.title,
        currentSkills: skills.technical,
      });
      const newSkills = res.data.skills.filter((s) => !skills.technical.includes(s));
      updateSkills({ ...skills, technical: [...skills.technical, ...newSkills] });
      toast.success(`Added ${newSkills.length} AI-suggested skills ✨`);
    } catch {
      toast.error('AI suggestion failed');
    } finally {
      setSuggesting(false);
    }
  };

  return (
    <div className="space-y-5">
      {/* Technical skills */}
      <div className="card space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-bold text-ink">Technical Skills</p>
            <p className="text-xs text-ink-muted">Add at least 3 — press Enter to add each</p>
          </div>
          <button onClick={handleSuggest} disabled={suggesting} className="ai-btn">
            {suggesting ? (
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 border border-success border-t-transparent rounded-full animate-spin" />
                Suggesting…
              </span>
            ) : '✨ AI Suggest'}
          </button>
        </div>

        <div className="flex gap-2">
          <input
            className="input"
            placeholder="e.g. React, Node.js, MongoDB"
            value={techInput}
            onChange={(e) => setTechInput(e.target.value)}
            onKeyDown={(e) => onKey(e, addTech)}
          />
          <button onClick={addTech} className="btn-primary btn-sm shrink-0">Add</button>
        </div>

        <div className="flex flex-wrap gap-2 min-h-8">
          {skills.technical.length === 0 ? (
            <p className="text-xs text-ink-faint italic">No skills added yet</p>
          ) : skills.technical.map((s) => (
            <span key={s} className="skill-tag">
              {s}
              <button onClick={() => removeTech(s)} className="hover:text-danger transition-colors ml-0.5 text-sm leading-none">×</button>
            </span>
          ))}
        </div>
      </div>

      {/* Soft skills */}
      <div className="card space-y-4">
        <div>
          <p className="text-sm font-bold text-ink">Soft Skills <span className="optional-tag">(optional)</span></p>
          <p className="text-xs text-ink-muted">Communication, leadership, teamwork, etc.</p>
        </div>

        <div className="flex gap-2">
          <input
            className="input"
            placeholder="e.g. Communication, Leadership"
            value={softInput}
            onChange={(e) => setSoftInput(e.target.value)}
            onKeyDown={(e) => onKey(e, addSoft)}
          />
          <button onClick={addSoft} className="btn-ghost btn-sm shrink-0">Add</button>
        </div>

        <div className="flex flex-wrap gap-2 min-h-8">
          {skills.soft.length === 0 ? (
            <p className="text-xs text-ink-faint italic">No soft skills added</p>
          ) : skills.soft.map((s) => (
            <span key={s} className="skill-tag-muted">
              {s}
              <button onClick={() => removeSoft(s)} className="hover:text-danger transition-colors ml-0.5 text-sm leading-none">×</button>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}