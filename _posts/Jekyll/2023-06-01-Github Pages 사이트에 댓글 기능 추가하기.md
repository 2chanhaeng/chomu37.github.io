---
layout: post
category: Jekyll
title: Github Pages 사이트에 댓글 기능 추가하기
description: >
  Github Pages 사이트에 댓글 기능 추가한 기록
tags: [Jekyll, GitHub_Pages]
---
# Github Pages 사이트에 댓글 기능 추가하기

- [Github Pages 사이트에 댓글 기능 추가하기](#github-pages-사이트에-댓글-기능-추가하기)
  - [Utterances](#utterances)
  - [참고](#참고)

## [Utterances](https://github.com/apps/utterances)

[GitHub Apps 의 Utterances 페이지](https://github.com/apps/utterances)에서 해당 앱을 설치한다.  
Repository access 에서 설치할 저장소를 선택한다.  
설정이 완료 되면 [Utterances 사이트](https://utteranc.es/)로 리다이렉트 된다.  
해당 페이지를 내려보면 설치한 저장소의 주소(`<저장소 소유자 ID>/<저장소 이름>`), 이슈 매핑 기준(경로, URL, 제목 등...), 이슈 라벨, 테마를 선택할 수 있다.  
그럼 마지막에 설정에 맞춰 `script` 태그 코드가 생성이 돼있는데, 이를 복사해서 레이아웃 파일에 삽입하면 된다.  
나는 포스트에 댓글 기능을 추가하고 싶기에 `_layouts/post.html` 파일에 삽입했다.  

## 참고

[Jekyll에 Utterances, Giscus 댓글 적용하기](https://www.hahwul.com/2020/08/08/jekyll-utterances/)
