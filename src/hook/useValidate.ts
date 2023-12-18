export const isValidLettersOnly = (value: string) => /^[A-Za-z\s]+$/.test(value) || value === "";

export const isValidPriority = (value: string) => /^$|^[1-4]$/.test(value);


