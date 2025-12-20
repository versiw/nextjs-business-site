interface ButtonConfig {
  text: string
  link: string
}

interface HeroSectionContent {
  badge: {
    text: string
    isShow: boolean
  }
  title: {
    line1: string
    line2: string
  }
  description: string
  buttons: {
    primary: ButtonConfig
    secondary: ButtonConfig
  }
  background: HeroBackgroundConfig
  overlays?: {
    enableVignette?: boolean
    enableTopFade?: boolean
  }
}

interface GlobalConfig {
  brandName: string
  logoText: string
}

interface SiteContent {
  global: GlobalConfig
  hero: HeroSectionContent
}
