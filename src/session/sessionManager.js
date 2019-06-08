var SessionManager = (function() {
  const activeSessionFound = "an active session was found";
  const noActiveSessionFound = "no active session was found";
  const sessionTimeout = 3600;
  const sessionStatusKeyName = "sessionStatus";
  const sessionDateKeyName = "sessionDate";
  var getSessionStatus = function() {
    if (
      localStorage.getItem(sessionStatusKeyName) === undefined ||
      localStorage.getItem(sessionDateKeyName) === undefined
    ) {
      localStorage.setItem(sessionStatusKeyName, noActiveSessionFound);
    }
    let sessionAge = (Date.now() - localStorage.getItem(sessionDateKeyName)) / 1000;
    if (sessionAge > sessionTimeout) {
      localStorage.setItem(sessionStatusKeyName, noActiveSessionFound);
    }
    return localStorage.getItem(sessionStatusKeyName); // Or pull this from cookie/localStorage
  };

  var createSession = function() {
    if (getSessionStatus === activeSessionFound) return;
    localStorage.setItem(sessionStatusKeyName, activeSessionFound);
    localStorage.setItem(sessionDateKeyName, Date.now());
  };

  var resetSessionTimeout = function() {
    if (localStorage.getItem(sessionStatusKeyName) === activeSessionFound) {
      localStorage.setItem(sessionDateKeyName, Date.now());
    }
  };

  var closeSession = function() {
    if (getSessionStatus === noActiveSessionFound) return;
    localStorage.setItem(sessionStatusKeyName, noActiveSessionFound);
  };

  return {
    activeSessionFound: activeSessionFound,
    noActiveSessionFound: noActiveSessionFound,
    sessionTimeout: sessionTimeout,
    getSessionStatus: getSessionStatus,
    createSession: createSession,
    resetSessionTimeout: resetSessionTimeout,
    closeSession: closeSession
  };
})();

export default SessionManager;
