module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: ["plugin:vue/vue3-essential", "@vue/airbnb", "prettier"],
  parserOptions: {
    parser: "@babel/eslint-parser",
  },
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
    "import/no-cycle": "warn",
    "max-len": "off",
    "vuejs-accessibility/label-has-for": [
      "error",
      {
        required: {
          some: ["nesting", "id"],
        },
      },
    ],
    "vuejs-accessibility/form-control-has-label": [
      "warn",
      {
        components: ["Label"],
        required: {
          every: ["nesting", "id"],
        },
        allowChildren: false,
      },
    ],
  },
};
