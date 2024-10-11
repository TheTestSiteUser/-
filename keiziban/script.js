const content=document.getElementById("content")
const text=document.getElementById("text").value

function control_display(){
const post=document.getElementById("post")
const hidden=document.getElementById("hidden")
const control=document.getElementById("control")

    if(hidden.style.bottom==="0px"){
    hidden.textContent="非表示"
    control.style.display="block"
    hidden.style.bottom="30%"
    post.style.display="block"
    content.style.height="70%"
    }
    else{
    hidden.textContent="表示"
    control.style.display="none"
    hidden.style.bottom="0px"
    content.style.height="100%"
    post.style.display="none"
    }
}

function text_big(){
}


function post() {
    const font_size = document.getElementById("font_size").value + "px";
    const font_color = document.getElementById("font_color").value;
    const font_select = document.getElementById("font_select").value;
    const font_family = document.getElementById("font_family").value;

    const url = document.getElementById('text').value;
    const videoId = getYouTubeID(url) || getNicoNicoID(url) || getDailymotionID(url) || getVimeoID(url) || getBilibiliID(url) || getTwitchID(url) || getPornhubID(url) || getTikTokID(url) || getFacebookWatchID(url);

    // 動画IDが有効かどうかチェック
    if (videoId) {
        if (url.includes('youtube.com') || url.includes('youtu.be')) {
            // YouTube動画を埋め込む
            content.innerHTML += `
                <iframe 
                    src="https://www.youtube.com/embed/${videoId}" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowfullscreen>
                </iframe>
            `;
        } else if (url.includes('nicovideo.jp')) {
            // ニコニコ動画を埋め込む
            content.innerHTML += `
                <iframe 
                    src="https://embed.nicovideo.jp/watch/${videoId}" 
                    width="640" 
                    height="360" 
                    allowfullscreen>
                </iframe>
            `;
        } else if (url.includes('dailymotion.com')) {
            // Dailymotion動画を埋め込む
            content.innerHTML += `
                <iframe 
                    src="https://www.dailymotion.com/embed/video/${videoId}" 
                    width="640" 
                    height="360" 
                    allowfullscreen>
                </iframe>
            `;
        } else if (url.includes('vimeo.com')) {
            // Vimeo動画を埋め込む
            content.innerHTML += `
                <iframe 
                    src="https://player.vimeo.com/video/${videoId}" 
                    width="640" 
                    height="360" 
                    allowfullscreen>
                </iframe>
            `;
        } else if (url.includes('bilibili.com')) {
            // Bilibili動画を埋め込む
            content.innerHTML += `
                <iframe 
                    src="https://player.bilibili.com/player.html?bvid=${videoId}" 
                    width="640" 
                    height="360" 
                    allowfullscreen>
                </iframe>
            `;
        } else if (url.includes('twitch.tv')) {
            // Twitch動画を埋め込む
            const username = url.split('/')[3]; // ユーザー名を取得
            content.innerHTML += `
    <iframe 
        src="https://player.twitch.tv/?channel=${username}&parent=example.com&parent=www.example.com" 
        width="640" 
        height="360" 
        allowfullscreen>
    </iframe>
            `;
        } else if (url.includes('pornhub.com')) {
            // Pornhub動画を埋め込む
            content.innerHTML += `
                <iframe 
                    src="https://www.pornhub.com/embed/${videoId}" 
                    width="640" 
                    height="360" 
                    allowfullscreen>
                </iframe>
            `;
        } else if (url.includes('tiktok.com')) {
            // TikTok動画を埋め込む
            content.innerHTML += `
                <iframe 
                    src="https://www.tiktok.com/embed/${videoId}" 
                    width="640" 
                    height="360" 
                    allowfullscreen>
                </iframe>
            `;
        } else if (url.includes('facebook.com')) {
            // Facebook Watch動画を埋め込む
            content.innerHTML += `
                <iframe 
                    src="https://www.facebook.com/plugins/video.php?href=https://www.facebook.com/watch?v=${videoId}" 
                    width="640" 
                    height="360" 
                    allowfullscreen>
                </iframe>
            `;
        }
    } else {
        if(font_select==="a"){
            content.innerHTML += `<${font_select} style="font-size: ${font_size}; color: ${font_color}; font-family: ${font_family};" href="${url}">${url}</${font_select}>`;
        }
        else{
            // URLが動画でない場合は、文章を指定されたフォントサイズと色で表示
            content.innerHTML += `<${font_select} style="font-size: ${font_size}; color: ${font_color}; font-family: ${font_family};">${url}</${font_select}>`;
        }
    }
}

// 各動画IDを取得する関数
function getYouTubeID(url) {
    const regex = /(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^&\n]{11})/;
    const match = url.match(regex);
    return match ? match[1] : null;
}

function getNicoNicoID(url) {
    const regex = /nicovideo\.jp\/watch\/([a-zA-Z0-9]+)/;
    const match = url.match(regex);
    return match ? match[1] : null;
}

function getDailymotionID(url) {
    const regex = /dailymotion\.com\/video\/([^_]+)/;
    const match = url.match(regex);
    return match ? match[1] : null;
}

function getVimeoID(url) {
    const regex = /vimeo\.com\/(\d+)/;
    const match = url.match(regex);
    return match ? match[1] : null;
}

function getBilibiliID(url) {
    const regex = /bilibili\.com\/video\/(BV\w+)/;
    const match = url.match(regex);
    return match ? match[1] : null;
}

function getTwitchID(url) {
    const regex = /twitch\.tv\/([^\/]+)/; // ユーザー名を取得する正規表現
    const match = url.match(regex);
    return match ? match[1] : null;
}

function getPornhubID(url) {
    const regex = /pornhub\.com\/view_video\.php\?viewkey=([^&]+)/;
    const match = url.match(regex);
    return match ? match[1] : null;
}

// TikTok動画IDを取得する関数
function getTikTokID(url) {
    const regex = /tiktok\.com\/@[^\/]+\/video\/(\d+)/;
    const match = url.match(regex);
    return match ? match[1] : null;
}

// Facebook Watch動画IDを取得する関数
function getFacebookWatchID(url) {
    const regex = /facebook\.com\/watch\?v=([^&]+)/;
    const match = url.match(regex);
    return match ? match[1] : null;
}
