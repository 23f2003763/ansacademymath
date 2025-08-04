'use client'

import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Send, 
  Bot, 
  User, 
  MessageSquare,
  Users,
  Search,
  Phone,
  Video,
  MoreVertical,
  Paperclip,
  Smile,
  ArrowLeft
} from 'lucide-react'
import Link from 'next/link'
import { LaTeXRenderer } from '@/components/ui/latex-renderer'
import { useSocket } from '@/components/providers'

interface Message {
  id: string
  content: string
  latex?: string
  sender: {
    id: string
    name: string
    avatar?: string
    type: 'user' | 'ai' | 'expert'
  }
  timestamp: Date
  isMe: boolean
}

interface ChatRoom {
  id: string
  name: string
  type: 'direct' | 'expert' | 'ai'
  participants: Array<{
    id: string
    name: string
    avatar?: string
    status: 'online' | 'offline' | 'away'
    role?: string
  }>
  lastMessage?: string
  lastActivity: Date
  unreadCount: number
}

export default function ChatPage() {
  const [selectedChat, setSelectedChat] = useState<string | null>(null)
  const [message, setMessage] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const [messages, setMessages] = useState<Message[]>([])
  const [chatRooms, setChatRooms] = useState<ChatRoom[]>([
    {
      id: 'ai-tutor',
      name: 'AI Tutor',
      type: 'ai',
      participants: [
        {
          id: 'ai-1',
          name: 'AI Tutor',
          status: 'online',
          role: 'AI Assistant'
        }
      ],
      lastMessage: 'How can I help you with your studies today?',
      lastActivity: new Date(Date.now() - 5 * 60 * 1000),
      unreadCount: 0
    },
    {
      id: 'expert-1',
      name: 'Dr. Sarah Wilson',
      type: 'expert',
      participants: [
        {
          id: 'expert-sarah',
          name: 'Dr. Sarah Wilson',
          status: 'online',
          role: 'Mathematics Expert'
        }
      ],
      lastMessage: 'Let me know if you need help with calculus!',
      lastActivity: new Date(Date.now() - 15 * 60 * 1000),
      unreadCount: 2
    },
    {
      id: 'student-1',
      name: 'John Doe',
      type: 'direct',
      participants: [
        {
          id: 'student-john',
          name: 'John Doe',
          status: 'away'
        }
      ],
      lastMessage: 'Thanks for the help with physics!',
      lastActivity: new Date(Date.now() - 2 * 60 * 60 * 1000),
      unreadCount: 0
    }
  ])

  const messagesEndRef = useRef<HTMLDivElement>(null)
  const { socket } = useSocket()

  useEffect(() => {
    if (selectedChat === 'ai-tutor') {
      setMessages([
        {
          id: '1',
          content: 'Hello! I\'m your AI tutor. I can help you with questions on Mathematics, Physics, Chemistry, and Computer Science. What would you like to learn today?',
          sender: {
            id: 'ai-1',
            name: 'AI Tutor',
            type: 'ai'
          },
          timestamp: new Date(Date.now() - 10 * 60 * 1000),
          isMe: false
        }
      ])
    } else if (selectedChat === 'expert-1') {
      setMessages([
        {
          id: '1',
          content: 'Hi! I\'m Dr. Sarah Wilson, a Mathematics expert. I\'m here to help you with any calculus, algebra, or geometry questions you might have.',
          sender: {
            id: 'expert-sarah',
            name: 'Dr. Sarah Wilson',
            type: 'expert'
          },
          timestamp: new Date(Date.now() - 30 * 60 * 1000),
          isMe: false
        },
        {
          id: '2',
          content: 'I\'m struggling with integration by parts. Could you help me understand when to use it?',
          sender: {
            id: 'me',
            name: 'You',
            type: 'user'
          },
          timestamp: new Date(Date.now() - 25 * 60 * 1000),
          isMe: true
        },
        {
          id: '3',
          content: 'Of course! Integration by parts is used when you have a product of two functions. The formula is: $\\int u \\, dv = uv - \\int v \\, du$. Choose $u$ as the function that becomes simpler when differentiated.',
          latex: 'The integration by parts formula: $\\int u \\, dv = uv - \\int v \\, du$',
          sender: {
            id: 'expert-sarah',
            name: 'Dr. Sarah Wilson',
            type: 'expert'
          },
          timestamp: new Date(Date.now() - 20 * 60 * 1000),
          isMe: false
        }
      ])
    }
  }, [selectedChat])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const sendMessage = async () => {
    if (!message.trim() || !selectedChat) return

    const newMessage: Message = {
      id: Date.now().toString(),
      content: message,
      sender: {
        id: 'me',
        name: 'You',
        type: 'user'
      },
      timestamp: new Date(),
      isMe: true
    }

    setMessages(prev => [...prev, newMessage])
    setMessage('')

    // Handle AI response
    if (selectedChat === 'ai-tutor') {
      try {
        const response = await fetch('/api/ai/answer', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            question: message,
            context: 'chat'
          })
        })

        const data = await response.json()
        
        const aiResponse: Message = {
          id: (Date.now() + 1).toString(),
          content: data.answer,
          sender: {
            id: 'ai-1',
            name: 'AI Tutor',
            type: 'ai'
          },
          timestamp: new Date(),
          isMe: false
        }

        setTimeout(() => {
          setMessages(prev => [...prev, aiResponse])
        }, 1000)
      } catch (error) {
        console.error('Failed to get AI response:', error)
      }
    }

    // Send message via socket for real-time chat
    if (socket && selectedChat !== 'ai-tutor') {
      socket.emit('private-message', {
        receiverId: selectedChat,
        content: message,
        senderId: 'me'
      })
    }
  }

  const selectedChatData = chatRooms.find(chat => chat.id === selectedChat)
  const filteredChats = chatRooms.filter(chat =>
    chat.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Navigation */}
      <nav className="glass border-b border-white/10">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Link href="/dashboard" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">A</span>
              </div>
              <span className="text-xl font-bold text-white">ANS Academy</span>
            </Link>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8 h-[calc(100vh-5rem)]">
        <div className="grid lg:grid-cols-4 gap-6 h-full">
          {/* Chat List */}
          <div className="lg:col-span-1">
            <Card className="glass border-white/10 h-full flex flex-col">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <MessageSquare className="w-5 h-5 mr-2" />
                  Messages
                </CardTitle>
                <div className="relative">
                  <Search className="absolute left-3 top-3 w-4 h-4 text-white/50" />
                  <Input
                    placeholder="Search conversations..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-white/50"
                  />
                </div>
              </CardHeader>
              <CardContent className="flex-1 overflow-y-auto">
                <div className="space-y-2">
                  {filteredChats.map((chat) => (
                    <div
                      key={chat.id}
                      onClick={() => setSelectedChat(chat.id)}
                      className={`p-3 rounded-lg cursor-pointer transition-all duration-200 ${
                        selectedChat === chat.id
                          ? 'bg-blue-500/20 border border-blue-500/30'
                          : 'bg-white/5 hover:bg-white/10 border border-transparent'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <div className="relative">
                          <Avatar className="w-10 h-10">
                            <AvatarImage src={chat.participants[0]?.avatar} />
                            <AvatarFallback>
                              {chat.type === 'ai' ? (
                                <Bot className="w-5 h-5" />
                              ) : (
                                chat.name.split(' ').map(n => n[0]).join('')
                              )}
                            </AvatarFallback>
                          </Avatar>
                          <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-slate-900 ${
                            chat.participants[0]?.status === 'online' ? 'bg-green-400' :
                            chat.participants[0]?.status === 'away' ? 'bg-yellow-400' : 'bg-gray-400'
                          }`} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <h3 className="text-white font-medium truncate">{chat.name}</h3>
                            {chat.unreadCount > 0 && (
                              <Badge className="bg-red-500 text-white text-xs">
                                {chat.unreadCount}
                              </Badge>
                            )}
                          </div>
                          <p className="text-white/70 text-sm truncate">{chat.lastMessage}</p>
                          <div className="flex items-center justify-between mt-1">
                            <span className="text-xs text-white/50">
                              {chat.lastActivity.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </span>
                            {chat.type === 'expert' && (
                              <Badge className="bg-blue-500/20 text-blue-300 text-xs">
                                Expert
                              </Badge>
                            )}
                            {chat.type === 'ai' && (
                              <Badge className="bg-purple-500/20 text-purple-300 text-xs">
                                AI
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Chat Window */}
          <div className="lg:col-span-3">
            {selectedChat ? (
              <Card className="glass border-white/10 h-full flex flex-col">
                {/* Chat Header */}
                <CardHeader className="border-b border-white/10">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Avatar>
                        <AvatarImage src={selectedChatData?.participants[0]?.avatar} />
                        <AvatarFallback>
                          {selectedChatData?.type === 'ai' ? (
                            <Bot className="w-5 h-5" />
                          ) : (
                            selectedChatData?.name.split(' ').map(n => n[0]).join('')
                          )}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="text-white font-medium">{selectedChatData?.name}</h3>
                        <p className="text-white/70 text-sm">
                          {selectedChatData?.participants[0]?.role || 
                           (selectedChatData?.participants[0]?.status === 'online' ? 'Online' : 'Offline')}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {selectedChatData?.type === 'expert' && (
                        <>
                          <Button size="sm" variant="ghost">
                            <Phone className="w-4 h-4" />
                          </Button>
                          <Button size="sm" variant="ghost">
                            <Video className="w-4 h-4" />
                          </Button>
                        </>
                      )}
                      <Button size="sm" variant="ghost">
                        <MoreVertical className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>

                {/* Messages */}
                <CardContent className="flex-1 overflow-y-auto p-0">
                  <div className="p-4 space-y-4">
                    {messages.map((msg) => (
                      <motion.div
                        key={msg.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        className={`flex ${msg.isMe ? 'justify-end' : 'justify-start'}`}
                      >
                        <div className={`max-w-[70%] ${msg.isMe ? 'order-2' : 'order-1'}`}>
                          <div className={`p-3 rounded-lg ${
                            msg.isMe
                              ? 'bg-blue-500 text-white'
                              : msg.sender.type === 'ai'
                              ? 'bg-purple-500/20 text-white border border-purple-500/30'
                              : 'bg-white/10 text-white border border-white/20'
                          }`}>
                            {msg.latex ? (
                              <LaTeXRenderer content={msg.content} latex={msg.content} className="text-sm" />
                            ) : (
                              <p className="text-sm">{msg.content}</p>
                            )}
                          </div>
                          <div className={`flex items-center mt-1 space-x-2 ${
                            msg.isMe ? 'justify-end' : 'justify-start'
                          }`}>
                            {!msg.isMe && (
                              <Avatar className="w-6 h-6">
                                <AvatarFallback className="text-xs">
                                  {msg.sender.type === 'ai' ? (
                                    <Bot className="w-3 h-3" />
                                  ) : (
                                    msg.sender.name.split(' ').map(n => n[0]).join('')
                                  )}
                                </AvatarFallback>
                              </Avatar>
                            )}
                            <span className="text-xs text-white/50">
                              {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </span>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                    <div ref={messagesEndRef} />
                  </div>
                </CardContent>

                {/* Message Input */}
                <div className="border-t border-white/10 p-4">
                  <div className="flex items-center space-x-2">
                    <Button size="sm" variant="ghost">
                      <Paperclip className="w-4 h-4" />
                    </Button>
                    <div className="flex-1 relative">
                      <Input
                        placeholder="Type your message... (LaTeX supported with $ $)"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                        className="bg-white/5 border-white/10 text-white placeholder:text-white/50 pr-20"
                      />
                      <div className="absolute right-2 top-2 flex space-x-1">
                        <Button size="sm" variant="ghost">
                          <Smile className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                    <Button onClick={sendMessage} className="bg-blue-500 hover:bg-blue-600">
                      <Send className="w-4 h-4" />
                    </Button>
                  </div>
                  <p className="text-xs text-white/50 mt-2">
                        Use $ for inline math like $x^2$ or $$ for display math like $$\int_0^\infty  dx$$
                    </p>
                </div>
              </Card>
            ) : (
              <Card className="glass border-white/10 h-full flex items-center justify-center">
                <div className="text-center">
                  <MessageSquare className="w-16 h-16 text-white/30 mx-auto mb-4" />
                  <h3 className="text-white text-lg font-medium mb-2">Select a conversation</h3>
                  <p className="text-white/70">Choose a chat from the sidebar to start messaging</p>
                </div>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}