import { Image, Play } from 'lucide-react'

/**
 * Image-free founder media placeholders.
 * Swap these for approved generated assets when they are ready.
 *
 * Recommended replacement assets:
 * - variant="video": 1600×900, or another 16:9 frame
 * - variant="portrait": approximately 1200×1600, 3:4
 */
export default function MediaPlaceholder({ variant, label }) {
  const isVideo = variant === 'video'

  return (
    <span className={`media-placeholder media-placeholder-${isVideo ? 'video' : 'portrait'}`}>
      <span className="media-placeholder-mark" aria-hidden="true">
        {isVideo ? <Play size={28} fill="currentColor" /> : <Image size={30} strokeWidth={1.6} />}
      </span>
      <span className="media-placeholder-label">{label}</span>
    </span>
  )
}
