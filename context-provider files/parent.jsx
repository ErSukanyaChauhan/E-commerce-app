// const ParentComp = (props) => {
//   console.log(props);
//   return <>
//   This is my parent comp{props.data}
//   </>;
// }; Destructure in props

import CompA from "./compA";


// const ParentComp = ({data, children}) => {
//   return <>
//   {children}
//   This is my parent comp{data}
//   </>;
// };

const ParentComp = () => {
  console.log("parent")
  return (
    <>
    <CompA/>
    </>
  );
};

export default ParentComp;
