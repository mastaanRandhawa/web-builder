import { Link } from 'react-router-dom';
import { Button, Card } from '../components/ui';
import { AnimatedSection } from '../components/ui/AnimatedSection';
import { Container } from '../components/ui/Container';
import { Section } from '../components/ui/Section';
import { ArrowRight, Globe, Zap, TrendingUp, BarChart3 } from 'lucide-react';

const services = [
  {
    icon: Globe,
    title: 'Website Core',
    description: 'Professional WordPress websites that make your business exist online. Fast, secure, and optimized for conversions.',
    features: ['Custom design', 'Mobile responsive', 'SEO optimized', 'Fast loading'],
    color: 'bg-blue-50 text-blue-600',
  },
  {
    icon: Zap,
    title: 'Conversion Systems',
    description: 'Turn visitors into leads with strategic forms, landing pages, and conversion funnels designed to maximize results.',
    features: ['Lead capture forms', 'Landing pages', 'A/B testing', 'Conversion tracking'],
    color: 'bg-green-50 text-green-600',
  },
  {
    icon: TrendingUp,
    title: 'Traffic Engines',
    description: 'Drive qualified traffic to your site through SEO, content marketing, and paid advertising campaigns.',
    features: ['SEO optimization', 'Content strategy', 'Google Ads', 'Social media ads'],
    color: 'bg-purple-50 text-purple-600',
  },
  {
    icon: BarChart3,
    title: 'Growth Intelligence',
    description: 'Data-driven optimization and continuous improvement to scale your results over time.',
    features: ['Analytics setup', 'Performance reports', 'Growth strategies', 'Ongoing optimization'],
    color: 'bg-orange-50 text-orange-600',
  },
];

export function Services() {
  return (
    <div className="bg-white overflow-x-hidden">
      {/* Hero */}
      <Section>
        <Container>
          <AnimatedSection>
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-display-2 mb-6 text-zinc-900 text-balance">
                Digital Infrastructure Services
              </h1>
              <p className="text-body-lg text-zinc-600 mb-8 max-w-2xl mx-auto">
                We don't build websites. We install complete digital systems that turn visitors into customers and scale your business.
              </p>
            </div>
          </AnimatedSection>
        </Container>
      </Section>

      {/* Services Grid */}
      <Section variant="light">
        <Container>
          <AnimatedSection>
            <div className="text-center mb-16">
              <h2 className="text-h1 mb-4 text-zinc-900">Four Layers of Infrastructure</h2>
              <p className="text-body-lg text-zinc-600 max-w-2xl mx-auto">
                Each layer builds on the previous to create a complete conversion system
              </p>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {services.map((service) => {
              const Icon = service.icon;
              return (
                <AnimatedSection key={service.title}>
                  <Card className="h-full hover:shadow-lg transition-all duration-300 group">
                    <div className="p-8">
                      <div className={`w-14 h-14 ${service.color} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                        <Icon className="w-7 h-7" />
                      </div>
                      <h3 className="text-h3 mb-4 text-zinc-900">{service.title}</h3>
                      <p className="text-body text-zinc-600 mb-6">{service.description}</p>
                      <ul className="space-y-3 mb-8">
                        {service.features.map((feature) => (
                          <li key={feature} className="flex items-center gap-3 text-body-sm text-zinc-700">
                            <div className="w-1.5 h-1.5 bg-primary-600 rounded-full" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                      <Link to="/contact">
                        <Button variant="outline" className="group-hover:border-primary-600 group-hover:text-primary-600 transition-colors">
                          Learn More
                          <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                        </Button>
                      </Link>
                    </div>
                  </Card>
                </AnimatedSection>
              );
            })}
          </div>
        </Container>
      </Section>

      {/* CTA */}
      <Section>
        <Container>
          <AnimatedSection>
            <div className="max-w-3xl mx-auto text-center bg-zinc-900 rounded-2xl p-12 lg:p-16">
              <h2 className="text-h1 text-white mb-6 text-balance">
                Ready to Install Your Digital Infrastructure?
              </h2>
              <p className="text-body-lg text-zinc-300 mb-8">
                Let's discuss how we can transform your online presence into a conversion system.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/contact">
                  <Button size="lg" variant="secondary" className="w-full sm:w-auto">
                    Schedule a Call
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

