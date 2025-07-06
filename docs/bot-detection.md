# Advanced Bot Detection & Animation Optimization

This system uses a comprehensive JSON database of known bots to provide sophisticated bot detection and automatically disables animations for bots and users who prefer reduced motion.

## Features

- 🤖 **Comprehensive Bot Database**: Uses a JSON file with 13,000+ known bot patterns
- 🎯 **Pattern Matching**: Supports regex patterns, exact matches, and aliases
- 📊 **Detailed Bot Info**: Provides bot ID, categories, verification methods, and more
- ♿ **Accessibility**: Respects user's `prefers-reduced-motion` preference
- ⚡ **Performance**: Bypasses animations for bots to improve SEO and loading speed
- 🎨 **Easy Integration**: Simple wrapper components for common animations

## How It Works

### 1. JSON-Based Bot Detection

The system reads from `well-known-bots.json` which contains detailed information about known bots:

```json
{
  "id": "google-crawler",
  "categories": ["google", "search-engine"],
  "pattern": {
    "accepted": ["Googlebot\\/"],
    "forbidden": []
  },
  "instances": {
    "accepted": [
      "Googlebot/2.1 (+http://www.google.com/bot.html)",
      "Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)"
    ]
  },
  "aliases": ["GoogleBot"]
}
```

### 2. Pattern Matching

The system supports multiple detection methods:
- **Regex Patterns**: Complex pattern matching with escaped characters
- **Exact Instances**: Precise user agent string matching
- **Aliases**: Alternative names for the same bot
- **Categories**: Grouping bots by type (search-engine, social-media, testing, etc.)

### 3. Animation Wrappers

Use the provided wrapper components instead of direct Framer Motion components:

```tsx
// ❌ Before (always animates)
<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
  Content
</motion.div>

// ✅ After (respects bot detection and preferences)
<FadeIn>
  Content
</FadeIn>
```

## Usage

### Basic Usage

```tsx
import { FadeIn, FadeInUp, FadeInLeft, Stagger, Scale } from '@/components/animation-wrapper'

function MyComponent() {
  return (
    <div>
      <FadeIn>
        <h1>This will fade in (unless bot/reduced motion)</h1>
      </FadeIn>
      
      <FadeInUp delay={0.2}>
        <p>This will fade in from bottom with delay</p>
      </FadeInUp>
      
      <FadeInLeft>
        <div>This will slide in from left</div>
      </FadeInLeft>
    </div>
  )
}
```

### Advanced Bot Detection

```tsx
import { useBotDetection } from '@/hooks/use-animations'

function BotInfoComponent() {
  const { 
    isBot, 
    botInfo, 
    botCategories, 
    isSearchEngine, 
    isSocialMedia, 
    isTestingTool 
  } = useBotDetection()

  return (
    <div>
      {isBot ? (
        <div>
          <h3>Bot Detected: {botInfo?.id}</h3>
          <p>Categories: {botCategories.join(', ')}</p>
          {isSearchEngine && <p>This is a search engine bot</p>}
          {isSocialMedia && <p>This is a social media bot</p>}
          {isTestingTool && <p>This is a testing tool</p>}
        </div>
      ) : (
        <p>Human user detected</p>
      )}
    </div>
  )
}
```

### Available Animation Variants

- `FadeIn` - Simple fade in animation
- `FadeInUp` - Fade in from bottom
- `FadeInLeft` - Slide in from left
- `Stagger` - Fade in with built-in stagger delay
- `Scale` - Scale up animation

### Custom Animation Wrapper

```tsx
import AnimationWrapper from '@/components/animation-wrapper'

<AnimationWrapper variant="fadeIn" delay={0.3} className="my-class">
  Custom content
</AnimationWrapper>
```

### Using the Hook Directly

```tsx
import { useAnimations } from '@/hooks/use-animations'

function MyComponent() {
  const { 
    disableAnimations, 
    isBot, 
    botInfo, 
    botCategories,
    prefersReducedMotion 
  } = useAnimations()
  
  if (disableAnimations) {
    return <div>Static content for bots</div>
  }
  
  return <motion.div>Animated content for humans</motion.div>
}
```

## Bot Categories

The system recognizes various bot categories:

