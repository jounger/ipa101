/**
 * @see https://prettier.io/docs/configuration
 * @type {import("prettier").Config}
 */
const config = {
    trailingComma: "all",
    tabWidth: 4,
    semi: false,
    singleQuote: false,
    plugins: ["prettier-plugin-tailwindcss"],
}

export default config
