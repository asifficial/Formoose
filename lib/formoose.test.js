import { expect, test } from "vitest";
import Formoose from "./formoose";

test("should create a new instance of formoose", () => {
  let formoose = new Formoose();

  expect(formoose).toBeInstanceOf(Formoose);
});

test("should initialize formoose", () => {
  let formoose = new Formoose();

  expect(formoose.forms).toBeInstanceOf(NodeList);
});

test("should validate the form when the data-formoose-form is provided", () => {
  let formoose = new Formoose();

  let form = document.createElement("form");
  let input = document.createElement("input");

  input.setAttribute("data-formoose-form");

  document.body.appendChild(form);

  expect(formoose.validateForm(form)).toBe(true);

  document.body.removeChild(form);
});

test("should pass when a value is provided", () => {
  let formoose = new Formoose();

  let form = document.createElement("form");
  let input = document.createElement("input");
  input.setAttribute("data-formoose-required", "true");
  input.setAttribute("type", "text");
  input.setAttribute("name", "test");
  input.setAttribute("value", "test");

  form.appendChild(input);
  document.body.appendChild(form);

  expect(formoose.validateInput(input).isValid).toBe(true);
});

test("should fail when a value is not provided", () => {
  let formoose = new Formoose();

  let form = document.createElement("form");
  let input = document.createElement("input");
  input.setAttribute("data-formoose-required", "true");
  input.setAttribute("type", "text");
  input.setAttribute("name", "test");

  form.appendChild(input);
  document.body.appendChild(form);

  expect(formoose.validateInput(input).isValid).toBe(false);
});

test("should pass when the value matches a valid email address format", () => {
  let formoose = new Formoose();

  let form = document.createElement("form");
  let input = document.createElement("input");
  input.setAttribute("data-formoose-email", "true");
  input.setAttribute("type", "email");
  input.setAttribute("name", "test");
  input.setAttribute("value", "test@domain.test");

  form.appendChild(input);
  document.body.appendChild(form);
  expect(formoose.validateInput(input).isValid).toBe(true);

  document.body.removeChild(form);
});

test("should fail when the value does not match a valid email address format", () => {
  let formoose = new Formoose();

  let form = document.createElement("form");
  let input = document.createElement("input");
  input.setAttribute("data-formoose-email", "true");
  input.setAttribute("type", "email");
  input.setAttribute("name", "test");
  input.setAttribute("value", "test");

  form.appendChild(input);
  document.body.appendChild(form);

  expect(formoose.validateInput(input).isValid).toBe(false);

  document.body.removeChild(form);
});

test("should pass when the value length is greater than or equal to the specified minimum length", () => {
  let formoose = new Formoose();

  let form = document.createElement("form");
  let input = document.createElement("input");
  input.setAttribute("data-formoose-min", "5");
  input.setAttribute("type", "text");
  input.setAttribute("name", "test");
  input.setAttribute("value", "testing");

  form.appendChild(input);
  document.body.appendChild(form);

  expect(formoose.validateInput(input).isValid).toBe(true);

  document.body.removeChild(form);
});

test("should fail when the value length is less than the specified minimum length", () => {
  let formoose = new Formoose();

  let form = document.createElement("form");
  let input = document.createElement("input");
  input.setAttribute("data-formoose-min", "5");
  input.setAttribute("type", "text");
  input.setAttribute("name", "test");
  input.setAttribute("value", "test");

  form.appendChild(input);
  document.body.appendChild(form);

  expect(formoose.validateInput(input).isValid).toBe(false);

  document.body.removeChild(form);
});

test("should pass when the value length is less than or equal to the specified maximum length", () => {
  let formoose = new Formoose();

  let form = document.createElement("form");
  let input = document.createElement("input");
  input.setAttribute("data-formoose-max", "5");
  input.setAttribute("type", "text");
  input.setAttribute("name", "test");
  input.setAttribute("value", "test");

  form.appendChild(input);
  document.body.appendChild(form);

  expect(formoose.validateInput(input).isValid).toBe(true);

  document.body.removeChild(form);
});

