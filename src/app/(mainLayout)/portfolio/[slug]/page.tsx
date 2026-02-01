import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { ArrowLeft, Calendar, Clock } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { getPortfolioBySlug, getPortfolioSlugs } from '@/lib/portfolio'

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const slugs = getPortfolioSlugs()
  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const portfolio = await getPortfolioBySlug(slug)

  if (!portfolio) {
    return {
      title: '案例未找到 | Lumina'
    }
  }

  return {
    title: `${portfolio.title} | Lumina 案例`,
    description: portfolio.description,
    keywords: portfolio.tags,
    openGraph: {
      title: portfolio.title,
      description: portfolio.description,
      type: 'article',
      images: [
        {
          url: portfolio.coverImage,
          width: 1200,
          height: 630,
          alt: portfolio.title
        }
      ]
    },
    twitter: {
      card: 'summary_large_image',
      title: portfolio.title,
      description: portfolio.description,
      images: [portfolio.coverImage]
    }
  }
}

export default async function PortfolioDetailPage({ params }: PageProps) {
  const { slug } = await params
  const portfolio = await getPortfolioBySlug(slug)

  if (!portfolio) {
    notFound()
  }

  return (
    <article className="min-h-dvh bg-background pb-20">
      <header className="relative w-full h-[60vh] md:h-[70vh] overflow-hidden">
        <Image
          src={portfolio.coverImage}
          alt={portfolio.title}
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/50 to-black/30" />

        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12 lg:p-16">
          <div className="container mx-auto max-w-screen-2xl">
            <Link href="/home#portfolio">
              <Button
                variant="ghost"
                size="sm"
                className="mb-12 text-white hover:bg-white/20 hover:text-white border border-white/10"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                返回首页
              </Button>
            </Link>

            <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold text-white mb-6 tracking-tight drop-shadow-lg leading-tight">
              {portfolio.title}
            </h1>

            <span className="inline-block text-sm font-medium tracking-wider uppercase text-white mb-4 px-3 py-1 bg-white/20 backdrop-blur-md rounded-full border border-white/20">
              {portfolio.category}
            </span>

            <p className="text-lg md:text-2xl text-white/90 max-w-3xl leading-relaxed drop-shadow-md font-light">
              {portfolio.description}
            </p>
          </div>
        </div>
      </header>

      <div className="border-b border-border/50 bg-background/50 backdrop-blur-sm sticky top-18 z-10">
        <div className="container mx-auto max-w-screen-2xl px-6 md:px-12 lg:px-16 py-6">
          <div className="flex flex-wrap items-center gap-x-8 gap-y-4 text-sm text-muted-foreground">
            {portfolio.client && (
              <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                <span className="text-xs font-semibold uppercase tracking-wider opacity-70">
                  客户
                </span>
                <span className="font-medium text-foreground">{portfolio.client}</span>
              </div>
            )}
            {portfolio.duration && (
              <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                <span className="text-xs font-semibold uppercase tracking-wider opacity-70">
                  周期
                </span>
                <div className="flex items-center gap-1.5 font-medium text-foreground">
                  <Clock className="h-3.5 w-3.5" />
                  {portfolio.duration}
                </div>
              </div>
            )}
            <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
              <span className="text-xs font-semibold uppercase tracking-wider opacity-70">
                发布日期
              </span>
              <div className="flex items-center gap-1.5 font-medium text-foreground">
                <Calendar className="h-3.5 w-3.5" />
                {new Date(portfolio.date).toLocaleDateString('zh-CN', {
                  year: 'numeric',
                  month: 'long'
                })}
              </div>
            </div>
            {portfolio.tags.length > 0 && (
              <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 ml-auto">
                <div className="flex items-center gap-2 flex-wrap">
                  {portfolio.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 bg-secondary text-secondary-foreground rounded-md text-xs font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="container mx-auto max-w-screen-2xl px-6 md:px-12 lg:px-16 py-16 md:py-24">
        <div className="max-w-4xl mx-auto">
          <div
            className="prose prose-lg dark:prose-invert mx-auto
            prose-headings:font-bold prose-headings:tracking-tight 
            prose-h2:text-3xl prose-h2:mt-16 prose-h2:mb-6 
            prose-h3:text-2xl prose-h3:mt-10 prose-h3:mb-4 
            prose-p:text-muted-foreground prose-p:leading-8 prose-p:mb-6
            prose-li:text-muted-foreground prose-li:my-2
            prose-strong:text-foreground prose-strong:font-semibold
            prose-blockquote:border-l-primary prose-blockquote:bg-secondary/30 prose-blockquote:py-2 prose-blockquote:px-6 prose-blockquote:rounded-r-lg prose-blockquote:not-italic
            prose-img:rounded-xl prose-img:shadow-lg prose-img:aspect-video prose-img:object-cover prose-img:w-full
            prose-a:text-primary prose-a:no-underline hover:prose-a:underline
            "
          >
            <MDXRemote source={portfolio.content} />
          </div>
        </div>
      </div>
    </article>
  )
}
