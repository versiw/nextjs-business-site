'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { ArrowRight, Sparkles } from 'lucide-react'
import Silk from '@/components/Silk'
import { cn } from '@/lib/utils'

export default function Hero() {
  // 滚动逻辑
  const scrollToId = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  // 动画变体配置
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
  }

  const staggerContainer = {
    visible: { transition: { staggerChildren: 0.15, delayChildren: 0.2 } }
  }

  // Silk 配置：这里选用了深紫灰色，既有布料质感，又不会太亮干扰文字
  // 你可以尝试修改这个颜色，比如 #2A004E (深紫) 或 #09090b (深黑)
  const SILK_COLOR = '#5227ff'

  return (
    <section
      id="root"
      className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-zinc-950"
    >
      {/* ==================== 背景层 ==================== */}
      <div className="absolute inset-0 z-0">
        {/* 1. Silk 3D 画布 */}
        <Silk color={SILK_COLOR} speed={5} scale={1} noiseIntensity={1.5} rotation={0} />

        {/* 2. 径向渐变遮罩 (Vignette) */}
        {/* 作用：让四周变暗，聚焦中心，同时让 Silk 融入页面背景 */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_10%,rgba(9,9,11,0.8)_60%,rgba(9,9,11,1)_100%)] pointer-events-none" />

        {/* 3. 顶部淡出遮罩 (防止 Navbar 文字看不清) */}
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-zinc-950/80 to-transparent pointer-events-none" />
      </div>

      {/* ==================== 内容层 ==================== */}
      <div className="container relative z-10 mx-auto px-4 md:px-6">
        <motion.div
          className="flex flex-col items-center text-center"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          {/* 1. 顶部小气泡 (Badge) */}
          <motion.div variants={fadeInUp}>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-white/90 backdrop-blur-md transition-colors hover:bg-white/10">
              <Sparkles className="h-3.5 w-3.5 text-purple-400" />
              <span className="tracking-wide">Lumina Design System v2.0</span>
            </div>
          </motion.div>

          {/* 2. 主标题 (Slogan) */}
          <motion.div variants={fadeInUp} className="max-w-4xl">
            <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-7xl lg:text-8xl">
              <span className="block drop-shadow-2xl">不仅是视觉表现</span>
              <span className="mt-2 block bg-gradient-to-b from-white via-white/90 to-white/50 bg-clip-text text-transparent">
                更是未来的数字体验
              </span>
            </h1>
          </motion.div>

          {/* 3. 副标题 (Description) */}
          <motion.div variants={fadeInUp} className="mt-6 max-w-2xl">
            <p className="text-lg leading-relaxed text-zinc-400 md:text-xl">
              通过策略性的设计方案提升您的品牌价值。我们将创意与尖端技术融合，为您建立与用户之间深层次的连接。
            </p>
          </motion.div>

          {/* 4. 按钮组 (Buttons) */}
          <motion.div
            variants={fadeInUp}
            className="mt-10 flex flex-col gap-4 sm:flex-row sm:gap-6"
          >
            {/* 主按钮：高亮、实心 */}
            <Button
              size="lg"
              className="h-12 min-w-[160px] rounded-full bg-white text-zinc-950 shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:bg-zinc-100 hover:shadow-[0_0_30px_rgba(255,255,255,0.3)] transition-all"
              onClick={() => scrollToId('contact')}
            >
              立即合作
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>

            {/* 次按钮：玻璃拟态、描边 */}
            <Button
              size="lg"
              variant="outline"
              className={cn(
                'h-12 min-w-[160px] rounded-full border-white/10 bg-white/5 text-white backdrop-blur-sm transition-all',
                'hover:bg-white/10 hover:border-white/20 hover:text-white'
              )}
              onClick={() => scrollToId('portfolio')}
            >
              了解更多
            </Button>
          </motion.div>
        </motion.div>
      </div>

      {/* ==================== 底部滚动提示 ==================== */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <div className="flex flex-col items-center gap-2">
          <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-zinc-500">
            Scroll
          </span>
          <div className="h-12 w-[1px] bg-gradient-to-b from-zinc-500 to-transparent" />
        </div>
      </motion.div>
    </section>
  )
}