test("should fail when the value length is greater than the specified maximum length", () => {
  let formoose = new Formoose();

  let form = document.createElement("form");
  let input = document.createElement("input");
  input.setAttribute("data-formoose-max", "5");
  input.setAttribute("type", "text");
  input.setAttribute("name", "test");
  input.setAttribute("value", "testing");

  form.appendChild(input);
  document.body.appendChild(form);

  expect(formoose.validateInput(input).isValid).toBe(false);

  document.body.removeChild(form);
});

test("should pass when the value is number", () => {
  let formoose = new Formoose();

  let form = document.createElement("form");
  let input = document.createElement("input");
  input.setAttribute("data-formoose-number", "true");
  input.setAttribute("type", "text");
  input.setAttribute("name", "test");
  input.setAttribute("value", "test");

  form.appendChild(input);
  document.body.appendChild(form);

  expect(formoose.validateInput(input).isValid).toBe(false);

  document.body.removeChild(form);
});

test("should fail when the value is not a number", () => {
  let formoose = new Formoose();

  let form = document.createElement("form");
  let input = document.createElement("input");
  input.setAttribute("data-formoose-number", "true");
  input.setAttribute("type", "text");
  input.setAttribute("name", "test");
  input.setAttribute("value", "test");

  form.appendChild(input);
  document.body.appendChild(form);

  expect(formoose.validateInput(input).isValid).toBe(false);

  document.body.removeChild(form);
});

test("should pass when the value contains atleast one uppercase letter, one lowercase letter, one number and one special character", () => {
  let formoose = new Formoose();

  let form = document.createElement("form");
  let input = document.createElement("input");
  input.setAttribute("data-formoose-strongPassword", "true");
  input.setAttribute("type", "text");
  input.setAttribute("name", "test");
  input.setAttribute("value", "Password1!");

  form.appendChild(input);
  document.body.appendChild(form);

  expect(formoose.validateInput(input).isValid).toBe(true);

  document.body.removeChild(form);
});

test("should fail when the value does not contains atleast one uppercase letter, one lowercase letter, one number and one special character", () => {
  let formoose = new Formoose();

  let form = document.createElement("form");
  let input = document.createElement("input");
  input.setAttribute("data-formoose-strongPassword", "true");
  input.setAttribute("type", "text");
  input.setAttribute("name", "test");
  input.setAttribute("value", "test");

  form.appendChild(input);
  document.body.appendChild(form);

  expect(formoose.validateInput(input).isValid).toBe(false);

  document.body.removeChild(form);
});

test("should pass when the value matches the another input value", () => {
  let formoose = new Formoose();

  let form = document.createElement("form");
  let input = document.createElement("input");
  input.setAttribute("data-formoose-same", "test2");
  input.setAttribute("type", "text");
  input.setAttribute("name", "test");
  input.setAttribute("value", "test");

  let input2 = document.createElement("input");
  input2.setAttribute("data-formoose-same", "test");
  input2.setAttribute("type", "text");
  input2.setAttribute("name", "test2");
  input2.setAttribute("value", "test");

  form.appendChild(input);
  form.appendChild(input2);
  document.body.appendChild(form);

  expect(formoose.validateInput(input).isValid).toBe(true);

  document.body.removeChild(form);
});

test("should fail when the value does not match the another input value", () => {
  let formoose = new Formoose();

  let form = document.createElement("form");
  let input = document.createElement("input");
  input.setAttribute("data-formoose-same", "test2");
  input.setAttribute("type", "text");
  input.setAttribute("name", "test");
  input.setAttribute("value", "test1");

  let input2 = document.createElement("input");
  input2.setAttribute("data-formoose-same", "test");
  input2.setAttribute("type", "text");
  input2.setAttribute("name", "test2");
  input2.setAttribute("value", "test");

  form.appendChild(input);
  form.appendChild(input2);
  document.body.appendChild(form);

  expect(formoose.validateInput(input).isValid).toBe(false);

  document.body.removeChild(form);
});

