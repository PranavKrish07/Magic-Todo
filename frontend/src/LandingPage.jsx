import { Link } from 'react-router-dom';
import './LandingPage.css';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-slate-950 overflow-x-hidden">
      {/* ===== NAVBAR ===== */}
      <nav className="glass-nav fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 lg:px-12 py-3 sm:py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 no-underline flex-shrink-0">
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-gradient-to-br from-teal-500 to-teal-400 flex items-center justify-center shadow-lg shadow-teal-500/20">
              <span className="text-white font-bold text-base sm:text-lg">✦</span>
            </div>
            <span className="text-lg sm:text-xl font-bold text-white tracking-tight">
              Magic<span className="text-teal-400">Todo</span>
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-4 lg:gap-8 text-xs sm:text-sm text-slate-400">
            <a href="#features" className="hover:text-teal-400 transition-colors duration-300 no-underline">Features</a>
            <a href="#how-it-works" className="hover:text-teal-400 transition-colors duration-300 no-underline">How It Works</a>
            <a href="#testimonials" className="hover:text-teal-400 transition-colors duration-300 no-underline">Testimonials</a>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <Link
              to="/login"
              className="btn-outline px-3 sm:px-5 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-medium text-teal-400 no-underline whitespace-nowrap"
            >
              Log In
            </Link>
            <Link
              to="/signup"
              className="btn-gradient px-3 sm:px-5 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-semibold text-white no-underline whitespace-nowrap"
            >
              Sign Up Free
            </Link>
          </div>
        </div>
      </nav>

      {/* ===== HERO ===== */}
      <section className="relative pt-24 pb-16 sm:pt-36 md:pt-48 sm:pb-24 md:pb-32 px-4 sm:px-6">
        {/* Decorative orbs */}
        <div className="absolute top-10 sm:top-20 left-[10%] w-48 sm:w-72 h-48 sm:h-72 bg-teal-500/10 rounded-full blur-3xl animate-pulse-glow" />
        <div className="absolute top-20 sm:top-40 right-[15%] w-56 sm:w-96 h-56 sm:h-96 bg-teal-600/8 rounded-full blur-3xl animate-pulse-glow stagger-2" />
        <div className="absolute bottom-0 sm:bottom-10 left-[30%] w-48 sm:w-64 h-48 sm:h-64 bg-teal-400/6 rounded-full blur-3xl animate-pulse-glow stagger-4" />

        <div className="max-w-5xl mx-auto text-center relative z-10">
          {/* Badge */}
          <div className="animate-fade-in-up inline-flex items-center gap-2 px-3 sm:px-4 py-1 sm:py-1.5 rounded-full border border-teal-500/20 bg-teal-500/5 text-teal-400 text-xs font-medium tracking-wide uppercase mb-6 sm:mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-pulse" />
            Now in Beta — Free for everyone
          </div>

          <h1 className="animate-fade-in-up stagger-1 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight tracking-tight mb-4 sm:mb-6">
            <span className="text-white">Organize your life</span>
            <br className="hidden sm:block" />
            <span className="gradient-text-shine">like magic.</span>
          </h1>

          <p className="animate-fade-in-up stagger-2 text-base sm:text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-8 sm:mb-10 leading-relaxed px-2 sm:px-0">
            Magic Todo transforms the way you manage tasks — with smart lists,
            effortless organization, and a beautifully minimal interface that gets
            out of your way.
          </p>

          <div className="animate-fade-in-up stagger-3 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 px-2 sm:px-0">
            <Link
              to="/signup"
              className="btn-gradient px-6 sm:px-8 py-2.5 sm:py-3.5 rounded-xl text-sm sm:text-base font-semibold text-white no-underline flex items-center justify-center gap-2 w-full sm:w-auto"
            >
              Get Started — It&apos;s Free
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
            <a
              href="#features"
              className="btn-outline px-6 sm:px-8 py-2.5 sm:py-3.5 rounded-xl text-sm sm:text-base font-medium text-slate-300 no-underline w-full sm:w-auto text-center"
            >
              See How It Works
            </a>
          </div>

          {/* Hero visual mockup */}
          <div className="animate-fade-in-up stagger-5 mt-12 sm:mt-16 mx-auto max-w-3xl px-2 sm:px-0">
            <div className="glass-card rounded-2xl p-4 sm:p-6 md:p-8">
              <div className="flex items-center gap-2 mb-4 sm:mb-5">
                <div className="w-3 h-3 rounded-full bg-red-500/70" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
                <div className="w-3 h-3 rounded-full bg-green-500/70" />
                <span className="ml-3 text-xs text-slate-500 font-mono truncate">Magic Todo — My Tasks</span>
              </div>
              <div className="space-y-2 sm:space-y-3">
                {['Design landing page ✨', 'Ship new feature 🚀', 'Review pull requests'].map((task, i) => (
                  <div key={i} className="flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2 sm:py-3 rounded-xl bg-slate-800/50 border border-slate-700/30">
                    <div className={`w-5 h-5 rounded-md border-2 flex-shrink-0 flex items-center justify-center ${i === 0 ? 'border-teal-400 bg-teal-400/20' : 'border-slate-600'}`}>
                      {i === 0 && (
                        <svg className="w-3 h-3 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </div>
                    <span className={`text-xs sm:text-sm truncate ${i === 0 ? 'text-slate-500 line-through' : 'text-slate-200'}`}>
                      {task}
                    </span>
                    {i === 1 && <span className="ml-auto text-xs px-2 py-0.5 rounded-full bg-teal-500/10 text-teal-400 border border-teal-500/20 flex-shrink-0">Priority</span>}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== FEATURES ===== */}
      <section id="features" className="py-16 sm:py-24 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <p className="text-teal-400 text-xs sm:text-sm font-semibold tracking-widest uppercase mb-2 sm:mb-3">Features</p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3 sm:mb-4">
              Everything you need, <span className="gradient-text">nothing you don&apos;t.</span>
            </h2>
            <p className="text-slate-400 text-sm sm:text-base max-w-xl mx-auto px-2 sm:px-0">
              Minimalism meets power. Every feature is crafted to keep you focused and productive.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {[
              {
                icon: (
                  <svg className="w-6 h-6 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                  </svg>
                ),
                title: 'Smart Lists',
                desc: 'Create unlimited task lists with intelligent grouping. Organize projects, goals, and daily routines all in one place.'
              },
              {
                icon: (
                  <svg className="w-6 h-6 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
                  </svg>
                ),
                title: 'Magic Sorting',
                desc: 'Tasks automatically organize by priority and deadline. Spend less time managing and more time doing what matters.'
              },
              {
                icon: (
                  <svg className="w-6 h-6 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                  </svg>
                ),
                title: 'Secure & Private',
                desc: 'Your data is encrypted and protected. Only you have access to your tasks — no ads, no tracking, no compromises.'
              }
            ].map((feature, i) => (
              <div key={i} className={`glass-card rounded-2xl p-6 sm:p-8 animate-fade-in-up stagger-${i + 1}`}>
                <div className="feature-icon w-12 h-12 rounded-xl flex items-center justify-center mb-4 sm:mb-5">
                  {feature.icon}
                </div>
                <h3 className="text-base sm:text-lg font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== HOW IT WORKS ===== */}
      <section id="how-it-works" className="py-16 sm:py-24 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <p className="text-teal-400 text-xs sm:text-sm font-semibold tracking-widest uppercase mb-2 sm:mb-3">How It Works</p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">
              Three simple steps to <span className="gradient-text">productivity.</span>
            </h2>
          </div>

          <div className="space-y-8 sm:space-y-12 relative">
            {/* Connecting line */}
            <div className="absolute left-7 sm:left-8 top-12 bottom-12 w-px bg-gradient-to-b from-teal-500/40 via-teal-500/20 to-transparent hidden md:block" />

            {[
              { step: '01', title: 'Create Your Account', desc: 'Sign up in seconds with just your email. No credit card, no strings attached.' },
              { step: '02', title: 'Add Your Tasks', desc: 'Create lists, add tasks, and let Magic Todo organize them intelligently for you.' },
              { step: '03', title: 'Crush Your Goals', desc: 'Check off tasks, track your progress, and watch your productivity soar.' }
            ].map((item, i) => (
              <div key={i} className={`flex items-start gap-4 sm:gap-6 animate-fade-in-up stagger-${i + 1}`}>
                <div className="step-number flex-shrink-0 w-12 h-12 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center relative z-10">
                  <span className="text-white font-bold text-base sm:text-lg">{item.step}</span>
                </div>
                <div className="pt-1 sm:pt-2">
                  <h3 className="text-base sm:text-xl font-semibold text-white mb-1 sm:mb-2">{item.title}</h3>
                  <p className="text-slate-400 text-sm sm:text-base leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== TESTIMONIALS ===== */}
      <section id="testimonials" className="py-16 sm:py-24 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <p className="text-teal-400 text-xs sm:text-sm font-semibold tracking-widest uppercase mb-2 sm:mb-3">Testimonials</p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">
              Loved by <span className="gradient-text">productive people.</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {[
              { name: 'Sarah K.', role: 'Product Designer', text: 'Magic Todo is the only task app that sticks. The minimal design keeps me focused instead of overwhelmed.' },
              { name: 'James R.', role: 'Software Engineer', text: 'I\'ve tried them all — Todoist, Notion, Things. Magic Todo just feels right. It\'s fast, clean, and dead simple.' },
              { name: 'Priya M.', role: 'Startup Founder', text: 'This app literally changed how I run my day. The smart lists feature alone is worth it.' }
            ].map((t, i) => (
              <div key={i} className={`glass-card testimonial-card relative rounded-2xl p-6 sm:p-8 animate-fade-in-up stagger-${i + 1}`}>
                <p className="text-slate-300 text-sm leading-relaxed mb-6 relative z-10">{t.text}</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-teal-500 to-teal-700 flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
                    {t.name[0]}
                  </div>
                  <div className="min-w-0">
                    <p className="text-white text-sm font-semibold truncate">{t.name}</p>
                    <p className="text-slate-500 text-xs truncate">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="py-16 sm:py-24 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <div className="cta-gradient rounded-2xl sm:rounded-3xl p-8 sm:p-12 md:p-16 text-center relative overflow-hidden">
            {/* Decorative orbs */}
            <div className="absolute top-0 right-0 w-48 sm:w-64 h-48 sm:h-64 bg-teal-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-40 sm:w-48 h-40 sm:h-48 bg-teal-600/8 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

            <div className="relative z-10">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3 sm:mb-4">
                Ready to make your tasks <span className="gradient-text">magical?</span>
              </h2>
              <p className="text-slate-400 text-sm sm:text-base max-w-xl mx-auto mb-6 sm:mb-8 px-2 sm:px-0">
                Join thousands of people who have simplified their workflow. Start free, upgrade anytime.
              </p>
              <Link
                to="/signup"
                className="btn-gradient inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-4 rounded-xl text-sm sm:text-base font-semibold text-white no-underline w-full sm:w-auto"
              >
                Start for Free Today
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="border-t border-slate-800/50 py-8 sm:py-12 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-10 mb-8 sm:mb-12">
            <div className="sm:col-span-1">
              <div className="flex items-center gap-2 mb-3 sm:mb-4">
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-gradient-to-br from-teal-500 to-teal-400 flex items-center justify-center">
                  <span className="text-white font-bold text-xs sm:text-sm">✦</span>
                </div>
                <span className="text-base sm:text-lg font-bold text-white">
                  Magic<span className="text-teal-400">Todo</span>
                </span>
              </div>
              <p className="text-slate-500 text-xs sm:text-sm leading-relaxed">
                The simplest way to manage your tasks and stay on top of what matters most.
              </p>
            </div>

            <div>
              <h4 className="text-white text-xs sm:text-sm font-semibold mb-3 sm:mb-4">Product</h4>
              <ul className="space-y-1.5 sm:space-y-2.5 list-none p-0 m-0">
                <li><a href="#features" className="text-slate-500 text-xs sm:text-sm hover:text-teal-400 transition-colors no-underline">Features</a></li>
                <li><a href="#how-it-works" className="text-slate-500 text-xs sm:text-sm hover:text-teal-400 transition-colors no-underline">How It Works</a></li>
                <li><a href="#testimonials" className="text-slate-500 text-xs sm:text-sm hover:text-teal-400 transition-colors no-underline">Testimonials</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white text-xs sm:text-sm font-semibold mb-3 sm:mb-4">Account</h4>
              <ul className="space-y-1.5 sm:space-y-2.5 list-none p-0 m-0">
                <li><Link to="/login" className="text-slate-500 text-xs sm:text-sm hover:text-teal-400 transition-colors no-underline">Log In</Link></li>
                <li><Link to="/signup" className="text-slate-500 text-xs sm:text-sm hover:text-teal-400 transition-colors no-underline">Sign Up</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white text-xs sm:text-sm font-semibold mb-3 sm:mb-4">Legal</h4>
              <ul className="space-y-1.5 sm:space-y-2.5 list-none p-0 m-0">
                <li><span className="text-slate-500 text-xs sm:text-sm">Privacy Policy</span></li>
                <li><span className="text-slate-500 text-xs sm:text-sm">Terms of Service</span></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-slate-800/50 pt-6 sm:pt-8 text-center">
            <p className="text-slate-600 text-xs sm:text-sm">
              &copy; {new Date().getFullYear()} Magic Todo. Crafted with
              <span className="text-teal-500 mx-1">♥</span>
              for productive people.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;