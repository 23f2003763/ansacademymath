'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'
import { 
  User, 
  Mail, 
  Calendar, 
  Trophy, 
  Target, 
  BookOpen, 
  Clock,
  Award,
  TrendingUp
} from 'lucide-react'

export default function ProfilePage() {
  const { data: session, status } = useSession()
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    bio: ''
  })

  // Redirect if not authenticated
  if (status === 'loading') {
    return <div>Loading...</div>
  }
  
  if (status === 'unauthenticated') {
    redirect('/auth/signin')
  }

  // Sample user data - replace with actual data from your database
  const userData = {
    name: session?.user?.name || 'John Doe',
    email: session?.user?.email || 'john@example.com',
    joinDate: '2024-01-15',
    totalCourses: 12,
    completedCourses: 8,
    currentStreak: 15,
    totalPoints: 2400,
    achievements: [
      { name: 'First Course Complete', icon: '🎯', date: '2024-01-20' },
      { name: 'Week Streak', icon: '🔥', date: '2024-01-27' },
      { name: 'Quick Learner', icon: '⚡', date: '2024-02-03' },
      { name: 'Math Master', icon: '🧮', date: '2024-02-10' }
    ],
    recentActivity: [
      { course: 'Advanced Calculus', action: 'Completed Chapter 5', date: '2024-02-15' },
      { course: 'Linear Algebra', action: 'Started new course', date: '2024-02-14' },
      { course: 'Statistics', action: 'Passed quiz with 95%', date: '2024-02-13' }
    ]
  }

  const completionRate = Math.round((userData.completedCourses / userData.totalCourses) * 100)

  const handleSave = () => {
    // Implement save functionality
    setIsEditing(false)
    // Add API call to update user profile
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">My Profile</h1>
            <p className="text-gray-600">Manage your account and track your progress</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Profile Info */}
            <div className="lg:col-span-1">
              <Card className="mb-6">
                <CardHeader className="text-center">
                  <div className="w-24 h-24 mx-auto mb-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                    <User className="w-12 h-12 text-white" />
                  </div>
                  <CardTitle className="text-2xl">{userData.name}</CardTitle>
                  <CardDescription className="flex items-center justify-center gap-2">
                    <Mail className="w-4 h-4" />
                    {userData.email}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Calendar className="w-4 h-4" />
                      Joined {new Date(userData.joinDate).toLocaleDateString()}
                    </div>
                    <Button 
                      onClick={() => setIsEditing(!isEditing)}
                      className="w-full"
                      variant={isEditing ? "secondary" : "default"}
                    >
                      {isEditing ? 'Cancel' : 'Edit Profile'}
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Stats */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5" />
                    Quick Stats
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Current Streak</span>
                    <Badge variant="secondary" className="bg-orange-100 text-orange-800">
                      🔥 {userData.currentStreak} days
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Total Points</span>
                    <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
                      ⭐ {userData.totalPoints}
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Completion Rate</span>
                    <Badge variant="secondary" className="bg-green-100 text-green-800">
                      {completionRate}%
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right Column - Detailed Info */}
            <div className="lg:col-span-2">
              <Tabs defaultValue="overview" className="space-y-6">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="courses">Courses</TabsTrigger>
                  <TabsTrigger value="achievements">Achievements</TabsTrigger>
                  <TabsTrigger value="settings">Settings</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="space-y-6">
                  {/* Course Progress */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <BookOpen className="w-5 h-5" />
                        Course Progress
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex justify-between text-sm">
                          <span>Completed: {userData.completedCourses}/{userData.totalCourses}</span>
                          <span>{completionRate}%</span>
                        </div>
                        <Progress value={completionRate} className="h-2" />
                      </div>
                    </CardContent>
                  </Card>

                  {/* Recent Activity */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Clock className="w-5 h-5" />
                        Recent Activity
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {userData.recentActivity.map((activity, index) => (
                          <div key={index} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                            <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                            <div className="flex-1">
                              <p className="font-medium text-sm">{activity.action}</p>
                              <p className="text-sm text-gray-600">{activity.course}</p>
                              <p className="text-xs text-gray-500">{new Date(activity.date).toLocaleDateString()}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="courses">
                  <Card>
                    <CardHeader>
                      <CardTitle>My Courses</CardTitle>
                      <CardDescription>Track your enrolled and completed courses</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="text-center py-8 text-gray-500">
                        <BookOpen className="w-12 h-12 mx-auto mb-4 opacity-50" />
                        <p>Course details will be displayed here</p>
                        <p className="text-sm">Connect with your course management system</p>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="achievements">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Trophy className="w-5 h-5" />
                        Achievements
                      </CardTitle>
                      <CardDescription>Your learning milestones and badges</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {userData.achievements.map((achievement, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.1 }}
                            className="flex items-center gap-3 p-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg border border-yellow-200"
                          >
                            <div className="text-2xl">{achievement.icon}</div>
                            <div>
                              <p className="font-medium">{achievement.name}</p>
                              <p className="text-sm text-gray-600">
                                {new Date(achievement.date).toLocaleDateString()}
                              </p>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="settings">
                  <Card>
                    <CardHeader>
                      <CardTitle>Profile Settings</CardTitle>
                      <CardDescription>Update your personal information</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {isEditing ? (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="space-y-4"
                        >
                          <div>
                            <Label htmlFor="name">Full Name</Label>
                            <Input
                              id="name"
                              value={formData.name}
                              onChange={(e) => setFormData({...formData, name: e.target.value})}
                              placeholder={userData.name}
                            />
                          </div>
                          <div>
                            <Label htmlFor="email">Email</Label>
                            <Input
                              id="email"
                              type="email"
                              value={formData.email}
                              onChange={(e) => setFormData({...formData, email: e.target.value})}
                              placeholder={userData.email}
                            />
                          </div>
                          <div>
                            <Label htmlFor="bio">Bio</Label>
                            <Input
                              id="bio"
                              value={formData.bio}
                              onChange={(e) => setFormData({...formData, bio: e.target.value})}
                              placeholder="Tell us about yourself..."
                            />
                          </div>
                          <div className="flex gap-2">
                            <Button onClick={handleSave}>Save Changes</Button>
                            <Button variant="outline" onClick={() => setIsEditing(false)}>
                              Cancel
                            </Button>
                          </div>
                        </motion.div>
                      ) : (
                        <div className="text-center py-8 text-gray-500">
                          <User className="w-12 h-12 mx-auto mb-4 opacity-50" />
                          <p>Click "Edit Profile" to update your information</p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}