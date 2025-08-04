// src/components/ui/safe-image.tsx
"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface SafeImageProps extends Omit<React.ImgHTMLAttributes<HTMLImageElement>, 'src'> {
  src: string | null | undefined
  fallback?: string
}

const SafeImage = React.forwardRef<HTMLImageElement, SafeImageProps>(
  ({ className, src, fallback = "/placeholder-avatar.png", alt = "", ...props }, ref) => {
    const imageSrc = src || fallback
    
    return (
      <img
        ref={ref}
        src={imageSrc}
        alt={alt}
        className={cn("object-cover", className)}
        {...props}
      />
    )
  }
)
SafeImage.displayName = "SafeImage"

export { SafeImage }