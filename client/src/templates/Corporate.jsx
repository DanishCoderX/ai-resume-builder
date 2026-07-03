export default function Corporate({ resume }) {
  const { personalInfo: p, education, skills, projects, experience, certifications, contact } = resume;

  const allContact = [
    p.email && { icon: '✉', val: p.email },
    p.phone && { icon: '📞', val: p.phone },
    p.location && { icon: '📍', val: p.location },
    p.linkedin && { icon: '🔗', val: p.linkedin },
    p.github && { icon: '💻', val: p.github },
    contact?.website && { icon: '🌐', val: contact.website },
    contact?.twitter && { icon: '🐦', val: contact.twitter },
    ...(contact?.custom || []).map((c) => ({ icon: '🔗', val: c.label + ': ' + c.url })),
  ].filter(Boolean);

  const Section = ({ title, children }) => (
    <div style={{ marginBottom: '18px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
        <div style={{ width: '3px', height: '16px', background: '#2563eb', borderRadius: '2px', flexShrink: 0 }} />
        <h3 style={{ fontSize: '10px', fontWeight: 700, color: '#1e3a5f', textTransform: 'uppercase', letterSpacing: '1.5px' }}>{title}</h3>
        <div style={{ flex: 1, height: '1px', background: '#dbeafe' }} />
      </div>
      {children}
    </div>
  );

  return (
    <div className="bg-white font-sans" style={{ width: '100%', minHeight: '297mm', fontSize: '11px' }}>
      {/* Blue accent bar */}
      <div style={{ height: '6px', background: 'linear-gradient(90deg, #1d4ed8, #3b82f6, #60a5fa)' }} />

      {/* Header */}
      <div style={{ padding: '24px 32px 18px', borderBottom: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div style={{ display: 'flex', gap: '18px', alignItems: 'center' }}>
          {p.photo && (
            <img src={p.photo} alt="Profile" style={{ width: '75px', height: '75px', borderRadius: '8px', objectFit: 'cover', border: '2px solid #bfdbfe', flexShrink: 0 }} />
          )}
          <div>
            <h1 style={{ fontSize: '26px', fontWeight: 800, color: '#1e3a5f', letterSpacing: '-0.5px' }}>{p.name || 'Your Name'}</h1>
            <p style={{ fontSize: '13px', color: '#2563eb', fontWeight: 600, marginTop: '3px' }}>{p.title || 'Your Job Title'}</p>
            {p.summary && <p style={{ fontSize: '10px', color: '#64748b', marginTop: '8px', lineHeight: 1.6, maxWidth: '420px' }}>{p.summary}</p>}
          </div>
        </div>

        {/* Contact box */}
        <div style={{ background: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: '8px', padding: '12px 14px', minWidth: '160px', flexShrink: 0 }}>
          {allContact.map((c, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '5px' }}>
              <span style={{ fontSize: '10px' }}>{c.icon}</span>
              <span style={{ fontSize: '9px', color: '#1e40af', wordBreak: 'break-all' }}>{c.val}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Body */}
      <div style={{ padding: '20px 32px', display: 'flex', gap: '24px' }}>
        {/* Main content */}
        <div style={{ flex: 1 }}>
          {experience.some((e) => e.company || e.role) && (
            <Section title="Professional Experience">
              {experience.filter((e) => e.company || e.role).map((e, i) => (
                <div key={i} style={{ marginBottom: '14px', paddingBottom: '14px', borderBottom: i < experience.length - 1 ? '1px dashed #e2e8f0' : 'none' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div>
                      <p style={{ fontWeight: 700, fontSize: '11px', color: '#1e293b' }}>{e.role}</p>
                      <p style={{ fontSize: '10px', color: '#2563eb', fontWeight: 600 }}>{e.company}</p>
                    </div>
                    <span style={{ fontSize: '9px', color: '#64748b', background: '#f1f5f9', padding: '2px 8px', borderRadius: '4px', flexShrink: 0 }}>{e.duration}</span>
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
            </Section>
          )}

          {projects.some((pr) => pr.name) && (
            <Section title="Key Projects">
              {projects.filter((pr) => pr.name).map((pr, i) => (
                <div key={i} style={{ marginBottom: '12px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <p style={{ fontWeight: 700, fontSize: '11px', color: '#1e293b' }}>{pr.name}</p>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      {pr.link && <span style={{ fontSize: '9px', color: '#2563eb' }}>Live ↗</span>}
                      {pr.github && <span style={{ fontSize: '9px', color: '#2563eb' }}>GitHub ↗</span>}
                    </div>
                  </div>
                  <p style={{ fontSize: '10px', color: '#475569', marginTop: '3px', lineHeight: 1.5 }}>{pr.description}</p>
                  {pr.tech?.length > 0 && (
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', marginTop: '5px' }}>
                      {pr.tech.map((t) => <span key={t} style={{ background: '#dbeafe', color: '#1d4ed8', fontSize: '9px', padding: '2px 6px', borderRadius: '4px', fontWeight: 500 }}>{t}</span>)}
                    </div>
                  )}
                </div>
              ))}
            </Section>
          )}
        </div>

        {/* Right sidebar */}
        <div style={{ width: '170px', flexShrink: 0 }}>
          {education.some((e) => e.institution) && (
            <Section title="Education">
              {education.filter((e) => e.institution).map((e, i) => (
                <div key={i} style={{ marginBottom: '10px' }}>
                  <p style={{ fontWeight: 700, fontSize: '10px', color: '#1e293b' }}>{e.degree}</p>
                  {e.fieldOfStudy && <p style={{ fontSize: '9px', color: '#2563eb' }}>{e.fieldOfStudy}</p>}
                  <p style={{ fontSize: '9px', color: '#64748b' }}>{e.institution}</p>
                  <p style={{ fontSize: '9px', color: '#94a3b8' }}>{e.year}{e.gpa ? ` · GPA ${e.gpa}` : ''}</p>
                </div>
              ))}
            </Section>
          )}

          {skills.technical.length > 0 && (
            <Section title="Skills">
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', marginBottom: '8px' }}>
                {skills.technical.map((s) => (
                  <span key={s} style={{ background: '#dbeafe', color: '#1d4ed8', fontSize: '9px', padding: '2px 6px', borderRadius: '4px', fontWeight: 500 }}>{s}</span>
                ))}
              </div>
              {skills.soft.length > 0 && (
                <div>
                  <p style={{ fontSize: '8px', color: '#94a3b8', marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Soft Skills</p>
                  <p style={{ fontSize: '9px', color: '#64748b' }}>{skills.soft.join(' · ')}</p>
                </div>
              )}
            </Section>
          )}

          {certifications.some((c) => c.name) && (
            <Section title="Certifications">
              {certifications.filter((c) => c.name).map((c, i) => (
                <div key={i} style={{ marginBottom: '8px' }}>
                  <p style={{ fontSize: '10px', fontWeight: 600, color: '#1e293b' }}>{c.name}</p>
                  <p style={{ fontSize: '9px', color: '#64748b' }}>{c.issuer} {c.year && `· ${c.year}`}</p>
                </div>
              ))}
            </Section>
          )}
        </div>
      </div>
    </div>
  );
}