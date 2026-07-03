export default function Creative({ resume }) {
  const { personalInfo: p, education, skills, projects, experience, certifications, contact } = resume;

  const allContact = [
    p.email && { icon: '✉', val: p.email },
    p.phone && { icon: '📞', val: p.phone },
    p.location && { icon: '📍', val: p.location },
    p.linkedin && { icon: '🔗', val: p.linkedin },
    p.github && { icon: '💻', val: p.github },
    contact?.website && { icon: '🌐', val: contact.website },
    contact?.twitter && { icon: '🐦', val: contact.twitter },
    ...(contact?.custom || []).map((c) => ({ icon: '🔗', val: c.label })),
  ].filter(Boolean);

  return (
    <div className="bg-white font-sans" style={{ width: '100%', minHeight: '297mm', display: 'flex', fontSize: '11px' }}>
      {/* Dark left sidebar */}
      <div style={{ width: '210px', background: '#0f172a', padding: '28px 18px', flexShrink: 0, display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {/* Photo + name */}
        <div style={{ textAlign: 'center' }}>
          {p.photo ? (
            <img src={p.photo} alt="Profile" style={{ width: '90px', height: '90px', borderRadius: '50%', objectFit: 'cover', border: '3px solid #6366f1', margin: '0 auto 12px' }} />
          ) : (
            <div style={{ width: '90px', height: '90px', borderRadius: '50%', background: '#1e293b', border: '3px solid #6366f1', margin: '0 auto 12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '28px', fontWeight: 800, color: '#6366f1' }}>
              {p.name?.charAt(0) || 'Y'}
            </div>
          )}
          <h1 style={{ fontSize: '16px', fontWeight: 800, color: '#f1f5f9', lineHeight: 1.2 }}>{p.name || 'Your Name'}</h1>
          <p style={{ fontSize: '10px', color: '#6366f1', marginTop: '4px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>{p.title || 'Job Title'}</p>
        </div>

        {/* Contact */}
        {allContact.length > 0 && (
          <div>
            <h3 style={{ fontSize: '8px', fontWeight: 700, color: '#6366f1', textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: '8px' }}>Contact</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {allContact.map((c, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span style={{ fontSize: '10px' }}>{c.icon}</span>
                  <span style={{ fontSize: '9px', color: '#94a3b8', wordBreak: 'break-all' }}>{c.val}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Skills */}
        {skills.technical.length > 0 && (
          <div>
            <h3 style={{ fontSize: '8px', fontWeight: 700, color: '#6366f1', textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: '10px' }}>Technical Skills</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {skills.technical.map((s) => (
                <div key={s}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '3px' }}>
                    <span style={{ fontSize: '9px', color: '#cbd5e1' }}>{s}</span>
                  </div>
                  <div style={{ height: '3px', background: '#1e293b', borderRadius: '2px', overflow: 'hidden' }}>
                    <div style={{ height: '100%', width: `${75 + Math.random() * 25}%`, background: 'linear-gradient(90deg, #6366f1, #a5b4fc)', borderRadius: '2px' }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {skills.soft.length > 0 && (
          <div>
            <h3 style={{ fontSize: '8px', fontWeight: 700, color: '#6366f1', textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: '8px' }}>Soft Skills</h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
              {skills.soft.map((s) => (
                <span key={s} style={{ background: '#1e293b', border: '1px solid #334155', color: '#94a3b8', fontSize: '8px', padding: '2px 6px', borderRadius: '4px' }}>{s}</span>
              ))}
            </div>
          </div>
        )}

        {education.some((e) => e.institution) && (
          <div>
            <h3 style={{ fontSize: '8px', fontWeight: 700, color: '#6366f1', textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: '10px' }}>Education</h3>
            {education.filter((e) => e.institution).map((e, i) => (
              <div key={i} style={{ marginBottom: '10px' }}>
                <p style={{ fontWeight: 700, fontSize: '9px', color: '#f1f5f9' }}>{e.degree}</p>
                <p style={{ fontSize: '9px', color: '#6366f1' }}>{e.institution}</p>
                <p style={{ fontSize: '8px', color: '#64748b', marginTop: '2px' }}>{e.year}{e.gpa ? ` · GPA ${e.gpa}` : ''}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Right content */}
      <div style={{ flex: 1, padding: '28px 24px', background: '#ffffff' }}>
        {p.summary && (
          <div style={{ marginBottom: '20px', padding: '14px', background: '#f8fafc', borderRadius: '8px', borderLeft: '4px solid #6366f1' }}>
            <p style={{ fontSize: '10px', color: '#475569', lineHeight: 1.7 }}>{p.summary}</p>
          </div>
        )}

        {experience.some((e) => e.company || e.role) && (
          <div style={{ marginBottom: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
              <h3 style={{ fontSize: '12px', fontWeight: 800, color: '#0f172a' }}>Work Experience</h3>
              <div style={{ flex: 1, height: '1px', background: '#e2e8f0' }} />
            </div>
            {experience.filter((e) => e.company || e.role).map((e, i) => (
              <div key={i} style={{ marginBottom: '14px', paddingLeft: '12px', borderLeft: '2px solid #e2e8f0' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <div>
                    <p style={{ fontWeight: 700, fontSize: '11px', color: '#0f172a' }}>{e.role}</p>
                    <p style={{ fontSize: '10px', color: '#6366f1', fontWeight: 600 }}>{e.company}</p>
                  </div>
                  <span style={{ fontSize: '9px', color: '#94a3b8', background: '#f1f5f9', padding: '2px 8px', borderRadius: '20px', height: 'fit-content', flexShrink: 0 }}>{e.duration}</span>
                </div>
                {e.bullets?.length > 0 ? (
                  <ul style={{ marginTop: '6px', paddingLeft: '14px', display: 'flex', flexDirection: 'column', gap: '3px' }}>
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
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
              <h3 style={{ fontSize: '12px', fontWeight: 800, color: '#0f172a' }}>Projects</h3>
              <div style={{ flex: 1, height: '1px', background: '#e2e8f0' }} />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
              {projects.filter((pr) => pr.name).map((pr, i) => (
                <div key={i} style={{ padding: '10px', background: '#f8fafc', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <p style={{ fontWeight: 700, fontSize: '10px', color: '#0f172a' }}>{pr.name}</p>
                    <div style={{ display: 'flex', gap: '4px' }}>
                      {pr.link && <span style={{ fontSize: '8px', color: '#6366f1' }}>↗</span>}
                    </div>
                  </div>
                  <p style={{ fontSize: '9px', color: '#64748b', marginTop: '4px', lineHeight: 1.5 }}>{pr.description}</p>
                  {pr.tech?.length > 0 && (
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '3px', marginTop: '6px' }}>
                      {pr.tech.map((t) => <span key={t} style={{ background: '#ede9fe', color: '#5b21b6', fontSize: '8px', padding: '1px 5px', borderRadius: '3px' }}>{t}</span>)}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {certifications.some((c) => c.name) && (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
              <h3 style={{ fontSize: '12px', fontWeight: 800, color: '#0f172a' }}>Certifications</h3>
              <div style={{ flex: 1, height: '1px', background: '#e2e8f0' }} />
            </div>
            {certifications.filter((c) => c.name).map((c, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                <p style={{ fontSize: '10px', fontWeight: 600, color: '#1e293b' }}>{c.name} <span style={{ color: '#64748b', fontWeight: 400 }}>— {c.issuer}</span></p>
                <p style={{ fontSize: '9px', color: '#94a3b8' }}>{c.year}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}