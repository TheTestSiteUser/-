const ascii_art = document.getElementById('ascii_art');
const ascii_class=document.getElementById("ascii_class");
const ascii_button=document.getElementById("ascii_button")
let originalWidth = null; // 元の幅を保持する変数

function ascii_display(){
    ascii_class.style.display="block"
    content.style.display="none"
    ascii_button.textContent="画像変換アスキーアート表示解除"
    ascii_art.style.color=document.getElementById("ascii_color").value;
    ascii_art.style.backgroundColor=document.getElementById("ascii_back_color").value;
    ascii_art.style.fontSize=document.getElementById("ascii_size").value+"px";
    ascii_art.style.fontFamily=document.getElementById("ascii_family").value+", monospace";
}

ascii_button.addEventListener('click', function() {
if(ascii_class.style.display==="block"){
    ascii_class.style.display="none"
    content.style.display="block"
ascii_button.textContent="画像変換アスキーアート表示"
}
else if(ascii_class.style.display==="none"){
    ascii_class.style.display="block"
    content.style.display="none"
    ascii_button.textContent="画像変換アスキーアート表示解除"
}
})

function ascii_save() {
    const type = document.getElementById("ascii_select").value;

    if (ascii_art) {
        // スタイルを取得
        const style = window.getComputedStyle(ascii_art);
        // const fontSize = parseFloat(style.fontSize);
        // const fontFamily = style.fontFamily;

        // 一文字の幅を計測
        const span = document.createElement('span');
        span.style.fontSize = style.fontSize;
        span.style.fontFamily = style.fontFamily;
        span.style.visibility = 'hidden';
        span.style.whiteSpace = 'pre';
        span.textContent = 'M'; // 幅の広い文字を使用
        document.body.appendChild(span);

        const charWidth = span.getBoundingClientRect().width;
        document.body.removeChild(span);

        // テキストを取得
        const text = ascii_art.textContent || ascii_art.innerText;
        const lines = text.split('\n');
        const maxLineLength = Math.max(...lines.map(line => line.length));

        // 幅を計算
        const ascii_width = charWidth * maxLineLength;

        // 元の幅を保存
        if (originalWidth === null) {
            originalWidth = ascii_art.style.width; // 元の幅を保存
        }

        // 一時的に幅を設定
        ascii_art.style.width = `${ascii_width}px`;
console.log(type)
        switch (type) {
            case 'jpg':
            case 'png':
            case 'webp':
                html2canvas(ascii_art, { scale: 2, useCORS: true })
                    .then(function (canvas) {
                        canvas.toBlob(function (blob) {
                            const link = document.createElement('a');
                            link.href = URL.createObjectURL(blob);
                            link.download = `capture.${type}`;
                            link.click();
                        }, `image/${type}`);
                    })
                    .catch(function (error) {
                        console.error("エラー:", error);
                    });
                break;

            case 'txt':

                // TXTとしてダウンロードする処理
                const txtBlob = new Blob([text], { type: 'text/plain' });
                const txtLink = document.createElement('a');
                txtLink.href = URL.createObjectURL(txtBlob);
                txtLink.download = 'ascii_art.txt';
                txtLink.click();
                break;

            case 'html':
                const htmlContent = `
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <title>ASCIIアート</title>
    <style>
        pre {
            color: ${document.getElementById("ascii_color").value};
            background-color: ${document.getElementById("ascii_back_color").value};
            font-size: ${document.getElementById("ascii_size").value + "px"};
            font-family:${document.getElementById("ascii_family").value+", monospace"};
        }
    </style>
</head>
<body>
<div style="width: fit-content;">
    <pre>${text}</pre>
    </div>
</body>
</html>
`;
                const htmlBlob = new Blob([htmlContent], { type: 'text/html' });
                const htmlLink = document.createElement('a');
                htmlLink.href = URL.createObjectURL(htmlBlob);
                htmlLink.download = 'ascii_art.html';
                htmlLink.click();
                break;

            default:
                console.warn("不明なファイル形式:", type);
        }

        // 画像保存後に元の幅に戻す
        ascii_art.style.width = originalWidth;
        originalWidth = null; // 幅を元に戻したら、元の幅をリセット
    }
}
