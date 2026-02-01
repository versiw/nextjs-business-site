'use client'

import React, { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { Palette, Store, Megaphone, Box, Layers, Monitor } from 'lucide-react'
import { cn } from '@/lib/utils'

const services = [
  {
    id: '01',
    icon: Palette,
    title: '品牌全案设计',
    description: '从视觉识别到品牌策略，我们为您塑造独特且具有市场竞争力的品牌灵魂。',
    features: ['Logo 设计', 'VI 视觉系统', '品牌画册', '包装设计'],
    colSpan: 'md:col-span-1 lg:col-span-1'
  },
  {
    id: '02',
    icon: Megaphone,
    title: '广告策划与推广',
    description: '整合创意与媒介资源，提供从策略制定到媒体发布的的一站式广告代理服务。',
    features: ['广告创意', '活动策划', '媒体代理发布', '公关活动'],
    colSpan: 'md:col-span-1 lg:col-span-1'
  },
  {
    id: '03',
    icon: Store,
    title: '商业空间与装饰',
    description: '将品牌理念延伸至物理空间，打造兼具美学与功能性的沉浸式环境体验。',
    features: ['店面装饰', '展厅设计', '导视系统', '装饰工程'],
    colSpan: 'md:col-span-1 lg:col-span-1'
  },
  {
    id: '04',
    icon: Box,
    title: '景观雕塑与装置',
    description: '融合艺术美学与环境功能，定制城市地标、精神堡垒及商业美陈装置。',
    features: ['城市雕塑', '艺术装置', '精神堡垒', '校园文化'],
    colSpan: 'md:col-span-1 lg:col-span-1'
  },
  {
    id: '05',
    icon: Layers,
    title: '精工图文制作',
    description: '严苛的材质甄选与顶尖的喷绘工艺，以匠心还原设计稿最真实的质感与细节。',
    features: ['高清喷绘', '标识标牌', '展览展示', '物料制作'],
    colSpan: 'md:col-span-1 lg:col-span-1'
  },
  {
    id: '06',
    icon: Monitor,
    title: '数字化体验',
    description: '打破虚实界限，通过电脑图文与多媒体技术，为品牌构建完整的数字化触点。',
    features: ['企业官网', '电子导览', '多媒体展项', 'UI/交互设计'],
    colSpan: 'md:col-span-1 lg:col-span-1'
  }
]
const Card = ({ item, index }: { item: (typeof services)[0]; index: number }) => {
  const divRef = useRef<HTMLDivElement>(null)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [opacity, setOpacity] = useState(0)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!divRef.current) return
    const div = divRef.current
    const rect = div.getBoundingClientRect()
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top })
  }

  const handleMouseEnter = () => setOpacity(1)
  const handleMouseLeave = () => setOpacity(0)

  return (
    <motion.div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={cn(
        'group relative flex flex-col justify-between overflow-hidden rounded-xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950/50',
        'transition-all duration-300 hover:border-zinc-300 dark:hover:border-zinc-700',
        item.colSpan
      )}
    >
      <div
        className="pointer-events-none absolute -inset-px opacity-0 transition duration-300 z-10"
        style={{
          opacity,
          background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(0,0,0,0.04), transparent 40%)`
        }}
      />
      <div
        className="pointer-events-none absolute -inset-px opacity-0 transition duration-300 dark:block hidden z-10"
        style={{
          opacity,
          background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(255,255,255,0.05), transparent 40%)`
        }}
      />

      <div className="relative z-20 p-6 md:p-8 flex-1">
        <div className="flex items-start justify-between mb-6">
          <div className="rounded-lg bg-zinc-100 p-2.5 text-zinc-900 ring-1 ring-zinc-200 transition-colors duration-300 group-hover:bg-zinc-900 group-hover:text-white group-hover:ring-zinc-900 dark:bg-zinc-800 dark:text-zinc-100 dark:ring-zinc-700 dark:group-hover:bg-zinc-100 dark:group-hover:text-black">
            <item.icon className="h-6 w-6" strokeWidth={1.5} />
          </div>

          <span className="font-mono text-xs text-zinc-400 dark:text-zinc-600">{item.id}</span>
        </div>

        <h3 className="mb-3 text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
          {item.title}
        </h3>
        <p className="text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">
          {item.description}
        </p>
      </div>

      <div className="relative z-20 border-t border-zinc-100 bg-zinc-50/50 px-6 py-4 dark:border-zinc-800 dark:bg-zinc-900/20">
        <div className="flex flex-wrap gap-2">
          {item.features.map((feature, i) => (
            <div
              key={i}
              className="inline-flex items-center gap-1.5 rounded-md bg-white px-2 py-1 text-xs font-medium text-zinc-600 shadow-sm ring-1 ring-zinc-200/50 dark:bg-zinc-800 dark:text-zinc-400 dark:ring-zinc-700/50"
            >
              <div className="h-1 w-1 rounded-full bg-zinc-300 dark:bg-zinc-600" />
              {feature}
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

export default function Services() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="services" className="relative bg-zinc-50 py-24 dark:bg-black/95">
      <div className="container relative z-10 mx-auto px-4 md:px-6">
        <div className="mb-16 flex flex-col md:flex-row md:items-end md:justify-between gap-8">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
              ref={ref}
            >
              <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-primary/80">
                Services
              </p>

              <h2 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-white sm:text-4xl md:text-5xl">
                我们所提供的服务
              </h2>
            </motion.div>
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="max-w-md text-base leading-relaxed text-zinc-500 dark:text-zinc-400"
          >
            我们将设计思维与技术落地完美结合，为您的商业目标提供量身定制的执行策略，不仅好看，更管用。
          </motion.p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <Card key={service.title} item={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
