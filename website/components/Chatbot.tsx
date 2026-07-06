'use client'

import { useState, useRef, useEffect } from 'react'
import { MessageCircle, X, Send, Bot, User, Minimize2 } from 'lucide-react'

interface Message {
  id: number
  text: string
  sender: 'user' | 'bot'
  timestamp: Date
}

const quickReplies = [
  'How do I get a quote?',
  'What file formats do you accept?',
  'How long does shipping take?',
  'Do you offer bulk discounts?',
]

const botResponses: Record<string, string> = {
  'how do i get a quote': 'Getting a quote is easy! Simply click "Get Quote" in the navigation bar, upload your design files (we accept STEP, STL, OBJ, DXF, and PDF formats), and fill out the specifications. Our team will respond within 24 hours with a detailed quote.',
  'what file formats do you accept': 'We accept a wide variety of CAD and design files including: STEP (.step, .stp), STL (.stl), OBJ (.obj), DXF (.dxf), DWG (.dwg), and PDF files. You can also use our online Cable Designer tool to create your harness design from scratch.',
  'how long does shipping take': 'We ship across the US, Canada, and Mexico. Standard shipping takes 5–7 business days; express options are 2–3 business days. Orders over $1,000 qualify for free shipping on the lowest-cost ground option.',
  'do you offer bulk discounts': 'Yes! We offer tiered pricing for bulk orders: 10-49 units get 10% off, 50-99 units get 15% off, and 100+ units get 20% off. Contact our sales team for custom enterprise pricing on large orders.',
  'pricing': 'Our pricing is competitive and transparent. Basic cable harnesses start at $25, while complex assemblies are priced based on specifications. Visit our Pricing page for detailed information or get a custom quote.',
  'contact': 'You can reach us at umtkyck@gmail.com or use the Contact page on our website. Our team is available Monday-Friday, 9 AM - 6 PM EST.',
  'hello': 'Hello! 👋 Welcome to Harness Cart. How can I help you today? Feel free to ask about our products, pricing, or the ordering process.',
  'hi': 'Hi there! 👋 Welcome to Harness Cart. How can I assist you today?',
  'thanks': "You're welcome! Is there anything else I can help you with?",
  'thank you': "You're welcome! Feel free to ask if you have any other questions.",
  'default': "I'm here to help! You can ask me about getting quotes, file formats, shipping, pricing, or bulk discounts. For complex inquiries, please contact our support team at umtkyck@gmail.com."
}

