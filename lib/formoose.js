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
            `input[name="${input.getAttribute("data-formoose-different")}"]`
          ).value;

          return value !== otherValue;
        },
        message: (input) => {
          return `Please enter a different value than ${input.getAttribute(
            "data-formoose-different"
          )}`;
        },
      },
      url: {
        test: (value) => {
          return /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/.test(
            value
          );
        },
        message: "Please enter a valid URL",
      },
      in: {
        test: (value, input) => {
          const values = input.getAttribute("data-formoose-in").split(",");
          return values.includes(value);
        },
        message: (input) => {
          return `Please enter a value in ${input.getAttribute(
            "data-formoose-in"
          )}`;
        },
      },
      notIn: {
        test: (value, input) => {
          const values = input.getAttribute("data-formoose-notIn").split(",");
          return !values.includes(value);
        },
        message: (input) => {
          return `Please enter a value not in ${input.getAttribute(
            "data-formoose-notIn"
          )}`;
        },
      },
      startsWith: {
        test: (value, input) => {
          return value.startsWith(
            input.getAttribute("data-formoose-startsWith")
          );
        },
        message: (input) => {
          return `Please enter a value that starts with ${input.getAttribute(
            "data-formoose-startsWith"
          )}`;
        },
      },
      endsWith: {
        test: (value, input) => {
          return value.endsWith(input.getAttribute("data-formoose-endsWith"));
        },
        message: (input) => {
          return `Please enter a value that ends with ${input.getAttribute(
            "data-formoose-endsWith"
          )}`;
        },
      },
      contains: {
        test: (value, input) => {
          return value.includes(input.getAttribute("data-formoose-contains"));
        },
        message: (input) => {
          return `Please enter a value that contains ${input.getAttribute(
            "data-formoose-contains"
          )}`;
        },
      },
      notContains: {
        test: (value, input) => {
          return !value.includes(
            input.getAttribute("data-formoose-notContains")
          );
        },
        message: (input) => {
          return `Please enter a value that does not contain ${input.getAttribute(
            "data-formoose-notContains"
          )}`;
        },
      },
      phone: {
        test: (value) => {
          return /^\+[1-9]{1}[0-9]{0,2}[ /-]?[2-9]{1}[0-9]{2}[ /-]?[2-9]{1}[0-9]{2}[ /-]?[0-9]{4}$/.test(
            value
          );
        },
        message: () => {
          return "Please enter a valid phone number";
        },
      },
      time: {
        test: (value) => {
          return /^([1-9]|0[1-9]|1[0-2]):[0-5][0-9] ([AaPp][Mm])$/.test(value);
        },
        message: () => {
          return "Please enter a valid time e.g. 12:00 PM";
        },
      },
      time24: {
        test: (value) => {
          return /^(?:[01][0-9]|2[0-3]):[0-5][0-9](?::[0-5][0-9])?$/.test(
            value
          );
        },
        message: () => {
          return "Please enter a valid 24-hour time e.g. 23:59";
        },
      },
      ipv4: {
        test: (value) => {
          return /^(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)){3}$/.test(
            value
          );
        },
        message: () => {
          return "Please enter a valid IPv4 address";
        },
      },
      ipv6: {
        test: (value) => {
          return /^(?:[0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}$/.test(value);
        },
        message: () => {
          return "Please enter a valid IPv6 address";
        },
      },
      macAddress: {
        test: (value) => {
          return /^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$/.test(value);
        },
        message: () => {
          return "Please enter a valid MAC address";
        },
      },
      image: {
        test: (value) => {
          if (!(value instanceof File)) {
            return false;
          }
          // Check if the type property exists and starts with "image/"
          return value.type && value.type.startsWith("image/");
        },
        message: () => {
          return "Please upload a valid image";
        },
      },
      formats: {
        test: (value, input) => {
          const formats = input
            .getAttribute("data-formoose-formats")
            .split(",");

          const mimeTypes = formats.map((format) => `image/${format}`);

          return value instanceof File && mimeTypes.includes(value.type);
        },
        message: (input) => {
          return `Please upload a file with one of the following formats: ${input.getAttribute(
            "data-formoose-formats"
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
        new Event("formoose:success", { detail: form });
        this.removeErrors(input);
      } else {
        new Event("formoose:error", { detail: form });
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
    const isFileInput = input.type === "file";

    const group =
      isGrouped &&
      (form.querySelector('input[type="radio"]') ||
        form.querySelector('input[type="checkbox"]'))
        ? form.querySelectorAll(`input[name="${groupName}"]`)
        : [input];

    const value = isFileInput
      ? input.files[0]
      : isGrouped
      ? null
      : input.value.trim();

    const errors = Object.keys(this.rules)
      .filter((rule) => {
        if (isGrouped) return false;

        const hasRule = input.hasAttribute(`data-formoose-${rule}`);
        if (!hasRule) return false;

        // Special handling for file inputs
        if (isFileInput && rule === "image") {
          return !this.rules[rule].test(value, input);
        }

        // Default validation for non-file inputs
        return !this.rules[rule].test(value, input);
      })
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
