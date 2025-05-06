# py java_entity_create.py [テーブル名]
import warnings
warnings.filterwarnings("ignore", category=UserWarning)
import os
import sys
import mysql.connector as mysql
import numpy as np
import pandas as pd
from dotenv import load_dotenv
load_dotenv()
# MySQL接続情報
db_config = {
    'host': os.environ['DB_HOST'],
    'user': os.environ['DB_USER'],
    'password': os.environ['DB_PASSWORD'],
    'database': os.environ['DB_NAME']
}
# コマンドライン引数が指定されていない場合はエラー
if len(sys.argv) < 2:
    print("テーブル名を指定してください。")
    sys.exit(1)
# テーブル名
table_name = sys.argv[1]
# MySQL型 → Java型のマッピング
type_mapping = {
    'int': 'Integer',
    'bigint': 'Long',
    'varchar': 'String',
    'char': 'String',
    'text': 'String',
    'datetime': 'LocalDateTime',
    'date': 'LocalDate',
    'timestamp': 'Timestamp',
    'decimal': 'BigDecimal',
    'double': 'Double',
    'float': 'Float',
    'tinyint': 'Boolean'
}
# MySQLに接続
conn = mysql.connect(**db_config)
cursor = conn.cursor(dictionary=True)
try:
    # カラム情報取得
    cursor.execute(f"""
        SELECT COLUMN_NAME, DATA_TYPE, COLUMN_KEY
        FROM information_schema.columns
        WHERE table_schema = '{db_config['database']}' AND table_name = '{table_name}'
    """)
    columns = cursor.fetchall()
except mysql.Error as e:
    print(f"エラーが発生しました: {e}")
    # 後処理
    cursor.close()
    conn.close()
    sys.exit(1)
# クラス名（パスカルケース変換）
class_name = ''.join(word.capitalize() for word in table_name.split('_'))
# クラス開始
lines = []
lines.append("import java.time.LocalDateTime;")
lines.append("")
lines.append("import jakarta.persistence.Entity;")
lines.append("import jakarta.persistence.GeneratedValue;")
lines.append("import jakarta.persistence.GenerationType;")
lines.append("import jakarta.persistence.Id;")
lines.append("import jakarta.persistence.Table;")
lines.append("")
lines.append("@Entity")
lines.append(f'@Table(name="{table_name}")')
lines.append(f"public class {class_name}Entity {{")
# フィールド生成
for col in columns:
    java_type = type_mapping.get(col['DATA_TYPE'], 'String')  # デフォルトはString
    annotations = []
    if col['COLUMN_KEY'] == 'PRI':
        annotations.append("@Id")
        annotations.append("@GeneratedValue(strategy = GenerationType.IDENTITY)")
    for annotation in annotations:
        lines.append(f"    {annotation}")
    lines.append(f"    private {java_type} {col['COLUMN_NAME']};")
# Getter/Setter
for col in columns:
    java_type = type_mapping.get(col['DATA_TYPE'], 'String')
    field = col['COLUMN_NAME']
    method_name = field[0].upper() + field[1:]
    lines.append(f"    // 【{field}】getter/setter")
    lines.append(f"    public {java_type} get{method_name}() "+"{")
    lines.append(f"        return {field};")
    lines.append("     };")
    lines.append(f"    public void set{method_name}({java_type} {field}) "+"{")
    lines.append(f"        this.{field} = {field};")
    lines.append("     };")
# クラス終了
lines.append("}")
# 出力
java_code = '\n'.join(lines)
# ファイルに書き出し（オプション）
if not os.path.exists('./result'):
    os.makedirs('./result')
with open(f"./result/{class_name}Entity.java", 'w',encoding='utf-8') as f:
    f.write(java_code)
# 後処理
cursor.close()
conn.close()