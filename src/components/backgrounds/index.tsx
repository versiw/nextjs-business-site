'use client'

import Silk from './Silk'

interface BackgroundRendererProps {
  config: HeroBackgroundConfig
}

export default function BackgroundRenderer({ config }: BackgroundRendererProps) {
  switch (config.type) {
    case 'silk':
      return (
        <Silk
          color={config.color}
          speed={config.speed}
          scale={config.scale}
          noiseIntensity={config.noise}
          rotation={config.rotation}
        />
      )

    default:
      return null
  }
}
