function dice() {
    const dice_select = document.getElementById("dice_select").value;

    const dice_up_limit=document.getElementById("dice_up_limit").value;
    const dice_down_limit=document.getElementById("dice_down_limit").value;

    // 選択された値に基づいて処理を分岐
    switch (dice_select) {
        case 'dice_only':
textarea.value+=`[D:max[${dice_up_limit}][+${dice_down_limit}][=]]`
            break;
        case 'dice_combo':
textarea.value+=`[D:max[${dice_up_limit}][+${dice_down_limit}]:combo[][+][=][計算値:]]`;
break;
        case 'dice_prime':
textarea.value+=`[D:max[${dice_up_limit}][+${dice_down_limit}][=][素数:]]`
            // 素数ダイスの機能をここに追加
            break;
        case 'dice_multiple':
textarea.value+=`[D:max[${dice_up_limit}][+${dice_down_limit}]:goal[][=][倍数:]]`
            // 公倍数ダイスの機能をここに追加
            break;
        case 'dice_loop':
textarea.value+=`[D:max[${dice_up_limit}][+${dice_down_limit}]:goal[][=][回数:]]`
            // ループダイスの機能をここに追加
            break;
        case 'dice_alphabet':
textarea.value+=`[D:A~z:[${dice_up_limit}][Aa][=]]`
            // アルファベットダイスの機能をここに追加
            break;
        case 'dice_Syllabary':
textarea.value+=`[D:あ~ン:[${dice_up_limit}][仮][両][小][伸][=]]`
            // 五十音ダイスの機能をここに追加
            break;
        case 'dice_triangle':
textarea.value+=`[D:max[${dice_up_limit}][+${dice_down_limit}]max[${dice_up_limit}][+${dice_down_limit}]max[${dice_up_limit}][+${dice_down_limit}][=][面積:]]`
            break;
            case 'dice_circle':
textarea.value+=`[D:Dmax[${dice_up_limit}][+${dice_down_limit}]Amax[${dice_up_limit}][+${dice_down_limit}]Amax[${dice_up_limit}][+${dice_down_limit}][=][円面積:][赤扇面積:][青扇面積:]]`
            break;        
        case 'time_years':
textarea.value+=`[T:年月日時分秒]`
            break;
            case 'time_comma':
textarea.value+=`[T:秒]`
            break;
        case 'none':
        default:
            // ダイスなしの機能をここに追加
            break;
    }
}

const regexList = {
    "dice_only": /\[D:max\[(\d+)\]\[([%+]\d+)\]\[=\]\]/g,
    "dice_combo": /\[D:max\[(\d+)\]\[([%+]\d+)\]:combo\[(\d+)\]\[(\+|\*)\]\[=\]\[計算値:\]\]/g,
    "dice_prime": /\[D:max\[(\d+)\]\[([%+]\d+)\]\[=\]\[素数:\]\]/g,
    "dice_multiple": /\[D:max\[(\d+)\]\[([%+]\d+)\]:goal\[(\d+)\]\[=\]\[倍数:\]\]/g,
    "dice_loop": /\[D:max\[(\d+)\]\[([%+]\d+)\]:goal\[(\d+)\]\[=\]\[回数:\]\]/g,
    "dice_alphabet": /\[D:A~z:\[(\d+)\]\[([Aa]|Aa)\]\[=\]\]/g,
"dice_Syllabary": /\[D:あ~ン:\[(\d+)\]\[(仮|平|片)\]\[(全|両|濁|半)\]\[(小)\]\[(伸)\]\[=\]\]/g,
    "dice_triangle": /\[D:max\[(\d+)\]\[([%+]\d+)\]max\[(\d+)\]\[([%+]\d+)\]max\[(\d+)\]\[([%+]\d+)\]\[=\]\[面積:\]\]/g,
    "dice_circle": /\[D:Dmax\[(\d+)\]\[([%+]\d+)\]Amax\[(\d+)\]\[([%+]\d+)\]Amax\[(\d+)\]\[([%+]\d+)\]\[=\]\[円面積:\]\[赤扇面積:\]\[青扇面積:\]\]/g,
    "time_years": /\[T:年月日時分秒\]/g,
    "time_comma": /\[T:秒\]/g,
};

