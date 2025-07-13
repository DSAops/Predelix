import React, { useEffect, useState, useMemo } from 'react';
import { Footer } from './common/Footer';
import { motion } from 'motion/react';
import { 
  Truck, Package, Globe, BarChart2, Zap, Shield, Users, Target, Award, 
  Brain, TrendingUp, MapPin, Clock, CheckCircle, ArrowRight, Star,
  Code, Database, Cpu, Network, Lightbulb, Heart, Eye, Rocket
} from 'lucide-react';
import { SectionTransition } from '../components/PageTransition';
import { OptimizedCard } from '../components/OptimizedComponents';

// Enhanced floating elements for About page
const FloatingAboutElements = ({ scrollY }) => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
      {/* AI Brain Elements */}
      <motion.div 
        className="absolute top-20 left-10 w-16 h-16 bg-gradient-to-br from-purple-400/25 to-blue-500/25 rounded-xl shadow-lg flex items-center justify-center"
        animate={{ 
          y: [0, -10, 0],
          rotate: [0, 5, 0],
        }}
        transition={{ 
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        style={{ transform: `translateY(${scrollY * -0.2}px)` }}
      >
        <Brain className="w-8 h-8 text-purple-500/70 animate-pulse" />
      </motion.div>
      
      {/* Analytics Dashboard */}
      <motion.div 
        className="absolute top-32 right-16 w-12 h-12 bg-gradient-to-br from-cyan-400/25 to-blue-500/25 rounded-lg shadow-lg flex items-center justify-center"
        animate={{ 
          y: [0, 8, 0],
          rotate: [0, -3, 0],
        }}
        transition={{ 
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        style={{ transform: `translateY(${scrollY * -0.15}px)` }}
      >
        <BarChart2 className="w-6 h-6 text-cyan-500/70" />
      </motion.div>
      
      {/* Global Network */}
      <motion.div 
        className="absolute top-1/2 left-16 w-18 h-18 bg-gradient-to-br from-sky-400/25 to-cyan-500/25 rounded-2xl shadow-lg flex items-center justify-center"
        animate={{ 
          rotate: 360,
        }}
        transition={{ 
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
        style={{ transform: `translateY(${scrollY * -0.1}px)` }}
      >
        <Globe className="w-9 h-9 text-sky-500/70" />
      </motion.div>
      
      {/* Innovation Spark */}
      <motion.div 
        className="absolute bottom-32 right-12 w-10 h-10 bg-gradient-to-br from-yellow-400/25 to-orange-500/25 rounded-full shadow-lg flex items-center justify-center"
        animate={{ 
          scale: [1, 1.2, 1],
          rotate: [0, 180, 360],
        }}
        transition={{ 
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        style={{ transform: `translateY(${scrollY * -0.25}px)` }}
      >
        <Lightbulb className="w-5 h-5 text-yellow-500/70" />
      </motion.div>
      
      {/* Code Elements */}
      <motion.div 
        className="absolute bottom-20 left-1/4 w-8 h-8 bg-gradient-to-br from-green-400/25 to-emerald-500/25 rounded-md shadow-lg flex items-center justify-center"
        animate={{ 
          y: [0, -6, 0],
        }}
        transition={{ 
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        style={{ transform: `translateY(${scrollY * -0.18}px)` }}
      >
        <Code className="w-4 h-4 text-green-500/70" />
      </motion.div>
    </div>
  );
};

function About() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrollY(window.scrollY);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Company data
  const companyData = useMemo(() => ({
    founding: {
      year: "2024",
      mission: "To revolutionize global logistics through AI-powered intelligence",
      vision: "A world where every package reaches its destination efficiently, sustainably, and predictably"
    },
    technologies: [
      {
        icon: Brain,
        name: "AI & Machine Learning",
        description: "Advanced algorithms for demand forecasting and route optimization",
        color: "from-purple-500 to-indigo-600"
      },
      {
        icon: Database,
        name: "Data Analytics",
        description: "Processing and analyzing logistics data for actionable insights",
        color: "from-blue-500 to-cyan-600"
      },
      {
        icon: Network,
        name: "Smart Integration",
        description: "Seamless connectivity between different logistics systems",
        color: "from-green-500 to-emerald-600"
      },
      {
        icon: Cpu,
        name: "Modern Architecture",
        description: "Scalable cloud-based infrastructure for reliable operations",
        color: "from-orange-500 to-red-600"
      }
    ],
    features: [
      {
        icon: TrendingUp,
        title: "Predictive Analytics",
        description: "Forecast demand and optimize inventory using machine learning models to improve supply chain efficiency.",
        stats: "Smart Forecasting"
      },
      {
        icon: Truck,
        title: "Smart Delivery",
        description: "Automated call systems that streamline delivery coordination and improve customer communication.",
        stats: "Automated Calls"
      },
      {
        icon: MapPin,
        title: "Route Planning",
        description: "Intelligent route optimization to help reduce delivery times and operational costs.",
        stats: "Optimized Routes"
      },
      {
        icon: Clock,
        title: "Real-time Tracking",
        description: "Live visibility into shipments with instant updates and proactive problem resolution.",
        stats: "Live Updates"
      }
    ],
    team: [
      {
        name: "Devraj Patil",
        role: "Full Stack Developer",
        icon: Code,
        description: "UI/UX design and frontend designer"
      },
      {
        name: "Saksham Gupta",
        role: "Full Stack Developer",
        icon: Database,
        description: "Authentication Backend server and frontend developer"
      },
      {
        name: "Anuj Sahu",
        role: "Full Stack Developer",
        icon: Brain,
        description: "Backend Development machine learning implementation."
      },
    ],
    achievements: [
      { icon: Code, label: "Lines of Code", value: "10K+" },
      { icon: Users, label: "Development Hours", value: "500+" },
      { icon: Globe, label: "Project Status", value: "Beta" },
      { icon: Rocket, label: "Technologies Used", value: "8+" }
    ]
  }), []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-cyan-50 flex flex-col overflow-x-hidden">
      {/* Enhanced Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-cyan-50/30 to-white/80"></div>
        <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-gradient-to-br from-cyan-400/10 to-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/3 w-64 h-64 bg-gradient-to-br from-blue-400/10 to-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
      </div>
      
      <FloatingAboutElements scrollY={scrollY} />
      
      <div className="relative z-10 flex-1">
        {/* Hero Section */}
        <SectionTransition delay={0}>
          <section className="py-20 px-4">
            <div className="max-w-7xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="mb-8"
              >
                <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-3xl mb-6 shadow-2xl">
                  <Brain className="w-12 h-12 text-white" />
                </div>
                <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-cyan-600 via-blue-600 to-purple-600 bg-clip-text text-transparent mb-6">
                  About Predelix
                </h1>
                <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
                  We're pioneering the future of logistics with {' '}
                  <span className="text-cyan-600 font-bold">AI-powered intelligence</span>,
                  transforming how businesses predict, optimize, and deliver in the global supply chain.
                </p>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16"
              >
                {companyData.achievements.map((achievement, index) => (
                  <OptimizedCard key={index} className="p-6 text-center">
                    <achievement.icon className="w-8 h-8 text-cyan-500 mx-auto mb-3" />
                    <div className="text-2xl font-bold text-gray-800 mb-1">{achievement.value}</div>
                    <div className="text-sm text-gray-600">{achievement.label}</div>
                  </OptimizedCard>
                ))}
              </motion.div>
            </div>
          </section>
        </SectionTransition>

        {/* Mission & Vision Section */}
        <SectionTransition delay={0.2}>
          <section className="py-20 px-4">
            <div className="max-w-7xl mx-auto">
              <div className="grid md:grid-cols-2 gap-12">
                <OptimizedCard className="p-8">
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center mr-4">
                      <Target className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-800">Our Mission</h3>
                  </div>
                  <p className="text-gray-600 text-lg leading-relaxed">
                    {companyData.founding.mission}. We believe that intelligent automation 
                    and predictive analytics can solve the world's most complex logistics challenges.
                  </p>
                </OptimizedCard>
                
                <OptimizedCard className="p-8">
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl flex items-center justify-center mr-4">
                      <Eye className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-800">Our Vision</h3>
                  </div>
                  <p className="text-gray-600 text-lg leading-relaxed">
                    {companyData.founding.vision}. Through cutting-edge AI and data science, 
                    we're building the neural network of global commerce.
                  </p>
                </OptimizedCard>
              </div>
            </div>
          </section>
        </SectionTransition>

        {/* Technology Stack Section */}
        <SectionTransition delay={0.4}>
          <section className="py-20 px-4 bg-white/50">
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
                  Cutting-Edge Technology
                </h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  Our platform leverages the latest advances in artificial intelligence, 
                  machine learning, and cloud computing to deliver unprecedented logistics intelligence.
                </p>
              </div>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {companyData.technologies.map((tech, index) => (
                  <OptimizedCard key={index} className="p-6 text-center group">
                    <div className={`w-16 h-16 bg-gradient-to-br ${tech.color} rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                      <tech.icon className="w-8 h-8 text-white" />
                    </div>
                    <h4 className="text-xl font-bold text-gray-800 mb-3">{tech.name}</h4>
                    <p className="text-gray-600 text-sm leading-relaxed">{tech.description}</p>
                  </OptimizedCard>
                ))}
              </div>
            </div>
          </section>
        </SectionTransition>

        {/* Features Section */}
        <SectionTransition delay={0.6}>
          <section className="py-20 px-4">
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
                  What We Deliver
                </h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  Our AI-powered solutions transform every aspect of logistics operations, 
                  from demand forecasting to last-mile delivery optimization.
                </p>
              </div>
              
              <div className="grid md:grid-cols-2 gap-8">
                {companyData.features.map((feature, index) => (
                  <OptimizedCard key={index} className="p-8 group">
                    <div className="flex items-start">
                      <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center mr-6 group-hover:scale-110 transition-transform duration-300">
                        <feature.icon className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="text-xl font-bold text-gray-800">{feature.title}</h4>
                          <span className="text-sm font-bold text-cyan-600 bg-cyan-50 px-3 py-1 rounded-full">
                            {feature.stats}
                          </span>
                        </div>
                        <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                      </div>
                    </div>
                  </OptimizedCard>
                ))}
              </div>
            </div>
          </section>
        </SectionTransition>

        {/* Team Section */}
        <SectionTransition delay={0.8}>
          <section className="py-20 px-4 bg-gradient-to-br from-cyan-50/50 to-blue-50/50">
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
                  Meet Our Team
                </h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  A dedicated team of developers passionate about transforming logistics 
                  through innovative technology and smart solutions.
                </p>
              </div>
              
              <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                {companyData.team.map((member, index) => (
                  <OptimizedCard key={index} className="p-8 text-center">
                    <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                      <member.icon className="w-10 h-10 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">{member.name}</h3>
                    <div className="text-cyan-600 font-semibold mb-3">{member.role}</div>
                    <p className="text-gray-600 text-sm leading-relaxed">{member.description}</p>
                  </OptimizedCard>
                ))}
              </div>
            </div>
          </section>
        </SectionTransition>

        {/* CTA Section */}
        <SectionTransition delay={1}>
          <section className="py-20 px-4">
            <div className="max-w-4xl mx-auto text-center">
              <OptimizedCard className="p-12 bg-gradient-to-br from-cyan-500 to-blue-600 text-white">
                <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Rocket className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  Ready to Explore Our Platform?
                </h2>
                <p className="text-xl mb-8 text-cyan-50">
                  Experience how Predelix can help optimize your logistics operations with 
                  our AI-powered prediction and smart delivery solutions.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 py-4 bg-white text-cyan-600 rounded-xl font-bold hover:bg-gray-50 transition-colors duration-300 flex items-center justify-center"
                  >
                    Try Demo
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 py-4 border-2 border-white text-white rounded-xl font-bold hover:bg-white/10 transition-colors duration-300 flex items-center justify-center"
                  >
                    <Heart className="w-5 h-5 mr-2" />
                    Learn More
                  </motion.button>
                </div>
              </OptimizedCard>
            </div>
          </section>
        </SectionTransition>
      </div>
      
    </div>
  );
}

export default About;