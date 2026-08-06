import React, { useState } from "react";


function MealCamera({ onBack, onNext }) {

  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);


  const handleImageChange = (e) => {

    const file = e.target.files[0];

    if (!file) return;


    const reader = new FileReader();


    reader.onload = (event) => {

      setImage(event.target.result);

    };


    reader.readAsDataURL(file);

  };



  const handleAnalyze = async () => {


    if (!image) {

      alert("画像を選択してください");

      return;

    }


    setLoading(true);


    try {


      const response = await fetch(

        "http://localhost:5010/analyze",

        {

          method: "POST",

          headers: {

            "Content-Type": "application/json",

          },

          body: JSON.stringify({

            image

          }),

        }

      );



      const data = await response.json();


      console.log(
        "Gemini結果:",
        data
      );


      onNext(data);



    } catch(error) {


      console.error(error);


      alert(
        "解析に失敗しました"
      );


    }


    setLoading(false);


  };



  return (

    <div className="min-h-screen bg-green-50 p-5">


      <button

        onClick={onBack}

        className="text-green-700 font-bold mb-5"

      >

        ← 戻る

      </button>



      <div className="bg-white rounded-3xl shadow-lg p-6">


        <h1 className="text-3xl font-bold text-center text-green-700">

          🍽️ 食事AI解析

        </h1>


        <p className="text-center text-gray-500 mt-2 mb-6">

          食事写真からカロリーを分析します

        </p>



        <label className="block cursor-pointer">


          <div className="border-2 border-dashed border-green-300 rounded-2xl p-5 text-center">


            {image ? (

              <img

                src={image}

                alt="preview"

                className="rounded-xl w-full"

              />

            ) : (

              <>

              <div className="text-5xl">

                📷

              </div>


              <p className="mt-3 text-gray-500">

                写真を選択

              </p>

              </>

            )}


          </div>


          <input

            type="file"

            accept="image/*"

            onChange={handleImageChange}

            className="hidden"

          />


        </label>





        <button

          onClick={handleAnalyze}

          disabled={loading}

          className="mt-6 w-full bg-green-600 hover:bg-green-700 text-white py-4 rounded-2xl text-xl font-bold shadow-md"

        >

          {loading

            ? "🤖 AI解析中..."

            : "🤖 AIで解析する"

          }


        </button>



      </div>


    </div>

  );


}


export default MealCamera;