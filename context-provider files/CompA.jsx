import CompB from "./CompB";

const CompA = () => {
    console.log("component A");
  return (
    <>
      This is Component A
      <CompB/>
    </> 
  );
};
export default CompA;
