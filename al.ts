// import { useState } from "react";

// export const useCockeYoungerKasami = (grammar: {}, word: string) => {

// const [grammar, setGrammar] = useState([]);
// const [word, setWord] = useState("");
const grammar = [
    ["S", "AB"],
    ["S", "BC"],
    ["A", "BA"],
    ["A", "a"],
    ["B", "CC"],
    ["B", "b"],
    ["C", "AB"],
    ["C", "a"],
];
const word = "baaba";

const matrix: string[][] = [];
let line: string[] = [];
const letters = word.split("");
for (let index = 0; index < word.length; index++) {
    const searchedTerminal = letters[index];
    const foundNonterminals = grammar.reduce((acc, rule) => {
        if (rule[1] !== searchedTerminal) return acc;
        return [...acc, rule[0]];
    }, []);
    line.push(foundNonterminals.join(" "));
}
matrix.push(line);
const combinations = (A: string, B: string) => {
    const allCombinations: string[] = [];
    A.split(" ").forEach((firstLetter) =>
        B.split(" ").forEach((secondLetter) => {
            if (firstLetter === "-" || secondLetter === "-") return;
            allCombinations.push(`${firstLetter}${secondLetter}`);
        })
    );
    return allCombinations;
};

for (let i = 2; i <= word.length; i++) {
    line = [];
    for (let j = 0; j < word.length - i + 1; j++) {
        let searchedNonterminals: string[] = [];
        for (let k = 0; k < i - 1; k++) {
            searchedNonterminals = [
                ...searchedNonterminals,
                ...combinations(matrix[k][j], matrix[i - (k + 2)][j + 1]),
            ];
        }
        console.log(searchedNonterminals);
    }
    matrix.push(line);
}

console.log(line);

// };
