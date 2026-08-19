import React, { useState } from 'react';
import Icon from '../assets/Icon';

// 期間ごとの目標例
const goalExamples = {
  today: [
    '・1日の摂取カロリーを1500kcal以内にする',
    '・今日7000歩歩く',
    '・間食をしない',
    '・野菜を1品以上食べる',
  ],

  week: [
    '・1週間で0.5kg減らす',
    '・週3回運動する',
    '・毎日7000歩歩く',
    '・毎日食事を記録する',
  ],

  month: [
    '・1ヶ月で2kg減らす',
    '・週3回の運動を続ける',
    '・毎日食事を記録する',
    '・間食を週2回以内にする',
  ],
};

// 期間の表示名
const periodLabels = {
  today: '今日',
  week: '今週',
  month: '今月',
};

function GoalSetting({ goals, addGoal, onBack }) {
  // 現在選択している期間
  const [goalType, setGoalType] = useState('today');

  // 入力された目標
  const [goalText, setGoalText] = useState('');

  // 選択された目標例
  const [selectedExample, setSelectedExample] = useState('');

  // 期間を変更
  const handleTypeChange = (type) => {
    setGoalType(type);

    // 期間を変更したら入力内容をリセット
    setGoalText('');
    setSelectedExample('');
  };

  // 目標例を選択
  const handleExampleSelect = (goal) => {
    setSelectedExample(goal);

    // 選択した目標を入力欄にも入れる
    setGoalText(goal);
  };

  // 目標を確定
  const handleAdd = () => {
    if (!goalText.trim()) {
      return;
    }

    addGoal(goalType, goalText.trim());

    alert(
      `${periodLabels[goalType]}の目標を設定しました！`
    );

    // 入力をリセット
    setGoalText('');
    setSelectedExample('');
  };

  return (
    <div className="page">
      <div className="container">

        {/* 戻るボタン */}
        <button
          onClick={onBack}
          className="btn-back"
        >
          戻る
        </button>

        <div className="card">

          {/* ページタイトル */}
          <div className="page-head">
            <Icon name="target" size={22} />
            <h1 className="title-page">
              目標を決める
            </h1>
          </div>

          <p className="page-subtitle">
            期間に合わせて目標を設定してください。
          </p>


          {/* =========================
              期間選択
          ========================= */}
          <div className="field">

            <label className="field-label">
              期間
            </label>

            <div className="segmented">

              {[
                {
                  value: 'today',
                  label: '1日',
                },
                {
                  value: 'week',
                  label: '1週間',
                },
                {
                  value: 'month',
                  label: '1ヶ月',
                },
              ].map((item) => (

                <button
                  key={item.value}
                  type="button"
                  onClick={() =>
                    handleTypeChange(item.value)
                  }
                  aria-pressed={
                    goalType === item.value
                  }
                  className={`segment ${
                    goalType === item.value
                      ? 'segment--active'
                      : ''
                  }`}
                >
                  {item.label}
                </button>

              ))}

            </div>

          </div>


          {/* =========================
              現在の目標
          ========================= */}
          <div className="stat">

            <h2>
              現在の
              {periodLabels[goalType]}
              の目標
            </h2>

            <p className="stat-value">

              {goals[goalType].title
                ? goals[goalType].title
                : '未設定'}

            </p>

          </div>


          {/* =========================
              目標例
          ========================= */}
          <div className="field spacer-top">

            <label className="field-label">
              {periodLabels[goalType]}の目標例
            </label>

            <div className="goal-examples">

              {goalExamples[goalType].map(
                (goal) => (

                  <button
                    key={goal}
                    type="button"
                    onClick={() =>
                      handleExampleSelect(goal)
                    }
                    className={`goal-example ${
                      selectedExample === goal
                        ? 'goal-example--selected'
                        : ''
                    }`}
                  >

                    {/* 選択マーク */}
                    <span className="goal-example-radio">

                      {selectedExample === goal
                        ? '✓'
                        : ''}

                    </span>

                    {/* 目標文 */}
                    <span>
                      {goal}
                    </span>

                  </button>

                )
              )}

            </div>

          </div>


          {/* =========================
              自分で入力
          ========================= */}
          <div className="field spacer-top">

            <label className="field-label">
              または、自分で目標を入力
            </label>

            <textarea
              value={goalText}
              onChange={(e) => {

                // 自分で文字を入力した場合は
                // 目標例の選択を解除
                setGoalText(e.target.value);
                setSelectedExample('');

              }}
              placeholder={
                goalType === 'today'
                  ? '例：夜9時以降は食べない'
                  : goalType === 'week'
                  ? '例：週3回30分運動する'
                  : '例：1ヶ月で2kg減らす'
              }
              className="textarea"
              rows="4"
            />

          </div>


          {/* =========================
              確定ボタン
          ========================= */}
          <button
            type="button"
            onClick={handleAdd}
            className="btn"
            disabled={!goalText.trim()}
          >

            <Icon
              name="check"
              size={16}
              strokeWidth={2.4}
            />

            この目標で確定する

          </button>

        </div>
      </div>
    </div>
  );
}

export default GoalSetting;