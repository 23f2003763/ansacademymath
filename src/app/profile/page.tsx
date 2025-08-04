
import { useState } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  User, 
  Star, 
  MessageSquare, 
  BookOpen, 
  Award,
  Calendar,
  TrendingUp,
  Settings,
  Camera,
  Save,
  ArrowLeft
} from 'lucide-react'
import Link from 'next/link'

export default function ProfilePage() {
  const [user, setUser] = useState({
    id: '1',
    name: 'John Doe',
    username: 'johndoe',
    email: 'john@example.com',
    bio: 'Passionate about mathematics and physics. Preparing for JEE Advanced 2024. Love helping fellow students with complex problems.',
    avatar: null,
    ansPoints: 12500,
    examPrep: ['JEE Main', 'JEE Advanced'],
    joinedAt: '2023-09-15',
    location: 'Mumbai, India'
  })

  const [stats, setStats] = useState({
    questionsAsked: 45,
    questionsAnswered: 127,
    upvotesReceived: 234,
    studyHours: 156,
    rank: 42,
    badges: 8
  })

  const [activities, setActivities] = useState([
    {
      id: 1,
      type: 'answer',
      content: 'Answered: How to solve quadratic equations using completing the square?',
      subject: 'Mathematics',
      upvotes: 15,
      timestamp: '2 hours ago'
    },
    {
      id: 2,
      type: 'question',
      content: 'Asked: Can someone explain the photoelectric effect in simple terms?',
      subject: 'Physics',
      answers: 3,
      timestamp: '1 day ago'
    },
    {
      id: 3,
      type: 'study',
      content: 'Completed chapter: Thermodynamics - First Law',
      subject: 'Physics',
      progress: 100,
      timestamp: '2 days ago'
    }
  ])

  const [achievements, setAchievements] = useState([
    {
      id: 1,
      name: 'Math Wizard',
      description: 'Answered 100+ mathematics questions',
      icon: '🧙‍♂️',
      earnedAt: '2024-01-10'
    },
    {
      id: 2,
      name: 'Helpful Hand',
      description: 'Received 200+ upvotes on answers',
      icon: '🤝',
      earnedAt: '2024-01-08'
    },
    {
      id: 3,
      name: 'Study Streak',
      description: 'Studied for 30 consecutive days',
      icon: '🔥',
      earnedAt: '2024-01-05'
    }
  ])

  const [isEditing, setIsEditing] = useState(false)
  const [editedUser, setEditedUser] = useState(user)

  const handleSave = () => {
    setUser(editedUser)
    setIsEditing(false)
  }

  const handleAvatarChange = () => {
    // Implement avatar upload logic
    console.log('Avatar change clicked')
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
            <Button
              onClick={() => setIsEditing(!isEditing)}
              className="bg-blue-500 hover:bg-blue-600"
            >
              {isEditing ? <Save className="w-4 h-4 mr-2" /> : <Settings className="w-4 h-4 mr-2" />}
              {isEditing ? 'Save Changes' : 'Edit Profile'}
            </Button>
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
          <Card className="glass border-white/10">
            <CardContent className="p-8">
              <div className="flex flex-col md:flex-row items-start md:items-center space-y-6 md:space-y-0 md:space-x-8">
                {/* Avatar */}
                <div className="relative">
                  <Avatar className="w-32 h-32">
                    <AvatarImage src={user.avatar || undefined} />
                    <AvatarFallback className="text-2xl">
                      {user.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  {isEditing && (
                    <Button
                      size="sm"
                      onClick={handleAvatarChange}
                      className="absolute bottom-0 right-0 rounded-full w-10 h-10 p-0"
                    >
                      <Camera className="w-4 h-4" />
                    </Button>
                  )}
                </div>

                {/* User Info */}
                <div className="flex-1">
                  {isEditing ? (
                    <div className="space-y-4">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="name" className="text-white">Full Name</Label>
                          <Input
                            id="name"
                            value={editedUser.name}
                            onChange={(e) => setEditedUser(prev => ({ ...prev, name: e.target.value }))}
                            className="bg-white/5 border-white/10 text-white"
                          />
                        </div>
                        <div>
                          <Label htmlFor="username" className="text-white">Username</Label>
                          <Input
                            id="username"
                            value={editedUser.username}
                            onChange={(e) => setEditedUser(prev => ({ ...prev, username: e.target.value }))}
                            className="bg-white/5 border-white/10 text-white"
                          />
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="bio" className="text-white">Bio</Label>
                        <Textarea
                          id="bio"
                          value={editedUser.bio}
                          onChange={(e) => setEditedUser(prev => ({ ...prev, bio: e.target.value }))}
                          className="bg-white/5 border-white/10 text-white"
                          rows={3}
                        />
                      </div>
                    </div>
                  ) : (
                    <>
                      <h1 className="text-3xl font-bold text-white mb-2">{user.name}</h1>
                      <p className="text-blue-400 text-lg mb-3">@{user.username}</p>
                      <p className="text-white/80 mb-4 max-w-2xl">{user.bio}</p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {user.examPrep.map((exam) => (
                          <Badge key={exam} className="bg-blue-500/20 text-blue-300 border-blue-500/30">
                            {exam}
                          </Badge>
                        ))}
                      </div>
                      <div className="flex items-center space-x-6 text-white/70">
                        <div className="flex items-center space-x-1">
                          <Calendar className="w-4 h-4" />
                          <span>Joined {new Date(user.joinedAt).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Star className="w-4 h-4 text-yellow-400" />
                          <span>{user.ansPoints.toLocaleString()} ANS Points</span>
                        </div>
                      </div>
                    </>
                  )}
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-white">{stats.rank}</p>
                    <p className="text-white/70 text-sm">Global Rank</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-white">{stats.badges}</p>
                    <p className="text-white/70 text-sm">Badges</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Main Content */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 glass">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="activity">Activity</TabsTrigger>
            <TabsTrigger value="achievements">Achievements</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { label: 'Questions Asked', value: stats.questionsAsked, icon: MessageSquare, color: 'from-blue-400 to-blue-600' },
                { label: 'Questions Answered', value: stats.questionsAnswered, icon: MessageSquare, color: 'from-green-400 to-green-600' },
                { label: 'Upvotes Received', value: stats.upvotesReceived, icon: TrendingUp, color: 'from-yellow-400 to-orange-500' },
                { label: 'Study Hours', value: stats.studyHours, icon: BookOpen, color: 'from-purple-400 to-pink-500' },
                { label: 'Global Rank', value: `#${stats.rank}`, icon: Award, color: 'from-red-400 to-red-600' },
                { label: 'ANS Points', value: user.ansPoints.toLocaleString(), icon: Star, color: 'from-indigo-400 to-indigo-600' }
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                >
                  <Card className="glass border-white/10">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-white/70 text-sm">{stat.label}</p>
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
          </TabsContent>

          {/* Activity Tab */}
          <TabsContent value="activity">
            <Card className="glass border-white/10">
              <CardHeader>
                <CardTitle className="text-white">Recent Activity</CardTitle>
                <CardDescription className="text-white/70">
                  Your latest contributions and learning progress
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {activities.map((activity) => (
                  <div key={activity.id} className="p-4 border border-white/10 rounded-lg bg-white/5">
                    <div className="flex items-start space-x-3">
                      <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center flex-shrink-0">
                        {activity.type === 'answer' && <MessageSquare className="w-4 h-4 text-white" />}
                        {activity.type === 'question' && <MessageSquare className="w-4 h-4 text-white" />}
                        {activity.type === 'study' && <BookOpen className="w-4 h-4 text-white" />}
                      </div>
                      <div className="flex-1">
                        <p className="text-white">{activity.content}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <Badge variant="secondary" className="text-xs">{activity.subject}</Badge>
                          <span className="text-xs text-white/70">{activity.timestamp}</span>
                          {activity.upvotes && (
                            <span className="text-xs text-green-400">+{activity.upvotes} upvotes</span>
                          )}
                          {activity.answers && (
                            <span className="text-xs text-blue-400">{activity.answers} answers</span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Achievements Tab */}
          <TabsContent value="achievements">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {achievements.map((achievement) => (
                <motion.div
                  key={achievement.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  <Card className="glass border-white/10 hover:border-yellow-500/30 transition-all duration-300">
                    <CardContent className="p-6 text-center">
                      <div className="text-4xl mb-3">{achievement.icon}</div>
                      <h3 className="text-white font-semibold mb-2">{achievement.name}</h3>
                      <p className="text-white/70 text-sm mb-3">{achievement.description}</p>
                      <Badge className="bg-yellow-500/20 text-yellow-300 border-yellow-500/30">
                        Earned {new Date(achievement.earnedAt).toLocaleDateString()}
                      </Badge>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings">
            <div className="space-y-6">
              <Card className="glass border-white/10">
                <CardHeader>
                  <CardTitle className="text-white">Account Settings</CardTitle>
                  <CardDescription className="text-white/70">
                    Manage your account preferences and privacy settings
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="email" className="text-white">Email Address</Label>
                      <Input
                        id="email"
                        type="email"
                        value={user.email}
                        className="bg-white/5 border-white/10 text-white"
                        readOnly
                      />
                    </div>
                    <div>
                      <Label htmlFor="location" className="text-white">Location</Label>
                      <Input
                        id="location"
                        value={user.location}
                        onChange={(e) => setUser(prev => ({ ...prev, location: e.target.value }))}
                        className="bg-white/5 border-white/10 text-white"
                      />
                    </div>
                  </div>
                  
                  <div className="pt-4 border-t border-white/10">
                    <h3 className="text-white font-medium mb-4">Privacy Settings</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-white">Show online status</span>
                        <Button variant="outline" size="sm">Toggle</Button>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-white">Allow direct messages</span>
                        <Button variant="outline" size="sm">Toggle</Button>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-white">Show activity status</span>
                        <Button variant="outline" size="sm">Toggle</Button>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-white/10">
                    <h3 className="text-white font-medium mb-4">Danger Zone</h3>
                    <Button variant="destructive">
                      Delete Account
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}