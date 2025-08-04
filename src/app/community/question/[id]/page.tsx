'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Separator } from '@/components/ui/separator'
import { 
  ThumbsUp, 
  ThumbsDown, 
  MessageSquare, 
  Share,
  Flag,
  BookCheck,
  ArrowLeft,
  Send,
  Bot,
  CheckCircle,
  Star,
  Clock
} from 'lucide-react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { LaTeXRenderer } from '@/components/ui/latex-renderer'

interface Question {
  id: string
  title: string
  content: string
  latex?: string
  author: {
    id: string
    name: string
    username: string
    ansPoints: number
    avatar?: string
  }
  subject: string
  exam: string
  difficulty: string
  upvotes: number
  downvotes: number
  isAnswered: boolean
  createdAt: string
  tags: string[]
}

interface Answer {
  id: string
  content: string
  latex?: string
  isCorrect: boolean
  isAI: boolean
  upvotes: number
  downvotes: number
  author: {
    id: string
    name: string
    username: string
    ansPoints: number
    avatar?: string
  }
  createdAt: string
  comments: Comment[]
}

interface Comment {
  id: string
  content: string
  latex?: string
  author: {
    id: string
    name: string
    username: string
    ansPoints: number
    avatar?: string
  }
  upvotes: number
  downvotes: number
  createdAt: string
}

