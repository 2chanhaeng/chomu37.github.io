---
layout: default
title: Category
---
<ul>
  {% for category in site.categories %}
    <li><a href="/category/{{ category | first }}"><strong>{{ category | first }}</strong></a></li>
  {% endfor %}
</ul>