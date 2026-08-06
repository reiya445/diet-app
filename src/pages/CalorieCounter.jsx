import React, { useState } from 'react';

function CalorieCounter({ onBack, onNext }) {
  const [selectedImage, setSelectedImage] = useState(null);
  const [manualCalories, setManualCalories] = useState('');
  const [foodLog, setFoodLog] = useState([]);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = (event) => {
        setSelectedImage(event.target.result);
      };

      reader.readAsDataURL(file);
    }
  };

  const handleAddManualCalories = () => {
    if (manualCalories.trim()) {
      setFoodLog([
        ...foodLog,
        {
          type: 'manual',
          content: manualCalories,
          timestamp: new Date().toLocaleString('ja-JP'),
        },
      ]);

      setManualCalories('');
      alert('記録を追加しました！');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 p-4 sm:p-8">
      <div className="max-w-2xl mx-auto">
        <button
          onClick={onBack}
          className="mb-6 text-purple-600 hover:text-purple-800 font-bold text-lg"
        >
          ← 戻る
        </button>

        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h1 className="text-3xl font-bold text-purple-900 mb-8 text-center">
            📸 カロリー計算
          </h1>

          <div className="bg-yellow-50 border-2 border-yellow-400 p-4 rounded-lg mb-8">
            <p className="text-yellow-900 font-semibold">
              📝 AIによる食事分析機能を追加予定です。
            </p>
            <p className="text-yellow-800 text-sm mt-2">
              現在は手動入力も利用できます。
            </p>
          </div>

          {/* 写真アップロード */}
          <div className="mb-8">
            <label className="block text-lg font-bold text-gray-700 mb-4">
              📷 食事の写真をアップロード
            </label>

            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="w-full p-4 border-2 border-dashed border-purple-300 rounded-lg"
            />
          </div>

          {/* 写真プレビュー */}
          {selectedImage && (
            <div className="mb-8">
              <p className="text-lg font-bold text-gray-700 mb-3">
                アップロード画像
              </p>

              <img
                src={selectedImage}
                alt="food"
                className="w-full rounded-lg shadow-md max-h-64 object-cover"
              />
            </div>
          )}

          {/* 手動入力 */}
          <div className="mb-8">
            <label className="block text-lg font-bold text-gray-700 mb-4">
              📝 手動でカロリー情報を入力
            </label>

            <textarea
              value={manualCalories}
              onChange={(e) => setManualCalories(e.target.value)}
              placeholder="例: 朝食 - オムライス 800kcal"
              className="w-full p-4 border-2 border-purple-300 rounded-lg focus:border-purple-600 focus:outline-none text-lg"
              rows="3"
            />
          </div>

          {/* 手動記録 */}
          <button
            onClick={handleAddManualCalories}
            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-4 rounded-xl transition transform hover:scale-105 mb-4"
          >
            ➕ 記録を追加
          </button>

          {/* AI分析画面へ */}
          <button
            onClick={onNext}
            className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-4 rounded-xl transition transform hover:scale-105 mb-8"
          >
            🤖 AIで食事を分析する
          </button>

          {/* 食事ログ */}
          <div>
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              📋 食事ログ ({foodLog.length})
            </h2>

            {foodLog.length === 0 ? (
              <p className="text-gray-500 text-center py-8">
                まだ食事が記録されていません
              </p>
            ) : (
              <div className="space-y-3">
                {foodLog.map((log, index) => (
                  <div
                    key={index}
                    className="bg-purple-50 p-4 rounded-lg border-l-4 border-purple-600"
                  >
                    <p className="text-gray-800 font-semibold">
                      {index + 1}. {log.content}
                    </p>

                    <p className="text-gray-500 text-sm mt-1">
                      📅 {log.timestamp}
                    </p>
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

export default CalorieCounter;