test("should pass when a value is a valid date", () => {
  let formoose = new Formoose();

  let form = document.createElement("form");
  let input = document.createElement("input");
  input.setAttribute("data-formoose-date", "true");
  input.setAttribute("type", "text");
  input.setAttribute("name", "test");
  input.setAttribute("value", "2021-01-01");

  form.appendChild(input);
  document.body.appendChild(form);

  expect(formoose.validateInput(input).isValid).toBe(true);

  document.body.removeChild(form);
});

test("should fail when a value is not a valid date", () => {
  let formoose = new Formoose();

  let form = document.createElement("form");
  let input = document.createElement("input");
  input.setAttribute("data-formoose-date", "true");
  input.setAttribute("type", "text");
  input.setAttribute("name", "test");
  input.setAttribute("value", "test");

  form.appendChild(input);
  document.body.appendChild(form);

  expect(formoose.validateInput(input).isValid).toBe(false);

  document.body.removeChild(form);
});

test("should pass when a value contains only letters", () => {
  let formoose = new Formoose();

  let form = document.createElement("form");
  let input = document.createElement("input");
  input.setAttribute("data-formoose-alpha", "true");
  input.setAttribute("type", "text");
  input.setAttribute("name", "test");
  input.setAttribute("value", "test");

  form.appendChild(input);
  document.body.appendChild(form);

  expect(formoose.validateInput(input).isValid).toBe(true);

  document.body.removeChild(form);
});

test("should fail when a value does not contains only letters", () => {
  let formoose = new Formoose();

  let form = document.createElement("form");
  let input = document.createElement("input");
  input.setAttribute("data-formoose-alpha", "true");
  input.setAttribute("type", "text");
  input.setAttribute("name", "test");
  input.setAttribute("value", "test123");

  form.appendChild(input);
  document.body.appendChild(form);

  expect(formoose.validateInput(input).isValid).toBe(false);

  document.body.removeChild(form);
});

test("should pass when a value contains letters and numbers", () => {
  let formoose = new Formoose();

  let form = document.createElement("form");
  let input = document.createElement("input");
  input.setAttribute("data-formoose-alphaNumeric", "true");
  input.setAttribute("type", "text");
  input.setAttribute("name", "test");
  input.setAttribute("value", "test123");

  form.appendChild(input);
  document.body.appendChild(form);

  expect(formoose.validateInput(input).isValid).toBe(true);

  document.body.removeChild(form);
});

test("should fail when a value does not contains letters and numbers", () => {
  let formoose = new Formoose();

  let form = document.createElement("form");
  let input = document.createElement("input");
  input.setAttribute("data-formoose-alphaNumeric", "true");
  input.setAttribute("type", "text");
  input.setAttribute("name", "test");
  input.setAttribute("value", "!@#$%^&*");

  form.appendChild(input);
  document.body.appendChild(form);

  expect(formoose.validateInput(input).isValid).toBe(false);

  document.body.removeChild(form);
});

test("should pass when a value contains letters and dashes", () => {
  let formoose = new Formoose();

  let form = document.createElement("form");
  let input = document.createElement("input");
  input.setAttribute("data-formoose-alphaDash", "true");
  input.setAttribute("type", "text");
  input.setAttribute("name", "test");
  input.setAttribute("value", "test-_");

  form.appendChild(input);
  document.body.appendChild(form);

  expect(formoose.validateInput(input).isValid).toBe(true);

  document.body.removeChild(form);
});

test("should fail when a value does not contains letters and dashes", () => {
  let formoose = new Formoose();

  let form = document.createElement("form");
  let input = document.createElement("input");
  input.setAttribute("data-formoose-alphaDash", "true");
  input.setAttribute("type", "text");
  input.setAttribute("name", "test");
  input.setAttribute("value", "123");

  form.appendChild(input);
  document.body.appendChild(form);

  expect(formoose.validateInput(input).isValid).toBe(false);

  document.body.removeChild(form);
});

