// src/components/ui/latex-renderer.tsx
"use client"

import React, { useEffect, useRef } from 'react'
import 'katex/dist/katex.min.css'

interface LaTeXRendererProps {
  content: string
  latex?: string  // Add latex prop for backward compatibility
  className?: string
}

export const LaTeXRenderer: React.FC<LaTeXRendererProps> = ({ 
  content, 
  latex,  // Add latex prop support
  className = '' 
}): JSX.Element => {
  const containerRef = useRef<HTMLDivElement>(null)
  
  // Use latex prop if provided, otherwise use content
  const textToRender = latex || content

  useEffect(() => {
    const loadKaTeX = async () => {
      try {
        // Dynamically import KaTeX
        const katex = await import('katex')
        
        // Try to import auto-render, but handle gracefully if it fails
        let renderMathInElement
        try {
          const autoRender = await import('katex/contrib/auto-render')
          renderMathInElement = autoRender.default
        } catch (err) {
          // If auto-render fails, use basic katex rendering
          console.warn('Auto-render not available, using basic KaTeX rendering:', err)
          if (containerRef.current) {
            containerRef.current.innerHTML = textToRender
          }
          return
        }

        if (containerRef.current && renderMathInElement) {
          containerRef.current.innerHTML = textToRender
          
          renderMathInElement(containerRef.current, {
            delimiters: [
              { left: '$$', right: '$$', display: true },
              { left: '$', right: '$', display: false },
              { left: '\\(', right: '\\)', display: false },
              { left: '\\[', right: '\\]', display: true }
            ],
            throwOnError: false
          })
        }
      } catch (error) {
        console.warn('KaTeX not available, displaying raw content:', error)
        if (containerRef.current) {
          containerRef.current.innerHTML = textToRender
        }
      }
    }

    loadKaTeX()
  }, [textToRender])

  return <div ref={containerRef} className={className} />
}

export default LaTeXRenderer