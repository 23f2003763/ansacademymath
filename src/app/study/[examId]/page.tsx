'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  BookOpen, 
  Play, 
  Clock, 
  CheckCircle,
  Lock,
  Star,
  Trophy,
  FileText,
  Target,
  ArrowLeft
} from 'lucide-react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { LaTeXRenderer } from '@/components/ui/latex-renderer'

const EXAM_DATA = {
  'jee-main': {
    name: 'JEE Main',
    description: 'Joint Entrance Examination - Main',
    subjects: [
      {
        id: 'physics',
        name: 'Physics',
        chapters: [
          { id: 1, name: 'Mechanics', status: 'completed', duration: '4 hours', difficulty: 'Medium' },
          { id: 2, name: 'Thermodynamics', status: 'completed', duration: '3 hours', difficulty: 'Hard' },
          { id: 3, name: 'Waves and Oscillations', status: 'in-progress', duration: '3.5 hours', difficulty: 'Medium' },
          { id: 4, name: 'Electricity and Magnetism', status: 'locked', duration: '5 hours', difficulty: 'Hard' },
          { id: 5, name: 'Optics', status: 'locked', duration: '3 hours', difficulty: 'Medium' },
        ]
      },
      {
        id: 'chemistry',
        name: 'Chemistry',
        chapters: [
          { id: 1, name: 'Atomic Structure', status: 'completed', duration: '3 hours', difficulty: 'Medium' },
          { id: 2, name: 'Chemical Bonding', status: 'in-progress', duration: '4 hours', difficulty: 'Hard' },
          { id: 3, name: 'Thermodynamics', status: 'locked', duration: '4 hours', difficulty: 'Hard' },
          { id: 4, name: 'Organic Chemistry', status: 'locked', duration: '6 hours', difficulty: 'Very Hard' },
        ]
      },
      {
        id: 'mathematics',
        name: 'Mathematics',
        chapters: [
          { id: 1, name: 'Algebra', status: 'completed', duration: '5 hours', difficulty: 'Medium' },
          { id: 2, name: 'Trigonometry', status: 'completed', duration: '4 hours', difficulty: 'Medium' },
          { id: 3, name: 'Calculus', status: 'in-progress', duration: '6 hours', difficulty: 'Hard' },
          { id: 4, name: 'Coordinate Geometry', status: 'locked', duration: '5 hours', difficulty: 'Hard' },
          { id: 5, name: 'Probability', status: 'locked', duration: '3 hours', difficulty: 'Medium' },
        ]
      }
    ]
  }
}

