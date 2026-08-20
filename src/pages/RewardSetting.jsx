import React, { useState } from 'react';
import Icon from '../assets/Icon';

const rewardCandidates = [
  '🎬 映画・動画を1本楽しむ',
  '☕ カフェで好きな飲み物を楽しむ',
  '🎮 趣味の時間を30分増やす',
  '🍰 好きなスイーツを1つ楽しむ',
  '🛍️ 500円以内で好きなものを買う',
  '🎵 好きな音楽をゆっくり聴く',
  '🛋️ 30分ゆっくりリラックスする',
  '⭐ ポイントを獲得する'
];

function RewardSetting({
  rewards,
  addReward,
  deleteReward,
  onBack
}) {
  const [rewardText, setRewardText] = useState('');

  const handleAdd = () => {
    const text = rewardText.trim();

    if (!text) return;

    // 同じご褒美がすでにある場合は追加しない
    if (rewards.includes(text)) {
      window.alert('このご褒美はすでに設定されています。');
      return;
    }

    addReward(text);
    setRewardText('');
  };

  const handleCandidateAdd = (candidate) => {
    // 同じご褒美がすでにある場合は追加しない
    if (rewards.includes(candidate)) {
      window.alert('このご褒美はすでに設定されています。');
      return;
    }

    addReward(candidate);
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

          {/* ページタイトル */}
          <div className="page-head">
            <Icon name="reward" size={22} />
            <h1 className="title-page">
              ご褒美を設定
            </h1>
          </div>

          <p className="page-subtitle">
            目標を達成したときのご褒美を設定します。
          </p>

          {/* 設定中のご褒美 */}
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

          {/* おすすめのご褒美 */}
          <div className="field spacer-top">

            <label className="field-label">
              おすすめのご褒美
            </label>

            <div className="reward-candidates">

              {rewardCandidates.map((candidate) => {
                const isSelected =
                  rewards.includes(candidate);

                return (
                  <button
                    key={candidate}
                    type="button"
                    className="reward-candidate"
                    onClick={() =>
                      handleCandidateAdd(candidate)
                    }
                    disabled={isSelected}
                  >
                    {isSelected
                      ? `✓ ${candidate}`
                      : candidate}
                  </button>
                );
              })}

            </div>

          </div>

          {/* 自分でご褒美を追加 */}
          <div className="field spacer-top">

            <label className="field-label">
              自分でご褒美を追加
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

          {/* 追加ボタン */}
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