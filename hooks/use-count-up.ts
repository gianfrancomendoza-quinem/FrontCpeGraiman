'use client'

import { useEffect, useState } from 'react'

export function useCountUp(
  target: number,
  duration: number = 1000,
  delay: number = 0
) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    const timer = setTimeout(() => {
      let startTime: number
      let animationId: number

      const animate = (currentTime: number) => {
        if (!startTime) startTime = currentTime
        const elapsed = currentTime - startTime
        const progress = Math.min(elapsed / duration, 1)

        setCount(Math.floor(target * progress))

        if (progress < 1) {
          animationId = requestAnimationFrame(animate)
        }
      }

      animationId = requestAnimationFrame(animate)

      return () => {
        if (animationId) cancelAnimationFrame(animationId)
      }
    }, delay)

    return () => clearTimeout(timer)
  }, [target, duration, delay])

  return count
}
