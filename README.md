# 建て替え自動精算アプリ

## 環境構築

```
node v20.12.2
npm v10.5.0
```

## expoのインストール
カレントディレクトリをAesomeProjectにします。
```
$ cd AwesomeProject 
```


npm(node package manager)で依存関係をインストールします。
```
npm install
```

## アプリを使う
次のコマンドを入力することで、アプリサーバが立ち上がります
```
npm start
```

すると、次のようなものがターミナルに出力されます。

```

> awesomeproject@1.0.0 start
> expo start

Starting project at /Users/{Home}/AppProjects/reim_app/AwesomeProject
Starting Metro Bundler
▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄
█ ▄▄▄▄▄ ██▀▀▄▄▄▀█▄█ ▄▄▄▄▄ █
█ █   █ █▀███ ▀▀▄▄█ █   █ █
█ █▄▄▄█ █▄▄█▀▀ ▄█▀█ █▄▄▄█ █
█▄▄▄▄▄▄▄█▄█ ▀▄█▄█▄█▄▄▄▄▄▄▄█
█▄▄█▀█▄▄▄▀ █▄▀ █  ▀██ ▄▀▀██
█▀▄▀▀▄▀▄▀▀▀▄█▀██ ▀█▄▀ ▄█▄ █
█▀▀▀█ ▀▄▄ ▄█▄▄█ ▀▄ ▄▄██▀ ██
█ ██▄▀█▄▀ ▄▀ ▄█▀ ▄▀▄█▀▄   █
█▄██▄█▄▄█ ▄▀▄▀ ▀  ▄▄▄   ▄▄█
█ ▄▄▄▄▄ █ ██▄▀▄▄█ █▄█ ██▀▄█
█ █   █ ██▀██▄▄█▄▄▄  ▄ ▄  █
█ █▄▄▄█ █▀ ▀ ▄█▀█ ▄▀▀██▄█ █
█▄▄▄▄▄▄▄█▄███▄▄▄▄▄██▄▄███▄█

› Metro waiting on exp://10.233.7.144:8081
› Scan the QR code above with Expo Go (Android) or the Camera app (iOS)

› Using Expo Go
› Press s │ switch to development build

› Press a │ open Android
› Press i │ open iOS simulator
› Press w │ open web

› Press j │ open debugger
› Press r │ reload app
› Press m │ toggle menu
› Press o │ open project code in your editor

› Press ? │ show all commands

Logs for your project will appear below. Press Ctrl+C to exit.

```

iphoneの場合は出力されたあQRコードをカメラで読み取るとexpoでアプリが起動する