---
layout: post
title: 백준 N과 M 시리즈 itertools로 정복하기
category: Algorithm
description: >
  백준 N과 M 시리즈 문제를 Python 내장 모듈인 `itertools`로 풀어보자.
tags: [Algorithm, Python]
---
# 백준 N과 M 시리즈 itertools로 정복하기

- [백준 N과 M 시리즈 itertools로 정복하기](#백준-n과-m-시리즈-itertools로-정복하기)
  - [개요](#개요)
  - [`itertools`](#itertools)
  - [문제 풀이](#문제-풀이)
  - [여담](#여담)

## 개요

[Python의 내장 모듈 `itertools`](https://docs.python.org/ko/3/library/itertools.html)는 다양한 반복자를 제공한다.  
이를 이용하면 반복문을 사용하지 않고도 풀 수 있는 문제들이 많다.  
특히 'N과 M' 시리즈의 문제는 수열을 다양한 방식으로 출력해야 하는 문제로 `itertools`를 사용하면 매우 간단하게 풀 수 있다.  
이번 글에서는 백준 'N과 M' 시리즈의 문제를 Python 내장 모듈인 `itertools`로 풀어보자.  


## `itertools`

본격적으로 문제를 풀기 전에 간략하게 `itertools`에 대해 알아보자.
- **조합형 반복자**: 이번 포스트에서 자주 쓰일 함수들이다.
  - [`product(*iterables, repeat=1)`](https://docs.python.org/ko/3/library/itertools.html#itertools.product): `iterables`의 [카테시안 곱](https://ko.wikipedia.org/wiki/%EA%B3%B1%EC%A7%91%ED%95%A9)을 생성한다.
    ```python
    from itertools import product
    print(list(product([1, 2, 3], [4, 5, 6])))
    # [#    4       5       6
    # 1 (1, 4), (1, 5), (1, 6),
    # 2 (2, 4), (2, 5), (2, 6),
    # 3 (3, 4), (3, 5), (3, 6),
    # ]
    print(list(product([1, 2], [3, 4], [5, 6])))
    # [  1     5          6
    # 3 (1, 3, 5), (1, 3, 6),
    # 4 (1, 4, 5), (1, 4, 6),
    #    2
    # 3 (2, 3, 5), (2, 3, 6),
    # 4 (2, 4, 5), (2, 4, 6)
    # ]
    ```
  - [`permutations(iterable, r=None)`](https://docs.python.org/ko/3/library/itertools.html#itertools.permutations): `iterable`의 길이가 `r`인 순열을 생성한다.
    ```python
    from itertools import permutations
    print(list(permutations([1, 2, 3])))
    # [(1, 2, 3), (1, 3, 2), (2, 1, 3), (2, 3, 1), (3, 1, 2), (3, 2, 1)]
    # permutations(iterable) == permutations(iterable, len(iterable))
    print(list(permutations([1, 2, 3], 2)))
    # [(1, 2), (1, 3), (2, 1), (2, 3), (3, 1), (3, 2)]
    ```
  - [`combinations(iterable, r)`](https://docs.python.org/ko/3/library/itertools.html#itertools.combinations): `iterable`의 길이가 `r`인 조합을 생성한다. 원소 별 중복을 허용하지 않는다.
    ```python
    from itertools import combinations
    print(list(combinations([1, 2, 3], 2)))
    # [(1, 2), (1, 3), (2, 3)]
    ```
  - [`combinations_with_replacement(iterable, r)`](https://docs.python.org/ko/3/library/itertools.html#itertools.combinations_with_replacement): `iterable`의 길이가 `r`인 조합을 생성한다. 원소 별 중복을 허용한다.
    ```python
    from itertools import combinations_with_replacement
    print(list(combinations_with_replacement([1, 2, 3], 2)))
    # [(1, 1), (1, 2), (1, 3), (2, 2), (2, 3), (3, 3)]
    ```
- 그외 유한 반복자
  - [`accumulate(iterable[, func, *, initial=None])`](https://docs.python.org/ko/3/library/itertools.html#itertools.accumulate): `iterable`의 누적값 배열을 생성한다. `func`가 주어지지 않으면 `operator.add`를 사용한다. `initial`이 주어지면 `iterable`의 첫번째 원소 앞에 `initial`을 추가한다. 최종 누적값만이 필요한 경우 `iterable.reduce`를 사용하는 것이 더 빠르다.
    ```python
    from itertools import accumulate
    from operator import add, mul
    print(list(accumulate([1, 2, 3, 4, 5])))
    # [1, 3, 6, 10, 15]
    # accumulate([1, 2, 3, 4, 5]) == accumulate([1, 2, 3, 4, 5], add) = accumulate([1, 2, 3, 4, 5], lambda x, y: x + y)
    print(list(accumulate([1, 2, 3, 4, 5], mul)))
    # [1, 2, 6, 24, 120]
    print(list(accumulate([1, 2, 3, 4, 5], mul, initial=100)))
    # [100, 100, 200, 600, 2400, 12000]
    ```
  - [`chain(*iterables)`](https://docs.python.org/ko/3/library/itertools.html#itertools.chain): `iterables`의 원소를 연결하여 하나의 반복자로 만든다.
    ```python
    from itertools import chain
    print(list(chain([1, 2, 3], [4, 5, 6])))
    # [1, 2, 3, 4, 5, 6]
    ```
    `iterables`가 하나의 `iterable`로 구성된 경우, [`chain.from_iterable(iterable)`](https://docs.python.org/ko/3/library/itertools.html#itertools.chain.from_iterable)를 이용하면 된다.
    ```python
    from itertools import chain
    print(list(chain.from_iterable([[1, 2, 3], [4, 5, 6]])))
    # [1, 2, 3, 4, 5, 6]
    ```
  - [`compress(data, selectors)`](https://docs.python.org/ko/3/library/itertools.html#itertools.compress): `selectors`가 `truly`한 요소와 동일한 인덱스의 `data` 요소를 생성한다.
    ```python
    from itertools import compress
    print(list(compress(range(10), [0, 0, 1, 1, 0, 1, 0, 1, 0, 0])))
    # [2, 3, 5, 7]
    ```
  - [`dropwhile(predicate, iterable)`](https://docs.python.org/ko/3/library/itertools.html#itertools.dropwhile): `predicate`가 `truly`한 요소를 만날 때까지 `iterable`을 건너뛴다. `itertools.takewhile`의 반대이다.
    ```python
    from itertools import dropwhile
    print(list(dropwhile(lambda x: x < 5, [1, 4, 6, 4, 1])))
    # [6, 4, 1]
    ```
  - [`filterfalse(predicate, iterable)`](https://docs.python.org/ko/3/library/itertools.html#itertools.filterfalse): `predicate`가 `falsy`한 요소를 생성한다. 내장함수인 `filter`와 반대의 경우이다.
    ```python
    from itertools import filterfalse
    print(list(filterfalse(lambda x: x % 2, range(10))))
    # [0, 2, 4, 6, 8]
    ```
  - [`groupby(iterable, key=None)`](https://docs.python.org/ko/3/library/itertools.html#itertools.groupby): `iterable`의 연속된 같은 요소를 그룹으로 묶어서 생성한다. `key`가 주어지면 `key`의 반환값이 같은 요소를 그룹으로 묶는다.
    ```python
    from itertools import groupby
    print(list((key, tuple(group)) for key, group in groupby('AAAABBBCCDAABBB')))
    # [
    #    ('A', ('A', 'A', 'A', 'A')),
    #    ('B', ('B', 'B', 'B')),
    #    ('C', ('C', 'C')),
    #    ('D', ('D',)),
    #    ('A', ('A', 'A')),
    #    ('B', ('B', 'B', 'B')),
    # ]
    print(list((key, tuple(group)) for key, group in groupby('AaaBBbcCAAa', str.lower)))
    # [
    #    ('a', ('A', 'a', 'a')),
    #    ('b', ('B', 'B', 'b')),
    #    ('c', ('c', 'C')),
    #    ('a', ('A', 'A', 'a')),
    # ]
    ```
    연속되지 않은 같은 키의 그룹끼리 묶고 싶다면 `groupby`를 사용하기 전에 `sorted`를 사용하자.
    ```python
    print(list((key, tuple(group)) for key, group in groupby(sorted('AaaBBbcCAAa', key=str.lower), str.lower)))
    # [
    #    ('a', ('A', 'a', 'a', 'A', 'A', 'a')),
    #    ('b', ('B', 'B', 'b')),
    #    ('c', ('c', 'C')),
    # ]
    ```
  - [`islice(iterable, stop)`, `islice(iterable, start, stop[, step])`](https://docs.python.org/ko/3/library/itertools.html#itertools.islice): `iterable`의 `stop`번째 요소까지 생성한다. `start`가 주어지면 `start`번째 요소부터 생성한다. `step`이 주어지면 `step`만큼 건너뛴 요소를 생성한다. `stop`이 `None`이면 `iterable`가 끝날 때까지 생성한다. `Sequence`의 `slice`와 유사하다.
    ```python
    from itertools import islice
    print(list(islice('ABCDEFG', 2)))
    # ['A', 'B']
    print(list(islice('ABCDEFG', 2, 4)))
    # ['C', 'D']
    print(list(islice('ABCDEFG', 2, None)))
    # ['C', 'D', 'E', 'F', 'G']
    print(list(islice('ABCDEFG', 1, 5, 2)))
    # ['B', 'D']
    print(list(islice('ABCDEFG', 1, None, 2)))
    # ['B', 'D', 'F']
    ```
  - [`pairwise(iterable)`](https://docs.python.org/ko/3/library/itertools.html#itertools.pairwise): `iterable`의 인접한 두 요소를 튜플로 묶어서 생성한다.
    ```python
    from itertools import pairwise
    print(list(pairwise('ABCDEFG')))
    # [('A', 'B'), ('B', 'C'), ('C', 'D'), ('D', 'E'), ('E', 'F'), ('F', 'G')]
    ```
  - [`starmap(function, iterable)`](https://docs.python.org/ko/3/library/itertools.html#itertools.starmap): `iterable`의 요소를 `function`에 넘겨서 생성한다. `map(function, *iterable)`과 유사하다.
    ```python
    from itertools import starmap
    print(list(starmap(pow, [(2, 5), (3, 2), (10, 3)])))
    # [32, 9, 1000]
    ```
  - [`takewhile(predicate, iterable)`](https://docs.python.org/ko/3/library/itertools.html#itertools.takewhile): `predicate`가 `truly`인 동안 `iterable`의 요소를 생성한다. `dropwhile`의 반대이다.
    ```python
    from itertools import takewhile
    print(list(takewhile(lambda x: x < 5, [1, 4, 6, 4, 1])))
    # [1, 4]
    ```
  - [`tee(iterable, n=2)`](https://docs.python.org/ko/3/library/itertools.html#itertools.tee): `iterable`을 `n`개의 복사본으로 분리한다. `iterable`을 여러 번 사용해야 할 때 유용하다.
    ```python
    from itertools import tee
    a, b, c = tee('ABC', 3)
    print(list(a))
    # ['A', 'B', 'C']
    print(list(b))
    # ['A', 'B', 'C']
    print(list(c))
    # ['A', 'B', 'C']
    ```
  - [`zip_longest(*iterables, fillvalue=None)`](https://docs.python.org/ko/3/library/itertools.html#itertools.zip_longest): `iterables`의 요소를 튜플로 묶어서 생성한다. `zip`과 유사하지만, `zip`은 최단 `iterable`이 끝날 때까지만 생성하는 데에 반해 `zip_longest`는 최장 `iterable`이 끝날 때까지 생성한다. 최장 `iterable`보다 짧은 `iterable`의 요소는 `fillvalue`로 채운다.
    ```python
    from itertools import zip_longest
    print(list(zip_longest('ABCD', 'xy', fillvalue='-')))
    # [('A', 'x'), ('B', 'y'), ('C', '-'), ('D', '-')]
    # zip 이었다면 [('A', 'x'), ('B', 'y')]
    ```
- 무한 반복자
  - [`count(start=0, step=1)`](https://docs.python.org/ko/3/library/itertools.html#itertools.count): `start`부터 `step`씩 증가하는 수열을 생성한다.
    ```python
    from itertools import count, islice
    print(list(islice(count(2, 3), 5, 20, 2)))
    # [17, 23, 29, 35, 41, 47, 53, 59]
    ```
  - [`cycle(iterable)`](https://docs.python.org/ko/3/library/itertools.html#itertools.cycle): `iterable`을 무한 반복한다.
    ```python
    from itertools import cycle, islice;print(list(islice(cycle('ABC'), 7)))
    # ['A', 'B', 'C', 'A', 'B', 'C', 'A']
    ```
  - [`repeat(object, times=None)`](https://docs.python.org/ko/3/library/itertools.html#itertools.repeat): `object`를 `times`번 반복한다. `times`가 생략되면 무한 반복한다.
    ```python
    from itertools import repeat, islice
    print(list(islice(repeat(7), 5)))
    # [7, 7, 7, 7, 7]
    ```

## 문제 풀이

본격적으로 문제를 풀어보자.  

### [N과 M(1)](https://www.acmicpc.net/problem/15649)

1부터 N까지 자연수 중에서 중복 없이 M개를 고른 수열을 사전순으로 출력해야한다.
중복 없는 수열이므로 순열 즉, `itertools.permutations`를 사용한다.

```python
from itertools import permutations
N, M = map(int, input().split())
nums = [str(i) for i in range(1, N + 1)]
# join을 사용하기 위해 미리 문자열로 변환
combs = permutations(nums, M)
print('\n'.join(' '.join(comb) for comb in combs))
```
[풀이](https://www.acmicpc.net/source/52646927)

### [N과 M(2)](https://www.acmicpc.net/problem/15650)


1부터 N까지 자연수 중에서 중복 없이 M개를 고른 오름차순의 수열을 사전순으로 출력해야한다.
중복 없는 오름차순 수열이므로 조합 즉, `itertools.combinations`를 사용한다.

```python
from itertools import combinations
N, M = map(int, input().split())
nums = [str(i) for i in range(1, N + 1)]
combs = combinations(nums, M)
print('\n'.join(' '.join(comb) for comb in combs))
```
[풀이](https://www.acmicpc.net/source/52647047)

### [N과 M(3)](https://www.acmicpc.net/problem/15651)

1부터 N까지 자연수 중에서 M개를 고른 수열을 사전순으로 출력해야한다.
중복이 허용되므로 `itertools.product`를 사용한다.

```python
from itertools import product
N, M = map(int, input().split())
nums = [str(i) for i in range(1, N + 1)]
combs = product(nums, repeat=M)
print('\n'.join(' '.join(comb) for comb in combs))
```
[풀이](https://www.acmicpc.net/source/52647268)

### [N과 M(4)](https://www.acmicpc.net/problem/15652)

1부터 N까지 자연수 중에서 M개를 고른 비내림차순 수열을 사전순으로 출력해야한다.
비내림차순 수열이므로 중복을 허용하는 조합 즉, `itertools.combinations_with_replacement`를 사용한다.

```python
from itertools import combinations_with_replacement
N, M = map(int, input().split())
nums = [str(i) for i in range(1, N + 1)]
combs = combinations_with_replacement(nums, M)
print('\n'.join(' '.join(comb) for comb in combs))
```
[풀이](https://www.acmicpc.net/source/52647307)

### [N과 M(5)](https://www.acmicpc.net/problem/15654)

주어진 중복되지 않는 N개의 수 중에서 중복 없이 M개를 고른 수열을 사전순으로 출력해야한다.
[1번](#n과-m1)과 비슷하지만 주어진 수열이 있으므로 이를 정렬해야 한다.

```python
from itertools import permutations
N, M = map(int, input().split())
nums = sorted(input().split(), key=int)
# key를 int로 주지 않으면 문자열로 정렬되므로 주의
# sorted(["10", "2"]) -> ["10", "2"]
# sorted(["10", "2"], key=int) -> ["2", "10"]
combs = permutations(nums, M)
print('\n'.join(' '.join(comb) for comb in combs))
```
[풀이](https://www.acmicpc.net/source/52647478)

### [N과 M(6)](https://www.acmicpc.net/problem/15655)

주어진 중복되지 않는 N개의 수 중에서 중복 없이 M개를 고른 오름차순 수열을 사전순으로 출력해야한다.
[2번](#n과-m2)과 비슷하지만 주어진 수열이 있으므로 이를 정렬해야 한다.

```python
from itertools import combinations
N, M = map(int, input().split())
nums = sorted(input().split(), key=int)
combs = combinations(nums, M)
print('\n'.join(' '.join(comb) for comb in combs))
```
[풀이](https://www.acmicpc.net/source/52647552)

### [N과 M(7)](https://www.acmicpc.net/problem/15656)

주어진 중복되지 않는 N개의 수 중에서 M개를 고른 오름차순 수열을 사전순으로 출력해야한다.
[3번](#n과-m3)과 비슷하지만 주어진 수열이 있으므로 이를 정렬해야 한다.

```python
from itertools import product
N, M = map(int, input().split())
nums = sorted(input().split(), key=int)
combs = product(nums, repeat=M)
print('\n'.join(' '.join(comb) for comb in combs))
```
[풀이](https://www.acmicpc.net/source/52647609)

### [N과 M(8)](https://www.acmicpc.net/problem/15657)

주어진 중복되지 않는 N개의 수 중에서 M개를 고른 비내림차순 수열을 사전순으로 출력해야한다.
[4번](#n과-m4)과 비슷하지만 주어진 수열이 있으므로 이를 정렬해야 한다.

```python
from itertools import combinations_with_replacement
N, M = map(int, input().split())
nums = sorted(input().split(), key=int)
combs = combinations_with_replacement(nums, M)
print('\n'.join(' '.join(comb) for comb in combs))
```
[풀이](https://www.acmicpc.net/source/52647628)

### [N과 M(9)](https://www.acmicpc.net/problem/15663)

주어진 N개의 수 중에서 중복 없이 M개를 고른 수열을 사전순으로 출력해야한다.
[5번](#n과-m5)과 비슷하지만 중복된 수가 주어질 수 있으므로 수열을 정렬해야 한다.

```python
from itertools import permutations
N, M = map(int, input().split())
nums = map(int, input().split())
combs = sorted(set(permutations(nums, M)))
print('\n'.join(' '.join(map(str, comb)) for comb in combs))
```
[풀이](https://www.acmicpc.net/source/52647841)

### [N과 M(10)](https://www.acmicpc.net/problem/15664)

주어진 N개의 수 중에서 중복 없이 M개를 고른 비내림차순 수열을 사전순으로 출력해야한다.
[8번](#n과-m8)과 비슷하지만 중복된 수가 주어질 수 있으므로 주어진 수와 수열을 정렬해야 한다.

```python
from itertools import combinations
N, M = map(int, input().split())
nums = sorted(map(int, input().split()))
combs = sorted(set(combinations(nums, M)))
print('\n'.join(' '.join(map(str, comb)) for comb in combs))
```
[풀이](https://www.acmicpc.net/source/52647931)

### [N과 M(11)](https://www.acmicpc.net/problem/15665)

주어진 N개의 수 중에서 중복 없이 M개를 고른 수열을 사전순으로 출력해야한다.
[7번](#n과-m7)과 비슷하지만 중복된 수가 주어질 수 있으므로 주어진 수를 정렬해야 한다.

```python
from itertools import product
N, M = map(int, input().split())
nums = sorted(set(map(int, input().split())), key=int)
combs = product(nums, repeat=M)
print('\n'.join(' '.join(map(str, comb)) for comb in combs))
```
[풀이](https://www.acmicpc.net/source/52647991)

### [N과 M(12)](https://www.acmicpc.net/problem/15666)

주어진 N개의 수 중에서 M개를 고른 비내림차순 수열을 사전순으로 출력해야한다.
[9번](#n과-m9)과 비슷하지만 중복된 수가 주어질 수 있으므로 주어진 수와 수열을 정렬해야 한다.

```python
from itertools import combinations_with_replacement
N, M = map(int, input().split())
nums = sorted(set(map(int, input().split())), key=int)
combs = sorted(set(combinations_with_replacement(nums, M)))
print('\n'.join(' '.join(map(str, comb)) for comb in combs))
```
[풀이](https://www.acmicpc.net/source/52648019)

## 여담

비슷한 이름의 [N과 M](https://www.acmicpc.net/problem/16214)이라는 문제가 있다.
하지만 전혀 다른 문제이므로 여기에 풀이를 적진 않을 것이다.
