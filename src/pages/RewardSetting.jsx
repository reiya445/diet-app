import React, { useState } from 'react';
import Icon from '../assets/Icon';

function RewardSetting({
  rewards,
  addReward,
  deleteReward,
  onBack
}) {
  const [rewardText, setRewardText] = useState('');

  const handleAdd = () => {
    if (!rewardText.trim()) return;

    addReward(rewardText.trim());
    setRewardText('');
  };

  const handleDelete = (index) => {
    const confirmed = window.confirm(
      'このご褒美を削除しますか？'
    );

    if (confirmed) {
      deleteReward(index);
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

          <div className="page-head">
            <Icon name="reward" size={22} />
            <h1 className="title-page">
              ご褒美を設定
            </h1>
          </div>

          <p className="page-subtitle">
            目標を達成したときのご褒美を設定します。
          </p>

          {/* ご褒美一覧 */}
          <div className="field">

            <label className="field-label">
              設定中のご褒美
            </label>

            {rewards.length === 0 ? (
              <div className="stat">
                <p className="stat-value">
                  まだご褒美が設定されていません
                </p>
              </div>
            ) : (
              <div className="reward-list">

                {rewards.map((reward, index) => (
                  <div
                    key={`${reward}-${index}`}
                    className="reward-item"
                  >

                    <span className="reward-text">
                      {reward}
                    </span>

                    <button
                      type="button"
                      onClick={() =>
                        handleDelete(index)
                      }
                      className="delete-button"
                      aria-label={`${reward}を削除`}
                      title="削除"
                    >
                      🗑️
                    </button>

                  </div>
                ))}

              </div>
            )}

          </div>

          {/* 新しいご褒美 */}
          <div className="field spacer-top">

            <label className="field-label">
              新しいご褒美
            </label>

            <textarea
              value={rewardText}
              onChange={(e) =>
                setRewardText(e.target.value)
              }
              placeholder="例：好きなスイーツを食べる"
              className="textarea"
              rows="3"
            />

          </div>

          <button
            onClick={handleAdd}
            className="btn"
            disabled={!rewardText.trim()}
          >
            <Icon
              name="check"
              size={16}
              strokeWidth={2.4}
            />
            ご褒美を追加
          </button>

        </div>
      </div>
    </div>
  );
}

export default RewardSetting;