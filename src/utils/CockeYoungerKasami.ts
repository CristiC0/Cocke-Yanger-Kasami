export const CockeYoungerKasami = (grammar: string[][], word: string) => {
    const matrix: string[][] = [];
    let line: string[] = [];
    const letters = word.split("");
    const allCellsCombinations: string[][] = [];

    for (let index = 0; index < word.length; index++) {
        const searchedTerminal = letters[index];
        const foundNonterminals = grammar.reduce((acc, rule) => {
            if (rule[1] !== searchedTerminal) return acc;
            return [...acc, rule[0]];
        }, []);
        allCellsCombinations.push([letters[index]]);
        line.push(foundNonterminals.join(" "));
    }
    matrix.push(line);

    const combinations = (A: string, B: string) => {
        const allCombinations: string[] = [];
        A.split(" ").forEach((firstLetter) =>
            B.split(" ").forEach((secondLetter) => {
                allCombinations.push(`${firstLetter}${secondLetter}`);
            })
        );

        return allCombinations;
    };

    for (let i = 1; i < word.length; i++) {
        line = [];
        for (let j = 0; j < word.length - i; j++) {
            let searchedNonterminals: string[] = [];

            for (let k = 0; k < i; k++) {
                if (
                    matrix[k][j] === "" ||
                    matrix[i - (k + 1)][j + k + 1] === ""
                )
                    continue;
                const generatedCombinations = combinations(
                    matrix[k][j],
                    matrix[i - (k + 1)][j + k + 1]
                );

                searchedNonterminals = [
                    ...searchedNonterminals,
                    ...generatedCombinations,
                ];
            }
            allCellsCombinations.push(searchedNonterminals);
            const foundNonterminals = grammar.reduce((acc, rule) => {
                if (searchedNonterminals.length === 0) return [...acc, ""];
                if (!searchedNonterminals.includes(rule[1])) return acc;
                return [...acc, rule[0]];
            }, []);
            line.push([...new Set(foundNonterminals)].join(" "));
        }
        matrix.push(line);
    }

    return [matrix, allCellsCombinations];
};
