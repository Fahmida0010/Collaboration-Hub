export const getData = async (url) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${url}`, {
    credentials: "include",
  });
  return res.json();
};

export const postData = async (url, body) => {
  const res = await fetch(`${url}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(body),
  });

  return res.json();
};