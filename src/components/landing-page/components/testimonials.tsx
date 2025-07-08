"use client"

import { motion } from "framer-motion"
import TestimonialStack from "./testimonial-stack"

import { useState } from "react"
import ContactFormModal from "@/components/landing-page/components/contactform"

export default function Testimonials() {
  
  const [openContact, setOpenContact] = useState(false)
  return (
    <section className="py-24 bg-gradient-to-b from-snow-white to-mint-green relative overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-dark-slate-gray mb-4">What Our Clients Say</h2>
          <p className="text-lg text-cool-gray max-w-2xl mx-auto">
            Real stories from people who have transformed their Marketing journey with our platform
          </p>
        </motion.div>

        <div className="flex flex-col md:flex-row items-center justify-center gap-16 mb-16">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            viewport={{ once: true }}
            className="w-full max-w-md"
          >
            <TestimonialStack
              cardDimensions={{ width: 320, height: 380 }}
              randomRotation={true}
              sensitivity={150}
              testimonials={[
                {
                  id: 1,
                  quote:
                    "Market Craft has been handling our digital marketing for the past 2 years, and the results speak for themselves. From ad performance to brand visibility, their strategies brought measurable growth to Green Mall. We’re fully satisfied with their professionalism and commitment.",
                  name: "Hafiz Rashid",
                  role: "CEO@GreenMall",
                  rating: 5,
                  accentColor: "soft-blue",
                },
                {
                  id: 2,
                  quote:
                   "Market Craft helped us establish a strong digital presence with tailored content and effective ad campaigns. Their understanding of our niche and brand tone was spot on. We’re extremely satisfied with their marketing support and creative direction.",
                  name: "Waleed Bin Mehdi",
                  role: "CEO@Mehdees",
                  rating: 5,
                  accentColor: "mint-green",
                },
                
                
              ]}
            />
          </motion.div>

          
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <p className="text-lg font-medium text-soft-blue">Join our team today</p>
          <button  onClick={() => setOpenContact(true)}
          className="mt-4 bg-gradient-to-r from-soft-blue to-mint-green text-snow-white px-8 py-3 rounded-full font-bold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            Start Your Digital Marketing Journey
          </button>
        </motion.div>
      </div>

      {/* Background elements */}
      <div className="absolute top-20 left-10 w-64 h-64 bg-soft-blue/10 rounded-full blur-3xl opacity-50" />
      <div className="absolute bottom-20 right-10 w-64 h-64 bg-mint-green/10 rounded-full blur-3xl opacity-50" />
              <ContactFormModal open={openContact} setOpen={setOpenContact} />
              
    </section>
  )
}