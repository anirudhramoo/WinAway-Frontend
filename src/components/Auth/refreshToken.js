export const refreshTokenSetup = (res) => {
  let userData = JSON.parse(localStorage.getItem("userData"));
  if (userData) return;

  let refreshtime = (res.tokenObj.expires_in || 3600 - 5 * 60) * 1000;
  const refreshToken = async () => {
    let userData = JSON.parse(localStorage.getItem("userData"));
    if (userData) return;
    const newAuthres = await res.reloadAuthResponse();
    refreshtime = (newAuthres.expires_in || 3600 - 5 * 60) * 1000;
    //Save the token to local storage
    userData.token = newAuthres.id_token;
    localStorage.setItem("userData", JSON.stringify(userData));
    setTimeout(refreshToken, refreshtime);
  };
  setTimeout(refreshToken, refreshtime);
};
