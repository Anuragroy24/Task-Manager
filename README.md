---Interactive Task Manager Application
This project is a fully interactive Task Manager built with only HTML, CSS, and Vanilla JavaScript. It demonstrates DOM creation, DOM manipulation, attributes vs properties, event handling, event delegation, event propagation, local storage, task filtering, searching, counters, and the browser rendering pipeline.


---How to Run
Open index.html in a browser. No framework, library, package install, or build step is required.


---Implemented Features

--Create task cards dynamically with createElement(), createTextNode(), append(), and appendChild().
--Store task details using custom attributes: data-id, data-status, and data-category.
--Practice getAttribute(), setAttribute(), removeAttribute(), hasAttribute(), and dataset.
--Demonstrate input.value vs input.getAttribute("value") in JavaScript comments and console output.
--Edit, complete, and delete tasks.
--Use append(), prepend(), before(), after(), replaceWith(), and remove().
--Toggle dark and light mode with classList, dataset, setAttribute(), and data-theme.
--Use event delegation from the task list parent container.
--Demonstrate event bubbling and capturing in the console.
--Show a browser rendering pipeline section with connected visual boxes.
--Include search, category filter, completed counter, pending counter, clear all tasks, DocumentFragment, and local storage.


---Parsing
Parsing is the process where the browser reads the HTML document and understands its structure. The browser scans the markup from top to bottom and identifies tags, attributes, text nodes, and nesting relationships.
---Tokenization
Tokenization happens during parsing. The browser breaks raw HTML text into meaningful tokens such as start tags, end tags, attribute names, attribute values, and text content. These tokens are then used to build the DOM tree.
---DOM Tree
The DOM Tree is an object representation of the HTML document. Every element, text node, and attribute can be accessed and changed through JavaScript. In this project, task cards are created, updated, and removed by manipulating the DOM.
---CSSOM Tree
The CSSOM Tree is the object representation of CSS rules. The browser parses stylesheets and inline styles into a structure it can use to calculate how each DOM node should look.
---Render Tree
The Render Tree combines visible DOM nodes with their matching CSSOM styles. It excludes elements that do not visually render, such as elements with display: none. The browser uses the Render Tree to calculate layout and paint pixels on the screen.
---Event Bubbling
Event bubbling means an event starts at the target element and then travels upward through its ancestors. In the propagation demo, clicking the child button logs the child first, then the parent, then the grandparent during bubbling.
---Event Capturing
Event capturing means an event travels from the outer ancestor down toward the target element before the bubbling phase. In the propagation demo, clicking the child button logs the grandparent first, then the parent, then the child during capturing.
---Event Delegation
Event delegation means placing one event listener on a parent element instead of adding separate listeners to many child elements. This project uses one click listener on the task list container to handle Edit, Complete, and Delete actions for all current and future task cards.