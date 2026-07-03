import { useResume } from '../context/ResumeContext';
import PersonalInfo from './steps/PersonalInfo';
import Education from './steps/Education';
import Skills from './steps/Skills';
import Projects from './steps/Projects';
import Experience from './steps/Experience';
import Certifications from './steps/Certifications';
import Contact from './steps/Contact';

const STEPS = [
  { label: 'Personal', icon: '👤', component: PersonalInfo, desc: 'Your basic info & photo' },
  { label: 'Education', icon: '🎓', component: Education, desc: 'Academic background' },
  { label: 'Skills', icon: '⚡', component: Skills, desc: 'Technical & soft skills' },
  { label: 'Projects', icon: '📁', component: Projects, desc: 'Your best work', optional: true },
  { label: 'Experience', icon: '💼', component: Experience, desc: 'Work history', optional: true },
  { label: 'Certs', icon: '🏆', component: Certifications, desc: 'Certifications', optional: true },
  { label: 'Contact', icon: '🔗', component: Contact, desc: 'Links & socials', optional: true },
];

export default function StepWizard({ onFinish }) {
  const { currentStep, setCurrentStep } = useResume();
  const StepComponent = STEPS[currentStep].component;
  const isLast = currentStep === STEPS.length - 1;

  const next = () => isLast ? onFinish() : setCurrentStep(currentStep + 1);
  const prev = () => currentStep > 0 && setCurrentStep(currentStep - 1);

  return (
    <div className="flex flex-col gap-6">
      {/* Step pills */}
      <div className="space-y-3">
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
          {STEPS.map((step, i) => (
            <button
              key={i}
              onClick={() => setCurrentStep(i)}
              className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all duration-200 shrink-0 border ${
                i === currentStep
                  ? 'bg-primary/10 border-primary/30 text-primary'
                  : i < currentStep
                  ? 'bg-success/10 border-success/20 text-success'
                  : 'bg-surface-card border-surface-border text-ink-faint hover:text-ink-muted'
              }`}
            >
              <span>{i < currentStep ? '✓' : step.icon}</span>
              <span className="hidden sm:inline">{step.label}</span>
              {step.optional && <span className="text-ink-faint text-xs hidden sm:inline">*</span>}
            </button>
          ))}
        </div>

        {/* Progress bar */}
        <div className="relative h-1.5 bg-surface-border rounded-full overflow-hidden">
          <div
            className="absolute left-0 top-0 h-full bg-gradient-to-r from-primary to-primary-light rounded-full transition-all duration-500"
            style={{ width: `${(currentStep / (STEPS.length - 1)) * 100}%` }}
          />
        </div>

        {/* Step info */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-ink flex items-center gap-2">
              <span>{STEPS[currentStep].icon}</span>
              {STEPS[currentStep].label}
              {STEPS[currentStep].optional && (
                <span className="text-xs font-normal text-ink-faint bg-surface-border px-2 py-0.5 rounded-lg">Optional</span>
              )}
            </h2>
            <p className="text-xs text-ink-muted mt-0.5">{STEPS[currentStep].desc}</p>
          </div>
          <span className="text-xs text-ink-faint font-mono bg-surface-card border border-surface-border px-2 py-1 rounded-lg">
            {currentStep + 1}/{STEPS.length}
          </span>
        </div>
      </div>

      {/* Step content */}
      <div className="min-h-0">
        <StepComponent />
      </div>

      {/* Navigation */}
      <div className="flex justify-between items-center pt-4 border-t border-surface-border mt-2">
        <button onClick={prev} disabled={currentStep === 0} className="btn-ghost disabled:opacity-30">
          ← Back
        </button>
        <div className="flex gap-2">
          {STEPS[currentStep].optional && (
            <button onClick={next} className="btn-ghost text-ink-muted text-sm gap-1">
              Skip →
            </button>
          )}
          <button onClick={next} className="btn-primary gap-2 shadow-lg shadow-primary/20">
            {isLast ? '🎉 Finish' : 'Next →'}
          </button>
        </div>
      </div>
    </div>
  );
}