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


  } catch(error) {


    return (

      <div className="page">

        <div className="container">

          <div className="card">

            <p className="empty-state">
              解析結果を読み込めませんでした
            </p>


            <button onClick={onBack} className="btn btn--ghost spacer-top">

              戻る

            </button>

          </div>

        </div>

      </div>

    );

  }




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


          <div className="page-head" style={{ "--accent": "var(--amber)" }}>

            <Icon name="spark" size={22} />

            <h1 className="title-page">

              解析結果

            </h1>

          </div>


          <p className="page-subtitle">

            言い訳のきかない数字です。

          </p>




          <div className="calorie">


            <h2>

              <Icon name="flame" size={14} strokeWidth={2.2} />

              推定カロリー

            </h2>


            <p className="stat-number">

              {data.calories}

              <span>

                kcal

              </span>

            </p>


          </div>




          <div className="stat">


            <h2>

              料理

            </h2>


            <p className="stat-value">

              {data.dish}

            </p>


          </div>





          <div className="stat">


            <h2>

              食材

            </h2>


            <div className="list">


            {data.ingredients.map((item,index)=>(

              <div

                key={index}

                className="list-row"

              >

                <span>{item.name}</span>

                <span className="list-amount">

                  {item.amount}

                </span>


              </div>

            ))}


            </div>


          </div>





          <div className="stat">


            <h2>

              AIアドバイス

            </h2>


            <p className="stat-body">
              <p className="stat-body" style={{ fontSize: "1.5rem", fontWeight: "bold" }}>

              {data.advice}
              </p>
            </p>


            <hr className="divider"/>


            <h3>

              明日のおすすめ

            </h3>


            <p className="stat-body">
              <p className="stat-body" style={{ fontSize: "1.5rem", fontWeight: "bold" }}>

              {data.tomorrow_recipe}
              </p>
              

            </p>


          </div>





          <button

            className="btn spacer-top"

          >

            保存する

          </button>



        </div>


      </div>


    </div>

  );


}


export default MealResult;
