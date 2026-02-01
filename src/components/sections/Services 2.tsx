'use client'

import React, { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { Palette, Layout, Code, LineChart, Globe, Smartphone } from 'lucide-react'
import { cn } from '@/lib/utils'

const services = [
  {
    id: '01',
    icon: Palette,
    title: '品牌识别',
    description: '构建令人难忘的视觉系统，确立品牌在市场中的独特声音与核心价值。',
    colSpan: 'md:col-span-1 lg:col-span-1'
  },
  {
    id: '02',
    icon: Layout,
    title: 'UI/UX 设计',
    description: '以用户为中心的交互逻辑，平衡美学与功能，创造直观流畅的数字体验。',
    colSpan: 'md:col-span-1 lg:col-span-1'
  },
  {
    id: '03',
    icon: Code,
    title: '技术开发',
    description: '基于 Next.js 的现代化全栈开发，提供高性能、SEO 友好且可扩展的代码架构。',
    colSpan: 'md:col-span-1 lg:col-span-1'
  },
  {
    id: '04',
    icon: Smartphone,
    title: '移动应用',
    description: '跨平台移动解决方案，确保在 iOS 与 Android 设备上提供原生级的流畅交互。',
    colSpan: 'md:col-span-1 lg:col-span-1'
  },
  {
    id: '05',
    icon: Globe,
    title: '网站策略',
    description: '全面的数字化转型策略，通过数据驱动的布局优化，提升品牌知名度与转化率。',
    colSpan: 'md:col-span-1 lg:col-span-1'
  },
  {
    id: '06',
    icon: LineChart,
    title: '数据与增长',
    description: '深度数据埋点与 SEO 优化，让每一次点击都变得可追踪、可分析、可优化。',
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

  const handleMouseEnter = () => {
    setOpacity(1)
  }

  const handleMouseLeave = () => {
    setOpacity(0)
  }

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
        'relative overflow-hidden rounded-xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950/50',
        'group p-8 transition-colors duration-300',
        'hover:border-zinc-300 dark:hover:border-zinc-700',
        item.colSpan
      )}
    >
      <div
        className="pointer-events-none absolute -inset-px opacity-0 transition duration-300"
        style={{
          opacity,
          background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(0,0,0,0.06), transparent 40%)`
        }}
      />
      <div
        className="pointer-events-none absolute -inset-px opacity-0 transition duration-300 dark:block hidden"
        style={{
          opacity,
          background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(255,255,255,0.06), transparent 40%)`
        }}
      />

      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 grayscale" />

      <div className="absolute -right-4 -top-6 select-none font-mono text-9xl font-bold tracking-tighter text-zinc-50 opacity-100 dark:text-zinc-900/40 pointer-events-none transition-transform duration-500 group-hover:scale-110">
        {item.id}
      </div>

      <div className="relative z-10 flex flex-col h-full gap-6">
        <div className="flex items-center justify-between">
          <div className="rounded-lg bg-zinc-100 p-3 text-zinc-900 transition-colors duration-300 group-hover:bg-primary group-hover:text-primary-foreground dark:bg-zinc-800 dark:text-zinc-100">
            <item.icon className="h-6 w-6" strokeWidth={1.5} />
          </div>
        </div>

        <div className="mt-2">
          <h3 className="mb-2 text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
            {item.title}
          </h3>
          <p className="text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">
            {item.description}
          </p>
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
              <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-zinc-400 dark:text-zinc-500">
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
