<?php
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    // アップロードされたファイルを処理
    if (isset($_FILES['image']) && $_FILES['image']['error'] == 0) {
        // 一時ファイルを取得
        $tempFile = $_FILES['image']['tmp_name'];

        // Pythonスクリプトのフルパスを指定
        $pythonPath = '/opt/anaconda3/bin/python3'; // 確認済みのPython3のパス
        $scriptPath = 'convert_to_ascii.py'; // 実際のスクリプトのフルパスに置き換えてください

        // サイズの取得
        $sizeMultiplier = isset($_POST['size']) ? floatval($_POST['size']) : 1;

        // コマンドを構築
        $command = escapeshellcmd("$pythonPath $scriptPath " . escapeshellarg($tempFile) . " " . escapeshellarg($sizeMultiplier));

        // 実行およびエラー出力をキャプチャ
        exec($command . " 2>&1", $output, $return_var);

        // 結果の表示
        if ($return_var === 0) {
            // Pythonスクリプトからの出力を表示
            echo  htmlspecialchars(implode("\n", $output));
        } else {
            echo "<h2>エラーが発生しました。</h2>";
            echo "<p>コマンド実行に失敗しました。エラーコード: " . htmlspecialchars($return_var) . "</p>";
            echo "<pre>" . htmlspecialchars(implode("\n", $output)) . "</pre>"; // エラーメッセージを表示
        }
    } else {
        echo "<h2>ファイルのアップロード中にエラーが発生しました。</h2>";
        echo "<p>エラーコード: " . htmlspecialchars($_FILES['image']['error']) . "</p>";
    }
}
?>
