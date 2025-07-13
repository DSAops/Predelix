import React, { useState, useEffect, useMemo } from 'react';
import { Phone, Clock, Users, TrendingUp, CheckCircle, XCircle, Activity, Target, Zap, Award, Calendar, BarChart3 } from 'lucide-react';

const SmartDropStatistics = ({ responses = [], csvData = null, callDone = false }) => {
  // Top-level robust guards for incoming props
  const safeResponses = Array.isArray(responses) ? responses : [];
  const safeCsvData = (csvData && typeof csvData === 'object' && Array.isArray(csvData?.rows)) ? csvData : { rows: [] };
  const [animatedStats, setAnimatedStats] = useState({
    totalCalls: 0,
    timesSaved: 0,
    successRate: 0,
    averageCallTime: 0
  });

  // Calculate statistics
  const statistics = useMemo(() => {
    const totalCalls = safeResponses.length;
    const successfulCalls = safeResponses.filter(r => r.delivery_status === 'confirmed' || r.delivery_status === 'delivered').length;
    const unsuccessfulCalls = safeResponses.filter(r => r.delivery_status === 'failed' || r.delivery_status === 'no_answer').length;
    const pendingCalls = safeResponses.filter(r => r.delivery_status === 'pending').length;
    const successRate = totalCalls > 0 ? Math.round((successfulCalls / totalCalls) * 100) : 0;
    // Estimate time saved (assuming each manual call takes 3-5 minutes)
    const averageManualCallTime = 4; // minutes
    const timesSaved = totalCalls * averageManualCallTime;
    // Calculate average call duration (if available in response data)
    const callsWithDuration = safeResponses.filter(r => r.call_duration);
    const averageCallTime = callsWithDuration.length > 0 
      ? Math.round(callsWithDuration.reduce((sum, r) => sum + (r.call_duration || 0), 0) / callsWithDuration.length)
      : 45; // Default estimate in seconds
    // Calculate productivity metrics
    const totalCustomers = safeCsvData?.rows?.length || 0;
    const completionRate = totalCustomers > 0 ? Math.round((totalCalls / totalCustomers) * 100) : 0;
    return {
      totalCalls,
      successfulCalls,
      unsuccessfulCalls,
      pendingCalls,
      successRate,
      timesSaved,
      averageCallTime,
      totalCustomers,
      completionRate
    };
  }, [safeResponses, safeCsvData]);

  // Animate numbers on component mount and when stats change
  useEffect(() => {
    const duration = 2000; // 2 seconds
    const steps = 60;
    const stepDuration = duration / steps;
    
    let step = 0;
    const interval = setInterval(() => {
      step++;
      const progress = step / steps;
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      
      setAnimatedStats({
        totalCalls: Math.round(statistics.totalCalls * easeOutQuart),
        timesSaved: Math.round(statistics.timesSaved * easeOutQuart),
        successRate: Math.round(statistics.successRate * easeOutQuart),
        averageCallTime: Math.round(statistics.averageCallTime * easeOutQuart)
      });
      
      if (step >= steps) {
        clearInterval(interval);
        setAnimatedStats({
          totalCalls: statistics.totalCalls,
          timesSaved: statistics.timesSaved,
          successRate: statistics.successRate,
          averageCallTime: statistics.averageCallTime
        });
      }
    }, stepDuration);
    
    return () => clearInterval(interval);
  }, [statistics]);

  const formatTime = (minutes) => {
    if (minutes < 60) return `${minutes}m`;
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed':
      case 'delivered':
        return 'text-green-600 bg-green-100';
      case 'failed':
      case 'no_answer':
        return 'text-red-600 bg-red-100';
      case 'pending':
        return 'text-yellow-600 bg-yellow-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const StatCard = ({ icon: Icon, title, value, subtitle, color, trend, badge }) => (
    <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200 hover:shadow-xl transition-all duration-300 transform hover:scale-105">
      <div className="flex items-center justify-between mb-4">
        <div className={`w-12 h-12 ${color} rounded-xl flex items-center justify-center`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
        {badge && (
          <div className="px-2 py-1 bg-gradient-to-r from-cyan-100 to-blue-100 text-cyan-700 text-xs font-medium rounded-full">
            {badge}
          </div>
        )}
      </div>
      <div className="mb-2">
        <div className="text-2xl font-bold text-gray-800 mb-1">{value}</div>
        <div className="text-sm text-gray-600">{title}</div>
      </div>
      {subtitle && (
        <div className="text-xs text-gray-500 flex items-center gap-1">
          {trend && <TrendingUp className="w-3 h-3 text-green-500" />}
          {subtitle}
        </div>
      )}
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Main Statistics Header */}
      <div className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-xl border border-cyan-200/50 p-8 animate-slideInUp">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center">
              <BarChart3 className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-sky-700">SmartDrop Impact</h3>
              <p className="text-sm text-sky-600">Real-time automation analytics</p>
            </div>
          </div>
          
          {callDone && (
            <div className="flex items-center gap-2 px-4 py-2 bg-green-100 text-green-700 rounded-lg">
              <CheckCircle className="w-4 h-4" />
              <span className="font-medium">Calls Completed</span>
            </div>
          )}
        </div>

        {/* Key Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            icon={Phone}
            title="Automated Calls Made"
            value={animatedStats.totalCalls.toLocaleString()}
            subtitle="Total delivery confirmations"
            color="bg-gradient-to-br from-cyan-500 to-blue-600"
            badge="Live"
          />
          
          <StatCard
            icon={Clock}
            title="Time Saved"
            value={formatTime(animatedStats.timesSaved)}
            subtitle="Manual work eliminated"
            color="bg-gradient-to-br from-green-500 to-emerald-600"
            trend={true}
          />
          
          <StatCard
            icon={Target}
            title="Success Rate"
            value={`${animatedStats.successRate}%`}
            subtitle="Successful confirmations"
            color="bg-gradient-to-br from-purple-500 to-indigo-600"
          />
          
          <StatCard
            icon={Activity}
            title="Avg Call Time"
            value={`${animatedStats.averageCallTime}s`}
            subtitle="Per delivery confirmation"
            color="bg-gradient-to-br from-orange-500 to-red-600"
          />
        </div>
      </div>

      {/* Detailed Breakdown */}
      {safeResponses.length > 0 && (
        <div className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-xl border border-cyan-200/50 p-8 animate-slideInUp animation-delay-200">
          <h4 className="text-xl font-bold text-sky-700 mb-6 flex items-center gap-2">
            <Users className="w-5 h-5" />
            Delivery Status Breakdown
          </h4>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border border-green-200">
              <div className="flex items-center gap-3 mb-3">
                <CheckCircle className="w-6 h-6 text-green-600" />
                <span className="font-semibold text-green-800">Successful</span>
              </div>
              <div className="text-2xl font-bold text-green-800 mb-1">
                {statistics.successfulCalls}
              </div>
              <div className="text-sm text-green-600">
                {statistics.totalCalls > 0 && `${Math.round((statistics.successfulCalls / statistics.totalCalls) * 100)}% of total`}
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-red-50 to-pink-50 rounded-xl p-6 border border-red-200">
              <div className="flex items-center gap-3 mb-3">
                <XCircle className="w-6 h-6 text-red-600" />
                <span className="font-semibold text-red-800">Unsuccessful</span>
              </div>
              <div className="text-2xl font-bold text-red-800 mb-1">
                {statistics.unsuccessfulCalls}
              </div>
              <div className="text-sm text-red-600">
                {statistics.totalCalls > 0 && `${Math.round((statistics.unsuccessfulCalls / statistics.totalCalls) * 100)}% of total`}
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-xl p-6 border border-yellow-200">
              <div className="flex items-center gap-3 mb-3">
                <Clock className="w-6 h-6 text-yellow-600" />
                <span className="font-semibold text-yellow-800">Pending</span>
              </div>
              <div className="text-2xl font-bold text-yellow-800 mb-1">
                {statistics.pendingCalls}
              </div>
              <div className="text-sm text-yellow-600">
                {statistics.totalCalls > 0 && `${Math.round((statistics.pendingCalls / statistics.totalCalls) * 100)}% of total`}
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mb-6">
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>Completion Progress</span>
              <span>{statistics.completionRate}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div 
                className="bg-gradient-to-r from-cyan-500 to-blue-600 h-3 rounded-full transition-all duration-1000 ease-out"
                style={{ width: `${statistics.completionRate}%` }}
              ></div>
            </div>
            <div className="text-xs text-gray-500 mt-1">
              {statistics.totalCalls} of {statistics.totalCustomers} customers contacted
            </div>
          </div>
        </div>
      )}

      {/* Recent Activity */}
      {safeResponses.length > 0 && (
        <div className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-xl border border-cyan-200/50 p-8 animate-slideInUp animation-delay-400">
          <h4 className="text-xl font-bold text-sky-700 mb-6 flex items-center gap-2">
            <Activity className="w-5 h-5" />
            Recent Call Activity
          </h4>
          
          <div className="space-y-3">
            {responses.slice(-5).reverse().map((response, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-cyan-100 rounded-full flex items-center justify-center">
                    <Phone className="w-4 h-4 text-cyan-600" />
                  </div>
                  <div>
                    <div className="font-medium text-gray-800">
                      {response.customer_name || response.name || 'Customer'}
                    </div>
                    <div className="text-sm text-gray-600">
                      {response.phone_number || response.phone || 'N/A'}
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(response.delivery_status)}`}>
                    {response.delivery_status || 'Unknown'}
                  </div>
                  {response.call_duration && (
                    <div className="text-xs text-gray-500">
                      {response.call_duration}s
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Productivity Insights */}
      <div className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-xl border border-cyan-200/50 p-8 animate-slideInUp animation-delay-600">
        <h4 className="text-xl font-bold text-sky-700 mb-6 flex items-center gap-2">
          <Award className="w-5 h-5" />
          Productivity Insights
        </h4>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-6 border border-blue-200">
            <div className="flex items-center gap-3 mb-4">
              <Zap className="w-6 h-6 text-blue-600" />
              <span className="font-semibold text-blue-800">Efficiency Gain</span>
            </div>
            <div className="text-3xl font-bold text-blue-800 mb-2">
              {statistics.timesSaved > 60 ? `${Math.round(statistics.timesSaved / 60)}x` : '1x'}
            </div>
            <div className="text-sm text-blue-600">
              Faster than manual calling
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-xl p-6 border border-purple-200">
            <div className="flex items-center gap-3 mb-4">
              <TrendingUp className="w-6 h-6 text-purple-600" />
              <span className="font-semibold text-purple-800">Cost Savings</span>
            </div>
            <div className="text-3xl font-bold text-purple-800 mb-2">
              ${Math.round(statistics.timesSaved * 0.5)}
            </div>
            <div className="text-sm text-purple-600">
              Estimated labor cost savings
            </div>
          </div>
        </div>
        
        <div className="mt-6 p-4 bg-gradient-to-r from-cyan-50 to-blue-50 rounded-lg border border-cyan-200">
          <p className="text-sm text-cyan-800 text-center">
            🎉 <strong>Great job!</strong> Your SmartDrop automation has saved {formatTime(statistics.timesSaved)} of manual work,
            allowing you to focus on more strategic tasks while maintaining excellent customer service.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SmartDropStatistics;
