# AI LAB : LOCKDOWN

生成AIについて学びながら進む、ポイント＆クリック型SFストーリー教材です。移動や戦闘はなく、画面内の端末・ログ・AIコアと選択肢をクリックして最後まで遊べます。

## 起動

`index.html` をChromeまたはEdgeで開きます。ローカルファイルの制限がある場合は、このフォルダーで `python -m http.server 8000` を実行し、`http://localhost:8000` を開いてください。

## 授業用パスワード

簡易パスワードは `js/auth.js` 冒頭の `GAME_PASSWORD` で変更できます。初期値は `ai2026` です。認証状態はsessionStorageの `ai_lab_class_authenticated` に保存され、同じタブ内の再読み込みでは再入力不要です。静的サイト用の簡易制限であり、本格的なセキュリティ機能ではありません。

## 対応画面

PC、タブレット、スマートフォンに対応しています。スマートフォンではHUD、研究室、モーダル、問題選択肢、NOVA会話、エンディングを専用レイアウトへ切り替えます。長文モーダルは内部スクロールになり、主要ボタンは44px以上のタップ領域を確保します。

## 教材を改造する

- `js/questions.js`：5問の応用問題、選択肢、正解、解説と5区画の設定
- `js/game.js`：5種類の専用操作、行動計測、NOVAの適応反応、ストーリー進行
- `js/auth.js`：授業用簡易パスワードとsessionStorage認証
- `css/style.css`：研究施設とUIの見た目
- `css/responsive.css`：パスワード画面とモバイル・タブレット対応
- `js/sound.js`：外部音源を使わないWeb Audio効果音

問題を変えるだけなら `js/questions.js` を編集します。`answer` は0から数える正解番号です。ステージの `questionIds` に問題IDを追加すると、その区画で続けて出題されます。

```js
{
  id: "q01",
  stage: 1,
  category: "基礎",
  title: "起動認証",
  question: "問題文",
  choices: ["選択肢A", "選択肢B"],
  answer: 1,
  explanation: "正解後の解説",
  feedback: ["Aが違う理由", ""]
}
```

各区画は「手がかりを調査 → 専用操作 → NOVAの分析 → 施設変化」の順で進みます。操作はプロンプト構築、資料照合、情報マスク、生成物監査、最終命令の5種類です。進行状況と回答時間・修正回数はLocalStorage（`ai_lab_lockdown_story_v4`）へ自動保存されます。
