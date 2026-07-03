import { useState, useRef } from 'react';
import { toast } from 'react-toastify';
import { useResume } from '../../context/ResumeContext';
import api from '../../services/api';

export default function PersonalInfo() {
  const { resume, updatePersonalInfo } = useResume();
  const { personalInfo: info } = resume;
  const [enhancing, setEnhancing] = useState(false);
  const fileRef = useRef();

  const set = (field, value) => updatePersonalInfo({ [field]: value });

  const handlePhoto = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (file.size > 2 * 1024 * 1024) return toast.error('Photo must be under 2MB');
    const reader = new FileReader();
    reader.onload = () => updatePersonalInfo({ photo: reader.result });
    reader.readAsDataURL(file);
  };

  const handleEnhanceSummary = async () => {
    if (!info.summary) return toast.error('Write a summary first');
    setEnhancing(true);
    try {
      const res = await api.post('/ai/enhance-summary', {
        summary: info.summary,
        jobTitle: info.title,
        skills: resume.skills.technical,
      });
      updatePersonalInfo({ summary: res.data.enhanced });
      toast.success('Summary enhanced by AI ✨');
    } catch {
      toast.error('AI enhancement failed');
    } finally {
      setEnhancing(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Photo upload */}
      <div className="card space-y-4">
        <div className="flex items-center gap-2 mb-1">
          <div className="w-1 h-5 bg-surface-border rounded-full" />
          <p className="text-xs font-bold text-ink-faint uppercase tracking-widest">Profile Photo <span className="normal-case font-normal text-ink-faint">(optional)</span></p>
        </div>
        <div className="flex items-center gap-5">
          <div
            onClick={() => fileRef.current.click()}
            className="w-20 h-20 rounded-2xl border-2 border-dashed border-surface-border hover:border-primary/50 transition-all cursor-pointer overflow-hidden flex items-center justify-center bg-surface shrink-0 group"
          >
            {info.photo ? (
              <img src={info.photo} alt="Profile" className="w-full h-full object-cover" />
            ) : (
              <div className="text-center">
                <div className="text-2xl group-hover:scale-110 transition-transform">📷</div>
                <p className="text-xs text-ink-faint mt-1">Upload</p>
              </div>
            )}
          </div>
          <div className="space-y-2">
            <button onClick={() => fileRef.current.click()} className="btn-ghost btn-sm">
              {info.photo ? '🔄 Change Photo' : '📷 Upload Photo'}
            </button>
            {info.photo && (
              <button onClick={() => updatePersonalInfo({ photo: '' })} className="btn-danger btn-sm block">
                🗑️ Remove
              </button>
            )}
            <p className="text-xs text-ink-faint">JPG, PNG · Max 2MB</p>
          </div>
          <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handlePhoto} />
        </div>
      </div>

      {/* Required fields */}
      <div className="card space-y-4">
        <div className="flex items-center gap-2 mb-1">
          <div className="w-1 h-5 bg-primary rounded-full" />
          <p className="text-xs font-bold text-ink-muted uppercase tracking-widest">Required</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="label">Full Name</label>
            <input className="input" placeholder="Daanish Saeed" value={info.name} onChange={(e) => set('name', e.target.value)} />
          </div>
          <div>
            <label className="label">Job Title</label>
            <input className="input" placeholder="Frontend Developer" value={info.title} onChange={(e) => set('title', e.target.value)} />
          </div>
          <div className="sm:col-span-2">
            <label className="label">Email</label>
            <input className="input" type="email" placeholder="daanish@example.com" value={info.email} onChange={(e) => set('email', e.target.value)} />
          </div>
        </div>
      </div>

      {/* Optional fields */}
      <div className="card space-y-4">
        <div className="flex items-center gap-2 mb-1">
          <div className="w-1 h-5 bg-surface-border rounded-full" />
          <p className="text-xs font-bold text-ink-faint uppercase tracking-widest">Optional</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="label">Phone</label>
            <input className="input" placeholder="+92 300 1234567" value={info.phone} onChange={(e) => set('phone', e.target.value)} />
          </div>
          <div>
            <label className="label">Location</label>
            <input className="input" placeholder="Islamabad, Pakistan" value={info.location} onChange={(e) => set('location', e.target.value)} />
          </div>
          <div>
            <label className="label">LinkedIn</label>
            <input className="input" placeholder="linkedin.com/in/daanish" value={info.linkedin} onChange={(e) => set('linkedin', e.target.value)} />
          </div>
          <div>
            <label className="label">GitHub</label>
            <input className="input" placeholder="github.com/DanishCoderX" value={info.github} onChange={(e) => set('github', e.target.value)} />
          </div>
        </div>
      </div>

      {/* Summary */}
      <div className="card space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <label className="label mb-0">Professional Summary <span className="optional-tag">(optional)</span></label>
            <p className="text-xs text-ink-faint mt-0.5">Write a rough draft — AI will polish it</p>
          </div>
          <button onClick={handleEnhanceSummary} disabled={enhancing} className="ai-btn shrink-0">
            {enhancing ? (
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 border border-success border-t-transparent rounded-full animate-spin" />
                Enhancing…
              </span>
            ) : '✨ AI Enhance'}
          </button>
        </div>
        <textarea
          className="textarea"
          rows={4}
          placeholder="Write a brief summary about yourself — your skills, experience, and what you're looking for. AI will rewrite it professionally."
          value={info.summary}
          onChange={(e) => set('summary', e.target.value)}
        />
      </div>
    </div>
  );
}