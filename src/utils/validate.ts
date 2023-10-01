export const validateRule = (rule: string[]) => {
    const leftPart = rule[0];
    const rightPart = rule[1];

    const leftValidationRegex = /^([A-Z]|[A-Z][0-9])$/;
    const rightValidationRegex = /^([a-z]|([A-Z][0-9])|[A-Z]){1,2}$/;

    return [
        leftValidationRegex.test(leftPart),
        rightValidationRegex.test(rightPart),
    ];
};
