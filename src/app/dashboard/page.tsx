'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { 
  BookOpen, 
  Users, 
  Clock, 
  Award, 
  TrendingUp, 
  Calendar,
  MessageSquare,
  Target,
  Star,
  ArrowRight
} from 'lucide-react'
import Link from 'next/link'
import { LaTeXRenderer } from '@/components/ui/latex-renderer'

export default function DashboardPage() {
  const [user, setUser] = useState({
    name: 'John Doe',
    username: 'johndoe',
    ansPoints: 12500,
    examPrep: ['JEE Main', 'JEE Advanced'],
    streak: 15,
    rank: 42,
    avatar: '/placeholder-avatar.jpg'
  })

  const [stats, setStats] = useState({
    questionsAnswered: 127,
    questionsAsked: 23,
    studyHours: 45,
    accuracy: 85,
    sessionsBooked: 3,
    upvotesReceived: 89
  })

  const [recentActivity, setRecentActivity] = useState([
    {
      id: 1,
      type: 'answer',
      content: 'Answered a question about derivatives',
      subject: 'Mathematics',
      points: 25,
      time: '2 hours ago'
    },
    {
      id: 2,
      type: 'study',
      content: 'Completed chapter on Thermodynamics',
      subject: 'Physics',
      progress: 100,
      time: '5 hours ago'
    },
    {
      id: 3,
      type: 'question',
      content: 'Asked about integration by parts',
      subject: 'Mathematics',
      answers: 3,
      time: '1 day ago'
    }
  ])

  const [upcomingEvents, setUpcomingEvents] = useState([
    {
      id: 1,
      title: 'Expert Session: Calculus Problems',
      expert: 'Dr. Sarah Wilson',
      date: '2024-01-15',
      time: '15:00',
      subject: 'Mathematics'
    },
    {
      id: 2,
      title: 'Mock Test: JEE Physics',
      type: 'test',
      date: '2024-01-17',
      time: '10:00',
      duration: '3 hours'
    }
  ])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Navigation */}
      <nav className="glass border-b border-white/10">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">A</span>
              </div>
              <span className="text-xl font-bold text-white">ANS Academy</span>
            </Link>
            <div className="flex items-center space-x-4">
              <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500">
                {user.ansPoints.toLocaleString()} ANS Points
              </Badge>
              <Avatar>
                <AvatarImage src={user.avatar} />
                <AvatarFallback>{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-white mb-2">
            Welcome back, {user.name}! 👋
          </h1>
          <p className="text-white/70">
            You're on a {user.streak}-day learning streak! Keep it up!
          </p>
        </motion.div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'ANS Points', value: user.ansPoints.toLocaleString(), icon: Star, color: 'from-yellow-400 to-orange-500' },
            { label: 'Global Rank', value: `#${user.rank}`, icon: Award, color: 'from-purple-400 to-pink-500' },
            { label: 'Study Streak', value: `${user.streak} days`, icon: TrendingUp, color: 'from-green-400 to-blue-500' },
            { label: 'Accuracy', value: `${stats.accuracy}%`, icon: Target, color: 'from-blue-400 to-purple-500' }
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
                      <p className="text-sm text-white/70">{stat.label}</p>
                      <p className="text-2xl font-bold text-white">{stat.value}</p>
                    </div>
                    <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${stat.color} flex items-center justify-center`}>
                      <stat.icon className="w-6 h-6 text-white" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Study Progress */}
            <Card className="glass border-white/10">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <BookOpen className="w-5 h-5 mr-2" />
                  Study Progress
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {user.examPrep.map((exam, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-white">{exam}</span>
                      <span className="text-white/70">67%</span>
                    </div>
                    <Progress value={67} className="h-2" />
                  </div>
                ))}
                <Button asChild className="w-full bg-blue-500 hover:bg-blue-600">
                  <Link href="/study">Continue Learning</Link>
                </Button>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card className="glass border-white/10">
              <CardHeader>
                <CardTitle className="text-white">Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivity.map((activity) => (
                    <div key={activity.id} className="flex items-start space-x-3 p-3 rounded-lg bg-white/5">
                      <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center flex-shrink-0">
                        {activity.type === 'answer' && <MessageSquare className="w-4 h-4 text-white" />}
                        {activity.type === 'study' && <BookOpen className="w-4 h-4 text-white" />}
                        {activity.type === 'question' && <MessageSquare className="w-4 h-4 text-white" />}
                      </div>
                      <div className="flex-1">
                        <p className="text-white text-sm">{activity.content}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant="secondary" className="text-xs">{activity.subject}</Badge>
                          <span className="text-xs text-white/70">{activity.time}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card className="glass border-white/10">
              <CardHeader>
                <CardTitle className="text-white">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button asChild className="w-full justify-start" variant="ghost">
                  <Link href="/community/ask">
                    <MessageSquare className="w-4 h-4 mr-2" />
                    Ask a Question
                  </Link>
                </Button>
                <Button asChild className="w-full justify-start" variant="ghost">
                  <Link href="/chat">
                    <Users className="w-4 h-4 mr-2" />
                    Chat with Experts
                  </Link>
                </Button>
                <Button asChild className="w-full justify-start" variant="ghost">
                  <Link href="/sessions/book">
                    <Calendar className="w-4 h-4 mr-2" />
                    Book a Session
                  </Link>
                </Button>
                <Button asChild className="w-full justify-start" variant="ghost">
                  <Link href="/community">
                    <Users className="w-4 h-4 mr-2" />
                    Join Community
                  </Link>
                </Button>
              </CardContent>
            </Card>

            {/* Upcoming Events */}
            <Card className="glass border-white/10">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Calendar className="w-5 h-5 mr-2" />
                  Upcoming Events
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {upcomingEvents.map((event) => (
                  <div key={event.id} className="p-3 rounded-lg bg-white/5 border border-white/10">
                    <h4 className="text-white font-medium text-sm">{event.title}</h4>
                    {event.expert && (
                      <p className="text-white/70 text-xs">with {event.expert}</p>
                    )}
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-xs text-white/70">{event.date} at {event.time}</span>
                      <ArrowRight className="w-3 h-3 text-white/50" />
                    </div>
                  </div>
                ))}
                <Button asChild variant="outline" className="w-full">
                  <Link href="/events">View All Events</Link>
                </Button>
              </CardContent>
            </Card>

            {/* Leaderboard Preview */}
            <Card className="glass border-white/10">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Award className="w-5 h-5 mr-2" />
                  Top Contributors
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { name: 'Alice Chen', points: 45200, rank: 1 },
                    { name: 'Bob Kumar', points: 42100, rank: 2 },
                    { name: 'You', points: user.ansPoints, rank: user.rank }
                  ].map((person, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className="text-white/70 text-sm">#{person.rank}</span>
                        <span className="text-white text-sm font-medium">{person.name}</span>
                      </div>
                      <span className="text-white/70 text-sm">{person.points.toLocaleString()}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}