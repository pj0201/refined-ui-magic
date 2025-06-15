
-- AIモデルの出力（768次元ベクトル）とデータベースの列定義（1536次元ベクトル）の不一致を修正します。
-- これにより、AIが生成した情報を正しくデータベースに保存できるようになります。
ALTER TABLE public.subsidy_docs
ALTER COLUMN embedding TYPE vector(768);
