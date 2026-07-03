import { useNavigate } from 'react-router-dom';

const features = [
  { icon: '✨', title: 'AI Enhancement', desc: 'Groq AI rewrites your summary and generates powerful bullet points automatically', color: 'from-indigo-500/10 to-purple-500/10 border-indigo-500/20' },
  { icon: '🎯', title: 'ATS Scoring', desc: 'Get instant feedback on how well your resume will perform with applicant tracking systems', color: 'from-emerald-500/10 to-teal-500/10 border-emerald-500/20' },
  { icon: '🎨', title: '6 Pro Templates', desc: 'Modern, Classic, and Minimal designs crafted to impress recruiters', color: 'from-pink-500/10 to-rose-500/10 border-pink-500/20' },
  { icon: '🖨️', title: 'Instant PDF', desc: 'Download a print-ready PDF resume with one click, perfectly formatted', color: 'from-amber-500/10 to-orange-500/10 border-amber-500/20' },
  { icon: '⚡', title: '7-Step Wizard', desc: 'Guided form that walks you through every section — nothing gets missed', color: 'from-blue-500/10 to-cyan-500/10 border-blue-500/20' },
  { icon: '📱', title: 'Mobile Ready', desc: 'Build and preview your resume on any device, anywhere', color: 'from-violet-500/10 to-fuchsia-500/10 border-violet-500/20' },
];

const steps = [
  { n: '01', label: 'Fill your details', desc: 'Personal info, education, skills, projects' },
  { n: '02', label: 'Let AI enhance', desc: 'One click to improve your content with AI' },
  { n: '03', label: 'Pick a template', desc: 'Choose from 6 professional designs' },
  { n: '04', label: 'Download PDF', desc: 'Print-ready resume in seconds' },
];

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-surface">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-surface-border px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white font-bold text-sm">R</div>
            <div>
              <span className="text-primary font-mono font-bold text-lg">resume/</span>
              <span className="text-ink-muted font-mono text-lg">ai</span>
            </div>
          </div>
          <button onClick={() => navigate('/builder')} className="btn-primary btn-sm shadow-lg shadow-primary/25">
            Build My Resume →
          </button>
        </div>
      </nav>

      {/* Hero */}
      <div className="pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 text-primary text-xs font-semibold px-4 py-2 rounded-full mb-8">
            <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
            Powered by Groq AI — Free Forever
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-ink leading-tight tracking-tight">
            Build a resume that<br />
            <span className="gradient-text">gets you hired</span>
          </h1>

          <p className="text-ink-muted text-lg sm:text-xl mt-6 max-w-2xl mx-auto leading-relaxed">
            AI-powered resume builder with smart content suggestions, ATS scoring, and beautiful templates. Go from blank to hired in minutes.
          </p>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10">
            <button
              onClick={() => navigate('/builder')}
              className="btn-primary btn-lg shadow-xl shadow-primary/30 hover:shadow-primary/40 hover:-translate-y-0.5 transition-all"
            >
              ✨ Start Building — It's Free
            </button>
          </div>

          {/* Social proof */}
          <p className="text-xs text-ink-faint mt-4">No account required · No watermarks · Instant download</p>
        </div>
      </div>

      {/* How it works */}
      <div className="py-16 px-6 border-t border-surface-border">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-ink">How it works</h2>
            <p className="text-ink-muted mt-2">Four simple steps to your perfect resume</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {steps.map((s, i) => (
              <div key={i} className="card text-center group hover:border-primary/30 transition-all hover:-translate-y-1">
                <div className="text-3xl font-black gradient-text mb-3">{s.n}</div>
                <h3 className="font-semibold text-ink mb-1">{s.label}</h3>
                <p className="text-xs text-ink-muted leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-ink">Everything you need</h2>
            <p className="text-ink-muted mt-2">Built for students, fresh grads, and experienced professionals</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {features.map((f, i) => (
              <div key={i} className={`card bg-gradient-to-br border hover:-translate-y-1 transition-all duration-200 ${f.color}`}>
                <div className="text-3xl mb-4">{f.icon}</div>
                <h3 className="font-bold text-ink mb-2">{f.title}</h3>
                <p className="text-sm text-ink-muted leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA bottom */}
      <div className="py-20 px-6 border-t border-surface-border">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-ink mb-4">Ready to land your next job?</h2>
          <p className="text-ink-muted mb-8">Join thousands of job seekers who built their resume with Resume AI</p>
          <button
            onClick={() => navigate('/builder')}
            className="btn-primary btn-lg shadow-xl shadow-primary/30 hover:-translate-y-0.5 transition-all"
          >
            Create My Resume Now →
          </button>
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-surface-border px-6 py-6 text-center text-xs text-ink-faint">
        Built by <a href="https://github.com/DanishCoderX" className="text-primary hover:underline">DanishCoderX</a> · Powered by Groq AI · React + Node.js
      </div>
    </div>
  );
}