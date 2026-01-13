import { Link } from 'react-router-dom';
import { Button, Card } from '../components/ui';
import { AnimatedSection } from '../components/ui/AnimatedSection';
import { Container } from '../components/ui/Container';
import { Section } from '../components/ui/Section';
import { ArrowRight, Globe, Zap, TrendingUp, BarChart3 } from 'lucide-react';

const services = [
  {
    icon: Globe,
    title: 'Your Website',
    description: 'Professional website that looks great and works on phones, tablets, and computers. We build it and keep it updated.',
    features: ['Professional design', 'Mobile friendly', 'Easy to update', 'Fast loading'],
    color: 'bg-blue-50 text-blue-600',
  },
  {
    icon: Zap,
    title: 'Hosting & Security',
    description: "Your website is always online, secure, and backed up. We handle all the technical stuff so you don't have to.",
    features: ['Fast hosting', 'SSL security', 'Regular backups', 'Always online'],
    color: 'bg-green-50 text-green-600',
  },
  {
    icon: TrendingUp,
    title: 'Contact Forms & Booking',
    description: 'Simple tools that help customers reach you. Contact forms, booking calendars, and more—all set up and working.',
    features: ['Contact forms', 'Booking calendar', 'Email notifications', 'Easy setup'],
    color: 'bg-purple-50 text-purple-600',
  },
  {
    icon: BarChart3,
    title: 'Support & Updates',
    description: "We're here when you need us. Monthly updates, security patches, and help when something needs fixing.",
    features: ['Monthly updates', 'Email support', 'Security updates', 'Quick fixes'],
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
                What's Included in Your Monthly Website
              </h1>
              <p className="text-body-lg text-zinc-600 mb-8 max-w-2xl mx-auto">
                Your monthly plan includes everything you need to have a professional website that works. No extra fees. No surprises.
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
              <h2 className="text-h1 mb-4 text-zinc-900">Everything You Need</h2>
              <p className="text-body-lg text-zinc-600 max-w-2xl mx-auto">
                Your website, hosting, security, and support—all included in one simple monthly fee
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
                      <Link to="/pricing">
                        <Button variant="outline" className="group-hover:border-primary-600 group-hover:text-primary-600 transition-colors">
                          See Pricing
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
                Ready to Get Started?
              </h2>
              <p className="text-body-lg text-zinc-300 mb-8">
                Let's talk about your business and how we can help you get a website that works.
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

