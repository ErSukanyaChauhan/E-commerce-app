import HigherOrderComponentForButton from "./high-order-component";
const ButtonHoverComponent = (  {count,increaseCount}) => {
    return <>
        <button onMouseEnter={increaseCount}>Hover Me -{count}</button>

    </>
};


export default HigherOrderComponentForButton(ButtonHoverComponent);