const content=document.getElementById("content");
const textarea=document.getElementById("textarea");
const hidden=document.getElementById("hidden")


function control_display(){
const post=document.getElementById("post")
const control=document.getElementById("control")

if(textarea.classList.contains("big_area")){
    textarea.classList.remove("big_area");
            hidden.textContent="非表示"
                hidden.style.bottom="30%"
}
    else if(hidden.style.bottom==="0px"){
    hidden.textContent="非表示"
    control.style.display="block"
    hidden.style.bottom="30%"
    post.style.display="block"
        content.style.bottom="calc(30% + 25px)"
    content.style.maxHeight="70%"

    }
    else{
    hidden.textContent="表示"
    control.style.display="none"
    hidden.style.bottom="0px"
    post.style.display="none"
        content.style.bottom="25px"
    content.style.maxHeight="100%"
    }
}

function text_big(){
    textarea.classList.add("big_area");
        hidden.textContent="縮小"
            hidden.style.bottom="22.5px"
}

const font_display_size = document.getElementById("font_size");
const space_display_px = document.getElementById("space_px");
const space_display_em=document.getElementById("space_em");
const line_display_px = document.getElementById("line_px");
const line_display_em=document.getElementById("line_em");
const font_display_weight=document.getElementById("font_weight");
let space="px"
let line="px"

space_display_px.addEventListener('input', function() {
        space_display_em.classList.add("disabled_number");
        space_display_px.classList.remove("disabled_number");
        space="px"
});

space_display_em.addEventListener('input', function() {
    space_display_px.classList.add("disabled_number");
    space_display_em.classList.remove("disabled_number");
            space="em"
});

line_display_px.addEventListener('input', function() {
    line_display_em.classList.add("disabled_number")
    line_display_px.classList.remove("disabled_number");
    line="px"
});

line_display_em.addEventListener('input', function() {
    line_display_px.classList.add("disabled_number");
    line_display_em.classList.remove("disabled_number");
            space="em"
});

function setting_default(type){
if(type==="font_size"){
    font_display_size.value="16"
}else if(type==="space_px"){
        space_display_px.value="0"
            space_display_px.style.letterSpacing="nomal"
}else if(type==="space_em"){
            space_display_em.value="0"
    space_display_em.style.letterSpacing="nomal"
}else if(type==="line_px"){
            line_display_px.value="0"
    line_display_px.style.lineHeight="normal"
}else if(type==="line_em"){
            line_display_em.value="0"
    line_display_em.style.lineHeight="normal"
}
else if(type==="font_weight"){
    font_display_weight.value="400"
}
else if(type==="ascii_size"){
    font_display_size.value="16"
}
}
const font_back_color_textarea=document.getElementById("font_back_color");
//         font_back_color_textarea.addEventListener('input', function() {
//             const font_back_color=document.getElementById("font_back_color").value;
// textarea.style.backgroundColor=font_back_color;
//         });

        const font_family_textarea = document.getElementById("font_family");
        font_family_textarea.addEventListener('change', function() {
            const font_family = document.getElementById("font_family").value;
            textarea.style.fontFamily=font_family;
        });

