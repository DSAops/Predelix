import React, { useMemo } from 'react';
import { PieChart, Pie, Cell, Tooltip } from 'recharts';
import { BarChart3, Target, Store, Package, Brain, TrendingUp, Star, ThumbsUp, ThumbsDown } from 'lucide-react';

const PredictionDashboard = ({ predictions = [], actuals = [], feedbackData = [] }) => {
  // Match predictions and actuals by store_id, product_id, date
  const matchedPairs = useMemo(() => {
    if (!Array.isArray(predictions) || !Array.isArray(actuals)) return [];
    const actualsMap = new Map();
    actuals.forEach(a => {
      const key = `${a.store_id}|${a.product_id}|${a.date}`;
      actualsMap.set(key, a);
    });
    return predictions
      .map(pred => {
        const key = `${pred.store_id}|${pred.product_id}|${pred.date}`;
        const actual = actualsMap.get(key);
        if (actual) {
          return {
            store_id: pred.store_id,
            product_id: pred.product_id,
            date: pred.date,
            predicted_stock: pred.predicted_stock,
            actual_sales: actual.sales,
            predictionRecord: pred,
            actualRecord: actual
          };
        }
        return null;
      })
      .filter(Boolean);
  }, [predictions, actuals]);

  // All unique dates from predictions and actuals
  const allDates = useMemo(() => {
    const dates = new Set();
    predictions.forEach(p => dates.add(p.date));
    actuals.forEach(a => dates.add(a.date));
    return Array.from(dates).sort((a, b) => new Date(a) - new Date(b));
  }, [predictions, actuals]);

  // Aggregate by date for predictions and actuals separately
  const predictionByDate = useMemo(() => {
    const byDate = {};
    predictions.forEach(({ date, predicted_stock }) => {
      if (!byDate[date]) byDate[date] = { date, predicted: 0, count: 0 };
      byDate[date].predicted += parseFloat(predicted_stock ?? 0);
      byDate[date].count++;
    });
    return byDate;
  }, [predictions]);

  const actualsByDate = useMemo(() => {
    const byDate = {};
    actuals.forEach(({ date, sales }) => {
      if (!byDate[date]) byDate[date] = { date, actual: 0, count: 0 };
      byDate[date].actual += parseFloat(sales ?? 0);
      byDate[date].count++;
    });
    return byDate;
  }, [actuals]);

  // Combined chart data for all dates
  const combinedChartData = useMemo(() => {
    return allDates.map(date => {
      const pred = predictionByDate[date]?.predicted ?? 0;
      const predCount = predictionByDate[date]?.count ?? 0;
      const act = actualsByDate[date]?.actual ?? 0;
      const actCount = actualsByDate[date]?.count ?? 0;
      // Find matched pair for accuracy
      const match = matchedPairs.find(mp => mp.date === date);
      return {
        date,
        predicted: predCount ? Math.round(pred / predCount) : 0,
        actual: actCount ? Math.round(act / actCount) : 0,
        accuracy: match ? (() => {
          const predicted = parseFloat(match.predicted_stock ?? 0);
          const actual = parseFloat(match.actual_sales ?? 0);
          if (predicted > 0 && actual > 0) {
            const diff = Math.abs(predicted - actual);
            const avg = (predicted + actual) / 2;
            return Math.max(0, Math.round(100 - (diff / avg) * 100));
          }
          return 0;
        })() : 0
      };
    });
  }, [allDates, predictionByDate, actualsByDate, matchedPairs]);

  // Overall metrics for predictions and actuals
  const overallPredictionStats = useMemo(() => {
    if (!predictions.length) return { total: 0, sum: 0, stores: new Set(), products: new Set() };
    let sum = 0;
    const stores = new Set();
    const products = new Set();
    predictions.forEach(({ store_id, product_id, predicted_stock }) => {
      stores.add(store_id);
      products.add(product_id);
      sum += parseFloat(predicted_stock ?? 0);
    });
    return { total: predictions.length, sum: Math.round(sum), stores, products };
  }, [predictions]);

  const overallActualStats = useMemo(() => {
    if (!actuals.length) return { total: 0, sum: 0, stores: new Set(), products: new Set() };
    let sum = 0;
    const stores = new Set();
    const products = new Set();
    actuals.forEach(({ store_id, product_id, sales }) => {
      stores.add(store_id);
      products.add(product_id);
      sum += parseFloat(sales ?? 0);
    });
    return { total: actuals.length, sum: Math.round(sum), stores, products };
  }, [actuals]);

  // Metrics
  const metrics = useMemo(() => {
    // Show both overall and matched stats
    let accuracySum = 0, validCount = 0, predictedSum = 0, actualSum = 0;
    const stores = new Set();
    const products = new Set();
    matchedPairs.forEach(({ store_id, product_id, predicted_stock, actual_sales }) => {
      stores.add(store_id);
      products.add(product_id);
      const predicted = parseFloat(predicted_stock ?? 0);
      const actual = parseFloat(actual_sales ?? 0);
      predictedSum += predicted;
      actualSum += actual;
      if (predicted > 0 && actual > 0) {
        const diff = Math.abs(predicted - actual);
        const avg = (predicted + actual) / 2;
        const acc = Math.max(0, 100 - (diff / avg) * 100);
        accuracySum += acc;
        validCount++;
      }
    });
    return {
      totalComparisons: matchedPairs.length,
      averageAccuracy: validCount ? Math.round(accuracySum / validCount) : 0,
      totalStores: stores.size,
      totalProducts: products.size,
      predictedSum: Math.round(predictedSum),
      actualSum: Math.round(actualSum),
      overallPredictions: overallPredictionStats,
      overallActuals: overallActualStats
    };
  }, [matchedPairs, overallPredictionStats, overallActualStats]);

  // Chart Data (group by date) - now uses combinedChartData
  const chartData = combinedChartData;

  // Accuracy Distribution
  const accuracyDistribution = useMemo(() => {
    if (!matchedPairs.length) return [];
    const buckets = {
      'Excellent (90-100%)': 0,
      'Good (75-89%)': 0,
      'Fair (60-74%)': 0,
      'Poor (<60%)': 0
    };
    matchedPairs.forEach(({ predicted_stock, actual_sales }) => {
      const predicted = parseFloat(predicted_stock ?? 0);
      const actual = parseFloat(actual_sales ?? 0);
      if (predicted > 0 && actual > 0) {
        const diff = Math.abs(predicted - actual);
        const avg = (predicted + actual) / 2;
        const acc = Math.max(0, 100 - (diff / avg) * 100);
        if (acc >= 90) buckets['Excellent (90-100%)']++;
        else if (acc >= 75) buckets['Good (75-89%)']++;
        else if (acc >= 60) buckets['Fair (60-74%)']++;
        else buckets['Poor (<60%)']++;
      }
    });
    const total = matchedPairs.length;
    return Object.entries(buckets).map(([name, value]) => ({
      name,
      value,
      percentage: total ? Math.round((value / total) * 100) : 0
    }));
  }, [matchedPairs]);

  // Top Stores by accuracy (matched pairs)
  const topStores = useMemo(() => {
    if (!matchedPairs.length) return [];
    const storeStats = {};
    matchedPairs.forEach(({ store_id, predicted_stock, actual_sales }) => {
      if (!storeStats[store_id]) storeStats[store_id] = { store_id, count: 0, accuracySum: 0, validCount: 0 };
      const predicted = parseFloat(predicted_stock ?? 0);
      const actual = parseFloat(actual_sales ?? 0);
      storeStats[store_id].count++;
      if (predicted > 0 && actual > 0) {
        const diff = Math.abs(predicted - actual);
        const avg = (predicted + actual) / 2;
        const acc = Math.max(0, 100 - (diff / avg) * 100);
        storeStats[store_id].accuracySum += acc;
        storeStats[store_id].validCount++;
      }
    });
    return Object.values(storeStats)
      .map(s => ({
        ...s,
        accuracy: s.validCount ? Math.round(s.accuracySum / s.validCount) : 0
      }))
      .sort((a, b) => b.accuracy - a.accuracy)
      .slice(0, 5);
  }, [matchedPairs]);

  // Feedback summary (unchanged)
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
              <p className="text-sm text-sky-600">Compare backend predictions with uploaded actuals</p>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
            <div className="flex items-center gap-3 mb-2">
              <Target className="w-6 h-6 text-green-600" />
              <span className="text-lg font-bold text-gray-800">{metrics.averageAccuracy}%</span>
            </div>
            <div className="text-sm text-gray-600">Average Accuracy (matched)</div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
            <div className="flex items-center gap-3 mb-2">
              <BarChart3 className="w-6 h-6 text-blue-600" />
              <span className="text-lg font-bold text-gray-800">{metrics.totalComparisons}</span>
            </div>
            <div className="text-sm text-gray-600">Total Comparisons (matched)</div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
            <div className="flex items-center gap-3 mb-2">
              <Store className="w-6 h-6 text-purple-600" />
              <span className="text-lg font-bold text-gray-800">{metrics.overallPredictions.stores.size}</span>
            </div>
            <div className="text-sm text-gray-600">Stores (Predictions)</div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
            <div className="flex items-center gap-3 mb-2">
              <Package className="w-6 h-6 text-orange-600" />
              <span className="text-lg font-bold text-gray-800">{metrics.overallActuals.stores.size}</span>
            </div>
            <div className="text-sm text-gray-600">Stores (Actuals)</div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 mt-6">
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
            <div className="flex items-center gap-3 mb-2">
              <BarChart3 className="w-6 h-6 text-blue-600" />
              <span className="text-lg font-bold text-gray-800">{metrics.overallPredictions.sum}</span>
            </div>
            <div className="text-sm text-gray-600">Total Predicted Stock</div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
            <div className="flex items-center gap-3 mb-2">
              <BarChart3 className="w-6 h-6 text-green-600" />
              <span className="text-lg font-bold text-gray-800">{metrics.overallActuals.sum}</span>
            </div>
            <div className="text-sm text-gray-600">Total Actual Sales</div>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Accuracy Trend Chart */}
        <div className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-xl border border-cyan-200/50 p-6">
          <h3 className="text-xl font-bold text-sky-700 mb-4">Accuracy Trend</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr>
                  <th className="px-2 py-1">Date</th>
                  <th className="px-2 py-1">Accuracy (%)</th>
                </tr>
              </thead>
              <tbody>
                {chartData.map(row => (
                  <tr key={row.date}>
                    <td className="px-2 py-1">{row.date}</td>
                    <td className="px-2 py-1">{row.accuracy}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        {/* Predicted vs Actual Chart - Table for now */}
        <div className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-xl border border-cyan-200/50 p-6">
          <h3 className="text-xl font-bold text-sky-700 mb-4">Predicted vs Actual (Sales)</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr>
                  <th className="px-2 py-1">Date</th>
                  <th className="px-2 py-1">Predicted Stock</th>
                  <th className="px-2 py-1">Actual Sales</th>
                </tr>
              </thead>
              <tbody>
                {chartData.map(row => (
                  <tr key={row.date}>
                    <td className="px-2 py-1">{row.date}</td>
                    <td className="px-2 py-1">{row.predicted}</td>
                    <td className="px-2 py-1">{row.actual}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Additional Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Accuracy Distribution */}
        <div className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-xl border border-cyan-200/50 p-6">
          <h3 className="text-xl font-bold text-sky-700 mb-6">Accuracy Distribution</h3>
          <div style={{ width: 250, height: 250, margin: '0 auto' }}>
            <PieChart width={250} height={250}>
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
          </div>
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
            {topStores.map((store, index) => (
              <div key={store.store_id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
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
                    <div className="font-medium">Store {store.store_id}</div>
                    <div className="text-sm text-gray-600">{store.count} comparisons</div>
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
              Stable
            </div>
            <div className="text-sm text-green-600">
              No trend calculation in this view
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
