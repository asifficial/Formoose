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
