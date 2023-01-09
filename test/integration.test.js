const { expect } = require("chai");
const { readFileSync } = require("fs");
const markdownIt = require("markdown-it");
const mdAttrs = require("markdown-it-attrs");
const mdFenced = require("../src/");

const md = markdownIt();
const fixture = name => readFileSync(`${__dirname}/fixtures/${name}`, "utf-8");

// Finicky to maintain, but illustrative for desired outputs
//  @TODO: Replace with snapshot testing when API stabilizes
describe("markdown-it plug-in", function () {
    md.use(mdFenced);

    context("default configuration", function () {
        const examples = [
            ["container with paragraph", "single"],
            ["container with inner block to render", "block"],
            ["container with inline content to render", "inline"],
            ["nested containers", "nested"],
            ["no class name", "no-class"],
            ["auto-closes on last line if no end marker found", "auto-close"],
        ];

        examples.forEach(([specification, fixtureName]) => {
            specify(specification, function () {
              const input = fixture(`${fixtureName}.md`);
              const output = md.render(input);
  
              const expected = fixture(`${fixtureName}.html`);
              expect(output).to.equal(expected);
            });
        });
    });

    context("markdown-it-attrs integration", function () {
        md.use(mdAttrs);
        const examples = [
            ["class only added with attrs", "class-only-attrs"],
            ["class in block, class added with attrs", "class-with-attrs"],
        ];

        examples.forEach(([specification, fixtureName]) => {
            specify(specification, function () {
              const input = fixture(`${fixtureName}.md`);
              const output = md.render(input);
  
              const expected = fixture(`${fixtureName}.html`);
              expect(output).to.equal(expected);
            });
        });
    });

    context("customization", function () {
        specify("add custom default class to each fenced div", function () {
            md.use(mdFenced, { defaultClass: "fenced" });
            
            const input = fixture("single.md");
            const expected = fixture("single-custom-default-class.html");
            const output = md.render(input);

            expect(output).to.equal(expected);
        });
    });
});
