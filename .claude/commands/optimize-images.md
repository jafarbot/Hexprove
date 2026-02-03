# Optimize Images

Optimize all images in the Hexprove project for performance and SEO.

## Image Optimization Checklist:

### 1. File Sizes
- **Target**: Keep images under 200KB when possible
- **Large images**: Anything over 500KB should be optimized
- **Tools**: Use image compression tools (TinyPNG, ImageOptim, or Next.js automatic optimization)

### 2. Format Selection
- **SVG**: Use for logos, icons, and simple graphics (scalable, small file size)
- **WebP**: Modern format with better compression (supported by Next.js)
- **PNG**: For images requiring transparency
- **JPEG**: For photos and complex images

### 3. Next.js Image Component
Ensure all images use Next.js `<Image>` component:
```tsx
import Image from 'next/image'

<Image
  src="/path/to/image.jpg"
  alt="Descriptive alt text"
  width={800}
  height={600}
  priority={false} // true for above-the-fold images
/>
```

### 4. Alt Text
Every image must have descriptive alt text:
- **Logo**: "Hexprove logo"
- **Service images**: Describe the service being illustrated
- **Decorative images**: Use empty alt="" if purely decorative

### 5. Images to Check
- `/public/logo.svg` or similar
- Service/feature icons
- Team photos (if applicable)
- Background images
- Social media preview images

### 6. Responsive Images
- Ensure images look good on mobile, tablet, and desktop
- Use appropriate sizes for different screen sizes
- Test on actual devices when possible

### 7. Lazy Loading
- Use `loading="lazy"` for below-the-fold images
- Use `priority` prop for above-the-fold critical images
