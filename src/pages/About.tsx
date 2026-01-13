import { Link } from "react-router-dom";
import { Button, Card } from "../components/ui";
import { AnimatedSection } from "../components/ui/AnimatedSection";
import { Container } from "../components/ui/Container";
import { Section } from "../components/ui/Section";
import { Target, Users, Award, Zap } from "lucide-react";

const values = [
  {
    icon: Target,
    title: "Simple & Clear",
    description:
      "No confusing tech talk. We explain things in plain English and keep it simple.",
  },
  {
    icon: Users,
    title: "We're Here for You",
    description:
      "Your success matters to us. We're your website partner, not just a vendor.",
  },
  {
    icon: Award,
    title: "Reliable Service",
    description:
      "Your website stays online, stays secure, and stays updated. We make sure it works.",
  },
  {
    icon: Zap,
    title: "Always Improving",
    description:
      "We keep your website updated and help you grow. It gets better over time.",
  },
];

export function About() {
  return (
    <div className="bg-white overflow-x-hidden">
      {/* Hero */}
      <Section>
        <Container>
          <AnimatedSection>
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-display-2 mb-6 text-zinc-900 text-balance">
                We Manage Websites for Local Businesses
              </h1>
              <p className="text-body-lg text-zinc-600 mb-8 max-w-2xl mx-auto">
                We help local businesses get professional websites without the hassle. You focus on your business, we handle your website.
              </p>
            </div>
          </AnimatedSection>
        </Container>
      </Section>

      {/* Mission */}
      <Section variant="light">
        <Container>
          <AnimatedSection>
            <div className="max-w-4xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div>
                  <h2 className="text-h1 mb-6 text-zinc-900">Our Mission</h2>
                  <p className="text-body-lg text-zinc-600 mb-6">
                    We help local businesses get professional websites that work. Simple monthly service, no tech headaches.
                  </p>
                  <p className="text-body-lg text-zinc-600 mb-6">
                    Most website companies build you a site and leave. We build it and manage it every month. Updates, security, support—we handle it all.
                  </p>
                  <p className="text-body-lg text-zinc-600">
                    We work with local businesses that want a website partner, not another project to manage.
                  </p>
                </div>
                <div>
                  <div className="aspect-[4/3] bg-gradient-to-br from-zinc-100 to-zinc-200 rounded-2xl flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-32 h-32 bg-white rounded-2xl mx-auto mb-4 shadow-lg flex items-center justify-center">
                        <span className="text-4xl font-bold text-zinc-400">
                          RT
                        </span>
                      </div>
                      <p className="text-body-sm text-zinc-500">
                        Visual placeholder
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </Container>
      </Section>

      {/* Values */}
      <Section>
        <Container>
          <AnimatedSection>
            <div className="text-center mb-16">
              <h2 className="text-h1 mb-4 text-zinc-900">Our Values</h2>
              <p className="text-body-lg text-zinc-600 max-w-2xl mx-auto">
                The principles that guide how we work and what we deliver
              </p>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value) => {
              const Icon = value.icon;
              return (
                <AnimatedSection key={value.title}>
                  <Card className="text-center hover:shadow-lg transition-shadow duration-300">
                    <div className="p-8">
                      <div className="w-16 h-16 bg-primary-50 rounded-xl flex items-center justify-center mx-auto mb-6">
                        <Icon className="w-8 h-8 text-primary-600" />
                      </div>
                      <h3 className="text-h3 mb-4 text-zinc-900">
                        {value.title}
                      </h3>
                      <p className="text-body text-zinc-600">
                        {value.description}
                      </p>
                    </div>
                  </Card>
                </AnimatedSection>
              );
            })}
          </div>
        </Container>
      </Section>

      {/* Approach */}
      <Section variant="light">
        <Container>
          <AnimatedSection>
            <div className="max-w-4xl mx-auto">
              <h2 className="text-h1 mb-12 text-center text-zinc-900">
                How We're Different
              </h2>
              <div className="space-y-8">
                {[
                  {
                    title: "We Handle Everything",
                    description:
                      "Website, hosting, security, updates—we manage it all so you don't have to think about it.",
                  },
                  {
                    title: "Simple Monthly Service",
                    description:
                      "One monthly fee covers everything. No surprise charges. No complicated contracts.",
                  },
                  {
                    title: "We Help You Grow",
                    description:
                      "We add tools like contact forms and booking calendars. We help you get more customers.",
                  },
                  {
                    title: "We're Your Partner",
                    description:
                      "We're here when you need us. Email support, quick fixes, and help when something comes up.",
                  },
                ].map((item) => (
                  <div
                    key={item.title}
                    className="flex items-start gap-6 pb-8 border-b border-zinc-200 last:border-0"
                  >
                    <div className="flex-shrink-0 w-2 h-2 bg-primary-600 rounded-full mt-3" />
                    <div>
                      <h3 className="text-h3 mb-3 text-zinc-900">
                        {item.title}
                      </h3>
                      <p className="text-body-lg text-zinc-600">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </AnimatedSection>
        </Container>
      </Section>

      {/* CTA */}
      <Section>
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
                    Get in Touch
                  </Button>
                </Link>
                <Link to="/pricing">
                  <Button
                    size="lg"
                    variant="outline"
                    className="w-full sm:w-auto"
                  >
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
