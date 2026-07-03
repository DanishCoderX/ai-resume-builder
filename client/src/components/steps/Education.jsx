import { useResume } from '../../context/ResumeContext';

const EMPTY = { institution: '', degree: '', fieldOfStudy: '', year: '', gpa: '' };

export default function Education() {
  const { resume, updateEducation } = useResume();
  const items = resume.education;

  const update = (i, field, value) => {
    const updated = items.map((item, idx) => idx === i ? { ...item, [field]: value } : item);
    updateEducation(updated);
  };

  const add = () => updateEducation([...items, { ...EMPTY }]);
  const remove = (i) => updateEducation(items.filter((_, idx) => idx !== i));

  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-lg font-semibold text-ink">Education</h2>
        <p className="text-sm text-ink-muted mt-1">Add your educational background, starting with the most recent.</p>
      </div>

      {items.map((item, i) => (
        <div key={i} className="card space-y-4 relative">
          {items.length > 1 && (
            <button
              onClick={() => remove(i)}
              className="absolute top-3 right-3 text-ink-faint hover:text-danger text-lg transition-colors"
            >×</button>
          )}
          <p className="text-xs font-semibold text-primary uppercase tracking-wide">Education #{i + 1}</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <label className="label">Institution *</label>
              <input className="input" placeholder="COMSATS University Islamabad" value={item.institution} onChange={(e) => update(i, 'institution', e.target.value)} />
            </div>
            <div>
              <label className="label">Degree *</label>
              <input className="input" placeholder="BS Computer Science" value={item.degree} onChange={(e) => update(i, 'degree', e.target.value)} />
            </div>
            <div>
              <label className="label">Field of Study <span className="optional-tag">(optional)</span></label>
              <input className="input" placeholder="Software Engineering" value={item.fieldOfStudy} onChange={(e) => update(i, 'fieldOfStudy', e.target.value)} />
            </div>
            <div>
              <label className="label">Year / Expected *</label>
              <input className="input" placeholder="2026" value={item.year} onChange={(e) => update(i, 'year', e.target.value)} />
            </div>
            <div>
              <label className="label">GPA <span className="optional-tag">(optional)</span></label>
              <input className="input" placeholder="3.5 / 4.0" value={item.gpa} onChange={(e) => update(i, 'gpa', e.target.value)} />
            </div>
          </div>
        </div>
      ))}

      <button onClick={add} className="btn-ghost w-full justify-center">+ Add Another Education</button>
    </div>
  );
}