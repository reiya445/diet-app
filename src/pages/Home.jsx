import React, { useState } from 'react';

function Home({ goals, toggleGoal, handleGoalResult, resultMessage, setResultMessage, onNavigate }) {
  const [selectedGoal, setSelectedGoal] = useState(null);

  const handleMarkGoal = (type, isCompleted) => {
    toggleGoal(type);
    handleGoalResult(isCompleted);
    setSelectedGoal(type);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 sm:p-8">
      {/* ヘッダー */}
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-indigo-900 mb-2">🎯 ペナルティーアプリ</h1>
          <p className="text-gray-600">目標達成を目指そう！</p>
        </div>

        {/* メインコンテンツ */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          {/* 目標表示エリア */}
          <div className="space-y-6 mb-8">
            {/* 今日の目標 */}
            <div className="border-l-4 border-blue-500 bg-blue-50 p-6 rounded-lg">
              <h2 className="text-xl font-bold text-blue-900 mb-3">📅 今日の目標</h2>
              <p className="text-gray-700 mb-4">{goals.today.title || '目標を設定してください'}</p>
              <div className="flex gap-3">
                <button
                  onClick={() => handleMarkGoal('today', true)}
                  className="flex-1 bg-green-500 hover:bg-green-600 text-white font-bold py-3 rounded-lg transition transform hover:scale-105"
                >
                  ✅ 達成
                </button>
                <button
                  onClick={() => handleMarkGoal('today', false)}
                  className="flex-1 bg-red-500 hover:bg-red-600 text-white font-bold py-3 rounded-lg transition transform hover:scale-105"
                >
                  ❌ 失敗
                </button>
              </div>
            </div>

            {/* 今週の目標 */}
            <div className="border-l-4 border-purple-500 bg-purple-50 p-6 rounded-lg">
              <h2 className="text-xl font-bold text-purple-900 mb-3">📊 今週の目標</h2>
              <p className="text-gray-700 mb-4">{goals.week.title || '目標を設定してください'}</p>
              <div className="flex gap-3">
                <button
                  onClick={() => handleMarkGoal('week', true)}
                  className="flex-1 bg-green-500 hover:bg-green-600 text-white font-bold py-3 rounded-lg transition transform hover:scale-105"
                >
                  ✅ 達成
                </button>
                <button
                  onClick={() => handleMarkGoal('week', false)}
                  className="flex-1 bg-red-500 hover:bg-red-600 text-white font-bold py-3 rounded-lg transition transform hover:scale-105"
                >
                  ❌ 失敗
                </button>
              </div>
            </div>

            {/* 今月の目標 */}
            <div className="border-l-4 border-orange-500 bg-orange-50 p-6 rounded-lg">
              <h2 className="text-xl font-bold text-orange-900 mb-3">📈 今月の目標</h2>
              <p className="text-gray-700 mb-4">{goals.month.title || '目標を設定してください'}</p>
              <div className="flex gap-3">
                <button
                  onClick={() => handleMarkGoal('month', true)}
                  className="flex-1 bg-green-500 hover:bg-green-600 text-white font-bold py-3 rounded-lg transition transform hover:scale-105"
                >
                  ✅ 達成
                </button>
                <button
                  onClick={() => handleMarkGoal('month', false)}
                  className="flex-1 bg-red-500 hover:bg-red-600 text-white font-bold py-3 rounded-lg transition transform hover:scale-105"
                >
                  ❌ 失敗
                </button>
              </div>
            </div>
          </div>

          {/* 結果メッセージ */}
          {resultMessage && (
            <div className="bg-yellow-50 border-2 border-yellow-400 p-6 rounded-lg mb-8 animate-bounce">
              <p className="text-lg font-bold text-center text-yellow-900">{resultMessage}</p>
              <button
                onClick={() => setResultMessage('')}
                className="mt-3 w-full bg-yellow-400 hover:bg-yellow-500 text-yellow-900 font-bold py-2 rounded-lg transition"
              >
                閉じる
              </button>
            </div>
          )}
        </div>

        {/* ナビゲーションボタン */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <button
            onClick={() => onNavigate('goalSetting')}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl transition transform hover:scale-105 shadow-lg"
          >
            🎯 目標設定
          </button>
          <button
            onClick={() => onNavigate('penaltySetting')}
            className="bg-red-600 hover:bg-red-700 text-white font-bold py-4 rounded-xl transition transform hover:scale-105 shadow-lg"
          >
            ⚠️ 罰ゲーム
          </button>
          <button
            onClick={() => onNavigate('rewardSetting')}
            className="bg-green-600 hover:bg-green-700 text-white font-bold py-4 rounded-xl transition transform hover:scale-105 shadow-lg"
          >
            🎁 ご褒美
          </button>
          <button
            onClick={() => onNavigate('calorieCounter')}
            className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-4 rounded-xl transition transform hover:scale-105 shadow-lg"
          >
            📸 カロリー計算
          </button>
        </div>
      </div>
    </div>
  );
}

export default Home;
