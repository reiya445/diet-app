import React, { useEffect, useState } from 'react';
import Icon from '../assets/Icon';

function CalorieHistory({ onBack }) {

  const [history, setHistory] =
    useState([]);

  // =========================
  // 保存データを読み込む
  // =========================
  useEffect(() => {

    const savedHistory =
      localStorage.getItem(
        'calorieHistory'
      );

    if (savedHistory) {

      try {

        setHistory(
          JSON.parse(savedHistory)
        );

      } catch (error) {

        console.error(
          '履歴の読み込みに失敗しました',
          error
        );

      }

    }

  }, []);


  // =========================
  // 個別削除
  // =========================
  const handleDelete = (id) => {

    const confirmed =
      window.confirm(
        'この記録を削除しますか？'
      );

    if (!confirmed) return;

    const updatedHistory =
      history.filter(
        item => item.id !== id
      );

    setHistory(updatedHistory);

    localStorage.setItem(
      'calorieHistory',
      JSON.stringify(
        updatedHistory
      )
    );

  };


  // =========================
  // 全削除
  // =========================
  const handleDeleteAll = () => {

    if (history.length === 0) {
      return;
    }

    const confirmed =
      window.confirm(
        '保存されているカロリー履歴をすべて削除しますか？'
      );

    if (!confirmed) return;

    setHistory([]);

    localStorage.removeItem(
      'calorieHistory'
    );

  };


  // =========================
  // 合計カロリー
  // =========================
  const totalCalories =
    history.reduce(
      (total, item) => {

        const calories =
          Number(item.calories) || 0;

        return total + calories;

      },
      0
    );


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

          {/* =========================
              タイトル
          ========================= */}
          <div
            className="page-head"
            style={{
              '--accent':
                'var(--amber)'
            }}
          >

            <Icon
              name="note"
              size={22}
            />

            <h1 className="title-page">
              カロリー履歴
            </h1>

          </div>


          <p className="page-subtitle">
            保存した食事のカロリーを確認できます。
          </p>


          {/* =========================
              履歴がある場合
          ========================= */}
          {history.length > 0 ? (

            <>

              {/* 合計カロリー */}
              <div className="calorie">

                <h2>

                  <Icon
                    name="flame"
                    size={14}
                    strokeWidth={2.2}
                  />

                  保存した食事の合計

                </h2>

                <p className="stat-number">

                  {totalCalories}

                  <span>
                    kcal
                  </span>

                </p>

              </div>


              {/* =========================
                  履歴
              ========================= */}
              <div className="section">

                <div
                  style={{
                    display: 'flex',
                    justifyContent:
                      'space-between',
                    alignItems: 'center',
                    marginBottom:
                      '12px'
                  }}
                >

                  <h2 className="section-title">

                    保存履歴

                    <span className="count-pill">
                      {history.length}
                    </span>

                  </h2>


                  <button
                    onClick={
                      handleDeleteAll
                    }
                    className="delete-button"
                  >
                    🗑️ 全削除
                  </button>

                </div>


                <div className="list">

                  {history.map(
                    (item) => (

                      <div
                        key={item.id}
                        className="list-row list-row--stacked"
                      >

                        {/* 料理名 */}
                        <div
                          style={{
                            display: 'flex',
                            justifyContent:
                              'space-between',
                            alignItems:
                              'center',
                            gap: '10px'
                          }}
                        >

                          <strong>
                            {item.dish}
                          </strong>


                          <button
                            onClick={() =>
                              handleDelete(
                                item.id
                              )
                            }
                            className="delete-button"
                            title="削除"
                          >
                            🗑️
                          </button>

                        </div>


                        {/* カロリー */}
                        <p
                          style={{
                            fontSize:
                              '1.3rem',
                            fontWeight:
                              'bold',
                            margin:
                              '8px 0'
                          }}
                        >
                          🔥 {item.calories} kcal
                        </p>


                        {/* 日時 */}
                        <p className="caption">
                          {item.timestamp}
                        </p>


                        {/* 食材 */}
                        {item.ingredients &&
                          item.ingredients.length >
                            0 && (

                            <div
                              style={{
                                marginTop:
                                  '10px'
                              }}
                            >

                              <p className="caption">
                                食材
                              </p>

                              {item.ingredients.map(
                                (
                                  ingredient,
                                  index
                                ) => (

                                  <div
                                    key={index}
                                    className="list-row"
                                  >

                                    <span>
                                      {
                                        ingredient.name
                                      }
                                    </span>

                                    <span className="list-amount">
                                      {
                                        ingredient.amount
                                      }
                                    </span>

                                  </div>

                                )
                              )}

                            </div>

                          )}

                      </div>

                    )
                  )}

                </div>

              </div>

            </>

          ) : (

            /* =========================
               履歴なし
            ========================= */
            <div className="empty-state">

              <p>
                まだカロリーが保存されていません。
              </p>

              <p>
                AIで食事を分析して、
                カロリーを保存してみましょう。
              </p>

            </div>

          )}

        </div>

      </div>

    </div>
  );
}

export default CalorieHistory;