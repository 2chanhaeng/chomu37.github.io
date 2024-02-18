---
layout: post
title: VSCode 에서 `cargo clippy` 사용하기
description: >
  VSCode 에서 rust 로 작성된 파일을 린트할 때 `cargo check` 대신 `cargo clippy` 사용하기 위해 설정하는 방법
tags: 
---
# VSCode 에서 cargo clippy 사용하기

- [VSCode 에서 cargo clippy 사용하기](#vscode-에서-cargo-clippy-사용하기)
  - [`cargo clippy`](#cargo-clippy)
  - [VSCode 설정](#vscode-설정)
    - [`rust-analyzer` 설치](#rust-analyzer-설치)
    - [`clippy` 설치](#clippy-설치)
    - [VSC 설정](#vsc-설정)
  - [`clippy`의 카테고리](#clippy의-카테고리)
    - [`pedantic` 카테고리](#pedantic-카테고리)
      - [VSC 자동 린트 시 `pedantic` 카테고리 주의 받기](#vsc-자동-린트-시-pedantic-카테고리-주의-받기)

## `cargo clippy`

[rust](https://www.rust-lang.org/)는 [cargo](https://doc.rust-lang.org/cargo/) 라는 패키지 매니저를 사용한다. cargo는 `check`라는 명령어를 이용해 rust로 작성된 파일을 린트할 수 있다. [`clippy`](https://github.com/rust-lang/rust-clippy)는 거기서 더 나아가 더 엄격한 린트를 제공한다. 예를 들면 다음과 같은 경우를 보자.

```rust
fn main() {
    let pi = 3.141592;
    println!("pi is {}", pi);
}
```

위 코드는 `cargo check`로 검사하면 아무런 문제가 없다. 하지만 `cargo clippy`로 검사하면 다음과 같은 경고를 준다.

```bash
error: approximate value of `f{32, 64}::consts::PI` found
  --> src/bin/main.rs:14:14
   |
14 |     let pi = 3.141592;
   |              ^^^^^^^^
   |
   = help: consider using the constant directly
   = help: for further information visit https://rust-lang.github.io/rust-clippy/master/index.html#approx_constant
   = note: `#[deny(clippy::approx_constant)]` on by default
```

에러를 해석하자면 원주율 값을 사용하고 싶다면 `f32::consts::PI`, `f64::consts::PI` 같이 이미 정의된 상수를 사용하라는 것이다. 이처럼 `clippy`는 단순 린트를 넘어서 코드의 품질을 높여줄 수 있다.

## VSCode 설정

VSC에서 `clippy`를 통해 자동으로 코드를 린트하기 위해서는 다음과 같이 설정하면 된다.

### `rust-analyzer` 설치

[rust-analyzer](https://marketplace.visualstudio.com/items?itemName=rust-lang.rust-analyzer)는 rust를 유용하게 사용할 수 있도록 도와주는 확장 프로그램이다. 이를 설치하면 VSC에서 rust를 작성할 때 필요한 다양한 기능을 사용할 수 있으니 꼭 설치하자. (아마 VSC에서 rust를 작성하면 자동으로 추천해주기 때문에 이미 설치되어 있을 것이다.)

### `clippy` 설치

rust를 설치할 때 자동으로 `clippy`도 설치되었을 것이다. 만약 설치되어 있지 않다면 [rustup](https://rustup.rs/)을 통해 설치하자.

```bash
rustup update
rustup component add clippy
```

아무 rust 프로젝트 루트 폴더에서 다음 명령어를 실행해 `clippy`가 제대로 설치되었는지 확인할 수 있다.

```bash
cargo clippy
```

### VSC 설정

VSC에서 설정(`⌘ cmd/Ctrl + ,`)을 열고 `rust-analyzer.check.command`를 검색해서 나오는 `Rust-analyzer > Check: Command`의 값을 `check`에서 `clippy`로 바꾸자. 혹은 `settings.json` 파일을 열어서 다음과 같이 추가하자.

```json
{
  ...
  "rust-analyzer.check.command": "clippy"
}
```

이제 VSC에서 rust 파일을 작성하면 `clippy`를 통해 자동으로 린트가 되는 것을 확인할 수 있다.

## `clippy`의 카테고리

`clippy`는 [다양한 카테고리 별 린트](https://github.com/rust-lang/rust-clippy?tab=readme-ov-file#clippy)를 제공한다. 기본적으로 카테고리 별 허용된 범위가 있는데, 이 범위를 바꾸고 싶다면 `clippy`를 실행할 때 다음과 같은 옵션을 **가장 마지막에** 추가하면 된다.

```bash
cargo clippy -- -(A/W/D) clippy::카테고리_이름
# 혹은
cargo clippy -- --(allow/warn/deny) clippy::카테고리_이름
```

자세한 내용은 `cargo clippy --help` 혹은 `cargo help clippy` 명령어나 [공식 문서](https://github.com/rust-lang/rust-clippy?tab=readme-ov-file#allowingdenying-lints)에서 확인할 수 있다.

### `pedantic` 카테고리

이 중 `pedantic`는 좀더 엄격하고 잘못될 수도 있지만 더 좋은 코드를 작성할 수 있도록 도와주는 린트들을 모아놓은 카테고리이다. 이 카테고리는 기본적으로 허용되어 있으므로 `clippy`를 사용할 때 `pedantic` 카테고리로 탐지된 내용을 주의 받고 싶다면 다음과 같은 옵션을 추가하면 된다.

```bash
cargo clippy -- -W clippy::pedantic
```

#### VSC 자동 린트 시 `pedantic` 카테고리 주의 받기

VSC에서 `clippy`를 통해 자동으로 린트할 때 `pedantic` 카테고리의 내용을 주의 받고 싶다면 설정에서 `rust-analyzer.check.extraArgs`를 검색해 나오는 `Rust-analyzer > Check: Extra Args`의 값을 다음과 같이 추가하자.

```text
--
-W
clippy::pedantic
```

**한 줄에 추가하면 안 된다.** 띄어쓰기로 구분된 항목마다 개별로 항목 추가 해야한다. 혹은 `settings.json` 파일을 열어서 다음과 같이 추가하자.

```json
{
  ...
  "rust-analyzer.check.extraArgs": [
    "--",
    "-W",
    "clippy::pedantic"
  ]
}
```
