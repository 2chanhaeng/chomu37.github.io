---
layout: post
title: Mac에서 Python 전역 및 가상환경 버전 변경
category: Python
description: >
  M1 Mac에서 Python 버전을 업데이트 및 변경하는 방법을 기록해놓은 글
tags: [Python, Mac, VSCode, zsh, brew]
---
# Mac에서 Python 전역 및 가상환경 버전 업데이트

- [Mac에서 Python 전역 및 가상환경 버전 업데이트](#mac에서-python-전역-및-가상환경-버전-업데이트)
  - [원하는 Python 버전 설치](#원하는-python-버전-설치)
  - [~/.zshrc](#zshrc)
  - [가상환경 Python 버전 변경](#가상환경-python-버전-변경)
  
맥에서 파이썬 버전을 업데이트를 할 때마다 검색하지 않도록 기록해놓는다.  
나는 M1 Mac, zsh, brew, VSCode를 사용하고 있으므로 이에 맞춰 작성한다.  
다른 환경에서는 다르게 작성해야 할 수도 있으니 참고하길 바란다.  

## 원하는 Python 버전 설치

```zsh
$ brew install python@< 원하는 버전 >
```

brew를 이용해 원하는 버전을 설치한다.

## ~/.zshrc 

```zsh
$ code ~/.zshrc
```

VSCode로 `/.zshrc` 파일을 열어준다.  
본인이 원하는 에디터가 있다면 해당 에디터로 열어주면 된다.  

```zsh
export PATH="/usr/local/opt/python@< 원하는 버전 >/bin:$PATH" # PATH 설정
alias python='python3' # python3를 기본으로 사용
```

파일 내에 위와 같이 PATH를 설정해주고 저장하면 된다.  
2번째 줄은 python3를 기본으로 사용하도록 설정해주므로 2를 사용하고 싶다면 굳이 필요 없다. ~~지금 시대가 언젠데~~  
혹시 본인이 이미 해당 줄을 작성해놨다면 검색해서 `< 원하는 버전 >` 부분만 변경하면 된다.  
만약 vi를 쓰고 있다면 `:/< 검색 키워드 >`로 검색할 수 있다.  
저장 후 `/.zshrc` 스크립트를 실행해준다.  

```zsh
$ source ~/.zshrc
```

이후 `python --version`을 입력해보면 원하는 버전이 나오는 것을 확인할 수 있다.

## 가상환경 Python 버전 변경

전역 버전을 변경했으니 가상환경의 버전도 변경해준다.  
가상환경 상위 디렉토리로 이동한 후 아래 명령어를 입력한다.  

```zsh
$ python -m venv < 가상환경 이름 >  # 현재 전역 버전으로 가상환경을 새로 설치
$ ls -l < 가상환경 이름 >/bin/python*  # 가상환경 내 Python 링크 확인
```

아마 다음과 같이 링크 목록이 출력될 것이다.

```zsh
< 생략 > < 가상환경 이름 >/bin/python -> python< 기존 버전 >
< 생략 > < 가상환경 이름 >/bin/python3 -> python< 기존 버전 >
< 생략 > < 가상환경 이름 >/bin/python< 기존 버전 > -> /opt/homebrew/opt/python@< 기존 버전 >/bin/python< 기존 버전 >
< 생략 > < 가상환경 이름 >/bin/python< 바꿀 버전 > -> /opt/homebrew/opt/python@< 바꿀 버전 >/bin/python< 바꿀 버전 >
```

바꿀 버전이 잘 뜬다면 링크를 바꿔주면 된다.
  
```zsh
$ ln -s < 가상환경 이름 >/bin/python< 바꿀 버전 > < 가상환경 이름 >/bin/python
$ ln -s < 가상환경 이름 >/bin/python< 바꿀 버전 > < 가상환경 이름 >/bin/python3  # python3를 사용하지 않는다면 생략
```

만약 잘 됐다면 다시 `ls -l < 가상환경 이름 >/bin/python*`를 입력했을 때 다음과 같이 출력될 것이다.  

```zsh
$ ls -l < 가상환경 이름 >/bin/python*

< 생략 > < 가상환경 이름 >/bin/python -> python< 바꿀 버전 >
< 생략 > < 가상환경 이름 >/bin/python3 -> python< 바꿀 버전 >
< 생략 > < 가상환경 이름 >/bin/python< 기존 버전 > -> /opt/homebrew/opt/python@< 기존 버전 >/bin/python< 기존 버전 >
< 생략 > < 가상환경 이름 >/bin/python< 바꿀 버전 > -> /opt/homebrew/opt/python@< 바꿀 버전 >/bin/python< 바꿀 버전 >
```

가상환경에 들어가 파이썬을 확인해보자.

```zsh
$ source < 가상환경 이름 >/bin/activate
$ python --version
```

원하는 버전이 잘 나온다면 성공이다.

아니면 그냥 가상환경을 지우고 새로 다시 만들어도 된다. ~~제일 편하다~~  