test("should pass when a value is 'on', 'yes' or '1'", () => {
  let formoose = new Formoose();

  let form = document.createElement("form");
  let input = document.createElement("input");
  input.setAttribute("data-formoose-accepted", "true");
  input.setAttribute("type", "text");
  input.setAttribute("name", "test");
  input.setAttribute("value", "1");

  form.appendChild(input);
  document.body.appendChild(form);

  expect(formoose.validateInput(input).isValid).toBe(true);

  document.body.removeChild(form);
});

test("should fail when a value is not 'on', 'yes' or '1'", () => {
  let formoose = new Formoose();

  let form = document.createElement("form");
  let input = document.createElement("input");
  input.setAttribute("data-formoose-accepted", "true");
  input.setAttribute("type", "text");
  input.setAttribute("name", "test");
  input.setAttribute("value", "test");

  form.appendChild(input);
  document.body.appendChild(form);

  expect(formoose.validateInput(input).isValid).toBe(false);

  document.body.removeChild(form);
});

test("should pass when a value is an array", () => {
  let formoose = new Formoose();

  let form = document.createElement("form");
  let input = document.createElement("input");
  input.setAttribute("data-formoose-array", "true");
  input.setAttribute("type", "text");
  input.setAttribute("name", "test[]");
  input.setAttribute("value", "test");

  let input2 = document.createElement("input");
  input2.setAttribute("data-formoose-array", "true");
  input2.setAttribute("type", "text");
  input2.setAttribute("name", "test[]");
  input2.setAttribute("value", "test2");

  form.appendChild(input);
  form.appendChild(input2);
  document.body.appendChild(form);

  expect(formoose.validateInput(input).isValid).toBe(true);

  document.body.removeChild(form);
});

test("should fail when a value is not an array", () => {
  let formoose = new Formoose();

  let form = document.createElement("form");
  let input = document.createElement("input");
  input.setAttribute("data-formoose-array", "true");
  input.setAttribute("type", "text");
  input.setAttribute("name", "test");
  input.setAttribute("value", "test");

  let input2 = document.createElement("input");
  input2.setAttribute("data-formoose-array", "true");
  input2.setAttribute("type", "text");
  input2.setAttribute("name", "test");
  input2.setAttribute("value", "test2");

  form.appendChild(input);
  form.appendChild(input2);
  document.body.appendChild(form);

  expect(formoose.validateInput(input).isValid).toBe(false);

  document.body.removeChild(form);
});

test("should pass when a value is a date older than the specified date", () => {
  let formoose = new Formoose();

  let form = document.createElement("form");
  let input = document.createElement("input");

  input.setAttribute("data-formoose-dateBefore", "2025-01-01");
  input.setAttribute("type", "text");
  input.setAttribute("name", "test");
  input.setAttribute("value", "2020-01-01");

  form.appendChild(input);
  document.body.appendChild(form);

  expect(formoose.validateInput(input).isValid).toBe(true);

  document.body.removeChild(form);
});

test("should fail when a value is not a date older than the specified date", () => {
  let formoose = new Formoose();

  let form = document.createElement("form");
  let input = document.createElement("input");

  input.setAttribute("data-formoose-dateBefore", "2025-01-01");
  input.setAttribute("type", "text");
  input.setAttribute("name", "test");
  input.setAttribute("value", "2026-01-01");

  form.appendChild(input);
  document.body.appendChild(form);

  expect(formoose.validateInput(input).isValid).toBe(false);

  document.body.removeChild(form);
});

test("should pass when a value is a date newer than the specified date", () => {
  let formoose = new Formoose();

  let form = document.createElement("form");
  let input = document.createElement("input");

  input.setAttribute("data-formoose-dateAfter", "2025-01-01");
  input.setAttribute("type", "text");
  input.setAttribute("name", "test");
  input.setAttribute("value", "2026-01-01");

  form.appendChild(input);
  document.body.appendChild(form);

  expect(formoose.validateInput(input).isValid).toBe(true);

  document.body.removeChild(form);
});

