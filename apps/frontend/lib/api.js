const API = process.env.NEXT_PUBLIC_API_URL;

export const postData = async (url, data) => {
  const res = await fetch(`${API}${url}`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return res.json();
};