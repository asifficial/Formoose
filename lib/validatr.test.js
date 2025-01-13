import { expect, test } from "vitest";
import Validatr from "./validatr";

test("should create a new instance of validatr", () => {
  let validatr = new Validatr();

  expect(validatr).toBeInstanceOf(Validatr);
});

test("should initialize validatr", () => {
  let validatr = new Validatr();

  expect(validatr.forms).toBeInstanceOf(NodeList);
});

test("should validate the form when the data-validatr-form is provided", () => {
  let validatr = new Validatr();

  let form = document.createElement("form");
  let input = document.createElement("input");

  input.setAttribute("data-validatr-form");

  document.body.appendChild(form);

  expect(validatr.validateForm(form)).toBe(true);

  document.body.removeChild(form);
});

test("should pass when a value is provided", () => {
  let validator = new Validatr();

  let form = document.createElement("form");
  let input = document.createElement("input");
  input.setAttribute("data-validatr-required", "true");
  input.setAttribute("type", "text");
  input.setAttribute("name", "test");
  input.setAttribute("value", "test");

  form.appendChild(input);
  document.body.appendChild(form);

  expect(validator.validateInput(input).isValid).toBe(true);
});

test("should fail when a value is not provided", () => {
  let validator = new Validatr();

  let form = document.createElement("form");
  let input = document.createElement("input");
  input.setAttribute("data-validatr-required", "true");
  input.setAttribute("type", "text");
  input.setAttribute("name", "test");

  form.appendChild(input);
  document.body.appendChild(form);

  expect(validator.validateInput(input).isValid).toBe(false);
});

test("should pass when the value matches a valid email address format", () => {
  let validator = new Validatr();

  let form = document.createElement("form");
  let input = document.createElement("input");
  input.setAttribute("data-validatr-email", "true");
  input.setAttribute("type", "email");
  input.setAttribute("name", "test");
  input.setAttribute("value", "test@domain.test");

  form.appendChild(input);
  document.body.appendChild(form);
  expect(validator.validateInput(input).isValid).toBe(true);

  document.body.removeChild(form);
});

test("should fail when the value does not match a valid email address format", () => {
  let validator = new Validatr();

  let form = document.createElement("form");
  let input = document.createElement("input");
  input.setAttribute("data-validatr-email", "true");
  input.setAttribute("type", "email");
  input.setAttribute("name", "test");
  input.setAttribute("value", "test");

  form.appendChild(input);
  document.body.appendChild(form);

  expect(validator.validateInput(input).isValid).toBe(false);

  document.body.removeChild(form);
});

test("should pass when the value length is greater than or equal to the specified minimum length", () => {
  let validator = new Validatr();

  let form = document.createElement("form");
  let input = document.createElement("input");
  input.setAttribute("data-validatr-min", "5");
  input.setAttribute("type", "text");
  input.setAttribute("name", "test");
  input.setAttribute("value", "testing");

  form.appendChild(input);
  document.body.appendChild(form);

  expect(validator.validateInput(input).isValid).toBe(true);

  document.body.removeChild(form);
});

test("should fail when the value length is less than the specified minimum length", () => {
  let validator = new Validatr();

  let form = document.createElement("form");
  let input = document.createElement("input");
  input.setAttribute("data-validatr-min", "5");
  input.setAttribute("type", "text");
  input.setAttribute("name", "test");
  input.setAttribute("value", "test");

  form.appendChild(input);
  document.body.appendChild(form);

  expect(validator.validateInput(input).isValid).toBe(false);

  document.body.removeChild(form);
});

test("should pass when the value length is less than or equal to the specified maximum length", () => {
  let validator = new Validatr();

  let form = document.createElement("form");
  let input = document.createElement("input");
  input.setAttribute("data-validatr-max", "5");
  input.setAttribute("type", "text");
  input.setAttribute("name", "test");
  input.setAttribute("value", "test");

  form.appendChild(input);
  document.body.appendChild(form);

  expect(validator.validateInput(input).isValid).toBe(true);

  document.body.removeChild(form);
});

