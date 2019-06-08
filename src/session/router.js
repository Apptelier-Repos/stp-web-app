import SessionManager from "./sessionManager";

const Router = (function() {
  let GetApprovedPath = function(requestedPath) {
    const rootPath = "/";
    const signInPath = "/signIn";
    let approvedPath = requestedPath;

    switch (requestedPath) {
      case signInPath:
        if (SessionManager.getSessionStatus() === SessionManager.activeSessionFound) {
          approvedPath = rootPath;
        }
        break;

      default:
        if (SessionManager.getSessionStatus() === SessionManager.noActiveSessionFound) {
          approvedPath = signInPath;
        }
        break;
    }
    return approvedPath;
  };
  return {
    GetApprovedPath: GetApprovedPath
  };
})();

export default Router;