export default function ExamStudyPage() {
  const params = useParams()
  const examId = params.examId as string
  const exam = EXAM_DATA[examId as keyof typeof EXAM_DATA]

  const [selectedSubject, setSelectedSubject] = useState(exam?.subjects[0]?.id || '')
  const [progress, setProgress] = useState({
    totalChapters: 0,
    completedChapters: 0,
    studyTime: 67,
    streak: 5
  })

  useEffect(() => {
    if (exam) {
      const total = exam.subjects.reduce((acc, subject) => acc + subject.chapters.length, 0)
      const completed = exam.subjects.reduce((acc, subject) => 
        acc + subject.chapters.filter(chapter => chapter.status === 'completed').length, 0
      )
      setProgress(prev => ({ ...prev, totalChapters: total, completedChapters: completed }))
    }
  }, [exam])

  if (!exam) {
    return <div>Exam not found</div>
  }

  const selectedSubjectData = exam.subjects.find(s => s.id === selectedSubject)

  const getChapterIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-green-400" />
      case 'in-progress':
        return <Play className="w-5 h-5 text-blue-400" />
      default:
        return <Lock className="w-5 h-5 text-white/40" />
    }
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy':
        return 'bg-green-500/20 text-green-300 border-green-500/30'
      case 'Medium':
        return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30'
      case 'Hard':
        return 'bg-orange-500/20 text-orange-300 border-orange-500/30'
      case 'Very Hard':
        return 'bg-red-500/20 text-red-300 border-red-500/30'
      default:
        return 'bg-gray-500/20 text-gray-300 border-gray-500/30'
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Navigation */}
      <nav className="glass border-b border-white/10">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Link href="/study" className="flex items-center text-white/70 hover:text-white">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Study
              </Link>
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">A</span>
              </div>
              <span className="text-xl font-bold text-white">{exam.name}</span>
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
          <h1 className="text-3xl font-bold text-white mb-2">{exam.name}</h1>
          <p className="text-white/70">{exam.description}</p>
        </motion.div>

        {/* Progress Stats */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          {[
            { 
              label: 'Overall Progress', 
              value: `${Math.round((progress.completedChapters / progress.totalChapters) * 100)}%`, 
              icon: Target 
            },
            { label: 'Completed Chapters', value: `${progress.completedChapters}/${progress.totalChapters}`, icon: CheckCircle },
            { label: 'Study Time', value: `${progress.studyTime}h`, icon: Clock },
            { label: 'Study Streak', value: `${progress.streak} days`, icon: Trophy }
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
                    <stat.icon className="w-8 h-8 text-blue-400" />
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Subject Navigation */}
          <div className="lg:col-span-1">
            <Card className="glass border-white/10">
              <CardHeader>
                <CardTitle className="text-white">Subjects</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {exam.subjects.map((subject) => (
                  <Button
                    key={subject.id}
                    variant={selectedSubject === subject.id ? 'default' : 'ghost'}
                    className="w-full justify-start"
                    onClick={() => setSelectedSubject(subject.id)}
                  >
                    <BookOpen className="w-4 h-4 mr-2" />
                    {subject.name}
                  </Button>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Chapter Content */}
          <div className="lg:col-span-3">
            <Card className="glass border-white/10">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <BookOpen className="w-5 h-5 mr-2" />
                  {selectedSubjectData?.name} Chapters
                </CardTitle>
                <CardDescription className="text-white/70">
                  Interactive chapters with animated flashcards and quizzes
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {selectedSubjectData?.chapters.map((chapter, index) => (
                    <motion.div
                      key={chapter.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1, duration: 0.4 }}
                      className={`p-4 rounded-lg border transition-all duration-300 ${
                        chapter.status === 'locked' 
                          ? 'bg-white/5 border-white/10 opacity-60' 
                          : 'bg-white/10 border-white/20 hover:border-white/30'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          {getChapterIcon(chapter.status)}
                          <div>
                            <h3 className={`font-medium ${
                              chapter.status === 'locked' ? 'text-white/40' : 'text-white'
                            }`}>
                              {chapter.name}
                            </h3>
                            <div className="flex items-center space-x-2 mt-1">
                              <div className="flex items-center space-x-1 text-xs text-white/70">
                                <Clock className="w-3 h-3" />
                                <span>{chapter.duration}</span>
                              </div>
                              <Badge className={getDifficultyColor(chapter.difficulty)}>
                                {chapter.difficulty}
                              </Badge>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          {chapter.status === 'completed' && (
                            <Button size="sm" variant="outline" asChild>
                              <Link href={`/study/${examId}/${subject.id}/${chapter.id}/review`}>
                                Review
                              </Link>
                            </Button>
                          )}
                          <Button 
                            size="sm" 
                            disabled={chapter.status === 'locked'}
                            asChild={chapter.status !== 'locked'}
                          >
                            {chapter.status !== 'locked' ? (
                              <Link href={`/study/${examId}/${selectedSubject}/${chapter.id}`}>
                                {chapter.status === 'completed' ? 'Restart' : 
                                 chapter.status === 'in-progress' ? 'Continue' : 'Start'}
                              </Link>
                            ) : (
                              'Locked'
                            )}
                          </Button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Subject Test */}
                <div className="mt-8 p-6 border border-white/20 rounded-lg bg-gradient-to-r from-blue-500/10 to-purple-500/10">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-white font-medium text-lg mb-1">
                        {selectedSubjectData?.name} Test
                      </h3>
                      <p className="text-white/70 text-sm">
                        Take a comprehensive test covering all chapters
                      </p>
                    </div>
                    <Button className="bg-gradient-to-r from-blue-500 to-purple-600">
                      <FileText className="w-4 h-4 mr-2" />
                      Take Test
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}