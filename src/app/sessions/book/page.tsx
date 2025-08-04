'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { 
  Calendar,
  Clock,
  User,
  Video,
  Star,
  BookOpen,
  ArrowLeft,
  Check,
  ChevronRight
} from 'lucide-react'
import Link from 'next/link'

interface Expert {
  id: string
  name: string
  title: string
  avatar?: string
  rating: number
  reviews: number
  subjects: string[]
  experience: string
  hourlyRate: number
  isAvailable: boolean
  nextAvailable: string
}

export default function BookSessionPage() {
  const [step, setStep] = useState(1)
  const [selectedExpert, setSelectedExpert] = useState<Expert | null>(null)
  const [sessionData, setSessionData] = useState({
    subject: '',
    topic: '',
    description: '',
    date: '',
    time: '',
    duration: '60',
    type: 'video'
  })

  const experts: Expert[] = [
    {
      id: '1',
      name: 'Dr. Sarah Wilson',
      title: 'Mathematics Expert',
      avatar: undefined,
      rating: 4.9,
      reviews: 156,
      subjects: ['Calculus', 'Algebra', 'Geometry', 'Statistics'],
      experience: '10+ years',
      hourlyRate: 0, // Free for now
      isAvailable: true,
      nextAvailable: 'Today at 3:00 PM'
    },
    {
      id: '2',
      name: 'Prof. Michael Chen',
      title: 'Physics Specialist',
      avatar: undefined,
      rating: 4.8,
      reviews: 134,
      subjects: ['Mechanics', 'Thermodynamics', 'Electromagnetism', 'Optics'],
      experience: '8+ years',
      hourlyRate: 0,
      isAvailable: true,
      nextAvailable: 'Tomorrow at 10:00 AM'
    },
    {
      id: '3',
      name: 'Dr. Priya Sharma',
      title: 'Chemistry Expert',
      avatar: undefined,
      rating: 4.7,
      reviews: 98,
      subjects: ['Organic Chemistry', 'Inorganic Chemistry', 'Physical Chemistry'],
      experience: '12+ years',
      hourlyRate: 0,
      isAvailable: false,
      nextAvailable: 'Monday at 2:00 PM'
    }
  ]

  const timeSlots = [
    '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
    '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM',
    '5:00 PM', '6:00 PM', '7:00 PM', '8:00 PM'
  ]

  const handleExpertSelect = (expert: Expert) => {
    setSelectedExpert(expert)
    setStep(2)
  }

  const handleSessionSubmit = async () => {
    try {
      const response = await fetch('/api/sessions/book', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          expertId: selectedExpert?.id,
          ...sessionData
        })
      })

      if (response.ok) {
        setStep(4) // Success step
      }
    } catch (error) {
      console.error('Failed to book session:', error)
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
          <h1 className="text-3xl font-bold text-white mb-2">Book Expert Session</h1>
          <p className="text-white/70">
            Get personalized help from our expert tutors
          </p>
        </motion.div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-center space-x-4">
            {[
              { number: 1, label: 'Choose Expert', active: step >= 1, completed: step > 1 },
              { number: 2, label: 'Session Details', active: step >= 2, completed: step > 2 },
              { number: 3, label: 'Confirmation', active: step >= 3, completed: step > 3 },
              { number: 4, label: 'Booked', active: step >= 4, completed: step > 4 }
            ].map((stepItem, index) => (
              <div key={index} className="flex items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                  stepItem.completed 
                    ? 'bg-green-500 text-white' 
                    : stepItem.active 
                      ? 'bg-blue-500 text-white' 
                      : 'bg-white/10 text-white/50'
                }`}>
                  {stepItem.completed ? <Check className="w-5 h-5" /> : stepItem.number}
                </div>
                <span className={`ml-2 ${stepItem.active ? 'text-white' : 'text-white/50'}`}>
                  {stepItem.label}
                </span>
                {index < 3 && <ChevronRight className="w-5 h-5 text-white/30 mx-4" />}
              </div>
            ))}
          </div>
        </div>

        {/* Step 1: Choose Expert */}
        {step === 1 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
          >
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {experts.map((expert) => (
                <Card 
                  key={expert.id} 
                  className={`glass border-white/10 hover:border-white/20 transition-all duration-300 cursor-pointer ${
                    !expert.isAvailable ? 'opacity-60' : ''
                  }`}
                  onClick={() => expert.isAvailable && handleExpertSelect(expert)}
                >
                  <CardHeader>
                    <div className="flex items-center space-x-4">
                      <Avatar className="w-16 h-16">
                        <AvatarImage src={expert.avatar} />
                        <AvatarFallback>
                          {expert.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <CardTitle className="text-white">{expert.name}</CardTitle>
                        <CardDescription className="text-white/70">
                          {expert.title}
                        </CardDescription>
                        <div className="flex items-center space-x-2 mt-1">
                          <div className="flex items-center space-x-1">
                            <Star className="w-4 h-4 text-yellow-400 fill-current" />
                            <span className="text-white/70 text-sm">{expert.rating}</span>
                          </div>
                          <span className="text-white/50 text-sm">({expert.reviews} reviews)</span>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <p className="text-white/70 text-sm mb-2">Specializations:</p>
                      <div className="flex flex-wrap gap-1">
                        {expert.subjects.map((subject) => (
                          <Badge key={subject} variant="secondary" className="text-xs">
                            {subject}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between text-sm text-white/70">
                      <div className="flex items-center space-x-2">
                        <User className="w-4 h-4" />
                        <span>{expert.experience}</span>
                      </div>
                      <Badge className={expert.isAvailable ? 'bg-green-500/20 text-green-300' : 'bg-red-500/20 text-red-300'}>
                        {expert.isAvailable ? 'Available' : 'Busy'}
                      </Badge>
                    </div>

                    {expert.isAvailable && (
                      <div className="flex items-center space-x-2 text-sm text-blue-400">
                        <Clock className="w-4 h-4" />
                        <span>Next available: {expert.nextAvailable}</span>
                      </div>
                    )}

                    <Button 
                      className="w-full" 
                      disabled={!expert.isAvailable}
                    >
                      {expert.isAvailable ? 'Select Expert' : 'Not Available'}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </motion.div>
        )}

        {/* Step 2: Session Details */}
        {step === 2 && selectedExpert && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
          >
            <div className="max-w-2xl mx-auto">
              <Card className="glass border-white/10">
                <CardHeader>
                  <CardTitle className="text-white">Session Details</CardTitle>
                  <CardDescription className="text-white/70">
                    Configure your session with {selectedExpert.name}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="subject" className="text-white">Subject</Label>
                      <Select value={sessionData.subject} onValueChange={(value: string) => setSessionData(prev => ({ ...prev, subject: value }))}>
                        <SelectTrigger className="bg-white/5 border-white/10 text-white">
                          <SelectValue placeholder="Select subject" />
                        </SelectTrigger>
                        <SelectContent>
                          {selectedExpert.subjects.map((subject) => (
                            <SelectItem key={subject} value={subject}>{subject}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="duration" className="text-white">Duration</Label>
                      <Select value={sessionData.duration} onValueChange={(value: string) => setSessionData(prev => ({ ...prev, duration: value }))}>
                        <SelectTrigger className="bg-white/5 border-white/10 text-white">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="30">30 minutes</SelectItem>
                          <SelectItem value="60">60 minutes</SelectItem>
                          <SelectItem value="90">90 minutes</SelectItem>
                          <SelectItem value="120">120 minutes</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="topic" className="text-white">Topic</Label>
                    <Input
                      id="topic"
                      placeholder="e.g., Calculus - Integration by Parts"
                      value={sessionData.topic}
                      onChange={(e) => setSessionData(prev => ({ ...prev, topic: e.target.value }))}
                      className="bg-white/5 border-white/10 text-white placeholder:text-white/50"
                    />
                  </div>

                  <div>
                    <Label htmlFor="description" className="text-white">Description</Label>
                    <Textarea
                      id="description"
                      placeholder="Describe what you'd like to cover in this session..."
                      value={sessionData.description}
                      onChange={(e) => setSessionData(prev => ({ ...prev, description: e.target.value }))}
                      className="bg-white/5 border-white/10 text-white placeholder:text-white/50"
                      rows={4}
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="date" className="text-white">Preferred Date</Label>
                      <Input
                        id="date"
                        type="date"
                        value={sessionData.date}
                        onChange={(e) => setSessionData(prev => ({ ...prev, date: e.target.value }))}
                        className="bg-white/5 border-white/10 text-white"
                        min={new Date().toISOString().split('T')[0]}
                      />
                    </div>
                    <div>
                      <Label htmlFor="time" className="text-white">Preferred Time</Label>
                      <Select value={sessionData.time} onValueChange={(value: string) => setSessionData(prev => ({ ...prev, time: value }))}>
                        <SelectTrigger className="bg-white/5 border-white/10 text-white">
                          <SelectValue placeholder="Select time" />
                        </SelectTrigger>
                        <SelectContent>
                          {timeSlots.map((time) => (
                            <SelectItem key={time} value={time}>{time}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="flex space-x-4 pt-4">
                    <Button variant="outline" onClick={() => setStep(1)} className="flex-1">
                      Back
                    </Button>
                    <Button 
                      onClick={() => setStep(3)} 
                      className="flex-1 bg-blue-500 hover:bg-blue-600"
                      disabled={!sessionData.subject || !sessionData.topic || !sessionData.date || !sessionData.time}
                    >
                      Continue
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        )}

        {/* Step 3: Confirmation */}
        {step === 3 && selectedExpert && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
          >
            <div className="max-w-2xl mx-auto">
              <Card className="glass border-white/10">
                <CardHeader>
                  <CardTitle className="text-white">Confirm Your Session</CardTitle>
                  <CardDescription className="text-white/70">
                    Please review your session details
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Expert Info */}
                  <div className="flex items-center space-x-4 p-4 bg-white/5 rounded-lg">
                    <Avatar className="w-12 h-12">
                      <AvatarImage src={selectedExpert.avatar} />
                      <AvatarFallback>
                        {selectedExpert.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="text-white font-medium">{selectedExpert.name}</h3>
                      <p className="text-white/70 text-sm">{selectedExpert.title}</p>
                    </div>
                  </div>

                  {/* Session Details */}
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-white/70">Subject:</span>
                      <span className="text-white">{sessionData.subject}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/70">Topic:</span>
                      <span className="text-white">{sessionData.topic}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/70">Date & Time:</span>
                      <span className="text-white">{sessionData.date} at {sessionData.time}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/70">Duration:</span>
                      <span className="text-white">{sessionData.duration} minutes</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/70">Session Type:</span>
                      <div className="flex items-center space-x-1">
                        <Video className="w-4 h-4 text-blue-400" />
                        <span className="text-white">Video Call</span>
                      </div>
                    </div>
                  </div>

                  {sessionData.description && (
                    <div>
                      <h4 className="text-white font-medium mb-2">Description:</h4>
                      <p className="text-white/70 bg-white/5 p-3 rounded-lg text-sm">
                        {sessionData.description}
                      </p>
                    </div>
                  )}

                  <div className="border-t border-white/10 pt-4">
                    <div className="flex justify-between items-center">
                      <span className="text-white font-medium">Total Cost:</span>
                      <span className="text-2xl font-bold text-green-400">FREE</span>
                    </div>
                    <p className="text-white/50 text-sm mt-1">
                      All sessions are currently free during beta
                    </p>
                  </div>

                  <div className="flex space-x-4">
                    <Button variant="outline" onClick={() => setStep(2)} className="flex-1">
                      Back
                    </Button>
                    <Button 
                      onClick={handleSessionSubmit}
                      className="flex-1 bg-green-500 hover:bg-green-600"
                    >
                      Book Session
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        )}

        {/* Step 4: Success */}
        {step === 4 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
          >
            <div className="max-w-md mx-auto text-center">
              <Card className="glass border-white/10">
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Check className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">Session Booked!</h3>
                  <p className="text-white/70 mb-6">
                    Your session request has been sent to {selectedExpert?.name}. 
                    You'll receive a confirmation email with meeting details.
                  </p>
                  <div className="space-y-2">
                    <Button asChild className="w-full">
                      <Link href="/events">View My Sessions</Link>
                    </Button>
                    <Button variant="outline" asChild className="w-full">
                      <Link href="/dashboard">Back to Dashboard</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}