function post() {
    const font_size = document.getElementById("font_size").value + "px";
    const font_color = document.getElementById("font_color").value;
    const font_back_color=document.getElementById("font_back_color").value;
    const font_weight=document.getElementById("font_weight").value;

    // spaceとlineの値によって適切な入力値を取得
    let space_value = space === "px" ? parseFloat(space_display_px.value) : parseFloat(space_display_em.value);
    let line_value = line === "px" ? parseFloat(line_display_px.value) : parseFloat(line_display_em.value);

    space_value = space_value === 0 ? "normal" : space_value + (space === "px" ? "px" : "em");
    line_value = line_value === 0 ? "normal" : line_value + (line === "px" ? "px" : "em");

    const font_select = document.getElementById("font_select").value;
    const font_family = document.getElementById("font_family").value;

    let text = document.getElementById('textarea').value;

        // textが空の場合、boundary()だけ実行
        if (text.trim() === "") {
            boundary();
            textarea.value = ""; // テキストエリアをリセット
            return; // 処理を終了
        }
    
        //フォント対応
        content.style.fontFamily=font_family;
    
        //ダイス・コンマ関係
        text = dice_or_comma(text);

let URL_code=""

    const regex_URL = {
        "youtube": /(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^&\n]{11})/g,
        "niconico": /nicovideo\.jp\/watch\/([a-zA-Z0-9]+)/g,
        "dailymotion": /dailymotion\.com\/video\/([^_]+)/g,
        "vimeo": /vimeo\.com\/(\d+)/g,
        "bilibili": /bilibili\.com\/video\/(BV\w+)/g,
        "pornhub": /pornhub\.com\/view_video\.php\?viewkey=([^&]+)/g,
    "tikTok": /tiktok\.com\/@[^\/]+\/video\/(\d+)/g,
    };
    Object.entries(regex_URL).forEach(([key, regex]) => {

        let URL_found

        while ((URL_found = regex.exec(text)) !== null) {

            switch (key){
                case "youtube":
                case "dailymotion":
                case "pornhub":
                case "tiktok":
            URL_code=`<iframe 
            src="https://www.${key}.com/embed/${URL_found[1]}" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
            width="640" 
            height="360" 
            allowfullscreen>
        </iframe>`
        break;
        case "niconico":
            URL_code=`
            <iframe 
                src="https://embed.${key}.jp/watch/${URL_found[1]}" 
                width="640" 
                height="360" 
                allowfullscreen>
            </iframe>
        `;
            break;
            case "dailymotion":
                URL_code=`<iframe 
                src="https://www.${key}.com/embed/video/${URL_found[1]}" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                width="640" 
                height="360" 
                allowfullscreen>
            </iframe>`
            break;
            case "bilbil":
                URL_code = `
                <iframe 
                    src="https://player.${key}.com/player.html?bvid=${URL_found[1]}" 
                    width="640" 
                    height="360" 
                    allowfullscreen>
                </iframe>
            `;
                break;
            case "vimeo":
        URL_code = `
        <iframe 
            src="https://player.${key}.com/video/${URL_found[1]}" 
            width="640" 
            height="360" 
            allowfullscreen>
        </iframe>
    `;
            break;
            }
            const URL_out = text.replace(`https://www.${URL_found[0]}`, URL_code);
            content.innerHTML +=URL_out;
        }
    });

    if(!URL_code){
        //改行対応
    let format_text = text.replace(/\n/g, "<br>");
    let formattedText = '';
    if (font_select === "a") {
        formattedText = `<${font_select} style="font-size: ${font_size}; color: ${font_color}; font-family: ${font_family},sans-serif; background-color: ${font_back_color}; letter-spacing: ${space_value}; line-height: ${line_value}; font-weight:${font_weight};" href="${text}">${format_text}</${font_select}>`;
    } else {
        // textがurl、動画でない場合は、文章を指定されたフォントサイズと色で表示

        formattedText = `<${font_select} style="font-size: ${font_size}; color: ${font_color}; font-family: ${font_family},sans-serif; letter-spacing: ${space_value}; line-height: ${line_value}; font-weight:${font_weight}; white-space: nowrap; background-color: ${font_back_color};">${format_text}</${font_select}>`;
    }
        content.innerHTML += formattedText;
}


insert_decision=null
    //境界線
    boundary();

    //textareaリセット
        textarea.value=""
}


// クリックされた要素に光の効果を付ける関数
function onSpaceClick(event) {
    // すでに.highlight_spaceクラスを持つ要素を探してクラスを削除
    const current_highlight = document.querySelector('.highlight_space');
    if (current_highlight) {
        current_highlight.classList.remove('highlight_space');
    }

    // クリックされた要素に.highlight_spaceクラスを追加
    event.currentTarget.classList.add('highlight_space');
}


let response_count=0;
let auto_save_count=0;
// 既存の境界線をすべて取得
const boundaries = content.getElementsByClassName("boundary");

