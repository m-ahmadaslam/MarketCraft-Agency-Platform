"use client"

import { useState } from "react"
import { Linkedin } from "lucide-react"
import Link from "next/link"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import Image from "next/image"  

const Footer = () => {
  const [showPrivacyModal, setShowPrivacyModal] = useState(false)
  const [showTermsModal, setShowTermsModal] = useState(false)

  return (
    <footer id="contact" className="w-full bg-dark-slate-gray text-white">
      {/* Top wave decoration */}
      <div className="wave-top h-12 w-full overflow-hidden">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="h-full w-full fill-mint-green">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" />
        </svg>
      </div>

      {/* Main footer content */}
      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
          {/* Logo and intro */}
          <div className="space-y-4">
            <div className="flex items-center">
              <Image
                  src="/logo/logom.png"
                  alt="Market Craft Logo"
                  width={48}
                  height={48}
                  className="rounded-full bg-transparent"
                />
                
              <h2 className="ml-3 text-2xl font-bold">Market Craft</h2>
            </div>
            <p className="text-[#7F8C8D] max-w-xs">
              Crafting Digital Futures. Dedicated to providing innovative solutions for a better tomorrow.
            </p>
          </div>

          {/* Contact info */}
          <div>
            <h3 className="mb-5 text-xl font-semibold text-[#A8E6CF]">Contact Us</h3>
            <ul className="space-y-4 text-[#7F8C8D]">
              <li className="flex items-start">
                <span className="mr-3 mt-1 text-[#FF6F61]">📍</span>
                <a
                  href="https://maps.app.goo.gl/62zM2HvC7b3xbMBD9?g_st=iw"          
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline text-blue-600"
                >
                  Plot no 181, 1st floor, Commercial Area Sector C Bahria Town, Lahore, 54000
                </a>
              </li>

              <li className="flex items-start">
                <span className="mr-3 mt-1 text-[#FF6F61]">📞</span>
                <a href="tel:+923049966614" className="text-[#7F8C8D] hover:text-[#4A90E2] transition-colors">
                  +92 304 9966614
                </a>
              </li>

              <li className="flex items-start">
                <span className="mr-3 mt-1 text-[#FF6F61]">✉️</span>
                <a href="mailto:info@marketcraft.com" className="hover:text-[#4A90E2] transition-colors">
                  info@marketcraft.com
                </a>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
          
              <h3 className="mb-5 text-xl font-semibold text-[#A8E6CF]">Quick Links</h3>
              <ul className="space-y-3">
                {[
                  { label: "About Us", path: "/#hero-section" },
                  { label: "Services", path: "/#services" },
                  { label: "Blog/Newsletter", path: "/#blog" },
                  
                ].map(({ label, path }) => (
                  <li key={label}>
                    <Link
                      href={path}
                      className="group flex items-center text-[#7F8C8D] transition-colors hover:text-[#4A90E2]"
                    >
                      <span className="mr-2 h-1.5 w-1.5 rounded-full bg-[#FF6F61] transition-all group-hover:bg-[#4A90E2] group-hover:scale-150"></span>
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>

            {/* Social icons */}
            <div className="mt-6 flex space-x-4">
              {/*<a
                href="#"
                className="group flex h-10 w-10 items-center justify-center rounded-full bg-white/10 transition-all hover:bg-[#4A90E2]"
                aria-label="Facebook"
              >
                <Facebook size={20} className="text-white" />
              </a>
              <a
                href="#"
                className="group flex h-10 w-10 items-center justify-center rounded-full bg-white/10 transition-all hover:bg-[#FF6F61]"
                aria-label="Instagram"
              >
                <Instagram size={20} className="text-white" />
              </a>
              <a
                href="#"
                className="group flex h-10 w-10 items-center justify-center rounded-full bg-white/10 transition-all hover:bg-[#A8E6CF]"
                aria-label="Twitter"
              >
                <Twitter size={20} className="text-white" />
              </a>*/}
               <a
                href="https://www.linkedin.com/company/marketcraft-1/"
                 target="_blank"
                className="group flex h-10 w-10 items-center justify-center rounded-full bg-white/10 transition-all hover:bg-[#A8E6CF]"
                aria-label="Twitter"
              >
                <Linkedin size={20} className="text-white" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10 py-6">
        <div className="container mx-auto flex flex-col items-center justify-between px-4 md:flex-row">
          <p className="mb-4 text-center text-sm text-[#7F8C8D] md:mb-0">
            © {new Date().getFullYear()} Market Craft. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <button onClick={() => setShowPrivacyModal(true)} className="text-sm text-[#7F8C8D] hover:text-[#A8E6CF]">
              Privacy Policy
            </button>
            <button onClick={() => setShowTermsModal(true)} className="text-sm text-[#7F8C8D] hover:text-[#A8E6CF]">
              Terms of Service
            </button>
          </div>
        </div>
      </div>

      {/* Privacy Policy Modal */}
      <Dialog open={showPrivacyModal} onOpenChange={setShowPrivacyModal}>
  <DialogContent className="max-w-3xl bg-white max-h-[80vh] overflow-y-auto">
    <DialogHeader>
      <DialogTitle className="text-2xl font-bold">Privacy Policy</DialogTitle>
    </DialogHeader>
        <div className="mt-4 space-y-4">
          <h3 className="text-lg font-semibold">1. Introduction</h3>
          <p>
            Welcome to Market Craft’s Privacy Policy. Your privacy is important to us. This policy outlines what information we collect, how we use it, and how we protect it.
          </p>

          <h3 className="text-lg font-semibold">2. Information We Collect</h3>
          <p>
            When you use our website—subscribe to our newsletter, read our blogs, or fill out our contact form—we may collect:
          </p>
          <ul className="list-disc list-inside space-y-1">
            <li>Your name and email address when you subscribe to our newsletter or reach out through the contact form.</li>
            <li>Any message or inquiry details submitted through the contact form.</li>
            <li>Basic technical data (like browser type or IP address) for analytics and performance monitoring.</li>
          </ul>

          <h3 className="text-lg font-semibold">3. How We Use Your Information</h3>
          <p>We only use your information to:</p>
          <ul className="list-disc list-inside space-y-1">
            <li>Send you occasional updates, blog posts, and marketing tips if you’ve subscribed to our newsletter.</li>
            <li>Respond to your inquiries and provide assistance through our contact form.</li>
            <li>Improve the performance, usability, and content of our website.</li>
          </ul>

          <h3 className="text-lg font-semibold">4. Data Security</h3>
          <p>
            We use secure technologies (like SSL encryption) and best practices to ensure your information is protected. Your data is never sold or shared with third parties.
          </p>

          <h3 className="text-lg font-semibold">5. Your Rights</h3>
          <p>
            You have full control over your data. You can:
          </p>
          <ul className="list-disc list-inside space-y-1">
            <li>Unsubscribe from our newsletter at any time.</li>
            <li>Request a copy of your data or ask us to delete it permanently.</li>
            <li>Contact us to correct or update your information.</li>
          </ul>

          <h3 className="text-lg font-semibold">6. Contact Us</h3>
          <p>
            Have questions or concerns? Reach out to us anytime at{" "}
            <a href="mailto:hello@marketcraft.pk" className="text-softCoral">hello@marketcraft.pk</a>. We’re happy to help.
          </p>
        </div>
      </DialogContent>
    </Dialog>


      

{/* Terms of Service Modal */}
<Dialog open={showTermsModal} onOpenChange={setShowTermsModal}>
  <DialogContent className="max-w-3xl max-h-[80vh] bg-white overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">Terms of Service</DialogTitle>
          </DialogHeader>
          <div className="mt-4 space-y-4">
            <h3 className="text-lg font-semibold">1. Acceptance of Terms</h3>
            <p>
              By using Market Craft’s website—including subscribing to our newsletter, reading blog content, or submitting a contact form—you agree to abide by these Terms of Service.
            </p>

            <h3 className="text-lg font-semibold">2. Use of Services</h3>
            <p>
              You agree to use our content and services responsibly and legally. Any misuse or harmful activity (e.g., spamming, hacking, or misrepresentation) is strictly prohibited.
            </p>

            <h3 className="text-lg font-semibold">3. Intellectual Property</h3>
            <p>
              All visuals, content, design, logos, and code on this site are the property of Market Craft. You may not reuse, reproduce, or distribute any material without prior written permission.
            </p>

            <h3 className="text-lg font-semibold">4. Limitation of Liability</h3>
            <p>
              While we aim for accuracy and performance, Market Craft is not liable for any indirect or consequential damages arising from the use of our website or information provided therein.
            </p>

            <h3 className="text-lg font-semibold">5. Changes to Terms</h3>
            <p>
              Market Craft reserves the right to update these terms at any time. Continued use of the website after updates implies your acceptance of the revised terms.
            </p>

            <h3 className="text-lg font-semibold">6. Termination</h3>
            <p>
              We reserve the right to restrict access or terminate service to anyone who violates these terms or engages in behavior that threatens the integrity of our platform.
            </p>
          </div>
  </DialogContent>
</Dialog>

    </footer>
  )
}

export default Footer
