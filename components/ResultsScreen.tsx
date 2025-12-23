import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { Sparkles, RotateCcw } from 'lucide-react';
import { calculateUserFit, CATEGORIES } from './interviewConfig';

interface ResultsScreenProps {
  answers: string[];
  onRestart: () => void;
}

/**
 * ResultsScreen Component
 * 
 * Displays the analysis results with:
 * - Visual graph showing category distribution
 * - Clear conclusion about user's top fit
 * - Explanation of what this means
 */
const ResultsScreen: React.FC<ResultsScreenProps> = ({ answers, onRestart }) => {
  // Calculate results from answers
  const results = calculateUserFit(answers);
  const { topCategoryInfo, percentages } = results;

  // Prepare data for chart
  const chartData = Object.keys(CATEGORIES).map(categoryId => ({
    name: CATEGORIES[categoryId].title.replace('The ', ''),
    score: percentages[categoryId] || 0,
    color: CATEGORIES[categoryId].color
  }));

  // Custom tooltip for the chart
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white px-4 py-2 rounded-lg shadow-lg border border-slate-200">
          <p className="text-sm font-semibold text-slate-800">{payload[0].payload.name}</p>
          <p className="text-sm text-brand-600 font-bold">{payload[0].value}%</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 py-20">
      <div className="w-full max-w-4xl">
        {/* Results Header */}
        <div className="text-center mb-12 animate-fade-in">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-gradient-to-br from-brand-500 to-indigo-500 text-white text-4xl mb-6 shadow-xl shadow-brand-500/20 animate-float">
            {topCategoryInfo.icon}
          </div>
          
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-100 text-brand-700 text-xs font-semibold mb-4">
            <Sparkles className="w-3 h-3" />
            <span>Your results are ready!</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            You're {topCategoryInfo.title}!
          </h1>
          
          <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
            {topCategoryInfo.description}
          </p>
        </div>

        {/* Traits */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-12 animate-fade-in" style={{ animationDelay: '100ms' }}>
          {topCategoryInfo.traits.map((trait, index) => (
            <span
              key={index}
              className="px-4 py-2 rounded-full bg-white border-2 border-brand-200 text-brand-700 text-sm font-medium shadow-sm"
            >
              {trait}
            </span>
          ))}
        </div>

        {/* Graph Section */}
        <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 p-8 mb-8 animate-fade-in" style={{ animationDelay: '200ms' }}>
          <h2 className="text-2xl font-bold text-slate-900 mb-2 text-center">
            Your Personality Breakdown
          </h2>
          <p className="text-slate-600 text-center mb-8">
            Here's how you scored across all categories
          </p>

          {/* Bar Chart */}
          <div className="w-full" style={{ height: '320px' }}>
            <ResponsiveContainer width="100%" height={320}>
              <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis 
                  dataKey="name" 
                  angle={-45}
                  textAnchor="end"
                  height={100}
                  tick={{ fill: '#64748b', fontSize: 12, fontWeight: 500 }}
                />
                <YAxis 
                  label={{ value: 'Score (%)', angle: -90, position: 'insideLeft', style: { fill: '#64748b', fontSize: 12, fontWeight: 500 } }}
                  tick={{ fill: '#64748b', fontSize: 12 }}
                />
                <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(20, 184, 166, 0.1)' }} />
                <Bar dataKey="score" radius={[8, 8, 0, 0]}>
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* All Categories Breakdown */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8 animate-fade-in" style={{ animationDelay: '300ms' }}>
          {Object.values(CATEGORIES).map((category) => {
            const categoryScore = percentages[category.id] || 0;
            const isTop = category.id === topCategoryInfo.id;

            return (
              <div
                key={category.id}
                className={`
                  p-5 rounded-2xl border-2 transition-all
                  ${isTop 
                    ? 'border-brand-500 bg-brand-50 shadow-lg shadow-brand-500/10' 
                    : 'border-slate-200 bg-white'
                  }
                `}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{category.icon}</span>
                    <span className={`font-semibold ${isTop ? 'text-brand-700' : 'text-slate-800'}`}>
                      {category.title}
                    </span>
                  </div>
                  <span className={`text-lg font-bold ${isTop ? 'text-brand-600' : 'text-slate-600'}`}>
                    {categoryScore}%
                  </span>
                </div>
                <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-1000 ease-out"
                    style={{
                      width: `${categoryScore}%`,
                      backgroundColor: category.color
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in" style={{ animationDelay: '400ms' }}>
          <button
            onClick={onRestart}
            className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-white text-slate-700 font-medium border-2 border-slate-300 hover:bg-slate-50 hover:border-slate-400 transition-all flex items-center justify-center gap-2"
          >
            <RotateCcw className="w-5 h-5" />
            Take Again
          </button>
        </div>

        {/* Footer note */}
        <p className="text-center text-sm text-slate-400 mt-8">
          Remember: There's no "best" type. Each brings unique value! 🌟
        </p>
      </div>
    </div>
  );
};

export default ResultsScreen;
