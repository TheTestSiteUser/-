#!/usr/bin/env python3
import sys
import cv2
import os

def main():
    try:
        # アスキーアートに使用する文字セット（シングルバイト文字のみ）
        colorset = "@$%&#WMXo+=-:. "

        # コマンドライン引数から画像のパスとサイズを取得
        if len(sys.argv) != 3:
            print("Usage: python3 convert_to_ascii.py <image_path> <size_multiplier>")
            sys.exit(1)

        imgpath = sys.argv[1]
        size_multiplier = float(sys.argv[2])

        # 画像の存在チェック
        if not os.path.isfile(imgpath):
            print("指定されたファイルが存在しません。")
            sys.exit(1)

        img = cv2.imread(imgpath)

        # 画像の読み込み確認
        if img is None:
            print("画像を読み込めませんでした。ファイルが正しい形式か確認してください。")
            sys.exit(1)

        # 画像をグレースケールに変換
        gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
        output = []

        # 画像サイズを変更
        height, width = gray.shape
        new_width = int(width * size_multiplier)
        new_height = int(height * size_multiplier)
        resized_gray = cv2.resize(gray, (new_width, new_height))

        # 各行を生成
        for gray2 in resized_gray:
            line = ""
            for dark in gray2:
                # 明るさを基に文字を選択
                index = dark * (len(colorset) - 1) // 256
                line += colorset[index] * 2  # 明るさをインデックスに変換
            output.append(line)

        # 最大行長を取得
        max_length = max(len(line) for line in output)

        # 各行を最大行長に揃える
        for i in range(len(output)):
            output[i] = output[i].ljust(max_length)  # 左詰めで空白を追加

        # ASCIIアートを標準出力に表示
        print("\n".join(output))

    except Exception as e:
        print("エラーが発生しました:", str(e))
        sys.exit(1)

if __name__ == "__main__":
    main()
