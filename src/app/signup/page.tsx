'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, UserPlus, Mail, Lock, User, BookOpen } from 'lucide-react'

const EXAM_OPTIONS = [
  { value: 'jee_main', label: 'JEE Main' },
  { value: 'jee_advanced', label: 'JEE Advanced' },
  { value: 'gate_cs', label: 'GATE - Computer Science' },
  { value: 'gate_ee', label: 'GATE - Electrical Engineering' },
  { value: 'gate_me', label: 'GATE - Mechanical Engineering' },
  { value: 'olympiad_math', label: 'Mathematics Olympiad' },
  { value: 'olympiad_physics', label: 'Physics Olympiad' },
  { value: 'olympiad_chemistry', label: 'Chemistry Olympiad' },
  { value: 'olympiad_cs', label: 'Computer Science Olympiad' },
  { value: 'isi_bstat', label: 'ISI - B.Stat' },
  { value: 'isi_bmath', label: 'ISI - B.Math' },
  { value: 'isi_mstat', label: 'ISI - M.Stat' },
  { value: 'isi_mmath', label: 'ISI - M.Math' },
  { value: 'cmi_bsc', label: 'CMI - B.Sc' },
  { value: 'cmi_msc_math', label: 'CMI - M.Sc Mathematics' },
  { value: 'cmi_msc_cs', label: 'CMI - M.Sc Computer Science' },
  { value: 'iitm_ds', label: 'IIT Madras - Data Science' },
  { value: 'jest', label: 'JEST' },
  { value: 'ugc_net', label: 'UGC NET' },
]

export default function SignUpPage() {
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    examPrep: [] as string[],
    agreeTerms: false,
  })
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const router = useRouter()

  const handleExamChange = (examValue: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      examPrep: checked 
        ? [...prev.examPrep, examValue]
        : prev.examPrep.filter(exam => exam !== examValue)
    }))
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.name.trim()) newErrors.name = 'Name is required'
    if (!formData.username.trim()) newErrors.username = 'Username is required'
    if (!formData.email.trim()) newErrors.email = 'Email is required'
    if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid'
    if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters'
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match'
    if (formData.examPrep.length === 0) newErrors.examPrep = 'Please select at least one exam'
    if (!formData.agreeTerms) newErrors.agreeTerms = 'You must agree to the terms'

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateForm()) return

    setLoading(true)
    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          username: formData.username,
          email: formData.email,
          password: formData.password,
          examPrep: formData.examPrep,
        }),
      })

      if (response.ok) {
        router.push('/dashboard')
      } else {
        const data = await response.json()
        setErrors({ general: data.error || 'Signup failed' })
      }
    } catch (error) {
      setErrors({ general: 'Network error. Please try again.' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Card className="glass border-white/10">
            <CardHeader className="text-center">
              <div className="flex items-center justify-center mb-4">
                <Link href="/" className="flex items-center text-white/70 hover:text-white">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Home
                </Link>
              </div>
              <div className="w-16 h-16 mx-auto bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mb-4">
                <UserPlus className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-2xl text-white">Join ANS Academy</CardTitle>
              <CardDescription className="text-white/70">
                Start your competitive exam preparation journey
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {errors.general && (
                  <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3 text-red-400 text-sm">
                    {errors.general}
                  </div>
                )}

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-white">Full Name</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 w-4 h-4 text-white/50" />
                      <Input
                        id="name"
                        placeholder="Enter your full name"
                        value={formData.name}
                        onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                        className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-white/50"
                      />
                    </div>
                    {errors.name && <p className="text-red-400 text-sm">{errors.name}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="username" className="text-white">Username</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 w-4 h-4 text-white/50" />
                      <Input
                        id="username"
                        placeholder="Choose a username"
                        value={formData.username}
                        onChange={(e) => setFormData(prev => ({ ...prev, username: e.target.value }))}
                        className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-white/50"
                      />
                    </div>
                    {errors.username && <p className="text-red-400 text-sm">{errors.username}</p>}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-white">Email Address</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 w-4 h-4 text-white/50" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      value={formData.email}
                      onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                      className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-white/50"
                    />
                  </div>
                  {errors.email && <p className="text-red-400 text-sm">{errors.email}</p>}
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="password" className="text-white">Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 w-4 h-4 text-white/50" />
                      <Input
                        id="password"
                        type="password"
                        placeholder="Create password"
                        value={formData.password}
                        onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                        className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-white/50"
                      />
                    </div>
                    {errors.password && <p className="text-red-400 text-sm">{errors.password}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword" className="text-white">Confirm Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 w-4 h-4 text-white/50" />
                      <Input
                        id="confirmPassword"
                        type="password"
                        placeholder="Confirm password"
                        value={formData.confirmPassword}
                        onChange={(e) => setFormData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                        className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-white/50"
                      />
                    </div>
                    {errors.confirmPassword && <p className="text-red-400 text-sm">{errors.confirmPassword}</p>}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-white flex items-center">
                    <BookOpen className="w-4 h-4 mr-2" />
                    Select Exams You're Preparing For
                  </Label>
                  <div className="grid md:grid-cols-2 gap-2 max-h-40 overflow-y-auto p-3 bg-white/5 rounded-lg border border-white/10">
                    {EXAM_OPTIONS.map((exam) => (
                      <div key={exam.value} className="flex items-center space-x-2">
                        <Checkbox
                          id={exam.value}
                          checked={formData.examPrep.includes(exam.value)}
                          onCheckedChange={(checked: boolean) => handleExamChange(exam.value, checked)}
                          className="border-white/20"
                        />
                        <Label htmlFor={exam.value} className="text-sm text-white/80 cursor-pointer">
                          {exam.label}
                        </Label>
                      </div>
                    ))}
                  </div>
                  {errors.examPrep && <p className="text-red-400 text-sm">{errors.examPrep}</p>}
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="agreeTerms"
                    checked={formData.agreeTerms}
                    onCheckedChange={(checked: boolean) => setFormData(prev => ({ ...prev, agreeTerms: checked }))}
                    className="border-white/20"
                  />
                  <Label htmlFor="agreeTerms" className="text-sm text-white/80">
                    I agree to the{' '}
                    <Link href="/terms" className="text-blue-400 hover:underline">
                      Terms of Service
                    </Link>{' '}
                    and{' '}
                    <Link href="/privacy" className="text-blue-400 hover:underline">
                      Privacy Policy
                    </Link>
                  </Label>
                </div>
                {errors.agreeTerms && <p className="text-red-400 text-sm">{errors.agreeTerms}</p>}

                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white py-6"
                >
                  {loading ? 'Creating Account...' : 'Create Account'}
                </Button>

                <div className="text-center">
                  <p className="text-white/70">
                    Already have an account?{' '}
                    <Link href="/login" className="text-blue-400 hover:underline">
                      Sign in here
                    </Link>
                  </p>
                </div>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}