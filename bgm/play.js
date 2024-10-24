// グローバル変数を初期化
let audioContext = new (window.AudioContext || window.webkitAudioContext)();
let oscillator;
let gainNode;
let noiseSource;

// HTML要素を取得
const noteSelect = document.getElementById('note');
const customFrequencyInput = document.getElementById('customFrequency');
const customFrequencySlider = document.getElementById('customFrequencySlider');
const octaveInput = document.getElementById('octave');
const octaveSlider = document.getElementById('octaveSlider');
const durationInput = document.getElementById('duration');
const durationSlider = document.getElementById('durationSlider');
const pitchOffsetInput = document.getElementById('pitchOffset');
const pitchOffsetSlider = document.getElementById('pitchOffsetSlider');
const filterFrequencyInput = document.getElementById('filterFrequency');
const filterFrequencySlider = document.getElementById('filterFrequencySlider');
const volumeInput = document.getElementById('volume');
const volumeSlider = document.getElementById('volumeSlider');

// エンベロープ要素を取得
const attackInput = document.getElementById('attack');
const attackSlider = document.getElementById('attackSlider');
const decayInput = document.getElementById('decay');
const decaySlider = document.getElementById('decaySlider');
const sustainInput = document.getElementById('sustain');
const sustainSlider = document.getElementById('sustainSlider');
const releaseInput = document.getElementById('release');
const releaseSlider = document.getElementById('releaseSlider');

// 音を生成する関数
// 音を生成する関数
function playSound() {
    if (!audioContext) {
        console.error('AudioContextが初期化されていません。');
        return;
    }

    // ノードを作成
    if (gainNode) {
        // 既存のノイズソースがあれば停止
        if (noiseSource) {
            stopSound(noiseSource);
        }
        // 既存のノードをクリア
        gainNode.disconnect();
    }
    
    gainNode = audioContext.createGain();
    gainNode.connect(audioContext.destination); // ノードを接続

    // エンベロープを設定
    applyEnvelope(gainNode, 
        parseInt(attackInput.value) || 0, 
        parseInt(decayInput.value) || 0, 
        parseFloat(sustainInput.value) || 0, 
        parseInt(releaseInput.value) || 0
    );

    // 音の設定
    let waveformType = document.getElementById('waveform').value;
    let frequency = parseFloat(customFrequencyInput.value) || parseFloat(noteSelect.value);
    if (octaveInput.value) {
        frequency *= Math.pow(2, parseInt(octaveInput.value));
    }

    console.log('Waveform Type:', waveformType);
    console.log('Frequency:', frequency);

    switch (waveformType) {
        case 'white_noise':
        case 'pink_noise':
        case 'brown_noise':
        case 'harmonic_noise':
        case 'random_wave':
            // ノイズ系の場合はオシレーターを使わずに AudioBuffer を使用
            generateNoise(waveformType, frequency);
            break;
        case 'pulse':
            generatePulseWave(frequency);
            break;
        case 'curve':
            generateCurveWave(frequency);
            break;
        case 'exponential':
            generateExponentialWave(frequency);
            break;
        case 'lissajous':
            generateLissajousWave(frequency, frequency * 2);  // 例として基準周波数の2倍で生成
            break;
        default:
            // 通常の波形の場合
            oscillator = audioContext.createOscillator();
            oscillator.type = waveformType;
            oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);
            oscillator.connect(gainNode);
            oscillator.start();

            // 音の停止
            setTimeout(() => stopSound(oscillator), parseInt(durationInput.value) || 1000);
            break;
    }
    
    // 波形を描画
    drawWaveform(frequency, waveformType);
}


function generateNoise(type, frequency) {
    const bufferSize = audioContext.sampleRate * (parseInt(durationInput.value) || 1000) / 1000;
    const noiseBuffer = audioContext.createBuffer(1, bufferSize, audioContext.sampleRate);
    const data = noiseBuffer.getChannelData(0);

    console.log('Generating Noise of Type:', type);

    switch (type) {
        case 'white_noise':
            for (let i = 0; i < data.length; i++) {
                data[i] = Math.random() * 2 - 1;
            }
            break;

        case 'pink_noise':
            let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0;
            for (let i = 0; i < data.length; i++) {
                let white = Math.random() * 2 - 1;
                b0 = 0.02109238 * white + b0 * 0.8465;
                b1 = 0.07703793 * white + b1 * 0.9630;
                b2 = 0.68873508 * white + b2 * 0.4676;
                b3 = 0.21424968 * white + b3 * 0.9781;
                b4 = white - b0 - b1 - b2 - b3;
                data[i] = b0 + b1 + b2 + b3 + b4;
            }
            break;

        case 'brown_noise':
            let brown = 0;
            for (let i = 0; i < data.length; i++) {
                let white = Math.random() * 2 - 1;
                brown += (0.02109238 * white + brown * 0.8465);
                data[i] = brown;
            }
            break;

        case 'harmonic_noise':
            for (let i = 0; i < data.length; i++) {
                data[i] = Math.sin(2 * Math.PI * frequency * i / audioContext.sampleRate) * Math.random();
            }
            break;

        case 'random_wave':
            for (let i = 0; i < data.length; i++) {
                data[i] = Math.random() * 2 - 1;
            }
            break;

        default:
            console.error("Unsupported noise type");
            return;
    }

    noiseSource = audioContext.createBufferSource();
    noiseSource.buffer = noiseBuffer;
    noiseSource.connect(gainNode);
    noiseSource.start();

    console.log('Noise Started');

    // ノイズの停止
    setTimeout(() => stopSound(noiseSource), parseInt(durationInput.value) || 1000);
}