test("should fail when a value is not a date newer than the specified date", () => {
  let formoose = new Formoose();

  let form = document.createElement("form");
  let input = document.createElement("input");

  input.setAttribute("data-formoose-dateAfter", "2025-01-01");
  input.setAttribute("type", "text");
  input.setAttribute("name", "test");
  input.setAttribute("value", "2024-01-01");

  form.appendChild(input);
  document.body.appendChild(form);

  expect(formoose.validateInput(input).isValid).toBe(false);

  document.body.removeChild(form);
});

test("should pass when a value is a number between the specified range", () => {
  let formoose = new Formoose();

  let form = document.createElement("form");
  let input = document.createElement("input");

  input.setAttribute("data-formoose-between", "1,10");
  input.setAttribute("type", "text");
  input.setAttribute("name", "test");
  input.setAttribute("value", "5");

  form.appendChild(input);
  document.body.appendChild(form);

  expect(formoose.validateInput(input).isValid).toBe(true);

  document.body.removeChild(form);
});

test("should fail when a value is not a number between the specified range", () => {
  let formoose = new Formoose();

  let form = document.createElement("form");
  let input = document.createElement("input");

  input.setAttribute("data-formoose-between", "1,10");
  input.setAttribute("type", "text");
  input.setAttribute("name", "test");
  input.setAttribute("value", "11");

  form.appendChild(input);
  document.body.appendChild(form);

  expect(formoose.validateInput(input).isValid).toBe(false);

  document.body.removeChild(form);
});

test("should pass when a value is a boolean", () => {
  let formoose = new Formoose();

  let form = document.createElement("form");
  let input = document.createElement("input");

  input.setAttribute("data-formoose-boolean", "true");
  input.setAttribute("type", "text");
  input.setAttribute("name", "test");
  input.setAttribute("value", "true");

  form.appendChild(input);
  document.body.appendChild(form);

  expect(formoose.validateInput(input).isValid).toBe(true);

  document.body.removeChild(form);
});

test("should fail when a value is not a boolean", () => {
  let formoose = new Formoose();

  let form = document.createElement("form");
  let input = document.createElement("input");

  input.setAttribute("data-formoose-boolean", "true");
  input.setAttribute("type", "text");
  input.setAttribute("name", "test");
  input.setAttribute("value", "test");

  form.appendChild(input);
  document.body.appendChild(form);

  expect(formoose.validateInput(input).isValid).toBe(false);

  document.body.removeChild(form);
});

test("should pass when a value is different than another input value", () => {
  let formoose = new Formoose();

  let form = document.createElement("form");
  let input = document.createElement("input");
  input.setAttribute("data-formoose-different", "test2");
  input.setAttribute("type", "text");
  input.setAttribute("name", "test");
  input.setAttribute("value", "test");

  let input2 = document.createElement("input");
  input2.setAttribute("data-formoose-different", "test");
  input2.setAttribute("type", "text");
  input2.setAttribute("name", "test2");
  input2.setAttribute("value", "test2");

  form.appendChild(input);
  form.appendChild(input2);
  document.body.appendChild(form);

  expect(formoose.validateInput(input).isValid).toBe(true);

  document.body.removeChild(form);
});

test("should fail when a value is same as another input value", () => {
  let formoose = new Formoose();

  let form = document.createElement("form");
  let input = document.createElement("input");
  input.setAttribute("data-formoose-different", "test2");
  input.setAttribute("type", "text");
  input.setAttribute("name", "test");
  input.setAttribute("value", "test");

  let input2 = document.createElement("input");
  input2.setAttribute("data-formoose-different", "test");
  input2.setAttribute("type", "text");
  input2.setAttribute("name", "test2");
  input2.setAttribute("value", "test");

  form.appendChild(input);
  form.appendChild(input2);
  document.body.appendChild(form);

  expect(formoose.validateInput(input).isValid).toBe(false);

  document.body.removeChild(form);
});

