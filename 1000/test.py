import builtins
import io
import json
import sys
from typing import Callable, Optional

prints: list[str] = []


def print(*args, **kwargs):
    prints.append(
        kwargs.get("sep", " ").join(map(str, args))
        + kwargs.get("end", "\n")
    )


def test(solution: Callable[[], None]):
    is_any_failed: bool = False

    with open("examples.json") as f:
        example: list[dict[str, str]] = json.load(f).get("examples", [])

    for inout in example:
        sys.stdin = io.StringIO(inout.get("input", ""))
        input = sys.stdin.readline

        solution()

        got = "".join(prints).strip()
        expected = inout.get("output", "").strip()

        try:
            assert got == expected
        except AssertionError:
            is_any_failed = True
            print_result(
                input=inout.get("input", ""),
                expected=expected,
                got=got,
            )

        prints.clear()

    if is_any_failed:
        builtins.print("Try again!")
    else:
        builtins.print("All tests passed!")


def test_example(solution):
    def test(inputs: str, expected: Optional[str] = None):
        sys.stdin = io.StringIO(inputs)
        input = sys.stdin.readline
        solution()
        got = "".join(prints).strip()
        if expected is None:
            print_result(
                input=inputs,
                got=got,
            )
        else:
            try:
                assert got == expected
            except AssertionError:
                print_result(
                    input=inputs,
                    expected=expected,
                    got=got,
                )
                builtins.print("Try again!")
            else:
                print_result(
                    input=inputs,
                    got=got,
                )
                builtins.print("Test passed!")
        prints.clear()
    return test


def print_result(**kwargs):
    for name, value in kwargs.items():
        sep = "\n" if value.find("\n") != -1 else " "
        builtins.print(name.capitalize() + ":", value, sep=sep)
