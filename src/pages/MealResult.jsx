import React from "react";
import Icon from "../assets/Icon";

function MealResult({ analysis, onBack }) {
  let data;

  try {
    data = JSON.parse(
      analysis.result
        .replace(/```json/g, "")
        .replace(/```/g, "")
        .trim()
    );
  } catch (error) {
    return (
      <div className="page">
        <div className="container">
          <div className="card">

            <p className="empty-state">
              解析結果を読み込めませんでした
            </p>

            <button
              onClick={onBack}
              className="btn btn--ghost spacer-top"
            >
              戻る
            </button>

          </div>
        </div>
      </div>
    );
  }

  // =========================
  // カロリーを保存
  // =========================
  const handleSave = () => {
    try {
      // 現在保存されている履歴を取得
      const savedHistory =
        localStorage.getItem("calorieHistory");

      const history = savedHistory
        ? JSON.parse(savedHistory)
        : [];

      // 新しい記録
      const newRecord = {
        id: Date.now(),
        calories: data.calories,
        dish: data.dish,
        ingredients: data.ingredients || [],
        advice: data.advice || "",
        tomorrow_recipe: data.tomorrow_recipe || "",
        timestamp: new Date().toLocaleString("ja-JP"),
      };

      // 新しい記録を先頭に追加
      const updatedHistory = [
        newRecord,
        ...history,
      ];

      // 保存
      localStorage.setItem(
        "calorieHistory",
        JSON.stringify(updatedHistory)
      );

      alert("カロリーを保存しました！");

    } catch (error) {
      console.error(
        "カロリー保存エラー:",
        error
      );

      alert(
        "カロリーの保存に失敗しました"
      );
    }
  };

  return (
    <div className="page">

      <div className="container">

        {/* 戻る */}
        <button
          onClick={onBack}
          className="btn-back"
        >
          戻る
        </button>

        <div className="card">

          {/* タイトル */}
          <div
            className="page-head"
            style={{
              "--accent": "var(--amber)",
            }}
          >
            <Icon
              name="spark"
              size={22}
            />

            <h1 className="title-page">
              解析結果
            </h1>
          </div>

          <p className="page-subtitle">
            言い訳のきかない数字です。
          </p>


          {/* =========================
              推定カロリー
          ========================= */}
          <div className="calorie">

            <h2>
              <Icon
                name="flame"
                size={14}
                strokeWidth={2.2}
              />

              推定カロリー
            </h2>

            <p className="stat-number">

              {data.calories}

              <span>
                kcal
              </span>

            </p>

          </div>


          {/* =========================
              料理
          ========================= */}
          <div className="stat">

            <h2>
              料理
            </h2>

            <p className="stat-value">
              {data.dish}
            </p>

          </div>


          {/* =========================
              食材
          ========================= */}
          <div className="stat">

            <h2>
              食材
            </h2>

            <div className="list">

              {(data.ingredients || []).map(
                (item, index) => (

                  <div
                    key={index}
                    className="list-row"
                  >

                    <span>
                      {item.name}
                    </span>

                    <span className="list-amount">
                      {item.amount}
                    </span>

                  </div>

                )
              )}

            </div>

          </div>


          {/* =========================
              AIアドバイス
          ========================= */}
          <div className="stat">

            <h2>
              AIアドバイス
            </h2>

            <p
              className="stat-body"
              style={{
                fontSize: "1.5rem",
                fontWeight: "bold",
              }}
            >
              {data.advice}
            </p>

            <hr className="divider" />

            <h3>
              明日のおすすめ
            </h3>

            <p
              className="stat-body"
              style={{
                fontSize: "1.5rem",
                fontWeight: "bold",
              }}
            >
              {data.tomorrow_recipe}
            </p>

          </div>


          {/* =========================
              保存ボタン
          ========================= */}
          <button
            onClick={handleSave}
            className="btn spacer-top"
          >
            <Icon
              name="check"
              size={16}
              strokeWidth={2.4}
            />

            カロリーを保存する

          </button>

        </div>
      </div>
    </div>
  );
}

export default MealResult;