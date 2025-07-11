import React, { useState, useEffect, useMemo } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Legend, PieChart, Pie, Cell, AreaChart, Area } from 'recharts';
import { 
  TrendingUp, TrendingDown, Target, Activity, BarChart3, PieChart as PieChartIcon, 
  Calendar, Store, Package, Users, Award, Zap, Clock, CheckCircle, XCircle, 
  AlertTriangle, Eye, Filter, RefreshCw, Download, ArrowUp, ArrowDown, 
  DollarSign, ShoppingCart, Truck, Brain, Star, ThumbsUp, ThumbsDown
} from 'lucide-react';

const PredictionDashboard = ({ predictions = [], feedbackData = [] }) => {
  const [selectedTimeRange, setSelectedTimeRange] = useState('7d'); // 7d, 30d, 90d, all
  const [selectedMetric, setSelectedMetric] = useState('accuracy'); // accuracy, volume, trends
  const [refreshing, setRefreshing] = useState(false);

  // Filter data based on time range
  const filteredPredictions = useMemo(() => {
    if (!predictions || predictions.length === 0) return [];
    
    const now = new Date();
    let startDate = new Date();
    
    switch (selectedTimeRange) {
      case '7d':
        startDate.setDate(now.getDate() - 7);
        break;
      case '30d':
        startDate.setDate(now.getDate() - 30);
        break;
      case '90d':
        startDate.setDate(now.getDate() - 90);
        break;
      default:
        return predictions;
    }
    
    return predictions.filter(pred => {
      const predDate = new Date(pred.date);
      return predDate >= startDate && predDate <= now;
    });
  }, [predictions, selectedTimeRange]);

  // Calculate key metrics
  const metrics = useMemo(() => {
    if (!filteredPredictions || filteredPredictions.length === 0) {
      return {
        totalPredictions: 0,
        averageAccuracy: 0,
        totalStores: 0,
        totalProducts: 0,
        predictedValue: 0,
        actualValue: 0,
        accuracyTrend: 0,
        volumeTrend: 0
      };
    }

    const totalPredictions = filteredPredictions.length;
    const stores = new Set(filteredPredictions.map(p => p.store_id)).size;
    const products = new Set(filteredPredictions.map(p => p.product_id)).size;
    
    let accuracySum = 0;
    let validComparisons = 0;
    let totalPredictedValue = 0;
    let totalActualValue = 0;

    filteredPredictions.forEach(pred => {
      const predicted = parseFloat(pred.predicted_stock || 0);
      const actual = parseFloat(pred.actual_stock || pred.actual_sales || 0);
      
      totalPredictedValue += predicted;
      totalActualValue += actual;
      
      if (predicted > 0 && actual > 0) {
        const difference = Math.abs(predicted - actual);
        const average = (predicted + actual) / 2;
        const accuracy = Math.max(0, 100 - (difference / average) * 100);
        accuracySum += accuracy;
        validComparisons++;
      }
    });

    // Calculate trends (comparing to previous period)
    const previousPeriodStart = new Date();
    const currentPeriodStart = new Date();
    
    switch (selectedTimeRange) {
      case '7d':
        previousPeriodStart.setDate(previousPeriodStart.getDate() - 14);
        currentPeriodStart.setDate(currentPeriodStart.getDate() - 7);
        break;
      case '30d':
        previousPeriodStart.setDate(previousPeriodStart.getDate() - 60);
        currentPeriodStart.setDate(currentPeriodStart.getDate() - 30);
        break;
      case '90d':
        previousPeriodStart.setDate(previousPeriodStart.getDate() - 180);
        currentPeriodStart.setDate(currentPeriodStart.getDate() - 90);
        break;
      default:
        previousPeriodStart.setDate(previousPeriodStart.getDate() - 30);
        currentPeriodStart.setDate(currentPeriodStart.getDate() - 15);
    }

    const previousPredictions = predictions.filter(pred => {
      const predDate = new Date(pred.date);
      return predDate >= previousPeriodStart && predDate < currentPeriodStart;
    });

    const currentAccuracy = validComparisons > 0 ? accuracySum / validComparisons : 0;
    const previousAccuracy = previousPredictions.length > 0 ? 
      previousPredictions.reduce((sum, pred) => {
        const predicted = parseFloat(pred.predicted_stock || 0);
        const actual = parseFloat(pred.actual_stock || pred.actual_sales || 0);
        if (predicted > 0 && actual > 0) {
          const difference = Math.abs(predicted - actual);
          const average = (predicted + actual) / 2;
          return sum + Math.max(0, 100 - (difference / average) * 100);
        }
        return sum;
      }, 0) / previousPredictions.filter(pred => 
        parseFloat(pred.predicted_stock || 0) > 0 && 
        parseFloat(pred.actual_stock || pred.actual_sales || 0) > 0
      ).length : 0;

    return {
      totalPredictions,
      averageAccuracy: Math.round(currentAccuracy),
      totalStores: stores,
      totalProducts: products,
      predictedValue: Math.round(totalPredictedValue),
      actualValue: Math.round(totalActualValue),
      accuracyTrend: Math.round(currentAccuracy - previousAccuracy),
      volumeTrend: Math.round(((totalPredictions - previousPredictions.length) / Math.max(previousPredictions.length, 1)) * 100)
    };
  }, [filteredPredictions, predictions, selectedTimeRange]);

  // Prepare chart data
  const chartData = useMemo(() => {
    if (!filteredPredictions || filteredPredictions.length === 0) return [];

    // Group by date
    const dateGroups = filteredPredictions.reduce((acc, pred) => {
      const date = pred.date;
      if (!acc[date]) {
        acc[date] = {
          date,
          predicted: 0,
          actual: 0,
          count: 0,
          accuracy: 0,
          validAccuracy: 0
        };
      }
      
      const predicted = parseFloat(pred.predicted_stock || 0);
      const actual = parseFloat(pred.actual_stock || pred.actual_sales || 0);
      
      acc[date].predicted += predicted;
      acc[date].actual += actual;
      acc[date].count++;
      
      if (predicted > 0 && actual > 0) {
        const difference = Math.abs(predicted - actual);
        const average = (predicted + actual) / 2;
        const accuracy = Math.max(0, 100 - (difference / average) * 100);
        acc[date].accuracy += accuracy;
        acc[date].validAccuracy++;
      }
      
      return acc;
    }, {});

    return Object.values(dateGroups)
      .map(group => ({
        ...group,
        predicted: Math.round(group.predicted / group.count),
        actual: Math.round(group.actual / group.count),
        accuracy: group.validAccuracy > 0 ? Math.round(group.accuracy / group.validAccuracy) : 0
      }))
      .sort((a, b) => new Date(a.date) - new Date(b.date));
  }, [filteredPredictions]);

  // Store performance data
  const storePerformance = useMemo(() => {
    if (!filteredPredictions || filteredPredictions.length === 0) return [];

    const storeGroups = filteredPredictions.reduce((acc, pred) => {
      const storeId = pred.store_id;
      if (!acc[storeId]) {
        acc[storeId] = {
          storeId,
          predictions: 0,
          totalAccuracy: 0,
          validComparisons: 0,
          totalPredicted: 0,
          totalActual: 0
        };
      }
      
      const predicted = parseFloat(pred.predicted_stock || 0);
      const actual = parseFloat(pred.actual_stock || pred.actual_sales || 0);
      
      acc[storeId].predictions++;
      acc[storeId].totalPredicted += predicted;
      acc[storeId].totalActual += actual;
      
      if (predicted > 0 && actual > 0) {
        const difference = Math.abs(predicted - actual);
        const average = (predicted + actual) / 2;
        const accuracy = Math.max(0, 100 - (difference / average) * 100);
        acc[storeId].totalAccuracy += accuracy;
        acc[storeId].validComparisons++;
      }
      
      return acc;
    }, {});

    return Object.values(storeGroups)
      .map(store => ({
        ...store,
        accuracy: store.validComparisons > 0 ? Math.round(store.totalAccuracy / store.validComparisons) : 0
      }))
      .sort((a, b) => b.accuracy - a.accuracy)
      .slice(0, 10); // Top 10 stores
  }, [filteredPredictions]);

  // Accuracy distribution
  const accuracyDistribution = useMemo(() => {
    if (!filteredPredictions || filteredPredictions.length === 0) return [];

    const ranges = {
      'Excellent (90-100%)': 0,
      'Good (75-89%)': 0,
      'Fair (60-74%)': 0,
      'Poor (<60%)': 0
    };

    filteredPredictions.forEach(pred => {
      const predicted = parseFloat(pred.predicted_stock || 0);
      const actual = parseFloat(pred.actual_stock || pred.actual_sales || 0);
      
      if (predicted > 0 && actual > 0) {
        const difference = Math.abs(predicted - actual);
        const average = (predicted + actual) / 2;
        const accuracy = Math.max(0, 100 - (difference / average) * 100);
        
        if (accuracy >= 90) ranges['Excellent (90-100%)']++;
        else if (accuracy >= 75) ranges['Good (75-89%)']++;
        else if (accuracy >= 60) ranges['Fair (60-74%)']++;
        else ranges['Poor (<60%)']++;
      }
    });

    return Object.entries(ranges).map(([name, value]) => ({
      name,
      value,
      percentage: Math.round((value / filteredPredictions.length) * 100)
    }));
  }, [filteredPredictions]);

  // Feedback summary
  const feedbackSummary = useMemo(() => {
    const total = feedbackData.length;
    const accurate = feedbackData.filter(f => f.feedback === 'accurate').length;
    const inaccurate = feedbackData.filter(f => f.feedback === 'inaccurate').length;
    
    return {
      total,
      accurate,
      inaccurate,
      accuratePercentage: total > 0 ? Math.round((accurate / total) * 100) : 0
    };
  }, [feedbackData]);

  const handleRefresh = async () => {
    setRefreshing(true);
    // Simulate refresh delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    setRefreshing(false);
  };

  const MetricCard = ({ title, value, subtitle, icon: Icon, trend, color = "blue", onClick }) => (
    <div 
      className={`bg-white rounded-xl shadow-lg p-6 border border-gray-200 hover:shadow-xl transition-all duration-300 transform hover:scale-105 ${onClick ? 'cursor-pointer' : ''}`}
      onClick={onClick}
    >
      <div className="flex items-center justify-between mb-4">
        <div className={`w-12 h-12 bg-gradient-to-br from-${color}-500 to-${color}-600 rounded-xl flex items-center justify-center`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
        {trend !== undefined && (
          <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
            trend > 0 ? 'bg-green-100 text-green-700' : 
            trend < 0 ? 'bg-red-100 text-red-700' : 
            'bg-gray-100 text-gray-700'
          }`}>
            {trend > 0 ? <ArrowUp className="w-3 h-3" /> : 
             trend < 0 ? <ArrowDown className="w-3 h-3" /> : null}
            {Math.abs(trend)}%
          </div>
        )}
      </div>
      <div className="mb-2">
        <div className="text-2xl font-bold text-gray-800 mb-1">{value}</div>
        <div className="text-sm text-gray-600">{title}</div>
      </div>
      {subtitle && (
        <div className="text-xs text-gray-500">{subtitle}</div>
      )}
    </div>
  );

  const COLORS = ['#06b6d4', '#10b981', '#f59e0b', '#ef4444'];

  return (
    <div className="space-y-6">
      {/* Dashboard Header */}
      <div className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-xl border border-cyan-200/50 p-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center">
              <BarChart3 className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-sky-700">Prediction Dashboard</h2>
              <p className="text-sm text-sky-600">Comprehensive analytics and insights</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            {/* Time Range Selector */}
            <select
              value={selectedTimeRange}
              onChange={(e) => setSelectedTimeRange(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
            >
              <option value="7d">Last 7 days</option>
              <option value="30d">Last 30 days</option>
              <option value="90d">Last 90 days</option>
              <option value="all">All time</option>
            </select>
            
            {/* Refresh Button */}
            <button
              onClick={handleRefresh}
              disabled={refreshing}
              className="flex items-center gap-2 px-4 py-2 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 transition-colors duration-200 disabled:opacity-50"
            >
              <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
              Refresh
            </button>
          </div>
        </div>

        {/* Key Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <MetricCard
            icon={Target}
            title="Average Accuracy"
            value={`${metrics.averageAccuracy}%`}
            subtitle="Prediction vs actual performance"
            trend={metrics.accuracyTrend}
            color="green"
          />
          
          <MetricCard
            icon={BarChart3}
            title="Total Predictions"
            value={metrics.totalPredictions.toLocaleString()}
            subtitle={`${selectedTimeRange === 'all' ? 'All time' : `Last ${selectedTimeRange}`}`}
            trend={metrics.volumeTrend}
            color="blue"
          />
          
          <MetricCard
            icon={Store}
            title="Active Stores"
            value={metrics.totalStores}
            subtitle="Stores with predictions"
            color="purple"
          />
          
          <MetricCard
            icon={Package}
            title="Products Tracked"
            value={metrics.totalProducts}
            subtitle="Unique products predicted"
            color="orange"
          />
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Accuracy Trend Chart */}
        <div className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-xl border border-cyan-200/50 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-sky-700">Accuracy Trend</h3>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-cyan-500 rounded-full"></div>
              <span className="text-sm text-gray-600">Daily Average</span>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e0e7ff" />
              <XAxis dataKey="date" stroke="#64748b" />
              <YAxis stroke="#64748b" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: '1px solid #e0e7ff', 
                  borderRadius: '8px' 
                }}
              />
              <Line 
                type="monotone" 
                dataKey="accuracy" 
                stroke="#06b6d4" 
                strokeWidth={3}
                dot={{ fill: '#06b6d4', strokeWidth: 2, r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Predicted vs Actual Chart */}
        <div className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-xl border border-cyan-200/50 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-sky-700">Predicted vs Actual</h3>
            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-cyan-500 rounded-full"></div>
                <span className="text-gray-600">Predicted</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-gray-600">Actual</span>
              </div>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e0e7ff" />
              <XAxis dataKey="date" stroke="#64748b" />
              <YAxis stroke="#64748b" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: '1px solid #e0e7ff', 
                  borderRadius: '8px' 
                }}
              />
              <Area 
                type="monotone" 
                dataKey="predicted" 
                stackId="1"
                stroke="#06b6d4" 
                fill="#06b6d4" 
                fillOpacity={0.3}
              />
              <Area 
                type="monotone" 
                dataKey="actual" 
                stackId="2"
                stroke="#10b981" 
                fill="#10b981" 
                fillOpacity={0.3}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Additional Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Accuracy Distribution */}
        <div className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-xl border border-cyan-200/50 p-6">
          <h3 className="text-xl font-bold text-sky-700 mb-6">Accuracy Distribution</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={accuracyDistribution}
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percentage }) => `${percentage}%`}
              >
                {accuracyDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-4 space-y-2">
            {accuracyDistribution.map((item, index) => (
              <div key={item.name} className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: COLORS[index % COLORS.length] }}
                  ></div>
                  <span className="text-gray-600">{item.name}</span>
                </div>
                <span className="font-medium">{item.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Top Performing Stores */}
        <div className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-xl border border-cyan-200/50 p-6">
          <h3 className="text-xl font-bold text-sky-700 mb-6">Top Performing Stores</h3>
          <div className="space-y-4">
            {storePerformance.slice(0, 5).map((store, index) => (
              <div key={store.storeId} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                    index === 0 ? 'bg-yellow-100 text-yellow-800' :
                    index === 1 ? 'bg-gray-100 text-gray-800' :
                    index === 2 ? 'bg-orange-100 text-orange-800' :
                    'bg-blue-100 text-blue-800'
                  }`}>
                    {index + 1}
                  </div>
                  <div>
                    <div className="font-medium">Store {store.storeId}</div>
                    <div className="text-sm text-gray-600">{store.predictions} predictions</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-green-600">{store.accuracy}%</div>
                  <div className="text-xs text-gray-500">accuracy</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* User Feedback Summary */}
        <div className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-xl border border-cyan-200/50 p-6">
          <h3 className="text-xl font-bold text-sky-700 mb-6">User Feedback</h3>
          <div className="space-y-4">
            <div className="text-center p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg">
              <div className="text-3xl font-bold text-green-600 mb-1">
                {feedbackSummary.accuratePercentage}%
              </div>
              <div className="text-sm text-green-700">User Satisfaction</div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                <ThumbsUp className="w-5 h-5 text-green-600" />
                <div>
                  <div className="font-bold text-green-800">{feedbackSummary.accurate}</div>
                  <div className="text-xs text-green-600">Accurate</div>
                </div>
              </div>
              
              <div className="flex items-center gap-3 p-3 bg-red-50 rounded-lg">
                <ThumbsDown className="w-5 h-5 text-red-600" />
                <div>
                  <div className="font-bold text-red-800">{feedbackSummary.inaccurate}</div>
                  <div className="text-xs text-red-600">Inaccurate</div>
                </div>
              </div>
            </div>
            
            <div className="text-center text-sm text-gray-600">
              Total feedback: {feedbackSummary.total} responses
            </div>
          </div>
        </div>
      </div>

      {/* Performance Insights */}
      <div className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-xl border border-cyan-200/50 p-8">
        <h3 className="text-xl font-bold text-sky-700 mb-6">Performance Insights</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="p-6 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl border border-blue-200">
            <div className="flex items-center gap-3 mb-4">
              <Brain className="w-6 h-6 text-blue-600" />
              <span className="font-semibold text-blue-800">Model Performance</span>
            </div>
            <div className="text-2xl font-bold text-blue-800 mb-2">
              {metrics.averageAccuracy >= 85 ? 'Excellent' : 
               metrics.averageAccuracy >= 70 ? 'Good' : 
               metrics.averageAccuracy >= 55 ? 'Fair' : 'Needs Improvement'}
            </div>
            <div className="text-sm text-blue-600">
              Current model accuracy is {metrics.averageAccuracy}%
            </div>
          </div>
          
          <div className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border border-green-200">
            <div className="flex items-center gap-3 mb-4">
              <TrendingUp className="w-6 h-6 text-green-600" />
              <span className="font-semibold text-green-800">Trend Analysis</span>
            </div>
            <div className="text-2xl font-bold text-green-800 mb-2">
              {metrics.accuracyTrend > 0 ? 'Improving' : 
               metrics.accuracyTrend < 0 ? 'Declining' : 'Stable'}
            </div>
            <div className="text-sm text-green-600">
              {Math.abs(metrics.accuracyTrend)}% change from last period
            </div>
          </div>
          
          <div className="p-6 bg-gradient-to-br from-purple-50 to-indigo-50 rounded-xl border border-purple-200">
            <div className="flex items-center gap-3 mb-4">
              <Star className="w-6 h-6 text-purple-600" />
              <span className="font-semibold text-purple-800">Quality Score</span>
            </div>
            <div className="text-2xl font-bold text-purple-800 mb-2">
              {Math.round((metrics.averageAccuracy + feedbackSummary.accuratePercentage) / 2)}%
            </div>
            <div className="text-sm text-purple-600">
              Combined accuracy and user satisfaction
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PredictionDashboard;
