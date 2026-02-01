'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { Menu, X, Hexagon } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()
  const isHomePage = pathname === '/home'

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    handleScroll()
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, hash: string) => {
    if (!isHomePage) {
      setIsMobileMenuOpen(false)
      return
    }

    e.preventDefault()
    const targetId = hash.replace('#', '')
    const element = document.getElementById(targetId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
      setIsMobileMenuOpen(false)
    }
  }

  const navLinks = [
    { name: '首页', hash: '#root' },
    { name: '服务', hash: '#services' },
    { name: '案例', hash: '#portfolio' },
    { name: '关于', hash: '#about' },
    { name: '联系', hash: '#contact' }
  ]

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled
          ? 'bg-background/80 backdrop-blur-md border-b border-border py-4'
          : 'bg-transparent border-transparent py-6'
      )}
    >
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        <Link
          href="/home#root"
          className={cn('flex items-center gap-2 group', !isScrolled && 'text-white')}
          onClick={(e) => handleNavClick(e, '#root')}
        >
          <Hexagon className={cn('h-8 w-8', isScrolled ? 'text-primary' : 'text-white')} />
          <span className="text-xl font-bold tracking-tight">Nextjs-Business-Site</span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={isHomePage ? link.hash : `/home${link.hash}`}
              onClick={(e) => handleNavClick(e, link.hash)}
              className={cn(
                'text-sm font-medium transition-colors relative group',
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
            </Link>
          ))}
          <Button
            onClick={(e) => handleNavClick(e as any, '#contact')}
            className={cn(!isScrolled && 'bg-white text-black hover:bg-zinc-200')}
          >
            开始合作
          </Button>
        </nav>

        <button
          className={cn('md:hidden p-2', isScrolled ? 'text-foreground' : 'text-white')}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

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
                <Link
                  key={link.name}
                  href={isHomePage ? link.hash : `/home${link.hash}`}
                  className="text-lg font-medium text-foreground py-2 border-b border-border/50 last:border-0"
                  onClick={(e) => handleNavClick(e, link.hash)}
                >
                  {link.name}
                </Link>
              ))}
              <Button className="w-full mt-4" onClick={(e) => handleNavClick(e as any, '#contact')}>
                开始合作
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
