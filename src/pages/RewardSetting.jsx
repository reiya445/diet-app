import React, { useState } from 'react';

function RewardSetting({ rewards, addReward, onBack }) {
  const [rewardText, setRewardText] = useState('');

  const handleAdd = () => {
    if (rewardText.trim()) {
      addReward(rewardText);
      setRewardText('');
      alert('ご褒美を追加しました！');
    }
  };

  const handleRemove = (index) => {
    alert('削除機能は親コンポーネントで実装してください');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 p-4 sm:p-8">
      <div className="max-w-2xl mx-auto">
        <button
          onClick={onBack}
          className="mb-6 text-green-600 hover:text-green-800 font-bold text-lg"
        >
          ← 戻る
        </button>

        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h1 className="text-3xl font-bold text-green-900 mb-8 text-center">🎁 ご褒美を設定する</h1>

          {/* ご褒美入力 */}
          <div className="mb-8">
            <label className="block text-lg font-bold text-gray-700 mb-4">ご褒美の内容</label>
            <textarea
              value={rewardText}
              onChange={e => setRewardText(e.target.value)}
              placeholder="例: 好きなケーキを食べる、好きなドラマを1時間見る、マッサージをする"
              className="w-full p-4 border-2 border-green-300 rounded-lg focus:border-green-600 focus:outline-none text-lg"
              rows="4"
            />
          </div>

          {/* 追加ボタン */}
          <button
            onClick={handleAdd}
            className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-4 rounded-xl transition transform hover:scale-105 mb-8"
          >
            ➕ ご褒美を追加
          </button>

          {/* 登録済みご褒美一覧 */}
          <div>
            <h2 className="text-xl font-bold text-gray-800 mb-4">登録済みのご褒美 ({rewards.length})</h2>
            {rewards.length === 0 ? (
              <p className="text-gray-500 text-center py-8">まだご褒美が登録されていません</p>
            ) : (
              <div className="space-y-3">
                {rewards.map((reward, index) => (
                  <div key={index} className="bg-green-50 p-4 rounded-lg flex justify-between items-center">
                    <p className="text-gray-800 font-semibold">{index + 1}. {reward}</p>
                    <button
                      onClick={() => handleRemove(index)}
                      className="text-green-600 hover:text-green-800 font-bold"
                    >
                      🗑️
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default RewardSetting;