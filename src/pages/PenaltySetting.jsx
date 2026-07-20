import React, { useState } from 'react';

function PenaltySetting({ penalties, addPenalty, onBack }) {
  const [penaltyText, setPenaltyText] = useState('');

  const handleAdd = () => {
    if (penaltyText.trim()) {
      addPenalty(penaltyText);
      setPenaltyText('');
      alert('罰ゲームを追加しました！');
    }
  };

  const handleRemove = (index) => {
    const newPenalties = penalties.filter((_, i) => i !== index);
    // Note: This needs state update in parent
    alert('削除機能は親コンポーネントで実装してください');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-pink-100 p-4 sm:p-8">
      <div className="max-w-2xl mx-auto">
        <button
          onClick={onBack}
          className="mb-6 text-red-600 hover:text-red-800 font-bold text-lg"
        >
          ← 戻る
        </button>

        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h1 className="text-3xl font-bold text-red-900 mb-8 text-center">⚠️ 罰ゲームを設定する</h1>

          {/* 罰ゲーム入力 */}
          <div className="mb-8">
            <label className="block text-lg font-bold text-gray-700 mb-4">罰ゲームの内容</label>
            <textarea
              value={penaltyText}
              onChange={e => setPenaltyText(e.target.value)}
              placeholder="例: スクワット30回、冷たいシャワーを浴びる、好物の食べ物を1週間禁止"
              className="w-full p-4 border-2 border-red-300 rounded-lg focus:border-red-600 focus:outline-none text-lg"
              rows="4"
            />
          </div>

          {/* 追加ボタン */}
          <button
            onClick={handleAdd}
            className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-4 rounded-xl transition transform hover:scale-105 mb-8"
          >
            ➕ 罰ゲームを追加
          </button>

          {/* 登録済み罰ゲーム一覧 */}
          <div>
            <h2 className="text-xl font-bold text-gray-800 mb-4">登録済みの罰ゲーム ({penalties.length})</h2>
            {penalties.length === 0 ? (
              <p className="text-gray-500 text-center py-8">まだ罰ゲームが登録されていません</p>
            ) : (
              <div className="space-y-3">
                {penalties.map((penalty, index) => (
                  <div key={index} className="bg-red-50 p-4 rounded-lg flex justify-between items-center">
                    <p className="text-gray-800 font-semibold">{index + 1}. {penalty}</p>
                    <button
                      onClick={() => handleRemove(index)}
                      className="text-red-600 hover:text-red-800 font-bold"
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

export default PenaltySetting;