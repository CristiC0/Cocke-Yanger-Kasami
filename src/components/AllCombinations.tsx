import { useState } from "react";
import { numberToMatrix } from "../utils/matrixToNumber";
type Props = {
    allCombinations: string[][];
    length: number;
};
const AllCombinations = (props: Props) => {
    const [show, setShow] = useState(false);
    const { allCombinations, length } = props;
    return (
        <div>
            <button
                className="btn btn-primary my-4"
                onClick={() => setShow((lastShow) => !lastShow)}
            >
                {show ? "Hide" : "Show"} All Combinations
            </button>
            {show &&
                allCombinations.map((combinations, index) => (
                    <p
                        key={combinations.join() + index}
                        className="m-auto col-sm-12 col-md-6 text-start"
                    >
                        <span
                            className=" d-inline-block text-center"
                            style={{ width: "2em" }}
                        >
                            {index + 1}.
                        </span>
                        <span>
                            {`C[${numberToMatrix(index, length)[0] + 1}][${
                                numberToMatrix(index, length)[1] + 1
                            }] = `}
                        </span>
                        {combinations.map((combination, i) => (
                            <span key={combination + index + i}>
                                {`${combination} `}
                            </span>
                        ))}
                    </p>
                ))}
        </div>
    );
};

export default AllCombinations;
