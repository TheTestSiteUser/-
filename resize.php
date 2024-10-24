<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_FILES['image'])) {
    $fileTmpPath = $_FILES['image']['tmp_name'];
    $fileName = $_FILES['image']['name'];
    $outputPath = 'uploads/resized_' . $fileName; // リサイズした画像の出力パス

    // Pythonスクリプトのフルパスを指定
    $pythonPath = '/opt/anaconda3/bin/python3'; // 確認済みのPython3のパス
    $scriptPath = 'resize_img.py'; // スクリプトのパス
    $sizeWidth = 200; // リサイズ後の幅
    $sizeHeight = 200; // リサイズ後の高さ

    // Pythonスクリプトを実行
    $command = escapeshellcmd("$pythonPath $scriptPath $fileTmpPath $outputPath $sizeWidth $sizeHeight");
    $output = shell_exec($command);
    
    // エラーチェック
    if ($output === null) {
        echo "Pythonスクリプトの実行中にエラーが発生しました。";
    } else {
        echo $output; // スクリプトの出力を表示
    }
} else {
    echo "画像がアップロードされていません。";
}
?>
