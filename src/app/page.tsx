'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { BookOpen, Users, Trophy, Zap, ArrowRight, Star, CheckCircle, Target } from 'lucide-react'
import Link from 'next/link'
import { LaTeXRenderer } from '@/components/ui/latex-renderer'

export default function HomePage() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">A</span>
              </div>
              <span className="text-xl font-bold text-white">ANS Academy</span>
            </div>
            <div className="hidden md:flex items-center space-x-6">
              <Link href="/study" className="text-white/80 hover:text-white transition-colors">Study</Link>
              <Link href="/community" className="text-white/80 hover:text-white transition-colors">Community</Link>
              <Link href="/pyq" className="text-white/80 hover:text-white transition-colors">PYQ</Link>
              <Link href="/login" className="text-white/80 hover:text-white transition-colors">Login</Link>
              <Button asChild className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">
                <Link href="/signup">Get Started</Link>
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="container mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
              Master Your
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                {" "}Competitive Exams
              </span>
            </h1>
            <p className="text-xl text-white/80 mb-8 max-w-3xl mx-auto">
              Join thousands of students preparing for JEE, GATE, Olympiads, and more with our AI-powered learning platform
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-lg px-8 py-6">
                <Link href="/signup">Start Learning Free</Link>
              </Button>
              <Button size="lg" variant="outline" className="border-white/20 text-white hover:bg-white/10 text-lg px-8 py-6">
                Watch Demo
              </Button>
            </div>
          </motion.div>

          {/* Floating Math Formulas */}
          <div className="mt-16 relative">
            <motion.div
              className="absolute top-0 left-1/4 animate-float"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 0.8 }}
            >
              <div className="glass rounded-lg p-4">
                <LaTeXRenderer 
                  content="$E = mc^2$"
                  latex="$E = mc^2$" 
                  className="text-white text-2xl"
                />
              </div>
            </motion.div>
            <motion.div
              className="absolute top-20 right-1/4 animate-float"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5, duration: 0.8 }}
              style={{ animationDelay: '2s' }}
            >
              <div className="glass rounded-lg p-4">
                <LaTeXRenderer 
                  content="$\int_{-\infty}^{\infty} e^{-x^2} dx = \sqrt{\pi}$"
                  latex="$\int_{-\infty}^{\infty} e^{-x^2} dx = \sqrt{\pi}$" 
                  className="text-white text-lg"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Why Choose ANS Academy?</h2>
            <p className="text-xl text-white/80">Advanced features designed for competitive exam success</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Zap,
                title: "AI-Powered Learning",
                description: "Get instant answers to your questions with our advanced AI tutor",
                color: "from-yellow-400 to-orange-500"
              },
              {
                icon: Users,
                title: "Community Support",
                description: "Connect with fellow students and expert mentors",
                color: "from-green-400 to-blue-500"
              },
              {
                icon: BookOpen,
                title: "Comprehensive Materials",
                description: "Complete study materials for all major competitive exams",
                color: "from-purple-400 to-pink-500"
              },
              {
                icon: Trophy,
                title: "Progress Tracking",
                description: "Monitor your improvement with detailed analytics",
                color: "from-blue-400 to-purple-500"
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2, duration: 0.6 }}
                whileHover={{ y: -10 }}
              >
                <Card className="glass border-white/10 h-full hover:border-white/20 transition-all duration-300">
                  <CardHeader className="text-center">
                    <div className={`w-16 h-16 mx-auto rounded-full bg-gradient-to-r ${feature.color} flex items-center justify-center mb-4`}>
                      <feature.icon className="w-8 h-8 text-white" />
                    </div>
                    <CardTitle className="text-white">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-white/70 text-center">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Exams Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Prepare for All Major Exams</h2>
            <p className="text-xl text-white/80">Comprehensive preparation for every competitive exam</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { name: "JEE Main", subjects: ["Physics", "Chemistry", "Mathematics"], students: "50,000+" },
              { name: "JEE Advanced", subjects: ["Physics", "Chemistry", "Mathematics"], students: "25,000+" },
              { name: "GATE", subjects: ["CS", "EE", "ME", "CE"], students: "30,000+" },
              { name: "Olympiads", subjects: ["Math", "Physics", "Chemistry", "CS"], students: "15,000+" },
              { name: "ISI Entrance", subjects: ["B.Stat", "B.Math", "M.Stat", "M.Math"], students: "8,000+" },
              { name: "UGC NET", subjects: ["CS", "Math", "Physics", "Chemistry"], students: "20,000+" }
            ].map((exam, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                whileHover={{ scale: 1.05 }}
              >
                <Card className="glass border-white/10 hover:border-white/20 transition-all duration-300">
                  <CardHeader>
                    <CardTitle className="text-white text-xl">{exam.name}</CardTitle>
                    <CardDescription className="text-white/70">
                      {exam.students} students preparing
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {exam.subjects.map((subject, idx) => (
                        <span key={idx} className="px-3 py-1 bg-white/10 rounded-full text-sm text-white">
                          {subject}
                        </span>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <Card className="glass border-white/10 p-12 text-center">
            <CardHeader>
              <CardTitle className="text-4xl font-bold text-white mb-4">
                Ready to Transform Your Preparation?
              </CardTitle>
              <CardDescription className="text-xl text-white/80 mb-8">
                Join thousands of successful students who achieved their dreams with ANS Academy
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button size="lg" asChild className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-lg px-12 py-6">
                <Link href="/signup">Start Your Journey <ArrowRight className="ml-2 w-5 h-5" /></Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 border-t border-white/10">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">A</span>
                </div>
                <span className="text-xl font-bold text-white">ANS Academy</span>
              </div>
              <p className="text-white/70">Empowering students to achieve their competitive exam dreams.</p>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Platform</h3>
              <ul className="space-y-2 text-white/70">
                <li><Link href="/study" className="hover:text-white transition-colors">Study Materials</Link></li>
                <li><Link href="/community" className="hover:text-white transition-colors">Community</Link></li>
                <li><Link href="/pyq" className="hover:text-white transition-colors">Previous Papers</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-white/70">
                <li><Link href="/help" className="hover:text-white transition-colors">Help Center</Link></li>
                <li><Link href="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
                <li><Link href="/feedback" className="hover:text-white transition-colors">Feedback</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Legal</h3>
              <ul className="space-y-2 text-white/70">
                <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
                <li><Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/10 mt-8 pt-8 text-center text-white/70">
            <p>&copy; 2024 ANS Academy. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}