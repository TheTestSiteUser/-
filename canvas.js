let canvas_count = 0; // canvas_countを関数外で宣言

function canvas_button() {
    const canvas_width = document.getElementById("canvas_width").value;
    const canvas_height = document.getElementById("canvas_height").value;
    const canvas_back_color = document.getElementById("canvas_back_color").value;
    const canvas_back_color_opacity = parseFloat(document.getElementById("canvas_back_color_opacity").value); // 数値に変換
    const canvas_back_opacity = parseFloat(document.getElementById("canvas_back_opacity").value); // 数値に変換
    const fileInput = document.getElementById("canvas_file_back");

    // 新しいキャンバス要素を追加
    const canvas_id = `drawing_canvas${canvas_count}`;
    const newCanvas = document.createElement("canvas");
    newCanvas.id = canvas_id;

    // 新しいキャンバス要素を取得
    document.getElementById("content").appendChild(newCanvas);

    // 背景色をRGBA形式で設定
    const rgbColor = hexToRgb(canvas_back_color); // hexからRGBを取得
    newCanvas.style.backgroundColor = `rgba(${rgbColor.r}, ${rgbColor.g}, ${rgbColor.b}, ${canvas_back_color_opacity})`; // 不透明度を設定

    newCanvas.style.opacity = canvas_back_opacity; // 不透明度を設定

    // canvasのサイズを設定
    newCanvas.width = canvas_width;  // 描画サイズを設定
    newCanvas.height = canvas_height; // 描画サイズを設定

    //CSSのサイズも設定
    newCanvas.style.width = `${canvas_width}px`;  // CSSの幅を設定
    newCanvas.style.height = `${canvas_height}px`; // CSSの高さを設定

    const file = fileInput.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(event) {
            const img = new Image();
            const canvas_img_check=document.getElementById("canvas_img_check");

    if(canvas_img_check.checked===true){
        img.onload = function() {
            // 画像の読み込みが完了した後にサイズを設定
            newCanvas.width = img.width;  // canvasの幅を画像の幅に設定
            newCanvas.height = img.height; // canvasの高さを画像の高さに設定
            newCanvas.style.width = `${img.width}px`;  
            newCanvas.style.height = `${img.height}px`; 
        };
        img.src = event.target.result; // 画像のソースを設定して読み込む
    }
                // CSSのサイズも画像に合わせて設定
                newCanvas.style.width = `${reader.width}px`;  
                newCanvas.style.height = `${reader.height}px`; 
            newCanvas.style.backgroundImage = `url(${event.target.result})`;
            newCanvas.style.backgroundSize = "contain"; // 背景画像を含むようにサイズ調整
            newCanvas.style.backgroundPosition = "center"; // 背景画像の位置を中央に
            newCanvas.style.backgroundRepeat = "no-repeat"; // 背景画像が繰り返さないように設定
        };

        reader.readAsDataURL(file); // 画像をDataURLとして読み込む
    }

    // 描画機能の追加
    addDrawingFunctionality(newCanvas);

    // 境界線の処理
    boundary();

    // キャンバスカウンタを増やす
    canvas_count++;
}

function addDrawingFunctionality(canvas) {
    const ctx = canvas.getContext("2d");
    let drawing = false;

    // マウスが押されたときの処理
    const startDrawing = (x, y) => {
        drawing = true;
        ctx.beginPath(); // 新しいパスを開始
        ctx.moveTo(x, y); // 開始点を設定
    };

    // マウスが移動したときの処理
    const draw = (x, y) => {
        if (drawing) {
            // ペンの色と太さをその都度更新
            ctx.strokeStyle = document.getElementById("canvas_pen_color").value; // 線の色
            ctx.lineWidth = document.getElementById("canvas_pen_size").value; // 線の太さ
            ctx.lineTo(x, y); // 線を引く
            ctx.stroke(); // 描画を実行
        }
    };

    // マウスが離されたときの処理
    const stopDrawing = () => {
        drawing = false;
        ctx.closePath(); // パスを閉じる
    };

    // マウスイベント
    canvas.addEventListener("mousedown", (e) => {
        startDrawing(e.offsetX, e.offsetY);
    });
    canvas.addEventListener("mousemove", (e) => {
        draw(e.offsetX, e.offsetY);
    });
    canvas.addEventListener("mouseup", stopDrawing);
    canvas.addEventListener("mouseleave", stopDrawing);

    // タッチイベント
    canvas.addEventListener("touchstart", (e) => {
        e.preventDefault(); // デフォルトのタッチイベントを防ぐ
        const touch = e.touches[0];
        startDrawing(touch.clientX - canvas.getBoundingClientRect().left, touch.clientY - canvas.getBoundingClientRect().top);
    });

    canvas.addEventListener("touchmove", (e) => {
        e.preventDefault(); // デフォルトのタッチイベントを防ぐ
        const touch = e.touches[0];
        draw(touch.clientX - canvas.getBoundingClientRect().left, touch.clientY - canvas.getBoundingClientRect().top);
    });

    canvas.addEventListener("touchend", stopDrawing);
}

// HEXカラーをRGB形式に変換する関数
function hexToRgb(hex) {
    const bigint = parseInt(hex.slice(1), 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;

    return { r, g, b };
}
