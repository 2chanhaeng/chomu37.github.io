---
layout: post
title: Hello, World!
description: >
  gitignore에 꼭 venv를 추가해야 하나요? >> 네. 대신 pip의 freeze와 -r 을 이용합니다.
tags: 
---
# gitignore에 꼭 venv를 추가해야 하나요?
 ## Q1. gitignore에 꼭 venv를 추가해야 하나요?
 A1. 네. 가상 환경이 소스 제어에서 벗어나도록 만들기 떄문입니다.
  > 아직 잘 모르겠음. 자세한 관련 글 더 찾아보기!

 ## Q2. 그렇다면 어떻게 관리해야하나요?
 A2. `pip`의 `freeze`와 `-r` 명령어를 이용합니다.
  1. 터미널에서 가상 환경을 실행합니다.
  ```bash
  venv\\Scripts\\activate 
  ```
  
  2. `pip freeze` 명령어로 `requirements.txt` 문서에 현재 설치된 모듈 및 라이브러리의 정보를 저장합니다.
  ```bash
  pip freeze > requirements.txt
  ```
  
  3. commit 및 push 합니다.
  ```bash
  git add -a
  git commit -m “변경 내용” 
  git push origin main
  ```
  > `-a` 대신 `requirements.txt` 사용 가능. 자세한 것은 git 명령어 확인.

  ---

  4. pull 합니다.
  ```bash
  git pull
  ```

  5. `pip -r` 명령어를 이용해 `requirements.txt` 문서에 작성된 모듈 및 라이브러리를 설치합니다.
  ```bash
  pip -r requirements.txt
  ```