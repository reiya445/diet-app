import React, { useState } from 'react';
import Icon from '../assets/Icon';

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
    alert('削除機能は親コンポーネントで実装してください');
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
          <div className="page-head" style={{ '--accent': 'var(--red)' }}>
            <Icon name="penalty" size={22} />
            <h1 className="title-page">罰ゲーム</h1>
          </div>
          <p className="page-subtitle">
            目標を落としたとき、この中からランダムで1つ引かされます。
          </p>

          {/* 罰ゲーム入力 */}
          <div className="field">
            <label className="field-label">罰ゲームの内容</label>
            <textarea
              value={penaltyText}
              onChange={e => setPenaltyText(e.target.value)}
              placeholder="例: スクワット30回、冷たいシャワーを浴びる、好物の食べ物を1週間禁止"
              className="textarea textarea--danger"
              rows="4"
            />
          </div>

          {/* 追加ボタン */}
          <button
            onClick={handleAdd}
            className="btn btn--red-solid"
          >
            <Icon name="penalty" size={16} strokeWidth={2.2} />
            罰ゲームを追加
          </button>

          {/* 登録済み罰ゲーム一覧 */}
          <div className="section">
            <h2 className="section-title">
              登録済み
              <span className="count-pill">{penalties.length}</span>
            </h2>
            {penalties.length === 0 ? (
              <p className="empty-state">
                まだ罰ゲームがありません。厳しめに設定するほど効きます。
              </p>
            ) : (
              <div className="list">
                {penalties.map((penalty, index) => (
                  <div key={index} className="list-row">
                    <p><span className="list-index">{index + 1}</span>{penalty}</p>
                    <button
                      onClick={() => handleRemove(index)}
                      className="btn-inline"
                      aria-label="削除"
                    >
                      <Icon name="trash" size={16} />
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
