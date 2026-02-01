export interface PortfolioMeta {
  slug: string
  title: string
  description: string
  category: string
  coverImage: string
  date: string
  featured: boolean
  tags: string[]
  client?: string
  duration?: string
}

export interface Portfolio extends PortfolioMeta {
  content: string
}

export interface PortfolioSectionConfig {
  title: string
  subtitle: string
  viewAllText: string
  displayCount: number
}

export const portfolioSectionConfig: PortfolioSectionConfig = {
  title: '精选案例',
  subtitle: '挑战现状，突破边界的项目合集。',
  viewAllText: '查看所有项目',
  displayCount: 4
}
