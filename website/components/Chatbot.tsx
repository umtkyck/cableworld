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
  'how do i get a quote':
    'Getting a quote is easy! Simply click "Get Quote" in the navigation bar, upload your design files (we accept STEP, STL, OBJ, DXF, and PDF formats), and fill out the specifications. Our team will respond within 24 hours with a detailed quote.',
  'what file formats do you accept':
    'We accept a wide variety of CAD and design files including: STEP (.step, .stp), STL (.stl), OBJ (.obj), DXF (.dxf), DWG (.dwg), and PDF files. You can also use our online Cable Designer tool to create your harness design from scratch.',
  'how long does shipping take':
    'We offer worldwide shipping! Standard shipping takes 5-7 business days, while express shipping delivers in 2-3 business days. Orders over $1,000 qualify for FREE worldwide shipping.',
  'do you offer bulk discounts':
    'Yes! We offer tiered pricing for bulk orders: 10-49 units get 10% off, 50-99 units get 15% off, and 100+ units get 20% off. Contact our sales team for custom enterprise pricing on large orders.',
  pricing:
    'Our pricing is competitive and transparent. Basic cable harnesses start at $25, while complex assemblies are priced based on specifications. Visit our Pricing page for detailed information or get a custom quote.',
  contact:
    'You can reach us at support@harnesscart.com or use the Contact page on our website. Our team is available Monday-Friday, 9 AM - 6 PM EST.',
  hello:
    'Hello! 👋 Welcome to Harness Cart. How can I help you today? Feel free to ask about our products, pricing, or the ordering process.',
  hi: 'Hi there! 👋 Welcome to Harness Cart. How can I assist you today?',
  thanks: "You're welcome! Is there anything else I can help you with?",
  'thank you': "You're welcome! Feel free to ask if you have any other questions.",
  default:
    "I'm here to help! You can ask me about getting quotes, file formats, shipping, pricing, or bulk discounts. For complex inquiries, please contact our support team at support@harnesscart.com.",
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
  if (
    lowerMessage.includes('file') ||
    lowerMessage.includes('format') ||
    lowerMessage.includes('upload')
  ) {
    return botResponses['what file formats do you accept']
  }
  if (
    lowerMessage.includes('ship') ||
    lowerMessage.includes('delivery') ||
    lowerMessage.includes('deliver')
  ) {
    return botResponses['how long does shipping take']
  }
  if (
    lowerMessage.includes('bulk') ||
    lowerMessage.includes('discount') ||
    lowerMessage.includes('wholesale')
  ) {
    return botResponses['do you offer bulk discounts']
  }
  if (
    lowerMessage.includes('price') ||
    lowerMessage.includes('cost') ||
    lowerMessage.includes('how much')
  ) {
    return botResponses['pricing']
  }
  if (
    lowerMessage.includes('contact') ||
    lowerMessage.includes('email') ||
    lowerMessage.includes('phone') ||
    lowerMessage.includes('support')
  ) {
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
      timestamp: new Date(),
    },
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
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue('')
    setIsTyping(true)

    // Simulate bot typing delay
    setTimeout(
      () => {
        const botResponse: Message = {
          id: Date.now() + 1,
          text: getBotResponse(text),
          sender: 'bot',
          timestamp: new Date(),
        }
        setMessages((prev) => [...prev, botResponse])
        setIsTyping(false)
      },
      1000 + Math.random() * 1000
    )
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
        className="group fixed bottom-6 right-6 z-50 rounded-full bg-gradient-to-r from-orange-500 to-emerald-500 p-4 text-white shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-xl"
        aria-label="Open chat"
      >
        <MessageCircle className="h-6 w-6" />
        <span className="absolute -right-2 -top-2 flex h-5 w-5 animate-pulse items-center justify-center rounded-full bg-red-500 text-xs text-white">
          1
        </span>
        <span className="absolute bottom-full right-0 mb-2 whitespace-nowrap rounded-lg bg-slate-800 px-3 py-1 text-sm text-white opacity-0 transition-opacity group-hover:opacity-100">
          Chat with us!
        </span>
      </button>
    )
  }

  return (
    <div
      className={`fixed bottom-6 right-6 z-50 transition-all duration-300 ${isMinimized ? 'w-72' : 'w-96'}`}
    >
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between bg-gradient-to-r from-orange-500 to-emerald-500 p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20">
              <Bot className="h-6 w-6 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-white">Harness Cart Support</h3>
              <p className="text-xs text-white/80">{isTyping ? 'Typing...' : 'Online'}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsMinimized(!isMinimized)}
              className="p-1 text-white/80 transition hover:text-white"
              aria-label={isMinimized ? 'Expand chat' : 'Minimize chat'}
            >
              <Minimize2 className="h-5 w-5" />
            </button>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 text-white/80 transition hover:text-white"
              aria-label="Close chat"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {!isMinimized && (
          <>
            {/* Messages */}
            <div className="h-80 space-y-4 overflow-y-auto bg-slate-50 p-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex items-start gap-2 ${
                    message.sender === 'user' ? 'flex-row-reverse' : ''
                  }`}
                >
                  <div
                    className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full ${
                      message.sender === 'user' ? 'bg-orange-500' : 'bg-emerald-500'
                    }`}
                  >
                    {message.sender === 'user' ? (
                      <User className="h-4 w-4 text-white" />
                    ) : (
                      <Bot className="h-4 w-4 text-white" />
                    )}
                  </div>
                  <div
                    className={`max-w-[75%] rounded-2xl p-3 ${
                      message.sender === 'user'
                        ? 'rounded-br-md bg-orange-500 text-white'
                        : 'rounded-bl-md bg-white text-slate-700 shadow-sm'
                    }`}
                  >
                    <p className="text-sm leading-relaxed">{message.text}</p>
                    <p
                      className={`mt-1 text-xs ${
                        message.sender === 'user' ? 'text-white/70' : 'text-slate-400'
                      }`}
                    >
                      {message.timestamp.toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </p>
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex items-start gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500">
                    <Bot className="h-4 w-4 text-white" />
                  </div>
                  <div className="rounded-2xl rounded-bl-md bg-white p-3 shadow-sm">
                    <div className="flex gap-1">
                      <div
                        className="h-2 w-2 animate-bounce rounded-full bg-slate-400"
                        style={{ animationDelay: '0ms' }}
                      />
                      <div
                        className="h-2 w-2 animate-bounce rounded-full bg-slate-400"
                        style={{ animationDelay: '150ms' }}
                      />
                      <div
                        className="h-2 w-2 animate-bounce rounded-full bg-slate-400"
                        style={{ animationDelay: '300ms' }}
                      />
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick Replies */}
            {messages.length <= 2 && (
              <div className="border-t border-slate-200 bg-white px-4 py-2">
                <p className="mb-2 text-xs text-slate-500">Quick questions:</p>
                <div className="flex flex-wrap gap-2">
                  {quickReplies.map((reply, index) => (
                    <button
                      key={index}
                      onClick={() => handleQuickReply(reply)}
                      className="rounded-full bg-slate-100 px-3 py-1.5 text-xs text-slate-700 transition hover:bg-slate-200"
                    >
                      {reply}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input */}
            <form onSubmit={handleSubmit} className="border-t border-slate-200 bg-white p-4">
              <div className="flex items-center gap-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-1 rounded-full border border-slate-300 px-4 py-2 text-sm focus:border-transparent focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
                <button
                  type="submit"
                  disabled={!inputValue.trim()}
                  className="rounded-full bg-gradient-to-r from-orange-500 to-emerald-500 p-2 text-white transition hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-50"
                  aria-label="Send message"
                >
                  <Send className="h-5 w-5" />
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  )
}
