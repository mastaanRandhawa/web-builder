import { Link } from "react-router-dom";
import { Button, Card } from "../components/ui";
import { AnimatedSection } from "../components/ui/AnimatedSection";
import { Container } from "../components/ui/Container";
import { Section } from "../components/ui/Section";
import { ArrowRight, Check, X } from "lucide-react";

export function Landing() {
  return (
    <div className="bg-white overflow-x-hidden">
      {/* HERO SECTION */}
      <Section className="min-h-screen flex items-center">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <AnimatedSection>
              <div>
                <h1 className="text-display-1 mb-6 text-brand-dark text-balance leading-tight">
                  Your Website, Managed Monthly
                </h1>
                <p className="text-display-3 text-primary-600 mb-8 font-semibold">
                  We handle your website so you can run your business.
                </p>
                <p className="text-body-lg text-zinc-700 mb-10 max-w-xl leading-relaxed">
                  Professional website, hosting, updates, and support—all included in one monthly fee. No developers to hire. No tech headaches.
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
                    <p className="text-body text-white/80">Website Preview</p>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </Container>
      </Section>

      {/* PROBLEM SECTION */}
      <Section variant="light">
        <Container>
          <AnimatedSection>
            <div className="max-w-3xl mx-auto text-center mb-16">
              <h2 className="text-display-3 mb-6 text-brand-dark">
                Managing a website shouldn't be your job.
              </h2>
            </div>
          </AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-12">
            {[
              {
                title: "You're stuck managing your website",
                description: "Updates, hosting, security—it's all on you, taking time away from your business.",
              },
              {
                title: "Hiring developers is expensive",
                description: "Every change costs money. You need a simple monthly solution instead.",
              },
              {
                title: "Your website isn't bringing in customers",
                description: "It exists, but it's not helping you grow. You need someone to make it work.",
              },
            ].map((problem) => (
              <AnimatedSection key={problem.title}>
                <Card className="h-full text-center hover:shadow-lg transition-all duration-300">
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
                You need a website partner, not another project to manage.
              </p>
            </div>
          </AnimatedSection>
        </Container>
      </Section>

      {/* DIFFERENCE SECTION */}
      <Section>
        <Container>
          <AnimatedSection>
            <div className="text-center mb-16">
              <h2 className="text-display-3 mb-4 text-brand-dark">
                We manage your website every month. You focus on your business.
              </h2>
            </div>
          </AnimatedSection>
          <AnimatedSection>
            <div className="max-w-4xl mx-auto">
              {/* Desktop Table */}
              <div className="hidden md:block">
                <Card className="overflow-hidden">
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
                        { feature: "Website", typical: "One-time build", us: "Monthly managed service" },
                        { feature: "Hosting & Updates", typical: "You handle it", us: "We handle everything" },
                        { feature: "Support", typical: "Find your own help", us: "We're your team" },
                        { feature: "Changes", typical: "Pay per change", us: "Included monthly" },
                        { feature: "Growth", typical: "You figure it out", us: "We help you grow" },
                      ].map((row) => (
                        <tr key={row.feature} className="hover:bg-zinc-50 transition-colors">
                          <td className="py-4 px-6 text-body font-medium text-brand-dark">{row.feature}</td>
                          <td className="py-4 px-6 text-center text-body text-zinc-600">{row.typical}</td>
                          <td className="py-4 px-6 text-center text-body font-medium text-primary-600">{row.us}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </Card>
              </div>

              {/* Mobile Cards */}
              <div className="md:hidden space-y-4">
                {[
                  { feature: "Delivery", typical: "One-time website", us: "Ongoing growth platform" },
                  { feature: "Management", typical: "You manage hosting", us: "We manage everything" },
                  { feature: "Tracking", typical: "No tracking", us: "Full conversion intelligence" },
                  { feature: "Follow-up", typical: "No follow-up", us: "Automated systems" },
                  { feature: "Decisions", typical: "Guessing", us: "Data-driven decisions" },
                ].map((row) => (
                  <Card key={row.feature} className="p-6">
                    <h3 className="text-h4 mb-4 text-brand-dark font-heading">{row.feature}</h3>
                    <div className="space-y-3">
                      <div className="pb-3 border-b border-zinc-200">
                        <p className="text-body-sm text-zinc-500 mb-1">Typical Agency</p>
                        <p className="text-body text-zinc-700">{row.typical}</p>
                      </div>
                      <div>
                        <p className="text-body-sm text-primary-600 font-medium mb-1">Randhawa & Tomar Digital</p>
                        <p className="text-body font-medium text-primary-600">{row.us}</p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </AnimatedSection>
        </Container>
      </Section>

      {/* FOUR LAYERS SECTION */}
      <Section variant="light">
        <Container>
          <AnimatedSection>
            <div className="text-center mb-16">
              <h2 className="text-display-3 mb-4 text-brand-dark">
                Everything you need, included monthly.
              </h2>
            </div>
          </AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {[
              {
                title: "Professional Website",
                description: "Your business online, done right",
                color: "bg-primary-600",
              },
              {
                title: "Hosting & Security",
                description: "Fast, secure, always online",
                color: "bg-accent",
              },
              {
                title: "Updates & Support",
                description: "We keep it running smoothly",
                color: "bg-primary-400",
              },
              {
                title: "Growth Tools",
                description: "Forms, booking, and more",
                color: "bg-primary-700",
              },
            ].map((layer) => (
              <AnimatedSection key={layer.title}>
                <Card className="text-center hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
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
        </Container>
      </Section>

      {/* HOW IT WORKS SECTION */}
      <Section>
        <Container>
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
                  title: "We set up your website",
                  description: "Professional site, hosting, and security—all included. We handle the setup so you don't have to.",
                },
                {
                  step: "2",
                  title: "We manage it every month",
                  description: "Updates, backups, security, and support. You focus on your business, we handle the website.",
                },
                {
                  step: "3",
                  title: "We help you grow",
                  description: "Simple tools like forms and booking calendars. We make it easy for customers to find and contact you.",
                },
              ].map((step) => (
                <AnimatedSection key={step.step}>
                  <div className="relative text-center">
                    <div className="w-16 h-16 bg-primary-600 rounded-full mx-auto mb-6 flex items-center justify-center text-white text-2xl font-bold">
                      {step.step}
                    </div>
                    <h3 className="text-h2 mb-4 text-brand-dark">{step.title}</h3>
                    <p className="text-body text-zinc-600 leading-relaxed">{step.description}</p>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      {/* WHAT YOU GET SECTION */}
      <Section variant="light">
        <Container>
          <AnimatedSection>
            <div className="text-center mb-16">
              <h2 className="text-display-3 mb-4 text-brand-dark">
                What's Included
              </h2>
            </div>
          </AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {[
              "Professional website",
              "Hosting included",
              "Security & backups",
              "Contact forms",
              "Booking calendar",
              "Monthly updates",
              "Email support",
              "No long-term contracts",
            ].map((feature) => (
              <AnimatedSection key={feature}>
                <Card className="hover:shadow-md hover:-translate-y-1 transition-all duration-300">
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
        </Container>
      </Section>

      {/* WHO IT'S FOR SECTION */}
      <Section>
        <Container>
          <AnimatedSection>
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-display-3 mb-8 text-brand-dark">
                Perfect for local businesses
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
        </Container>
      </Section>

      {/* PRICING TEASER SECTION */}
      <Section variant="light">
        <Container>
          <AnimatedSection>
            <div className="max-w-3xl mx-auto text-center bg-white rounded-2xl p-12 shadow-lg">
              <h2 className="text-h1 mb-4 text-brand-dark">
                Plans start at $99/month
              </h2>
              <p className="text-body-lg text-zinc-600 mb-8">
                All plans include your website, hosting, security, and monthly support. No surprises.
              </p>
              <Link to="/pricing">
                <Button size="lg" className="w-full sm:w-auto">
                  View Plans
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
          </AnimatedSection>
        </Container>
      </Section>

      {/* TRUST SECTION */}
      <Section>
        <Container>
          <AnimatedSection>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto text-center">
              {[
                "Simple monthly pricing",
                "No tech knowledge needed",
                "We handle everything for you",
              ].map((statement) => (
                <div key={statement} className="p-6">
                  <p className="text-h3 text-brand-dark font-medium">{statement}</p>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </Container>
      </Section>

      {/* FINAL CTA SECTION */}
      <Section className="bg-gradient-to-br from-primary-600 to-primary-800">
        <Container>
          <AnimatedSection>
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-display-3 text-white mb-8 text-balance">
                Ready to get a website that works for you?
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
        </Container>
      </Section>
    </div>
  );
}
