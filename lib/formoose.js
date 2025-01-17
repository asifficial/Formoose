"use strict";

class Formoose {
  constructor(form) {
    this.forms = form || document.querySelectorAll("[data-formoose-form]");

    // Rules for validation
    this.rules = {
      required: {
        test: (value, input) => {
          if (input.type === "radio" || input.type === "checkbox") {
            const form = input.closest("form");
            const groupName = input.name;
            const group = form.querySelectorAll(
              `input[name="${groupName}"]:checked`
            ); // Get the checked inputs in the group

            return group.length > 0;
          }

          return value.trim() !== "";
        },
        message: "This field is required",
      },
      email: {
        test: (value) => {
          const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          return re.test(value);
        },
        message: "Please enter a valid email address",
      },
      min: {
        test: (value, input) => {
          return (
            value.length >= parseInt(input.getAttribute("data-formoose-min"))
          );
        },
        message: (input) => {
          return `Please enter at least ${input.getAttribute(
            "data-formoose-min"
          )} characters`;
        },
      },
      max: {
        test: (value, input) => {
          return (
            value.length <= parseInt(input.getAttribute("data-formoose-max"))
          );
        },
        message: (input) => {
          return `Please enter less than or equal to ${input.getAttribute(
            "data-formoose-max"
          )} characters`;
        },
      },
      number: {
        test: (value) => {
          return !isNaN(value);
        },
        message: "Please enter a number",
      },
      strongPassword: {
        test: (value) => {
          return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z\d])/.test(value);
        },
        message:
          "Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character",
      },
      same: {
        test: (value, input) => {
          const otherInput = input.getAttribute("data-formoose-same");
          const otherValue = document.querySelector(
            `[name="${otherInput}"]`
          ).value;

          return value === otherValue;
        },
        message: (input) => {
          return `Please enter the same value as ${input.getAttribute(
            "data-formoose-same"
          )}`;
        },
      },
      date: {
        test: (value) => {
          return !isNaN(Date.parse(value));
        },
        message: "Please enter a valid date",
      },
      alpha: {
        test: (value) => {
          return /^[a-zA-Z]+$/.test(value);
        },
        message: "Please enter only letters",
      },
      alphaNumeric: {
        test: (value) => {
          return /^[a-zA-Z0-9]+$/.test(value);
        },
        message: "Please enter only letters and numbers",
      },
      alphaDash: {
        test: (value) => {
          return /^[a-zA-Z_-]+$/.test(value);
        },
        message: "Please enter only letters, underscores, and dashes",
      },
      accepted: {
        test: (value) => {
          return value === "on" || value === "yes" || value === "1";
        },
        message: "The field must be accepted",
      },
      array: {
        test: (_value, input) => {
          const isArray = input.hasAttribute("data-formoose-array");
          const name = input.name;

          if (!isArray || !name) {
            return false;
          }

          const inputs = document.querySelectorAll(`input[name="${name}"]`);
          const values = Array.from(inputs).map((el) => el.value);

          return Array.isArray(values) && name.endsWith("[]");
        },
        message: "Please enter a valid array",
      },
      dateBefore: {
        test: (value, input) => {
          const dateRule = input.getAttribute("data-formoose-dateBefore");

          return Date.parse(value) < Date.parse(dateRule);
        },
        message: (input) => {
          return `Please enter a date before ${input.getAttribute(
            "data-formoose-dateBefore"
          )}`;
        },
      },
      dateAfter: {
        test: (value, input) => {
          const dateRule = input.getAttribute("data-formoose-dateAfter");

          return Date.parse(value) > Date.parse(dateRule);
        },
        message: (input) => {
          return `Please enter a date after ${input.getAttribute(
            "data-formoose-dateAfter"
          )}`;
        },
      },
      between: {
        test: (value, input) => {
          const values = input.getAttribute("data-formoose-between").split(",");
          const min = parseInt(values[0]);
          const max = parseInt(values[1]);

          return value >= min && value <= max;
        },
        message: (input) => {
          let value = input.getAttribute("data-formoose-between");
          let values = value.split(",");
          let min = parseInt(values[0]);
          let max = parseInt(values[1]);

          return `Please enter a value between ${min} and ${max}`;
        },
      },
      boolean: {
        test: (value) => {
          return (
            value == "true" || value == "1" || value == "false" || value == "0"
          );
        },
        message: "Please enter a valid boolean",
      },
      different: {
        test: (value, input) => {
          const otherValue = document.querySelector(
            `[name="${input.getAttribute("data-formoose-different")}"]`
          ).value;

          return value !== otherValue;
        },
        message: (input) => {
          return `Please enter a different value than ${input.getAttribute(
            "data-formoose-different"
          )}`;
        },
      },
    };

    this.init();
  }

  // Initialize Formoose
  init() {
    this.forms.forEach((form) => {
      form.addEventListener("submit", (e) => {
        e.preventDefault();

        if (!this.validateForm(form)) {
          this.disableSubmitButton(form);
        } else {
          document.dispatchEvent(
            new Event("formoose:submitting", { detail: form })
          );

          this.disableSubmitButton(form);
          form.submit();

          document.dispatchEvent(
            new Event("formoose:submitted", { detail: form })
          );
        }
      });

      const inputs = form.querySelectorAll(
        "input, textarea, select, radio, checkbox"
      );

      inputs.forEach((input) => {
        input.addEventListener("input", this.handleInputEvents);
      });
    });
  }

  handleInputEvents = (event) => {
    const input = event.target;

    const { isValid, errors } = this.validateInput(input);
    if (isValid) {
      this.removeErrors(input);
    } else {
      this.displayErrors(input, errors[0]);
      this.disableSubmitButton(input.closest("form"));
    }
  };

  disableSubmitButton(form) {
    const submitButton = form.querySelector('button[type="submit"]');
    submitButton.setAttribute("disabled", "disabled");
  }

  enableSubmitButton(form) {
    const submitButton = form.querySelector('button[type="submit"]');
    submitButton.removeAttribute("disabled");
  }

  validateForm(form) {
    const inputs = form.querySelectorAll(
      "input, textarea, select, radio, checkbox"
    );
    const uniqueGroups = new Set();

    const results = Array.from(inputs).map((input) => {
      if (
        (input.type === "radio" || input.type === "checkbox") &&
        uniqueGroups.has(input.name)
      ) {
        return { input, isValid: true }; // Skip already validated group
      }

      if (input.type === "radio" || input.type === "checkbox") {
        uniqueGroups.add(input.name);
      }

      const { isValid, errors } = this.validateInput(input);

      if (isValid) {
        this.removeErrors(input);
      } else {
        this.displayErrors(input, errors[0]);
      }

      return { input, isValid };
    });

    return results.every((result) => result.isValid);
  }

  validateInput(input) {
    const form = input.closest("form");
    const groupName = input.name;
    const isGrouped = input.type === "radio" || input.type === "checkbox";
    const group =
      isGrouped &&
      (form.querySelector('input[type="radio"]') ||
        form.querySelector('input[type="checkbox"]'))
        ? form.querySelectorAll(`input[name="${groupName}"]`)
        : [input];
    const value = isGrouped ? null : input.value.trim();

    const errors = Object.keys(this.rules)
      .filter(
        (rule) =>
          input.hasAttribute(`data-formoose-${rule}`) &&
          (isGrouped ? null : !this.rules[rule].test(value, input))
      )
      .map((rule) => this.getMessage(input, rule));

    const isValid = errors.length === 0;

    // If the input is a radio or checkbox, validate the group
    if (isGrouped) {
      // Validate the group as a whole
      const groupErrors = Object.keys(this.rules)
        .filter(
          (rule) =>
            group[0].hasAttribute(`data-formoose-${rule}`) &&
            !this.rules[rule].test(null, group[0])
        )
        .map((rule) => this.getMessage(group[0], rule));

      return { isValid: groupErrors.length === 0, errors: groupErrors };
    }

    return { isValid, errors };
  }

  getMessage(input, rule) {
    const customMessage = input.getAttribute(`data-formoose-${rule}-message`);

    if (typeof this.rules[rule].message === "function") {
      return customMessage || this.rules[rule].message(input);
    }

    return customMessage || this.rules[rule].message || "Invalid value";
  }

  formHasErrors = (form) => {
    return form.querySelectorAll(".formoose-invalid").length;
  };

  displayErrors(input, error) {
    this.removeErrors(input);
    input.classList.add("formoose-invalid");

    const container = this.createErrorContainer();
    const errorElement = this.createErrorElement();
    errorElement.textContent = error;
    container.appendChild(errorElement);

    if (input.type === "radio" || input.type === "checkbox") {
      const fieldset = input.closest("fieldset");
      fieldset.appendChild(container);
    } else {
      container.appendChild(errorElement);
      input.insertAdjacentElement("afterend", container);
    }
  }

  createErrorContainer() {
    const container = document.createElement("div");
    container.classList.add("formoose-invalid-feedback");

    return container;
  }

  createErrorElement() {
    const error = document.createElement("p");
    error.classList.add("formoose-error-message");

    return error;
  }

  removeErrors(input) {
    const form = input.closest("form");

    if (input.type === "radio" || input.type === "checkbox") {
      const group = input
        .closest("fieldset")
        .querySelector(".formoose-invalid-feedback");

      if (group) {
        input.classList.remove("formoose-invalid");
        group.remove();
      }
    } else {
      input.classList.remove("formoose-invalid");
      input.nextSibling?.remove();
    }

    if (!this.formHasErrors(form)) {
      this.enableSubmitButton(form);
    } else {
      this.disableSubmitButton(form);
    }
  }

  addRule(name, rule, message) {
    // rule should be a function
    if (typeof rule !== "function") {
      throw new Error("The rule must be a function");
    }

    // message should be a string or a function
    if (typeof message !== "string" && typeof message !== "function") {
      throw new Error("The message must be a string or a function");
    }

    this.rules[name] = { test: rule, message: message || "Invalid value" };
  }
}

export default Formoose;