function boundary(){
    response_count++
    auto_save_count++

                // すべての境界線から特定のクラスを削除
                for (let i = 0; i < boundaries.length; i++) {
                    boundaries[i].classList.remove("highlight_space");
                }

            // 境界線を追加
            const newDiv = document.createElement('div');
            newDiv.className = 'boundary highlight_space';
            // newDiv.onclick = function() { insert(this); };
            newDiv.innerHTML = `<p style="float:left">投稿数<span class="response_count_span">${response_count}</span>　自動保存カウント${auto_save_count}</p>
                                <button onclick="delete_content(this)">削除</button>`;
            content.appendChild(newDiv);

            auto_save();

           // 最下部まで自動スクロール
            content.scrollTop = content.scrollHeight;
}

content.addEventListener('click', function(event) {
    if (event.target.classList.contains('boundary')) {
        insert(event.target);
    }
});

let insert_decision = null;

function insert(element) {
insert_decision = element; // クリックされたdivを記録

 console.log(element)
            const div_single = element.parentElement; // ボタンの親の div を取得
if(div_single){
            console.log(div_single)
                    // すべての境界線から特定のクラスを削除
                    const boundaries = document.getElementsByClassName("boundary");
                    for (let i = 0; i < boundaries.length; i++) {
                        boundaries[i].classList.remove("highlight_space");
                    }
        
                    // クリックされた境界線にハイライトクラスを追加
                    element.classList.add("highlight_space");
                }
}

function delete_content(element) {
//セーブカウント減少
auto_save_count--;

    const div_single = element.parentElement; // ボタンの親の div を取得
        // 親要素の兄妹要素を取得
        const div_parent = div_single.parentElement.children;
        const div_single_index = Array.from(div_parent).indexOf(div_single);

        
        // div_singleの前後の兄弟要素を取得（必要に応じて前後の要素を選択）
        const sibling = div_single_index > 0 ? div_parent[div_single_index - 1] : div_parent[div_single_index + 1];
                // 
                // 
                    // siblingがdiv要素かどうかを判断
    if (sibling instanceof HTMLDivElement) {
        div_single.remove();
    } else {
        sibling.remove();
        div_single.remove();
    }

    const response_count_span = document.getElementsByClassName('response_count_span');
    const response_count_span_count = response_count_span.length;

    if (response_count_span_count > 0) {

        for (let i = 0; i < response_count_span_count; i++) {
            // 1からの連続した数値を設定
            response_count_span[i].textContent = i + 1; // iは0から始まるため、+1して1から
            console.log(`要素${i + 1}: ${response_count_span[i].textContent}`);
        }
    } 
    response_count=response_count_span_count;
}

function border_button() {
    const boundarys = document.getElementsByClassName('boundary');

    // boundarysを配列のように扱うために、各要素のstyleを確認する必要があります。
    let allHidden = true; // すべての要素が非表示かどうかを確認するフラグ

    for (let i = 0; i < boundarys.length; i++) {
        if (boundarys[i].style.display === "none") {
            allHidden = false; // 1つでも表示されている場合はフラグをfalseにする
            break;
        }
    }

    if (allHidden) {
        // すべて非表示の場合、表示する
        for (let i = 0; i < boundarys.length; i++) {
            boundarys[i].style.display = "none";
        }
        document.getElementById("border").textContent = "境界線表示";
    } else {
        // 1つでも表示されている場合、非表示にする
        for (let i = 0; i < boundarys.length; i++) {
            boundarys[i].style.display = "flex";
            console.log("a")
        }
        document.getElementById("border").textContent = "境界線非表示";
    }
}

function function_description(type) {
    const element = document.getElementById(type);
    element.style.display = element.style.display === "none" ? "block" : "none";
  }

  function content_reset() {
    // ユーザーに確認を促す
    const userConfirmed = confirm("投稿した内容が全て消えます。本当によろしいですか？");

    // ユーザーが「OK」をクリックした場合にのみ、内容を消去する
    if (userConfirmed) {
        content.innerHTML = "";
    }
}

