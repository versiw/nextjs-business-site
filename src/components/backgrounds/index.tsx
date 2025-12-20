'use client'

import Silk from './Silk'
import LightPillar from './LightPillar'

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

    case 'light-pillar':
      return (
        <LightPillar
          topColor={config.topColor}
          bottomColor={config.bottomColor}
          intensity={config.intensity}
          rotationSpeed={config.rotationSpeed}
          interactive={config.interactive}
          glowAmount={config.glowAmount}
          pillarWidth={config.pillarWidth}
          pillarHeight={config.pillarHeight}
          noiseIntensity={config.noiseIntensity}
          mixBlendMode={config.mixBlendMode}
          pillarRotation={config.pillarRotation}
        />
      )

    default:
      return null
  }
}
