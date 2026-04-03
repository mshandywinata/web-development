const auth = (req, res, next) => {
    if (!isValid(req)) {
        return res.redirect("/");
    };

    next();
};

const isValid = (req) => {
    return req.body.password === "ILoveProgramming";
};

export default auth;