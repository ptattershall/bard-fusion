import Image from 'next/image'
import { Button } from "@/components/ui/button"
import RegisterButton from '@/components/register-button'

import { landingMetadata } from './metadata'

export const metadata = landingMetadata;

export default function LandingPage() {
  return (
    <main className="flex-grow">
      <section className="bg-gradient-to-tr from-secondary to-primary py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-10 md:mb-0">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Where Creativity and Technology Fuse!</h1>
              <p className="text-xl mb-6">Empower your creative journey with BardFusion - the ultimate platform for independent creators and small business owners in storytelling industries.</p>
              <RegisterButton text="Get Started" />
            </div>
            <div className="md:w-1/2">
              <Image src="/bf_image.png" alt="BardFusion Creators" width={600} height={400} className="rounded-lg shadow-lg" />
            </div>
          </div>
        </section>

        <section id="features" className="py-20 bg-accent">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-12">Unleash Your Creative Potential</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { title: "Connect", description: "Network with like-minded creators across various disciplines." },
                { title: "Collaborate", description: "Find the perfect partners for your next big project." },
                { title: "Create", description: "Access tools and resources to bring your vision to life." },
                { title: "Share", description: "Showcase your work and upcoming events to a supportive community." },
                { title: "Grow", description: "Learn from others and expand your creative horizons." },
                { title: "Monetize", description: "Turn your passion into a sustainable business." }
              ].map((feature, index) => (
                <div key={index} className="bg-card p-6 rounded-lg shadow-md">
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-accent-foreground">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="creators" className="py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-12">Join Our Creative Community</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                "Animators", "Comic Artists", "Writers", "Filmmakers", "Fashion Designers", "Musicians", "Illustrators", "Game Developers"
              ].map((creator, index) => (
                <div key={index} className="text-center">
                  <div className="w-32 h-32 mx-auto bg-gradient-to-br from-blue-400 to-purple-500 rounded-full mb-4 flex items-center justify-center">
                    <span className="text-white text-4xl">{creator[0]}</span>
                  </div>
                  <p className="font-medium">{creator}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="pricing" className="py-20 bg-accent">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-12">Choose Your Creative Journey</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { name: "Starter", price: "$9.99", features: ["Basic networking", "Project sharing", "Community access"] },
                { name: "Pro", price: "$19.99", features: ["Advanced networking", "Collaboration tools", "Priority support", "Analytics dashboard"] },
                { name: "Enterprise", price: "Custom", features: ["Full platform access", "Dedicated account manager", "Custom integrations", "Team management"] }
              ].map((plan, index) => (
                <div key={index} className="bg-card p-8 rounded-lg shadow-md text-center">
                  <h3 className="text-2xl font-bold mb-4">{plan.name}</h3>
                  <p className="text-4xl font-bold mb-6">{plan.price}<span className="text-sm font-normal">/month</span></p>
                  <ul className="mb-8 space-y-2">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="text-accent-foreground">{feature}</li>
                    ))}
                  </ul>
                  <Button variant={index === 1 ? "default" : "outline"} className="w-full">Choose Plan</Button>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-accent/80 text-gray-900 dark:text-gray-100 py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Fuse Your Creativity?</h2>
            <p className="text-xl mb-8">Join BardFusion today and connect with a world of creative possibilities.</p>
            <Button size="lg" variant="secondary">Start Your Free Trial</Button>
          </div>
        </section>
      </main>
  )
}