function getBotResponse(userMessage: string): string {
  const lowerMessage = userMessage.toLowerCase().trim()

  // Check for keyword matches
  for (const [key, response] of Object.entries(botResponses)) {
    if (key !== 'default' && lowerMessage.includes(key)) {
      return response
    }
  }

  // Check for partial matches
  if (lowerMessage.includes('quote') || lowerMessage.includes('order')) {
    return botResponses['how do i get a quote']
  }
  if (lowerMessage.includes('file') || lowerMessage.includes('format') || lowerMessage.includes('upload')) {
    return botResponses['what file formats do you accept']
  }
  if (lowerMessage.includes('ship') || lowerMessage.includes('delivery') || lowerMessage.includes('deliver')) {
    return botResponses['how long does shipping take']
  }
  if (lowerMessage.includes('bulk') || lowerMessage.includes('discount') || lowerMessage.includes('wholesale')) {
    return botResponses['do you offer bulk discounts']
  }
  if (lowerMessage.includes('price') || lowerMessage.includes('cost') || lowerMessage.includes('how much')) {
    return botResponses['pricing']
  }
  if (lowerMessage.includes('contact') || lowerMessage.includes('email') || lowerMessage.includes('phone') || lowerMessage.includes('support')) {
    return botResponses['contact']
  }

  return botResponses['default']
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hello! 👋 Welcome to Harness Cart. I'm here to help you with any questions about our cable harness solutions. How can I assist you today?",
      sender: 'bot',
      timestamp: new Date()
    }
  ])
  const [inputValue, setInputValue] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    if (isOpen && !isMinimized) {
      inputRef.current?.focus()
    }
  }, [isOpen, isMinimized])

  const sendMessage = (text: string) => {
    if (!text.trim()) return

    const userMessage: Message = {
      id: Date.now(),
      text: text.trim(),
      sender: 'user',
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputValue('')
    setIsTyping(true)

    // Simulate bot typing delay
    setTimeout(() => {
      const botResponse: Message = {
        id: Date.now() + 1,
        text: getBotResponse(text),
        sender: 'bot',
        timestamp: new Date()
      }
      setMessages(prev => [...prev, botResponse])
      setIsTyping(false)
    }, 1000 + Math.random() * 1000)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    sendMessage(inputValue)
  }

  const handleQuickReply = (reply: string) => {
    sendMessage(reply)
  }

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 bg-slate-900 dark:bg-white text-white dark:text-slate-900 p-4 rounded-full shadow-medium hover:opacity-90 transition-opacity duration-200 z-50 group"
        aria-label="Open chat"
      >
        <MessageCircle className="w-6 h-6" />
        <span className="absolute bottom-full right-0 mb-2 px-3 py-1 bg-slate-900 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
          Chat with us
        </span>
      </button>
    )
  }

  return (
    <div className={`fixed bottom-6 right-6 z-50 transition-all duration-300 ${isMinimized ? 'w-72' : 'w-96'}`}>
      <div className="bg-white rounded-2xl shadow-large overflow-hidden border border-slate-200">
        {/* Header */}
        <div className="bg-slate-900 p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center">
              <Bot className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-white font-semibold">Harness Cart Support</h3>
              <p className="text-white/80 text-xs">
                {isTyping ? 'Typing...' : 'Online'}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsMinimized(!isMinimized)}
              className="text-white/80 hover:text-white transition p-1"
              aria-label={isMinimized ? 'Expand chat' : 'Minimize chat'}
            >
              <Minimize2 className="w-5 h-5" />
            </button>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white/80 hover:text-white transition p-1"
              aria-label="Close chat"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {!isMinimized && (
          <>
            {/* Messages */}
            <div className="h-80 overflow-y-auto p-4 space-y-4 bg-slate-50">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex items-start gap-2 ${
                    message.sender === 'user' ? 'flex-row-reverse' : ''
                  }`}
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                      message.sender === 'user'
                        ? 'bg-slate-700'
                        : 'bg-slate-900'
                    }`}
                  >
                    {message.sender === 'user' ? (
                      <User className="w-4 h-4 text-white" />
                    ) : (
                      <Bot className="w-4 h-4 text-white" />
                    )}
                  </div>
                  <div
                    className={`max-w-[75%] p-3 rounded-2xl ${
                      message.sender === 'user'
                        ? 'bg-slate-900 text-white rounded-br-md'
                        : 'bg-white text-slate-700 rounded-bl-md shadow-sm'
                    }`}
                  >
                    <p className="text-sm leading-relaxed">{message.text}</p>
                    <p
                      className={`text-xs mt-1 ${
                        message.sender === 'user'
                          ? 'text-white/70'
                          : 'text-slate-400'
                      }`}
                    >
                      {message.timestamp.toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </p>
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex items-start gap-2">
                  <div className="w-8 h-8 rounded-full bg-slate-900 flex items-center justify-center">
                    <Bot className="w-4 h-4 text-white" />
                  </div>
                  <div className="bg-white p-3 rounded-2xl rounded-bl-md shadow-sm">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                      <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                      <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick Replies */}
            {messages.length <= 2 && (
              <div className="px-4 py-2 border-t border-slate-200 bg-white">
                <p className="text-xs text-slate-500 mb-2">Quick questions:</p>
                <div className="flex flex-wrap gap-2">
                  {quickReplies.map((reply, index) => (
                    <button
                      key={index}
                      onClick={() => handleQuickReply(reply)}
                      className="text-xs px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-full transition"
                    >
                      {reply}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input */}
            <form onSubmit={handleSubmit} className="p-4 border-t border-slate-200 bg-white">
              <div className="flex items-center gap-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-1 px-4 py-2 border border-slate-300 rounded-full focus:outline-none focus:ring-1 focus:ring-slate-900 focus:border-slate-900 text-sm"
                />
                <button
                  type="submit"
                  disabled={!inputValue.trim()}
                  className="p-2 bg-slate-900 text-white rounded-full hover:bg-slate-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                  aria-label="Send message"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  )
}
