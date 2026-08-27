import {
  Activity,
  Flame,
  Gift,
  HeartHandshake,
  Phone,
  Smartphone,
  Sparkles,
  Sun,
} from 'lucide-react'

const icons = {
  flame: Flame,
  sun: Sun,
  handshake: HeartHandshake,
  smartphone: Smartphone,
  phone: Phone,
  activity: Activity,
  gift: Gift,
  sparkles: Sparkles,
}

export default function OpportunityIcon({ name, size = 20, strokeWidth = 2.1 }) {
  const Icon = icons[name]
  if (!Icon) return null
  return <Icon size={size} strokeWidth={strokeWidth} />
}
