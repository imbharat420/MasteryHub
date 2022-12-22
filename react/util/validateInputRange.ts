const validateInputRange = (min: number, max: number, value: number | string) => (typeof value === 'string' ? 0 : Math.min(Math.max(value, min), max));

export default validateInputRange;
