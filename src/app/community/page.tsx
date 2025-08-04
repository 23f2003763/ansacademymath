'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { LaTeXRenderer } from '@/components/ui/latex-renderer'
import { 
  Search, 
  Plus, 
  ThumbsUp, 
  ThumbsDown, 
  MessageSquare, 
  Clock,
  TrendingUp,
  Award,
  Filter,
  Flag,
  BookCheck
} from 'lucide-react'
import Link from 'next/link'

export default function CommunityPage() {
  const [questions, setQuestions] = useState([
    {
      id: 1,
      title: 'How to solve limits involving indeterminate forms?',
      content: 'I am struggling with limits like $\\lim_{x \\to 0} \\frac{\\sin x}{x}$. Can someone explain the L\'Hôpital\'s rule approach?',
      author: { name: 'John Doe', username: 'johndoe', ansPoints: 1250, avatar: null },
      subject: 'Mathematics',
      exam: 'JEE Main',
      difficulty: 'Medium',
      upvotes: 15,
      downvotes: 2,
      answers: 3,
      isAnswered: true,
      createdAt: '2 hours ago',
      tags: ['limits', 'calculus', 'lhopital-rule']
    },
    {
      id: 2,
      title: 'Thermodynamics: First Law Application',
      content: 'For an adiabatic process, why is $Q = 0$ and how does this relate to $\\Delta U = -W$?',
      author: { name: 'Sarah Wilson', username: 'swilson', ansPoints: 3400, avatar: null },
      subject: 'Physics',
      exam: 'JEE Advanced',
      difficulty: 'Hard',
      upvotes: 23,
      downvotes: 1,
      answers: 5,
      isAnswered: true,
      createdAt: '5 hours ago',
      tags: ['thermodynamics', 'first-law', 'adiabatic']
    }
  ])

  const [searchQuery, setSearchQuery] = useState('')
  const [selectedSubject, setSelectedSubject] = useState('all')
  const [selectedExam, setSelectedExam] = useState('all')
  const [sortBy, setSortBy] = useState('recent')

  const handleVote = async (questionId: number, type: 'upvote' | 'downvote') => {
    // Implement voting logic
    console.log(`${type} question ${questionId}`)
  }

  const handleReport = async (questionId: number) => {
    // Implement reporting logic
    console.log(`Report question ${questionId}`)
  }

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
            <div className="flex items-center space-x-4">
              <Button asChild className="bg-gradient-to-r from-green-500 to-blue-500">
                <Link href="/community/ask">
                  <Plus className="w-4 h-4 mr-2" />
                  Ask Question
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-white mb-2">Community</h1>
          <p className="text-white/70">
            Connect with fellow students, ask questions, and share knowledge
          </p>
        </motion.div>

        {/* Search and Filters */}
        <Card className="glass border-white/10 mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-3 w-4 h-4 text-white/50" />
                <Input
                  placeholder="Search questions..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-white/50"
                />
              </div>
              <Select value={selectedSubject} onValueChange={setSelectedSubject}>
                <SelectTrigger className="w-full md:w-40 bg-white/5 border-white/10 text-white">
                  <SelectValue placeholder="Subject" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Subjects</SelectItem>
                  <SelectItem value="mathematics">Mathematics</SelectItem>
                  <SelectItem value="physics">Physics</SelectItem>
                  <SelectItem value="chemistry">Chemistry</SelectItem>
                  <SelectItem value="computer-science">Computer Science</SelectItem>
                </SelectContent>
              </Select>
              <Select value={selectedExam} onValueChange={setSelectedExam}>
                <SelectTrigger className="w-full md:w-40 bg-white/5 border-white/10 text-white">
                  <SelectValue placeholder="Exam" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Exams</SelectItem>
                  <SelectItem value="jee-main">JEE Main</SelectItem>
                  <SelectItem value="jee-advanced">JEE Advanced</SelectItem>
                  <SelectItem value="gate">GATE</SelectItem>
                  <SelectItem value="olympiad">Olympiad</SelectItem>
                </SelectContent>
              </Select>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-full md:w-40 bg-white/5 border-white/10 text-white">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="recent">Most Recent</SelectItem>
                  <SelectItem value="popular">Most Popular</SelectItem>
                  <SelectItem value="unanswered">Unanswered</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Tabs */}
        <Tabs defaultValue="questions" className="mb-6">
          <TabsList className="grid w-full grid-cols-4 glass">
            <TabsTrigger value="questions">Questions</TabsTrigger>
            <TabsTrigger value="answered">Answered</TabsTrigger>
            <TabsTrigger value="unanswered">Unanswered</TabsTrigger>
            <TabsTrigger value="trending">Trending</TabsTrigger>
          </TabsList>

          <TabsContent value="questions" className="space-y-4">
            {questions.map((question) => (
              <motion.div
                key={question.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                <Card className="glass border-white/10 hover:border-white/20 transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex gap-4">
                      {/* Voting Section */}
                      <div className="flex flex-col items-center space-y-2 flex-shrink-0">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleVote(question.id, 'upvote')}
                          className="p-1 hover:bg-green-500/20"
                        >
                          <ThumbsUp className="w-4 h-4 text-white/70 hover:text-green-400" />
                        </Button>
                        <span className="text-white font-medium">
                          {question.upvotes - question.downvotes}
                        </span>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleVote(question.id, 'downvote')}
                          className="p-1 hover:bg-red-500/20"
                        >
                          <ThumbsDown className="w-4 h-4 text-white/70 hover:text-red-400" />
                        </Button>
                      </div>

                      {/* Question Content */}
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-3">
                          <Link href={`/community/question/${question.id}`} className="hover:text-blue-400">
                            <h3 className="text-lg font-semibold text-white mb-2">
                              {question.title}
                            </h3>
                          </Link>
                          <div className="flex items-center space-x-2">
                            {question.isAnswered && (
                              <BookCheck className="w-4 h-4 text-green-400" />
                            )}
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleReport(question.id)}
                              className="p-1"
                            >
                              <Flag className="w-4 h-4 text-white/50 hover:text-red-400" />
                            </Button>
                          </div>
                        </div>

                        <div className="mb-4">
                          <LaTeXRenderer 
                            content={question.content}
                            latex={question.content} 
                            className="text-white/80 text-sm"
                          />
                        </div>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-2 mb-4">
                          <Badge className="bg-blue-500/20 text-blue-300 border-blue-500/30">
                            {question.subject}
                          </Badge>
                          <Badge className="bg-purple-500/20 text-purple-300 border-purple-500/30">
                            {question.exam}
                          </Badge>
                          <Badge className={`${
                            question.difficulty === 'Easy' ? 'bg-green-500/20 text-green-300 border-green-500/30' :
                            question.difficulty === 'Medium' ? 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30' :
                            'bg-red-500/20 text-red-300 border-red-500/30'
                          }`}>
                            {question.difficulty}
                          </Badge>
                          {question.tags.map((tag) => (
                            <Badge key={tag} variant="secondary" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>

                        {/* Author and Stats */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <Avatar className="w-8 h-8">
                              <AvatarImage src={question.author.avatar || undefined} />
                              <AvatarFallback>
                                {question.author.name.split(' ').map(n => n[0]).join('')}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="text-white text-sm font-medium">
                                {question.author.name}
                              </p>
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
                              <span>{question.answers} answers</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </TabsContent>

          {/* Other tab contents would be similar with filtered data */}
          <TabsContent value="answered">
            <p className="text-white/70 text-center py-8">Answered questions will appear here.</p>
          </TabsContent>
          <TabsContent value="unanswered">
            <p className="text-white/70 text-center py-8">Unanswered questions will appear here.</p>
          </TabsContent>
          <TabsContent value="trending">
            <p className="text-white/70 text-center py-8">Trending questions will appear here.</p>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}