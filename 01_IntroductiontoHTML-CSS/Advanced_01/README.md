# HTML & CSS Quick Reference

A reference guide covering core tags and properties used in this project, with code examples.

### `<!DOCTYPE>` and `<html>`

`<!DOCTYPE html>` is a declaration, not a tag. It tells the browser to use the modern HTML5 standard. Always put it on the first line. The `<html>` tag is the root element that wraps every other element. The `lang` attribute identifies the page language for screen readers and search engines.

```html
<!DOCTYPE html>
<html lang="en">
  ...all page content goes here...
</html>
```

---

### `<head>`

Contains meta-information about the page. Nothing inside `<head>` is shown directly to the user, but it controls the page title, character encoding, and linked stylesheets.

```html
<head>
  <meta charset="UTF-8">
  <title>My Page</title>
  <link rel="stylesheet" href="styles.css">
</head>
```

---

### `<body>`

Everything the user sees goes inside `<body>`: text, images, links, lists, and all other content.

```html
<body>
  <h1>Hello, World!</h1>
  <p>This is the page content.</p>
</body>
```

---

### `<meta>`

Self-closing tags that supply machine-readable information. Common uses include setting the character set, controlling how the page scales on mobile, and adding a search engine description.


```html
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="description" content="A short page summary.">
```

---

## Text & Content

### `<h1>` through `<h6>`

Heading tags define a hierarchy of titles. `<h1>` is the largest and most important, used once per page. `<h2>` through `<h6>` are sub-headings. Browsers apply bold styling and decreasing font sizes automatically.

```html
<h1>Page Title</h1>
<h2>Section Heading</h2>
<h3>Sub-section</h3>
<h4>Smaller sub-heading</h4>
```

---

### `<p>`

The paragraph element. Browsers add space above and below each `<p>` by default, separating blocks of text visually.

```html
<p>This is the first paragraph.</p>
<p>This is a second, separate paragraph.</p>
```

---

### `<b>`, `<i>`, `<strong>`, `<em>`

`<b>` and `<i>` apply bold and italic styling visually. `<strong>` and `<em>` do the same visually but also carry semantic meaning: "this text is important" or "this text is emphasised." Screen readers treat `<strong>` and `<em>` differently from their visual-only counterparts.

```html
<p>
  This is <b>bold</b> and this is <i>italic</i>.
  This is <strong>important</strong> and this is <em>emphasised</em>.
</p>
```

---

### `<br>`

A self-closing line-break tag. It forces text onto a new line without starting a new paragraph. Use it for addresses or poetry, not to add visual spacing — CSS handles that better.

```html
<p>
  123 Main Street<br>
  Springfield<br>
  USA
</p>
```

---

### `<center>`

Centers all child elements horizontally. This tag is **deprecated** in modern HTML, meaning browsers still support it but it is no longer recommended. Use CSS `text-align: center` or flexbox instead.

```html
<!-- Deprecated: old way -->
<center><p>Centered text</p></center>

<!-- Modern CSS equivalent -->
<p style="text-align: center;">Centered text</p>
```

---

### `<code>` and `<pre>`

`<code>` marks inline code snippets, switching to a monospace font. `<pre>` (preformatted) preserves whitespace and line breaks exactly as written in the HTML source. Nest `<code>` inside `<pre>` for multi-line code blocks.

```html
<!-- Inline code -->
<p>Use the <code>font-size</code> property to change text size.</p>

<!-- Multi-line code block -->
<pre><code>
h1 {
  font-size: 2rem;
  color: red;
}
</code></pre>
```

---

## Links & Media

### `<a>`

The anchor tag creates a clickable link. The `href` attribute holds the destination URL. Setting `target="_blank"` opens the link in a new tab. You can link to external pages, internal pages, or a specific section of the same page using an `id` as the target.

```html
<!-- External link -->
<a href="https://example.com" target="_blank">Visit Example</a>

<!-- Jump to a section on the same page -->
<a href="#ingredients">Jump to Ingredients</a>
<section id="ingredients">...</section>
```

---

### `<img>`

A self-closing tag that embeds an image. The `src` attribute is the file path or URL. The `alt` attribute is required: it describes the image for screen readers and displays if the image fails to load.

```html
<!-- Local image file -->
<img src="photo.jpg" alt="A bowl of pasta" width="400">

<!-- External image with CSS sizing -->
<img src="https://example.com/photo.jpg"
     alt="Description"
     style="width: 100%; height: auto;">
```

---

## Lists

### `<ul>` and `<li>`

`<ul>` creates an unordered (bulleted) list. Each item goes inside an `<li>` tag. The order of items carries no implied sequence.

