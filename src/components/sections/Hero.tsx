'use client'

import { motion, Variants } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { ArrowRight, Sparkles } from 'lucide-react'
import { cn } from '@/lib/utils'
import { siteContent } from '@/config/site-content'
import BackgroundRenderer from '@/components/backgrounds'

export default function Hero() {
  const { hero } = siteContent

  const showTopFade = hero.overlays?.enableTopFade ?? true
  const showVignette = hero.overlays?.enableVignette ?? false

  const scrollToId = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' }
    }
  }

  const staggerContainer: Variants = {
    visible: { transition: { staggerChildren: 0.15, delayChildren: 0.2 } }
  }

  return (
    <section
      id="root"
      className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-zinc-950"
    >
      {/* ==================== 背景层 ==================== */}
      <div className="absolute inset-0 z-0">
        {/* 使用注册表组件渲染背景 */}
        <BackgroundRenderer config={hero.background} />

        {/* 通用暗角遮罩 (让文字更清晰，且融入背景) - 可配置开关 */}
        {showVignette && (
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_10%,rgba(9,9,11,0.8)_60%,rgba(9,9,11,1)_100%)] pointer-events-none" />
        )}

        {/* 顶部渐变遮罩 (防止 Navbar 看不清) - 可配置开关 */}
        {showTopFade && (
          <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-zinc-950/80 to-transparent pointer-events-none" />
        )}
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
          {hero.badge.isShow && (
            <motion.div variants={fadeInUp}>
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-white/90 backdrop-blur-md transition-colors hover:bg-white/10">
                <Sparkles className="h-3.5 w-3.5 text-purple-400" />
                <span className="tracking-wide">{hero.badge.text}</span>
              </div>
            </motion.div>
          )}

          {/* 2. 主标题 (Slogan) */}
          <motion.div variants={fadeInUp} className="max-w-4xl">
            <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-7xl lg:text-8xl">
              <span className="block drop-shadow-2xl">{hero.title.line1}</span>
              <span className="mt-2 block bg-gradient-to-b from-white via-white/90 to-white/50 bg-clip-text text-transparent">
                {hero.title.line2}
              </span>
            </h1>
          </motion.div>

          {/* 3. 副标题 (Description) */}
          <motion.div variants={fadeInUp} className="mt-6 max-w-2xl">
            <p className="text-lg leading-relaxed text-zinc-400 md:text-xl">{hero.description}</p>
          </motion.div>

          {/* 4. 按钮组 (Buttons) */}
          <motion.div
            variants={fadeInUp}
            className="mt-10 flex flex-col gap-4 sm:flex-row sm:gap-6"
          >
            <Button
              size="lg"
              className="h-12 min-w-[160px] rounded-full bg-white text-zinc-950 shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:bg-zinc-100 hover:shadow-[0_0_30px_rgba(255,255,255,0.3)] transition-all"
              onClick={() => scrollToId(hero.buttons.primary.link)}
            >
              {hero.buttons.primary.text}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>

            <Button
              size="lg"
              variant="outline"
              className={cn(
                'h-12 min-w-[160px] rounded-full border-white/10 bg-white/5 text-white backdrop-blur-sm transition-all',
                'hover:bg-white/10 hover:border-white/20 hover:text-white'
              )}
              onClick={() => scrollToId(hero.buttons.secondary.link)}
            >
              {hero.buttons.secondary.text}
            </Button>
          </motion.div>
        </motion.div>
      </div>

      {/* 底部滚动提示 */}
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