test("should pass when a required radio button is checked", () => {
  let formoose = new Formoose();

  let form = document.createElement("form");
  let input = document.createElement("input");
  input.setAttribute("data-formoose-required", "true");
  input.setAttribute("type", "radio");
  input.setAttribute("name", "test");
  input.setAttribute("value", "test");
  input.setAttribute("checked", true);

  form.appendChild(input);
  document.body.appendChild(form);

  expect(formoose.validateInput(input).isValid).toBe(true);

  document.body.removeChild(form);
});

test("should fail when a required radio button is not checked", () => {
  let formoose = new Formoose();

  let form = document.createElement("form");
  let input = document.createElement("input");
  input.setAttribute("data-formoose-required", "true");
  input.setAttribute("type", "radio");
  input.setAttribute("name", "test");
  input.setAttribute("value", "test");

  form.appendChild(input);
  document.body.appendChild(form);

  expect(formoose.validateInput(input).isValid).toBe(false);

  document.body.removeChild(form);
});

test("should pass when a required radio button group is checked", () => {
  let formoose = new Formoose();

  let form = document.createElement("form");
  let input = document.createElement("input");
  input.setAttribute("data-formoose-required", "true");
  input.setAttribute("type", "radio");
  input.setAttribute("name", "test");
  input.setAttribute("value", "test");
  input.setAttribute("checked", true);

  let input2 = document.createElement("input");
  input2.setAttribute("data-formoose-required", "true");
  input2.setAttribute("type", "radio");
  input2.setAttribute("name", "test");
  input2.setAttribute("value", "test2");

  form.appendChild(input);
  form.appendChild(input2);
  document.body.appendChild(form);

  expect(formoose.validateInput(input).isValid).toBe(true);

  document.body.removeChild(form);
});

test("should fail when a required radio button group is not checked", () => {
  let formoose = new Formoose();

  let form = document.createElement("form");
  let input = document.createElement("input");
  input.setAttribute("data-formoose-required", "true");
  input.setAttribute("type", "radio");
  input.setAttribute("name", "test");
  input.setAttribute("value", "test");

  let input2 = document.createElement("input");
  input2.setAttribute("data-formoose-required", "true");
  input2.setAttribute("type", "radio");
  input2.setAttribute("name", "test");
  input2.setAttribute("value", "test2");

  form.appendChild(input);
  form.appendChild(input2);
  document.body.appendChild(form);

  expect(formoose.validateInput(input).isValid).toBe(false);

  document.body.removeChild(form);
});

test("should pass when a value is a valid URL", () => {
  let formoose = new Formoose();

  let form = document.createElement("form");
  let input = document.createElement("input");

  input.setAttribute("data-formoose-url", "true");
  input.setAttribute("type", "text");
  input.setAttribute("name", "test");
  input.setAttribute("value", "https://example.com");

  form.appendChild(input);
  document.body.appendChild(form);

  expect(formoose.validateInput(input).isValid).toBe(true);

  document.body.removeChild(form);
});

test("should fail when a value is not a valid URL", () => {
  let formoose = new Formoose();

  let form = document.createElement("form");
  let input = document.createElement("input");

  input.setAttribute("data-formoose-url", "true");
  input.setAttribute("type", "text");
  input.setAttribute("name", "test");
  input.setAttribute("value", "test");

  form.appendChild(input);
  document.body.appendChild(form);

  expect(formoose.validateInput(input).isValid).toBe(false);

  document.body.removeChild(form);
});

test("should pass when a value includes in a specified options", () => {
  let formoose = new Formoose();

  let form = document.createElement("form");
  let input = document.createElement("input");
  input.setAttribute("data-formoose-in", "test,test2,test3");
  input.setAttribute("name", "test");
  input.setAttribute("value", "test");

  form.appendChild(input);
  document.body.appendChild(form);

  expect(formoose.validateInput(input).isValid).toBe(true);

  document.body.removeChild(form);
});

test("should fail when a value does not includes in a specified options", () => {
  let formoose = new Formoose();

  let form = document.createElement("form");
  let input = document.createElement("input");
  input.setAttribute("data-formoose-in", "test,test2,test3");
  input.setAttribute("name", "test");
  input.setAttribute("value", "test4");

  form.appendChild(input);
  document.body.appendChild(form);

  expect(formoose.validateInput(input).isValid).toBe(false);

  document.body.removeChild(form);
});

