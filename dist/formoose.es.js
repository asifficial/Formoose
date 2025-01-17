var c = Object.defineProperty;
var f = (i, t, e) => t in i ? c(i, t, { enumerable: !0, configurable: !0, writable: !0, value: e }) : i[t] = e;
var d = (i, t, e) => f(i, typeof t != "symbol" ? t + "" : t, e);
class b {
  constructor(t) {
    d(this, "handleInputEvents", (t) => {
      const e = t.target, { isValid: r, errors: s } = this.validateInput(e);
      r ? this.removeErrors(e) : (this.displayErrors(e, s[0]), this.disableSubmitButton(e.closest("form")));
    });
    d(this, "formHasErrors", (t) => t.querySelectorAll(".formoose-invalid").length);
    this.forms = t || document.querySelectorAll("[data-formoose-form]"), this.rules = {
      required: {
        test: (e, r) => {
          if (r.type === "radio" || r.type === "checkbox") {
            const s = r.closest("form"), a = r.name;
            return s.querySelectorAll(
              `input[name="${a}"]:checked`
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
        test: (e, r) => e.length >= parseInt(r.getAttribute("data-formoose-min")),
        message: (e) => `Please enter at least ${e.getAttribute(
          "data-formoose-min"
        )} characters`
      },
      max: {
        test: (e, r) => e.length <= parseInt(r.getAttribute("data-formoose-max")),
        message: (e) => `Please enter less than or equal to ${e.getAttribute(
          "data-formoose-max"
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
          const s = r.getAttribute("data-formoose-same"), a = document.querySelector(
            `[name="${s}"]`
          ).value;
          return e === a;
        },
        message: (e) => `Please enter the same value as ${e.getAttribute(
          "data-formoose-same"
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
        test: (e) => /^[a-zA-Z_-]+$/.test(e),
        message: "Please enter only letters, underscores, and dashes"
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
          const s = document.querySelector(
            `[name="${r.getAttribute("data-formoose-dateBefore")}"]`
          ).value;
          return Date.parse(e) < Date.parse(s);
        },
        message: (e) => `Please enter a date before ${e.getAttribute(
          "data-formoose-dateBefore"
        )}`
      },
      dateAfter: {
        test: (e, r) => {
          const s = document.querySelector(
            `[name="${r.getAttribute("data-formoose-dateAfter")}"]`
          ).value;
          return Date.parse(e) > Date.parse(s);
        },
        message: (e) => `Please enter a date after ${e.getAttribute(
          "data-formoose-dateAfter"
        )}`
      },
      between: {
        test: (e, r) => {
          const s = r.getAttribute("data-formoose-between").split(","), a = parseInt(s[0]), o = parseInt(s[1]);
          return e >= a && e <= o;
        },
        message: (e) => {
          let s = e.getAttribute("data-formoose-between").split(","), a = parseInt(s[0]), o = parseInt(s[1]);
          return `Please enter a value between ${a} and ${o}`;
        }
      },
      boolean: {
        test: (e) => e == "true" || e == "1" || e == "false" || e == "0",
        message: "Please enter a valid boolean"
      },
      different: {
        test: (e, r) => {
          const s = document.querySelector(
            `[name="${r.getAttribute("data-formoose-different")}"]`
          ).value;
          return e !== s;
        },
        message: (e) => `Please enter a different value than ${e.getAttribute(
          "data-formoose-different"
        )}`
      }
    }, this.init();
  }
  // Initialize Formoose
  init() {
    this.forms.forEach((t) => {
      t.addEventListener("submit", (r) => {
        r.preventDefault(), this.validateForm(t) ? (document.dispatchEvent(
          new Event("formoose:submitting", { detail: t })
        ), this.disableSubmitButton(t), t.submit(), document.dispatchEvent(
          new Event("formoose:submitted", { detail: t })
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
    return Array.from(e).map((a) => {
      if ((a.type === "radio" || a.type === "checkbox") && r.has(a.name))
        return { input: a, isValid: !0 };
      (a.type === "radio" || a.type === "checkbox") && r.add(a.name);
      const { isValid: o, errors: l } = this.validateInput(a);
      return o ? this.removeErrors(a) : this.displayErrors(a, l[0]), { input: a, isValid: o };
    }).every((a) => a.isValid);
  }
  validateInput(t) {
    const e = t.closest("form"), r = t.name, s = t.type === "radio" || t.type === "checkbox", a = s && (e.querySelector('input[type="radio"]') || e.querySelector('input[type="checkbox"]')) ? e.querySelectorAll(`input[name="${r}"]`) : [t], o = s ? null : t.value.trim(), l = Object.keys(this.rules).filter(
      (n) => t.hasAttribute(`data-formoose-${n}`) && (s ? null : !this.rules[n].test(o, t))
    ).map((n) => this.getMessage(t, n)), m = l.length === 0;
    if (s) {
      const n = Object.keys(this.rules).filter(
        (u) => a[0].hasAttribute(`data-formoose-${u}`) && !this.rules[u].test(null, a[0])
      ).map((u) => this.getMessage(a[0], u));
      return { isValid: n.length === 0, errors: n };
    }
    return { isValid: m, errors: l };
  }
  getMessage(t, e) {
    const r = t.getAttribute(`data-formoose-${e}-message`);
    return typeof this.rules[e].message == "function" ? r || this.rules[e].message(t) : r || this.rules[e].message || "Invalid value";
  }
  displayErrors(t, e) {
    this.removeErrors(t), t.classList.add("formoose-invalid");
    const r = this.createErrorContainer(), s = this.createErrorElement();
    s.textContent = e, r.appendChild(s), t.type === "radio" || t.type === "checkbox" ? t.closest("fieldset").appendChild(r) : (r.appendChild(s), t.insertAdjacentElement("afterend", r));
  }
  createErrorContainer() {
    const t = document.createElement("div");
    return t.classList.add("formoose-invalid-feedback"), t;
  }
  createErrorElement() {
    const t = document.createElement("p");
    return t.classList.add("formoose-error-message"), t;
  }
  removeErrors(t) {
    var r;
    const e = t.closest("form");
    if (t.type === "radio" || t.type === "checkbox") {
      const s = t.closest("fieldset").querySelector(".formoose-invalid-feedback");
      s && (t.classList.remove("formoose-invalid"), s.remove());
    } else
      t.classList.remove("formoose-invalid"), (r = t.nextSibling) == null || r.remove();
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
  b as default
};
