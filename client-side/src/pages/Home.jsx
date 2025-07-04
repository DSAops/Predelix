
import { TextEffect } from '../../components/motion-primitives/text-effect';
import videoPreview from '../assets/video.mp4';
import { ArrowRight, BarChart2, Brain, Clock, Database, Store, TrendingUp } from 'lucide-react';
import { ParallaxProvider, Parallax, useParallax } from 'react-scroll-parallax';
import { useEffect, useState, useRef } from 'react';
import { Footer } from './common/Footer';

// Custom hook for counting up numbers with animation
const useCountUp = (end, duration = 2000) => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.5 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    const steps = 60;
    const increment = end / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [end, duration, isVisible]);

  return [count, elementRef];
};


function HomePage() {
  // Navbar height (px)
  const NAVBAR_HEIGHT = 66; // px (matches py-[13px] + 40px content)

  return (
    <ParallaxProvider>
      <div className="min-h-screen bg-white flex my-20 flex-col">
        <div
          className="flex-1 relative w-full flex flex-col items-center overflow-x-hidden px-2 md:px-8 pt-4 pb-8"
          style={{ paddingTop: NAVBAR_HEIGHT + 12 }}
        >

          {/* How We Help Section */}
          <div className="w-full max-w-7xl z-20 mb-24">
            <Parallax translateY={[20, -20]} opacity={[0.8, 1]} speed={5}>
              <h2 className="text-3xl md:text-4xl font-bold text-center text-purple-600 mb-12">
                Transforming Inventory Management
              </h2>
            </Parallax>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              {[
                {
                  icon: '🎯',
                  title: 'Precision Forecasting',
                  description: 'Our AI algorithms analyze historical data, market trends, and seasonal patterns to predict demand with unprecedented accuracy.'
                },
                {
                  icon: '⚡',
                  title: 'Real-time Optimization',
                  description: 'Continuous monitoring and adjustment of inventory levels across all your locations, ensuring optimal stock at all times.'
                },
                {
                  icon: '🤖',
                  title: 'Automated Decision Making',
                  description: 'Smart systems that automatically trigger reorders, adjust quantities, and optimize your supply chain operations.'
                }
              ].map((feature, i) => (
                <Parallax key={i} translateY={[40, -40]} scale={[0.8, 1]} opacity={[0.5, 1]}>
                  <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-8 border border-purple-200 shadow-lg h-full transform hover:scale-105 transition-transform duration-300">
                    <div className="text-4xl mb-4">{feature.icon}</div>
                    <h3 className="text-xl font-bold text-purple-600 mb-3">{feature.title}</h3>
                    <p className="text-zinc-600">{feature.description}</p>
                  </div>
                </Parallax>
              ))}
            </div>

            {/* Process Timeline */}
            <div className="relative mb-24">
              <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-purple-300 to-purple-100"></div>
              {[
                {
                  title: 'Data Integration',
                  description: 'Seamlessly connect your existing systems and start collecting valuable insights from day one.',
                  icon: '📊'
                },
                {
                  title: 'AI Training',
                  description: 'Our models learn your unique patterns and adapt to your business needs.',
                  icon: '🧠'
                },
                {
                  title: 'Optimization',
                  description: 'Continuous improvement and refinement of predictions based on real-world results.',
                  icon: '📈'
                }
              ].map((step, i) => (
                <div key={i} className="relative">
                  <Parallax 
                    translateX={i % 2 === 0 ? [-20, 0] : [20, 0]} 
                    opacity={[0, 1]}
                    speed={5}
                    easing="easeInOutQuad"
                    startScroll={-500}
                    shouldAlwaysCompleteAnimation={true}
                    className="relative"
                  >
                    <div 
                      className={`flex items-center mb-12 ${i % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}
                      style={{
                        transform: `translateX(${i % 2 === 0 ? '0' : '0'}%)`,
                        transition: 'transform 0.3s ease-out'
                      }}
                    >
                      <div className={`w-1/2 ${i % 2 === 0 ? 'pr-8 text-right' : 'pl-8'}`}>
                        <div className="bg-white/90 backdrop-blur-xl rounded-xl p-6 border border-purple-200 shadow-lg transform transition-all duration-500 hover:scale-105 hover:shadow-purple-200/50">
                          <div className="text-3xl mb-3">{step.icon}</div>
                          <h3 className="text-xl font-bold text-purple-600 mb-2">{step.title}</h3>
                          <p className="text-zinc-600">{step.description}</p>
                        </div>
                      </div>
                      <div 
                        className="relative w-10 h-10"
                      >
                        <div className="absolute inset-0 rounded-full bg-purple-600/20 animate-ping"></div>
                        <div className="absolute inset-0 rounded-full bg-purple-600 border-4 border-white shadow-lg z-10 transform transition-transform duration-500 hover:scale-110">
                        </div>
                      </div>
                      <div className="w-1/2"></div>
                    </div>
                  </Parallax>
                </div>
              ))}
            </div>
          </div>

          {/* Hero Section */}
          <main
            className="flex-1 flex flex-col items-center justify-center w-full z-20 mt-4 mb-8 px-4"
            style={{ minHeight: `calc(100vh - ${NAVBAR_HEIGHT + 32}px)` }}
      >
        <div className="bg-white backdrop-blur-2xl rounded-2xl shadow-lg p-8 md:p-12 border border-purple-200 relative mx-2 md:mx-0 mt-4 mb-4 w-full max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* Left Content */}
            <div className="text-left space-y-6">
              <Parallax translateY={[-20, 20]} opacity={[0.8, 1]} scale={[0.9, 1]}>
                <TextEffect per="char" preset="fade" className="text-4xl lg:text-5xl font-extrabold text-purple-600 mb-2 drop-shadow-lg leading-tight">
                  Intelligent Stock Prediction for Modern Retail
                </TextEffect>
              </Parallax>
              <h2 className="text-2xl font-semibold text-zinc-800 tracking-wide">
                Revolutionize Your Order Replenishment System
              </h2>
              <div className="space-y-4 text-zinc-600">
                <p className="text-lg leading-relaxed">
                  Predelix is an end-to-end solution that transforms how retailers manage their inventory. Our advanced AI-driven system predicts optimal stock levels for each store, ensuring you have the right products at the right time.
                </p>
                <div className="space-y-3">
                  <div className="flex items-start space-x-2">
                    <span className="text-purple-300 text-xl mt-1">•</span>
                    <p><span className="text-purple-300 font-semibold">Smart Predictions:</span> Leverage machine learning to forecast stock requirements based on historical data, seasonality, and local events.</p>
                  </div>
                  <div className="flex items-start space-x-2">
                    <span className="text-purple-300 text-xl mt-1">•</span>
                    <p><span className="text-purple-300 font-semibold">Real-time Analytics:</span> Monitor inventory levels, sales patterns, and prediction accuracy across all your locations.</p>
                  </div>
                  <div className="flex items-start space-x-2">
                    <span className="text-purple-300 text-xl mt-1">•</span>
                    <p><span className="text-purple-300 font-semibold">Automated Ordering:</span> Set up intelligent reorder points and let the system handle routine replenishment tasks.</p>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-4 pt-4">
                <button className="px-8 py-3 rounded-lg bg-gradient-to-r from-purple-700 via-purple-600 to-purple-300 text-white font-bold shadow-lg border border-purple-700/60 transition hover:scale-105 hover:from-purple-800 hover:to-purple-400">
                  Get Started
                </button>
                <button className="px-6 py-3 rounded-lg bg-white text-purple-600 font-semibold border border-purple-200 transition hover:bg-purple-50">
                  View Demo
                </button>
              </div>
            </div>
            
            {/* Right Floating Devices Display */}
            <div className="relative h-[500px] flex items-center justify-center">
              {/* Background Glow Effect */}
              <Parallax translateY={[20, -20]} scale={[0.9, 1.1]} rotate={[0, 10]} className="absolute inset-0">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-purple-300/5 blur-3xl transform rotate-12" />
              </Parallax>

              {/* Floating Laptops Layer 1 - Background */}
              <Parallax translateY={[15, -15]} scale={[0.85, 1]} rotate={[-5, 5]} className="absolute w-full h-full">
                <div className="absolute top-[20%] -left-[5%] w-72 h-48 rounded-xl overflow-hidden shadow-2xl transform -rotate-12">
                  <img 
                    src="https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&w=800&q=80" 
                    alt="Analytics Dashboard"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-purple-600/20 to-transparent" />
                </div>
              </Parallax>

              {/* Floating Laptops Layer 2 - Middle Ground */}
              <Parallax translateY={[-20, 20]} scale={[0.9, 1.1]} rotate={[0, -8]} className="absolute w-full h-full">
                <div className="absolute top-[30%] left-[20%] w-80 h-52 rounded-xl overflow-hidden shadow-2xl transform rotate-6">
                  <img 
                    src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80" 
                    alt="Inventory Dashboard"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-purple-600/10 to-transparent" />
                </div>
              </Parallax>

              {/* Main Display - Foreground */}
              <Parallax translateY={[-5, 5]} scale={[0.95, 1.05]} rotate={[2, -2]} className="relative w-96 z-10">
                <div className="relative rounded-xl overflow-hidden shadow-2xl border-2 border-purple-200/50 bg-white backdrop-blur-xl">
                  <img 
                    src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80" 
                    alt="AI Predictions"
                    className="w-full aspect-[4/3] object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-purple-900/20 via-purple-900/5 to-transparent" />
                  
                  {/* Floating Stats Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Parallax translateY={[-15, 15]} className="bg-white/90 backdrop-blur-md rounded-xl p-4 shadow-xl border border-purple-200">
                      <div className="text-purple-600 font-semibold">Accuracy Improvement</div>
                      <div className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-purple-400 bg-clip-text text-transparent">
                        +42%
                      </div>
                      <div className="text-purple-500 text-sm">Stock Prediction</div>
                    </Parallax>
                  </div>
                </div>

                {/* Floating Feature Cards */}
                <Parallax translateX={[-20, 20]} className="absolute -left-24 top-1/4">
                  <div className="bg-white/80 backdrop-blur-md rounded-lg p-3 shadow-lg border border-purple-200">
                    <div className="text-purple-600 text-sm font-medium">Real-time Analytics</div>
                  </div>
                </Parallax>

                <Parallax translateX={[20, -20]} className="absolute -right-20 top-2/3">
                  <div className="bg-white/80 backdrop-blur-md rounded-lg p-3 shadow-lg border border-purple-200">
                    <div className="text-purple-600 text-sm font-medium">Smart Predictions</div>
                  </div>
                </Parallax>
              </Parallax>
            </div>
          </div>
        </div>          {/* Features Section */}
        <div className="w-full max-w-7xl mt-16 space-y-24">
          {/* How It Works */}
          <section className="relative">
            <Parallax translateY={[20, -20]} className="absolute inset-0">
              <div className="absolute inset-0 bg-gradient-to-b from-purple-50/50 to-transparent rounded-3xl"></div>
            </Parallax>
            
            <div className="relative bg-white/80 backdrop-blur-2xl rounded-3xl shadow-lg p-8 md:p-12 border border-purple-200">
              <Parallax translateY={[15, -15]} opacity={[0.8, 1]}>
                <h2 className="text-4xl font-bold text-purple-600 mb-12 text-center">How Predelix Works</h2>
              </Parallax>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                {[
                  {
                    icon: Database,
                    title: "1. Smart Data Collection",
                    description: "Our system intelligently gathers and processes data from multiple sources:",
                    features: [
                      "Historical sales patterns",
                      "Seasonal trends analysis",
                      "Market event correlation",
                      "Weather impact tracking",
                      "Competition monitoring"
                    ]
                  },
                  {
                    icon: Brain,
                    title: "2. Advanced AI Analysis",
                    description: "State-of-the-art machine learning models provide deep insights:",
                    features: [
                      "Pattern recognition",
                      "Demand forecasting",
                      "Anomaly detection",
                      "Trend prediction",
                      "Risk assessment"
                    ]
                  },
                  {
                    icon: Store,
                    title: "3. Intelligent Automation",
                    description: "Streamlined operations with smart automation:",
                    features: [
                      "Automated ordering",
                      "Dynamic pricing",
                      "Stock optimization",
                      "Supply chain efficiency",
                      "Real-time adjustments"
                    ]
                  }
                ].map((feature, i) => (
                  <Parallax key={i} translateY={[30, -30]} scale={[0.95, 1]} opacity={[0.5, 1]}>
                    <div className="space-y-6 p-6 rounded-2xl bg-white/50 backdrop-blur-sm border border-purple-100 shadow-lg">
                      <div className="h-16 w-16 rounded-xl bg-gradient-to-br from-purple-500 to-purple-400 flex items-center justify-center shadow-lg">
                        <feature.icon className="h-8 w-8 text-white" />
                      </div>
                      <h3 className="text-2xl font-bold text-purple-600">{feature.title}</h3>
                      <p className="text-zinc-600 leading-relaxed">{feature.description}</p>
                      <ul className="space-y-3">
                        {feature.features.map((item, j) => (
                          <li key={j} className="flex items-center space-x-2">
                            <div className="h-1.5 w-1.5 rounded-full bg-purple-400"></div>
                            <span className="text-zinc-600">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </Parallax>
                ))}
              </div>
            </div>
          </section>

          {/* Key Benefits */}
          <section className="relative bg-gradient-to-br from-purple-50/50 to-white rounded-3xl shadow-lg p-8 md:p-12 border border-purple-200">
            <Parallax translateY={[15, -15]} opacity={[0.8, 1]}>
              <h2 className="text-4xl font-bold text-purple-600 mb-12 text-center">Key Benefits</h2>
            </Parallax>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  icon: TrendingUp,
                  title: "Revenue Growth",
                  description: "Maximize sales opportunities with optimal inventory levels and dynamic pricing strategies.",
                  stats: ["+32% Revenue", "+28% Profit Margin"]
                },
                {
                  icon: Clock,
                  title: "Efficiency Boost",
                  description: "Streamline operations and reduce manual workload through intelligent automation.",
                  stats: ["85% Time Saved", "60% Less Manual Work"]
                },
                {
                  icon: BarChart2,
                  title: "Data-Driven Insights",
                  description: "Make informed decisions with real-time analytics and predictive modeling.",
                  stats: ["99% Accuracy", "42% Better Predictions"]
                },
                {
                  icon: Brain,
                  title: "Smart Optimization",
                  description: "Self-learning systems that continuously improve and adapt to your business.",
                  stats: ["24/7 Learning", "Auto-Adjusting"]
                },
                {
                  icon: Store,
                  title: "Stock Precision",
                  description: "Maintain optimal inventory levels across all locations automatically.",
                  stats: ["-40% Stockouts", "-35% Overstocking"]
                },
                {
                  icon: Database,
                  title: "Unified Platform",
                  description: "Centralized control and visibility across your entire operation.",
                  stats: ["Real-time Updates", "Full Integration"]
                }
              ].map((benefit, i) => (
                <Parallax key={i} translateY={[20, -20]} scale={[0.95, 1]} opacity={[0.7, 1]}>
                  <div className="bg-white/80 backdrop-blur-xl rounded-xl p-6 border border-purple-200 shadow-lg h-full transform hover:scale-105 transition-all duration-300">
                    <div className="flex items-start space-x-4">
                      <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-purple-500 to-purple-400 flex items-center justify-center shadow-lg flex-shrink-0">
                        <benefit.icon className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-purple-600 mb-2">{benefit.title}</h3>
                        <p className="text-zinc-600 mb-4">{benefit.description}</p>
                        <div className="flex flex-wrap gap-2">
                          {benefit.stats.map((stat, j) => (
                            <span key={j} className="px-3 py-1 bg-purple-50 text-purple-600 rounded-full text-sm font-medium">
                              {stat}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </Parallax>
              ))}
            </div>
          </section>

          {/* Call to Action */}
          <section className="bg-gradient-to-r from-purple-100 to-white backdrop-blur-2xl rounded-2xl shadow-lg p-8 md:p-12 border border-purple-200">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              <div>
                <h2 className="text-3xl font-bold text-purple-600 mb-4">Ready to Transform Your Inventory Management?</h2>
                <p className="text-lg text-zinc-600">Join leading retailers who have improved their stock accuracy by up to 42%.</p>
              </div>
              <button className="flex items-center space-x-2 px-8 py-4 rounded-lg bg-purple-500 text-white font-bold shadow-lg transition hover:bg-purple-600 hover:scale-105">
                <span>Schedule a Demo</span>
                <ArrowRight className="h-5 w-5" />
              </button>
            </div>
          </section>
        </div>
      </main>

      {/* Creative CSS Animations */}
      <style>{`
        @keyframes float1 { 0% { transform: translateY(0); } 50% { transform: translateY(-18px); } 100% { transform: translateY(0); } }
        @keyframes float2 { 0% { transform: translateY(0); } 50% { transform: translateY(12px); } 100% { transform: translateY(0); } }
        @keyframes float3 { 0% { transform: translateY(0); } 50% { transform: translateY(-8px); } 100% { transform: translateY(0); } }
        .animate-float1 { animation: float1 6s ease-in-out infinite; }
        .animate-float2 { animation: float2 8s ease-in-out infinite; }
        .animate-float3 { animation: float3 7s ease-in-out infinite; }
        
        /* Make navbar overlay only after scroll */
        body:not(.scrolled) .navbar-overlay {
          box-shadow: none !important;
          background: transparent !important;
        }

        /* Smooth scrolling for the entire page */
        html {
          scroll-behavior: smooth;
        }

        /* Custom scrolling behavior */
        body {
          scroll-behavior: smooth;
          -webkit-overflow-scrolling: touch;
        }

        /* Enhanced smooth scroll with custom timing function */
        * {
          scroll-behavior: smooth;
          scroll-timeline: none;
          scroll-snap-type: none;
        }

        @media (prefers-reduced-motion: no-preference) {
          html {
            scroll-behavior: smooth;
            --scroll-timeline: scroll;
            --scroll-timing-function: cubic-bezier(0.45, 0.05, 0.35, 1);
          }
          
          body {
            transition: transform 0.8s var(--scroll-timing-function);
          }
        }
      `}</style>
        </div>
        <Footer />
      </div>
    </ParallaxProvider>
  );
}

export default HomePage;