import pandas as pd
# MySQL用データ型マッピング
def map_mysql_dtype(col, dtype):
  if col == 'id':
    return "`id` INT AUTO_INCREMENT PRIMARY KEY"
  elif pd.api.types.is_integer_dtype(dtype):
    return f"`{col}` INT"
  elif pd.api.types.is_float_dtype(dtype):
    return f"`{col}` DOUBLE"
  elif pd.api.types.is_datetime64_any_dtype(dtype):
    return f"`{col}` DATETIME"
  else:
    return f"`{col}` VARCHAR(255)"
# Creat table SQL文を生成する関数
def create_table(df, table_name):
  columns = [map_mysql_dtype(col, dtype) for col, dtype in zip(df.columns, df.dtypes)]
  create_table_sql = f"CREATE TABLE `{table_name}` (\n  " + ",\n  ".join(columns) + "\n) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;"
  # INSERT INTO文生成（idは自動採番なので除外）
  insert_sql_list = []
  cols_without_id = [col for col in df.columns if col != 'id']
  for _, row in df.iterrows():
    values = []
    for col in cols_without_id:
      x = row[col]
      if isinstance(x, str):
        values.append(f"'{x}'")
      elif pd.isna(x):
        values.append("NULL")
      elif isinstance(x, pd.Timestamp):
        values.append(f"'{x.strftime('%Y-%m-%d %H:%M:%S')}'")
      else:
        values.append(str(x))
    insert_sql = f"INSERT INTO `{table_name}` ({', '.join(cols_without_id)}) VALUES ({', '.join(values)});"
    insert_sql_list.append(insert_sql)
  return create_table_sql, insert_sql_list