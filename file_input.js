// input要素のイベントリスナーを設定
document.getElementById('file_input').addEventListener('change', function(event) {
    const file = event.target.files[0]; // 選択された最初のファイルを取得

    if (file) {
        const reader = new FileReader();

        reader.onload = function(e) {
            const fileContent = e.target.result;

            // ファイルタイプに応じてinnerHTMLを追加
            if (file.type.startsWith("image/")) {
                // 画像ファイルの場合
                content.innerHTML += `<img src="${fileContent}" alt="選択された画像" style="max-width: 300px;">`;
            } else if (file.type.startsWith("audio/")) {
                // 音楽ファイルの場合
                content.innerHTML += `<audio controls src="${fileContent}"></audio>`;
            } else if (file.type.startsWith("video/")) {
                // 動画ファイルの場合
                content.innerHTML += `<video controls src="${fileContent}" style="max-width: 300px;"></video>`;
            } else if (file.type === "text/plain" || file.type === "text/csv") {
                // テキストファイルの場合
                content.innerHTML += `<pre>${fileContent}</pre>`;
            } else {
                // その他のファイルタイプの場合
                content.innerHTML += `<p>対応していないファイル形式です: ${file.name}</p>`;
            }
            // 境界線
            boundary();
        };

        // ファイル内容をテキストとして読み込むか、Data URLとして読み込むかを選択
        if (file.type === "text/plain" || file.type === "text/csv") {
            reader.readAsText(file, 'utf-8');
        } else {
            reader.readAsDataURL(file);
        }

        // 同じファイルを選択してもイベントを発生させるためにinputをリセット
        file_input.value = '';
    }
});