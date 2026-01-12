import { Link } from "react-router-dom";
import { Button, Card } from "../components/ui";
import { AnimatedSection } from "../components/ui/AnimatedSection";
import { ArrowRight, Check, X } from "lucide-react";

export function Landing() {
  return (
    <div className="bg-white">
      {/* HERO SECTION */}
      <section className="min-h-screen flex items-center section-padding">
        <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <AnimatedSection>
              <div>
                <h1 className="text-display-1 mb-6 text-brand-dark text-balance leading-tight">
                  Randhawa & Tomar Digital
                </h1>
                <p className="text-display-3 text-primary-600 mb-8 font-semibold">
                  Websites. Systems. Growth.
                </p>
                <p className="text-body-lg text-zinc-700 mb-10 max-w-xl leading-relaxed">
                  We don't sell websites. We install digital systems that turn visitors into customers.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link to="/pricing">
                    <Button size="lg" className="w-full sm:w-auto group">
                      View Pricing
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                  <Link to="/login">
                    <Button size="lg" variant="outline" className="w-full sm:w-auto">
                      Sign In
                    </Button>
                  </Link>
                </div>
              </div>
            </AnimatedSection>
            <AnimatedSection>
              <div className="relative">
                <div className="aspect-[4/3] bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 rounded-2xl shadow-2xl flex items-center justify-center">
                  <div className="text-center text-white p-8">
                    <div className="w-24 h-24 bg-white/20 rounded-xl mx-auto mb-6 flex items-center justify-center backdrop-blur-sm">
                      <span className="text-4xl font-bold">RT</span>
                    </div>
                    <p className="text-body text-white/80">SaaS Dashboard Preview</p>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* PROBLEM SECTION */}
      <section className="section-padding bg-brand-light">
        <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="max-w-3xl mx-auto text-center mb-16">
              <h2 className="text-display-3 mb-6 text-brand-dark">
                Most websites don't generate business.
              </h2>
            </div>
          </AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-12">
            {[
              {
                title: "Visitors come, but don't convert",
                description: "Your site gets traffic, but visitors leave without taking action.",
              },
              {
                title: "No follow-ups, no tracking, no automation",
                description: "You're missing leads and have no system to nurture them.",
              },
              {
                title: "Business owners don't know what's working",
                description: "Without data, you're making decisions in the dark.",
              },
            ].map((problem) => (
              <AnimatedSection key={problem.title}>
                <Card className="h-full text-center">
                  <div className="p-8">
                    <div className="w-12 h-12 bg-red-50 rounded-lg flex items-center justify-center mx-auto mb-4">
                      <X className="w-6 h-6 text-red-600" />
                    </div>
                    <h3 className="text-h3 mb-3 text-brand-dark">{problem.title}</h3>
                    <p className="text-body text-zinc-600">{problem.description}</p>
                  </div>
                </Card>
              </AnimatedSection>
            ))}
          </div>
          <AnimatedSection>
            <div className="text-center">
              <p className="text-h2 text-zinc-700 font-medium">
                A website without systems is just a digital business card.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* DIFFERENCE SECTION */}
      <section className="section-padding">
        <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="text-center mb-16">
              <h2 className="text-display-3 mb-4 text-brand-dark">
                We don't build pages. We deploy revenue infrastructure.
              </h2>
            </div>
          </AnimatedSection>
          <AnimatedSection>
            <div className="max-w-4xl mx-auto">
              <Card className="overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-zinc-200">
                        <th className="text-left py-4 px-6 text-body-sm font-semibold text-zinc-700"></th>
                        <th className="text-center py-4 px-6 text-body-sm font-semibold text-zinc-500">Typical Agency</th>
                        <th className="text-center py-4 px-6 text-body-sm font-semibold text-primary-600">Randhawa & Tomar Digital</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-200">
                      {[
                        { feature: "Delivery", typical: "One-time website", us: "Ongoing growth platform" },
                        { feature: "Management", typical: "You manage hosting", us: "We manage everything" },
                        { feature: "Tracking", typical: "No tracking", us: "Full conversion intelligence" },
                        { feature: "Follow-up", typical: "No follow-up", us: "Automated systems" },
                        { feature: "Decisions", typical: "Guessing", us: "Data-driven decisions" },
                      ].map((row) => (
                        <tr key={row.feature} className="hover:bg-zinc-50 transition-colors">
                          <td className="py-4 px-6 text-body font-medium text-brand-dark">{row.feature}</td>
                          <td className="py-4 px-6 text-center text-body text-zinc-600">{row.typical}</td>
                          <td className="py-4 px-6 text-center text-body font-medium text-primary-600">{row.us}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Card>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* FOUR LAYERS SECTION */}
      <section className="section-padding bg-brand-light">
        <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="text-center mb-16">
              <h2 className="text-display-3 mb-4 text-brand-dark">
                Your business grows in four layers.
              </h2>
            </div>
          </AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {[
              {
                title: "Website Core",
                description: "Makes your business exist online",
                color: "bg-primary-600",
              },
              {
                title: "Conversion Systems",
                description: "Turns visitors into leads",
                color: "bg-accent",
              },
              {
                title: "Traffic Engines",
                description: "Sends people to your site",
                color: "bg-primary-400",
              },
              {
                title: "Growth Intelligence",
                description: "Improves results over time",
                color: "bg-primary-700",
              },
            ].map((layer) => (
              <AnimatedSection key={layer.title}>
                <Card className="text-center hover:shadow-lg transition-all duration-300">
                  <div className="p-8">
                    <div className={`w-20 h-20 ${layer.color} rounded-2xl mx-auto mb-6 flex items-center justify-center text-white text-3xl font-bold`}>
                      {layer.title.charAt(0)}
                    </div>
                    <h3 className="text-h3 mb-3 text-brand-dark">{layer.title}</h3>
                    <p className="text-body text-zinc-600">{layer.description}</p>
                  </div>
                </Card>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS SECTION */}
      <section className="section-padding">
        <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="text-center mb-16">
              <h2 className="text-display-3 mb-4 text-brand-dark">
                How It Works
              </h2>
            </div>
          </AnimatedSection>
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  step: "1",
                  title: "We deploy your website & systems",
                  description: "Professional site, hosting, security, and conversion tools—all set up and ready.",
                },
                {
                  step: "2",
                  title: "We connect traffic, forms, tracking, and automation",
                  description: "Everything works together. Visitors become leads, leads become customers.",
                },
                {
                  step: "3",
                  title: "We monitor, optimize, and grow your business",
                  description: "Continuous improvement based on real data, not guesswork.",
                },
              ].map((step) => (
                <AnimatedSection key={step.step}>
                  <div className="relative">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-primary-600 rounded-full mx-auto mb-6 flex items-center justify-center text-white text-2xl font-bold">
                        {step.step}
                      </div>
                      <h3 className="text-h2 mb-4 text-brand-dark">{step.title}</h3>
                      <p className="text-body text-zinc-600 leading-relaxed">{step.description}</p>
                    </div>
                    {step.step !== "3" && (
                      <div className="hidden md:block absolute top-8 left-full w-full h-0.5 bg-zinc-200 -translate-x-1/2" style={{ width: 'calc(100% - 4rem)' }} />
                    )}
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* WHAT YOU GET SECTION */}
      <section className="section-padding bg-brand-light">
        <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="text-center mb-16">
              <h2 className="text-display-3 mb-4 text-brand-dark">
                What You Get
              </h2>
            </div>
          </AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {[
              "Professional website",
              "Hosting & security",
              "Lead capture",
              "Booking systems",
              "Analytics & tracking",
              "SEO & ads (higher tiers)",
              "Ongoing support",
            ].map((feature) => (
              <AnimatedSection key={feature}>
                <Card className="hover:shadow-md transition-all duration-300">
                  <div className="flex items-center gap-3 p-6">
                    <div className="w-6 h-6 bg-primary-600 rounded flex items-center justify-center flex-shrink-0">
                      <Check className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-body text-brand-dark font-medium">{feature}</span>
                  </div>
                </Card>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* WHO IT'S FOR SECTION */}
      <section className="section-padding">
        <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-display-3 mb-8 text-brand-dark">
                Built for serious local businesses
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-2xl mx-auto">
                {["Clinics", "Law firms", "Trades", "Gyms", "Restaurants", "Professional services"].map((business) => (
                  <div key={business} className="p-4 bg-brand-light rounded-lg">
                    <span className="text-body font-medium text-brand-dark">{business}</span>
                  </div>
                ))}
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* PRICING TEASER SECTION */}
      <section className="section-padding bg-brand-light">
        <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="max-w-3xl mx-auto text-center bg-white rounded-2xl p-12 shadow-lg">
              <h2 className="text-h1 mb-4 text-brand-dark">
                Plans start at $99/month
              </h2>
              <p className="text-body-lg text-zinc-600 mb-8">
                All plans include hosting, security, and support.
              </p>
              <Link to="/pricing">
                <Button size="lg" className="w-full sm:w-auto">
                  View Plans
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* TRUST SECTION */}
      <section className="section-padding">
        <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto text-center">
              {[
                "Designed for high-trust industries",
                "Built for conversion, not decoration",
                "Systems-driven digital growth",
              ].map((statement) => (
                <div key={statement} className="p-6">
                  <p className="text-h3 text-brand-dark font-medium">{statement}</p>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* FINAL CTA SECTION */}
      <section className="section-padding bg-gradient-to-br from-primary-600 to-primary-800">
        <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-display-3 text-white mb-8 text-balance">
                Ready to turn your website into a sales system?
              </h2>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/pricing">
                  <Button size="lg" variant="secondary" className="w-full sm:w-auto">
                    View Pricing
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
                <Link to="/login">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto bg-white text-primary-600 hover:bg-zinc-100 border-white">
                    Sign In
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
