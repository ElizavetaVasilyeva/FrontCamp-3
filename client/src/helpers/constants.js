const CONSTANTS = {
  MIN_LENGTH: 3,
  MAX_LENGTH: 100,
  ONLY_LETTERS_REGEX: /^[a-zA-Z]+$/,
  EMAIL_REGEX: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
  ZERO_LENGTH: 0,
  JSON_HEADER: { "Content-Type": "application/json" }
};

module.exports = CONSTANTS;