```html
<ul>
  <li>Pecorino Romano</li>
  <li>Black Pepper</li>
  <li>Pasta</li>
</ul>
```

---

### `<ol>`

An ordered (numbered) list. Use it when sequence matters, like recipe steps or ranked results. The browser numbers each `<li>` automatically. The `start` attribute changes the starting number.

```html
<ol>
  <li>Boil salted water.</li>
  <li>Cook pasta until al dente.</li>
  <li>Reserve pasta water.</li>
</ol>

<!-- Start numbering from 5 -->
<ol start="5">
  <li>This item is numbered 5.</li>
</ol>
```

---

## Grouping Elements

### `<div>`

A generic block-level container with no visual styling by default. Use it to group elements so you can style or position them as a unit with CSS. A `<div>` always starts on a new line and takes the full available width.

```html
<div class="card">
  <h2>Card Title</h2>
  <p>Card content goes here.</p>
</div>
```

---

### Semantic elements: `<section>`, `<header>`, `<main>`, `<footer>`, `<aside>`

These behave like `<div>` visually, but each name communicates its purpose to browsers, search engines, and screen readers. Use them to describe the role of a section, not just contain it.

```html
<header>Site navigation and logo</header>
<main>
  <section>A thematic group of content</section>
  <aside>Related sidebar content</aside>
</main>
<footer>Copyright, links</footer>
```

---

### `<span>`

A generic **inline** container. Unlike `<div>`, it does not break onto a new line. Use it to style or target a specific word or phrase inside a block of text without disrupting the flow.

```html
<p>
  The price is <span class="highlight">$14.99</span> today.
</p>
```

---

## CSS Basics

### Selectors

A selector targets HTML elements to apply styles. The three most common are the element selector (targets all tags of that type), the class selector (targets any element with that class, prefixed with `.`), and the ID selector (targets one unique element, prefixed with `#`).

```css
/* Element selector: targets all <p> tags */
p {
  color: navy;
}

/* Class selector: targets any element with class="card" */
.card {
  background: white;
  padding: 16px;
}

/* ID selector: targets the element with id="header" */
#header {
  font-size: 2rem;
}
```

---

### Box Model

Every HTML element is a box with four layers: **content** (the actual text or image), **padding** (space inside the border), **border** (the line around the element), and **margin** (space outside the border, between elements).

```css
.box {
  width: 200px;
  padding: 16px;
  border: 2px solid black;
  margin: 24px;
  box-sizing: border-box;
}
```

> `box-sizing: border-box` makes `width` and `height` include padding and border, which is easier to work with.

---

### Colors

CSS accepts colors in four formats: named keywords, hex codes, RGB, and HSL. Hex and RGB are most common. HSL (hue, saturation, lightness) is useful when you need to adjust brightness without changing the hue.

```css
p {
  color: tomato;
  color: #e05c2a;
  color: rgb(224, 92, 42);
  color: hsl(18, 74%, 52%);
  background-color: #f5f0e8;
  opacity: 0.8;
}
```

---

### Typography

These properties control how text looks. `font-family` sets the typeface — list fallbacks separated by commas. `font-size` controls size, with `rem` units being relative to the root font size. `line-height` controls spacing between lines.

```css
body {
  font-family: 'Georgia', Times, serif;
  font-size: 17px;
  font-weight: 400;
  font-style: italic;
  line-height: 1.6;
  letter-spacing: 0.05em;
  text-align: center;
  text-transform: uppercase;
}
```

---

### Layout: `display`

The `display` property is the most important layout control in CSS. Block elements stack vertically. Inline elements flow with text. `flex` and `grid` turn an element into a layout container for its children.

```css
.row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
}

.grid {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 24px;
}
```

---

### CSS Custom Properties (Variables)

CSS variables let you store a value once and reuse it throughout a stylesheet. Define them inside `:root` (the document's top level) so they apply everywhere. Access them with the `var()` function.

```css
:root {
  --primary-color: #a9b778;
  --font-size-base: 17px;
  --spacing-md: 16px;
}

body {
  background-color: var(--primary-color);
  font-size: var(--font-size-base);
}

.card {
  padding: var(--spacing-md);
  border: 1px solid var(--primary-color);
}
```

---

### External Stylesheets

An external CSS file keeps all styles separate from your HTML. Link it inside `<head>` with a `<link>` tag. The browser downloads the CSS file once and caches it, so every page that links to it loads faster. This is the standard approach for any real project.

```html
<!-- In your HTML file -->
<head>
  <link rel="stylesheet" href="styles.css">
</head>
```

```css
/* In styles.css */
body {
  font-family: Georgia, serif;
  margin: 0;
}

h1 {
  color: #333;
}
```