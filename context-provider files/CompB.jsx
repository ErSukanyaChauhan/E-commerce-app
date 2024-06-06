import { useContext } from "react";
import { MyContext } from "../App";

const CompB =()=>{
    const value = useContext(MyContext);
    console.log("component B", value);
return (
    <>
    <br/>
    This is compB 
    </>
);
  

};
export default CompB;