export default function QuestionDetailPage() {
  const params = useParams()
  const questionId = params.id as string
  
  const [question, setQuestion] = useState<Question>({
    id: questionId,
    title: 'How to solve limits involving indeterminate forms?',
    content: 'I am struggling with limits like $\\lim_{x \\to 0} \\frac{\\sin x}{x}$. Can someone explain the L\'Hôpital\'s rule approach step by step? I understand the basic concept but get confused when applying it to complex expressions.',
    latex: 'Example: $\\lim_{x \\to 0} \\frac{\\sin x}{x} = 1$',
    author: {
      id: '1',
      name: 'John Doe',
      username: 'johndoe',
      ansPoints: 1250,
      avatar: undefined
    },
    subject: 'Mathematics',
    exam: 'JEE Main',
    difficulty: 'Medium',
    upvotes: 15,
    downvotes: 2,
    isAnswered: true,
    createdAt: '2 hours ago',
    tags: ['limits', 'calculus', 'lhopital-rule']
  })

  const [answers, setAnswers] = useState<Answer[]>([
    {
      id: '1',
      content: 'L\'Hôpital\'s rule is used when you have indeterminate forms like 0/0 or ∞/∞. The rule states that if you have $\\lim_{x \\to a} \\frac{f(x)}{g(x)}$ and both f(a) and g(a) equal 0 (or both approach ∞), then the limit equals $\\lim_{x \\to a} \\frac{f\'(x)}{g\'(x)}$ provided this limit exists.',
      latex: 'L\'Hôpital\'s Rule: If $\\lim_{x \\to a} f(x) = \\lim_{x \\to a} g(x) = 0$ (or $\\pm\\infty$), then:\n$$\\lim_{x \\to a} \\frac{f(x)}{g(x)} = \\lim_{x \\to a} \\frac{f\'(x)}{g\'(x)}$$',
      isCorrect: true,
      isAI: false,
      upvotes: 23,
      downvotes: 1,
      author: {
        id: '2',
        name: 'Dr. Sarah Wilson',
        username: 'swilson',
        ansPoints: 3400,
        avatar: undefined
      },
      createdAt: '1 hour ago',
      comments: [
        {
          id: '1',
          content: 'Great explanation! This really helped me understand the concept.',
          author: {
            id: '3',
            name: 'Alice Chen',
            username: 'alicechen',
            ansPoints: 850,
            avatar: undefined
          },
          upvotes: 5,
          downvotes: 0,
          createdAt: '30 minutes ago'
        }
      ]
    },
    {
      id: '2',
      content: 'For your specific example $\\lim_{x \\to 0} \\frac{\\sin x}{x}$, you don\'t actually need L\'Hôpital\'s rule. This is a standard limit that equals 1. However, if you did use L\'Hôpital\'s rule: differentiate the numerator to get cos(x) and the denominator to get 1, so the limit becomes $\\lim_{x \\to 0} \\frac{\\cos x}{1} = \\cos(0) = 1$.',
      isCorrect: true,
      isAI: true,
      upvotes: 12,
      downvotes: 0,
      author: {
        id: 'ai',
        name: 'AI Tutor',
        username: 'ai_tutor',
        ansPoints: 0,
        avatar: undefined
      },
      createdAt: '45 minutes ago',
      comments: []
    }
  ])

  const [newAnswer, setNewAnswer] = useState('')
  const [newComment, setNewComment] = useState<{[key: string]: string}>({})

  const handleVote = (type: 'question' | 'answer' | 'comment', id: string, voteType: 'up' | 'down') => {
    // Implement voting logic
    console.log(`${voteType}vote ${type} ${id}`)
  }

  const handleAnswerSubmit = async () => {
    if (!newAnswer.trim()) return

    // Add new answer
    const answer: Answer = {
      id: Date.now().toString(),
      content: newAnswer,
      isCorrect: false,
      isAI: false,
      upvotes: 0,
      downvotes: 0,
      author: {
        id: 'current-user',
        name: 'You',
        username: 'you',
        ansPoints: 1500,
        avatar: undefined
      },
      createdAt: 'just now',
      comments: []
    }

    setAnswers(prev => [...prev, answer])
    setNewAnswer('')
  }

  const handleCommentSubmit = (answerId: string) => {
    const content = newComment[answerId]
    if (!content?.trim()) return

    const comment: Comment = {
      id: Date.now().toString(),
      content,
      author: {
        id: 'current-user',
        name: 'You',
        username: 'you',
        ansPoints: 1500,
        avatar: undefined
      },
      upvotes: 0,
      downvotes: 0,
      createdAt: 'just now'
    }

    setAnswers(prev => prev.map(answer => 
      answer.id === answerId 
        ? { ...answer, comments: [...answer.comments, comment] }
        : answer
    ))

    setNewComment(prev => ({ ...prev, [answerId]: '' }))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Navigation */}
      <nav className="glass border-b border-white/10">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Link href="/community" className="flex items-center space-x-2">
              <ArrowLeft className="w-4 h-4 mr-2 text-white/70" />
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">A</span>
              </div>
              <span className="text-xl font-bold text-white">Community</span>
            </Link>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm">
                <Share className="w-4 h-4 mr-2" />
                Share
              </Button>
              <Button variant="outline" size="sm">
                <Flag className="w-4 h-4 mr-2" />
                Report
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Question */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Card className="glass border-white/10 mb-8">
            <CardContent className="p-6">
              <div className="flex gap-4">
                {/* Voting */}
                <div className="flex flex-col items-center space-y-2 flex-shrink-0">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleVote('question', question.id, 'up')}
                    className="p-2 hover:bg-green-500/20"
                  >
                    <ThumbsUp className="w-5 h-5 text-white/70 hover:text-green-400" />
                  </Button>
                  <span className="text-white font-bold text-lg">
                    {question.upvotes - question.downvotes}
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleVote('question', question.id, 'down')}
                    className="p-2 hover:bg-red-500/20"
                  >
                    <ThumbsDown className="w-5 h-5 text-white/70 hover:text-red-400" />
                  </Button>
                  {question.isAnswered && (
                    <BookCheck className="w-6 h-6 text-green-400 mt-2" />
                  )}
                </div>

                {/* Content */}
                <div className="flex-1">
                  <h1 className="text-2xl font-bold text-white mb-4">{question.title}</h1>
                  
                  <div className="mb-4">
                    <LaTeXRenderer 
                      content={question.content}
                      latex={question.content} 
                      className="text-white/80"
                    />
                  </div>

                  {question.latex && (
                    <div className="bg-white/5 p-4 rounded-lg border border-white/10 mb-4">
                      <LaTeXRenderer content={question.latex} latex={question.latex} className="text-white" />
                    </div>
                  )}

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    <Badge className="bg-blue-500/20 text-blue-300 border-blue-500/30">
                      {question.subject}
                    </Badge>
                    <Badge className="bg-purple-500/20 text-purple-300 border-purple-500/30">
                      {question.exam}
                    </Badge>
                    <Badge className="bg-orange-500/20 text-orange-300 border-orange-500/30">
                      {question.difficulty}
                    </Badge>
                    {question.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  {/* Author */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Avatar className="w-8 h-8">
                        <AvatarImage src={question.author.avatar} />
                        <AvatarFallback>
                          {question.author.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-white font-medium">{question.author.name}</p>
                        <div className="flex items-center space-x-2 text-xs text-white/70">
                          <span>{question.author.ansPoints.toLocaleString()} ANS</span>
                          <span>•</span>
                          <span>{question.createdAt}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4 text-white/70 text-sm">
                      <div className="flex items-center space-x-1">
                        <MessageSquare className="w-4 h-4" />
                        <span>{answers.length} answers</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Answers */}
        <div className="space-y-6">
          <h2 className="text-xl font-bold text-white">{answers.length} Answers</h2>
          
          {answers.map((answer, index) => (
            <motion.div
              key={answer.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.4 }}
            >
              <Card className="glass border-white/10">
                <CardContent className="p-6">
                  <div className="flex gap-4">
                    {/* Voting */}
                    <div className="flex flex-col items-center space-y-2 flex-shrink-0">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleVote('answer', answer.id, 'up')}
                        className="p-2 hover:bg-green-500/20"
                      >
                        <ThumbsUp className="w-4 h-4 text-white/70 hover:text-green-400" />
                      </Button>
                      <span className="text-white font-medium">
                        {answer.upvotes - answer.downvotes}
                      </span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleVote('answer', answer.id, 'down')}
                        className="p-2 hover:bg-red-500/20"
                      >
                        <ThumbsDown className="w-4 h-4 text-white/70 hover:text-red-400" />
                      </Button>
                      {answer.isCorrect && (
                        <CheckCircle className="w-5 h-5 text-green-400" />
                      )}
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      <div className="mb-4">
                        <LaTeXRenderer 
                          content={answer.content}
                          latex={answer.content} 
                          className="text-white/80"
                        />
                      </div>

                      {answer.latex && (
                        <div className="bg-white/5 p-4 rounded-lg border border-white/10 mb-4">
                          <LaTeXRenderer content={answer.latex} latex={answer.latex} className="text-white" />
                        </div>
                      )}

                      {/* Author */}
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <Avatar className="w-8 h-8">
                            <AvatarImage src={answer.author.avatar} />
                            <AvatarFallback>
                              {answer.isAI ? <Bot className="w-4 h-4" /> : answer.author.name.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="flex items-center space-x-2">
                              <p className="text-white font-medium">{answer.author.name}</p>
                              {answer.isAI && (
                                <Badge className="bg-purple-500/20 text-purple-300 text-xs">AI</Badge>
                              )}
                              {answer.isCorrect && (
                                <Badge className="bg-green-500/20 text-green-300 text-xs">Verified</Badge>
                              )}
                            </div>
                            <div className="flex items-center space-x-2 text-xs text-white/70">
                              {!answer.isAI && <span>{answer.author.ansPoints.toLocaleString()} ANS</span>}
                              <span>•</span>
                              <span>{answer.createdAt}</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Comments */}
                      {answer.comments.length > 0 && (
                        <div className="space-y-3 pl-4 border-l border-white/10">
                          {answer.comments.map((comment) => (
                            <div key={comment.id} className="bg-white/5 p-3 rounded-lg">
                              <div className="flex gap-3">
                                <div className="flex flex-col items-center space-y-1">
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => handleVote('comment', comment.id, 'up')}
                                    className="p-1"
                                  >
                                    <ThumbsUp className="w-3 h-3 text-white/50" />
                                  </Button>
                                  <span className="text-xs text-white/70">
                                    {comment.upvotes - comment.downvotes}
                                  </span>
                                </div>
                                <div className="flex-1">
                                  <div className="mb-2">
                                    <LaTeXRenderer 
                                      content={comment.content}
                                      latex={comment.content} 
                                      className="text-white/80 text-sm"
                                    />
                                  </div>
                                  <div className="flex items-center space-x-3">
                                    <Avatar className="w-6 h-6">
                                      <AvatarImage src={comment.author.avatar} />
                                      <AvatarFallback className="text-xs">
                                        {comment.author.name.split(' ').map(n => n[0]).join('')}
                                      </AvatarFallback>
                                    </Avatar>
                                    <div className="flex items-center space-x-2 text-xs text-white/70">
                                      <span>{comment.author.name}</span>
                                      <span>•</span>
                                      <span>{comment.createdAt}</span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Add Comment */}
                      <div className="mt-4 flex gap-2">
                        <Textarea
                          placeholder="Add a comment..."
                          value={newComment[answer.id] || ''}
                          onChange={(e) => setNewComment(prev => ({ ...prev, [answer.id]: e.target.value }))}
                          className="bg-white/5 border-white/10 text-white placeholder:text-white/50 flex-1"
                          rows={2}
                        />
                        <Button 
                          onClick={() => handleCommentSubmit(answer.id)}
                          size="sm"
                          disabled={!newComment[answer.id]?.trim()}
                        >
                          <Send className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Add Answer */}
        <Card className="glass border-white/10 mt-8">
          <CardHeader>
            <CardTitle className="text-white">Your Answer</CardTitle>
            <CardDescription className="text-white/70">
              Share your knowledge and help others learn. LaTeX is supported with $ $ syntax.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Textarea
              placeholder="Write your answer here... Use $x^2$ for inline math or $$\int x dx$$ for display math"
              value={newAnswer}
              onChange={(e) => setNewAnswer(e.target.value)}
              className="bg-white/5 border-white/10 text-white placeholder:text-white/50 min-h-[150px]"
            />
            <div className="flex justify-between items-center">
              <p className="text-xs text-white/50">
                💡 Tip: Use proper mathematical notation and explain your reasoning step by step
              </p>
              <Button 
                onClick={handleAnswerSubmit}
                disabled={!newAnswer.trim()}
                className="bg-blue-500 hover:bg-blue-600"
              >
                Post Answer
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}