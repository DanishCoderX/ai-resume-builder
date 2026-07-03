import { useState } from 'react';
import { useResume } from '../../context/ResumeContext';

export default function Contact() {
  const { resume, updateContact } = useResume();
  const { contact } = resume;
  const [customLabel, setCustomLabel] = useState('');
  const [customUrl, setCustomUrl] = useState('');

  const set = (field, value) => updateContact({ [field]: value });

  const addCustom = () => {
    if (!customLabel.trim() || !customUrl.trim()) return;
    updateContact({ custom: [...(contact.custom || []), { label: customLabel.trim(), url: customUrl.trim() }] });
    setCustomLabel('');
    setCustomUrl('');
  };

  const removeCustom = (i) =>
    updateContact({ custom: contact.custom.filter((_, idx) => idx !== i) });

  const fields = [
    { key: 'website', label: 'Portfolio / Website', icon: '🌐', placeholder: 'https://daanishcoderx.github.io' },
    { key: 'twitter', label: 'Twitter / X', icon: '🐦', placeholder: 'twitter.com/yourhandle' },
    { key: 'whatsapp', label: 'WhatsApp', icon: '💬', placeholder: '+92 300 1234567' },
    { key: 'skype', label: 'Skype', icon: '📞', placeholder: 'live:yourskypeid' },
  ];

  return (
    <div className="space-y-5">
      <div className="flex items-start gap-3 p-3 bg-primary/5 border border-primary/20 rounded-xl">
        <span className="text-lg shrink-0">💡</span>
        <p className="text-xs text-ink-muted leading-relaxed">
          <span className="font-semibold text-ink">All fields optional.</span> Only filled fields will appear on your resume. Add your portfolio link at minimum — it makes a big difference.
        </p>
      </div>

      {/* Standard contact fields */}
      <div className="card space-y-4">
        <p className="text-xs font-bold text-ink-muted uppercase tracking-widest">Online Presence</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {fields.map((f) => (
            <div key={f.key}>
              <label className="label">{f.icon} {f.label}</label>
              <input
                className="input"
                placeholder={f.placeholder}
                value={contact[f.key] || ''}
                onChange={(e) => set(f.key, e.target.value)}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Custom links */}
      <div className="card space-y-4">
        <p className="text-xs font-bold text-ink-muted uppercase tracking-widest">Custom Links <span className="optional-tag">(optional)</span></p>
        <p className="text-xs text-ink-faint">Add any other links — Behance, Dribbble, YouTube, etc.</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="label">Label</label>
            <input className="input" placeholder="Behance" value={customLabel} onChange={(e) => setCustomLabel(e.target.value)} />
          </div>
          <div>
            <label className="label">URL</label>
            <input
              className="input"
              placeholder="https://behance.net/yourprofile"
              value={customUrl}
              onChange={(e) => setCustomUrl(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addCustom())}
            />
          </div>
        </div>
        <button onClick={addCustom} className="btn-ghost btn-sm">+ Add Link</button>

        {contact.custom?.length > 0 && (
          <div className="space-y-2">
            {contact.custom.map((c, i) => (
              <div key={i} className="flex items-center justify-between p-2.5 bg-surface rounded-xl border border-surface-border">
                <div>
                  <span className="text-xs font-semibold text-ink">{c.label}</span>
                  <span className="text-xs text-ink-muted ml-2">{c.url}</span>
                </div>
                <button onClick={() => removeCustom(i)} className="text-ink-faint hover:text-danger transition-colors text-lg leading-none ml-2">×</button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}