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
        name: "Big Data Analytics",
        description: "Processing millions of data points for intelligent insights",
        color: "from-blue-500 to-cyan-600"
      },
      {
        icon: Network,
        name: "IoT Integration",
        description: "Real-time tracking and monitoring across the supply chain",
        color: "from-green-500 to-emerald-600"
      },
      {
        icon: Cpu,
        name: "Cloud Computing",
        description: "Scalable infrastructure for global logistics operations",
        color: "from-orange-500 to-red-600"
      }
    ],
    features: [
      {
        icon: TrendingUp,
        title: "Predictive Analytics",
        description: "Forecast demand and optimize inventory with 95% accuracy using advanced machine learning models.",
        stats: "95% Accuracy"
      },
      {
        icon: Truck,
        title: "Smart Delivery",
        description: "Automated call systems that reduce manual effort by 80% and increase delivery success rates.",
        stats: "80% Time Saved"
      },
      {
        icon: MapPin,
        title: "Route Optimization",
        description: "AI-powered route planning that reduces fuel costs and delivery times by up to 40%.",
        stats: "40% Cost Reduction"
      },
      {
        icon: Clock,
        title: "Real-time Tracking",
        description: "Live visibility into every shipment with instant updates and proactive problem resolution.",
        stats: "100% Visibility"
      }
    ],
    team: [
      {
        role: "AI Engineers",
        count: 15,
        icon: Brain,
        description: "Machine learning experts building the future of logistics intelligence"
      },
      {
        role: "Logistics Specialists",
        count: 12,
        icon: Truck,
        description: "Industry veterans optimizing supply chain operations"
      },
      {
        role: "Data Scientists",
        count: 8,
        icon: BarChart2,
        description: "Analytics experts turning data into actionable insights"
      },
      {
        role: "DevOps Engineers",
        count: 6,
        icon: Code,
        description: "Infrastructure specialists ensuring scalable, reliable systems"
      }
    ],
    achievements: [
      { icon: Award, label: "AI Innovation Award 2024", value: "Winner" },
      { icon: Star, label: "Customer Satisfaction", value: "98%" },
      { icon: Globe, label: "Countries Served", value: "25+" },
      { icon: Package, label: "Packages Optimized", value: "10M+" }
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
                  Our Expert Team
                </h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  A diverse group of AI specialists, logistics experts, and engineers 
                  working together to revolutionize global supply chains.
                </p>
              </div>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {companyData.team.map((role, index) => (
                  <OptimizedCard key={index} className="p-6 text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <role.icon className="w-8 h-8 text-white" />
                    </div>
                    <div className="text-3xl font-bold text-gray-800 mb-2">{role.count}+</div>
                    <h4 className="text-lg font-bold text-gray-800 mb-2">{role.role}</h4>
                    <p className="text-gray-600 text-sm leading-relaxed">{role.description}</p>
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
                  Ready to Transform Your Logistics?
                </h2>
                <p className="text-xl mb-8 text-cyan-50">
                  Join thousands of businesses already using Predelix to optimize their supply chains 
                  and deliver exceptional customer experiences.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 py-4 bg-white text-cyan-600 rounded-xl font-bold hover:bg-gray-50 transition-colors duration-300 flex items-center justify-center"
                  >
                    Get Started Today
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 py-4 border-2 border-white text-white rounded-xl font-bold hover:bg-white/10 transition-colors duration-300 flex items-center justify-center"
                  >
                    <Heart className="w-5 h-5 mr-2" />
                    Contact Our Team
                  </motion.button>
                </div>
              </OptimizedCard>
            </div>
          </section>
        </SectionTransition>
      </div>
      
      <Footer />
    </div>
  );
}

export default About;