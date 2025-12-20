interface SilkBgConfig {
  type: 'silk'
  color?: string
  speed?: number
  scale?: number
  noise?: number
  rotation?: number
}

interface LightPillarBgConfig {
  type: 'light-pillar'
  topColor?: string
  bottomColor?: string
  intensity?: number
  rotationSpeed?: number
  interactive?: boolean
  glowAmount?: number
  pillarWidth?: number
  pillarHeight?: number
  noiseIntensity?: number
  mixBlendMode?: CSSProperties['mixBlendMode']
  pillarRotation?: number
}

type HeroBackgroundConfig = SilkBgConfig | LightPillarBgConfig
