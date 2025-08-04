'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { 
  ChevronLeft,
  ChevronRight,
  BookOpen,
  CheckCircle,
  Play,
  Pause,
  RotateCcw,
  ArrowLeft,
  Lightbulb,
  Target,
  Award
} from 'lucide-react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { LaTeXRenderer } from '@/components/ui/latex-renderer'

interface FlashCard {
  id: number
  type: 'concept' | 'formula' | 'example' | 'quiz'
  title: string
  content: string
  latex?: string
  explanation?: string
  hint?: string
  answer?: string
  options?: string[]
  difficulty: 'Easy' | 'Medium' | 'Hard'
}

const SAMPLE_CARDS: FlashCard[] = [
  {
    id: 1,
    type: 'concept',
    title: 'What is a Limit?',
    content: 'A limit describes the behavior of a function as the input approaches a certain value.',
    latex: 'The limit of $f(x)$ as $x$ approaches $a$ is written as: $$\\lim_{x \\to a} f(x) = L$$',
    explanation: 'This means that as x gets arbitrarily close to the value a, f(x) gets arbitrarily close to the value L.',
    difficulty: 'Easy'
  },
  {
    id: 2,
    type: 'formula',
    title: 'Important Limit Formula',
    content: 'One of the most important limits in calculus:',
    latex: '$$\\lim_{x \\to 0} \\frac{\\sin x}{x} = 1$$',
    explanation: 'This limit is fundamental for finding derivatives of trigonometric functions.',
    difficulty: 'Medium'
  },
  {
    id: 3,
    type: 'example',
    title: 'Evaluating a Limit',
    content: 'Find the limit:',
    latex: '$$\\lim_{x \\to 2} \\frac{x^2 - 4}{x - 2}$$',
    explanation: 'This is an indeterminate form 0/0. We can factor the numerator: $(x-2)(x+2)$, then cancel $(x-2)$ to get $\\lim_{x \\to 2} (x+2) = 4$',
    answer: '4',
    difficulty: 'Medium'
  },
  {
    id: 4,
    type: 'quiz',
    title: 'Quick Check',
    content: 'What is the limit of $\\frac{1}{x}$ as $x$ approaches infinity?',
    options: ['0', '1', '∞', 'Does not exist'],
    answer: '0',
    explanation: 'As x becomes very large, 1/x becomes very small, approaching 0.',
    difficulty: 'Easy'
  }
]

