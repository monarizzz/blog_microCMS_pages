/**
 * ストーリー用の本文。microCMS のリッチエディタが出力する HTML と同じ形
 * （見出しの id・`div[data-filename]`・セル内の `<p>`・`span.callout` など）にしてある。
 * `mockArticleDetail.blocks` はこれを toArticleBlocks で変換した結果で、
 * 食い違わないことを articleDetail.test.ts で確かめている
 */
export const MOCK_ARTICLE_CONTENT_HTML = [
  "<p>SourceTree でブランチを <code>main</code> から <code>dev</code> にリネームしたら、Push 先が <strong>origin/main のまま</strong>になっていた。</p>",
  "<p></p>",
  '<h2 id="h787ecfa34e">経緯</h2>',
  "<p>リネーム後に <code>git branch -vv</code> を確認すると、追跡先が <code>gone</code> になっていた。</p>",
  '<pre><code class="language-bash">$ git branch -vv\n* dev  e0b570a [origin/main: gone] Merge pull request #91</code></pre>',
  '<h3 id="h1f08a1e15c">追跡先の設定</h3>',
  '<div data-filename=".git/config"><pre><code>[branch &quot;dev&quot;]\n      remote = origin\n      merge = refs/heads/main</code></pre></div>',
  '<h2 id="h6a7bafcf87">直し方</h2>',
  '<ol><li>リモートのブランチを確認する<br></li><li>追跡先を付け替える<pre><code class="language-bash">$ git branch -u origin/dev dev</code></pre></li></ol>',
  '<table><tbody><tr><th colspan="1" rowspan="1"><p>コマンド</p></th><th colspan="1" rowspan="1"><p>役割</p></th></tr><tr><td colspan="1" rowspan="1"><p>git branch -vv</p></td><td colspan="1" rowspan="1"><p>追跡先を確認する</p></td></tr><tr><td colspan="1" rowspan="1"><p>git branch -u</p></td><td colspan="1" rowspan="1"><p>追跡先を付け替える</p></td></tr></tbody></table>',
  '<p><span class="callout">リネームはローカルだけで完結しない。</span><br><span class="callout">リモートの追跡先も合わせて直す。</span></p>',
  "<blockquote><p>ブランチ名を変えたら、追跡先も変わったか確かめる。</p></blockquote>",
  "<hr>",
  '<h2 id="hb4dd86d070">まとめ</h2>',
  '<ul><li>リネームしても追跡先は変わらない<ul><li>詳しくは <a href="https://git-scm.com/docs/git-branch">git branch のドキュメント</a> を参照</li></ul></li><li><s>SourceTree で直す</s> CLI で直す</li></ul>',
].join("");
