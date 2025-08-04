'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { 
  Users, 
  MessageSquare, 
  Flag, 
  BookOpen, 
  Calendar,
  TrendingUp,
  Settings,
  Eye,
  CheckCircle,
  XCircle,
  AlertTriangle,
  FileText
} from 'lucide-react'

export default function AdminPage() {
  const [stats, setStats] = useState({
    totalUsers: 5432,
    totalQuestions: 1234,
    totalAnswers: 3456,
    pendingReports: 12,
    pendingReviews: 8,
    sessionsToday: 23
  })

  const [reports, setReports] = useState([
    {
      id: 1,
      type: 'question',
      contentId: 'q-123',
      reason: 'Inappropriate content',
      reportedBy: 'john_doe',
      content: 'This question contains inappropriate language...',
      status: 'pending',
      createdAt: '2 hours ago'
    },
    {
      id: 2,
      type: 'answer',
      contentId: 'a-456',
      reason: 'Wrong information',
      reportedBy: 'sarah_wilson',
      content: 'This answer provides incorrect mathematical proof...',
      status: 'pending',
      createdAt: '5 hours ago'
    }
  ])

  const [reviewRequests, setReviewRequests] = useState([
    {
      id: 1,
      type: 'ai_answer',
      questionId: 'q-789',
      question: 'How to solve quadratic equations?',
      aiAnswer: 'To solve quadratic equations of the form $ax^2 + bx + c = 0$...',
      requestedBy: 'mike_chen',
      status: 'pending',
      createdAt: '1 hour ago'
    }
  ])

  const [users, setUsers] = useState([
    {
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
      role: 'student',
      ansPoints: 1250,
      status: 'active',
      joinedAt: '2024-01-01'
    },
    {
      id: 2,
      name: 'Sarah Wilson',
      email: 'sarah@example.com',
      role: 'expert',
      ansPoints: 3400,
      status: 'active',
      joinedAt: '2023-12-15'
    }
  ])

  const handleReportAction = (reportId: number, action: 'approve' | 'reject') => {
    setReports(reports.map(report => 
      report.id === reportId ? { ...report, status: action === 'approve' ? 'resolved' : 'rejected' } : report
    ))
  }

  const handleReviewAction = (reviewId: number, action: 'approve' | 'reject', comments?: string) => {
    setReviewRequests(reviewRequests.map(review => 
      review.id === reviewId ? { ...review, status: action === 'approve' ? 'approved' : 'rejected' } : review
    ))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Navigation */}
      <nav className="glass border-b border-white/10">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-red-500 to-pink-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">A</span>
              </div>
              <span className="text-xl font-bold text-white">Admin Panel</span>
            </div>
            <div className="flex items-center space-x-4">
              <Badge className="bg-red-500/20 text-red-300 border-red-500/30">
                {stats.pendingReports + stats.pendingReviews} Pending Actions
              </Badge>
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
          <h1 className="text-3xl font-bold text-white mb-2">Admin Dashboard</h1>
          <p className="text-white/70">Manage users, content, and platform operations</p>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          {[
            { label: 'Total Users', value: stats.totalUsers.toLocaleString(), icon: Users, color: 'from-blue-400 to-blue-600' },
            { label: 'Questions', value: stats.totalQuestions.toLocaleString(), icon: MessageSquare, color: 'from-green-400 to-green-600' },
            { label: 'Answers', value: stats.totalAnswers.toLocaleString(), icon: FileText, color: 'from-purple-400 to-purple-600' },
            { label: 'Pending Reports', value: stats.pendingReports, icon: Flag, color: 'from-red-400 to-red-600' },
            { label: 'Review Requests', value: stats.pendingReviews, icon: Eye, color: 'from-yellow-400 to-yellow-600' },
            { label: 'Sessions Today', value: stats.sessionsToday, icon: Calendar, color: 'from-indigo-400 to-indigo-600' }
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <Card className="glass border-white/10">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs text-white/70">{stat.label}</p>
                      <p className="text-xl font-bold text-white">{stat.value}</p>
                    </div>
                    <div className={`w-10 h-10 rounded-full bg-gradient-to-r ${stat.color} flex items-center justify-center`}>
                      <stat.icon className="w-5 h-5 text-white" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="reports" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5 glass">
            <TabsTrigger value="reports">Reports</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="content">Content</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          {/* Reports Tab */}
          <TabsContent value="reports">
            <Card className="glass border-white/10">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Flag className="w-5 h-5 mr-2" />
                  Content Reports
                </CardTitle>
                <CardDescription className="text-white/70">
                  Review and moderate reported content
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {reports.map((report) => (
                  <div key={report.id} className="p-4 border border-white/10 rounded-lg bg-white/5">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <div className="flex items-center space-x-2 mb-1">
                          <Badge className={`${
                            report.type === 'question' ? 'bg-blue-500/20 text-blue-300' : 'bg-green-500/20 text-green-300'
                          }`}>
                            {report.type}
                          </Badge>
                          <Badge className="bg-red-500/20 text-red-300">
                            {report.reason}
                          </Badge>
                        </div>
                        <p className="text-white text-sm">Reported by: {report.reportedBy}</p>
                        <p className="text-white/70 text-xs">{report.createdAt}</p>
                      </div>
                      <div className="flex space-x-2">
                        <Button
                          size="sm"
                          onClick={() => handleReportAction(report.id, 'approve')}
                          className="bg-green-500 hover:bg-green-600"
                        >
                          <CheckCircle className="w-4 h-4 mr-1" />
                          Resolve
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => handleReportAction(report.id, 'reject')}
                        >
                          <XCircle className="w-4 h-4 mr-1" />
                          Reject
                        </Button>
                      </div>
                    </div>
                    <div className="bg-white/5 p-3 rounded border border-white/10">
                      <p className="text-white/80 text-sm">{report.content}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Review Requests Tab */}
          <TabsContent value="reviews">
            <Card className="glass border-white/10">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Eye className="w-5 h-5 mr-2" />
                  Review Requests
                </CardTitle>
                <CardDescription className="text-white/70">
                  Review AI answers and user-submitted content
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {reviewRequests.map((review) => (
                  <div key={review.id} className="p-4 border border-white/10 rounded-lg bg-white/5">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <Badge className="bg-purple-500/20 text-purple-300 mb-2">
                          {review.type.replace('_', ' ')}
                        </Badge>
                        <p className="text-white font-medium">{review.question}</p>
                        <p className="text-white/70 text-sm">Requested by: {review.requestedBy}</p>
                        <p className="text-white/70 text-xs">{review.createdAt}</p>
                      </div>
                      <div className="flex space-x-2">
                        <Button
                          size="sm"
                          onClick={() => handleReviewAction(review.id, 'approve')}
                          className="bg-green-500 hover:bg-green-600"
                        >
                          <CheckCircle className="w-4 h-4 mr-1" />
                          Approve
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => handleReviewAction(review.id, 'reject')}
                        >
                          <XCircle className="w-4 h-4 mr-1" />
                          Reject
                        </Button>
                      </div>
                    </div>
                    <div className="bg-white/5 p-3 rounded border border-white/10">
                      <h4 className="text-white text-sm font-medium mb-2">AI Answer:</h4>
                      <p className="text-white/80 text-sm">{review.aiAnswer}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Users Tab */}
          <TabsContent value="users">
            <Card className="glass border-white/10">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Users className="w-5 h-5 mr-2" />
                  User Management
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {users.map((user) => (
                    <div key={user.id} className="flex items-center justify-between p-4 border border-white/10 rounded-lg bg-white/5">
                      <div className="flex items-center space-x-3">
                        <Avatar>
                          <AvatarFallback>{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-white font-medium">{user.name}</p>
                          <p className="text-white/70 text-sm">{user.email}</p>
                          <div className="flex items-center space-x-2 mt-1">
                            <Badge className={`${
                              user.role === 'admin' ? 'bg-red-500/20 text-red-300' :
                              user.role === 'expert' ? 'bg-blue-500/20 text-blue-300' :
                              'bg-green-500/20 text-green-300'
                            }`}>
                              {user.role}
                            </Badge>
                            <span className="text-white/70 text-xs">{user.ansPoints} ANS</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge className={`${
                          user.status === 'active' ? 'bg-green-500/20 text-green-300' : 'bg-red-500/20 text-red-300'
                        }`}>
                          {user.status}
                        </Badge>
                        <Button size="sm" variant="outline">
                          Manage
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Content Management Tab */}
          <TabsContent value="content">
            <Card className="glass border-white/10">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <BookOpen className="w-5 h-5 mr-2" />
                  Content Management
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  <Button className="h-24 flex flex-col items-center justify-center">
                    <BookOpen className="w-8 h-8 mb-2" />
                    Manage Study Materials
                  </Button>
                  <Button className="h-24 flex flex-col items-center justify-center">
                    <FileText className="w-8 h-8 mb-2" />
                    Upload PYQ Papers
                  </Button>
                  <Button className="h-24 flex flex-col items-center justify-center">
                    <Calendar className="w-8 h-8 mb-2" />
                    Manage Sessions
                  </Button>
                  <Button className="h-24 flex flex-col items-center justify-center">
                    <TrendingUp className="w-8 h-8 mb-2" />
                    Analytics Dashboard
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings">
            <Card className="glass border-white/10">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Settings className="w-5 h-5 mr-2" />
                  Platform Settings
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-white font-medium mb-3">AI Model Configuration</h3>
                    <div className="space-y-3">
                      <div>
                        <label className="text-white/70 text-sm">Default AI Model</label>
                        <Input 
                          value="llama3:8b" 
                          className="bg-white/5 border-white/10 text-white mt-1"
                        />
                      </div>
                      <div>
                        <label className="text-white/70 text-sm">AI Response Temperature</label>
                        <Input 
                          value="0.7" 
                          type="number" 
                          step="0.1" 
                          className="bg-white/5 border-white/10 text-white mt-1"
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-white font-medium mb-3">Points System</h3>
                    <div className="grid md:grid-cols-2 gap-3">
                      <div>
                        <label className="text-white/70 text-sm">Points per Answer</label>
                        <Input 
                          value="25" 
                          type="number" 
                          className="bg-white/5 border-white/10 text-white mt-1"
                        />
                      </div>
                      <div>
                        <label className="text-white/70 text-sm">Points per Question</label>
                        <Input 
                          value="10" 
                          type="number" 
                          className="bg-white/5 border-white/10 text-white mt-1"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}