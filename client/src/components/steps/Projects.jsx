import { useState } from 'react';
import { useResume } from '../../context/ResumeContext';

const EMPTY = { name: '', description: '', tech: [], link: '', github: '' };

export default function Projects() {
  const { resume, updateProjects } = useResume();
  const items = resume.projects;
  const [techInputs, setTechInputs] = useState({});

  const update = (i, field, value) =>
    updateProjects(items.map((item, idx) => idx === i ? { ...item, [field]: value } : item));

  const addTech = (i) => {
    const val = (techInputs[i] || '').trim();
    if (!val) return;
    updateProjects(items.map((item, idx) =>
      idx === i ? { ...item, tech: [...(item.tech || []), val] } : item
    ));
    setTechInputs({ ...techInputs, [i]: '' });
  };

  const removeTech = (i, t) =>
    updateProjects(items.map((item, idx) =>
      idx === i ? { ...item, tech: item.tech.filter((x) => x !== t) } : item
    ));

  const add = () => updateProjects([...items, { ...EMPTY, tech: [] }]);
  const remove = (i) => updateProjects(items.filter((_, idx) => idx !== i));

  return (
    <div className="space-y-5">
      <div className="flex items-start gap-3 p-3 bg-primary/5 border border-primary/20 rounded-xl">
        <span className="text-lg shrink-0">💡</span>
        <p className="text-xs text-ink-muted leading-relaxed">
          <span className="font-semibold text-ink">Projects are optional.</span> If you have no projects yet, skip this step. Your education and skills will still make a strong resume.
        </p>
      </div>

      {items.map((item, i) => (
        <div key={i} className="card space-y-4 relative group">
          {items.length > 1 && (
            <button
              onClick={() => remove(i)}
              className="absolute top-4 right-4 w-6 h-6 rounded-lg bg-danger/10 text-danger hover:bg-danger/20 transition-all flex items-center justify-center text-sm opacity-0 group-hover:opacity-100"
            >×</button>
          )}
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-primary/10 rounded-lg flex items-center justify-center text-primary text-xs font-bold">{i + 1}</div>
            <p className="text-xs font-bold text-ink-muted uppercase tracking-widest">Project #{i + 1}</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <label className="label">Project Name <span className="optional-tag">(optional)</span></label>
              <input className="input" placeholder="Freelancer Project Tracker" value={item.name} onChange={(e) => update(i, 'name', e.target.value)} />
            </div>
            <div className="sm:col-span-2">
              <label className="label">Description <span className="optional-tag">(optional)</span></label>
              <textarea className="textarea" rows={3} placeholder="A full-stack MERN app for tracking freelance projects..." value={item.description} onChange={(e) => update(i, 'description', e.target.value)} />
            </div>
            <div>
              <label className="label">Live Link <span className="optional-tag">(optional)</span></label>
              <input className="input" placeholder="https://myproject.netlify.app" value={item.link} onChange={(e) => update(i, 'link', e.target.value)} />
            </div>
            <div>
              <label className="label">GitHub <span className="optional-tag">(optional)</span></label>
              <input className="input" placeholder="github.com/DanishCoderX/project" value={item.github} onChange={(e) => update(i, 'github', e.target.value)} />
            </div>
            <div className="sm:col-span-2">
              <label className="label">Tech Stack <span className="optional-tag">(optional)</span></label>
              <div className="flex gap-2 mb-2">
                <input
                  className="input"
                  placeholder="React, Node.js..."
                  value={techInputs[i] || ''}
                  onChange={(e) => setTechInputs({ ...techInputs, [i]: e.target.value })}
                  onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addTech(i))}
                />
                <button onClick={() => addTech(i)} className="btn-primary btn-sm shrink-0">Add</button>
              </div>
              <div className="flex flex-wrap gap-2">
                {(item.tech || []).map((t) => (
                  <span key={t} className="skill-tag-muted">
                    {t} <button onClick={() => removeTech(i, t)} className="hover:text-danger ml-0.5">×</button>
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      ))}

      <button onClick={add} className="btn-ghost w-full justify-center gap-2 border-dashed">
        + Add Another Project
      </button>
    </div>
  );
}