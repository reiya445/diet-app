# 🎯 ペナルティーアプリ（Penalty App）

目標達成をサポートする、楽しいペナルティー＆ご褒美アプリです！

日々の目標に対して、達成時はご褒美を、失敗時はペナルティーをランダムで獲得できます🎉

さらに、Gemini APIを利用したAI食事画像解析機能を搭載し、ダイエット管理をサポートします。

GitHub:
https://github.com/reiya445/diet-app


---

# 📋 概要

ダイエットや自己改善の目標達成を応援するWebアプリケーションです。

目標設定・達成判定・ご褒美・ペナルティー機能に加えて、
食事写真からAIが料理内容やカロリーを推定する機能を実装しています。


## 主な機能

- 📅 今日・今週・今月の3段階目標設定
- ✅ 目標達成 / ❌ 失敗判定
- 🎰 ご褒美・ペナルティーのランダム表示
- 💾 LocalStorageによるデータ保存
- 📸 AIによる食事画像解析
- 🔥 料理名・食材・カロリー推定
- 💡 AIによる食事改善アドバイス


---

# ✨ 主な機能


## 🏠 ホーム画面


┌─────────────────────────┐
│ 🎯 ペナルティーアプリ │
│ 目標達成を目指そう！ │
├─────────────────────────┤
│ 📅 今日の目標 │
│ 目標内容 │
│ [✅達成] [❌失敗] │
│ │
│ 📊 今週の目標 │
│ 目標内容 │
│ [✅達成] [❌失敗] │
│ │
│ 📈 今月の目標 │
│ 目標内容 │
│ [✅達成] [❌失敗] │
├─────────────────────────┤
│ 🎯目標設定 ⚠️罰ゲーム │
│ 🎁ご褒美 📸AI食事解析 │
└─────────────────────────┘



---

# 🎯 目標設定画面

今日・今週・今月の3種類から目標を設定できます。

設定した目標はホーム画面に表示されます。


機能：

- 期間選択
- 目標入力
- 目標変更
- 自動保存


---

# ⚠️ ペナルティー設定画面

失敗時に実行するペナルティーを登録できます。


例：

- スクワット30回
- 冷たいシャワー
- 好物禁止
- ゲーム禁止


登録したペナルティーからランダムで1つ選択されます。


---

# 🎁 ご褒美設定画面

目標達成時のご褒美を登録できます。


例：

- 好きなケーキを食べる
- 好きな映画を見る
- 欲しかった物を買う


登録したご褒美からランダムで1つ選択されます。


---

# 📸 AI食事画像解析機能

Gemini APIを利用して、食事写真から自動解析を行います。


## 解析内容

- 🍛 料理名
- 🥕 食材
- ⚖️ 推定量
- 🔥 推定カロリー
- 💡 食事改善アドバイス
- 🍳 翌日のおすすめレシピ


解析例：

```json
{
  "dish": "カツ丼とざるそばセット",
  "ingredients": [
    {
      "name": "豚ロースカツ",
      "amount": "約80g"
    },
    {
      "name": "ご飯",
      "amount": "150g"
    }
  ],
  "calories": 890,
  "advice": "野菜を追加すると栄養バランスが改善します"
}
🚀 クイックスタート
必要環境
Node.js 18以上
npm
アプリ起動（Netlify CLI）
git clone https://github.com/reiya445/diet-app.git

cd diet-app

npm install

netlify dev

ブラウザ：

http://localhost:8888

フロントエンドとAI解析API（Netlify Functions）が1つのコマンドでまとめて起動します。
🔑 Gemini API設定

AI解析はNetlifyにデプロイすると自動で有効になるAI Gatewayを利用しており、
Gemini APIキーを自分で発行・設定する必要はありません。

📁 ファイル構成
diet-app/

├── public/
│
├── src/
│   ├── App.jsx
│   ├── index.js
│   ├── index.css
│   │
│   └── pages/
│       ├── Home.jsx
│       ├── GoalSetting.jsx
│       ├── PenaltySetting.jsx
│       ├── RewardSetting.jsx
│       ├── CalorieCounter.jsx
│       ├── CalorieHistory.jsx
│       ├── MealCamera.jsx
│       └── MealResult.jsx
│
├── netlify/
│   └── functions/
│       └── analyze.mts
│
├── package.json
├── .gitignore
└── README.md
🛠 技術スタック
項目	技術
フロントエンド	React 18
UI	Tailwind CSS 3
状態管理	React Hooks
データ保存	LocalStorage
バックエンド	Netlify Functions
AI解析	Google Gemini（Netlify AI Gateway経由）
言語	JavaScript(JSX) / TypeScript(Functions)
開発環境	Create React App + Netlify CLI
パッケージ管理	npm
💾 データ保存

ブラウザのLocalStorageを利用してデータを保存します。

保存例：

{
  "goals": {
    "today": {
      "title": "3000kcal以下に抑える",
      "completed": false
    },
    "week": {
      "title": "毎日30分運動する",
      "completed": false
    },
    "month": {
      "title": "5kg減量する",
      "completed": false
    }
  },

  "penalties": [
    "スクワット30回"
  ],

  "rewards": [
    "好きなケーキを食べる"
  ]
}
🔄 ワークフロー
              ホーム画面

                   ↓

             目標設定

                   ↓

        ┌─────────────┐
        │             │
        ↓             ↓

    ✅達成          ❌失敗

        ↓             ↓

    🎁ご褒美       ⚠️ペナルティー

       


-----------------------------


       食事画像

          ↓

    MealCamera.jsx

          ↓

      Gemini API

          ↓

     AI画像解析

          ↓

    MealResult.jsx

          ↓

     結果表示
🚧 今後の改善予定
食事履歴保存機能
摂取カロリーグラフ表示
体重管理機能
達成率分析
ユーザー認証
データベース連携
スマホアプリ化
AIによる個別ダイエット提案
🐛 トラブルシューティング
npm installでエラーが出る場合
npm cache clean --force

npm install
ポートが使用されている場合
netlify dev --port 8889
Gemini APIエラーの場合

確認事項：

Netlifyへのデプロイが完了しているか（AI Gatewayは本番デプロイ後に有効化されます）
画像サイズが大きすぎないか
📄 License

MIT License

👤 作者

reiya445

GitHub:
https://github.com/reiya445

🎯 目標達成応援メッセージ

小さな目標の積み重ねが、大きな成果につながります。

楽しみながら継続できる習慣作りをサポートします💪


これを **README.md 全削除 → 全貼り付け → 保存** でOKです。