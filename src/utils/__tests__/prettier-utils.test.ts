import { formatJsx, formatCss } from "@/utils";
import { expect } from "vitest";

describe("prettier-utils", () => {
  describe("formatJsx", () => {
    it("should return a correctly formatted string when given valid one-liner JSX code", async () => {
      const code = "<div>Hello, World!</div>";
      const result = await formatJsx(code);
      expect(result).toMatchSnapshot();
    });

    it("should return a correctly formatted string when given valid multi-liner JSX code", async () => {
      const code = `<div><Button>Hello, World!</Button><Dropdown options={[{ value: 1, label: "Option 1" },{ value: 2, label: "Option 2" },{ value: 3, label: "Option 3" }]}/></div>`;
      const result = await formatJsx(code);
      expect(result).toMatchSnapshot();
    });

    it("should return empty string for empty input", async () => {
      const code = "";
      const expected = "";
      const result = await formatJsx(code);
      expect(result).toEqual(expected);
    });

    it("should remove leading and trailing white space in the input string", async () => {
      const code = "      <div>Hello, World!</div>   ";
      const result = await formatJsx(code);
      expect(result).toMatchSnapshot();
    });

    it("should throw when given invalid JSX code", async () => {
      const code = "<div>Hello, World!</span>";
      expect(async () => {
        await formatJsx(code);
      }).rejects.toThrowError();
    });

    it("should handle multi-line comments correctly", async () => {
      const code = `<div><Button>Hello, World!</Button><Dropdown /*dropdown options*/ options={[{ value: 1, label: "Option 1" },{ value: 2, label: "Option 2" },{ value: 3, label: "Option 3" }]}/></div>`;
      const result = await formatJsx(code);
      expect(result).toMatchSnapshot();
    });

    it("should handle single-line comments correctly", async () => {
      const code = `
        <div>
            <Button>Hello, World!</Button>
            <Dropdown //dropdown options
                options={[
                    { value: 1, label: "Option 1" },{ value: 2, label: "Option 2" },{ value: 3, label: "Option 3" }]
                }/>
        </div>`;
      const result = await formatJsx(code);
      expect(result).toMatchSnapshot();
    });
  });

  describe("formatCss", () => {
    it("should return a correctly formatted string when given valid one-liner CSS code", async () => {
      const code = "body { color: red; }";
      const result = await formatCss(code);
      expect(result).toMatchSnapshot();
    });

    it("should return a correctly formatted string when given valid multi-liner CSS code", async () => {
      const code = `.container { display: flex;flex-direction: column;align-items: center; }.button { background-color: blue;color: white;padding: 10px 20px; }`;
      const result = await formatCss(code);
      expect(result).toMatchSnapshot();
    });

    it("should return empty string for empty input", async () => {
      const code = "";
      const expected = "";
      const result = await formatCss(code);
      expect(result).toEqual(expected);
    });

    it("should remove leading and trailing white space in the input string", async () => {
      const code = "      body { color: red; }      ";
      const result = await formatCss(code);
      expect(result).toMatchSnapshot();
    });

    it("should throw when given invalid CSS code", async () => {
      const code = "body { color: red; .{.button { background-color: blue; } }";
      expect(async () => {
        await formatCss(code);
      }).rejects.toThrowError();
    });

    it("should handle multi-line comments correctly", async () => {
      const code = `/* Container styles */.container { display: flex;/* Flexbox properties */flex-direction: column;align-items: center; }`;
      const result = await formatCss(code);
      expect(result).toMatchSnapshot();
    });

    it("should handle single-line comments correctly", async () => {
      const code = `
      .button {

        background-color: blue;  // Button background color
      color: white;            // Button text color
        padding: 10px 20px;      // Button padding
      }
    `;
      const result = await formatCss(code);
      expect(result).toMatchSnapshot();
    });
  });
});
