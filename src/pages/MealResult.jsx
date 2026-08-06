import React from "react";


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

      <div className="p-6">

        <p>
          解析結果を読み込めませんでした
        </p>


        <button onClick={onBack}>

          戻る

        </button>

      </div>

    );

  }




  return (

    <div className="min-h-screen bg-green-50 p-5">


      <button

        onClick={onBack}

        className="text-green-700 font-bold mb-5"

      >

        ← 戻る

      </button>




      <div className="bg-white rounded-3xl shadow-lg p-6">


        <h1 className="text-3xl font-bold text-center text-green-700 mb-8">

          🤖 AI解析結果

        </h1>




        <div className="bg-green-100 rounded-2xl p-5 mb-5">


          <h2 className="font-bold text-lg">

            🍛 料理

          </h2>


          <p className="text-2xl font-bold mt-2">

            {data.dish}

          </p>


        </div>





        <div className="bg-blue-50 rounded-2xl p-5 mb-5">


          <h2 className="font-bold text-lg mb-3">

            🥕 食材

          </h2>


          <div className="space-y-2">


          {data.ingredients.map((item,index)=>(

            <div

              key={index}

              className="bg-white rounded-xl p-3 shadow-sm"

            >

              {item.name}

              <span className="float-right font-bold">

                {item.amount}

              </span>


            </div>

          ))}


          </div>


        </div>





        <div className="bg-orange-100 rounded-2xl p-5 mb-5 text-center">


          <h2 className="font-bold">

            🔥 推定カロリー

          </h2>


          <p className="text-5xl font-bold text-red-600 mt-2">

            {data.calories}

            <span className="text-2xl">

              kcal

            </span>

          </p>


        </div>





        <div className="bg-purple-50 rounded-2xl p-5 mb-6">


          <h2 className="font-bold text-lg mb-3">

            💡 AIアドバイス

          </h2>


          <p className="leading-relaxed">

            {data.advice}

          </p>


          <hr className="my-4"/>


          <h3 className="font-bold">

            🍳 明日のおすすめ

          </h3>


          <p className="mt-2">

            {data.tomorrow_recipe}

          </p>


        </div>





        <button

          className="w-full bg-green-600 text-white py-4 rounded-2xl text-xl font-bold"

        >

          💾 保存する

        </button>



      </div>


    </div>

  );


}


export default MealResult;