test("should fail when the value length is greater than the specified maximum length", () => {
  let validator = new Validatr();

  let form = document.createElement("form");
  let input = document.createElement("input");
  input.setAttribute("data-validatr-max", "5");
  input.setAttribute("type", "text");
  input.setAttribute("name", "test");
  input.setAttribute("value", "testing");

  form.appendChild(input);
  document.body.appendChild(form);

  expect(validator.validateInput(input).isValid).toBe(false);

  document.body.removeChild(form);
});

test("should pass when the value is number", () => {
  let validator = new Validatr();

  let form = document.createElement("form");
  let input = document.createElement("input");
  input.setAttribute("data-validatr-number", "true");
  input.setAttribute("type", "text");
  input.setAttribute("name", "test");
  input.setAttribute("value", "test");

  form.appendChild(input);
  document.body.appendChild(form);

  expect(validator.validateInput(input).isValid).toBe(false);

  document.body.removeChild(form);
});

test("should fail when the value is not a number", () => {
  let validator = new Validatr();

  let form = document.createElement("form");
  let input = document.createElement("input");
  input.setAttribute("data-validatr-number", "true");
  input.setAttribute("type", "text");
  input.setAttribute("name", "test");
  input.setAttribute("value", "test");

  form.appendChild(input);
  document.body.appendChild(form);

  expect(validator.validateInput(input).isValid).toBe(false);

  document.body.removeChild(form);
});

test("should pass when a required radio button is checked", () => {
  let validator = new Validatr();

  let form = document.createElement("form");
  let input = document.createElement("input");
  input.setAttribute("data-validatr-required", "true");
  input.setAttribute("type", "radio");
  input.setAttribute("name", "test");
  input.setAttribute("value", "test");
  input.setAttribute("checked", true);

  form.appendChild(input);
  document.body.appendChild(form);

  expect(validator.validateInput(input).isValid).toBe(true);

  document.body.removeChild(form);
});

test("should fail when a required radio button is not checked", () => {
  let validator = new Validatr();

  let form = document.createElement("form");
  let input = document.createElement("input");
  input.setAttribute("data-validatr-required", "true");
  input.setAttribute("type", "radio");
  input.setAttribute("name", "test");
  input.setAttribute("value", "test");

  form.appendChild(input);
  document.body.appendChild(form);

  expect(validator.validateInput(input).isValid).toBe(false);

  document.body.removeChild(form);
});

test("should pass when a required radio button group is checked", () => {
  let validator = new Validatr();

  let form = document.createElement("form");
  let input = document.createElement("input");
  input.setAttribute("data-validatr-required", "true");
  input.setAttribute("type", "radio");
  input.setAttribute("name", "test");
  input.setAttribute("value", "test");
  input.setAttribute("checked", true);

  let input2 = document.createElement("input");
  input2.setAttribute("data-validatr-required", "true");
  input2.setAttribute("type", "radio");
  input2.setAttribute("name", "test");
  input2.setAttribute("value", "test2");

  form.appendChild(input);
  form.appendChild(input2);
  document.body.appendChild(form);

  expect(validator.validateInput(input).isValid).toBe(true);

  document.body.removeChild(form);
});

test("should fail when a required radio button group is not checked", () => {
  let validator = new Validatr();

  let form = document.createElement("form");
  let input = document.createElement("input");
  input.setAttribute("data-validatr-required", "true");
  input.setAttribute("type", "radio");
  input.setAttribute("name", "test");
  input.setAttribute("value", "test");

  let input2 = document.createElement("input");
  input2.setAttribute("data-validatr-required", "true");
  input2.setAttribute("type", "radio");
  input2.setAttribute("name", "test");
  input2.setAttribute("value", "test2");

  form.appendChild(input);
  form.appendChild(input2);
  document.body.appendChild(form);

  expect(validator.validateInput(input).isValid).toBe(false);

  document.body.removeChild(form);
});
