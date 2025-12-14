import React from 'react'
import { Hexagon, Twitter, Instagram, Linkedin, Github } from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground py-12 md:py-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Hexagon className="h-8 w-8" />
              <span className="text-xl font-bold tracking-tight">LUMINA</span>
            </div>
            <p className="text-primary-foreground/70 text-sm max-w-xs">
              打造既能激发灵感又能实现转化的数字体验。我们将美学与功能完美融合，只为提升品牌价值。
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">服务项目</h4>
            <ul className="space-y-2 text-sm text-primary-foreground/70">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  UI/UX 设计
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  品牌识别
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  网站开发
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  数字营销
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">关于公司</h4>
            <ul className="space-y-2 text-sm text-primary-foreground/70">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  关于我们
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  招贤纳士
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  企业博客
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  联系方式
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">关注我们</h4>
            <div className="flex gap-4">
              <a href="#" className="text-primary-foreground/70 hover:text-white transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-primary-foreground/70 hover:text-white transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-primary-foreground/70 hover:text-white transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="#" className="text-primary-foreground/70 hover:text-white transition-colors">
                <Github className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-primary-foreground/10 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-primary-foreground/50">
          <p>&copy; {new Date().getFullYear()} Lumina 创意设计. 保留所有权利。</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">
              隐私政策
            </a>
            <a href="#" className="hover:text-white transition-colors">
              服务条款
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