test("should pass when a value does not includes in a specified options", () => {
  let formoose = new Formoose();

  let form = document.createElement("form");
  let input = document.createElement("input");
  input.setAttribute("data-formoose-notIn", "test,test2,test3");
  input.setAttribute("name", "test");
  input.setAttribute("value", "test4");

  form.appendChild(input);
  document.body.appendChild(form);

  expect(formoose.validateInput(input).isValid).toBe(true);

  document.body.removeChild(form);
});

test("should fail when a value includes in a specified options", () => {
  let formoose = new Formoose();

  let form = document.createElement("form");
  let input = document.createElement("input");
  input.setAttribute("data-formoose-notIn", "test,test2,test3");
  input.setAttribute("name", "test");
  input.setAttribute("value", "test");

  form.appendChild(input);
  document.body.appendChild(form);

  expect(formoose.validateInput(input).isValid).toBe(false);

  document.body.removeChild(form);
});

test("should pass when a value startsWith a specified string", () => {
  let formoose = new Formoose();

  let form = document.createElement("form");
  let input = document.createElement("input");
  input.setAttribute("data-formoose-startsWith", "test");
  input.setAttribute("name", "test");
  input.setAttribute("value", "test123");

  form.appendChild(input);
  document.body.appendChild(form);

  expect(formoose.validateInput(input).isValid).toBe(true);

  document.body.removeChild(form);
});

test("should fail when a value does not startsWith a specified string", () => {
  let formoose = new Formoose();

  let form = document.createElement("form");
  let input = document.createElement("input");
  input.setAttribute("data-formoose-startsWith", "test");
  input.setAttribute("name", "test");
  input.setAttribute("value", "123test");

  form.appendChild(input);
  document.body.appendChild(form);

  expect(formoose.validateInput(input).isValid).toBe(false);

  document.body.removeChild(form);
});

test("should pass when a value endsWith a specified string", () => {
  let formoose = new Formoose();

  let form = document.createElement("form");
  let input = document.createElement("input");
  input.setAttribute("data-formoose-endsWith", "test");
  input.setAttribute("name", "test");
  input.setAttribute("value", "123test");

  form.appendChild(input);
  document.body.appendChild(form);

  expect(formoose.validateInput(input).isValid).toBe(true);

  document.body.removeChild(form);
});

test("should fail when a value does not endsWith a specified string", () => {
  let formoose = new Formoose();

  let form = document.createElement("form");
  let input = document.createElement("input");
  input.setAttribute("data-formoose-endsWith", "test");
  input.setAttribute("name", "test");
  input.setAttribute("value", "test123");

  form.appendChild(input);
  document.body.appendChild(form);

  expect(formoose.validateInput(input).isValid).toBe(false);

  document.body.removeChild(form);
});

test("should pass when a value contains a specified string", () => {
  let formoose = new Formoose();

  let form = document.createElement("form");
  let input = document.createElement("input");

  input.setAttribute("data-formoose-contains", "test");
  input.setAttribute("name", "test");
  input.setAttribute("value", "123test123");

  form.appendChild(input);
  document.body.appendChild(form);

  expect(formoose.validateInput(input).isValid).toBe(true);

  document.body.removeChild(form);
});

test("should fail when a value does not contains a specified string", () => {
  let formoose = new Formoose();

  let form = document.createElement("form");
  let input = document.createElement("input");

  input.setAttribute("data-formoose-contains", "test");
  input.setAttribute("name", "test");
  input.setAttribute("value", "123123");

  form.appendChild(input);
  document.body.appendChild(form);

  expect(formoose.validateInput(input).isValid).toBe(false);

  document.body.removeChild(form);
});

