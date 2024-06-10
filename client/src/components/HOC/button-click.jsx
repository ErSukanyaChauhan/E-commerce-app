import HigherOrderComponentForButton from "./high-order-component";
const ButtonClickCountComp = ({count,increaseCount}) => {
 
    return <>
        <button onClick={increaseCount}>Click Me -{count}</button>

    </>
};


export default HigherOrderComponentForButton(ButtonClickCountComp);