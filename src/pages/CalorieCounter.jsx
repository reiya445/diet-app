import React, { useState } from 'react';
import Icon from '../assets/Icon';

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
    <div className="page">
      <div className="container">
        <button
          onClick={onBack}
          className="btn-back"
        >
          戻る
        </button>

        <div className="card">
          <div className="page-head" style={{ '--accent': 'var(--amber)' }}>
            <Icon name="camera" size={22} />
            <h1 className="title-page">カロリー計算</h1>
          </div>
          <p className="page-subtitle">
            食べたものを残らず記録します。ごまかしは罰ゲームで返ってきます。
          </p>

          <div className="notice">
            <Icon name="penalty" size={17} strokeWidth={2} />
            <div>
              <p>AIによる食事分析機能を追加予定です。</p>
              <p>現在は手動入力も利用できます。</p>
            </div>
          </div>

          {/* 写真アップロード */}
          <div className="field">
            <label className="field-label">食事の写真をアップロード</label>

            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="file-input"
            />
          </div>

          {/* 写真プレビュー */}
          {selectedImage && (
            <div className="field">
              <p className="field-label">アップロード画像</p>

              <img
                src={selectedImage}
                alt="food"
                className="preview"
              />
            </div>
          )}

          {/* 手動入力 */}
          <div className="field">
            <label className="field-label">手動でカロリー情報を入力</label>

            <textarea
              value={manualCalories}
              onChange={(e) => setManualCalories(e.target.value)}
              placeholder="例: 朝食 - オムライス 800kcal"
              className="textarea"
              rows="3"
            />
          </div>

          {/* 手動記録 */}
          <button
            onClick={handleAddManualCalories}
            className="btn btn--ghost"
          >
            <Icon name="note" size={16} strokeWidth={2} />
            記録を追加
          </button>

          {/* AI分析画面へ */}
          <button
            onClick={onNext}
            className="btn spacer-top"
          >
            <Icon name="spark" size={16} strokeWidth={2} />
            AIで食事を分析する
          </button>

          {/* 食事ログ */}
          <div className="section">
            <h2 className="section-title">
              食事ログ
              <span className="count-pill">{foodLog.length}</span>
            </h2>

            {foodLog.length === 0 ? (
              <p className="empty-state">まだ食事が記録されていません</p>
            ) : (
              <div className="list">
                {foodLog.map((log, index) => (
                  <div
                    key={index}
                    className="list-row list-row--stacked"
                  >
                    <p>
                      <span className="list-index">{index + 1}</span>
                      {log.content}
                    </p>

                    <p className="caption">{log.timestamp}</p>
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