function dice_or_comma(text) {
    Object.entries(regexList).forEach(([key, regex]) => {
        let found;
        while ((found = regex.exec(text)) !== null) {
            const values = found.slice(1).map(Number); // 取得した値を数値に変換
            const max = parseInt(found[1], 10);
            const min = parseInt(found[2], 10);

            const max2 = values[2];
            const max3 = values[4];

            const generatedValues = [];


const dice1 = MAX_MIN_DICE(found[2], max);
const dice2 = MAX_MIN_DICE(found[4], max2);
const dice3 = MAX_MIN_DICE(found[6], max3);

            switch (key) {
                case "dice_only":
                    // [=] の部分を更新
                    text = text.replace(/\[=\]/, `[=${dice1}]`);
                    break;

                    case "dice_combo":
                        const combo = parseInt(found[3], 10);
                        const operation = found[4];
                        let results = [];
                        let resultValue = (operation === "+" || operation === "-") ? 0 : 1;
                        let calculationLog = "";
    
for (let i = 0; i < combo; i++) {
        const dice1 = Math.floor(Math.random() * (max - min + 1)) + min;
        results.push(dice1);

        switch (operation) {
            case "+":
                resultValue += dice1;
                calculationLog += (i === 0 ? "" : " + ") + dice1;
                break;
            case "*":
                resultValue *= dice1;
                calculationLog += (i === 0 ? "" : " * ") + dice1;
                break;
        }
    }
                        text = text.replace(/\[=\]/, `[=${results.join(operation)}]`).replace(/\[計算値:\]/, `[計算値:${resultValue}]`);
                        break;

                case "dice_prime":
                    // 素数の判定
                    const isRandomPrime = isPrime(dice1);
                    text = text.replace(/\[=\]/, `[=${dice1}]`);
                    text = text.replace(/\[素数:\]/, `[素数:${isRandomPrime ? "YES" : "NO"}]`);
                    break;

                case "dice_multiple":
                    // 目標の倍数判定
                    const goal = parseInt(found[3], 10); // 目標値を取得
                    const isMultiple = (dice1 % goal === 0);

                    text = text.replace(/\[=\]/, `[=${dice1}]`);
                    text = text.replace(/\[倍数:\]/, `[倍数:${isMultiple ? "YES" : "NO"}]`);
                    break;

                    case "dice_loop":
                        const goalLoop = parseInt(found[3], 10); // 目標値を取得
                        let loopCount = 0;
                        let generatedValue;
                        const loop_values = []; // 生成した乱数を格納する配列
                    
                        do {
                            generatedValue = Math.floor(Math.random() * (max - min + 1)) + min; 
                            loop_values.push(generatedValue); // 生成した値を配列に追加
                            loopCount++;
                        } while (generatedValue !== goalLoop);
                    
                        // 生成した乱数の一覧を、[=] の部分に表示するために結合
                        const allGeneratedValues = loop_values.join(", ");
                    
                    
                        // 最後に生成した乱数を表示
                        text = text.replace(/\[=\]/, `[=${allGeneratedValues}]`); // すべての生成された乱数を表示
                        text = text.replace(/\[回数:\]/, `[回数:${loopCount}]`);
                        break;
                    

                case "dice_alphabet": {
                    generatedValues.push(getRandomAlphabets(max, found[2]));
                    break;
                }
                case "dice_Syllabary":{
                    const dakutenOption = found[3] || ''; // 濁点オプション
                    const smallOption = found[4] || ''; // 小文字オプション
                    const extendOption = found[5] || ''; // 伸ばし棒オプション
                    const generatedValues = getRandomSyllabary(max, found[2], dakutenOption, smallOption, extendOption);
                    text = text.replace(/\[=\]/, `[=${generatedValues}]`);
                    break;
                }
                case "dice_triangle":{

    // 3つの頂点のy座標をランダムに生成
    const y1 = dice1;
    const y2 = dice2;
    const y3 = dice3;

    text = text.replace(/\[=\]/, `[=${y1},${y2},${y3}]`);
    // x座標は50ずつずらして設定
    const x1 = 0;
    const x2 = 50;
    const x3 = 100;

    // 三角形の面積を計算
    const area = Math.abs((x1 * (y2 - y3) + x2 * (y3 - y1) + x3 * (y1 - y2)) / 2);

    // テキストに置き換え
    text = text.replace(/\[面積:\]/, `[面積:${area}]`);

    // Canvasで描画
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = 300;
    canvas.height = 300;

    ctx.fillStyle = 'black'; // 背景色を黒に設定
ctx.fillRect(0, 0, canvas.width, canvas.height); // Canvas全体を塗りつぶす

    // 三角形を描画
    ctx.fillStyle = 'red';
    ctx.beginPath();
    ctx.moveTo(x1 + 100, 300 - y1); // y座標を反転させる
    ctx.lineTo(x2 + 100, 300 - y2);
    ctx.lineTo(x3 + 100, 300 - y3);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // Canvasを画像に変換
    const imgSrc = canvas.toDataURL();

text+=`<br><img src="${imgSrc}">`;
break;
                }
                case "dice_circle":{
    // 3つの頂点のy座標をランダムに生成
    const diameter = dice1;
    const angle1 = dice2;
    const angle2 = dice3;

    text = text.replace(/\[=\]/, `[=${diameter},${angle1},${angle2}]`);
    
    const radius = diameter / 2;
    const circleArea = Math.ceil(Math.PI * radius * radius);
    const sectorArea1 = Math.ceil((angle1 / 360) * Math.PI * radius * radius);
    const sectorArea2 = Math.ceil((angle2 / 360) * Math.PI * radius * radius);
    const totalSectorArea = sectorArea1 + sectorArea2;

    const remainingArea = circleArea - totalSectorArea;
    // テキストに置き換え
    text = text.replace(/\[円面積:\]/, `[円面積:${circleArea}]`);
    text = text.replace(/\[赤扇面積:\]/, `[赤扇面積:${remainingArea}]`);
    text = text.replace(/\[青扇面積:\]/, `[青扇面積:${sectorArea1}]`);


            // グラフ描画
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            canvas.width = 300;
            canvas.height = 300;
        
            ctx.fillStyle = 'black'; // 背景色を黒に設定
        ctx.fillRect(0, 0, canvas.width, canvas.height); // Canvas全体を塗りつぶす

            // 円の描画
            ctx.beginPath();
            ctx.arc(150, 150, radius * 2, 0, Math.PI * 2);
            ctx.fillStyle = 'red';
            ctx.fill();
            ctx.stroke();

            // 扇の描画
            ctx.beginPath();
            ctx.moveTo(150, 150); // 円の中心
            ctx.arc(150, 150, radius * 2, (angle1 - 90) * Math.PI / 180, (angle1 + angle2 - 90) * Math.PI / 180);
            ctx.closePath();
            ctx.fillStyle = 'blue';
            ctx.fill();
            ctx.stroke();
        // Canvasを画像に変換
        const imgSrc = canvas.toDataURL();

        text+=`<br><img src="${imgSrc}">`;
                    break;
                }
                case "time_years":{
                    // 現在の日付と時間を取得
const now = new Date();

// 年、月、日を取得
const year = now.getFullYear(); // 年
const month = now.getMonth() + 1; // 月 (0から始まるため、1を加える)
const day = now.getDate(); // 日

// 時間、分、秒を取得
const hours = now.getHours(); // 時間
const minutes = now.getMinutes(); // 分
const seconds = now.getSeconds(); // 秒

                    text = text.replace(/年月日時分秒/, `${year}年${month}月${day}日${hours}時${minutes}分${seconds}秒`);
                    break;}
            case "time_comma":{
                const now = new Date();
const milliseconds = now.getTime() % 1000; // 1000で割った余りがミリ秒
const seconds = now.getSeconds() + milliseconds / 1000;
text = text.replace(/秒/, `${seconds.toFixed(3)}秒`);
                break;}
            }

            const generatedString = generatedValues.join(",");
            text = text.replace(/\[=\]/, `[=${generatedString}]`);
        }
    });

    return text;
}

