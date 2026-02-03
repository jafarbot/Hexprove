# Check Framer Motion Animations

Verify all Framer Motion animations in the Hexprove project are working correctly.

## What to check:
1. **Imports**: Verify all Framer Motion imports are correct
   - `motion` components from 'framer-motion'
   - Animation variants are properly defined

2. **Animation Timings**: Review animation configurations
   - Duration, delay, and easing functions
   - Ensure animations aren't too slow or too fast

3. **Performance**: Check for performance issues
   - Avoid animating expensive properties (use transform and opacity when possible)
   - Check if animations cause layout shifts
   - Test on slower devices if possible

4. **Accessibility**: Validate accessibility considerations
   - Check for `prefers-reduced-motion` media query support
   - Ensure animations don't interfere with usability
   - Test with reduced motion enabled

5. **Components to check**:
   - Hero section animations
   - Service cards animations
   - Contact form animations
   - Page transitions
   - Any scroll-triggered animations

## Files to review:
- `components/` directory for animated components
- `app/page.tsx` for page-level animations
- Animation configuration files or constants
