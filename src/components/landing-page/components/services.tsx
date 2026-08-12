"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { ThumbsUp, Search, Code, Video, Rocket } from "lucide-react"

const timelineItems = [
  {
    era: "Social Media Marketing (SMM)",
    icon: <ThumbsUp className="w-8 h-8" />,
    description: "Create engaging social media presence across platforms like Instagram, Facebook, and TikTok",
  },
  {
    era: "Search Engine Optimization (SEO & SEM)",
    icon: <Search className="w-8 h-8" />,
    description: "Boost your website's visibility with SEO strategies that drive organic traffic",
  },
  {
    era: "Website Development",
    icon:  <Code className="w-8 h-8" />,
    description: "Custom Word Press, Shopify & coded sites that blend design with perfromance",
  },
  {
    era: "Content Creation",
    icon: <Video className="w-8 h-8" />,
    description: "Craft visually compelling reels,posts,carsouls and branded videos that convert",
  },
  {
    era: "Paid Advertisement",
    icon: <Rocket className="w-8 h-8" />,
    description: "META, GOOGLE & TIKTOK Ads that reach your target audience with precision",
  },
]

export default function Our_services() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: false, amount: 0.2 })

  return (
    <section className="py-20 px-4 md:px-10 bg-gradient-to-b from-mint-green to-snow-white">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-dark-slate-gray mb-4">
            The Market Craft Where Strategy Meets Impact
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            At Market Craft we dont just run campaigns - We craft digital futures. Trace the list of professional services that we offer.
          </p>
        </motion.div>

        <div ref={ref} className="relative">
          <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-dark-slate-gray to-soft-blue rounded-full"></div>

          <div className="relative space-y-16">
            {timelineItems.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className={`flex flex-col md:flex-row items-center md:items-start gap-6 ${
                  index % 2 === 0 ? "md:flex-row-reverse" : ""
                }`}
              >
                {/* Content */}
                <div className="w-full md:w-5/12 text-center md:text-left">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300"
                  >
                    
                    <h3 className="text-xl font-bold text-soft-blue mt-1">{item.era}</h3>
                    <p className="text-cool-gray mt-2">{item.description}</p>
                  </motion.div>
                </div>

                {/* Icon */}
                <div className="w-full md:w-2/12 flex justify-center md:justify-center">
                  <motion.div
                    whileHover={{ scale: 1.2, rotate: 10 }}
                    className="w-16 h-16 rounded-full bg-white border-4 border-mint-green flex items-center justify-center z-10 shadow-lg text-[#2A5C82]"
                  >
                    {item.icon}
                  </motion.div>
                </div>

                {/* Spacer */}
                <div className="hidden md:block w-5/12"></div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
