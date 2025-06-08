import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  ArrowRight,
  Brain,
  Target,
  TrendingUp,
  Users,
  CheckCircle,
  Star,
  Zap,
  BookOpen,
  Award,
  BarChart3,
  Sparkles,
} from "lucide-react";

interface LandingPageProps {
  onGetStarted: () => void;
  onLogin?: () => void;
  onRegister?: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({
  onGetStarted,
  onLogin,
  onRegister,
}) => {
  const features = [
    {
      icon: <Brain className="h-8 w-8 text-blue-500" />,
      title: "AI-Powered Analysis",
      description:
        "Advanced AI algorithms analyze your profile against company requirements",
    },
    {
      icon: <Target className="h-8 w-8 text-green-500" />,
      title: "Personalized Matching",
      description:
        "Get matched with companies that align with your skills and aspirations",
    },
    {
      icon: <TrendingUp className="h-8 w-8 text-purple-500" />,
      title: "Readiness Score",
      description:
        "Track your placement readiness with detailed scoring and insights",
    },
    {
      icon: <BookOpen className="h-8 w-8 text-orange-500" />,
      title: "Action Plans",
      description:
        "Receive customized preparation roadmaps with timeline and resources",
    },
  ];

  const testimonials = [
    {
      name: "Priya Sharma",
      role: "Computer Science Student",
      content:
        "Placify helped me identify my skill gaps and land my dream job at a top tech company!",
      rating: 5,
    },
    {
      name: "Rahul Kumar",
      role: "Engineering Graduate",
      content:
        "The AI analysis was spot-on. I improved my readiness score by 40% in just 2 months.",
      rating: 5,
    },
    {
      name: "Ananya Patel",
      role: "Final Year Student",
      content:
        "The personalized action plan made all the difference in my placement preparation.",
      rating: 5,
    },
  ];

  const stats = [
    { number: "10,000+", label: "Students Helped" },
    { number: "500+", label: "Partner Companies" },
    { number: "85%", label: "Success Rate" },
    { number: "4.9/5", label: "User Rating" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Navbar */}
      <nav className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-full p-2 shadow-lg">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-white"
                >
                  <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
                  <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
                </svg>
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Placify
              </h1>
            </div>
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                onClick={onLogin || onGetStarted}
                className="font-medium hover:bg-blue-50"
              >
                Login
              </Button>
              <Button
                onClick={onRegister || onGetStarted}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium shadow-md hover:shadow-lg transition-all duration-300"
              >
                Register
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10" />
        <div className="container mx-auto px-4 py-20 relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <div className="flex justify-center mb-6">
              <Badge
                variant="secondary"
                className="px-4 py-2 text-sm font-medium"
              >
                <Sparkles className="h-4 w-4 mr-2" />
                AI-Powered Placement Assistant
              </Badge>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6">
              Your Dream Job
              <br />
              <span className="text-4xl md:text-6xl">Starts Here</span>
            </h1>

            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
              Discover your placement readiness with AI-powered analysis. Get
              personalized insights, company matches, and actionable preparation
              plans to land your dream job.
            </p>

            <div className="flex justify-center mb-12">
              <Button
                size="lg"
                onClick={onGetStarted}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-6 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Get Started Free
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>

            {/* Preview Images */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-white rounded-xl shadow-lg overflow-hidden border"
              >
                <div className="h-48 bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
                  <div className="text-center">
                    <Brain className="h-12 w-12 text-blue-600 mx-auto mb-3" />
                    <h3 className="font-semibold text-gray-800">
                      Profile Analysis
                    </h3>
                    <p className="text-sm text-gray-600 mt-1">
                      AI-powered insights
                    </p>
                  </div>
                </div>
                <div className="p-4">
                  <p className="text-sm text-gray-600">
                    Comprehensive analysis of your academic profile and skills
                  </p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="bg-white rounded-xl shadow-lg overflow-hidden border"
              >
                <div className="h-48 bg-gradient-to-br from-green-100 to-blue-100 flex items-center justify-center">
                  <div className="text-center">
                    <Target className="h-12 w-12 text-green-600 mx-auto mb-3" />
                    <h3 className="font-semibold text-gray-800">
                      Company Matching
                    </h3>
                    <p className="text-sm text-gray-600 mt-1">
                      Perfect job matches
                    </p>
                  </div>
                </div>
                <div className="p-4">
                  <p className="text-sm text-gray-600">
                    Find companies that align with your skills and aspirations
                  </p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="bg-white rounded-xl shadow-lg overflow-hidden border md:col-span-2 lg:col-span-1"
              >
                <div className="h-48 bg-gradient-to-br from-purple-100 to-pink-100 flex items-center justify-center">
                  <div className="text-center">
                    <TrendingUp className="h-12 w-12 text-purple-600 mx-auto mb-3" />
                    <h3 className="font-semibold text-gray-800">
                      Readiness Score
                    </h3>
                    <p className="text-sm text-gray-600 mt-1">
                      Track your progress
                    </p>
                  </div>
                </div>
                <div className="p-4">
                  <p className="text-sm text-gray-600">
                    Monitor your placement readiness with detailed scoring
                  </p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white/50 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">
                  {stat.number}
                </div>
                <div className="text-muted-foreground font-medium">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">Why Choose Placify?</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Leverage cutting-edge AI technology to maximize your placement
              success
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow duration-300 border-0 shadow-md bg-white/80 backdrop-blur-sm">
                  <CardHeader className="text-center pb-4">
                    <div className="mx-auto mb-4 p-3 bg-gray-50 rounded-full w-fit">
                      {feature.icon}
                    </div>
                    <CardTitle className="text-xl font-semibold">
                      {feature.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-center text-base leading-relaxed">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-gradient-to-r from-blue-50 to-purple-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">How It Works</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Simple steps to unlock your placement potential
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              {
                step: "01",
                title: "Create Your Profile",
                description:
                  "Upload your resume, academic details, and career preferences",
              },
              {
                step: "02",
                title: "AI Analysis",
                description:
                  "Our AI analyzes your profile against thousands of company requirements",
              },
              {
                step: "03",
                title: "Get Results",
                description:
                  "Receive personalized insights, company matches, and action plans",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="text-center"
              >
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full w-16 h-16 flex items-center justify-center text-2xl font-bold mx-auto mb-6">
                  {item.step}
                </div>
                <h3 className="text-xl font-semibold mb-4">{item.title}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">Success Stories</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Join thousands of students who achieved their placement goals
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="h-full bg-white/80 backdrop-blur-sm border-0 shadow-md hover:shadow-lg transition-shadow duration-300">
                  <CardContent className="p-6">
                    <div className="flex mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star
                          key={i}
                          className="h-5 w-5 text-yellow-400 fill-current"
                        />
                      ))}
                    </div>
                    <p className="text-muted-foreground mb-6 leading-relaxed">
                      &quot;{testimonial.content}&quot;
                    </p>
                    <div>
                      <div className="font-semibold">{testimonial.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {testimonial.role}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl font-bold mb-6">
              Ready to Transform Your Career?
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
              Join thousands of students who are already using Placify to
              achieve their placement goals.
            </p>
            <Button
              size="lg"
              onClick={onGetStarted}
              className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-6 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Start Your Journey
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-full p-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-white"
                  >
                    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
                    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-bold">Placify</h3>
              </div>
              <p className="text-gray-400 leading-relaxed">
                Your AI-powered placement readiness companion for career
                success.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <span className="cursor-default">Features</span>
                </li>
                <li>
                  <span className="cursor-default">Pricing</span>
                </li>
                <li>
                  <span className="cursor-default">API</span>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <span className="cursor-default">About</span>
                </li>
                <li>
                  <span className="cursor-default">Careers</span>
                </li>
                <li>
                  <span className="cursor-default">Contact</span>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <span className="cursor-default">Help Center</span>
                </li>
                <li>
                  <span className="cursor-default">Privacy Policy</span>
                </li>
                <li>
                  <span className="cursor-default">Terms of Service</span>
                </li>
              </ul>
            </div>
          </div>

          <Separator className="my-8 bg-gray-800" />

          <div className="text-center text-gray-400">
            <p>&copy; 2025 Placify. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
