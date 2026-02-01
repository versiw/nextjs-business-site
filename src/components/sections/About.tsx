'use client'

import { motion } from 'framer-motion'
import BlurText from '@/components/ui/BlurText'
import SpotlightCard from '@/components/ui/SpotlightCard'
import CountUp from '@/components/ui/CountUp'

const stats = [
  { value: 10, suffix: '+', label: '年行业经验' },
  { value: 200, suffix: '+', label: '成功交付项目' },
  { value: 50, suffix: '+', label: '全球合作伙伴' },
  { value: 15, suffix: '', label: '荣获设计奖项' }
]

export default function About() {
  return (
    <section
      id="about"
      className="min-h-dvh py-20 md:py-24 lg:py-32 bg-primary text-primary-foreground relative overflow-hidden flex flex-col justify-center"
    >
      <div
        className="absolute top-0 right-0 w-200 h-200 bg-linear-to-br from-white/8 to-transparent rounded-full blur-3xl -translate-y-1/3 translate-x-1/3 pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-0 left-0 w-120 h-120 bg-linear-to-tr from-white/5 to-transparent rounded-full blur-3xl translate-y-1/2 -translate-x-1/3 pointer-events-none"
        aria-hidden="true"
      />

      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: '60px 60px'
        }}
        aria-hidden="true"
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-screen-2xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-8 md:mb-12 lg:mb-16"
        >
          <span className="text-sm font-medium tracking-[0.3em] uppercase text-primary-foreground/50">
            关于我们
          </span>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 lg:gap-16">
          <div className="lg:col-span-7">
            <BlurText
              text="我们是设计师，思考者，也是问题解决者。"
              delay={80}
              animateBy="words"
              direction="top"
              className="text-3xl md:text-5xl lg:text-6xl font-bold mb-8 tracking-tight leading-[1.1]"
            />

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="space-y-6 text-primary-foreground/70 text-lg leading-relaxed max-w-2xl"
            >
              <p>
                Lumina 成立于 2014
                年，已从一个小型的设计工作室成长为全方位的数字代理机构。我们坚信，好的设计不仅仅是外观，更是运作方式。
              </p>
              <p>
                我们的理念很简单：以人为本。无论是您的客户还是您的团队，我们设计的体验都能改善生活并推动业务增长。
              </p>
            </motion.div>

            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="h-px bg-linear-to-r from-primary-foreground/30 to-transparent mt-12 origin-left max-w-md"
            />
          </div>

          <div className="lg:col-span-5">
            <div className="grid grid-cols-2 gap-3 md:gap-4">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                >
                  <SpotlightCard className="h-full" spotlightColor="rgba(255, 255, 255, 0.12)">
                    <div className="flex flex-col justify-between h-full min-h-35">
                      <div className="text-4xl md:text-5xl font-bold tracking-tight">
                        <CountUp
                          to={stat.value}
                          duration={2.5}
                          delay={0.3 + index * 0.1}
                          suffix={stat.suffix}
                        />
                      </div>
                      <div className="text-primary-foreground/50 text-sm font-medium mt-4">
                        {stat.label}
                      </div>
                    </div>
                  </SpotlightCard>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
