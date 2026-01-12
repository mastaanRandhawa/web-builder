import { Link } from "react-router-dom";
import { Button, Card } from "../components/ui";
import { AnimatedSection } from "../components/ui/AnimatedSection";
import { Target, Users, Award, Zap } from "lucide-react";

const values = [
  {
    icon: Target,
    title: "Results-Driven",
    description:
      "We measure success by the outcomes we deliver, not the hours we bill.",
  },
  {
    icon: Users,
    title: "Client-Focused",
    description:
      "Your success is our success. We're invested in your long-term growth.",
  },
  {
    icon: Award,
    title: "Enterprise-Grade",
    description:
      "We build systems that scale, using proven methodologies and best practices.",
  },
  {
    icon: Zap,
    title: "Continuous Improvement",
    description:
      "We never stop optimizing. Your system gets better over time, not worse.",
  },
];

export function About() {
  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="section-padding">
        <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-display-2 mb-6 text-zinc-900 text-balance">
                We Install Digital Infrastructure
              </h1>
              <p className="text-body-lg text-zinc-600 mb-8 max-w-2xl mx-auto">
                We're not a web design agency. We're infrastructure engineers
                who build conversion systems for serious businesses.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Mission */}
      <section className="section-padding bg-zinc-50">
        <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="max-w-4xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div>
                  <h2 className="text-h1 mb-6 text-zinc-900">Our Mission</h2>
                  <p className="text-body-lg text-zinc-600 mb-6">
                    We exist to install digital infrastructure that transforms
                    how businesses acquire and serve customers online.
                  </p>
                  <p className="text-body-lg text-zinc-600 mb-6">
                    Most agencies sell websites. We sell systems. Systems that
                    convert visitors into customers, scale with your business,
                    and improve over time.
                  </p>
                  <p className="text-body-lg text-zinc-600">
                    We work with businesses that are serious about growth, not
                    just looking for a pretty website.
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
        </div>
      </section>

      {/* Values */}
      <section className="section-padding">
        <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
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
        </div>
      </section>

      {/* Approach */}
      <section className="section-padding bg-zinc-50">
        <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="max-w-4xl mx-auto">
              <h2 className="text-h1 mb-12 text-center text-zinc-900">
                How We're Different
              </h2>
              <div className="space-y-8">
                {[
                  {
                    title: "We Think in Systems, Not Pages",
                    description:
                      "Every element we build connects to a larger conversion system. Nothing exists in isolation.",
                  },
                  {
                    title: "We Measure Everything",
                    description:
                      "If we can't measure it, we don't build it. Data drives every decision we make.",
                  },
                  {
                    title: "We Optimize Continuously",
                    description:
                      "Your system gets better over time through testing, analysis, and iteration.",
                  },
                  {
                    title: "We Scale With You",
                    description:
                      "We build infrastructure that grows with your business, not something you outgrow.",
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
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding">
        <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-h1 mb-6 text-zinc-900 text-balance">
                Ready to Work Together?
              </h2>
              <p className="text-body-lg text-zinc-600 mb-8">
                Let's discuss how we can install digital infrastructure for your
                business.
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
        </div>
      </section>
    </div>
  );
}
