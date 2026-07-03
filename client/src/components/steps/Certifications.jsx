import { useResume } from '../../context/ResumeContext';

const EMPTY = { name: '', issuer: '', year: '' };

export default function Certifications() {
  const { resume, updateCertifications } = useResume();
  const items = resume.certifications;

  const update = (i, field, value) => {
    const updated = items.map((item, idx) => idx === i ? { ...item, [field]: value } : item);
    updateCertifications(updated);
  };

  const add = () => updateCertifications([...items, { ...EMPTY }]);
  const remove = (i) => updateCertifications(items.filter((_, idx) => idx !== i));

  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-lg font-semibold text-ink">Certifications</h2>
        <p className="text-sm text-ink-muted mt-1">All optional — skip this step if you have none.</p>
      </div>

      {items.map((item, i) => (
        <div key={i} className="card space-y-4 relative">
          {items.length > 1 && (
            <button onClick={() => remove(i)} className="absolute top-3 right-3 text-ink-faint hover:text-danger text-lg">×</button>
          )}
          <p className="text-xs font-semibold text-primary uppercase tracking-wide">Certification #{i + 1}</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <label className="label">Certification Name <span className="optional-tag">(optional)</span></label>
              <input className="input" placeholder="AWS Certified Developer" value={item.name} onChange={(e) => update(i, 'name', e.target.value)} />
            </div>
            <div>
              <label className="label">Issuer <span className="optional-tag">(optional)</span></label>
              <input className="input" placeholder="Amazon Web Services" value={item.issuer} onChange={(e) => update(i, 'issuer', e.target.value)} />
            </div>
            <div>
              <label className="label">Year <span className="optional-tag">(optional)</span></label>
              <input className="input" placeholder="2025" value={item.year} onChange={(e) => update(i, 'year', e.target.value)} />
            </div>
          </div>
        </div>
      ))}

      <button onClick={add} className="btn-ghost w-full justify-center">+ Add Another Certification</button>
    </div>
  );
}