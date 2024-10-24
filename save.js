function save() {
    const save_select = document.getElementById("save_select").value;
    const save_text = content.innerHTML; // コンテンツのテキストを取得
    let blob, link;

    // 一時的にスタイルを変更
    const originalStyle = content.style.cssText; // 元のスタイルを保存
    content.style.overflow = 'visible'; // オーバーフローを可視にする
    content.style.position = 'relative'; // 必要に応じて位置を変更
    content.style.width = 'auto'; // 幅を自動に
    content.style.height = 'auto'; // 高さを自動に

    // コンテンツの全体サイズを取得
    const contentRect = content.getBoundingClientRect();
    content.style.width = contentRect.width + 'px';
    content.style.height = contentRect.height + 'px';
if(content.hasChildNodes()){
    switch (save_select) {
        case "jpg":
        case "png":
        case "webp":
            html2canvas(content, { scale: 2, useCORS: true }).then(function(canvas) {
                canvas.toBlob(function(blob) {
                    link = document.createElement('a');
                    link.href = URL.createObjectURL(blob);
                    link.download = `capture.${save_select}`; // 保存するファイル名
                    link.click();
                }, `image/${save_select}`);
            }).catch(function(error) {
                console.error("エラー:", error);
            });
            break;
        case "txt":
            blob = new Blob([save_text], { type: 'text/plain' });
            link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.download = 'capture.txt';
            link.click();
            break;
        case "html":
            const htmlContent = "<html><head><title>Capture</title><style>" + cssContent + "</style></head><body>" + save_text + "</body></html>";
            blob = new Blob([htmlContent], { type: 'text/html' });
            link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.download = 'capture.html';
            link.click();
            break;
        default:
            alert("未対応の形式です。");
    }

    // スタイルを元に戻す
    content.style.cssText = originalStyle;
}
else{
    alert("内容がないよう")
}
}

const auto_save_check=document.getElementById("auto_save_check");
const save_display_number=document.getElementById("save_number");

// チェックボックスの状態に応じて.disabled_numberを切り替える関数
auto_save_check.addEventListener("change", () => {
    if (auto_save_check.checked) {
        save_display_number.classList.remove("disabled_number"); // チェックが入っていれば.disabled_numberを解除
    } else {
        save_display_number.classList.add("disabled_number"); // チェックが外れていれば.disabled_numberを追加
    }
});

function auto_save(){
    const save_number=document.getElementById("save_number").value;
    const auto_save_reset=document.getElementById("auto_save_reset");
    if(auto_save_check.checked===true){
        if(save_number<=auto_save_count){
            if(auto_save_reset.checked===true){
    save();
    auto_save_count=0;
    content.innerHTML = "";
}
else{
    save();
    auto_save_count=0; 
}
        }
    }
      }

      const cssContent = `
@font-face {
    font-family: 'IPA Gothic'; 
    src: url('font/IPAexfont00301/ipaexg.ttf') format('truetype');
}

@font-face {
    font-family: 'IPA Mincho'; 
    src: url('font/IPAexfont00301/ipaexm.ttf') format('truetype');
}

@font-face {
    font-family: 'ChilloutTYP-Regular'; 
    src: url('font/ChilloutTYP-Regular.otf') format('opentype');
}

@font-face {
    font-family: 'Anzumoji'; 
    src: url('font/APJapanesefont.ttf') format('truetype');
}

@font-face {
    font-family: 'Planetarium'; 
    src: url('font/Planetarium.otf') format('opentype');
}

@font-face {
    font-family: 'Buildingsandundertherailwaytracks-Regular'; 
    src: url('font/Buildingsandundertherailwaytracks-Regular.otf') format('opentype');
}

@font-face {
    font-family: 'Dancers'; 
    src: url('font/Dancers.otf') format('opentype');
}

@font-face {
    font-family: 'HannariMincho-Regular'; 
    src: url('font/HannariMincho-Regular.otf') format('opentype');
}

@font-face {
    font-family: 'Regular'; 
    src: url('font/TypingartGrotesqueTYP-Regular.woff') format('woff');
}

@font-face {
    font-family: 'Koku Mincho'; 
    src: url('font/font_1_kokumr_1.00_rls.ttf') format('truetype');
}

@font-face {
    font-family: 'Mona'; 
    src: url('font/mona-outline.ttf') format('woff2');
}

@font-face {
    font-family: 'Onryou'; 
    src: url('font/onryou.TTF') format('truetype');
}

@font-face {
    font-family: 'Kowai'; 
    src: url('font/ふぉんとうは怖い明朝体.otf') format('opentype');
}

@font-face {
    font-family: 'Ankoku'; 
    src: url('font/Zomzi.TTF') format('opentype');
}

@font-face {
    font-family: 'Chikara Duyoku'; 
    src: url('font/851CHIKARA-DZUYOKU_kanaA_004.ttf') format('opentype');
}

@font-face {
    font-family: 'Chikara Yowaku'; 
    src: url('font/851CHIKARA-YOWAKU_002.ttf') format('opentype');
}

@font-face {
    font-family: 'Monaco'; 
    src: url('font/monaco.ttf') format('opentype');
}

#content{
position: fixed;
bottom: calc(30% + 25px);
left: 0;
max-height: 70%;
overflow: auto;
display: flex;
flex-direction: column; /* 縦並びにする */
width: 100%;
top:0;
}
#content canvas{
    border: solid black;
    box-sizing: border-box; /* パディングを含めたサイズ計算 */
}
p{
    margin: 0;
}
input{
    background-color: white;
    color: black;
}
input[type="number"]{
    width: 50px;
}
input[type="color"],input[type="file"]{
    cursor: pointer;
}
select{
    width: 160px;
    cursor: pointer;
}
button{
    background-color: white;
}
button:hover,input:hover,select:hover{
    box-shadow: inset 0 0 10px 5px rgba(255, 255, 255, 0.5);  /* 内側に光の影 */
    background-color: black;
    color: white;
    cursor: pointer;
}
#control{
    background-color: white;
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100vw;
    height: 30%;
    border: solid black;
    box-sizing: border-box; /* パディングを含めたサイズ計算 */
    overflow: auto;
    padding-bottom: 25.5px;
}
#control > :nth-child(odd){
    border: solid black;
    box-sizing: border-box; /* パディングを含めたサイズ計算 */
    background-color: black;
    color: white;
}

#hidden{
    position: fixed;
bottom: 30%;
right:0;
width: 100%;
}
#post{
    position: fixed;
    right: 0;
    bottom: 0;
    width: 100%;
}
.normal_textarea{
    width: 95%;
}
.big_area{
    width: 100%;
    position: fixed;
    height: 100%;
    top: 0;
    left: 0;
    min-width: max-content; /* 子要素の幅を下回らないようにする */
    overflow: auto;
}
.disabled_number{
    background-color: gray;
}

/* CSS */
.highlight_space {
    box-shadow: inset 0 0 10px 5px rgba(255, 255, 255, 0.5);  /* 内側に光の影 */
    border: solid red;
}
.boundary{
    background-color: black;
    cursor: pointer;
    color: white;
    display: flex;                /* フレックスボックスを使用 */
    justify-content: space-between; /* 左右に要素を配置 */
    padding: 0 5px;
}
`;
