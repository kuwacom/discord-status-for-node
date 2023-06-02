# discord-status-for-node
[discord status](https://github.com/kuwacom/discord-status) の nodejs バージョン
# HowToUse
主な使い方は [discord status](https://github.com/kuwacom/discord-status) と全く同じです<br>
[discord status](https://github.com/kuwacom/discord-status) で保存した設定ファイルを直接利用することも可能です<br>
<br>
`index.js` があるのと同じディレクトリ内に `setting.json` と `config.json` を入れて `start.bat` で起動するだけです<br>

## config.json についての説明
各項目は以下のような機能です<br>
`botToken`: BOTのトークン<br>
`guildId`: `setting.json` 内で置換する用のGuildのID<br>
`interval`: `setting.json` の更新頻度<br>

## setting.json についての説明
以下のオプション内で `{total}` を利用すると `config.json` で設定した Guild のサーバー人数を埋め込み可能です<br>
例) `"details": "現在のサーバー人数 => {total}"`
<br>
```
status
details
partySize
partyMax
button1Label
button2Label
```