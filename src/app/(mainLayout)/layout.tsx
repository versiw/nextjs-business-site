import { Footer } from '@/components/layout/Footer'
import { Navbar } from '@/components/layout/Navbar'

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative flex min-h-screen flex-col bg-background text-foreground selection:bg-primary/20 selection:text-primary">
      {/* 导航栏 */}
      <Navbar />

      {/* 主内容区域 */}
      <main className="flex-1">{children}</main>

      {/* 页脚 */}
      <Footer />
    </div>
  )
}
