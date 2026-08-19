import React, { useState } from "react";
import Icon from "../assets/Icon";


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

              食事AI解析

            </h1>

          </div>


          <p className="page-subtitle">

            写真を1枚。カロリーは全部バレます。

          </p>



          <label className="dropzone">


            {image ? (

              <img

                src={image}

                alt="preview"

                className="preview"

              />

            ) : (

              <>

              <Icon name="camera" size={34} strokeWidth={1.4} />


              <strong>

                写真を選択

              </strong>


              <span>

                タップして食事の画像をアップロード

              </span>

              </>

            )}


            <input

              type="file"

              accept="image/*"

              onChange={handleImageChange}

              className="is-hidden"

            />


          </label>




          <button

            onClick={handleAnalyze}

            disabled={loading}

            className="btn btn--amber spacer-top"

          >

            <Icon name="spark" size={16} strokeWidth={2} />

            {loading

              ? "AI解析中..."

              : "AIで解析する"

            }


          </button>



        </div>


      </div>


    </div>

  );


}


export default MealCamera;
