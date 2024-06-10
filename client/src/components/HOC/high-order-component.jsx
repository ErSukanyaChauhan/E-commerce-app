import { useState } from "react";

const HigherOrderComponentForButton = (Component) => {
    return function withHOC(props) {
        const [count, setCount] = useState(0);
        const increaseCount = () => {
            setCount(count + 1);
        };
        return <Component count = {count} increaseCount = {increaseCount}/>

    }
};

export default HigherOrderComponentForButton;