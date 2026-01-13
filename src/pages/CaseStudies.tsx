import { Link } from 'react-router-dom';
import { Button, Card } from '../components/ui';
import { AnimatedSection } from '../components/ui/AnimatedSection';
import { Container } from '../components/ui/Container';
import { Section } from '../components/ui/Section';
import { ArrowRight, TrendingUp, Users, DollarSign } from 'lucide-react';

const caseStudies = [
  {
    client: 'Local Law Firm',
    industry: 'Legal Services',
    challenge: "Old website that wasn't bringing in new clients. They were spending too much time managing it themselves.",
    solution: 'We built them a new website and manage it monthly. Added contact forms and helped them get found online.',
    results: [
      { metric: 'More calls', label: 'From website visitors' },
      { metric: 'Less time', label: 'Managing their website' },
      { metric: 'Better results', label: 'From their online presence' },
    ],
    color: 'bg-blue-50',
  },
  {
    client: 'Local Dental Practice',
    industry: 'Healthcare',
    challenge: "Website was outdated and hard to update. Patients couldn't book appointments online.",
    solution: 'We built a new website and added online booking. Now we manage it monthly so they can focus on patients.',
    results: [
      { metric: 'Online bookings', label: 'Patients can schedule anytime' },
      { metric: 'Less phone calls', label: 'For simple appointments' },
      { metric: 'More new patients', label: 'Finding them online' },
    ],
    color: 'bg-green-50',
  },
  {
    client: 'Local Gym',
    industry: 'Fitness',
    challenge: "No website, or a basic one that didn't help them get new members.",
    solution: 'We built a professional website with membership sign-up forms. We manage it monthly and help them grow.',
    results: [
      { metric: 'More inquiries', label: 'About memberships' },
      { metric: 'Online sign-ups', label: 'New members can join easily' },
      { metric: 'Better presence', label: 'Professional website that works' },
    ],
    color: 'bg-purple-50',
  },
];

export function CaseStudies() {
  return (
    <div className="bg-white overflow-x-hidden">
      {/* Hero */}
      <Section>
        <Container>
          <AnimatedSection>
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-display-2 mb-6 text-zinc-900 text-balance">
                How We Help Local Businesses
              </h1>
              <p className="text-body-lg text-zinc-600 mb-8 max-w-2xl mx-auto">
                We help local businesses get professional websites that work. Here are a few examples of how we've helped.
              </p>
            </div>
          </AnimatedSection>
        </Container>
      </Section>

      {/* Case Studies */}
      <Section variant="light">
        <Container>
          <div className="space-y-16">
            {caseStudies.map((study) => (
              <AnimatedSection key={study.client}>
                <Card className="overflow-hidden hover:shadow-xl transition-shadow duration-300">
                  <div className={`${study.color} p-12 lg:p-16`}>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                      <div>
                        <div className="inline-block px-3 py-1 bg-white/80 rounded-full text-body-sm font-medium text-zinc-700 mb-6">
                          {study.industry}
                        </div>
                        <h2 className="text-h1 mb-6 text-zinc-900">{study.client}</h2>
                        <div className="space-y-6 mb-8">
                          <div>
                            <h3 className="text-h4 mb-2 text-zinc-900">Challenge</h3>
                            <p className="text-body text-zinc-600">{study.challenge}</p>
                          </div>
                          <div>
                            <h3 className="text-h4 mb-2 text-zinc-900">Solution</h3>
                            <p className="text-body text-zinc-600">{study.solution}</p>
                          </div>
                        </div>
                      </div>
                      <div>
                        <h3 className="text-h4 mb-8 text-zinc-900">Results</h3>
                        <div className="grid grid-cols-1 gap-6">
                          {study.results.map((result) => (
                            <div key={result.label} className="bg-white/80 rounded-xl p-6">
                              <div className="text-4xl font-bold text-zinc-900 mb-2">{result.metric}</div>
                              <div className="text-body-sm text-zinc-600">{result.label}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              </AnimatedSection>
            ))}
          </div>
        </Container>
      </Section>

      {/* Social Proof */}
      <Section>
        <Container>
          <AnimatedSection>
            <div className="max-w-4xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                {[
                  { icon: Users, value: '100+', label: 'Local businesses helped' },
                  { icon: TrendingUp, value: 'Monthly', label: 'Website management' },
                  { icon: DollarSign, value: 'Simple', label: 'Pricing, no surprises' },
                ].map((stat) => {
                  const Icon = stat.icon;
                  return (
                    <div key={stat.label}>
                      <div className="w-16 h-16 bg-primary-50 rounded-xl flex items-center justify-center mx-auto mb-4">
                        <Icon className="w-8 h-8 text-primary-600" />
                      </div>
                      <div className="text-4xl font-bold text-zinc-900 mb-2">{stat.value}</div>
                      <div className="text-body-sm text-zinc-600">{stat.label}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          </AnimatedSection>
        </Container>
      </Section>

      {/* CTA */}
      <Section variant="light">
        <Container>
          <AnimatedSection>
            <div className="max-w-3xl mx-auto text-center bg-zinc-900 rounded-2xl p-12 lg:p-16">
              <h2 className="text-h1 text-white mb-6 text-balance">
                Ready to Get Started?
              </h2>
              <p className="text-body-lg text-zinc-300 mb-8">
                Let's talk about your business and how we can help you get a website that works.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/contact">
                  <Button size="lg" variant="secondary" className="w-full sm:w-auto">
                    Schedule a Call
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
                <Link to="/pricing">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto bg-white text-zinc-900 hover:bg-zinc-100">
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

