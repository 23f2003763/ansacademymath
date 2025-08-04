'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { 
  Download, 
  FileText, 
  Search, 
  Calendar,
  BookOpen,
  Filter,
  ArrowLeft,
  Eye,
  Star,
  Clock
} from 'lucide-react'
import Link from 'next/link'

// Update interface (around line 33)
interface PYQPaper {
  id: string
  exam: string
  year: string
  subject: string
  fileName: string
  fileUrl: string
  fileSize: string
  questions: number
  difficulty: 'Easy' | 'Medium' | 'Hard' | 'Very Hard'  // Add 'Very Hard'
  downloads: number
  rating: number
  uploadedAt: string
}

export default function PYQPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedExam, setSelectedExam] = useState('all')
  const [selectedSubject, setSelectedSubject] = useState('all')
  const [selectedYear, setSelectedYear] = useState('all')
  const [sortBy, setSortBy] = useState('year')

  const [pyqPapers, setPyqPapers] = useState<PYQPaper[]>([
    {
      id: '1',
      exam: 'JEE Main',
      year: '2024',
      subject: 'Mathematics',
      fileName: 'JEE_Main_2024_Mathematics.pdf',
      fileUrl: '/pyq/jee-main-2024-math.pdf',
      fileSize: '2.4 MB',
      questions: 30,
      difficulty: 'Hard',
      downloads: 1547,
      rating: 4.8,
      uploadedAt: '2024-01-15'
    },
    {
      id: '2',
      exam: 'JEE Main',
      year: '2024',
      subject: 'Physics',
      fileName: 'JEE_Main_2024_Physics.pdf',
      fileUrl: '/pyq/jee-main-2024-physics.pdf',
      fileSize: '3.1 MB',
      questions: 30,
      difficulty: 'Hard',
      downloads: 1423,
      rating: 4.7,
      uploadedAt: '2024-01-15'
    },
    {
      id: '3',
      exam: 'JEE Advanced',
      year: '2023',
      subject: 'Chemistry',
      fileName: 'JEE_Advanced_2023_Chemistry.pdf',
      fileUrl: '/pyq/jee-advanced-2023-chem.pdf',
      fileSize: '2.8 MB',
      questions: 18,
      difficulty: 'Very Hard',
      downloads: 892,
      rating: 4.9,
      uploadedAt: '2023-07-20'
    },
    {
      id: '4',
      exam: 'GATE',
      year: '2024',
      subject: 'Computer Science',
      fileName: 'GATE_2024_CS.pdf',
      fileUrl: '/pyq/gate-2024-cs.pdf',
      fileSize: '4.2 MB',
      questions: 65,
      difficulty: 'Hard',
      downloads: 2341,
      rating: 4.6,
      uploadedAt: '2024-02-10'
    }
  ])

  const filteredPapers = pyqPapers.filter(paper => {
    const matchesSearch = paper.fileName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         paper.exam.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         paper.subject.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesExam = selectedExam === 'all' || paper.exam === selectedExam
    const matchesSubject = selectedSubject === 'all' || paper.subject === selectedSubject
    const matchesYear = selectedYear === 'all' || paper.year === selectedYear
    
    return matchesSearch && matchesExam && matchesSubject && matchesYear
  })

  const handleDownload = async (paper: PYQPaper) => {
    // Increment download count
    setPyqPapers(prev => prev.map(p => 
      p.id === paper.id ? { ...p, downloads: p.downloads + 1 } : p
    ))

    // Trigger download
    const link = document.createElement('a')
    link.href = paper.fileUrl
    link.download = paper.fileName
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
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
            <Link href="/dashboard" className="flex items-center space-x-2">
              <ArrowLeft className="w-4 h-4 mr-2 text-white/70" />
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">A</span>
              </div>
              <span className="text-xl font-bold text-white">ANS Academy</span>
            </Link>
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
          <h1 className="text-3xl font-bold text-white mb-2">Previous Year Questions</h1>
          <p className="text-white/70">
            Download and practice with authentic question papers from past exams
          </p>
        </motion.div>

        {/* Stats */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Total Papers', value: pyqPapers.length, icon: FileText },
            { label: 'Total Downloads', value: pyqPapers.reduce((acc, p) => acc + p.downloads, 0).toLocaleString(), icon: Download },
            { label: 'Exams Covered', value: new Set(pyqPapers.map(p => p.exam)).size, icon: BookOpen },
            { label: 'Latest Year', value: Math.max(...pyqPapers.map(p => parseInt(p.year))), icon: Calendar }
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

        {/* Filters */}
        <Card className="glass border-white/10 mb-6">
          <CardContent className="p-6">
            <div className="grid md:grid-cols-5 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 w-4 h-4 text-white/50" />
                <Input
                  placeholder="Search papers..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-white/50"
                />
              </div>
              <Select value={selectedExam} onValueChange={setSelectedExam}>
                <SelectTrigger className="bg-white/5 border-white/10 text-white">
                  <SelectValue placeholder="Select Exam" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Exams</SelectItem>
                  <SelectItem value="JEE Main">JEE Main</SelectItem>
                  <SelectItem value="JEE Advanced">JEE Advanced</SelectItem>
                  <SelectItem value="GATE">GATE</SelectItem>
                  <SelectItem value="NEET">NEET</SelectItem>
                  <SelectItem value="Olympiad">Olympiad</SelectItem>
                </SelectContent>
              </Select>
              <Select value={selectedSubject} onValueChange={setSelectedSubject}>
                <SelectTrigger className="bg-white/5 border-white/10 text-white">
                  <SelectValue placeholder="Subject" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Subjects</SelectItem>
                  <SelectItem value="Mathematics">Mathematics</SelectItem>
                  <SelectItem value="Physics">Physics</SelectItem>
                  <SelectItem value="Chemistry">Chemistry</SelectItem>
                  <SelectItem value="Computer Science">Computer Science</SelectItem>
                </SelectContent>
              </Select>
              <Select value={selectedYear} onValueChange={setSelectedYear}>
                <SelectTrigger className="bg-white/5 border-white/10 text-white">
                  <SelectValue placeholder="Year" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Years</SelectItem>
                  {Array.from(new Set(pyqPapers.map(p => p.year)))
                    .sort((a, b) => parseInt(b) - parseInt(a))
                    .map(year => (
                      <SelectItem key={year} value={year}>{year}</SelectItem>
                    ))}
                </SelectContent>
              </Select>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="bg-white/5 border-white/10 text-white">
                  <SelectValue placeholder="Sort By" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="year">Latest Year</SelectItem>
                  <SelectItem value="downloads">Most Downloaded</SelectItem>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                  <SelectItem value="name">Name A-Z</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Papers Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPapers.map((paper, index) => (
            <motion.div
              key={paper.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.4 }}
            >
              <Card className="glass border-white/10 hover:border-white/20 transition-all duration-300 group">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <CardTitle className="text-white text-lg mb-1">
                        {paper.exam} {paper.year}
                      </CardTitle>
                      <CardDescription className="text-white/70">
                        {paper.subject}
                      </CardDescription>
                    </div>
                    <Badge className={getDifficultyColor(paper.difficulty)}>
                      {paper.difficulty}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* File Info */}
                  <div className="flex items-center justify-between text-sm text-white/70">
                    <div className="flex items-center space-x-2">
                      <FileText className="w-4 h-4" />
                      <span>{paper.fileSize}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <BookOpen className="w-4 h-4" />
                      <span>{paper.questions} questions</span>
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center space-x-2 text-white/70">
                      <Download className="w-4 h-4" />
                      <span>{paper.downloads.toLocaleString()} downloads</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-white/70">{paper.rating}</span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex space-x-2 pt-2">
                    <Button 
                      onClick={() => handleDownload(paper)}
                      className="flex-1 bg-blue-500 hover:bg-blue-600"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Download
                    </Button>
                    <Button variant="outline" size="sm">
                      <Eye className="w-4 h-4" />
                    </Button>
                  </div>

                  {/* Upload Date */}
                  <div className="flex items-center space-x-2 text-xs text-white/50">
                    <Clock className="w-3 h-3" />
                    <span>Uploaded {new Date(paper.uploadedAt).toLocaleDateString()}</span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* No Results */}
        {filteredPapers.length === 0 && (
          <Card className="glass border-white/10 mt-8">
            <CardContent className="p-12 text-center">
              <FileText className="w-16 h-16 text-white/30 mx-auto mb-4" />
              <h3 className="text-white text-lg font-medium mb-2">No papers found</h3>
              <p className="text-white/70">Try adjusting your search filters</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}