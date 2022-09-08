---
layout: post
category: Jekill
title: Jekyll을 사용한 GitHub Pages 블로그 카테고리화
description: >
  Jekill을 사용한 GitHub Pages 블로그에서 글을 카테고리화 하며 남기는 글
tags: Jekill, GitHub Pages
---
{% raw %}
최종 목표: 사이드 바에 카테고리 출력

# 사이드바
사이드바는 `_includes/nav.html`에서 설정합니다.
HydeJack으로 테마를 적용한 제 블로그는 `nav.html` 파일은 기본적으로 이렇게 생겼었습니다.

```html
<span class="sr-only">{{ site.data.strings.navigation | default:"Navigation" }}{{ site.data.strings.colon | default:":" }}</span>
<!--
  `site.data.strings.변수_명`는 `_data/strings.yaml` 파일에서 `변수_명` 값을 가져옵니다. `_data`는 상수(constant)를 저장하는 경로이며 그 중에서도 `strings.yaml` 파일은 문자열로 상수를 저장하는 파일입니다.
-->
<ul>
  {% assign pages = site.pages | where: "menu", true %}
  {% assign documents = site.documents | where: "menu", true %}
  {% assign nodes = pages | concat: documents | sort: "order" %}
  <!--
    `assign`: 변수를 지정하는 태그입니다.
    `where`: 배열의 원소의 요소 값을 기준으로 거르는 필터입니다. 
    `comment`, `endcomment`: 주석으로 처리하는 태그입니다.
  -->
  {% for node in nodes %}
  <!-- `nodes` 배열에서 원소들을 뽑아 `node` 에 지정하는 for 문입니다. 파이썬과 비슷한 모습을 가지고 있습니다. -->
    {% unless node.redirect_to %}
    <!-- `unless`: if의 반대입니다. `if not < 표현식 >`으로 생각하면 됩니다. -->
      <li>
        <a
          {% if forloop.first %}id="_navigation"{% endif %}
          <!-- forloop: for 루프에 관한 정보를 담고 있습니다. -->
          href="{{ node.url | relative_url }}"
          <!-- relative_url: 상대 주소로 만들어주는 필터입니다. -->
          class="sidebar-nav-item{% if page.url contains node.url %} active{% endif %}"
          <!-- 링크 중 현재 페이지가 해당 페이지이면 `active` 클래스를 추가합니다. -->
          {% if path.rel %}rel="{{ node.rel }}"{% endif %}
          >
          {{ node.title }}
        </a>
      </li>
    {% else %}
      <li>
        <a href="{{ node.redirect_to }}" class="sidebar-nav-item external" >{{ node.title }}</a>
        <!-- 리다이렉트 페이지가 링크되어 있으면 해당 링크로 넘겨줍니다. -->
      </li>
    {% endunless %}
  {% endfor %}
</ul>
```

