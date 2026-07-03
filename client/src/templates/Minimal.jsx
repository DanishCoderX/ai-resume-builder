export default function Minimal({ resume }) {
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
    <div style={{ marginBottom: '20px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
        <h2 style={{ fontSize: '9px', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '2px', whiteSpace: 'nowrap' }}>{title}</h2>
        <div style={{ flex: 1, height: '1px', background: '#f1f5f9' }} />
      </div>
      {children}
    </div>
  );

  return (
    <div className="bg-white font-sans" style={{ width: '100%', minHeight: '297mm', padding: '36px 40px', fontSize: '11px' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px' }}>
        <div style={{ flex: 1 }}>
          <h1 style={{ fontSize: '30px', fontWeight: 300, color: '#0f172a', letterSpacing: '-1px' }}>{p.name || 'Your Name'}</h1>
          <p style={{ color: '#64748b', fontSize: '13px', marginTop: '4px' }}>{p.title || 'Your Job Title'}</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginTop: '10px' }}>
            {allContact.map((c, i) => (
              <span key={i} style={{ fontSize: '9px', color: '#94a3b8', display: 'flex', alignItems: 'center', gap: '3px' }}>
                {c.icon} {c.val}
              </span>
            ))}
          </div>
        </div>
        {p.photo && (
          <img src={p.photo} alt="Profile" style={{ width: '72px', height: '72px', borderRadius: '8px', objectFit: 'cover', border: '1px solid #e2e8f0', marginLeft: '16px', flexShrink: 0 }} />
        )}
      </div>

      {p.summary && (
        <Section title="About">
          <p style={{ fontSize: '10px', color: '#64748b', lineHeight: 1.8 }}>{p.summary}</p>
        </Section>
      )}

      {education.some((e) => e.institution) && (
        <Section title="Education">
          {education.filter((e) => e.institution).map((e, i) => (
            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <div>
                <p style={{ fontSize: '10px', fontWeight: 600, color: '#1e293b' }}>{e.degree}{e.fieldOfStudy ? `, ${e.fieldOfStudy}` : ''}</p>
                <p style={{ fontSize: '9px', color: '#94a3b8' }}>{e.institution}{e.gpa ? ` — GPA ${e.gpa}` : ''}</p>
              </div>
              <p style={{ fontSize: '9px', color: '#cbd5e1' }}>{e.year}</p>
            </div>
          ))}
        </Section>
      )}

      {skills.technical.length > 0 && (
        <Section title="Skills">
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '6px' }}>
            {skills.technical.map((s) => (
              <span key={s} style={{ fontSize: '9px', border: '1px solid #e2e8f0', color: '#475569', padding: '2px 8px', borderRadius: '20px' }}>{s}</span>
            ))}
          </div>
          {skills.soft.length > 0 && (
            <p style={{ fontSize: '9px', color: '#94a3b8', marginTop: '4px' }}>{skills.soft.join(' · ')}</p>
          )}
        </Section>
      )}

      {experience.some((e) => e.company || e.role) && (
        <Section title="Experience">
          {experience.filter((e) => e.company || e.role).map((e, i) => (
            <div key={i} style={{ marginBottom: '12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <div>
                  <span style={{ fontSize: '10px', fontWeight: 600, color: '#1e293b' }}>{e.role}</span>
                  {e.company && <span style={{ fontSize: '10px', color: '#94a3b8' }}> at {e.company}</span>}
                </div>
                <p style={{ fontSize: '9px', color: '#cbd5e1' }}>{e.duration}</p>
              </div>
              {e.bullets?.length > 0 ? (
                <ul style={{ marginTop: '4px', paddingLeft: '12px' }}>
                  {e.bullets.map((b, bi) => <li key={bi} style={{ fontSize: '10px', color: '#64748b', lineHeight: 1.6, marginBottom: '2px' }}>{b}</li>)}
                </ul>
              ) : e.description && (
                <p style={{ fontSize: '10px', color: '#64748b', marginTop: '4px', lineHeight: 1.6 }}>{e.description}</p>
              )}
            </div>
          ))}
        </Section>
      )}

      {projects.some((pr) => pr.name) && (
        <Section title="Projects">
          {projects.filter((pr) => pr.name).map((pr, i) => (
            <div key={i} style={{ marginBottom: '12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <p style={{ fontSize: '10px', fontWeight: 600, color: '#1e293b' }}>{pr.name}</p>
                <div style={{ display: 'flex', gap: '8px' }}>
                  {pr.link && <span style={{ fontSize: '9px', color: '#94a3b8' }}>Live ↗</span>}
                  {pr.github && <span style={{ fontSize: '9px', color: '#94a3b8' }}>GitHub ↗</span>}
                </div>
              </div>
              <p style={{ fontSize: '10px', color: '#64748b', marginTop: '3px', lineHeight: 1.6 }}>{pr.description}</p>
              {pr.tech?.length > 0 && (
                <p style={{ fontSize: '9px', color: '#94a3b8', marginTop: '3px' }}>{pr.tech.join(' · ')}</p>
              )}
            </div>
          ))}
        </Section>
      )}

      {certifications.some((c) => c.name) && (
        <Section title="Certifications">
          {certifications.filter((c) => c.name).map((c, i) => (
            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
              <p style={{ fontSize: '10px', color: '#475569' }}>{c.name} <span style={{ color: '#94a3b8' }}>— {c.issuer}</span></p>
              <p style={{ fontSize: '9px', color: '#cbd5e1' }}>{c.year}</p>
            </div>
          ))}
        </Section>
      )}
    </div>
  );
}