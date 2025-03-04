# Formoose

**Formoose** is a lightweight, flexible JavaScript library for form validation. It supports a wide range of validation rules, including custom rules, and is designed to be easy to use and extend.

## Features

- **Rich validation rules**: includes common rules like `email`, `passwords`, `numbers`, `dates`, `checkbox`, and `radio` groups.
- **Custom Messages**: Easily set custom error messages for each rule.
- **Grouped Input Support**: Validate grouped inputs like radio buttons and checkboxes.
- **Event Based**: Custom events (`formoose:submitting`, `formoose:submitted`) to integrate validation seamlessly with your workflow.
- **Easy Error Display**: Automatically displays error messages next to invalid inputs.
- **Highly Configurable**: Customize or extend rules to meet specific requirements.

## Installation
```
npm i formoosejs
```
Alternatively, you can clone the repository and put the dist directory in your project.

## Build
The `dist` directory contains two pre-built versions of **Formoose** to accommodate different module systems and environments:

### 1. `formoose.es.js`
This build is an **ES Module** (ESM) version of Formoose, designed for modern JavaScript environments that support the `import` and `export` syntax natively.

- **Use Case:**
  Recommended for modern browsers and build tools like Webpack, Vite, or Rollup that handle ESM modules efficiently.
- **How to Use:**
  Import it directly into your JavaScript project:

```javascript
  import Formoose from './dist/formoose.es.js';

  const formoose = new Formoose();
```

### 2. `formoose.umd.js`
This build is a `Universal Module Definition` (UMD) version, which works in both browser and Node.js environments. It is compatible with both CommonJS (require) and AMD module systems, as well as directly in `<script>` tags.

- #### Use Case:
Ideal for projects using older build tools or requiring compatibility with legacy environments. Also suitable for quick integration using `<script>` in HTML files.

- #### How to Use:
    - ##### Browser (via `script` tag):
    ```html
    <script src="./dist/formoose.umd.js"></script>
    <script>
        const formoose = new Formoose();
    </script>
    ```

    - ##### Node.js (CommonJS):
    ```javascript
    const Formoose = require('./dist/formoose.umd.js');

    const formoose = new Formoose();
    ```
## Choose the Right Build
| Build           	| Use Case                                 	| Module System      	| Example Integration             	|
|-----------------	|------------------------------------------	|--------------------	|---------------------------------	|
| `formoose.es.js`  	| Modern JavaScript projects               	| ES Modules (ESM)   	| `import` syntax                   	|
| `formoose.umd.js` 	| Legacy environments or direct script use 	| UMD (CommonJS/AMD) 	| `<script>`  or  `require` statement 	|

Both builds are minified for performance, ensuring fast loading and minimal overhead in production environments. Choose the one that best fits your project's requirements.

## Usage
1. Add the `data-formoose-form` attribute to your form:

```html
<form data-formoose-form>
    ...
</form>
```
2. Initialize **Formoose** in your JavaScript:

```javascript
document.addEventListener("DOMContentLoaded", () => {
    const formoose = new Formoose();
});
```

Optionally you can provide a form to `Formoose` or it will find the forms by `data-formoose-form` attribute

```javascript
document.addEventListener("DOMContentLoaded", () => {
    const formoose = new Formoose(document.getElementById("formId"));
});
```

3. Add rules to input elements
```html
<form data-formoose-form>
    <input type="text" name="name" data-formoose-required>
    <input type="email" name="email" data-formoose-required data-formoose-email>
    <input type="password" name="password" data-formoose-required data-formoose-min="8">
    <button type="submit">Sign Up</button>
</form>
```
optionally you can customize a validation message for each validation rule by adding the attribute `data-formoose-{rule}-message` where `{rule}` is a rule name
```html
<input type="email" name="email" data-formoose-required data-formoose-required-message="The email is required">
```

### Handling Events
**Formoose** emits custom events during the form submission lifecycle:
- `formoose:submitting` — Before form submission.
- `formoose:submitted` — After form submission.
- `formoose:success` - After validation succeeds.
- `formoose:error` - After validation fails.

```javascript
document.addEventListener("formoose:submitted", (event) => {
    console.log("Form submitted:", event.detail);
});
```
### Validating Group Elements (Radio, Checkbox)
Wrap `<fieldset>` element around radio and checkbox elements

```html
<fieldset>
    Man: <input type="radio" name="sex" value="Man">
    Woman: <input type="radio" name="sex" value="Woman">
    Other: <input type="radio" name="sex" value="Other">
</fieldset>
```

### Styling
**Formoose** does not impose any styles, you are free to style error elements as per your website color theme, **Formoose** adds the following classes for flexibility:

