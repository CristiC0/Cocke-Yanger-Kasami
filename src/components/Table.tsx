import { matrixToNumber, numberToMatrix } from "../utils/matrixToNumber";
import styles from "./Table.module.css";

type Props = {
    word: string;
    solutionMatrix: string[][];
    onCellClick: (nr: number[] | null) => void;
    clickedCell: number | null;
};

const colors = [
    "#777d68",
    "#89ab9e",
    "#cfbcab",
    "#824063",
    "#8d8294",
    "#283f5d",
    "#b55e49",
    "#45241c",
    "#3c4c51",
    "#83adb5",
];
export const Table = (props: Props) => {
    const { word, solutionMatrix, onCellClick, clickedCell } = props;

    const showCells: string[][] = [];
    if (clickedCell !== null) {
        const [x, y] = numberToMatrix(clickedCell, solutionMatrix[0].length);
        for (let i = x - 1, j = 1, k = 0; i >= 0; i--, j++, k++) {
            showCells.push([[k, y].join(), [i, y + j].join()]);
        }
    }

    
    return (
        <div className="table-responsive">
            <table className="table table-hover table-striped-columns ">
                <thead>
                    <tr className="table-info">
                        <th></th>
                        {word.split("").map((letter, index) => (
                            <td key={letter + index}>
                                <b>{letter}</b>
                            </td>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th></th>
                        {word.split("").map((letter, index) => (
                            <th scope="column" key={index + letter}>
                                {index + 1}
                            </th>
                        ))}
                    </tr>
                    {solutionMatrix.map((row, i) => (
                        <tr key={row.join() + i}>
                            <th scope="row">{i + 1}</th>
                            {row.map((searched, index) => (
                                <td
                                    className={` ${styles.cell} ${
                                        clickedCell ===
                                            matrixToNumber(
                                                i,
                                                index,
                                                solutionMatrix[0].length
                                            ) && styles["cell--clicked"]
                                    }`}
                                    style={
                                        showCells.findIndex((val) =>
                                            val.includes([i, index].join())
                                        ) !== -1
                                            ? {
                                                  backgroundColor: `${
                                                      colors[
                                                          showCells.findIndex(
                                                              (val) =>
                                                                  val.includes(
                                                                      [
                                                                          i,
                                                                          index,
                                                                      ].join()
                                                                  )
                                                          ) % colors.length
                                                      ]
                                                  }80`,
                                              }
                                            : {}
                                    }
                                    key={row + searched + index}
                                    onClick={() => {
                                        if (
                                            matrixToNumber(
                                                i,
                                                index,
                                                solutionMatrix[0].length
                                            ) === clickedCell
                                        )
                                            onCellClick(null);
                                        else onCellClick([i, index]);
                                    }}
                                >
                                    {searched || "-"}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};
