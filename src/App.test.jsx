import { CustomBtn } from "@components/buttons/CustomBtn";
import { render } from "@testing-library/react";
import { describe, expect, it, test } from "vitest";

test("demo", () => {
  expect(true).toBe(true);
});

describe("render", () => {
  it("render a button", () => {
    render(<CustomBtn />);
    expect(true).toBeTruthy();
  });
});
