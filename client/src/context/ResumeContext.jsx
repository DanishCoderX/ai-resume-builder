import { createContext, useContext, useState } from 'react';

const defaultResume = {
  personalInfo: {
    name: '', email: '', phone: '', location: '',
    linkedin: '', github: '', title: '', summary: '',
    photo: '',
  },
  education: [{ institution: '', degree: '', fieldOfStudy: '', year: '', gpa: '' }],
  skills: { technical: [], soft: [] },
  projects: [{ name: '', description: '', tech: [], link: '', github: '' }],
  experience: [{ company: '', role: '', duration: '', description: '', bullets: [] }],
  certifications: [{ name: '', issuer: '', year: '' }],
  contact: { website: '', twitter: '', whatsapp: '', skype: '', custom: [] },
};

const ResumeContext = createContext(null);

export const ResumeProvider = ({ children }) => {
  const [resume, setResume] = useState(defaultResume);
  const [template, setTemplate] = useState('executive');
  const [currentStep, setCurrentStep] = useState(0);

  const updatePersonalInfo = (data) =>
    setResume((r) => ({ ...r, personalInfo: { ...r.personalInfo, ...data } }));
  const updateEducation = (data) => setResume((r) => ({ ...r, education: data }));
  const updateSkills = (data) => setResume((r) => ({ ...r, skills: data }));
  const updateProjects = (data) => setResume((r) => ({ ...r, projects: data }));
  const updateExperience = (data) => setResume((r) => ({ ...r, experience: data }));
  const updateCertifications = (data) => setResume((r) => ({ ...r, certifications: data }));
  const updateContact = (data) => setResume((r) => ({ ...r, contact: { ...r.contact, ...data } }));

  return (
    <ResumeContext.Provider value={{
      resume, template, setTemplate, currentStep, setCurrentStep,
      updatePersonalInfo, updateEducation, updateSkills,
      updateProjects, updateExperience, updateCertifications, updateContact,
    }}>
      {children}
    </ResumeContext.Provider>
  );
};

export const useResume = () => useContext(ResumeContext);