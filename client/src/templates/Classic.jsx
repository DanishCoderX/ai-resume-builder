export default function Classic({ resume }) {
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
    <div style={{ marginBottom: '16px' }}>
      <h2 style={{ fontSize: '10px', fontWeight: 700, color: '#1e293b', textTransform: 'uppercase', letterSpacing: '2px', borderBottom: '2px solid #1e293b', paddingBottom: '4px', marginBottom: '10px' }}>{title}</h2>
      {children}
    </div>
  );

  return (
    <div className="bg-white text-gray-800 font-serif" style={{ width: '100%', minHeight: '297mm', padding: '32px 40px', fontSize: '11px' }}>
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '20px', paddingBottom: '16px', borderBottom: '2px solid #1e293b' }}>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '16px' }}>
          {p.photo && (
            <img src={p.photo} alt="Profile" style={{ width: '70px', height: '70px', borderRadius: '50%', objectFit: 'cover', border: '2px solid #1e293b' }} />
          )}
          <div>
            <h1 style={{ fontSize: '26px', fontWeight: 700, color: '#0f172a', letterSpacing: '1px' }}>{p.name || 'Your Name'}</h1>
            <p style={{ color: '#475569', fontSize: '13px', marginTop: '4px', fontStyle: 'italic' }}>{p.title || 'Your Job Title'}</p>
          </div>
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '12px', marginTop: '10px' }}>
          {allContact.map((c, i) => (
            <span key={i} style={{ fontSize: '9px', color: '#64748b', display: 'flex', alignItems: 'center', gap: '3px' }}>
              {c.icon} {c.val}
            </span>
          ))}
        </div>
      </div>

      {p.summary && (
        <Section title="Professional Summary">
          <p style={{ fontSize: '10px', color: '#475569', lineHeight: 1.7, fontStyle: 'italic' }}>{p.summary}</p>
        </Section>
      )}

      {education.some((e) => e.institution) && (
        <Section title="Education">
          {education.filter((e) => e.institution).map((e, i) => (
            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <div>
                <p style={{ fontWeight: 700, fontSize: '10px' }}>{e.degree}{e.fieldOfStudy ? ` in ${e.fieldOfStudy}` : ''}</p>
                <p style={{ fontSize: '10px', color: '#64748b', fontStyle: 'italic' }}>{e.institution}</p>
              </div>
              <div style={{ textAlign: 'right' }}>
                <p style={{ fontSize: '9px', color: '#94a3b8' }}>{e.year}</p>
                {e.gpa && <p style={{ fontSize: '9px', color: '#94a3b8' }}>GPA: {e.gpa}</p>}
              </div>
            </div>
          ))}
        </Section>
      )}

      {skills.technical.length > 0 && (
        <Section title="Technical Skills">
          <p style={{ fontSize: '10px', color: '#475569' }}>{skills.technical.join(' · ')}</p>
          {skills.soft.length > 0 && <p style={{ fontSize: '10px', color: '#64748b', marginTop: '4px' }}><strong>Soft Skills:</strong> {skills.soft.join(' · ')}</p>}
        </Section>
      )}

      {experience.some((e) => e.company || e.role) && (
        <Section title="Work Experience">
          {experience.filter((e) => e.company || e.role).map((e, i) => (
            <div key={i} style={{ marginBottom: '12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div>
                  <p style={{ fontWeight: 700, fontSize: '11px' }}>{e.role}</p>
                  <p style={{ fontSize: '10px', color: '#64748b', fontStyle: 'italic' }}>{e.company}</p>
                </div>
                <p style={{ fontSize: '9px', color: '#94a3b8' }}>{e.duration}</p>
              </div>
              {e.bullets?.length > 0 ? (
                <ul style={{ marginTop: '4px', paddingLeft: '14px' }}>
                  {e.bullets.map((b, bi) => <li key={bi} style={{ fontSize: '10px', color: '#475569', lineHeight: 1.5, marginBottom: '2px' }}>{b}</li>)}
                </ul>
              ) : e.description && <p style={{ fontSize: '10px', color: '#475569', marginTop: '4px', lineHeight: 1.5 }}>{e.description}</p>}
            </div>
          ))}
        </Section>
      )}

      {projects.some((pr) => pr.name) && (
        <Section title="Projects">
          {projects.filter((pr) => pr.name).map((pr, i) => (
            <div key={i} style={{ marginBottom: '10px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <p style={{ fontWeight: 700, fontSize: '10px' }}>{pr.name}</p>
                {pr.link && <span style={{ fontSize: '9px', color: '#475569' }}>{pr.link}</span>}
              </div>
              <p style={{ fontSize: '10px', color: '#475569', marginTop: '2px', lineHeight: 1.5 }}>{pr.description}</p>
              {pr.tech?.length > 0 && <p style={{ fontSize: '9px', color: '#64748b', marginTop: '3px' }}><strong>Tech:</strong> {pr.tech.join(', ')}</p>}
            </div>
          ))}
        </Section>
      )}

      {certifications.some((c) => c.name) && (
        <Section title="Certifications">
          {certifications.filter((c) => c.name).map((c, i) => (
            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
              <p style={{ fontSize: '10px', fontWeight: 600 }}>{c.name} — <span style={{ fontWeight: 400, color: '#64748b' }}>{c.issuer}</span></p>
              <p style={{ fontSize: '9px', color: '#94a3b8' }}>{c.year}</p>
            </div>
          ))}
        </Section>
      )}
    </div>
  );
}