| Element           | Class                                     | Description                                                                      |
|------------------ |------------------------------------------ |--------------------------------------------------------------------------------- |
| Input             | `formoose-invalid`                        | The class will add to the invalid input e.g: (the `<input>` element)             |
| Div               | `formoose-invalid-feedback`               | The class will add to the error container, the parent `div` of the error message |
| P                 | `formoose-error-message`                  | The class will add to the element contains error message e.g: (the `p` element)  |

## Extend Formoose
**Formoose** allows you to define custom validation rules to handle specific use cases that aren't covered by the built-in rules. Adding a custom rule is simple and follows these steps:

### Define Your Rule
```javascript
const formoose = new Formoose();

formoose.addRule("max", (value, input) => {
    return value.length <= parseInt(input.getAttribute("data-formoose-max"));
}, (input) => `The value must be less than or equal to ${input.getAttribute("data-formoose-max")} characters`);
```

### Use the Rule in Your Form
```html
<input type="text" name="username" data-formoose-max="16">
```

## Validation Rules
| Rule           	| Attribute                                 | Description        	                                                        |
|-----------------	|------------------------------------------	|------------------------------------------------------------------------------ |
| Required  	    | `data-formoose-required`               	| Ensure the field is not empty                                                 |
| Email 	        | `data-formoose-email`                 	| Validates an email address                                                    |
| Min Length 	    | `data-formoose-min="3"` 	                | Ensure the value is atleast 3 characters                                      |
| Max Length 	    | `data-formoose-max="10"` 	                | Ensure the value is no more than 10 characters                                |
| Number     	    | `data-formoose-number` 	                | Ensure the value is number                                                    |
| Strong Password 	| `data-formoose-strongPaswword` 	        | Ensures the value contains at least one lowercase letter, one uppercase, one number, and one special character|
| Same As    	    | `data-formoose-same="password"` 	        | Ensure the value is same as another input name `password`                     |
| Date    	        | `data-formoose-date` 	                    | validates a date                                                              |
| Alpha    	        | `data-formoose-alpha` 	                | Ensure the value contains only letters e.g. a-z, A-Z                          |
| Alpha Numeric    	| `data-formoose-alphaNumeric` 	            | Ensure the value contains only letters and numbers e.g. a-z, A-Z, 0-9         |
| Alpha Dash    	| `data-formoose-alphaDash` 	            | Ensure the value contains letters, numbers, underscores and dashes            |
| Accepted    	    | `data-formoose-accepted` 	                | Ensure the value is "on", "yes" or "1"                                        |
| Array 	        | `data-formoose-array` 	                | Ensure the value is array                                                     |
| Date Before 	    | `data-formoose-dateBefore="1990-01-01"` 	| Ensure the date value is older than the date provided in the rule             |
| Date After 	    | `data-formoose-dateAfter="1990-01-01"` 	| Ensure the date value is newer than the date provided in the rule             |
| Between    	    | `data-formoose-between="18,65"` 	        | Validates the value between the given comma separated numbers                 |
| Boolean    	    | `data-formoose-boolean` 	                | Ensure the value is "true", "1", "false", or "0"                              |
| Different    	    | `data-formoose-different="email"` 	    | Ensure the value is different than another input name `email`                 |
| URL    	        | `data-formoose-url` 	                    | Ensure the value is a valid URL                                               |
| In    	        | `data-formoose-in="option1,option2,option3"` 	    | Ensure the value exists in the specified comma separated options      |
| Not In    	    | `data-formoose-notIn="option1,option2,option3"` 	    | Ensure the value does not exists in the specified comma separated options |
| Starts With    	| `data-formoose-startsWith="test"` 	    | Ensure the value starts with a specified string                               |
| Ends With    	    | `data-formoose-endsWith="test"` 	        | Ensure the value ends with a specified string                                 |
| Contains    	    | `data-formoose-contains="test"` 	        | Ensure the value contains a specified string                                  |
| Not Contains    	| `data-formoose-notContains="test"` 	    | Ensure the value does not contains a specified string                         |
| Phone     	    | `data-formoose-phone`          	        | Ensure the value is a valid phone                                             |
| Time       	    | `data-formoose-time`          	        | Ensure the value is a valid time e.g. 12:00 am                                |
| Time 24       	| `data-formoose-time24`          	        | Ensure the value is a valid 24-hour time e.g. 23:59                           |
| URL            	| `data-formoose-url`             	        | Ensure the value is a valid URL e.g. https://www.example.com                  |
| IPv4            	| `data-formoose-ipv4`             	        | Ensure the value is a valid IPv4 e.g. 0.0.0.0                                 |
| IPv6            	| `data-formoose-ipv6`             	        | Ensure the value is a valid IPv6 e.g. 1000:0ac3:22a2:0000:0000:4b3c:0504:1234                                 |
| Image            	| `data-formoose-image`             	        | Ensure the value is a valid Image                                  |
| Formats            	| `data-formoose-formats="jpg,png"`             	        | Ensure the file has a valid file format                                  |