function isPrime(num) {
    if (num <= 1) return false;
    for (let i = 2; i <= Math.sqrt(num); i++) {
        if (num % i === 0) return false;
    }
    return true;
}

function getRandomAlphabets(count, type) {
    const lowerCase = 'abcdefghijklmnopqrstuvwxyz';
    const upperCase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let selectedChars = '';

    if (type === 'a') {
        selectedChars = lowerCase;
    } else if (type === 'A') {
        selectedChars = upperCase;
    } else if (type === 'Aa') {
        selectedChars = lowerCase + upperCase; // 大文字小文字混合
    }

    const randomAlphabets = [];
    for (let i = 0; i < count; i++) {
        const randomIndex = Math.floor(Math.random() * selectedChars.length);
        randomAlphabets.push(selectedChars[randomIndex]);
    }

    return randomAlphabets.join(','); // カンマで区切る
}

function getRandomSyllabary(count, type, dakutenOption, includeSmall, includeBar) {
    // 五十音表（ひらがな・カタカナ）

    const hiragana="あいうえおかきくけこさしすせそたちつてとなにぬねのはひふへほまみむめもやゆよらりるれろわをん"
    const katakana="アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン"
    const small = 'ぁぃぅぇぉゃゅょァィゥェォャュョ';
    const dakuten = 'がぎぐげござじずぜぞだぢづでどばびぶべぼガギグゲゴザジズゼゾダヂヅデドバビブベボ';
    const handakuten = 'ぱぴぷぺぽパピプペポ';

    // ベースの文字セットを作成
    let syllabary = '';
    if (type === '仮') {
        syllabary = hiragana + katakana;
    }
    else if (type === '平') {
        syllabary = hiragana;
    }
    else if (type === '片') {
        syllabary = katakana;
    }

    // 濁点や半濁点の処理
    if (dakutenOption === '濁') {
        syllabary=dakuten;
    }
    if (dakutenOption === '半') {
        syllabary=handakuten;
    }
    else if(dakutenOption==="両"){
        syllabary=dakuten+handakuten;
    }
    else if(dakutenOption==="全"){
        syllabary+=dakuten+handakuten;
    }

    // 小文字を含めるかどうか
    if (includeSmall) {
        syllabary+=small;
    }

    // 伸ばし棒を含めるかどうか
    if (includeBar) {
        syllabary += 'ー';
    }

    // ランダム生成
    const randomSyllabary = [];
    for (let i = 0; i < count; i++) {
        const randomIndex = Math.floor(Math.random() * syllabary.length);
        randomSyllabary.push(syllabary[randomIndex]);
    }

    return randomSyllabary.join(',');
}
function MAX_MIN_DICE(minType, maxValue) {
    let diceMin;

    // minType が未定義または空文字列でないかを確認
    if (typeof minType === 'string' && minType.startsWith("+")) {
        diceMin = parseInt(minType.slice(1), 10); // "+0"の場合、diceMinは0になる
    } else if (typeof minType === 'string' && minType.startsWith("%")) {
        const percentage = parseInt(minType.slice(1), 10);
        diceMin = Math.floor((maxValue * percentage) / 100);
    } else {
        diceMin = 0; // デフォルト値
    }

    const random_dice = Math.floor(Math.random() * (maxValue - diceMin + 1)) + diceMin;
    return random_dice;
}
