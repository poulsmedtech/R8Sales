import { useEffect, useState } from 'react'

const SECTION_IDS = ['home', 'opportunities', 'why-r8', 'about', 'join']

export default function useActiveSection() {
  const [active, setActive] = useState('home')

  useEffect(() => {
    const elements = SECTION_IDS.map((id) => document.getElementById(id)).filter(Boolean)
    if (elements.length === 0) return undefined

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)
        if (visible[0]) setActive(visible[0].target.id)
      },
      {
        rootMargin: '-18% 0px -64% 0px',
        threshold: [0, 0.12, 0.28, 0.5],
      },
    )

    elements.forEach((element) => observer.observe(element))
    return () => observer.disconnect()
  }, [])

  return active
}
