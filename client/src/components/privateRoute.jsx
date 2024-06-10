import { Navigate, Outlet } from "react-router-dom";

const PrivateRouteComponent = ({ userCondition, redirectRoute='/login' }) => {
    if(!userCondition){
        return <Navigate to ={redirectRoute} replace/>
    }
    return (
        <>
        <Outlet/>
        </>
    )
};

export default PrivateRouteComponent;