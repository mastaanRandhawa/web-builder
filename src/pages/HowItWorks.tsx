import { Link } from 'react-router-dom';
import { Button } from '../components/ui';
import { AnimatedSection } from '../components/ui/AnimatedSection';
import { Container } from '../components/ui/Container';
import { Section } from '../components/ui/Section';
import { CheckCircle2, ArrowRight } from 'lucide-react';

const steps = [
  {
    number: '01',
    title: 'We Set Up Your Website',
    description: 'We learn about your business and build your website. Professional design, hosting, and security—all included.',
    details: [
      'We learn about your business',
      'We build your website',
      'We set up hosting and security',
      'You review and approve',
    ],
  },
  {
    number: '02',
    title: 'We Manage It Monthly',
    description: 'Every month, we handle updates, backups, security, and support. You focus on your business, we handle the website.',
    details: [
      'Monthly updates and backups',
      'Security monitoring',
      'Email support',
      'Quick fixes when needed',
    ],
  },
  {
    number: '03',
    title: 'We Help You Grow',
    description: 'We add simple tools like contact forms and booking calendars. We help you get more customers through your website.',
    details: [
      'Contact forms and booking tools',
      'Help with getting found online',
      'Monthly check-ins',
      'Simple growth suggestions',
    ],
  },
];

export function HowItWorks() {
  return (
    <div className="bg-white overflow-x-hidden">
      {/* Hero */}
      <Section>
        <Container>
          <AnimatedSection>
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-display-2 mb-6 text-zinc-900 text-balance">
                How It Works
              </h1>
              <p className="text-body-lg text-zinc-600 mb-8 max-w-2xl mx-auto">
                Simple process. We set up your website, manage it every month, and help you grow. No tech knowledge needed.
              </p>
            </div>
          </AnimatedSection>
        </Container>
      </Section>

      {/* Steps */}
      <Section variant="light">
        <Container>
          <div className="space-y-24">
            {steps.map((step, index) => (
              <AnimatedSection key={step.number}>
                <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${index % 2 === 1 ? 'lg:grid-flow-dense' : ''}`}>
                  <div className={index % 2 === 1 ? 'lg:col-start-2' : ''}>
                    <div className="inline-flex items-center gap-3 mb-6">
                      <span className="text-6xl font-bold text-zinc-200">{step.number}</span>
                      <div className="h-px w-16 bg-zinc-300" />
                    </div>
                    <h2 className="text-h1 mb-6 text-zinc-900">{step.title}</h2>
                    <p className="text-body-lg text-zinc-600 mb-8">{step.description}</p>
                    <ul className="space-y-4">
                      {step.details.map((detail) => (
                        <li key={detail} className="flex items-start gap-3">
                          <CheckCircle2 className="w-6 h-6 text-primary-600 flex-shrink-0 mt-0.5" />
                          <span className="text-body text-zinc-700">{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className={index % 2 === 1 ? 'lg:col-start-1' : ''}>
                    <div className="aspect-[4/3] bg-gradient-to-br from-zinc-100 to-zinc-200 rounded-2xl flex items-center justify-center">
                      <div className="text-center">
                        <div className="w-24 h-24 bg-white rounded-2xl mx-auto mb-4 shadow-lg flex items-center justify-center">
                          <span className="text-3xl font-bold text-zinc-400">{step.number}</span>
                        </div>
                        <p className="text-body-sm text-zinc-500">Visual placeholder</p>
                      </div>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </Container>
      </Section>

      {/* Timeline */}
      <Section>
        <Container>
          <AnimatedSection>
            <div className="max-w-4xl mx-auto">
              <h2 className="text-h1 mb-12 text-center text-zinc-900">What to Expect</h2>
              <div className="space-y-8">
                {[
                  { phase: 'Week 1-2', title: 'We Learn About Your Business', description: 'Quick call to understand what you need and how we can help' },
                  { phase: 'Week 3-6', title: 'We Build Your Website', description: 'We create your site, set up hosting, and make sure everything works' },
                  { phase: 'Week 7', title: 'You Review It', description: 'You check it out, tell us any changes, and we make them' },
                  { phase: 'Week 8', title: 'We Launch It', description: 'Your website goes live and starts working for your business' },
                  { phase: 'Every Month', title: 'We Manage It', description: 'Updates, backups, support, and help when you need it' },
                ].map((item) => (
                  <div key={item.phase} className="flex items-start gap-6 pb-8 border-b border-zinc-200 last:border-0">
                    <div className="flex-shrink-0 w-24">
                      <span className="text-body-sm font-semibold text-primary-600">{item.phase}</span>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-h4 mb-2 text-zinc-900">{item.title}</h3>
                      <p className="text-body text-zinc-600">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </AnimatedSection>
        </Container>
      </Section>

      {/* CTA */}
      <Section variant="light">
        <Container>
          <AnimatedSection>
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-h1 mb-6 text-zinc-900 text-balance">
                Ready to Get Started?
              </h2>
              <p className="text-body-lg text-zinc-600 mb-8">
                Let's talk about your business and how we can help you get a website that works.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/contact">
                  <Button size="lg" className="w-full sm:w-auto">
                    Schedule a Call
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
                <Link to="/pricing">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto">
                    View Pricing
                  </Button>
                </Link>
              </div>
            </div>
          </AnimatedSection>
        </Container>
      </Section>
    </div>
  );
}

