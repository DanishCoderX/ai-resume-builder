export default function Executive({ resume }) {
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
    ...(contact?.custom || []).map((c) => ({ icon: '🔗', val: c.label + ': ' + c.url })),
  ].filter(Boolean);

  return (
    <div className="bg-white text-gray-800 font-sans" style={{ width: '100%', minHeight: '297mm', fontSize: '11px' }}>
      {/* Header */}
      <div style={{ background: 'linear-gradient(135deg, #1e293b 0%, #334155 100%)' }} className="px-8 py-7 text-white">
        <div className="flex items-start justify-between gap-6">
          <div className="flex-1">
            <h1 style={{ fontSize: '28px', fontWeight: 800, letterSpacing: '-0.5px' }} className="text-white">{p.name || 'Your Name'}</h1>
            <p style={{ fontSize: '14px', color: '#94a3b8', marginTop: '4px', fontWeight: 500 }}>{p.title || 'Your Job Title'}</p>
            {p.summary && <p style={{ fontSize: '11px', color: '#cbd5e1', marginTop: '12px', lineHeight: 1.6, maxWidth: '500px' }}>{p.summary}</p>}
          </div>
          {p.photo && (
            <img src={p.photo} alt="Profile" style={{ width: '80px', height: '80px', borderRadius: '12px', objectFit: 'cover', border: '3px solid #6366f1', flexShrink: 0 }} />
          )}
        </div>

        {/* Contact bar */}
        {allContact.length > 0 && (
          <div style={{ marginTop: '16px', paddingTop: '14px', borderTop: '1px solid #475569', display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
            {allContact.map((c, i) => (
              <span key={i} style={{ fontSize: '10px', color: '#94a3b8', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <span>{c.icon}</span>{c.val}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Body */}
      <div style={{ display: 'flex', padding: '0' }}>
        {/* Left sidebar */}
        <div style={{ width: '200px', background: '#f8fafc', padding: '24px 16px', borderRight: '1px solid #e2e8f0', flexShrink: 0 }}>
          {skills.technical.length > 0 && (
            <div style={{ marginBottom: '20px' }}>
              <h3 style={{ fontSize: '9px', fontWeight: 700, color: '#6366f1', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '10px', paddingBottom: '6px', borderBottom: '2px solid #6366f1' }}>Technical Skills</h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                {skills.technical.map((s) => (
                  <span key={s} style={{ background: '#ede9fe', color: '#5b21b6', fontSize: '9px', padding: '3px 7px', borderRadius: '4px', fontWeight: 500 }}>{s}</span>
                ))}
              </div>
            </div>
          )}

          {skills.soft.length > 0 && (
            <div style={{ marginBottom: '20px' }}>
              <h3 style={{ fontSize: '9px', fontWeight: 700, color: '#6366f1', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '10px', paddingBottom: '6px', borderBottom: '2px solid #6366f1' }}>Soft Skills</h3>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '4px' }}>
                {skills.soft.map((s) => <li key={s} style={{ fontSize: '10px', color: '#475569' }}>• {s}</li>)}
              </ul>
            </div>
          )}

          {education.some((e) => e.institution) && (
            <div style={{ marginBottom: '20px' }}>
              <h3 style={{ fontSize: '9px', fontWeight: 700, color: '#6366f1', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '10px', paddingBottom: '6px', borderBottom: '2px solid #6366f1' }}>Education</h3>
              {education.filter((e) => e.institution).map((e, i) => (
                <div key={i} style={{ marginBottom: '12px' }}>
                  <p style={{ fontWeight: 700, fontSize: '10px', color: '#1e293b' }}>{e.degree}</p>
                  {e.fieldOfStudy && <p style={{ fontSize: '9px', color: '#6366f1' }}>{e.fieldOfStudy}</p>}
                  <p style={{ fontSize: '9px', color: '#64748b' }}>{e.institution}</p>
                  <p style={{ fontSize: '9px', color: '#94a3b8' }}>{e.year}{e.gpa ? ` · GPA ${e.gpa}` : ''}</p>
                </div>
              ))}
            </div>
          )}

          {certifications.some((c) => c.name) && (
            <div>
              <h3 style={{ fontSize: '9px', fontWeight: 700, color: '#6366f1', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '10px', paddingBottom: '6px', borderBottom: '2px solid #6366f1' }}>Certifications</h3>
              {certifications.filter((c) => c.name).map((c, i) => (
                <div key={i} style={{ marginBottom: '8px' }}>
                  <p style={{ fontWeight: 600, fontSize: '10px', color: '#1e293b' }}>{c.name}</p>
                  <p style={{ fontSize: '9px', color: '#64748b' }}>{c.issuer} {c.year && `· ${c.year}`}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right content */}
        <div style={{ flex: 1, padding: '24px 24px' }}>
          {experience.some((e) => e.company || e.role) && (
            <div style={{ marginBottom: '20px' }}>
              <h3 style={{ fontSize: '9px', fontWeight: 700, color: '#6366f1', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '12px', paddingBottom: '6px', borderBottom: '2px solid #6366f1' }}>Work Experience</h3>
              {experience.filter((e) => e.company || e.role).map((e, i) => (
                <div key={i} style={{ marginBottom: '14px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div>
                      <p style={{ fontWeight: 700, fontSize: '11px', color: '#1e293b' }}>{e.role}</p>
                      <p style={{ fontSize: '10px', color: '#6366f1', fontWeight: 600 }}>{e.company}</p>
                    </div>
                    <p style={{ fontSize: '9px', color: '#94a3b8', flexShrink: 0 }}>{e.duration}</p>
                  </div>
                  {e.bullets?.length > 0 ? (
                    <ul style={{ marginTop: '6px', paddingLeft: '12px', display: 'flex', flexDirection: 'column', gap: '3px' }}>
                      {e.bullets.map((b, bi) => <li key={bi} style={{ fontSize: '10px', color: '#475569', lineHeight: 1.5 }}>{b}</li>)}
                    </ul>
                  ) : e.description && (
                    <p style={{ fontSize: '10px', color: '#475569', marginTop: '6px', lineHeight: 1.5 }}>{e.description}</p>
                  )}
                </div>
              ))}
            </div>
          )}

          {projects.some((pr) => pr.name) && (
            <div style={{ marginBottom: '20px' }}>
              <h3 style={{ fontSize: '9px', fontWeight: 700, color: '#6366f1', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '12px', paddingBottom: '6px', borderBottom: '2px solid #6366f1' }}>Projects</h3>
              {projects.filter((pr) => pr.name).map((pr, i) => (
                <div key={i} style={{ marginBottom: '12px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <p style={{ fontWeight: 700, fontSize: '11px', color: '#1e293b' }}>{pr.name}</p>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      {pr.link && <span style={{ fontSize: '9px', color: '#6366f1' }}>Live ↗</span>}
                      {pr.github && <span style={{ fontSize: '9px', color: '#6366f1' }}>GitHub ↗</span>}
                    </div>
                  </div>
                  <p style={{ fontSize: '10px', color: '#475569', marginTop: '4px', lineHeight: 1.5 }}>{pr.description}</p>
                  {pr.tech?.length > 0 && (
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', marginTop: '6px' }}>
                      {pr.tech.map((t) => <span key={t} style={{ background: '#f1f5f9', color: '#64748b', fontSize: '9px', padding: '2px 6px', borderRadius: '4px' }}>{t}</span>)}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}