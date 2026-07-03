export default function Modern({ resume }) {
  const { personalInfo: p, education, skills, projects, experience, certifications, contact } = resume;

  const allContact = [
    p.email && { icon: '✉', val: p.email },
    p.phone && { icon: '📞', val: p.phone },
    p.location && { icon: '📍', val: p.location },
    p.linkedin && { icon: '🔗', val: p.linkedin },
    p.github && { icon: '💻', val: p.github },
    contact?.website && { icon: '🌐', val: contact.website },
    contact?.twitter && { icon: '🐦', val: contact.twitter },
    contact?.whatsapp && { icon: '💬', val: contact.whatsapp },
    ...(contact?.custom || []).map((c) => ({ icon: '🔗', val: c.label })),
  ].filter(Boolean);

  return (
    <div className="bg-white text-gray-800 font-sans text-sm" style={{ width: '100%', minHeight: '297mm' }}>
      {/* Header */}
      <div style={{ background: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)' }} className="px-8 py-6 text-white">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <h1 className="text-3xl font-bold">{p.name || 'Your Name'}</h1>
            <p style={{ color: '#c7d2fe', fontSize: '14px', marginTop: '4px' }}>{p.title || 'Your Job Title'}</p>
            <div className="flex flex-wrap gap-3 mt-3">
              {allContact.map((c, i) => (
                <span key={i} style={{ fontSize: '10px', color: '#c7d2fe', display: 'flex', alignItems: 'center', gap: '3px' }}>
                  {c.icon} {c.val}
                </span>
              ))}
            </div>
          </div>
          {p.photo && (
            <img src={p.photo} alt="Profile" style={{ width: '72px', height: '72px', borderRadius: '10px', objectFit: 'cover', border: '3px solid rgba(255,255,255,0.3)', flexShrink: 0 }} />
          )}
        </div>
      </div>

      <div className="flex">
        {/* Left */}
        <div className="w-1/3 bg-gray-50 px-5 py-5 space-y-5" style={{ borderRight: '1px solid #e5e7eb' }}>
          {skills.technical.length > 0 && (
            <div>
              <h2 style={{ fontSize: '9px', fontWeight: 700, color: '#6366f1', textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: '8px' }}>Technical Skills</h2>
              <div className="flex flex-wrap gap-1">
                {skills.technical.map((s) => <span key={s} style={{ background: '#ede9fe', color: '#5b21b6', fontSize: '9px', padding: '3px 7px', borderRadius: '4px', fontWeight: 500 }}>{s}</span>)}
              </div>
            </div>
          )}
          {skills.soft.length > 0 && (
            <div>
              <h2 style={{ fontSize: '9px', fontWeight: 700, color: '#6366f1', textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: '8px' }}>Soft Skills</h2>
              <ul style={{ listStyle: 'none', padding: 0 }}>
                {skills.soft.map((s) => <li key={s} style={{ fontSize: '10px', color: '#475569', marginBottom: '3px' }}>• {s}</li>)}
              </ul>
            </div>
          )}
          {education.some((e) => e.institution) && (
            <div>
              <h2 style={{ fontSize: '9px', fontWeight: 700, color: '#6366f1', textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: '8px' }}>Education</h2>
              {education.filter((e) => e.institution).map((e, i) => (
                <div key={i} style={{ marginBottom: '10px' }}>
                  <p style={{ fontWeight: 700, fontSize: '10px' }}>{e.degree}</p>
                  {e.fieldOfStudy && <p style={{ fontSize: '9px', color: '#6366f1' }}>{e.fieldOfStudy}</p>}
                  <p style={{ fontSize: '9px', color: '#64748b' }}>{e.institution}</p>
                  <p style={{ fontSize: '9px', color: '#94a3b8' }}>{e.year}{e.gpa ? ` · GPA ${e.gpa}` : ''}</p>
                </div>
              ))}
            </div>
          )}
          {certifications.some((c) => c.name) && (
            <div>
              <h2 style={{ fontSize: '9px', fontWeight: 700, color: '#6366f1', textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: '8px' }}>Certifications</h2>
              {certifications.filter((c) => c.name).map((c, i) => (
                <div key={i} style={{ marginBottom: '8px' }}>
                  <p style={{ fontWeight: 600, fontSize: '10px' }}>{c.name}</p>
                  <p style={{ fontSize: '9px', color: '#64748b' }}>{c.issuer} {c.year && `· ${c.year}`}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right */}
        <div className="w-2/3 px-6 py-5 space-y-5">
          {p.summary && (
            <div>
              <h2 style={{ fontSize: '9px', fontWeight: 700, color: '#6366f1', textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: '6px' }}>Summary</h2>
              <p style={{ fontSize: '10px', color: '#475569', lineHeight: 1.6 }}>{p.summary}</p>
            </div>
          )}
          {experience.some((e) => e.company || e.role) && (
            <div>
              <h2 style={{ fontSize: '9px', fontWeight: 700, color: '#6366f1', textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: '10px' }}>Experience</h2>
              {experience.filter((e) => e.company || e.role).map((e, i) => (
                <div key={i} style={{ marginBottom: '12px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <div><p style={{ fontWeight: 700, fontSize: '11px' }}>{e.role}</p><p style={{ fontSize: '10px', color: '#6366f1' }}>{e.company}</p></div>
                    <p style={{ fontSize: '9px', color: '#94a3b8' }}>{e.duration}</p>
                  </div>
                  {e.bullets?.length > 0 ? <ul style={{ marginTop: '5px', paddingLeft: '12px' }}>{e.bullets.map((b, bi) => <li key={bi} style={{ fontSize: '10px', color: '#475569', lineHeight: 1.5 }}>{b}</li>)}</ul>
                    : e.description && <p style={{ fontSize: '10px', color: '#475569', marginTop: '5px', lineHeight: 1.5 }}>{e.description}</p>}
                </div>
              ))}
            </div>
          )}
          {projects.some((pr) => pr.name) && (
            <div>
              <h2 style={{ fontSize: '9px', fontWeight: 700, color: '#6366f1', textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: '10px' }}>Projects</h2>
              {projects.filter((pr) => pr.name).map((pr, i) => (
                <div key={i} style={{ marginBottom: '12px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <p style={{ fontWeight: 700, fontSize: '11px' }}>{pr.name}</p>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      {pr.link && <span style={{ fontSize: '9px', color: '#6366f1' }}>Live ↗</span>}
                      {pr.github && <span style={{ fontSize: '9px', color: '#6366f1' }}>GitHub ↗</span>}
                    </div>
                  </div>
                  <p style={{ fontSize: '10px', color: '#475569', marginTop: '3px', lineHeight: 1.5 }}>{pr.description}</p>
                  {pr.tech?.length > 0 && <div style={{ display: 'flex', flexWrap: 'wrap', gap: '3px', marginTop: '5px' }}>{pr.tech.map((t) => <span key={t} style={{ background: '#f1f5f9', color: '#64748b', fontSize: '9px', padding: '2px 5px', borderRadius: '3px' }}>{t}</span>)}</div>}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}