export default function ChapterStudyPage() {
  const params = useParams()
  const [currentCard, setCurrentCard] = useState(0)
  const [showAnswer, setShowAnswer] = useState(false)
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  const [progress, setProgress] = useState(0)
  const [isCompleted, setIsCompleted] = useState(false)

  const cards = SAMPLE_CARDS
  const card = cards[currentCard]

  useEffect(() => {
    setProgress(((currentCard + 1) / cards.length) * 100)
  }, [currentCard, cards.length])

  const nextCard = () => {
    if (currentCard < cards.length - 1) {
      setCurrentCard(currentCard + 1)
      setShowAnswer(false)
      setSelectedAnswer(null)
    } else {
      setIsCompleted(true)
    }
  }

  const prevCard = () => {
    if (currentCard > 0) {
      setCurrentCard(currentCard - 1)
      setShowAnswer(false)
      setSelectedAnswer(null)
    }
  }

  const toggleAnswer = () => {
    setShowAnswer(!showAnswer)
  }

  const handleQuizAnswer = (answer: string) => {
    setSelectedAnswer(answer)
    setShowAnswer(true)
  }

  const resetProgress = () => {
    setCurrentCard(0)
    setShowAnswer(false)
    setSelectedAnswer(null)
    setIsCompleted(false)
  }

  if (isCompleted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          <Card className="glass border-white/10 max-w-md mx-auto">
            <CardContent className="p-8 text-center">
              <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <Award className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-3">Chapter Completed!</h2>
              <p className="text-white/70 mb-6">
                Great job! You've completed this chapter. You've earned 50 ANS points!
              </p>
              <div className="space-y-3">
                <Button onClick={resetProgress} variant="outline" className="w-full">
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Review Again
                </Button>
                <Button asChild className="w-full bg-blue-500 hover:bg-blue-600">
                  <Link href={`/study/${params.examId}/${params.subjectId}`}>
                    Next Chapter
                  </Link>
                </Button>
                <Button asChild variant="outline" className="w-full">
                  <Link href={`/study/${params.examId}`}>
                    Back to Subject
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Navigation */}
      <nav className="glass border-b border-white/10">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Link href={`/study/${params.examId}/${params.subjectId}`} className="flex items-center space-x-2">
              <ArrowLeft className="w-4 h-4 mr-2 text-white/70" />
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">A</span>
              </div>
              <span className="text-xl font-bold text-white">Chapter Study</span>
            </Link>
            <div className="flex items-center space-x-4">
              <Badge className="bg-blue-500/20 text-blue-300">
                {currentCard + 1} / {cards.length}
              </Badge>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-white text-sm">Progress</span>
            <span className="text-white text-sm">{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Flash Card */}
        <div className="max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentCard}
              initial={{ opacity: 0, x: 300 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -300 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="glass border-white/10 min-h-[500px]">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        card.type === 'concept' ? 'bg-blue-500' :
                        card.type === 'formula' ? 'bg-purple-500' :
                        card.type === 'example' ? 'bg-green-500' : 'bg-orange-500'
                      }`}>
                        {card.type === 'concept' && <Lightbulb className="w-5 h-5 text-white" />}
                        {card.type === 'formula' && <BookOpen className="w-5 h-5 text-white" />}
                        {card.type === 'example' && <Target className="w-5 h-5 text-white" />}
                        {card.type === 'quiz' && <CheckCircle className="w-5 h-5 text-white" />}
                      </div>
                      <div>
                        <CardTitle className="text-white">{card.title}</CardTitle>
                        <Badge className={`mt-1 ${
                          card.difficulty === 'Easy' ? 'bg-green-500/20 text-green-300' :
                          card.difficulty === 'Medium' ? 'bg-yellow-500/20 text-yellow-300' :
                          'bg-red-500/20 text-red-300'
                        }`}>
                          {card.difficulty}
                        </Badge>
                      </div>
                    </div>
                    <Badge variant="secondary" className="capitalize">
                      {card.type}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Main Content */}
                  <div className="text-center space-y-4">
                    <p className="text-white text-lg">{card.content}</p>
                    {card.latex && (
                      <div className="bg-white/5 p-6 rounded-lg border border-white/10">
                        <LaTeXRenderer content={card.latex} className="text-white text-xl" />
                      </div>
                    )}
                  </div>

                  {/* Quiz Options */}
                  {card.type === 'quiz' && card.options && !showAnswer && (
                    <div className="grid grid-cols-2 gap-3">
                      {card.options.map((option, index) => (
                        <Button
                          key={index}
                          variant="outline"
                          onClick={() => handleQuizAnswer(option)}
                          className="p-4 h-auto text-left justify-start"
                        >
                          <span className="w-6 h-6 rounded-full bg-blue-500 text-white text-sm flex items-center justify-center mr-3">
                            {String.fromCharCode(65 + index)}
                          </span>
                          {option}
                        </Button>
                      ))}
                    </div>
                  )}

                  {/* Answer/Explanation */}
                  {showAnswer && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4 }}
                      className="bg-white/5 p-6 rounded-lg border border-white/10"
                    >
                      {card.type === 'quiz' && (
                        <div className="mb-4">
                          <div className="flex items-center space-x-2 mb-2">
                            <CheckCircle className={`w-5 h-5 ${
                              selectedAnswer === card.answer ? 'text-green-400' : 'text-red-400'
                            }`} />
                            <span className="text-white font-medium">
                              {selectedAnswer === card.answer ? 'Correct!' : 'Incorrect'}
                            </span>
                          </div>
                          <p className="text-white/70">
                            The correct answer is: <span className="text-green-400 font-medium">{card.answer}</span>
                          </p>
                        </div>
                      )}
                      {card.explanation && (
                        <div>
                          <h4 className="text-white font-medium mb-2">Explanation:</h4>
                          <p className="text-white/80">{card.explanation}</p>
                        </div>
                      )}
                    </motion.div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex justify-center space-x-4 pt-6">
                    <Button
                      variant="outline"
                      onClick={prevCard}
                      disabled={currentCard === 0}
                    >
                      <ChevronLeft className="w-4 h-4 mr-2" />
                      Previous
                    </Button>

                    {card.type === 'quiz' ? (
                      showAnswer ? (
                        <Button onClick={nextCard} className="bg-blue-500 hover:bg-blue-600">
                          {currentCard === cards.length - 1 ? 'Complete Chapter' : 'Next Card'}
                          <ChevronRight className="w-4 h-4 ml-2" />
                        </Button>
                      ) : (
                        <Button disabled className="bg-gray-500">
                          Answer to Continue
                        </Button>
                      )
                    ) : (
                      <>
                        {!showAnswer && card.explanation && (
                          <Button onClick={toggleAnswer} variant="outline">
                            <Lightbulb className="w-4 h-4 mr-2" />
                            Show Explanation
                          </Button>
                        )}
                        <Button onClick={nextCard} className="bg-blue-500 hover:bg-blue-600">
                          {currentCard === cards.length - 1 ? 'Complete Chapter' : 'Next Card'}
                          <ChevronRight className="w-4 h-4 ml-2" />
                        </Button>
                      </>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Card Navigation */}
        <div className="flex justify-center mt-8">
          <div className="flex space-x-2">
            {cards.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentCard(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentCard 
                    ? 'bg-blue-500' 
                    : index < currentCard 
                      ? 'bg-green-500' 
                      : 'bg-white/20'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}