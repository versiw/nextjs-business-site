'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card'
import { Palette, Layout, Code, LineChart, Globe, Smartphone } from 'lucide-react'

const services = [
  {
    icon: Palette,
    title: '品牌识别',
    description: '通过令人难忘的标志和视觉系统，建立与受众产生共鸣的强大品牌。'
  },
  {
    icon: Layout,
    title: 'UI/UX 设计',
    description: '以用户为中心的设计，平衡美学与功能，创造无缝的数字旅程。'
  },
  {
    icon: Code,
    title: '技术开发',
    description: '使用现代技术栈编写整洁、可扩展的代码，以像素级的精度实现设计。'
  },
  {
    icon: Smartphone,
    title: '移动应用',
    description: '为触控设计并针对性能优化的原生及跨平台移动解决方案。'
  },
  {
    icon: Globe,
    title: '网站策略',
    description: '全面的数字策略，旨在提高知名度、参与度和转化率。'
  },
  {
    icon: LineChart,
    title: '数据分析与 SEO',
    description: '基于数据的洞察和优化，确保您的数字资产持续增长。'
  }
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 }
  }
}

export default function Services() {
  return (
    <section id="services" className="py-24 bg-secondary/30">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight">我们的专业领域</h2>
          <p className="text-lg text-muted-foreground">
            我们为现代企业提供量身定制的全面设计与开发服务。
          </p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {services.map((service, index) => (
            <motion.div key={index} variants={itemVariants}>
              <Card className="h-full border-border/50 bg-background/50 backdrop-blur-sm hover:border-primary/50 transition-colors group">
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    <service.icon className="h-6 w-6" />
                  </div>
                  <CardTitle className="mb-2">{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">{service.description}</CardDescription>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
