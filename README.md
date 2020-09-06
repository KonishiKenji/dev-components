# knowbe-mgr-v2

knowbe フロントエンドの v2 開発リポジトリです。

## 開発環境

- Language: [TypeScript](https://www.typescriptlang.org/)
- View Library: [React](https://ja.reactjs.org/)
- UI Framework: [Material-ui](https://material-ui.com/)

## 対応ブラウザ

- Google Chrome 最新版
- IE11, Edge（一部の画面でサポート）

## 規約

- [コーディングルール](https://github.com/mtl-git/knowbe-mgr-v2/wiki/%E3%82%B3%E3%83%BC%E3%83%87%E3%82%A3%E3%83%B3%E3%82%B0%E3%83%AB%E3%83%BC%E3%83%AB)

## 目次

- [環境構築](#環境構築)
  - [初期設定](#初期設定)
  - [ツール類](#ツール類)
  - [ローカルで動作確認](#ローカルで動作確認)

## 環境構築

### `初期設定`

※Mac を前提条件とした設定になります。

以下は必須

- [homebrew](https://brew.sh/)
- nodebrew + node

以下のコマンドを実行（2019.06.25 現在）

```
### install
$ brew install nodebrew

### install確認
$ brew list
nodebrew

### nodebrewセットアップ
$ nodebrew setup

### PATHを通すためのコマンドが表示されるのでそのままコピペ実行
$ export PATH=/user/local/var/nodebrew/current/bin:$PATH

### 環境変数の反映
$ source .bash_profile

### -bash:.bash_profile : No such file or directoryと表示される場合
### .bash_profileの作成
$ touch .bashrc
$ echo "if [ -f ~/.bashrc ] ; then
> . ~/.bashrc
> fi" > .bash_profile

### nodeインストール
$ nodebrew install-binary latest

### インストール後の確認
$ nodebrew list
v12.4.0

### 使用準備
$ nodebrew use latest
$ node -v
v12.4.0
$ npm -v
v6.9.0

### npmの更新
$ npm update -g npm
```

#### yarn

```
brew install yarn
```

### `ツール類`

- [Docker Desktop](https://docs.docker.com/docker-for-mac/install/) (※アカウント作成必須)
- [Sequal Pro](https://www.sequelpro.com/)  
  お好みのクライアントがあれば他のものでも構いません

- [Insomnia](https://insomnia.rest/)
- [VSCode](https://code.visualstudio.com/) (推奨)  
  TypeScript との相性や型の整合性や Null 安全性のチェックを自動検知するエディタ

  - 拡張プラグイン
    - [Prettier](https://qiita.com/Naturalclar/items/690be378984b3a24a138) (push した時にフォーマットを揃えるため CI で lint が走るので必ず入れてください)

- [Chrome](https://code.visualstudio.com/)
  - 拡張プラグイン
    - [React developer tools](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi?hl=ja)
    - [Redux devtools](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd/related?hl=ja)

他、上記以外に使用したい好みのアプリを使用して OK

### `ローカルで動作確認`

1. [knowbe-api](https://github.com/mtl-git/knowbe-api)リポジトリを clone
2. API 起動

   1. ターミナルから`knowbe-api`リポジトリに移動
   1. [README](https://github.com/mtl-git/knowbe-api/blob/develop/README.md) の通りコマンドを実行する
   1. `docker-compose up -d --build`でエラーになる場合は以下のコマンドでコンテナ、イメージを削除してから再チャレンジする

   - docker rmi `docker images -q`
   - docker rm -f `docker ps -a -q`

3. SequalPro を起動する

- 名前　　　　：任意
- ホスト　　　：localhost
- ユーザ名　　：root
- パスワード　：空白
- データベース：knowbe
- ポート　　　：3306

4. 「ファイル」＞「インポート」から dump データをインポートする。

5. API 確認

   1. Insomnia 起動
   2. config ファイルの読み込み
      起動時画面の「Import from File」ボタンをクリックし、knowbe-api 配下の knowbe_api_definition.json ファイルを選択する
   3. 以下の使い方を参考に API を叩く
      https://support.brightcove.com/ja/use-insomnia-api-requests#usingInsomnia

6. FRONT 起動

   - [knowbe-mgr-v2](https://github.com/mtl-git/knowbe-mgr-v2)リポジトリを clone

   - 以下のコマンドを実行する

   ```
   $ yarn ※初回のみ
   $ yarn start
   ```

   http://localhost:3000を叩いてページが表示されることを確認

7. ログイン確認ユーザ

| `role`   | `ID`                |
| -------- | ------------------- |
| mgradmin | ayingga+g@gmail.com |

※パスワードは password1

### `knowbe-mgrとの連携確認`

一部種別（A/B/IKOU）の機能は[knowbe-mgr](https://github.com/mtl-git/knowbe-mgr)からの移植が済んでおらず、ログイン時に振り分けて対応しています。  
そのためローカル環境でknowbe-mgrに飛ばしている処理を踏むとそこで止まるなどの問題が発生します。
以下、knowbe-mgrとknowbe-mgr-v2との連携箇所を確認するための手順

1. knowbe-mgrとknowbe-mgr-v2を同一ディレクトリに配置する
    ```
    .
    ├── knowbe-mgr
    └── knowbe-mgr-v2
    ```

2. ビルド実行
    - knowbe-mgrに移動
    - `docker-compose up -d --build`

3. 起動確認
   - http://localhost:3000 にアクセス

4. 修正反映

    hot reloadがないので手動で反映、リロードをする必要があります
    - knowbe-mgr-v2の場合
      - knowbe-mgr-v2に移動
      - `yarn build:local2`を実行
    - knowbe-mgrの場合
      - knowbe-mgrに移動
      - `yarn build:local`を実行
