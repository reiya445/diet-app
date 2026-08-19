import React from 'react';
import Icon from '../assets/Icon';

function Home({ goals, toggleGoal, handleGoalResult, resultMessage, resultKind, clearResult, onNavigate }) {

  const handleMarkGoal = (type, isCompleted) => {
    toggleGoal(type);
    handleGoalResult(isCompleted);
  };

  const periods = [
    { key: 'today', mod: 'today', icon: 'calendar', label: '今日の目標' },
    { key: 'week', mod: 'week', icon: 'target', label: '今週の目標' },
    { key: 'month', mod: 'month', icon: 'scale', label: '今月の目標' },
  ];

  return (
    <div className="page page--flush">
      {/* ヘッダー */}
      <div className="container">
        <div className="hero">
          <span className="hero-tag">
            <Icon name="flame" size={13} strokeWidth={2.2} />
            サボったら罰ゲーム
          </span>
          <h1 className="title-large">
            続かないなら、<br />
            <em>痛い目</em>を見よう。
          </h1>
          <p className="subtitle">
            目標を決める。達成すればご褒美、失敗すれば罰ゲーム。逃げ道はありません。
          </p>
          <div className="hazard-bar" />
        </div>

        {/* メインコンテンツ */}
        <div className="card">
          {/* 目標表示エリア */}
          <div className="goal-list">
            {periods.map(p => (
              <div key={p.key} className={`goal goal--${p.mod}`}>
                <h2 className="goal-heading">
                  <Icon name={p.icon} size={14} strokeWidth={2} />
                  {p.label}
                </h2>
                <p className={`goal-text${goals[p.key].title ? '' : ' goal-text--empty'}`}>
                  {goals[p.key].title || '目標が未設定です'}
                </p>
                <div className="goal-actions">
                  <button
                    onClick={() => handleMarkGoal(p.key, true)}
                    className="btn"
                  >
                    <Icon name="check" size={16} strokeWidth={2.4} />
                    達成した
                  </button>
                  <button
                    onClick={() => handleMarkGoal(p.key, false)}
                    className="btn btn--danger"
                  >
                    <Icon name="cross" size={16} strokeWidth={2.4} />
                    失敗した
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* 結果メッセージ */}
          {resultMessage && (
            <div className={`verdict verdict--${resultKind === 'reward' ? 'reward' : 'penalty'}`}>
              <span className="verdict-label">
                <Icon
                  name={resultKind === 'reward' ? 'reward' : 'penalty'}
                  size={15}
                  strokeWidth={2.2}
                />
                {resultKind === 'reward' ? 'おめでとう' : '判定が出ました'}
              </span>
              <p className="verdict-text">{resultMessage}</p>
              <button
                onClick={clearResult}
                className="btn btn--ghost"
              >
                {resultKind === 'reward' ? '受け取る' : '受け入れる'}
              </button>
            </div>
          )}
        </div>

        {/* ナビゲーションボタン */}
        <div className="section">
          <h2 className="section-title">メニュー</h2>
          <div className="grid">
            <button
              onClick={() => onNavigate('goalSetting')}
              className="nav-tile nav-tile--goal"
            >
              <Icon name="target" size={22} />
              目標を決める
              <span>今日・今週・今月</span>
            </button>
            <button
              onClick={() => onNavigate('penaltySetting')}
              className="nav-tile nav-tile--penalty"
            >
              <Icon name="penalty" size={22} />
              罰ゲーム
              <span>失敗したときの代償</span>
            </button>
            <button
              onClick={() => onNavigate('rewardSetting')}
              className="nav-tile nav-tile--reward"
            >
              <Icon name="reward" size={22} />
              ご褒美
              <span>達成したときの報酬</span>
            </button>
            <button
              onClick={() => onNavigate('calorieCounter')}
              className="nav-tile nav-tile--calorie"
            >
              <Icon name="camera" size={22} />
              カロリー計算
              <span>食事を撮って記録</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
