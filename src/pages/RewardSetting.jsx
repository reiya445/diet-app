import React, { useState } from 'react';
import Icon from '../assets/Icon';

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
    <div className="page">
      <div className="container">
        <button
          onClick={onBack}
          className="btn-back"
        >
          戻る
        </button>

        <div className="card">
          <div className="page-head">
            <Icon name="reward" size={22} />
            <h1 className="title-page">ご褒美</h1>
          </div>
          <p className="page-subtitle">
            目標を達成したとき、この中からランダムで1つ手に入ります。
          </p>

          {/* ご褒美入力 */}
          <div className="field">
            <label className="field-label">ご褒美の内容</label>
            <textarea
              value={rewardText}
              onChange={e => setRewardText(e.target.value)}
              placeholder="例: 好きなケーキを食べる、好きなドラマを1時間見る、マッサージをする"
              className="textarea"
              rows="4"
            />
          </div>

          {/* 追加ボタン */}
          <button
            onClick={handleAdd}
            className="btn"
          >
            <Icon name="reward" size={16} strokeWidth={2.2} />
            ご褒美を追加
          </button>

          {/* 登録済みご褒美一覧 */}
          <div className="section">
            <h2 className="section-title">
              登録済み
              <span className="count-pill">{rewards.length}</span>
            </h2>
            {rewards.length === 0 ? (
              <p className="empty-state">
                まだご褒美がありません。頑張る理由を用意しましょう。
              </p>
            ) : (
              <div className="list">
                {rewards.map((reward, index) => (
                  <div key={index} className="list-row">
                    <p><span className="list-index">{index + 1}</span>{reward}</p>
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

export default RewardSetting;
