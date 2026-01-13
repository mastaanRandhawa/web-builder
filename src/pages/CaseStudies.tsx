import { Link } from 'react-router-dom';
import { Button, Card } from '../components/ui';
import { AnimatedSection } from '../components/ui/AnimatedSection';
import { Container } from '../components/ui/Container';
import { Section } from '../components/ui/Section';
import { ArrowRight, TrendingUp, Users, DollarSign } from 'lucide-react';

const caseStudies = [
  {
    client: 'Professional Services Firm',
    industry: 'Legal Services',
    challenge: 'Low online visibility and minimal lead generation from website',
    solution: 'Complete digital infrastructure with SEO, conversion optimization, and lead capture systems',
    results: [
      { metric: '300%', label: 'Increase in organic traffic' },
      { metric: '250%', label: 'More qualified leads' },
      { metric: '180%', label: 'ROI improvement' },
    ],
    color: 'bg-blue-50',
  },
  {
    client: 'Local Healthcare Practice',
    industry: 'Healthcare',
    challenge: 'Outdated website with poor user experience and no booking system',
    solution: 'Modern website with integrated booking calendar, patient forms, and automated follow-ups',
    results: [
      { metric: '400%', label: 'Online bookings' },
      { metric: '60%', label: 'Reduction in phone calls' },
      { metric: '220%', label: 'Patient inquiries' },
    ],
    color: 'bg-green-50',
  },
  {
    client: 'E-commerce Business',
    industry: 'Retail',
    challenge: 'Low conversion rate and high cart abandonment',
    solution: 'Conversion-focused redesign with A/B testing, email automation, and retargeting campaigns',
    results: [
      { metric: '150%', label: 'Conversion rate increase' },
      { metric: '45%', label: 'Reduction in cart abandonment' },
      { metric: '200%', label: 'Revenue growth' },
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
                Proven Results for Serious Businesses
              </h1>
              <p className="text-body-lg text-zinc-600 mb-8 max-w-2xl mx-auto">
                We install digital infrastructure that delivers measurable results. Here's how we've transformed businesses across industries.
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
                  { icon: TrendingUp, value: '250%', label: 'Average ROI increase' },
                  { icon: Users, value: '500+', label: 'Clients served' },
                  { icon: DollarSign, value: '$50M+', label: 'Revenue generated' },
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
                Ready to See Similar Results?
              </h2>
              <p className="text-body-lg text-zinc-300 mb-8">
                Let's discuss how we can install digital infrastructure for your business.
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

