'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { Menu, X, Hexagon } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    const targetId = href.replace('#', '')
    const element = document.getElementById(targetId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
      setIsMobileMenuOpen(false)
    }
  }

  const navLinks = [
    { name: '首页', href: '#root' },
    { name: '服务', href: '#services' },
    { name: '案例', href: '#portfolio' },
    { name: '关于', href: '#about' },
    { name: '联系', href: '#contact' }
  ]

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        // 滚动时：使用 Shadcn 标准背景色 (bg-background/80)
        // 未滚动时：文字强制白色 (text-white)，因为背景是深色的 Hero
        isScrolled
          ? 'bg-background/80 backdrop-blur-md border-b border-border py-4'
          : 'bg-transparent border-transparent py-6'
      )}
    >
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        {/* LOGO 文字颜色逻辑：滚动随主题，不滚动强制白 */}
        <Link
          href="/"
          className={cn('flex items-center gap-2 group', !isScrolled && 'text-white')}
          onClick={(e) => scrollToSection(e, '#root')}
        >
          <Hexagon
            className={cn(
              'h-8 w-8 transition-transform group-hover:rotate-12',
              isScrolled ? 'text-primary' : 'text-white'
            )}
          />
          <span className="text-xl font-bold tracking-tight">LUMINA</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => scrollToSection(e, link.href)}
              className={cn(
                'text-sm font-medium transition-colors relative group',
                // 链接颜色逻辑
                isScrolled
                  ? 'text-muted-foreground hover:text-primary'
                  : 'text-zinc-300 hover:text-white'
              )}
            >
              {link.name}
              <span
                className={cn(
                  'absolute inset-x-0 -bottom-1 h-0.5 origin-left scale-x-0 transition-transform group-hover:scale-x-100',
                  isScrolled ? 'bg-primary' : 'bg-white'
                )}
              />
            </a>
          ))}
          <Button
            onClick={(e) => scrollToSection(e as any, '#contact')}
            className={cn(!isScrolled && 'bg-white text-black hover:bg-zinc-200')}
          >
            开始合作
          </Button>
        </nav>

        {/* Mobile Toggle */}
        <button
          className={cn('md:hidden p-2', isScrolled ? 'text-foreground' : 'text-white')}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu - 保持 Shadcn 默认背景即可 */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-background border-b overflow-hidden"
          >
            <div className="container mx-auto px-4 py-6 flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-lg font-medium text-foreground py-2 border-b border-border/50 last:border-0"
                  onClick={(e) => scrollToSection(e, link.href)}
                >
                  {link.name}
                </a>
              ))}
              <Button
                className="w-full mt-4"
                onClick={(e) => scrollToSection(e as any, '#contact')}
              >
                开始合作
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
