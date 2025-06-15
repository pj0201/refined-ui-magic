
-- 既存の関数を削除して、引数が競合しないようにします。
DROP FUNCTION IF EXISTS public.match_subsidy_docs(vector, integer);

-- ソースでフィルタリングする機能を追加した新しい関数を作成します。
CREATE OR REPLACE FUNCTION public.match_subsidy_docs(
    p_query_embedding vector,
    p_match_count integer,
    p_source text DEFAULT NULL
)
RETURNS TABLE(id bigint, content text, source text, score double precision)
LANGUAGE sql
STABLE SECURITY DEFINER
SET search_path TO 'public'
AS $function$
  SELECT
    id,
    content,
    source,
    1 - (embedding <=> p_query_embedding) AS score
  FROM
    public.subsidy_docs
  WHERE
    (p_source IS NULL) OR (source = p_source)
  ORDER BY
    embedding <=> p_query_embedding
  LIMIT
    p_match_count;
$function$;
