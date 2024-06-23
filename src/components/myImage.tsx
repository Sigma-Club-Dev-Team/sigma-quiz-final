import React from 'react'

export const CoverImage = ({src, alt, className, position} : {src: string, alt: string, className?:string, position?: "center" | "top" | "right" | "left"}) => (
  <img src={src} alt={alt} className={className} style={{ objectFit: "cover", objectPosition: position, position: "absolute", width: "100%", height: "100%" }} />
)

export const ContainImage = ({src, alt, className, position} : {src: string, alt: string, className?:string, position?: "center" | "top" | "right" | "left"}) => (
  <img src={src} alt={alt} className={className} style={{ objectFit: "contain", objectPosition: position, position: "absolute", width: "100%", height: "100%" }} />
)