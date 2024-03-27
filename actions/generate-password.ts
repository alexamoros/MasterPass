/**
 * Generates a random secure password.
 *
 * @param {number} length - The desired length of the password (default: 12).
 * @param {boolean} useNumbers - Whether to include numbers in the password (default: true).
 * @param {boolean} useSymbols - Whether to include symbols in the password (default: true).
 * @returns {string} A randomly generated password.
 */
export function generatePassword(
  length: number = 12,
  useNumbers: boolean = true,
  useSymbols: boolean = true
): string {
  const charset = generateCharset(useNumbers, useSymbols)
  let password = ""

  for (let i = 0; i < length; i++) {
    password += charset.charAt(Math.floor(Math.random() * charset.length))
  }

  return password
}

/**
 * Generates a character set for the password based on the provided options.
 *
 * @param {boolean} useNumbers - Whether to include numbers in the character set.
 * @param {boolean} useSymbols - Whether to include symbols in the character set.
 * @returns {string} A character set for generating the password.
 */
function generateCharset(useNumbers: boolean, useSymbols: boolean): string {
  let charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"

  if (useNumbers) {
    charset += "0123456789"
  }

  if (useSymbols) {
    charset += "!@#$%^&*()_+~`|]}[{"
  }

  return charset
}
