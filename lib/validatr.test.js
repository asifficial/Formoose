import { expect, test } from "vitest";
import Validatr from "./validatr";

test("it creates a new instance of validatr", () => {
  let validatr = new Validatr();

  expect(validatr).toBeInstanceOf(Validatr);
});

test("it initializes validatr", () => {
  let validatr = new Validatr();

  expect(validatr.forms).toBeInstanceOf(NodeList);
});

test("it validates a form", () => {
  let validatr = new Validatr();

  let form = document.createElement("form");
  let input = document.createElement("input");

  input.setAttribute("data-validatr-form");

  document.body.appendChild(form);

  expect(validatr.validateForm(form)).toBe(true);

  document.body.removeChild(form);
});

test("validate required rule", () => {
  let validator = new Validatr();

  let input = document.createElement("input");
  input.setAttribute("data-validatr-required", "true");

  document.body.appendChild(input);

  expect(validator.validateInput(input).isValid).toBe(false);

  document.body.removeChild(input);
});

test("validate email rule", () => {
  let validator = new Validatr();

  let input = document.createElement("input");
  input.setAttribute("data-validatr-email", "true");
  input.value = "test";

  document.body.appendChild(input);

  expect(validator.validateInput(input).isValid).toBe(false);

  input.value = "test@domain.test";
  expect(validator.validateInput(input).isValid).toBe(true);

  document.body.removeChild(input);
});

test("validate min length rule", () => {
  let validator = new Validatr();

  let input = document.createElement("input");
  input.setAttribute("data-validatr-min", "5");
  input.value = "test";

  expect(validator.validateInput(input).isValid).toBe(false);

  document.body.appendChild(input);

  input.value = "testing";
  expect(validator.validateInput(input).isValid).toBe(true);

  document.body.removeChild(input);
});

test("validate max length rule", () => {
  let validator = new Validatr();

  let input = document.createElement("input");
  input.setAttribute("data-validatr-max", "5");
  input.value = "testing";

  document.body.appendChild(input);

  expect(validator.validateInput(input).isValid).toBe(false);

  input.value = "test";
  expect(validator.validateInput(input).isValid).toBe(true);

  document.body.removeChild(input);
});

test("validate number rule", () => {
  let validator = new Validatr();

  let input = document.createElement("input");
  input.setAttribute("data-validatr-number", "true");
  input.value = "test";

  document.body.appendChild(input);

  expect(validator.validateInput(input).isValid).toBe(false);

  input.value = "123";
  expect(validator.validateInput(input).isValid).toBe(true);

  document.body.removeChild(input);
});

test("validate radio", () => {
  let validator = new Validatr();

  let form = document.createElement("form");

  let input = document.createElement("input");
  input.setAttribute("type", "radio");
  input.setAttribute("name", "test");
  input.setAttribute("data-validatr-required", "true");

  form.appendChild(input);

  expect(validator.validateInput(input).isValid).toBe(false);

  input.checked = true;
  expect(validator.validateInput(input).isValid).toBe(true);
});

test("validate checkbox", () => {
  let validator = new Validatr();

  let form = document.createElement("form");

  let input = document.createElement("input");
  input.setAttribute("type", "checkbox");
  input.setAttribute("name", "test");
  input.setAttribute("data-validatr-required", "true");

  form.appendChild(input);

  expect(validator.validateInput(input).isValid).toBe(false);

  input.checked = true;
  expect(validator.validateInput(input).isValid).toBe(true);
});

test("validate select", () => {
  let validator = new Validatr();

  let select = document.createElement("select");
  select.setAttribute("data-validatr-required", "true");
  let option = document.createElement("option");
  option.setAttribute("value", "");
  select.appendChild(option);

  expect(validator.validateInput(select).isValid).toBe(false);

  option.setAttribute("value", "test");
  expect(validator.validateInput(select).isValid).toBe(true);
});

test("validate textarea", () => {
  let validator = new Validatr();

  let textarea = document.createElement("textarea");
  textarea.setAttribute("data-validatr-required", "true");

  document.body.appendChild(textarea);

  expect(validator.validateInput(textarea).isValid).toBe(false);

  textarea.value = "test";
  expect(validator.validateInput(textarea).isValid).toBe(true);

  document.body.removeChild(textarea);
});

test("validate strong password rule", () => {
  let validator = new Validatr();

  let input = document.createElement("input");
  input.setAttribute("data-validatr-strongPassword", "true");
  input.value = "test";

  document.body.appendChild(input);

  expect(validator.validateInput(input).isValid).toBe(false);

  input.value = "Test123!";
  expect(validator.validateInput(input).isValid).toBe(true);

  document.body.removeChild(input);
});

test("validate same rule", () => {
  let validator = new Validatr();

  let input = document.createElement("input");
  input.setAttribute("name", "test");
  input.value = "test";

  let otherInput = document.createElement("input");
  otherInput.setAttribute("name", "test2");
  otherInput.setAttribute("data-validatr-same", "test");
  otherInput.value = "test";

  document.body.appendChild(input);
  document.body.appendChild(otherInput);

  expect(validator.validateInput(otherInput).isValid).toBe(true);

  otherInput.value = "testing";
  expect(validator.validateInput(otherInput).isValid).toBe(false);

  document.body.removeChild(input);
  document.body.removeChild(otherInput);
});

test("validate date rule", () => {
  let validator = new Validatr();

  let input = document.createElement("input");
  input.setAttribute("data-validatr-date", "true");
  input.value = "test";

  document.body.appendChild(input);

  expect(validator.validateInput(input).isValid).toBe(false);

  input.value = "2021-01-01";
  expect(validator.validateInput(input).isValid).toBe(true);

  document.body.removeChild(input);
});
