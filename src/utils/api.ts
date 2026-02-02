export async function fetchWithAuth(
  url: string,
  options: RequestInit = {},
  user: boolean,
) {
  if (!user) {
    const guestToken = localStorage.getItem("token");
    console.log("guestToken", guestToken);

    return fetch(url, {
      ...options,
      headers: {
        ...(options.headers || {}),
        ...(guestToken ? { "X-Guest-Token": guestToken } : {}),
      },
    });
  }

  let res = await fetch(url, {
    ...options,
    credentials: "include",
  });
  console.log("accessToken");
  if (res.status === 401 || res.status === 403) {
    const accessToken = localStorage.getItem("accessToken");
    console.log("LocalaccessToken");
    if (accessToken) {
      res = await fetch(url, {
        ...options,
        headers: {
          ...(options.headers || {}),
          Authorization: `Bearer ${accessToken}`,
        },
      });
    }
  }

  return res;
}