function applyEnvelope(gainNode, attack, decay, sustain, release) {
    if (!gainNode) {
        console.error('Gain node is not initialized');
        return;
    }

    const now = audioContext.currentTime;

    console.log('Applying Envelope: Attack:', attack, 'Decay:', decay, 'Sustain:', sustain, 'Release:', release);

    gainNode.gain.setValueAtTime(0, now);
    gainNode.gain.linearRampToValueAtTime(1, now + attack / 1000);
    gainNode.gain.linearRampToValueAtTime(sustain, now + attack / 1000 + decay / 1000);
    gainNode.gain.setValueAtTime(sustain, now + attack / 1000 + decay / 1000);
    gainNode.gain.linearRampToValueAtTime(0, now + attack / 1000 + decay / 1000 + release / 1000);

    // リリースタイムでノイズを停止
    setTimeout(() => stopSound(noiseSource), release);
}

// 波形描画関数
function drawWaveform(frequency, type) {
    const canvas = document.getElementById('waveformCanvas');
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    const amplitude = height / 2; // 波形の振幅
    const offset = height / 2; // 波形のオフセット

    ctx.clearRect(0, 0, width, height);
    ctx.beginPath();
    ctx.moveTo(0, offset);

    for (let x = 0; x < width; x++) {
        let y;
        const phase = (x / width) * frequency * Math.PI * 2;
        switch (type) {
            case 'sine':
                y = amplitude * Math.sin(phase) + offset;
                break;
            case 'square':
                y = (Math.sin(phase) >= 0 ? 1 : -1) * amplitude + offset;
                break;
            case 'sawtooth':
                y = ((x % (width / frequency)) / (width / frequency)) * 2 * amplitude - amplitude + offset;
                break;
            case 'triangle':
                y = amplitude * (1 - Math.abs((x % (width / frequency)) / (width / frequency) * 2 - 1)) + offset;
                break;
            default:
                y = offset;
                break;
        }
        ctx.lineTo(x, y);
    }
    ctx.stroke();
}

// 波形変更イベントリスナー
document.getElementById('waveform').addEventListener('change', function() {
    const selectedWaveform = this.value;
    const canvas = document.getElementById('waveformCanvas');
    drawWaveform(selectedWaveform, canvas);
});

// 初期表示
window.addEventListener('load', function() {
    const initialWaveform = document.getElementById('waveform').value;
    const canvas = document.getElementById('waveformCanvas');
    drawWaveform(initialWaveform, canvas);
});


function stopSound(source) {
    if (!source) {
        console.error('No sound source to stop.');
        return;
    }

    console.log('Stopping Sound');
    
    source.stop();
    source.disconnect();
    if (gainNode) {
        gainNode.disconnect();
    }
    source = null;
    gainNode = null;
    if (oscillator) {
        oscillator.stop();
        oscillator.disconnect();
        oscillator = null;
    }
}

// UIイベントの設定
document.getElementById('playButton').addEventListener('click', playSound);

//パルス
function generatePulseWave(frequency) {
    oscillator = audioContext.createOscillator();
    oscillator.type = 'square';
    oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);
    oscillator.connect(gainNode);
    oscillator.start();

    // 音の停止
    setTimeout(() => stopSound(oscillator), parseInt(durationInput.value) || 1000);
}

//カーブ
function generateCurveWave(frequency) {
    const bufferSize = audioContext.sampleRate * (parseInt(durationInput.value) || 1000) / 1000;
    const curveBuffer = audioContext.createBuffer(1, bufferSize, audioContext.sampleRate);
    const data = curveBuffer.getChannelData(0);

    for (let i = 0; i < data.length; i++) {
        const t = i / bufferSize;
        data[i] = Math.sin(2 * Math.PI * frequency * t) * Math.sin(2 * Math.PI * frequency * t); // 曲線波形
    }

    const curveSource = audioContext.createBufferSource();
    curveSource.buffer = curveBuffer;
    curveSource.connect(gainNode);
    curveSource.start();

    // 音の停止
    setTimeout(() => stopSound(curveSource), parseInt(durationInput.value) || 1000);
}

//エキスポネンシャル
function generateExponentialWave(frequency) {
    const bufferSize = audioContext.sampleRate * (parseInt(durationInput.value) || 1000) / 1000;
    const expBuffer = audioContext.createBuffer(1, bufferSize, audioContext.sampleRate);
    const data = expBuffer.getChannelData(0);

    for (let i = 0; i < data.length; i++) {
        const t = i / bufferSize;
        data[i] = Math.exp(-t * frequency) * Math.sin(2 * Math.PI * frequency * t); // 指数関数波形
    }

    const expSource = audioContext.createBufferSource();
    expSource.buffer = expBuffer;
    expSource.connect(gainNode);
    expSource.start();

    // 音の停止
    setTimeout(() => stopSound(expSource), parseInt(durationInput.value) || 1000);
}

//りさジュー
function generateLissajousWave(frequency, frequency2) {
    const bufferSize = audioContext.sampleRate * (parseInt(durationInput.value) || 1000) / 1000;
    const lissajousBuffer = audioContext.createBuffer(1, bufferSize, audioContext.sampleRate);
    const data = lissajousBuffer.getChannelData(0);

    for (let i = 0; i < data.length; i++) {
        const t = i / bufferSize;
        data[i] = Math.sin(2 * Math.PI * frequency * t) * Math.sin(2 * Math.PI * frequency2 * t); // リサジュー曲線
    }

    const lissajousSource = audioContext.createBufferSource();
    lissajousSource.buffer = lissajousBuffer;
    lissajousSource.connect(gainNode);
    lissajousSource.start();

    // 音の停止
    setTimeout(() => stopSound(lissajousSource), parseInt(durationInput.value) || 1000);
}
