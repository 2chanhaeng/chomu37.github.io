---
layout: post
title: Hello, World!
description: >
  Python 과 Jupyter Notebook 을 이용해 [백준 온라인 저지](https://www.acmicpc.net/)를 풀 때 도움을 줄 수 있는 모듈 Backjoon-with-Jupyter 개발일지 입니다.
tags: 
---
# 개발 이유
저는 요즘 알고리즘과 프로그래밍에 대한 공부를 위해서 [프로그래머스](https://programmers.co.kr/)와 [백준OJ](https://www.acmicpc.net/), 일명 백준의 문제들을 풀고 있습니다. Python 과 Jupyter Notebook, 이하 주피터를 이용해 문제를 풀며, 아쉬운 점을 몇 가지 느꼈습니다. 그러던 중, 그냥 주어진 문제만 풀기보단, 실제로 내가 느낀 문제를 프로그래밍으로 해소하는 것이 저의 프로그래밍 능력 향상에 도움이 될 것이라고 느껴 이를 개발하게 되었습니다.

# 개발 과정
1. 템플릿 만들기
 제가 알고리즘 공부 기록을 남기려고 마음을 먹은 후 작성한 [첫 파일](https://github.com/chomu37/algorithm-study/blob/main/data-structure/queue/truck_on_bridge.ipynb)에는 아무것도 없이 그저 문제 이름의 `.ipynb` 파일을 만들고, 거기서 풀이를 작성하여 예제를 실행해 보는 것이 전부였습니다. 그러다 보니, 작성할 때는 편했지만 타인은 물론이고 저조차도 나중에 코드를 다시 보거나 할 때는 어려워질 수 밖에 없다는 생각이 들었습니다. 따라서 적당한 단락만이라도 나눠서 풀이 파일을 작성해 봤습니다. 그 후 작성한 [두번째 파일](https://github.com/chomu37/algorithm-study/blob/main/data-structure/heap/hotter.ipynb)에서는 주피터의 MarkDown 기능을 이용하여, 제목으로 문제의 원 제목과 링크, 풀이 코드와 그에 대한 주석, 테스트 결과, 예제 코드를 작성했습니다. 이후 문제를 거듭 풀며 기본적인 구조를 복사 후 붙여넣기 하다가, [하나의 템플릿 파일](https://github.com/chomu37/algorithm-study/blob/8ac6f3136731fa2fe55915edb4207040080ea706/template.ipynb)로 만들었습니다.
2. `solution_example`
 프로그래머스의 문제를 풀던 중, 더 다양한 난이도와 문제를 가진 백준의 문제 위주로 풀게 되었습니다. 사이트를 옮기던 중, 크게 달라진 점을 발견하게 됩니다. 프로그래머스는 풀이를 `solution`이라는 함수에 입력을 받고 출력을 반환하는 방식입니다. 예를 들어 두 수를 더하는 문제라면, `def solution(A, B): return A + B` 같이만 작성하면 됐었습니다. 그러나 백준은 표준 입출력으로 입력을 받고 답을 제출했어야 했습니다. 그렇기 때문에 만약 여러 줄의 입력이 들어오는 예제가 있다면, 예제마다 입력을 따로 넣어준 후 사이트에 입력할 때 `input` 함수로 바꾸던가, 예제의 매 줄마다 일일이 복사 후 붙여 넣어야하는 상황이었습니다. 이를 두고만 볼 수 없었던 저는 다음과 같은 묘안을 생각했습니다. `input` 함수가 입력을 받는 함수가 아니라, 주어진 예제를 줄마다 반환하는 함수로 덮어 쓰면 어떨까? 저는 이를 이용해, [템플릿을](https://github.com/chomu37/algorithm-study/blob/3eae5030f9b8080ea60e49f8084b0a009b818f3b/template.ipynb) 수정했습니다. 먼저, `solution` 함수가 `input` 이라는 매개변수를 받도록 합니다. 그리고 문자열로 된 예제와 `solution` 을 인자로 받는 `solution_example` 이라는 함수를 다음과 같이 정의합니다. 함수 내부에서 예제 문자열을 줄바꿈 문자 `\n`를 기준으로 나눈 후, `iter` 객체로 변환하여 `__next__` 메소드를 `input` 변수에 지정합니다. 이후 `solution`에 `input`을 인자로 넣어 실행시킵니다. 이후, `solution_example`에 예제 문자열만 넣어주면 매번 입력을 입력하거나 변환할 필요 없이, 백준 사이트에 입력하는 그대로 입력할 수 있었습니다.
3. 한 번에 실행
 또한 점차 `solution_example` 함수를 [조금씩 고쳐 나가며](https://github.com/chomu37/algorithm-study/blob/0a1e1fd9e3ee37369bc8da56b819701ec78078b4/template.ipynb) 입력이 없는 문제나, `open` 함수를 이용한 풀이도 사용 가능하도록 만들었습니다. `open` 함수 같은 경우는 `open(0).read()` 혹은 `[*open(0)]` 과 같은 방식으로 사용하기 때문에 `read` 와 `__iter__` 메소드가 정의될 수 있어야 했습니다. 따라서, 먼저 `inspect` 내장 모듈의 `signature` 함수를 이용해 `solution` 함수의 매개변수를 추적하여, 만약 매개변수로 `open`을 받는다면, `open` 변수에 다음과 같은 클래스를 덮어 씁니다. `read`라는 메소드는 예제 입력 문자열 전체를 반환하고, `__iter__` 매직 키워드를 인자로 `input`을 받을 때처럼 `iter(예제_입력_문자열.split("\n"))`으로 정의하였습니다. 또한 혹시나 오타 등을 방지하지 위해 `solution`이 `None`, `input`, `open` 이외의 매개변수를 받을 경우 `NameError`를 발생시키도록 만들었습니다. 해당 코드를 풀이가 작성된 셀과 예제 실행 코드인 `solution_example(예제_입력_문자열)`가 작성된 셀 사이에 작성하면, 매번 모든 셀을 실행할 필요없이 `아래 셀 모두 실행` 버튼을 눌러 모든 예제를 실행할 수 있습니다.
4. `set_input`, `set_open`
 그러나 이번엔 또다른 문제가 있었습니다. 코드를 최대한 짧게 작성하는 '숏코드'에 도전하기 위한 코드는 [한 개의 파일](https://github.com/chomu37/algorithm-study/blob/main/code-golf/code-golf.ipynb)에 정리해 두었습니다. 그런데 기존 코드를 이용하면 작성했던 코드를 모두 재실행해야 했기 때문에, 실행시간이 길어지고 `solution_example` 정의를 위한 셀을 문제마다 작성해야하기 때문에 문서도 길어졌습니다. 따라서 새로운 코드가 필요했습니다. 따라서 `solution_example` 함수에서, `input` 단락을 `set_input`, `open` 단락을 `set_open` 함수로 새로이 정의하여 셀마다 예제 입력 문자열을 `set_input` 혹은 `set_open` 인자로 넘겨 각각 `input` 혹은 `open` 변수에 덮어 씌웠습니다. 비록 내장 함수를 덮어 쓰는 것이 마음이 편친 않았지만, 매번 셀을 삽입하는 귀찮음보다는 덜 불편했습니다.
5. 모듈화
 이후 큰 변화없이 매번 `solution_example`를 파일마다 새로 작성하며 썼지만, 여간 귀찮은 게 아니었습니다. 조금이라도 변화를 주면 여러 파일을 모두 바꿔야 한다든가, 매 파일마다 스무줄 가까이 되는 함수를 정의해야하는 점이 신경쓰인다든가... 따라서 [모듈화](https://github.com/chomu37/backjoon-with-jupyter) 하기로 마음을 먹었습니다. 먼저, 해당 코드들을 [`bwj/__init__.py`](https://github.com/chomu37/backjoon-with-jupyter/blob/main/bwj/__init__.py)에 넣었습니다. 이 때, 모듈화를 하면 `solution_example` 함수에 기본 매개변수를 줄 수 없기 때문에, `solution_examples` 함수는 예제 입력만 인자로 받도록 만들고 해당 함수 위에 `test`라는 래퍼 함수를 씌워 래퍼의 인자로 `solution` 함수를 인자로 받아 `solution_examples`를 반환하도록 했습니다. 해당 모듈을 불러와 `test_solution = test(solution)` 으로 정의한 뒤 `test_solution(예제_입력_문자열)`을 실행하면 기존처럼 사용할 수 있도록 만들었습니다. 추가로 `solution_example` 라는 변수명이 덜 직관적으로 느껴져서 `test_solution` 로 이름을 바꾸었습니다. 코드를 모두 작성한 뒤, [`setup.py`](https://github.com/chomu37/backjoon-with-jupyter/blob/main/setup.py) 파일을 만들어 `setuptools` 내장 모듈에서 `setup` 함수를 불러와 기본적인 인자들을 넣었습니다. 이후, 터미널에 `setup.py develop` 을 입력하여, 모듈이 작동하는지 확인한 뒤, `python setup.py sdist`를 입력하여 `sdist/bwj-0.0.1.tar.gz` 파일을 만들었습니다. `pip install bwj-0.0.1.tar.gz` 를 입력하여 설치가 잘 되는지 실행하고 잘 작동함을 확인하였습니다.

# 개선할 점
제가 처음으로 만든 모듈이다보니 아직 부족한 점도 많지만, 그만큼 개선하고 싶은 점과 넣고 싶은 기능도 많습니다.
1. 매직 커맨드
 주피터에는 다양한 기능이 있습니다. 그 중에는 "매직 커맨드" 라는 기능이 있습니다. 셀 혹은 줄 맨 앞에 %% 혹은 % 기호와 키워드를 적어 해당 커맨드를 실행하는 기능입니다. 함수로 불러오는 방법도 편하긴 하지만, 주피터인 만큼 매직 커맨드를 이용하도록 개선하고 싶습니다.
2. 원하는 문제 번호로 불러오기
 제 템플릿은 기본적으로 맨 처음 제목에 해당 문제의 제목과 링크를 걸어둡니다. 이를 터미널에 커맨드와 문제 번호만을 입력해서 템플릿 파일 복사와 제목, 링크를 거는 것까지 자동화 해두고 싶습니다.
3. 이름 바꾸기
 주피터와 백준을 이용할 때 사용하는 모듈이므로 `backjoon-with-jupyter`, 줄여서 `bwj`으로 지었는데 짓고보니 묘하게 특정 성행위를 뜻하는 영단어의 줄임말 같다는 찝찝한 느낌을 버릴 수가 없습니다... 다른 좋은 이름이 생각난다면 해당 이름으로 바꿀 예정입니다. 파이썬이니까 뱀이 들어가면 좋지 않을까요? 주피터니까 주피터 혹은 제우스 관련 이름이어도 좋을 것 같네요. ~~backjoopyter~~ 이름은 조금 더 생각해보도록 하겠습니다.
