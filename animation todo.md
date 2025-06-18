# Scroll Animation Implementation Prompt for Text-Heavy Website

## Project Context

You are tasked with implementing scroll animations for a React application that contains large volumes of text content. The goal is to create a lively, engaging user experience while maintaining readability and performance.

## CRITICAL CONSTRAINTS - READ FIRST

### **Layout & Structure Preservation**

-   **DO NOT modify the existing application layout, structure, or component hierarchy**
-   **DO NOT add, remove, or change React Router routes or navigation structure**
-   **DO NOT alter existing component organization or file structure**
-   **DO NOT change existing CSS layouts, grid systems, or flexbox arrangements**
-   **ONLY add animation properties and Framer Motion wrappers to existing elements**

### **Scope Limitation**

-   **FOCUS EXCLUSIVELY on adding scroll animations to existing content**
-   **DO NOT refactor existing components unless absolutely necessary for animation**
-   **DO NOT change existing state management, data flow, or component logic**
-   **DO NOT modify existing styling beyond adding animation-related properties**
-   **PRESERVE all existing functionality, props, and component behavior**

## Animation Library Requirements

-   **Primary**: Use Framer Motion for React integration and performance
-   **Fallback**: If Framer Motion isn't available, use AOS (Animate On Scroll) or React Spring
-   Ensure all animations are hardware-accelerated and performant

## Core Animation Principles

### 1. **Readability First**

-   Never animate text while it's being read
-   Use subtle entrance animations that don't distract from content
-   Maintain proper contrast and legibility throughout animations
-   Avoid animations that cause text to jump or shift unexpectedly

### 2. **Progressive Disclosure**

-   Reveal content as users scroll to create a sense of discovery
-   Stagger animations for related elements (e.g., paragraphs, list items)
-   Use entrance animations to guide reading flow from top to bottom

### 3. **Performance Optimization**

-   Implement intersection observer to only animate elements in viewport
-   Use `transform` and `opacity` properties (GPU-accelerated)
-   Debounce scroll events and use `requestAnimationFrame`
-   Lazy-load animations for better initial page load

## Specific Animation Patterns to Implement

### **Text Content Animations**

1. **Fade In Up**: Paragraphs slide up 20-40px while fading in
2. **Staggered Reveal**: List items appear sequentially with 100-150ms delays
3. **Section Reveals**: Major content sections fade in as they enter viewport
4. **Progressive Text Loading**: Long text blocks reveal paragraph by paragraph

### **Navigation & UI Elements**

1. **Sticky Header Animation**: Smooth appearance/disappearance on scroll
2. **Progress Indicator**: Reading progress bar that fills as user scrolls
3. **Floating Action Buttons**: Subtle bounce-in when scrolling stops
4. **Breadcrumb Animations**: Path updates with smooth transitions

### **Visual Enhancement Elements**

1. **Parallax Backgrounds**: Subtle movement (max 20% speed difference)
2. **Image Reveals**: Photos fade in with scale transforms
3. **Divider Animations**: Section separators draw in horizontally
4. **Accent Elements**: Icons, bullets, or decorative elements appear with bounce

## Technical Implementation Guidelines

### **Framer Motion Setup**

```javascript
// Use these hooks and components:
- motion.div, motion.p, motion.h1-h6
- useInView hook for viewport detection
- useScroll for scroll-based animations
- useAnimation for programmatic control
- AnimatePresence for enter/exit animations
```

### **Animation Timing & Easing**

-   **Duration**: 0.4-0.8s for entrance animations
-   **Easing**: Use `ease-out` for natural feel
-   **Stagger Delay**: 0.1-0.2s between related elements
-   **Scroll Response**: Immediate (no delay) for scroll-triggered animations

### **Responsive Behavior**

-   Reduce motion on mobile devices (shorter distances, faster timing)
-   Respect `prefers-reduced-motion` accessibility setting
-   Provide option to disable animations in user settings
-   Test on various screen sizes and orientations

## User Experience Considerations

### **Accessibility Standards**

-   Implement `prefers-reduced-motion` media query support
-   Maintain keyboard navigation during animations
-   Ensure screen readers aren't disrupted by animations
-   Provide skip-animation options for users who need them

### **Content-Specific Guidelines**

-   **Headers**: Subtle slide-in from left with 0.5s duration
-   **Body Text**: Gentle fade-up with 0.6s duration, no horizontal movement
-   **Code Blocks**: Type-writer effect or instant reveal (user preference)
-   **Tables**: Row-by-row reveal with 0.1s stagger
-   **Images**: Scale from 95% to 100% while fading in
-   **Links**: Subtle color transitions and underline animations

### **Performance Monitoring**

-   Monitor frame rate during animations (target 60fps)
-   Implement fallbacks for low-powered devices
-   Use CSS `will-change` property judiciously
-   Clean up event listeners and observers on component unmount

## Implementation Checklist

### **Phase 1: Basic Entrance Animations**

-   [ ] Fade-in animations for main content sections
-   [ ] Staggered list item reveals
-   [ ] Image and media entrance effects
-   [ ] Basic intersection observer setup

### **Phase 2: Advanced Scroll Effects**

-   [ ] Reading progress indicator
-   [ ] Sticky navigation animations
-   [ ] Parallax background elements
-   [ ] Section-based animation triggers

### **Phase 3: Polish & Optimization**

-   [ ] Motion preferences detection
-   [ ] Performance optimization
-   [ ] Cross-browser testing
-   [ ] Mobile responsiveness refinement

## Success Metrics

-   Animations enhance content consumption without distraction
-   Page feels more engaging and modern
-   Reading flow is improved, not hindered
-   Performance remains optimal (no janky scrolling)
-   Accessibility standards are maintained

## Code Structure Requirements

-   **Wrap existing elements** with motion components instead of replacing them
-   Create reusable animation components that can be applied to existing structure
-   Implement centralized animation configuration without changing existing architecture
-   Use consistent naming conventions for animation variants
-   Document all custom animation hooks and utilities
-   Ensure animations are easily customizable via props
-   **Maintain existing component imports, exports, and prop interfaces**

## Implementation Approach

-   **Additive Only**: Add animations by wrapping existing JSX elements with `motion.div` or similar
-   **Non-Invasive**: Use CSS-in-JS or style props for animation styles, don't modify existing CSS files unless adding new animation classes
-   **Preserve Functionality**: Ensure all existing click handlers, form submissions, and interactive elements continue to work
-   **Minimal Changes**: Make the smallest possible changes to achieve the desired animation effects

## Testing Requirements

-   Test with screen readers
-   Verify performance on mobile devices
-   Test with reduced motion preferences enabled
-   Validate smooth scrolling on various content lengths
-   Ensure animations don't interfere with text selection

Remember: The goal is to make the text content more engaging and readable, not to show off animation capabilities. Every animation should serve the user's journey through your content.
