const roleGaurd = (allowedRole) => {
    return (req, res, next) => {

        // if (req.userRole == allowedRole) {
            if(allowedRole.includes(req.userRole)){
            next();
        } else {
            res.send("Not authorized for this request");
        }
    }


}

module.exports = roleGaurd;

