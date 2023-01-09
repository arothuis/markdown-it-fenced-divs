# @arothuis/markdown-it-fenced-divs
[![Coverage Status](https://coveralls.io/repos/github/arothuis/markdown-it-fenced-divs/badge.svg?branch=main)](https://coveralls.io/github/arothuis/markdown-it-fenced-divs?branch=main)

A [markdown-it](https://github.com/markdown-it/markdown-it) 
plug-in for creating custom fenced divs.
Based on [markdown-it-container](https://github.com/markdown-it/markdown-it-container).

## Features
We support the following:
* Create arbitrary divs with classnames in Markdown
* Nesting of named containers
* Unnamed containers (nesting not supported)
* Custom default classes
* Integration with [markdown-it-attrs](https://github.com/arve0/markdown-it-attrs),
also for unnamed containers

## Installation
Install the plugin via NPM:
```
npm i @arothuis/markdown-it-fenced-divs
```

Add the plugin to markdown-it:
```javascript
const markdownIt = require("markdown-it");
const mdFenced = require("@arothuis/markdown-it-fenced-divs");

const md = markdownIt();

// With default configuration
md.use(mdFenced);
```

## Usage examples
For more examples, see: [tests](test/fixtures).

### Basic use case
Input:
```markdown
This is outside of the block.

::: my-block
This is inside the block.
:::
```

Output:
```html
<p>This is outside of the block.</p>
<div class="my-block">
<p>This is inside the block.</p>
</div>
```

### Nested containers
Input:
```markdown
This is outside of the block.

::: outer-block
This is inside the outer block.

::: inner-block
This is inside the inner block.
:::
:::
```

Output:
```html
<p>This is outside of the block.</p>
<div class="outer-block">
<p>This is inside the outer block.</p>
<div class="inner-block">
<p>This is inside the inner block.</p>
</div></div>
```

#### Careful with indentation!
We should be mindful of 
our indentation. As soon as we use 
4 spaces, our lines will be treated as
part of a code block, which causes unexpected
results.

## Customization
The following properties can be customized:
```javascript
const options = {
    // Class to add to each fenced div element (for easy generic styling)
    defaultClass: "",
};


// Add plugin with custom options
md.use(mdFenced, options);
```
