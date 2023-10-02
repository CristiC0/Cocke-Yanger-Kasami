export const validateRule = (rule: string[]) => {
    const leftPart = rule[0];
    const rightPart = rule[1];

    const leftValidationRegex = /^([A-Z]|[A-Z][0-9])$/;
    const rightValidationRegex = /^(?:[^A-Z]|[A-Z]\d{0,1}[A-Z]\d{0,1})$/;

    return [
        leftValidationRegex.test(leftPart),
        rightValidationRegex.test(rightPart),
    ];
};
