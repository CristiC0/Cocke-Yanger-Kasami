export const matrixToNumber = (n1: number, n2: number, length: number) => {
    let index = 0;
    for (let i = 0; i < n1; i++) index += length - i;
    index += n2;
    return index;
};

export const numberToMatrix = (nr: number, length: number) => {
    let i = 0;
    while (nr >= length) {
        i++;
        nr -= length--;
    }
    return [i, nr];
};
