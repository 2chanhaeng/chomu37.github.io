---
layout: post
title: Obsidian Git 플러그인 사용하기
description: >
  Obsidian 의 Obsidian Git 플러그인을 사용하는 방법을 정리했다.
tags: 
---

# Obsidian Git 플러그인 사용하기

- [Obsidian Git 플러그인 사용하기](#obsidian-git-플러그인-사용하기)
  - [먼저](#먼저)
    - [Obsidian](#obsidian)
    - [Obsidian Git](#obsidian-git)
  - [설정하기](#설정하기)
    - [1. Obsidian Git 플러그인 설치](#1-obsidian-git-플러그인-설치)
    - [2. Obsidian Vault를 GitHub 저장소와 연동하기](#2-obsidian-vault를-github-저장소와-연동하기)
  - [사용방법](#사용방법)
    - [git 상태 뷰어](#git-상태-뷰어)
    - [git 히스토리](#git-히스토리)
    - [설정](#설정)
      - [`Automatic` (자동 백업 관련 설정)](#automatic-자동-백업-관련-설정)
      - [`Backup` (백업 관련 설정)](#backup-백업-관련-설정)

Obsidian Git 플러그인을 통해 Obsidian의 Vault를 GitHub 저장소와 연동하는 과정을 기록한다.

## 먼저

### [Obsidian](https://obsidian.md/)

[Obsidian](https://obsidian.md/) (이하 옵시디언)은 마크 다운 기반 텍스트 에디터이다.  
옵시디언은 오프라인 문서 간의 연결성에 대한 시각화를 제공하는 것이 특징이다.  

### [Obsidian Git](https://obsidian-plugin-stats.vercel.app/plugins/obsidian-git)

[Obsidian Git](https://obsidian-plugin-stats.vercel.app/plugins/obsidian-git) 플러그인은 옵시디언에서 바로 git 저장소를 관리할 수 있게 해주는 플러그인이다.  
하단의 내용은 [해당 플러그인의 공식 문서](https://publish.obsidian.md/git-doc/Start+here)를 따라하는 과정을 작성한 것이다.  
따라서 이 글은 영어가 어려울 경우 간단히 참고 정도로만 읽고 해당 문서를 따라하는 것을 추천한다.

## 설정하기

### 1. Obsidian Git 플러그인 설치

[여기](obsidian://show-plugin?id=obsidian-git) 혹은 옵시디언의 상단바에서 `설정` (`⌘ ,`) > `커뮤니티 플러그인` > `커뮤니티 플러그인` > `탐색` > `Obsidian Git` 검색 후 설치한다.  
설치가 완료되면 `Obsidian Git` 플러그인을 활성화한다.  
활성화까지 완료되었다면 다시 해당 플러그인을 검색했을 때 `비활성화` 버튼이 보일 것이다.  
추후 `어떤 명령어를 사용`이라는 구문이 나오면 옵시디언 내 명령어 팔레트를 열어(`⌘ P` 혹은 좌측의 `명령어 팔레트 열기`) 해당 명령어를 입력하면 된다.  

### 2. Obsidian Vault를 GitHub 저장소와 연동하기

터미널에서 기존 Vault가 있는 디렉토리로 이동해 git 저장소를 초기화한다.  
그리고 GitHub의 원격 저장소를 만든 다음 해당 디렉토리와 연결해준다.  
각자 편한 방법을 이용하면 되지만, 아래는 터미널을 이용한 방법이다.

```bash
cd <Vault 디렉토리>
git init
git remote add origin <GitHub 원격 저장소 주소>
```

## 사용방법

[공식 문서의 기능 문서](https://publish.obsidian.md/git-doc/Features)의 내용을 간단히 정리했다.  

### git 상태 뷰어

`Obsidian Git: Open Source Control View` 명령어를 사용하면 우측에 `Source Control` 탭이 열린다.  
해당 탭은 `git status` 의 내용을 `VSCode` 의 `소스 제어` 탭처럼 보여준다.  
git 저장소 내 변경점(diff), 스테이징, 커밋 등을 관리할 수 있다.  

### git 히스토리

`Obsidian Git: Open History View` 명령어를 사용하면 우측에 `History` 탭이 열린다.  
해당 탭은 `git log` 의 내용을 보여준다.  

### 설정

`설정` (`⌘ ,`) > `커뮤니티 플러그인` > `설치된 플러그인` > `Obsidian Git` > `옵션` 에서 여러 설정을 변경할 수 있다.  
자주 사용할만한 일부 설정만 정리했다.

#### `Automatic` (자동 백업 관련 설정)

아마 해당 플러그인을 사용하는 가장 큰 이유일 것이다.  
- `Vault backup interval (minutes)`: 0 이상으로 설정하면 해당 Vault의 변경사항을 해당 값 분마다 자동으로 커밋과 푸시를 진행한다.  
- `Split automatic commit and push`: 활성 시 커밋과 푸시의 간격을 따로 조절할 수 있다.  
- `Auto Backup after stop editing any file`: 활성 시 5분 이상 아무 파일도 수정하지 않으면 자동으로 커밋과 푸시를 진행한다.  
- `Auto pull interval (minutes)`: 0 이상으로 설정하면 해당 값 분마다 자동으로 풀을 진행한다.  
- `Commit message on auto backup/commit`: 자동 커밋 메세지의 서식을 설정할 수 있다. 해당 설정의 설명에 나와있듯 `{{date}}`, `{{hostname}}`, `{{numFiles}}`, `{{files}}` 의 플레이스홀더 값을 사용할 수 있다.  
  - `{{date}}`: 현재 시간(포맷은 하단의 `{{date}} placeholder format` 에서 설정)
  - `{{hostname}}`: 컴퓨터 이름(`{{date}} placeholder replacement` 에서 설정)
  - `{{numFiles}}`: 커밋에 포함된 파일의 개수
  - `{{files}}`: 커밋에 포함된 파일의 이름

#### `Backup` (백업 관련 설정)

- `Pull updates on startup`: 활성 시 옵시디언을 실행할 때마다 자동으로 풀을 진행한다.
- `Push on backup`: 활성 시 커밋과 푸시를 동시에 진행한다.`
