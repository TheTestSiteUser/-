const noteFrequencies = {
    '261.63': 'C',
    '293.66': 'D',
    '329.63': 'E',
    '349.23': 'F',
    '392.00': 'G',
    '440.00': 'A',
    '493.88': 'B'
};

function updateCustomFrequency() {
    const noteFrequency = parseFloat(document.getElementById('note').value);
    const octave = parseInt(document.getElementById('octave').value);
    const pitchOffset = parseFloat(document.getElementById('pitchOffset').value);

    // 音階に基づく周波数の計算
    const frequency = noteFrequency * Math.pow(2, octave) * Math.pow(2, pitchOffset / 1200);

    // カスタム周波数のフィールドを更新
    document.getElementById('customFrequency').value = frequency.toFixed(2);
    document.getElementById('customFrequencySlider').value = frequency.toFixed(2);
}

function syncSliderAndInput(sliderId, inputId, onChange) {
    const slider = document.getElementById(sliderId);
    const input = document.getElementById(inputId);

    slider.addEventListener('input', () => {
        input.value = slider.value;
        if (onChange) onChange();
    });

    input.addEventListener('input', () => {
        slider.value = input.value;
        if (onChange) onChange();
    });
}

function initializeControls() {
    // 音階セレクトボックスの変更時にカスタム周波数を更新
    document.getElementById('note').addEventListener('change', updateCustomFrequency);

    // 初期状態でスライダーとテキストボックスを同期
    updateCustomFrequency();
    
    // 他のコントロールの初期値を設定
    document.getElementById('octave').value = document.getElementById('octaveSlider').value;
    document.getElementById('duration').value = document.getElementById('durationSlider').value;
    document.getElementById('pitchOffset').value = document.getElementById('pitchOffsetSlider').value;
    document.getElementById('filterFrequency').value = document.getElementById('filterFrequencySlider').value;
    document.getElementById('volume').value = document.getElementById('volumeSlider').value;
    document.getElementById('attack').value = document.getElementById('attackSlider').value;
    document.getElementById('decay').value = document.getElementById('decaySlider').value;
    document.getElementById('sustain').value = document.getElementById('sustainSlider').value;
    document.getElementById('release').value = document.getElementById('releaseSlider').value;

    // スライダーと入力フィールドの同期
    syncSliderAndInput('customFrequencySlider', 'customFrequency');
    syncSliderAndInput('octaveSlider', 'octave', updateCustomFrequency);
    syncSliderAndInput('durationSlider', 'duration');
    syncSliderAndInput('pitchOffsetSlider', 'pitchOffset', updateCustomFrequency);
    syncSliderAndInput('filterFrequencySlider', 'filterFrequency');
    syncSliderAndInput('volumeSlider', 'volume');
    syncSliderAndInput('attackSlider', 'attack');
    syncSliderAndInput('decaySlider', 'decay');
    syncSliderAndInput('sustainSlider', 'sustain');
    syncSliderAndInput('releaseSlider', 'release');
}

document.addEventListener('DOMContentLoaded', initializeControls);

// シーケンス管理
let sequences = [];
let sequenceCounter = 1;

function updateSequenceList() {
    const list = document.getElementById('sequenceListContent');
    list.innerHTML = '';

    sequences.forEach((seq, index) => {
        const listItem = document.createElement('li');
        listItem.textContent = `シーケンス ${seq} (ID: ${index + 1})`;
        listItem.classList.add('sequence-edit');
        listItem.dataset.index = index;
        listItem.addEventListener('click', () => editSequence(index));
        list.appendChild(listItem);
    });
}

function addSequenceToTimeline(index) {
    const timeline = document.getElementById('timeline');
    const sequenceDiv = document.createElement('div');
    sequenceDiv.classList.add('sequence');
    sequenceDiv.style.left = `${index * 50}px`; // 任意の位置調整
    timeline.appendChild(sequenceDiv);
}

document.getElementById('addSequenceButton').addEventListener('click', () => {
    sequences.push(sequenceCounter++);
    updateSequenceList();
    addSequenceToTimeline(sequences.length - 1);
});

document.getElementById('removeSequenceButton').addEventListener('click', () => {
    if (sequences.length > 0) {
        sequences.pop();
        updateSequenceList();
        updateTimeline();
    }
});

function updateTimeline() {
    const timeline = document.getElementById('timeline');
    timeline.innerHTML = '';
    sequences.forEach((_, index) => addSequenceToTimeline(index));
}

function editSequence(index) {
    const newValue = prompt('シーケンスの新しい値を入力してください', sequences[index]);
    if (newValue !== null) {
        sequences[index] = parseInt(newValue);
        updateSequenceList();
        updateTimeline();
    }
}

// タイムライン管理
let indicatorPosition = 0;
let indicatorInterval;

function startIndicator() {
    const timeline = document.getElementById('timeline');
    const indicator = document.getElementById('indicator');
    indicatorPosition = 0;
    indicator.style.left = '0px';

    indicatorInterval = setInterval(() => {
        indicatorPosition += 1;
        if (indicatorPosition > timeline.offsetWidth) {
            indicatorPosition = 0;
        }
        indicator.style.left = `${indicatorPosition}px`;
    }, 10);
}

function stopIndicator() {
    clearInterval(indicatorInterval);
}

document.getElementById('startIndicatorButton').addEventListener('click', startIndicator);
document.getElementById('stopIndicatorButton').addEventListener('click', stopIndicator);
