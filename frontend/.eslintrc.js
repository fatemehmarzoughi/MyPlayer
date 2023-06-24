module.exports = {
  plugins: [
    "react-hooks"
  ],
  env: {
    browser: true,
    es2021: true
  },
  extends: ["standard"],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module"
  },
  noImplicitAny: false,
  rules: {
    "react-hooks/exhaustive-deps": "warn",
    semi: ["error", "always"],
    quotes: ["error", "double"],
    "no-unused-vars": "off",
    "sort-imports": [
      "error",
      {
        ignoreCase: false,
        ignoreDeclarationSort: false,
        ignoreMemberSort: false,
        memberSyntaxSortOrder: ["none", "all", "multiple", "single"],
        allowSeparatedGroups: false
      }
    ]
  }
};
