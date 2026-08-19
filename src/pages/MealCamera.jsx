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


      // compress large images in-browser to avoid upload timeouts
      const compressImage = (dataUrl, maxWidth = 1024, quality = 0.8) => new Promise((resolve) => {
        const img = new Image();
        img.onload = () => {
          const ratio = Math.min(1, maxWidth / img.width);
          const canvas = document.createElement('canvas');
          canvas.width = Math.round(img.width * ratio);
          canvas.height = Math.round(img.height * ratio);
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
          const compressed = canvas.toDataURL('image/jpeg', quality);
          resolve(compressed);
        };
        img.onerror = () => resolve(dataUrl);
        img.src = dataUrl;
      });

      const apiBase = (() => {
        const host = window.location.hostname;
        // If running on a loca.lt frontend, map to the matching backend subdomain
        if (host.includes('loca.lt')) {
          const backendHost = host.replace('frontend', 'backend');
          return `${window.location.protocol}//${backendHost}`;
        }
        return `${window.location.protocol}//${host}:5010`;
      })();

      const payloadImage = await compressImage(image, 1024, 0.8);

      const response = await fetch(`${apiBase}/analyze`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ image: payloadImage }),
      });



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
