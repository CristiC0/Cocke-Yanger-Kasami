import { ChangeEvent, useEffect, useState } from "react";
import { Rule } from "./Rule";
import { Table } from "./Table";
import { CockeYoungerKasami } from "../utils/CockeYoungerKasami";
import styles from "./RuleSet.module.css";
import { matrixToNumber, numberToMatrix } from "../utils/matrixToNumber";
import AllCombinations from "./AllCombinations";

export const RuleSet = () => {
    const [rules, setRules] = useState<string[][]>([["S", ""]]);
    const [word, setWord] = useState("");
    const [selectedCell, setSelectedCell] = useState<null | number>(null);
    const [reset, setReset] = useState(true);

    useEffect(() => {
        const str = localStorage.getItem("data");
        if (!str) return;
        const data = JSON.parse(str);
        setRules(() => data.rules);
        setWord(() => data.word);
    }, []);

    const [solutionMatrix, allCombinations] = CockeYoungerKasami(rules, word);

    const changeRule = (index: number, leftPart: string, rightPart: string) => {
        const newRules = rules.map((rule, i) => {
            if (i !== index) return rule;
            return [leftPart, rightPart];
        });

        localStorage.setItem("data", JSON.stringify({ rules: newRules, word }));
        setRules(newRules);
    };

    const changeHandler = (event: ChangeEvent) => {
        const nrOfRules = +(event.target as HTMLInputElement).value;
        if (nrOfRules <= 0) return;
        if (nrOfRules > rules.length) {
            const newRules = [...rules];
            for (let i = rules.length; i < nrOfRules; i++) {
                newRules.push(["", ""]);
            }
            setRules(newRules);
        }
        if (nrOfRules < rules.length) {
            const newRules = [...rules].slice(0, nrOfRules);
            setRules(newRules);
        }
    };
    const clear = () => {
        localStorage.clear();
        const clearRules: string[][] = [];
        rules.forEach(() => clearRules.push(["", ""]));
        setRules(clearRules);
        setReset((oldValue) => !oldValue);
    };
    const onBlurHandler = (e: ChangeEvent) => {
        const newWord = (e.target as HTMLInputElement).value;
        setWord(newWord);
        localStorage.setItem("data", JSON.stringify({ rules, word: newWord }));
    };

    const showDecision =
        solutionMatrix[solutionMatrix.length - 1].length !== 0 &&
        rules.length !== 0
            ? solutionMatrix[solutionMatrix.length - 1][0]
                  .split("")
                  .includes(rules[0][0])
            : false;

    const selectedCellIndexex =
        selectedCell !== null
            ? numberToMatrix(selectedCell, word.split("").length)
            : null;
    return (
        <div className="container-fluid">
            <div className="container mb-4">
                <div className="row">
                    <div className="col-sm-12 col-md-5 mb-sm-2 mb-md-0">
                        <div className="form-group">
                            <label
                                htmlFor="nrOfRules"
                                className="form-label mx-2"
                            >
                                Number of rules:
                            </label>

                            <input
                                className={`${styles.input} form-control`}
                                type="number"
                                id="nrOfRules"
                                key={rules.length}
                                onBlur={changeHandler}
                                defaultValue={rules.length}
                                min={0}
                            />
                        </div>
                    </div>
                    <button
                        className="btn btn-primary col-sm-12 col-md-2"
                        onClick={() => clear()}
                    >
                        Clear
                    </button>
                    <div className="col-sm-12 col-md-5">
                        <div className="form-group">
                            <label htmlFor="word" className="form-label mx-2">
                                Word to check:
                            </label>

                            <input
                                className={`${styles.input} form-control`}
                                type="text"
                                id="word"
                                defaultValue={word}
                                onBlur={onBlurHandler}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className="container mb-4">
                <div className="row g-2" key={reset + ""}>
                    {rules.map((rule, index) => (
                        <div
                            className="col-12 col-md-6 col-xl-4"
                            key={"rule" + index}
                        >
                            <Rule
                                rule={rule}
                                orderNr={index}
                                changeRule={changeRule}
                                key={"rule" + index}
                            />
                        </div>
                    ))}
                </div>
            </div>

            {word !== "" &&
                (showDecision ? (
                    <div className="card p-2 rounded text-white bg-success">
                        <div className="card-body p-0">
                            <h4 className="card-title m-0">
                                The grammar accepts this word
                            </h4>
                        </div>
                    </div>
                ) : (
                    <div className="card p-2 rounded text-white bg-danger">
                        <div className="card-body p-0">
                            <h4 className="card-title m-0">
                                The grammar doesn't accept this word
                            </h4>
                        </div>
                    </div>
                ))}
            {word !== "" && (
                <Table
                    word={word}
                    solutionMatrix={solutionMatrix}
                    onCellClick={(nrs: number[] | null) => {
                        if (nrs !== null)
                            setSelectedCell(
                                matrixToNumber(
                                    nrs[0],
                                    nrs[1],
                                    word.split("").length
                                )
                            );
                        else setSelectedCell(null);
                    }}
                    clickedCell={selectedCell}
                />
            )}

            {selectedCellIndexex !== null && selectedCell !== null && (
                <div className="card text-white bg-info p-1 ">
                    <h4 className="card-header card-title">
                        {`Cell[${selectedCellIndexex[0] + 1}][${
                            selectedCellIndexex[1] + 1
                        }]`}
                    </h4>
                    <div className="card-body">
                        <p className="card-text">
                            {allCombinations[selectedCell].map((x, i) => (
                                <span key={x + i}>{x} </span>
                            ))}
                        </p>
                    </div>
                </div>
            )}
            {word !== "" && (
                <AllCombinations
                    allCombinations={allCombinations}
                    length={word.split("").length}
                />
            )}
        </div>
    );
};
