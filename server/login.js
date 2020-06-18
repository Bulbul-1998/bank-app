/**
 * 
 * @param {import("express").Request} req 
 * @param {import("express").Response} res 
 */
function login(req, res) {
  const {
    userType,
    email,
    password,
    extra,
    mode
  } = req.body;

  if (!userType ||
    (userType !== "employee" && userType !== "customer") ||
    (mode === "google" && !extra)
  ) return error(400, "Invalid payload");
  if (!email) return error(400, "Email required");
  if (mode === "normal" && !password) return error(400, "password required");

  setTimeout(() => {
    res.send({
      status: "OK",
      message: "Login successfull"
    });
  }, 2000);

  function error(code, msg) {
    res.status(code).send({
      status: "ERROR",
      message: msg
    });
  }
}

module.exports = login;