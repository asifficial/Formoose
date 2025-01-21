var c = Object.defineProperty;
var f = (i, t, e) => t in i ? c(i, t, { enumerable: !0, configurable: !0, writable: !0, value: e }) : i[t] = e;
var m = (i, t, e) => f(i, typeof t != "symbol" ? t + "" : t, e);
class b {
  constructor(t) {
    m(this, "handleInputEvents", (t) => {
      const e = t.target, { isValid: s, errors: r } = this.validateInput(e);
      s ? this.removeErrors(e) : (this.displayErrors(e, r[0]), this.disableSubmitButton(e.closest("form")));
    });
    m(this, "formHasErrors", (t) => t.querySelectorAll(".formoose-invalid").length);
    this.forms = t || document.querySelectorAll("[data-formoose-form]"), this.rules = {
      required: {
        test: (e, s) => {
          if (s.type === "radio" || s.type === "checkbox") {
            const r = s.closest("form"), a = s.name;
            return r.querySelectorAll(
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
        test: (e, s) => e.length >= parseInt(s.getAttribute("data-formoose-min")),
        message: (e) => `Please enter at least ${e.getAttribute(
          "data-formoose-min"
        )} characters`
      },
      max: {
        test: (e, s) => e.length <= parseInt(s.getAttribute("data-formoose-max")),
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
        test: (e, s) => {
          const r = s.getAttribute("data-formoose-same"), a = document.querySelector(
            `[name="${r}"]`
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
        test: (e, s) => {
          const r = s.hasAttribute("data-formoose-array"), a = s.name;
          if (!r || !a)
            return !1;
          const o = document.querySelectorAll(`input[name="${a}"]`), l = Array.from(o).map((d) => d.value);
          return Array.isArray(l) && a.endsWith("[]");
        },
        message: "Please enter a valid array"
      },
      dateBefore: {
        test: (e, s) => {
          const r = s.getAttribute("data-formoose-dateBefore");
          return Date.parse(e) < Date.parse(r);
        },
        message: (e) => `Please enter a date before ${e.getAttribute(
          "data-formoose-dateBefore"
        )}`
      },
      dateAfter: {
        test: (e, s) => {
          const r = s.getAttribute("data-formoose-dateAfter");
          return Date.parse(e) > Date.parse(r);
        },
        message: (e) => `Please enter a date after ${e.getAttribute(
          "data-formoose-dateAfter"
        )}`
      },
      between: {
        test: (e, s) => {
          const r = s.getAttribute("data-formoose-between").split(","), a = parseInt(r[0]), o = parseInt(r[1]);
          return e >= a && e <= o;
        },
        message: (e) => {
          let r = e.getAttribute("data-formoose-between").split(","), a = parseInt(r[0]), o = parseInt(r[1]);
          return `Please enter a value between ${a} and ${o}`;
        }
      },
      boolean: {
        test: (e) => e == "true" || e == "1" || e == "false" || e == "0",
        message: "Please enter a valid boolean"
      },
      different: {
        test: (e, s) => {
          const r = document.querySelector(
            `input[name="${s.getAttribute("data-formoose-different")}"]`
          ).value;
          return e !== r;
        },
        message: (e) => `Please enter a different value than ${e.getAttribute(
          "data-formoose-different"
        )}`
      },
      url: {
        test: (e) => /^(http|https):\/\/[^ "]+$/.test(e),
        message: "Please enter a valid URL"
      },
      in: {
        test: (e, s) => s.getAttribute("data-formoose-in").split(",").includes(e),
        message: (e) => `Please enter a value in ${e.getAttribute(
          "data-formoose-in"
        )}`
      },
      notIn: {
        test: (e, s) => !s.getAttribute("data-formoose-notIn").split(",").includes(e),
        message: (e) => `Please enter a value not in ${e.getAttribute(
          "data-formoose-notIn"
        )}`
      },
      startsWith: {
        test: (e, s) => e.startsWith(
          s.getAttribute("data-formoose-startsWith")
        ),
        message: (e) => `Please enter a value that starts with ${e.getAttribute(
          "data-formoose-startsWith"
        )}`
      },
      endsWith: {
        test: (e, s) => e.endsWith(s.getAttribute("data-formoose-endsWith")),
        message: (e) => `Please enter a value that ends with ${e.getAttribute(
          "data-formoose-endsWith"
        )}`
      },
      contains: {
        test: (e, s) => e.includes(s.getAttribute("data-formoose-contains")),
        message: (e) => `Please enter a value that contains ${e.getAttribute(
          "data-formoose-contains"
        )}`
      },
      notContains: {
        test: (e, s) => !e.includes(
          s.getAttribute("data-formoose-notContains")
        ),
        message: (e) => `Please enter a value that does not contain ${e.getAttribute(
          "data-formoose-notContains"
        )}`
      },
      phone: {
        test: (e) => /^\+[1-9]{1}[0-9]{0,2}[ /-]?[2-9]{1}[0-9]{2}[ /-]?[2-9]{1}[0-9]{2}[ /-]?[0-9]{4}$/.test(
          e
        ),
        message: () => "Please enter a valid phone number"
      },
      time: {
        test: (e) => /^\d{2}:\d{2} ([AaPp][Mm])/.test(e),
        message: () => "Please enter a valid time e.g. 12:00 PM"
      }
    }, this.init();
  }
  // Initialize Formoose
  init() {
    this.forms.forEach((t) => {
      t.addEventListener("submit", (s) => {
        s.preventDefault(), this.validateForm(t) ? (document.dispatchEvent(
          new Event("formoose:submitting", { detail: t })
        ), this.disableSubmitButton(t), t.submit(), document.dispatchEvent(
          new Event("formoose:submitted", { detail: t })
        )) : this.disableSubmitButton(t);
      }), t.querySelectorAll(
        "input, textarea, select, radio, checkbox"
      ).forEach((s) => {
        s.addEventListener("input", this.handleInputEvents);
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
    ), s = /* @__PURE__ */ new Set();
    return Array.from(e).map((a) => {
      if ((a.type === "radio" || a.type === "checkbox") && s.has(a.name))
        return { input: a, isValid: !0 };
      (a.type === "radio" || a.type === "checkbox") && s.add(a.name);
      const { isValid: o, errors: l } = this.validateInput(a);
      return o ? this.removeErrors(a) : this.displayErrors(a, l[0]), { input: a, isValid: o };
    }).every((a) => a.isValid);
  }
  validateInput(t) {
    const e = t.closest("form"), s = t.name, r = t.type === "radio" || t.type === "checkbox", a = r && (e.querySelector('input[type="radio"]') || e.querySelector('input[type="checkbox"]')) ? e.querySelectorAll(`input[name="${s}"]`) : [t], o = r ? null : t.value.trim(), l = Object.keys(this.rules).filter(
      (n) => t.hasAttribute(`data-formoose-${n}`) && (r ? null : !this.rules[n].test(o, t))
    ).map((n) => this.getMessage(t, n)), d = l.length === 0;
    if (r) {
      const n = Object.keys(this.rules).filter(
        (u) => a[0].hasAttribute(`data-formoose-${u}`) && !this.rules[u].test(null, a[0])
      ).map((u) => this.getMessage(a[0], u));
      return { isValid: n.length === 0, errors: n };
    }
    return { isValid: d, errors: l };
  }
  getMessage(t, e) {
    const s = t.getAttribute(`data-formoose-${e}-message`);
    return typeof this.rules[e].message == "function" ? s || this.rules[e].message(t) : s || this.rules[e].message || "Invalid value";
  }
  displayErrors(t, e) {
    this.removeErrors(t), t.classList.add("formoose-invalid");
    const s = this.createErrorContainer(), r = this.createErrorElement();
    r.textContent = e, s.appendChild(r), t.type === "radio" || t.type === "checkbox" ? t.closest("fieldset").appendChild(s) : (s.appendChild(r), t.insertAdjacentElement("afterend", s));
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
    var s;
    const e = t.closest("form");
    if (t.type === "radio" || t.type === "checkbox") {
      const r = t.closest("fieldset").querySelector(".formoose-invalid-feedback");
      r && (t.classList.remove("formoose-invalid"), r.remove());
    } else
      t.classList.remove("formoose-invalid"), (s = t.nextSibling) == null || s.remove();
    this.formHasErrors(e) ? this.disableSubmitButton(e) : this.enableSubmitButton(e);
  }
  addRule(t, e, s) {
    if (typeof e != "function")
      throw new Error("The rule must be a function");
    if (typeof s != "string" && typeof s != "function")
      throw new Error("The message must be a string or a function");
    this.rules[t] = { test: e, message: s || "Invalid value" };
  }
}
export {
  b as default
};