> 부가 설명:
>   - `site` 변수는 사이트 정보(공식 문서 하단에 더 자세히 나와있습니다.)와 `_config.yml` 파일의 환경 설정 정보라고 합니다. 자세한 정보는 [Jeykyll 공식 한국어 사이트의 변수 문서](https://jekyllrb-ko.github.io/docs/variables/)를 참고하세요.
>   - `where` 필터는 `where: < 찾는_키 > < 찾는_값 >`은 파이프로 건너온 값 중 `찾는_키`의 값이 `찾는_값`인 값을 추립니다. 예를 들어서 상기한 코드의 `{% assign pages = site.pages | where: "menu", true %}` 같은 경우에는 먼저 `site.pages`(사이트 내의 모든 페이지에 대한 정보를 가진 배열)를 가져와서 이를 `where` 필터로 넘깁니다. `where`는 그 중에 `menu`의 값이 `true`인 값들을 필터링합니다. 마지막으로 `assign` 태그가 그 배열을 `pages` 변수에 할당합니다. 파이썬의 `pages = [page for page in site.pages if page.menu == True]`, JS의 `const pages = site.pages.filter(page => page.menu === True)` 정도의 코드로 생각하시면 될 것 같습니다. 이때 페이지의 정보는 [머리말](https://jekyllrb-ko.github.io/docs/front-matter/)로 지정할 수 있습니다. 자세한 정보는 [Liquid의 filters/`where` 문서](https://shopify.github.io/liquid/filters/where/)를 참고하세요.
>   - `forloop` 객체는 부모 for 루프에 대한 정보를 담고 있습니다. 예를 들어 `forloop.first`는 현재가 첫번째 반복인지를 담고 있습니다. 자세한 정보는 [Shopify 개발 블로그의 Liquid/objects/`forloop` 문서](https://shopify.dev/api/liquid/objects#forloop)를 참고하세요.

따라서 사이드 바에 카테고리를 넣기 위해서는
  1. 사이드 바 수정하기
  2. 카테고리 별 페이지 만들기

하면 될 것이라고 생각했습니다.

# 전체 카테고리 페이지 만들기
`_includes/nav.html` 을 다음과 같이 수정했습니다.
```html
<!-- 생략 -->
<ul>
  {% assign categories = site.categories | first | prepend: "/" %}
  <!--
    `first`: 배열에서 가장 앞의 원소를 넘깁니다.
    `prepend`: 문자열의 가장 앞에 뒤에 오는 문자열을 추가합니다. 뒤에 추가할 때는 `append`를 사용합니다.
    `site.categories` 에서 `first` 필터로 카테고리의 이름을 가져온 뒤 앞에 `/`를 붙여 상대 경로로 만들었습니다.
  -->
  {% assign documents = site.documents | where: "menu", true %}
  {% assign nodes = categories | concat: documents | sort: "order" %}
  <!-- pages 대신 categories 를 넣어줬습니다. -->
  {% for node in nodes %}
<!-- 생략 -->
```

이후 카테고리 폴더 별로 `index.html` 파일을 추가하여 해당 페이지를 카테고리 별 페이지로 만들 것입니다.

# 카테고리 별 페이지 만들기

카테고리 별 페이지를 일정하게 만들기 위해 레이아웃을 먼저 지정해줄 것입니다. `_layouts` 폴더에 자주 쓰는 형식을 레이아웃으로 저장할 수 있습니다. `_layouts` 폴더 내에 다음과 같은 내용의 `category.html`를 추가합니다. [지킬(Jekyll) 블로그 카테고리(category) 만들기](https://devyurim.github.io/development%20environment/github%20blog/2018/08/07/blog-6.html)를 참고했습니다.


```html
---
layout: default
---
<ul class="posts-list">
  {% assign category = page.category | default: page.title %}
  <!-- 현재 페이지의 `category` 요소를 가져옵니다. 없다면 페이지 제목을 가져옵니다. 이를 `category` 변수에 할당합니다. -->
  {% for post in site.categories[category] %}
  <!-- 사이트에서 `category` 카테고리인 페이지들을 가져와 `post`에 할당하는 for문 입니다. -->
    <li>
      <h3>
        <a href="{{ site.baseurl }}{{ post.url }}"> {{ post.title }} </a>
        <!-- `post` 제목을 표시하고 해당 글의 URL을 링크합니다. -->
        <small>{{ post.date | date_to_string }}</small>
        <!-- 글이 쓰여진 날짜를 문자열로 바꿔 표시합니다. -->
      </h3>
    </li>
  {% endfor %}
</ul>
```
> 부가설명
>   - 다른 언어와 같이 [대괄호를 이용하여 배열에서 인덱스에 해당하는 원소를 가져올 수 있습니다.](https://shopify.github.io/liquid/basics/types/#accessing-specific-items-in-arrays)

이후 머리말에 `layout: category`을 적어주면 해당 레이아웃이 적용됩니다.

# 예시: `Jekyll` 카테고리 만들기

예시로 `Jekyll` 카테고리를 만들어 이 글을 해당 카테고리에 포함시켜 보겠습니다.
먼저 `Jekyll/index.html` 파일을 다음과 같이 만들었습니다.
```markdown
---
layout: category
category: category
---
```
이후 해당 파일이 있는 폴더에 이 글을 포함시킨 뒤 푸시를 했습니다.

{% endraw %}
# 출처 및 참고

- [Jeykyll 한국어 번역 사이트](https://jekyllrb-ko.github.io/docs/variables/)
- [Shopify GitHub Pages 블로그의 Liquid 문서](https://shopify.github.io/liquid/)
- [Shopify 개발 블로그 문서의 Liquid 레퍼런스](https://shopify.dev/api/liquid/)
- [Liquid 치트 시트](https://www.shopify.com/partners/shopify-cheat-sheet)
- [지킬(Jekyll) 블로그 카테고리(category) 만들기](https://devyurim.github.io/evelopment%20environment/github%20blog/2018/08/07/blog-6.html)
- [[Github 블로그] Liquid 문법 간단 정리](https://ansohxxn.github.io/blog/liquid/)
  