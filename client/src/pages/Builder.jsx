import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import StepWizard from '../components/StepWizard';
import ResumePreview from '../components/ResumePreview';

export default function Builder() {
  const navigate = useNavigate();
  const [showPreview, setShowPreview] = useState(false);
  const [finished, setFinished] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-surface">
      {/* Top bar */}
      <div className="shrink-0 border-b border-surface-border px-4 lg:px-6 py-3 glass sticky top-0 z-10">
        <div className="flex items-center justify-between">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2.5 text-sm text-ink-muted hover:text-ink transition-colors group"
          >
            <span className="group-hover:-translate-x-0.5 transition-transform">←</span>
            <div className="hidden sm:flex items-center gap-1">
              <div className="w-6 h-6 bg-primary rounded-md flex items-center justify-center text-white font-bold text-xs">R</div>
              <span className="text-primary font-mono font-bold">resume/</span>
              <span className="text-ink-muted font-mono">ai</span>
            </div>
          </button>

          <div className="flex items-center gap-2">
            <span className="hidden sm:flex items-center gap-1.5 text-xs text-ink-faint bg-surface-card border border-surface-border px-3 py-1.5 rounded-lg">
              <span className="w-1.5 h-1.5 bg-success rounded-full animate-pulse" />
              Auto-saving
            </span>
            <button
              onClick={() => setShowPreview(!showPreview)}
              className="lg:hidden btn-ghost btn-sm gap-1.5"
            >
              {showPreview ? '✏️ Edit' : '👁️ Preview'}
            </button>
          </div>
        </div>
      </div>

      {/* Split layout */}
      <div className="flex flex-1 overflow-hidden">
        {/* Wizard panel */}
        <div className={`w-full lg:w-1/2 flex flex-col overflow-hidden ${showPreview ? 'hidden lg:flex' : 'flex'}`}>
          <div className="flex-1 overflow-y-auto p-4 lg:p-6 scrollbar-hide">
            {finished ? (
              <div className="flex items-center justify-center h-full min-h-64">
                <div className="text-center">
                  <div className="w-20 h-20 bg-success/10 border border-success/20 rounded-full flex items-center justify-center mx-auto mb-4 text-4xl">🎉</div>
                  <h2 className="text-xl font-bold text-ink mb-2">Resume Complete!</h2>
                  <p className="text-ink-muted text-sm mb-6 max-w-xs mx-auto">Your resume is ready. Use the preview to download your PDF or check your ATS score.</p>
                  <div className="flex gap-3 justify-center flex-wrap">
                    <button onClick={() => setFinished(false)} className="btn-ghost btn-sm">← Edit Resume</button>
                    <button onClick={() => setShowPreview(true)} className="btn-primary btn-sm lg:hidden">View Preview →</button>
                  </div>
                </div>
              </div>
            ) : (
              <StepWizard onFinish={() => setFinished(true)} />
            )}
          </div>
        </div>

        {/* Divider */}
        <div className="hidden lg:block w-px bg-surface-border shrink-0" />

        {/* Preview panel */}
        <div className={`w-full lg:w-1/2 flex flex-col bg-surface overflow-hidden ${showPreview ? 'flex' : 'hidden lg:flex'}`}>
          <div className="flex-1 overflow-y-auto p-4 lg:p-6 scrollbar-hide">
            <ResumePreview />
          </div>
        </div>
      </div>
    </div>
  );
}