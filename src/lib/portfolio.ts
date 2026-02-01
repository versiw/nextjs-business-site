import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import type { Portfolio, PortfolioMeta } from '@/config/portfolio'

const portfolioDirectory = path.join(process.cwd(), 'content/portfolio')

/**
 * Get all portfolio slugs for SSG static params
 */
export function getPortfolioSlugs(): string[] {
  if (!fs.existsSync(portfolioDirectory)) {
    return []
  }
  const files = fs.readdirSync(portfolioDirectory)
  return files
    .filter((file) => file.endsWith('.mdx') || file.endsWith('.md'))
    .map((file) => file.replace(/\.mdx?$/, ''))
}

/**
 * Get a single portfolio by slug
 */
export async function getPortfolioBySlug(slug: string): Promise<Portfolio | null> {
  const mdxPath = path.join(portfolioDirectory, `${slug}.mdx`)
  const mdPath = path.join(portfolioDirectory, `${slug}.md`)

  let filePath: string | null = null
  if (fs.existsSync(mdxPath)) {
    filePath = mdxPath
  } else if (fs.existsSync(mdPath)) {
    filePath = mdPath
  }

  if (!filePath) {
    return null
  }

  const fileContents = fs.readFileSync(filePath, 'utf8')
  const { data, content } = matter(fileContents)

  return {
    slug,
    title: data.title || '',
    description: data.description || '',
    category: data.category || '',
    coverImage: data.coverImage || '',
    date: data.date || '',
    featured: data.featured || false,
    tags: data.tags || [],
    client: data.client,
    duration: data.duration,
    content
  }
}

/**
 * Get all portfolios with metadata (sorted by date, newest first)
 */
export async function getAllPortfolios(): Promise<PortfolioMeta[]> {
  const slugs = getPortfolioSlugs()
  const portfolios: PortfolioMeta[] = []

  for (const slug of slugs) {
    const portfolio = await getPortfolioBySlug(slug)
    if (portfolio) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { content, ...meta } = portfolio
      portfolios.push(meta)
    }
  }

  return portfolios.sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime()
  })
}

/**
 * Get featured portfolios for homepage display
 */
export async function getFeaturedPortfolios(count: number): Promise<PortfolioMeta[]> {
  const allPortfolios = await getAllPortfolios()

  // First try to get featured items
  const featured = allPortfolios.filter((p) => p.featured)

  if (featured.length >= count) {
    return featured.slice(0, count)
  }

  // Fill with most recent if not enough featured
  const remaining = allPortfolios.filter((p) => !p.featured).slice(0, count - featured.length)

  return [...featured, ...remaining]
}