test("should pass when a value is a valid phone number", () => {
  let formoose = new Formoose();

  let form = document.createElement("form");
  let input = document.createElement("input");

  input.setAttribute("data-formoose-phone", "true");
  input.setAttribute("name", "test");
  input.setAttribute("value", "+123 456 789 0123");

  form.appendChild(input);
  document.body.appendChild(form);

  expect(formoose.validateInput(input).isValid).toBe(true);

  document.body.removeChild(form);
});

test("should fail when a value is not a valid phone number", () => {
  let formoose = new Formoose();

  let form = document.createElement("form");
  let input = document.createElement("input");

  input.setAttribute("data-formoose-phone", "true");
  input.setAttribute("name", "test");
  input.setAttribute("value", "test");

  form.appendChild(input);
  document.body.appendChild(form);

  expect(formoose.validateInput(input).isValid).toBe(false);

  document.body.removeChild(form);
});

test("should pass when a value is valid time format", () => {
  let formoose = new Formoose();

  let form = document.createElement("form");
  let input = document.createElement("input");

  input.setAttribute("data-formoose-time", "true");
  input.setAttribute("name", "test");
  input.setAttribute("value", "12:00 am");

  form.appendChild(input);
  document.body.appendChild(form);

  expect(formoose.validateInput(input).isValid).toBe(true);

  document.body.removeChild(form);
});

test("should fail when a value is not valid time format", () => {
  let formoose = new Formoose();

  let form = document.createElement("form");
  let input = document.createElement("input");

  input.setAttribute("data-formoose-time", "true");
  input.setAttribute("name", "test");
  input.setAttribute("value", "12:00");

  form.appendChild(input);
  document.body.appendChild(form);

  expect(formoose.validateInput(input).isValid).toBe(false);

  document.body.removeChild(form);
});

test("should pass when a value is a valid 24-hour time format", () => {
  let formoose = new Formoose();

  let form = document.createElement("form");
  let input = document.createElement("input");

  input.setAttribute("data-formoose-time24", "true");
  input.setAttribute("name", "test");
  input.setAttribute("value", "23:59");

  form.appendChild(input);
  document.body.appendChild(form);

  expect(formoose.validateInput(input).isValid).toBe(true);

  document.body.removeChild(form);
});

test("should fail when a value is not a valid 24-hour time format", () => {
  let formoose = new Formoose();

  let form = document.createElement("form");
  let input = document.createElement("input");

  input.setAttribute("data-formoose-time24", "true");
  input.setAttribute("name", "test");
  input.setAttribute("value", "12:00 am");

  form.appendChild(input);
  document.body.appendChild(form);

  expect(formoose.validateInput(input).isValid).toBe(false);

  document.body.removeChild(form);
});

test("should pass when a value is a valid IPv4 address", () => {
  let formoose = new Formoose();

  let form = document.createElement("form");
  let input = document.createElement("input");

  input.setAttribute("data-formoose-ipv4", "true");
  input.setAttribute("name", "test");
  input.setAttribute("value", "0.0.0.0");

  form.appendChild(input);
  document.body.appendChild(form);

  expect(formoose.validateInput(input).isValid).toBe(true);

  document.body.removeChild(form);
});

test("should fail when a value is not a valid IPv4 address", () => {
  let formoose = new Formoose();

  let form = document.createElement("form");
  let input = document.createElement("input");

  input.setAttribute("data-formoose-ipv4", "true");
  input.setAttribute("name", "test");
  input.setAttribute("value", "test");

  form.appendChild(input);
  document.body.appendChild(form);

  expect(formoose.validateInput(input).isValid).toBe(false);

  document.body.removeChild(form);
});

test("should pass when a value is a valid IPv6 address", () => {
  let formoose = new Formoose();

  let form = document.createElement("form");
  let input = document.createElement("input");

  input.setAttribute("data-formoose-ipv6", "true");
  input.setAttribute("name", "test");
  input.setAttribute("value", "2001:0db8:85a3:0000:0000:8a2e:0370:7334");

  form.appendChild(input);
  document.body.appendChild(form);

  expect(formoose.validateInput(input).isValid).toBe(true);

  document.body.removeChild(form);
});
