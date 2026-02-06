export async function fetchWithAuth(
  url: string,
  options: RequestInit = {},
  user: boolean
) {
  const guestToken =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  console.log("guestToken", guestToken);

  if (!user || guestToken) {
    console.log("no user work");

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
  console.log("res", res);

  if (res.status === 401 || res.status === 403) {
    const accessToken = localStorage.getItem("accessToken");
    console.log("access", accessToken);

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
