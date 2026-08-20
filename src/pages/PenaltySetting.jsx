import React, { useState } from 'react';
import Icon from '../assets/Icon';

const penaltyCandidates = [
  '🧹 10分掃除',
  '📱 スマホを30分使わない',
  '📝 明日の目標を1つ追加',
  '🚶 10分散歩',
  '🧺 家事を1つ行う',
  '💰 100円貯金',
  '📖 10分読書',
  '✍️ 今日の行動を振り返る'
];

function PenaltySetting({
  penalties,
  addPenalty,
  deletePenalty,
  onBack
}) {
  const [penaltyText, setPenaltyText] = useState('');

  const handleAdd = () => {
    const text = penaltyText.trim();

    if (!text) return;

    // 同じ罰ゲームがすでにある場合は追加しない
    if (penalties.includes(text)) {
      window.alert('この罰ゲームはすでに設定されています。');
      return;
    }

    addPenalty(text);
    setPenaltyText('');
  };

  const handleCandidateAdd = (candidate) => {
    if (penalties.includes(candidate)) {
      window.alert('この罰ゲームはすでに設定されています。');
      return;
    }

    addPenalty(candidate);
  };

  const handleDelete = (index) => {
    const confirmed = window.confirm(
      'この罰ゲームを削除しますか？'
    );

    if (confirmed) {
      deletePenalty(index);
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
            <Icon name="penalty" size={22} />
            <h1 className="title-page">
              罰ゲームを設定
            </h1>
          </div>

          <p className="page-subtitle">
            目標を達成できなかったときの罰ゲームを設定します。
          </p>

          {/* 設定中の罰ゲーム */}
          <div className="field">

            <label className="field-label">
              設定中の罰ゲーム
            </label>

            {penalties.length === 0 ? (
              <div className="stat">
                <p className="stat-value">
                  まだ罰ゲームが設定されていません
                </p>
              </div>
            ) : (
              <div className="penalty-list">

                {penalties.map((penalty, index) => (
                  <div
                    key={`${penalty}-${index}`}
                    className="penalty-item"
                  >

                    <span className="penalty-text">
                      {penalty}
                    </span>

                    <button
                      type="button"
                      onClick={() => handleDelete(index)}
                      className="delete-button"
                      aria-label={`${penalty}を削除`}
                      title="削除"
                    >
                      🗑️
                    </button>

                  </div>
                ))}

              </div>
            )}

          </div>

          {/* おすすめの罰ゲーム */}
          <div className="field spacer-top">

            <label className="field-label">
              おすすめの罰ゲーム
            </label>

            <div className="penalty-candidates">

              {penaltyCandidates.map((candidate) => {
                const isSelected = penalties.includes(candidate);

                return (
                  <button
                    key={candidate}
                    type="button"
                    className="penalty-candidate"
                    onClick={() => handleCandidateAdd(candidate)}
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

          {/* 新しい罰ゲーム */}
          <div className="field spacer-top">

            <label className="field-label">
              自分で罰ゲームを追加
            </label>

            <textarea
              value={penaltyText}
              onChange={(e) =>
                setPenaltyText(e.target.value)
              }
              placeholder="例：腕立て伏せ20回"
              className="textarea"
              rows="3"
            />

          </div>

          {/* 追加ボタン */}
          <button
            onClick={handleAdd}
            className="btn"
            disabled={!penaltyText.trim()}
          >
            <Icon
              name="check"
              size={16}
              strokeWidth={2.4}
            />
            罰ゲームを追加
          </button>

        </div>
      </div>
    </div>
  );
}

export default PenaltySetting;