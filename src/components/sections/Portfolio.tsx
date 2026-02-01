import Link from 'next/link'
import Image from 'next/image'
import { ArrowUpRight } from 'lucide-react'
import { getFeaturedPortfolios } from '@/lib/portfolio'
import { portfolioSectionConfig } from '@/config/portfolio'

export default async function Portfolio() {
  const portfolios = await getFeaturedPortfolios(portfolioSectionConfig.displayCount)

  const getSizeClass = (index: number) => {
    if (index === 0) return 'md:col-span-2 md:row-span-2'
    if (index === 1) return 'md:col-span-2 md:row-span-1'
    return 'md:col-span-1 md:row-span-1'
  }

  return (
    <section
      id="portfolio"
      className="min-h-dvh py-16 md:py-20 lg:py-24 bg-background flex flex-col justify-center"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-screen-2xl">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 md:mb-12 gap-4">
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3 tracking-tight">
              {portfolioSectionConfig.title}
            </h2>
            <p className="text-base md:text-lg text-muted-foreground">
              {portfolioSectionConfig.subtitle}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-5 auto-rows-[240px] md:auto-rows-[280px]">
          {portfolios.map((portfolio, index) => (
            <Link
              key={portfolio.slug}
              href={`/portfolio/${portfolio.slug}`}
              target="_blank"
              className={`relative group rounded-xl overflow-hidden cursor-pointer block ${getSizeClass(index)}`}
            >
              <Image
                src={portfolio.coverImage}
                alt={portfolio.title}
                fill
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                sizes={
                  index === 0 ? '(max-width: 768px) 100vw, 66vw' : '(max-width: 768px) 100vw, 33vw'
                }
              />

              <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/40 to-transparent opacity-60 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="absolute inset-0 flex flex-col justify-end p-5 md:p-6">
                <div className="transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500 ease-out">
                  <div className="flex justify-between items-end gap-4">
                    <div>
                      <span className="inline-block text-xs font-medium tracking-wider uppercase text-white/70 mb-2 border border-white/20 px-2 py-0.5 rounded backdrop-blur-sm">
                        {portfolio.category}
                      </span>
                      <h3 className="text-xl md:text-2xl font-bold text-white leading-tight drop-shadow-md">
                        {portfolio.title}
                      </h3>
                      <p className="text-sm text-white/60 mt-1 line-clamp-2 max-w-sm">
                        {portfolio.description}
                      </p>
                    </div>

                    <div className="bg-white text-black p-2.5 rounded-full opacity-0 translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500 ease-out shadow-lg shrink-0">
                      <ArrowUpRight className="h-4 w-4" />
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
