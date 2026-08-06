import React, { useState } from 'react';
import Icon from '../assets/Icon';

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
            <Icon name="target" size={22} />
            <h1 className="title-page">目標を決める</h1>
          </div>
          <p className="page-subtitle">
            ここで決めた内容が、ご褒美と罰ゲームの判定基準になります。
          </p>

          {/* 目標タイプ選択 */}
          <div className="field">
            <label className="field-label">期間</label>
            <div className="segmented">
              {[
                { value: 'today', label: '今日' },
                { value: 'week', label: '今週' },
                { value: 'month', label: '今月' }
              ].map(item => (
                <button
                  key={item.value}
                  onClick={() => setGoalType(item.value)}
                  aria-pressed={goalType === item.value}
                  className="segment"
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* 現在の目標表示 */}
          <div className="stat">
            <h2>現在の目標</h2>
            <p className="stat-value">
              {goals[goalType].title || '未設定'}
            </p>
          </div>

          {/* 目標入力 */}
          <div className="field spacer-top">
            <label className="field-label">新しい目標</label>
            <textarea
              value={goalText}
              onChange={e => setGoalText(e.target.value)}
              placeholder="例: 3000kcal以下に抑える、毎日30分運動する"
              className="textarea"
              rows="4"
            />
          </div>

          {/* 設定ボタン */}
          <button
            onClick={handleAdd}
            className="btn"
          >
            <Icon name="check" size={16} strokeWidth={2.4} />
            この目標で確定する
          </button>
        </div>
      </div>
    </div>
  );
}

export default GoalSetting;
