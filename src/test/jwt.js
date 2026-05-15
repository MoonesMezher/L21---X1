const jwtService = require("../utils/jwtService");

const a = jwtService.genrateToken({ userId: "12345", role: "admin" });


const d = jwtService.verifyToken(a);
console.log(
    d
);