import { Link } from 'react-router-dom';
import { Button, Card } from '../components/ui';
import { Plan } from '../types';
import { Check, X } from 'lucide-react';

const plans = [
  {
    name: Plan.FOUNDATION,
    price: 99,
    salesStory: 'You exist online.',
    features: {
      website: '5 pages',
      hosting: true,
      security: true,
      speed: 'Basic',
      blog: false,
      analytics: false,
      leadForms: 1,
      bookingCalendar: false,
      crmIntegration: false,
      emailAutomation: false,
      conversionTracking: false,
      monthlyReports: false,
      seo: false,
      googleAds: false,
      prioritySupport: false,
    },
  },
  {
    name: Plan.GROWTH,
    price: 179,
    salesStory: 'You collect leads.',
    features: {
      website: '10 pages',
      hosting: true,
      security: true,
      speed: 'Advanced',
      blog: true,
      analytics: true,
      leadForms: 3,
      bookingCalendar: 'add-on',
      crmIntegration: 'add-on',
      emailAutomation: false,
      conversionTracking: false,
      monthlyReports: false,
      seo: 'add-on',
      googleAds: false,
      prioritySupport: false,
    },
  },
  {
    name: Plan.SCALE,
    price: 299,
    salesStory: 'You convert leads.',
    features: {
      website: 'Unlimited',
      hosting: true,
      security: true,
      speed: 'Pro',
      blog: true,
      analytics: true,
      leadForms: 'Unlimited',
      bookingCalendar: true,
      crmIntegration: true,
      emailAutomation: 'add-on',
      conversionTracking: true,
      monthlyReports: true,
      seo: true,
      googleAds: 'add-on',
      prioritySupport: true,
    },
  },
  {
    name: Plan.DOMINANCE,
    price: 599,
    salesStory: 'We actively grow your business.',
    features: {
      website: 'Unlimited',
      hosting: true,
      security: true,
      speed: 'Pro',
      blog: true,
      analytics: true,
      leadForms: 'Unlimited',
      bookingCalendar: true,
      crmIntegration: true,
      emailAutomation: true,
      conversionTracking: true,
      monthlyReports: true,
      seo: true,
      googleAds: true,
      prioritySupport: true,
    },
  },
];

const addons = [
  { name: 'Booking Calendar', price: 59, period: 'mo' },
  { name: 'Lead Capture Form', price: 39, period: 'mo' },
  { name: 'CRM (lead tracking)', price: 79, period: 'mo' },
  { name: 'Automated Email Follow-ups', price: 99, period: 'mo' },
  { name: 'Google Analytics Setup', price: 49, period: 'one-time' },
  { name: 'SEO Optimization', price: 249, period: 'mo' },
  { name: 'Blog Writing (4 posts)', price: 399, period: 'mo' },
  { name: 'Google Ads Mgmt', price: 499, period: 'mo' },
  { name: 'Facebook Ads Mgmt', price: 399, period: 'mo' },
  { name: 'Heatmaps & User Tracking', price: 79, period: 'mo' },
];

const featureLabels: Record<string, string> = {
  website: 'Website (WordPress)',
  hosting: 'Hosting + SSL',
  security: 'Security & Backups',
  speed: 'Speed Optimization',
  blog: 'Blog / News',
  analytics: 'Google Analytics',
  leadForms: 'Lead Forms',
  bookingCalendar: 'Booking Calendar',
  crmIntegration: 'CRM Integration',
  emailAutomation: 'Email Automation',
  conversionTracking: 'Conversion Tracking',
  monthlyReports: 'Monthly Reports',
  seo: 'SEO Optimization',
  googleAds: 'Google Ads Mgmt',
  prioritySupport: 'Priority Support',
};

export function Pricing() {
  return (
    <div className="bg-white py-24">
      <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-zinc-900 mb-4">
            Pricing Plans
          </h1>
          <p className="text-xl text-zinc-600 max-w-2xl mx-auto">
            Choose the plan that fits your needs. All plans include setup and hosting.
          </p>
        </div>

        {/* Setup Cost */}
        <div className="max-w-2xl mx-auto mb-16">
          <Card className="bg-primary-50 border-primary-200">
            <div className="text-center py-8">
              <h2 className="text-2xl font-bold text-zinc-900 mb-2">One-Time Setup Fee</h2>
              <p className="text-5xl font-bold text-primary-600 mb-2">$299</p>
              <p className="text-zinc-600">One-time setup fee applies to all plans</p>
            </div>
          </Card>
        </div>

        {/* Plans Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {plans.map((plan) => (
            <Card key={plan.name} className="relative" hover>
              <div className="p-6">
                <h3 className="text-2xl font-bold text-zinc-900 mb-2">{plan.name}</h3>
                <p className="text-sm text-zinc-600 mb-4 italic">{plan.salesStory}</p>
                <div className="mb-6">
                  <span className="text-4xl font-bold text-zinc-900">${plan.price}</span>
                  <span className="text-zinc-600 ml-1">/month</span>
                </div>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-zinc-700">{plan.features.website}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-zinc-700">Hosting + SSL</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-zinc-700">Security & Backups</span>
                  </li>
                </ul>
                <Link to="/signup" className="block">
                  <Button className="w-full">Get Started</Button>
                </Link>
              </div>
            </Card>
          ))}
        </div>

        {/* Feature Comparison Table */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-zinc-900 mb-8 text-center">Feature Comparison</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-zinc-200 border border-zinc-200 rounded-lg">
              <thead className="bg-zinc-50">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-zinc-900">Feature</th>
                  {plans.map((plan) => (
                    <th key={plan.name} className="px-6 py-4 text-center text-sm font-semibold text-zinc-900">
                      {plan.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-zinc-200">
                {Object.entries(featureLabels).map(([key, label]) => (
                  <tr key={key}>
                    <td className="px-6 py-4 text-sm font-medium text-zinc-900">{label}</td>
                    {plans.map((plan) => {
                      const value = plan.features[key as keyof typeof plan.features];
                      return (
                        <td key={plan.name} className="px-6 py-4 text-center text-sm">
                          {value === true ? (
                            <Check className="w-5 h-5 text-green-600 mx-auto" />
                          ) : value === false ? (
                            <X className="w-5 h-5 text-zinc-300 mx-auto" />
                          ) : value === 'add-on' ? (
                            <span className="text-zinc-500">Add-on</span>
                          ) : (
                            <span className="text-zinc-700">{value}</span>
                          )}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Add-ons Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-zinc-900 mb-4 text-center">Add-On Services</h2>
          <p className="text-center text-zinc-600 mb-8 max-w-3xl mx-auto">
            Add-ons are more expensive on lower tiers but included on higher tiers. For example, 
            SEO Optimization costs $249/mo as an add-on, but is included in Scale and Dominance plans.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {addons.map((addon) => (
              <Card key={addon.name}>
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-semibold text-zinc-900">{addon.name}</h3>
                    <p className="text-sm text-zinc-600">{addon.period === 'mo' ? 'Monthly' : 'One-time'}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xl font-bold text-zinc-900">${addon.price}</p>
                    <p className="text-sm text-zinc-600">/{addon.period === 'mo' ? 'mo' : 'once'}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
