import { ChangeEvent } from "react";
import styles from "./Rule.module.css";
import { validateRule } from "../utils/validate";
type Props = {
    orderNr: number;
    changeRule: (index: number, leftPart: string, rightPart: string) => void;
    rule: string[];
};

export const Rule = (props: Props) => {
    const { orderNr, rule, changeRule } = props;

    const [errorLeft, errorRight] = validateRule(rule);

    const leftPartChangeHandler = (event: ChangeEvent) => {
        changeRule(orderNr, (event.target as HTMLInputElement).value, rule[1]);
    };

    const rightPartChangeHandler = (event: ChangeEvent) => {
        changeRule(orderNr, rule[0], (event.target as HTMLInputElement).value);
    };

    return (
        <div>
            <span className={`${styles.number} text-center`}>
                {orderNr + 1}.{" "}
            </span>
            <input
                className={`form-control ${styles["letter-box"]} ${
                    errorLeft || styles["letter-box--error"]
                }`}
                type="text"
                maxLength={2}
                defaultValue={rule[0]}
                onBlur={leftPartChangeHandler}
            />
            <span className="mx-2">&rarr;</span>
            <input
                className={`form-control ${styles["letter-box--right"]} ${
                    errorRight || styles["letter-box--error"]
                }`}
                type="text"
                maxLength={4}
                defaultValue={rule[1]}
                onBlur={rightPartChangeHandler}
            />
            <span>
                {errorLeft} {errorRight}
            </span>
        </div>
    );
};
