
//creating the Higher order conponent
import ButtonClick from "./components/HOC/button-click";
import ButtonHover from "./components/HOC/button-hover";
const learningHoc = () => {
    return (
        <>
            <h1>My HOC COMPONENT</h1>
            <ButtonHover />
            <ButtonClick />
        </>
    )
};

export default learningHoc;