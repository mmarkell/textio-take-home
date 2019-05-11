# To run #
### `yarn start` or `npm start` 

Open [http://localhost:3000](http://localhost:3000).

# Known issues / future work #
* I need to convert the "flat" structure of the spans to a nested one to get the correct radius formatting.
* json formatting could be better for rules input
* Write unit tests to make sure the testcases output correct `<span>` blocks.

# Code Structure #
## Components ##
* `Main.js`
    - Parent of other components
    - State managed here
* `RulesForm.js`
    - Input for highlighting rules
    - Apply button bound to parent state
* `ContentForm.js`
    - Input for content to highlight
    - Apply button bound to parent state
* `HighlightedText.js`
    - Where the *magic* happens
    - Takes rules and content and renders highlighted section
## Util
* `Util.js`
    - Extracts out the complicated stuff about how to render the highlights

## Tests
* `Testcases.json`  
    - Just json with various rules test cases for merging highlights different ways.
