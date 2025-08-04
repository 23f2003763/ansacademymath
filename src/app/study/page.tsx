'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { 
  BookOpen, 
  Play, 
  Clock, 
  Award, 
  Search,
  ChevronRight,
  Target,
  CheckCircle,
  BarChart3,
  Calendar
} from 'lucide-react'
import Link from 'next/link'

const EXAMS = [
  {
    id: 'jee-main',
    name: 'JEE Main',
    description: 'Joint Entrance Examination - Main',
    subjects: ['Physics', 'Chemistry', 'Mathematics'],
    totalChapters: 45,
    completedChapters: 12,
    nextExam: '2024-04-15',
    difficulty: 'Hard',
    enrolled: 45000
  },
  {
    id: 'jee-advanced',
    name: 'JEE Advanced',
    description: 'Joint Entrance Examination - Advanced',
    subjects: ['Physics', 'Chemistry', 'Mathematics'],
    totalChapters: 52,
    completedChapters: 8,
    nextExam: '2024-05-20',
    difficulty: 'Very Hard',
    enrolled: 25000
  },
  {
    id: 'gate-cs',
    name: 'GATE Computer Science',
    description: 'Graduate Aptitude Test in Engineering',
    subjects: ['Programming', 'Algorithms', 'Database', 'Networks'],
    totalChapters: 38,
    completedChapters: 15,
    nextExam: '2024-02-10',
    difficulty: 'Hard',
    enrolled: 32000
  },
  {
    id: 'olympiad-math',
    name: 'Mathematics Olympiad',
    description: 'International Mathematical Olympiad Preparation',
    subjects: ['Algebra', 'Geometry', 'Number Theory', 'Combinatorics'],
    totalChapters: 28,
    completedChapters: 6,
    nextExam: '2024-07-15',
    difficulty: 'Very Hard',
    enrolled: 8000
  }
]

export default function StudyPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedExam, setSelectedExam] = useState<string | null>(null)
  const [userProgress, setUserProgress] = useState({
    totalStudyTime: 127,
    weeklyGoal: 40,
    weeklyProgress: 28,
    streak: 15,
    rank: 42
  })

  const filteredExams = EXAMS.filter(exam =>
    exam.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    exam.subjects.some(subject => subject.toLowerCase().includes(searchQuery.toLowerCase()))
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
            <div className="flex items-center space-x-4">
              <Badge className="bg-gradient-to-r from-green-400 to-blue-500">
                {userProgress.streak} Day Streak
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
          <h1 className="text-3xl font-bold text-white mb-2">Study Materials</h1>
          <p className="text-white/70">
            Comprehensive study materials for all competitive exams
          </p>
        </motion.div>

        {/* Progress Overview */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Study Hours', value: `${userProgress.totalStudyTime}h`, icon: Clock, color: 'from-blue-400 to-blue-600' },
            { label: 'Weekly Goal', value: `${userProgress.weeklyProgress}/${userProgress.weeklyGoal}h`, icon: Target, color: 'from-green-400 to-green-600' },
            { label: 'Study Streak', value: `${userProgress.streak} days`, icon: Award, color: 'from-yellow-400 to-orange-500' },
            { label: 'Global Rank', value: `#${userProgress.rank}`, icon: BarChart3, color: 'from-purple-400 to-pink-500' }
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
                      <p className="text-xl font-bold text-white">{stat.value}</p>
                    </div>
                    <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${stat.color} flex items-center justify-center`}>
                      <stat.icon className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  {stat.label === 'Weekly Goal' && (
                    <Progress value={(userProgress.weeklyProgress / userProgress.weeklyGoal) * 100} className="mt-2" />
                  )}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Search */}
        <Card className="glass border-white/10 mb-6">
          <CardContent className="p-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 w-4 h-4 text-white/50" />
              <Input
                placeholder="Search exams or subjects..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-white/50"
              />
            </div>
          </CardContent>
        </Card>

        {/* Exam Cards */}
        <div className="grid md:grid-cols-2 gap-6">
          {filteredExams.map((exam, index) => (
            <motion.div
              key={exam.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
            >
              <Card className="glass border-white/10 hover:border-white/20 transition-all duration-300 group">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-white text-xl mb-2">{exam.name}</CardTitle>
                      <CardDescription className="text-white/70">
                        {exam.description}
                      </CardDescription>
                    </div>
                    <Badge className={`${
                      exam.difficulty === 'Easy' ? 'bg-green-500/20 text-green-300' :
                      exam.difficulty === 'Medium' ? 'bg-yellow-500/20 text-yellow-300' :
                      exam.difficulty === 'Hard' ? 'bg-orange-500/20 text-orange-300' :
                      'bg-red-500/20 text-red-300'
                    }`}>
                      {exam.difficulty}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Progress */}
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-white">Progress</span>
                      <span className="text-white/70">
                        {exam.completedChapters}/{exam.totalChapters} chapters
                      </span>
                    </div>
                    <Progress value={(exam.completedChapters / exam.totalChapters) * 100} />
                  </div>

                  {/* Subjects */}
                  <div>
                    <p className="text-white text-sm font-medium mb-2">Subjects:</p>
                    <div className="flex flex-wrap gap-2">
                      {exam.subjects.map((subject) => (
                        <Badge key={subject} variant="secondary" className="text-xs">
                          {subject}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="flex items-center justify-between text-sm text-white/70">
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4" />
                      <span>Next exam: {exam.nextExam}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <BookOpen className="w-4 h-4" />
                      <span>{exam.enrolled.toLocaleString()} enrolled</span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex space-x-2 pt-2">
                    <Button asChild className="flex-1">
                      <Link href={`/study/${exam.id}`}>
                        {exam.completedChapters > 0 ? (
                          <>
                            <Play className="w-4 h-4 mr-2" />
                            Continue Learning
                          </>
                        ) : (
                          <>
                            <BookOpen className="w-4 h-4 mr-2" />
                            Start Learning
                          </>
                        )}
                      </Link>
                    </Button>
                    <Button variant="outline" asChild>
                      <Link href={`/study/${exam.id}/syllabus`}>
                        <ChevronRight className="w-4 h-4" />
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Continue Learning Section */}
        {EXAMS.some(exam => exam.completedChapters > 0) && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-white mb-6">Continue Learning</h2>
            <div className="grid md:grid-cols-3 gap-4">
              {EXAMS.filter(exam => exam.completedChapters > 0).slice(0, 3).map((exam) => (
                <Card key={exam.id} className="glass border-white/10">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-white font-medium">{exam.name}</h3>
                      <CheckCircle className="w-5 h-5 text-green-400" />
                    </div>
                    <Progress value={(exam.completedChapters / exam.totalChapters) * 100} className="mb-3" />
                    <Button asChild size="sm" className="w-full">
                      <Link href={`/study/${exam.id}/continue`}>
                        <Play className="w-4 h-4 mr-2" />
                        Continue
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}