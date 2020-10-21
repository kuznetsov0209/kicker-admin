export const API_HOST = process.env.API_HOST || "http://localhost:3000";

async function request(path, options = {}) {
  const url = `${API_HOST}${path}`;
  const response = await fetch(url, {
    credentials: "include",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    ...options
  });

  if (response.ok) {
    return response.json();
  } else {
    throw response;
  }
}

const api = {
  get: async path => {
    return await request(path);
  },
  post: async (path, body) => {
    return await request(path, {
      method: "post",
      body: JSON.stringify(body)
    });
  },
  delete: async path => {
    return await request(path, {
      method: "delete"
    });
  }
};

export default api;