- **search-engine**: Googlebot, Bingbot, DuckDuckBot, etc.
- **social-media**: Facebook, Twitter, LinkedIn crawlers
- **advertising**: Ad bots and analytics
- **testing**: Selenium, Puppeteer, Playwright, etc.
- **scraping**: Web scrapers and crawlers
- **monitoring**: Uptime monitors and health checks

## Server-Side Rendering

For server-side rendering with user agent detection:

```tsx
import { useAnimationsWithUserAgent } from '@/hooks/use-animations'

// In your page component
export default function Page({ userAgent }: { userAgent?: string }) {
  const { disableAnimations, botInfo } = useAnimationsWithUserAgent(userAgent)
  
  return (
    <div>
      {disableAnimations ? (
        <StaticContent />
      ) : (
        <AnimatedContent />
      )}
    </div>
  )
}
```

## Benefits

### SEO Performance
- Faster page loads for search engine crawlers
- Better Core Web Vitals scores
- Improved crawl efficiency
- Comprehensive bot pattern matching

### Accessibility
- Respects user motion preferences
- Better experience for users with vestibular disorders
- Compliant with WCAG guidelines

### Performance
- Reduced CPU usage for bots
- Faster rendering for automated tools
- Better resource utilization
- Pattern caching for improved performance

## Testing

### Test Bot Detection

```bash
# Test with Googlebot (should disable animations)
curl -H "User-Agent: Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)" http://localhost:3000

# Test with Facebook crawler
curl -H "User-Agent: facebookexternalhit/1.1 (+http://www.facebook.com/externalhit_uatext.php)" http://localhost:3000

# Test with Selenium
curl -H "User-Agent: Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36 (selenium)" http://localhost:3000

# Test with real browser (should show animations)
curl -H "User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)" http://localhost:3000
```

### Test Reduced Motion

1. Enable reduced motion in your OS settings
2. Visit your site - animations should be disabled
3. Disable reduced motion - animations should work again

## Migration Guide

### Step 1: Replace Direct Motion Components

```tsx
// Replace this:
<motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
  Content
</motion.div>

// With this:
<FadeInUp>
  Content
</FadeInUp>
```

### Step 2: Update Complex Animations

```tsx
// Replace this:
<motion.div 
  initial={{ opacity: 0, scale: 0.8 }}
  animate={{ opacity: 1, scale: 1 }}
  transition={{ duration: 0.3 }}
>
  Content
</motion.div>

// With this:
<Scale>
  Content
</Scale>
```

### Step 3: Handle Conditional Animations

```tsx
// Replace this:
{items.map((item, index) => (
  <motion.div
    key={item.id}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.1 }}
  >
    {item.content}
  </motion.div>
))}

// With this:
{items.map((item, index) => (
  <FadeInUp key={item.id} delay={index * 0.1}>
    {item.content}
  </FadeInUp>
))}
```

## Configuration

### Custom Bot Patterns

The system uses the `well-known-bots.json` file. You can add custom bots by adding entries to this file:

```json
{
  "id": "my-custom-bot",
  "categories": ["custom"],
  "pattern": {
    "accepted": ["MyBot\\/"],
    "forbidden": []
  },
  "instances": {
    "accepted": ["MyBot/1.0"],
    "rejected": []
  },
  "aliases": ["MyCustomBot"]
}
```

### Custom Animation Variants

Add new variants in `lib/utils.ts`:

```typescript
export const getAnimationVariants = (userAgent?: string) => {
  const disableAnimations = shouldDisableAnimations(userAgent)
  
  return {
    // ... existing variants
    customAnimation: {
      initial: disableAnimations ? { opacity: 1 } : { opacity: 0, rotate: 180 },
      animate: { opacity: 1, rotate: 0 },
      transition: disableAnimations ? { duration: 0 } : { duration: 0.8 }
    }
  }
}
```

## Demo Component

Use the `BotDetectionDemo` component to see real-time bot detection information:

```tsx
import BotDetectionDemo from '@/components/bot-detection-demo'

function DebugPage() {
  return (
    <div className="container mx-auto p-6">
      <BotDetectionDemo />
    </div>
  )
}
```

This will show:
- Current bot detection status
- Bot categories and type
- Detailed bot information
- User agent string
- Animation status
- Testing instructions 