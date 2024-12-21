"use client";

import { fetchWithFirebaseJwt } from "./auth-wrapper";

export const getWithFirebaseJwt = async (
  path: string,
  {
    params,
    errorMessage,
  }: { params?: { [key: string]: any }; errorMessage?: string } = {},
) => {
  let url;
  if (params) {
    url = `${process.env.NEXT_PUBLIC_API_SERVER}${path}?${new URLSearchParams(
      params,
    )}`;
  } else {
    url = `${process.env.NEXT_PUBLIC_API_SERVER}${path}`;
  }
  errorMessage = errorMessage || `failed to get data from ${path}`;
  return fetchWithFirebaseJwt(url)
    .then((res) => {
      if (!res.ok) {
        throw new Error(errorMessage);
      }
      const contentType = res.headers.get("Content-Type");
      if (
        contentType &&
        contentType.toLocaleLowerCase().includes("application/json")
      ) {
        return res.json();
      } else {
        return res.text();
      }
    })
    .catch((error) => {
      console.error(error?.message ?? errorMessage);
      throw new Error(errorMessage);
    });
};

export const postWithFirebaseJwt = async (
  path: string,
  {
    body,
    headers,
  }: {
    body?: { [key: string]: any } | FormData;
    headers?: { [key: string]: any };
  } = {},
) => {
  let finalBody;
  if (body instanceof FormData) {
    finalBody = body;
  } else {
    finalBody = JSON.stringify(body);

    headers = {
      ...headers,
      "Content-Type": "application/json",
    };
  }
  return fetchWithFirebaseJwt(`${process.env.NEXT_PUBLIC_API_SERVER}${path}`, {
    method: "POST",
    headers: headers,
    body: finalBody,
  })
    .then(async (res) => {
      if (!res.ok) {
        const apiError = await res.json();
        throw new Error(apiError.message);
      }

      const contentType = res.headers.get("Content-Type");
      if (
        contentType &&
        contentType.toLocaleLowerCase().includes("application/json")
      ) {
        return res.json();
      } else {
        return res.text();
      }
    })
    .catch((error) => {
      console.error(error?.message ?? `failed to post data to ${path}`);
      throw new Error(error.message);
    });
};

export const deleteWithFirebaseJwt = async (
  path: string,
  {
    params,
    headers,
  }: {
    params?: { [key: string]: any };
    headers?: { [key: string]: any };
  } = {},
) => {
  let url;
  if (params) {
    url = `${process.env.NEXT_PUBLIC_API_SERVER}${path}?${new URLSearchParams(
      params,
    )}`;
  } else {
    url = `${process.env.NEXT_PUBLIC_API_SERVER}${path}`;
  }

  return fetchWithFirebaseJwt(url, {
    method: "DELETE",
    headers: headers,
  })
    .then(async (res) => {
      if (!res.ok) {
        const apiError = await res.json();
        throw new Error(apiError.message);
      }

      const contentType = res.headers.get("Content-Type");
      if (
        contentType &&
        contentType.toLocaleLowerCase().includes("application/json")
      ) {
        return res.json();
      } else {
        return res.text();
      }
    })
    .catch((error) => {
      console.error(error?.message ?? `failed to delete data from ${path}`);
      throw new Error(error.message);
    });
};
