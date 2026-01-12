import { Link } from 'react-router-dom';
import { Button } from '../components/ui';
import { AnimatedSection } from '../components/ui/AnimatedSection';
import { ArrowRight } from 'lucide-react';

export function Landing() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden section-padding">
        <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="text-center max-w-4xl mx-auto">
              <h1 className="text-display-1 mb-6 text-zinc-900 text-balance leading-tight">
                Randhawa & Tomar Digital
              </h1>
              <p className="text-display-3 text-zinc-600 mb-8 font-medium">
                Websites. Systems. Growth.
              </p>
              <p className="text-body-lg text-zinc-700 mb-12 max-w-2xl mx-auto leading-relaxed">
                We don't sell websites. We install digital systems that turn visitors into customers.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/contact">
                  <Button size="lg" className="w-full sm:w-auto group">
                    Schedule a Call
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Link to="/pricing">
                  <Button variant="outline" size="lg" className="w-full sm:w-auto">
                    View Pricing
                  </Button>
                </Link>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Positioning Section */}
      <section className="section-padding bg-zinc-50">
        <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="max-w-3xl mx-auto text-center">
              <p className="text-h2 text-zinc-700 leading-relaxed mb-8">
                We deploy digital infrastructure for local businesses. We manage your entire online presence.
              </p>
              <p className="text-body-lg text-zinc-600 leading-relaxed">
                From your website to your conversion systems, traffic engines, and growth intelligence—we handle it all so you can focus on what you do best.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Four Layers Section */}
      <section className="section-padding">
        <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="text-center mb-16">
              <h2 className="text-display-3 mb-4 text-zinc-900">
                Four Layers of Digital Infrastructure
              </h2>
              <p className="text-body-lg text-zinc-600 max-w-2xl mx-auto">
                Each layer builds on the previous one to create a complete system
              </p>
            </div>
          </AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                number: '1',
                title: 'Website Core',
                description: 'Makes the business exist online',
                color: 'bg-blue-500',
              },
              {
                number: '2',
                title: 'Conversion Systems',
                description: 'Turns visitors into leads',
                color: 'bg-green-500',
              },
              {
                number: '3',
                title: 'Traffic Engines',
                description: 'Sends people to the site',
                color: 'bg-yellow-500',
              },
              {
                number: '4',
                title: 'Growth Intelligence',
                description: 'Improves results over time',
                color: 'bg-purple-500',
              },
            ].map((layer) => (
              <AnimatedSection key={layer.number}>
                <div className="text-center group">
                  <div className={`w-20 h-20 ${layer.color} rounded-2xl mx-auto mb-6 flex items-center justify-center text-white text-3xl font-bold group-hover:scale-110 transition-transform duration-300`}>
                    {layer.number}
                  </div>
                  <h3 className="text-h3 font-bold text-zinc-900 mb-2">{layer.title}</h3>
                  <p className="text-body text-zinc-600">{layer.description}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="section-padding bg-zinc-50">
        <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="text-center mb-16">
              <h2 className="text-display-3 mb-4 text-zinc-900">
                How It Works
              </h2>
              <p className="text-body-lg text-zinc-600 max-w-2xl mx-auto">
                Three simple steps to transform your online presence
              </p>
            </div>
          </AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-5xl mx-auto">
            {[
              {
                step: '1',
                title: 'Deploy',
                description: 'We set up your website and digital infrastructure, ensuring everything is optimized and ready to convert.',
                color: 'bg-blue-100 text-blue-700',
              },
              {
                step: '2',
                title: 'Convert',
                description: 'We implement conversion systems that turn your website visitors into qualified leads and customers.',
                color: 'bg-green-100 text-green-700',
              },
              {
                step: '3',
                title: 'Grow',
                description: 'We continuously optimize and scale your systems, driving more traffic and improving conversion rates.',
                color: 'bg-purple-100 text-purple-700',
              },
            ].map((item) => (
              <AnimatedSection key={item.step}>
                <div className="text-center group">
                  <div className={`w-16 h-16 ${item.color} rounded-full mx-auto mb-6 flex items-center justify-center text-2xl font-bold group-hover:scale-110 transition-transform duration-300`}>
                    {item.step}
                  </div>
                  <h3 className="text-h2 font-bold text-zinc-900 mb-4">{item.title}</h3>
                  <p className="text-body text-zinc-600 leading-relaxed">{item.description}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding">
        <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="max-w-3xl mx-auto text-center bg-zinc-900 rounded-2xl p-12 lg:p-16">
              <h2 className="text-display-3 text-white mb-6 text-balance">
                Ready to Transform Your Online Presence?
              </h2>
              <p className="text-body-lg text-zinc-300 mb-8">
                See our pricing plans and get started today
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/pricing">
                  <Button size="lg" variant="secondary" className="w-full sm:w-auto">
                    View Pricing
                  </Button>
                </Link>
                <Link to="/contact">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto bg-white text-zinc-900 hover:bg-zinc-100">
                    Schedule a Call
                  </Button>
                </Link>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}
