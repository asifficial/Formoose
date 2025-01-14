# Validatr

**Validatr** is a lightweight, flexible JavaScript library for form validation. It supports a wide range of validation rules, including custom rules, and is designed to be easy to use and extend.

## Features

- **Rich validates rules**: includes common rules like `email`, `passwords`, `numbers`, `dates`, `checkbox`, and `radio` groups.
- **Custom Messages**: Easily set custom error messages for each rule.
- **Grouped Input Support**: Validate grouped inputs like radio buttons and checkboxes.
- **Event Based**: Custom events (`validatr:submitting`, `validatr:submitted`) to integrate validation seamlessly with your workflow.
- **Easy Error Display**: Automatically displays error messages next to invalid inputs.
- **Highly Configurable**: Customize or extend rules to meet specific requirements.

## Installation
```
npm i validatr
```
Alternatively, you can clone the repository and put the dist directory in your project.

## Build
The `dist` directory contains two pre-built versions of **Validatr** to accommodate different module systems and environments:

### 1. `validatr.es.js`
This build is an **ES Module** (ESM) version of Validatr, designed for modern JavaScript environments that support the `import` and `export` syntax natively.

- **Use Case:**
  Recommended for modern browsers and build tools like Webpack, Vite, or Rollup that handle ESM modules efficiently.
- **How to Use:**
  Import it directly into your JavaScript project:

```javascript
  import Validatr from './dist/validatr.es.js';

  const validatr = new Validatr();
```

### 2. `validatr.umd.js`
This build is a `Universal Module Definition` (UMD) version, which works in both browser and Node.js environments. It is compatible with both CommonJS (require) and AMD module systems, as well as directly in `<script>` tags.

- #### Use Case:
Ideal for projects using older build tools or requiring compatibility with legacy environments. Also suitable for quick integration using `<script>` in HTML files.

- #### How to Use:
    - ##### Browser (via `script` tag):
    ```html
    <script src="./dist/validatr.umd.js"></script>
    <script>
        const validatr = new Validatr();
    </script>
    ```

    - ##### Node.js (CommonJS):
    ```javascript
    const Validatr = require('./dist/validatr.umd.js');

    const validatr = new Validatr();
    ```
## Choose the Right Build
| Build           	| Use Case                                 	| Module System      	| Example Integration             	|
|-----------------	|------------------------------------------	|--------------------	|---------------------------------	|
| `validatr.es.js`  	| Modern JavaScript projects               	| ES Modules (ESM)   	| `import` syntax                   	|
| `validatr.umd.js` 	| Legacy environments or direct script use 	| UMD (CommonJS/AMD) 	| `<script>`  or  `require` statement 	|

Both builds are minified for performance, ensuring fast loading and minimal overhead in production environments. Choose the one that best fits your project's requirements.

## Usage
1. Add the `data-validatr-form` attribute to your form:

```html
<form data-validatr-form>
    ...
</form>
```
2. Initialize **Validatr** in your JavaScript:

```javascript
document.addEventListener("DOMContentLoaded", () => {
    const validatr = new Validatr();
});
```

Optionally you can provide a form to `Validatr` or it will find the forms by `data-validatr-form` attribute

```javascript
document.addEventListener("DOMContentLoaded", () => {
    const validatr = new Validatr(document.getElementById("formId"));
});
```

3. Add rules to input elements
```html
<form data-validatr-form>
    <input type="text" name="name" data-validatr-required>
    <input type="email" name="email" data-validatr-required data-validatr-email>
    <input type="password" name="password" data-validatr-required data-validatr-min="8">
    <button type="submit">Sign Up</button>
</form>
```

### Handling Events
**Validatr** emits custom events during the form submission lifecycle:
- `validatr:submitting` — Before form submission.
- `validatr:submitted` — After form submission.

```javascript
document.addEventListener("validatr:submitted", (event) => {
    console.log("Form submitted:", event.detail);
});
```

## Validation Rules
| Rule           	| Attribute                                 | Description        	                                                        |
|-----------------	|------------------------------------------	|------------------------------------------------------------------------------ |
| Required  	    | `data-validatr-required`               	| Ensure the field is not empty                                                 |
| Email 	        | `data-validatr-email`                 	| Validates an email address                                                    |
| Min Length 	    | `data-validatr-min="3"` 	                | Ensure the value is atleast 3 characters                                      |
| Max Length 	    | `data-validatr-max="10"` 	                | Ensure the value is no more than 10 characters                                |
| Number     	    | `data-validatr-number` 	                | Ensure the value is number                                                    |
| Strong Password 	| `data-validatr-strongPaswword` 	        | Ensures the value contains at least one lowercase letter, one uppercase, one number, and one special character|
| Same As    	    | `data-validatr-same="password"` 	        | Ensure the value is same as another input name `password`                     |
| Date    	        | `data-validatr-date` 	                    | validates a date                                                              |
| Alpha    	        | `data-validatr-alpha` 	                | Ensure the value contains only letters e.g: a-z, A-Z                          |
| Alpha Numeric    	| `data-validatr-alphaNumeric` 	            | Ensure the value contains only letters and numbers e.g: a-z, A-Z, 0-9         |
| Alpha Dash    	| `data-validatr-alphaDash` 	            | Ensure the value contains letters, numbers, underscores and dashes            |
| Accepted    	    | `data-validatr-accepted` 	                | Ensure the value is "on", "yes" or "1"                                        |
| Date Before 	    | `data-validatr-before="1990-01-01"` 	    | Ensure the date value is older than the date provided in the rule             |
| Date After 	    | `data-validatr-after="1990-01-01"` 	    | Ensure the date value is newer than the date provided in the rule             |
| Between    	    | `data-validatr-between="18,65"` 	        | Validates the value between the given comma separated numbers                 |
| Boolean    	    | `data-validatr-boolean` 	                | Ensure the value is "true", "1", "false", or "0"                              |
| Different    	    | `data-validatr-different="email"` 	    | Ensure the value is different than another input name `email`                 |
