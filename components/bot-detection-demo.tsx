"use client"

import { useBotDetection } from "@/hooks/use-animations"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Bot, Search, Share2, TestTube, User, Zap } from "lucide-react"

export default function BotDetectionDemo() {
  const { isClient, isBot, botInfo, botCategories, isSearchEngine, isSocialMedia, isTestingTool, userAgent } = useBotDetection()

  if (!isClient) {
    return <div>Loading bot detection...</div>
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bot size={20} />
            Bot Detection Status
          </CardTitle>
          <CardDescription>
            Real-time bot detection using comprehensive JSON database
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Detection Status */}
          <div className="flex items-center gap-3">
            <div className={`w-3 h-3 rounded-full ${isBot ? 'bg-red-500' : 'bg-green-500'}`} />
            <span className="font-medium">
              {isBot ? 'Bot Detected' : 'Human User'}
            </span>
            {isBot && (
              <Badge variant="destructive" className="ml-2">
                Animations Disabled
              </Badge>
            )}
          </div>

          {/* Bot Categories */}
          {botCategories.length > 0 && (
            <div>
              <h4 className="font-medium mb-2">Bot Categories:</h4>
              <div className="flex flex-wrap gap-2">
                {botCategories.map((category, index) => (
                  <Badge key={index} variant="secondary">
                    {category}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Bot Type Indicators */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className={`flex items-center gap-2 p-3 rounded-lg border ${isSearchEngine ? 'bg-blue-50 border-blue-200' : 'bg-gray-50 border-gray-200'}`}>
              <Search size={16} className={isSearchEngine ? 'text-blue-600' : 'text-gray-400'} />
              <span className={isSearchEngine ? 'text-blue-800 font-medium' : 'text-gray-600'}>
                Search Engine
              </span>
            </div>
            
            <div className={`flex items-center gap-2 p-3 rounded-lg border ${isSocialMedia ? 'bg-purple-50 border-purple-200' : 'bg-gray-50 border-gray-200'}`}>
              <Share2 size={16} className={isSocialMedia ? 'text-purple-600' : 'text-gray-400'} />
              <span className={isSocialMedia ? 'text-purple-800 font-medium' : 'text-gray-600'}>
                Social Media
              </span>
            </div>
            
            <div className={`flex items-center gap-2 p-3 rounded-lg border ${isTestingTool ? 'bg-orange-50 border-orange-200' : 'bg-gray-50 border-gray-200'}`}>
              <TestTube size={16} className={isTestingTool ? 'text-orange-600' : 'text-gray-400'} />
              <span className={isTestingTool ? 'text-orange-800 font-medium' : 'text-gray-600'}>
                Testing Tool
              </span>
            </div>
          </div>

          {/* Detailed Bot Info */}
          {botInfo && (
            <div className="space-y-3">
              <h4 className="font-medium">Bot Details:</h4>
              <div className="bg-gray-50 p-4 rounded-lg space-y-2 text-sm">
                <div>
                  <span className="font-medium">ID:</span> {botInfo.id}
                </div>
                <div>
                  <span className="font-medium">URL:</span> {botInfo.url || 'N/A'}
                </div>
                <div>
                  <span className="font-medium">Pattern:</span> {botInfo.pattern.accepted.join(', ')}
                </div>
                {botInfo.aliases && botInfo.aliases.length > 0 && (
                  <div>
                    <span className="font-medium">Aliases:</span> {botInfo.aliases.join(', ')}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* User Agent */}
          <div className="space-y-2">
            <h4 className="font-medium">User Agent:</h4>
            <div className="bg-gray-50 p-3 rounded-lg">
              <code className="text-xs break-all">{userAgent}</code>
            </div>
          </div>

          {/* Animation Status */}
          <div className="flex items-center gap-2 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
            <Zap size={16} className="text-yellow-600" />
            <span className="text-yellow-800 font-medium">
              {isBot ? 'Animations are disabled for better performance' : 'Animations are enabled for enhanced UX'}
            </span>
          </div>
        </CardContent>
      </Card>

      {/* Test Instructions */}
      <Card>
        <CardHeader>
          <CardTitle>How to Test</CardTitle>
          <CardDescription>
            Test the bot detection system with different user agents
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <h4 className="font-medium">Test Commands:</h4>
            <div className="space-y-2 text-sm">
              <div className="bg-gray-50 p-2 rounded">
                <code># Test with Googlebot</code><br />
                <code>curl -H "User-Agent: Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)" http://localhost:3000</code>
              </div>
              <div className="bg-gray-50 p-2 rounded">
                <code># Test with Facebook crawler</code><br />
                <code>curl -H "User-Agent: facebookexternalhit/1.1 (+http://www.facebook.com/externalhit_uatext.php)" http://localhost:3000</code>
              </div>
              <div className="bg-gray-50 p-2 rounded">
                <code># Test with Selenium</code><br />
                <code>curl -H "User-Agent: Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36 (selenium)" http://localhost:3000</code>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 