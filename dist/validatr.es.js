var m = Object.defineProperty;
var h = (l, t, e) => t in l ? m(l, t, { enumerable: !0, configurable: !0, writable: !0, value: e }) : l[t] = e;
var u = (l, t, e) => h(l, typeof t != "symbol" ? t + "" : t, e);
class v {
  constructor(t) {
    u(this, "handleInputEvents", (t) => {
      const e = t.target, { isValid: r, errors: a } = this.validateInput(e);
      r ? this.removeErrors(e) : (this.displayErrors(e, a[0]), this.disableSubmitButton(e.closest("form")));
    });
    u(this, "formHasErrors", (t) => t.querySelectorAll(".validatr-invalid").length);
    this.forms = t || document.querySelectorAll("[data-validatr-form]"), this.rules = {
      required: {
        test: (e, r) => {
          if (r.type === "radio" || r.type === "checkbox") {
            const a = r.closest("form"), s = r.name;
            return a.querySelectorAll(
              `input[name="${s}"]:checked`
            ).length > 0;
          }
          return e.trim() !== "";
        },
        message: "This field is required"
      },
      email: {
        test: (e) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e),
        message: "Please enter a valid email address"
      },
      min: {
        test: (e, r) => e.length >= parseInt(r.getAttribute("data-validatr-min")),
        message: (e) => `Please enter at least ${e.getAttribute(
          "data-validatr-min"
        )} characters`
      },
      max: {
        test: (e, r) => e.length <= parseInt(r.getAttribute("data-validatr-max")),
        message: (e) => `Please enter less than or equal to ${e.getAttribute(
          "data-validatr-max"
        )} characters`
      },
      number: {
        test: (e) => !isNaN(e),
        message: "Please enter a number"
      },
      strongPassword: {
        test: (e) => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z\d])/.test(e),
        message: "Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character"
      },
      same: {
        test: (e, r) => {
          const a = r.getAttribute("data-validatr-same"), s = document.querySelector(
            `[name="${a}"]`
          ).value;
          return e === s;
        },
        message: (e) => `Please enter the same value as ${e.getAttribute(
          "data-validatr-same"
        )}`
      },
      date: {
        test: (e) => !isNaN(Date.parse(e)),
        message: "Please enter a valid date"
      },
      alpha: {
        test: (e) => /^[a-zA-Z]+$/.test(e),
        message: "Please enter only letters"
      },
      alphaNumeric: {
        test: (e) => /^[a-zA-Z0-9]+$/.test(e),
        message: "Please enter only letters and numbers"
      },
      alphaDash: {
        test: (e) => /^[a-zA-Z0-9_-]+$/.test(e),
        message: "Please enter only letters, numbers, underscores, and dashes"
      },
      accepted: {
        test: (e) => e === "on" || e === "yes" || e === "1",
        message: "The field must be accepted"
      },
      array: {
        test: (e) => Array.isArray(e),
        message: "Please enter a valid array"
      },
      dateBefore: {
        test: (e, r) => {
          const a = document.querySelector(
            `[name="${r.getAttribute("data-validatr-dateBefore")}"]`
          ).value;
          return Date.parse(e) < Date.parse(a);
        },
        message: (e) => `Please enter a date before ${e.getAttribute(
          "data-validatr-dateBefore"
        )}`
      },
      dateAfter: {
        test: (e, r) => {
          const a = document.querySelector(
            `[name="${r.getAttribute("data-validatr-dateAfter")}"]`
          ).value;
          return Date.parse(e) > Date.parse(a);
        },
        message: (e) => `Please enter a date after ${e.getAttribute(
          "data-validatr-dateAfter"
        )}`
      },
      between: {
        test: (e, r) => {
          const a = r.getAttribute("data-validatr-between").split(","), s = parseInt(a[0]), n = parseInt(a[1]);
          return e >= s && e <= n;
        },
        message: (e) => {
          let a = e.getAttribute("data-validatr-between").split(","), s = parseInt(a[0]), n = parseInt(a[1]);
          return `Please enter a value between ${s} and ${n}`;
        }
      },
      boolean: {
        test: (e) => e == "true" || e == "1" || e == "false" || e == "0",
        message: "Please enter a valid boolean"
      },
      different: {
        test: (e, r) => {
          const a = document.querySelector(
            `[name="${r.getAttribute("data-validatr-different")}"]`
          ).value;
          return e !== a;
        },
        message: (e) => `Please enter a different value than ${e.getAttribute(
          "data-validatr-different"
        )}`
      }
    }, this.init();
  }
  // Initialize Validatr
  init() {
    this.forms.forEach((t) => {
      t.addEventListener("submit", (r) => {
        r.preventDefault(), this.validateForm(t) ? (document.dispatchEvent(
          new Event("validatr:submitting", { detail: t })
        ), this.disableSubmitButton(t), t.submit(), document.dispatchEvent(
          new Event("validatr:submitted", { detail: t })
        )) : this.disableSubmitButton(t);
      }), t.querySelectorAll(
        "input, textarea, select, radio, checkbox"
      ).forEach((r) => {
        r.addEventListener("input", this.handleInputEvents);
      });
    });
  }
  disableSubmitButton(t) {
    t.querySelector('button[type="submit"]').setAttribute("disabled", "disabled");
  }
  enableSubmitButton(t) {
    t.querySelector('button[type="submit"]').removeAttribute("disabled");
  }
  validateForm(t) {
    const e = t.querySelectorAll(
      "input, textarea, select, radio, checkbox"
    ), r = /* @__PURE__ */ new Set();
    return Array.from(e).map((s) => {
      if ((s.type === "radio" || s.type === "checkbox") && r.has(s.name))
        return { input: s, isValid: !0 };
      (s.type === "radio" || s.type === "checkbox") && r.add(s.name);
      const { isValid: n, errors: o } = this.validateInput(s);
      return n ? this.removeErrors(s) : this.displayErrors(s, o[0]), { input: s, isValid: n };
    }).every((s) => s.isValid);
  }
  validateInput(t) {
    const e = t.closest("form"), r = t.name, a = t.type === "radio" || t.type === "checkbox", s = a && (e.querySelector('input[type="radio"]') || e.querySelector('input[type="checkbox"]')) ? e.querySelectorAll(`input[name="${r}"]`) : [t], n = a ? null : t.value.trim(), o = Object.keys(this.rules).filter(
      (i) => t.hasAttribute(`data-validatr-${i}`) && (a ? null : !this.rules[i].test(n, t))
    ).map((i) => this.getMessage(t, i)), c = o.length === 0;
    if (a) {
      const i = Object.keys(this.rules).filter(
        (d) => s[0].hasAttribute(`data-validatr-${d}`) && !this.rules[d].test(null, s[0])
      ).map((d) => this.getMessage(s[0], d));
      return { isValid: i.length === 0, errors: i };
    }
    return { isValid: c, errors: o };
  }
  getMessage(t, e) {
    const r = t.getAttribute(`data-validatr-${e}-message`);
    return typeof this.rules[e].message == "function" ? r || this.rules[e].message(t) : r || this.rules[e].message || "Invalid value";
  }
  displayErrors(t, e) {
    this.removeErrors(t), t.classList.add("validatr-invalid");
    const r = this.createErrorContainer(), a = this.createErrorElement();
    a.textContent = e, r.appendChild(a), t.type === "radio" || t.type === "checkbox" ? t.closest("fieldset").appendChild(r) : (r.appendChild(a), t.insertAdjacentElement("afterend", r));
  }
  createErrorContainer() {
    const t = document.createElement("div");
    return t.classList.add("validatr-invalid-feedback"), t;
  }
  createErrorElement() {
    const t = document.createElement("p");
    return t.classList.add("validatr-error-message"), t;
  }
  removeErrors(t) {
    var r;
    const e = t.closest("form");
    if (t.type === "radio" || t.type === "checkbox") {
      const a = t.closest("fieldset").querySelector(".validatr-invalid-feedback");
      a && (t.classList.remove("validatr-invalid"), a.remove());
    } else
      t.classList.remove("validatr-invalid"), (r = t.nextSibling) == null || r.remove();
    this.formHasErrors(e) ? this.disableSubmitButton(e) : this.enableSubmitButton(e);
  }
  addRule(t, e, r) {
    if (typeof e != "function")
      throw new Error("The rule must be a function");
    if (typeof r != "string" && typeof r != "function")
      throw new Error("The message must be a string or a function");
    this.rules[t] = { test: e, message: r || "Invalid value" };
  }
}
export {
  v as default
};
