import botData from '../well-known-bots.json'

interface BotPattern {
  accepted: string[]
  forbidden: string[]
}

interface BotVerification {
  type: string
  sources?: Array<{
    type: string
    url: string
    selector: string
  }>
  masks?: string[]
}

interface BotInstances {
  accepted: string[]
  rejected: string[]
}

interface BotData {
  id: string
  categories: string[]
  pattern: BotPattern
  url?: string
  verification: BotVerification[]
  instances: BotInstances
  aliases?: string[]
}

// Cache for compiled regex patterns
const botPatternCache = new Map<string, RegExp[]>()

// Compile regex patterns from the bot data
function compileBotPatterns(): RegExp[] {
  if (botPatternCache.size > 0) {
    return Array.from(botPatternCache.values()).flat()
  }

  const patterns: RegExp[] = []

  botData.forEach((bot: BotData) => {
    // Add pattern.accepted regexes
    bot.pattern.accepted.forEach(pattern => {
      try {
        // Convert escaped patterns to proper regex
        const regexPattern = pattern
          .replace(/\\\//g, '/') // Unescape forward slashes
          .replace(/\\\./g, '.') // Unescape dots
          .replace(/\\\*/g, '.*') // Convert escaped asterisks to wildcards
          .replace(/\\\+/g, '\\+') // Keep plus signs escaped
          .replace(/\\\(/g, '\\(') // Keep parentheses escaped
          .replace(/\\\)/g, '\\)') // Keep parentheses escaped
          .replace(/\\\[/g, '\\[') // Keep brackets escaped
          .replace(/\\\]/g, '\\]') // Keep brackets escaped
          .replace(/\\\?/g, '\\?') // Keep question marks escaped
          .replace(/\\\^/g, '\\^') // Keep carets escaped
          .replace(/\\\$/g, '\\$') // Keep dollar signs escaped
          .replace(/\\\|/g, '\\|') // Keep pipes escaped
          .replace(/\\\{/g, '\\{') // Keep braces escaped
          .replace(/\\\}/g, '\\}') // Keep braces escaped
          .replace(/\\\\/g, '\\\\') // Keep backslashes escaped

        const regex = new RegExp(regexPattern, 'i')
        patterns.push(regex)
        botPatternCache.set(`${bot.id}-${pattern}`, [regex])
      } catch (error) {
        console.warn(`Invalid regex pattern for bot ${bot.id}: ${pattern}`)
      }
    })

    // Add instances.accepted as exact matches
    bot.instances.accepted.forEach(instance => {
      try {
        // Escape special regex characters for exact matching
        const escapedInstance = instance.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
        const regex = new RegExp(escapedInstance, 'i')
        patterns.push(regex)
        botPatternCache.set(`${bot.id}-instance-${instance}`, [regex])
      } catch (error) {
        console.warn(`Invalid instance pattern for bot ${bot.id}: ${instance}`)
      }
    })
  })

  return patterns
}

// Enhanced bot detection using the JSON data
export const isBot = (userAgent?: string): boolean => {
  if (!userAgent) {
    if (typeof window === 'undefined') return false
    userAgent = navigator.userAgent
  }

  const patterns = compileBotPatterns()
  return patterns.some(pattern => pattern.test(userAgent))
}

// Get detailed bot information
export const getBotInfo = (userAgent?: string): BotData | null => {
  if (!userAgent) {
    if (typeof window === 'undefined') return null
    userAgent = navigator.userAgent
  }

  for (const bot of botData) {
    // Check pattern.accepted
    const patternMatch = bot.pattern.accepted.some(pattern => {
      try {
        const regexPattern = pattern
          .replace(/\\\//g, '/')
          .replace(/\\\./g, '.')
          .replace(/\\\*/g, '.*')
          .replace(/\\\+/g, '\\+')
          .replace(/\\\(/g, '\\(')
          .replace(/\\\)/g, '\\)')
          .replace(/\\\[/g, '\\[')
          .replace(/\\\]/g, '\\]')
          .replace(/\\\?/g, '\\?')
          .replace(/\\\^/g, '\\^')
          .replace(/\\\$/g, '\\$')
          .replace(/\\\|/g, '\\|')
          .replace(/\\\{/g, '\\{')
          .replace(/\\\}/g, '\\}')
          .replace(/\\\\/g, '\\\\')

        const regex = new RegExp(regexPattern, 'i')
        return regex.test(userAgent)
      } catch (error) {
        return false
      }
    })

    if (patternMatch) return bot

    // Check instances.accepted
    const instanceMatch = bot.instances.accepted.some(instance => {
      try {
        const escapedInstance = instance.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
        const regex = new RegExp(escapedInstance, 'i')
        return regex.test(userAgent)
      } catch (error) {
        return false
      }
    })

    if (instanceMatch) return bot

    // Check aliases
    if (bot.aliases) {
      const aliasMatch = bot.aliases.some(alias => {
        try {
          const escapedAlias = alias.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
          const regex = new RegExp(escapedAlias, 'i')
          return regex.test(userAgent)
        } catch (error) {
          return false
        }
      })

      if (aliasMatch) return bot
    }
  }

  return null
}

// Get bot category
export const getBotCategory = (userAgent?: string): string[] => {
  const botInfo = getBotInfo(userAgent)
  return botInfo?.categories || []
}

// Check if bot is from a specific category
export const isBotCategory = (userAgent: string, category: string): boolean => {
  const categories = getBotCategory(userAgent)
  return categories.includes(category)
}

// Check if it's a search engine bot
export const isSearchEngineBot = (userAgent?: string): boolean => {
  return isBotCategory(userAgent || '', 'search-engine')
}

// Check if it's a social media bot
export const isSocialMediaBot = (userAgent?: string): boolean => {
  const socialCategories = ['social-media', 'facebook', 'twitter', 'linkedin', 'instagram']
  const categories = getBotCategory(userAgent)
  return categories.some(cat => socialCategories.includes(cat))
}

// Check if it's a testing tool
export const isTestingTool = (userAgent?: string): boolean => {
  const testingCategories = ['testing', 'selenium', 'puppeteer', 'playwright', 'cypress']
  const categories = getBotCategory(userAgent)
  return categories.some(cat => testingCategories.includes(cat))
}

// Get all bot categories
export const getAllBotCategories = (): string[] => {
  const categories = new Set<string>()
  botData.forEach(bot => {
    bot.categories.forEach(category => categories.add(category))
  })
  return Array.from(categories)
}

// Get bots by category
export const getBotsByCategory = (category: string): BotData[] => {
  return botData.filter(bot => bot.categories.includes(category))
}

// Get total number of known bots
export const getTotalBotCount = (): number => {
  return botData.length
} 