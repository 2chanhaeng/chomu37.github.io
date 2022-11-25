---
layout: post
title: csv 모듈 내 DictReader DictWriter 클래스
category: Python
description: >
  저의 첫 GitHub Pages 포스트 입니다.
tags: [Python, CSV, TIL]
---
# csv 모듈 내 DictReader DictWriter 클래스

- [csv 모듈 내 DictReader DictWriter 클래스](#csv-모듈-내-dictreader-dictwriter-클래스)
  - [csv.DictReader 클래스](#csvdictreader-클래스)
    - [예시](#예시)
  - [csv.DictWriter 클래스](#csvdictwriter-클래스)
    - [예시](#예시-1)
  
Python의 내장 모듈인 csv 모듈에는 csv 파일을 읽고 쓰는데 유용한 클래스들이 있다.  
이번 포스트에서는 그 중에서도 `list[dict]` 형태를 읽고 쓰는데 사용되는 DictReader와 DictWriter 클래스에 대해 알아보자.  

## [csv.DictReader 클래스](https://docs.python.org/ko/3/library/csv.html#csv.DictReader)
```python
class csv.DictReader(f, fieldnames=None, restkey=None, restval=None, dialect='excel', *args, **kwds)
```
- `f` : 읽어올 파일 객체
- `fieldnames` : 불러올 필드 명(없으면 첫 줄을 필드 명으로 사용)
<details>
<summary>
자주 사용되지 않는 인자
</summary>

- `restkey` : `fieldnames`에서 지정되지 않은 나머지 필드 이름을 저장할 키
- `restval` : 지정되지 않은 값들을 저장할 값
- `dialect` : csv 파일의 구분자, 따옴표 등을 지정 ([csv.Dialect 클래스](https://docs.python.org/ko/3/library/csv.html#csv.Dialect) 참고)
</details>

### 예시
`test.csv`
| name | age | address |
| ---- | --- | ------- |
| 홍길동 | 20 | 서울시 강남구 |
| 이순신 | 30 | 서울시 강북구 |
| 강감찬 | 40 | 서울시 강서구 |

```python
import csv

with open('test.csv', 'r') as f:
    reader = csv.DictReader(f)
    print(*reader, end='\n')
```
```python
{'name': '홍길동', 'age': '20', 'address': '서울시 강남구'}
{'name': '이순신', 'age': '30', 'address': '서울시 강북구'}
{'name': '강감찬', 'age': '40', 'address': '서울시 강서구'}
```

## [csv.DictWriter 클래스](https://docs.python.org/ko/3/library/csv.html#csv.DictWriter)

```python
class csv.DictWriter(f, fieldnames, restval='', extrasaction='raise', dialect='excel', *args, **kwds)
```
- `f` : 작성할 파일 객체
- `fieldnames` : 작성할 필드 명(`csv.DictReader` 클래스와 다르게 **필수**)
<details>
<summary>
자주 사용되지 않는 인자
</summary>

- `restval` : `fieldnames`에서 지정되지 않은 값들을 저장할 값
- `extrasaction` : `fieldnames`에 지정되지 않은 값들을 처리하는 방법
  - `raise` : 예외 발생(기본값)
  - `ignore` : 무시
- `dialect` : csv 파일의 구분자, 따옴표 등을 지정 ([csv.Dialect 클래스](https://docs.python.org/ko/3/library/csv.html#csv.Dialect) 참고)
</details>

### 예시
```python
import csv

with open('test.csv', 'w', newline='') as f:
    writer = csv.DictWriter(f, fieldnames=['name', 'age', 'address'])
    writer.writeheader()
    writer.writerow({'name': '홍길동', 'age': 20, 'address': '서울시 강남구'})
    writer.writerows(
        [
            {'name': '이순신', 'age': 30, 'address': '서울시 강북구'},
            {'name': '강감찬', 'age': 40, 'address': '서울시 강서구'},
        ]
    )
```

`test.csv`
| name | age | address |
| ---- | --- | ------- |
| 홍길동 | 20 | 서울시 강남구 |
| 이순신 | 30 | 서울시 강북구 |
| 강감찬 | 40 | 서울시 강서구 |
