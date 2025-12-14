'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { ArrowUpRight } from 'lucide-react'

const projects = [
  {
    id: 1,
    title: 'Fintech 金融仪表盘',
    category: 'UI/UX 设计',
    size: 'large',
    img: 'https://picsum.photos/800/600?random=1'
  },
  {
    id: 2,
    title: 'Eco 环保电商',
    category: '网站开发',
    size: 'small',
    img: 'https://picsum.photos/400/400?random=2'
  },
  {
    id: 3,
    title: 'Modern 现代建筑',
    category: '品牌设计',
    size: 'small',
    img: 'https://picsum.photos/400/400?random=3'
  },
  {
    id: 4,
    title: 'Health 健康助手',
    category: '移动端设计',
    size: 'medium',
    img: 'https://picsum.photos/600/400?random=4'
  },
  {
    id: 5,
    title: 'Crypto 数字钱包',
    category: '产品设计',
    size: 'medium',
    img: 'https://picsum.photos/600/400?random=5'
  }
]

export default function Portfolio() {
  return (
    <section id="portfolio" className="py-24 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight">精选案例</h2>
            <p className="text-lg text-muted-foreground">挑战现状，突破边界的项目合集。</p>
          </div>
          <Button variant="outline" className="hidden md:flex">
            查看所有项目
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[300px]">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`relative group rounded-xl overflow-hidden cursor-pointer ${
                project.size === 'large'
                  ? 'md:col-span-2 md:row-span-2'
                  : project.size === 'medium'
                    ? 'md:col-span-1 md:row-span-1'
                    : 'md:col-span-1 md:row-span-1'
              }`}
            >
              {/* Note: Next.js Image component is better, but plain img is fine for migration initially */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={project.img}
                alt={project.title}
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-60 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8">
                <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 ease-out">
                  <div className="flex justify-between items-end gap-4">
                    <div>
                      <span className="inline-block text-xs font-semibold tracking-wider uppercase text-primary-foreground/70 mb-2 border border-white/20 px-2 py-1 rounded backdrop-blur-sm">
                        {project.category}
                      </span>
                      <h3 className="text-2xl md:text-3xl font-bold text-white leading-tight drop-shadow-md">
                        {project.title}
                      </h3>
                    </div>

                    <div className="bg-white text-black p-3 rounded-full opacity-0 translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500 ease-out shadow-lg">
                      <ArrowUpRight className="h-5 w-5" />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-8 md:hidden">
          <Button variant="outline" className="w-full">
            查看所有项目
          </Button>
        </div>
      </div>
    </section>
  )
}
