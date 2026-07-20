import React, { useState } from 'react';

function GoalSetting({ goals, addGoal, onBack }) {
  const [goalType, setGoalType] = useState('today');
  const [goalText, setGoalText] = useState('');

  const handleAdd = () => {
    if (goalText.trim()) {
      addGoal(goalType, goalText);
      setGoalText('');
      alert(`${goalType === 'today' ? '今日' : goalType === 'week' ? '今週' : '今月'}の目標を設定しました！`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 sm:p-8">
      <div className="max-w-2xl mx-auto">
        <button
          onClick={onBack}
          className="mb-6 text-blue-600 hover:text-blue-800 font-bold text-lg"
        >
          ← 戻る
        </button>

        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h1 className="text-3xl font-bold text-indigo-900 mb-8 text-center">🎯 目標を設定する</h1>

          {/* 目標タイプ選択 */}
          <div className="mb-8">
            <label className="block text-lg font-bold text-gray-700 mb-4">目標の期間を選択</label>
            <div className="grid grid-cols-3 gap-3">
              {[
                { value: 'today', label: '📅 今日' },
                { value: 'week', label: '📊 今週' },
                { value: 'month', label: '📈 今月' }
              ].map(item => (
                <button
                  key={item.value}
                  onClick={() => setGoalType(item.value)}
                  className={`py-3 rounded-lg font-bold transition ${
                    goalType === item.value
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* 現在の目標表示 */}
          <div className="bg-gray-50 p-4 rounded-lg mb-8">
            <p className="text-sm text-gray-600">現在の目標:</p>
            <p className="text-lg font-bold text-gray-800">
              {goals[goalType].title || '未設定'}
            </p>
          </div>

          {/* 目標入力 */}
          <div className="mb-8">
            <label className="block text-lg font-bold text-gray-700 mb-4">新しい目標を入力</label>
            <textarea
              value={goalText}
              onChange={e => setGoalText(e.target.value)}
              placeholder="例: 3000kcal以下に抑える、毎日30分運動する"
              className="w-full p-4 border-2 border-gray-300 rounded-lg focus:border-blue-600 focus:outline-none text-lg"
              rows="4"
            />
          </div>

          {/* 設定ボタン */}
          <button
            onClick={handleAdd}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl transition transform hover:scale-105"
          >
            ✅ 目標を設定する
          </button>
        </div>
      </div>
    </div>
  );
}

export default GoalSetting;