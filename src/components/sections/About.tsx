'use client'

import React from 'react'
import { motion } from 'framer-motion'

const stats = [
  { value: '10+', label: '年行业经验' },
  { value: '200+', label: '成功交付项目' },
  { value: '50+', label: '全球合作伙伴' },
  { value: '15', label: '荣获设计奖项' }
]

export default function About() {
  return (
    <section
      id="about"
      className="py-24 bg-primary text-primary-foreground relative overflow-hidden"
    >
      {/* Decorative circle */}
      <div className="absolute top-0 right-0 w-[40rem] h-[40rem] bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight">
              我们是设计师，思考者，也是问题解决者。
            </h2>
            <div className="space-y-4 text-primary-foreground/80 text-lg leading-relaxed">
              <p>
                Lumina 成立于 2014
                年，已从一个小型的设计工作室成长为全方位的数字代理机构。我们坚信，好的设计不仅仅是外观，更是运作方式。
              </p>
              <p>
                我们的理念很简单：以人为本。无论是您的客户还是您的团队，我们设计的体验都能改善生活并推动业务增长。
              </p>
            </div>
          </motion.div>

          <div className="grid grid-cols-2 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white/10 backdrop-blur-sm rounded-xl p-8 border border-white/10"
              >
                <div className="text-4xl md:text-5xl font-bold mb-2">{stat.value}</div>
                <div className="text-primary-foreground/60 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
