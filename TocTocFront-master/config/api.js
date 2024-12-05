const API_URL = "https://toctoc-production.up.railway.app";
import axios from "axios";
import {
  storeToken,
  getToken,
  getRefreshToken,
  removeTokens,
} from "../config/authToken";

// Función para hacer el registro de usuario
export const signUp = async (name, lastname, email, password, gender) => {
  try {
    const response = await fetch(`${API_URL}/users/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        lastname,
        email,
        password,
        gender,
      }),
    });

    const result = await response.json();

    if (!response.ok) {
      console.error(result);
      console.error(result.message);
      // throw new Error(result.message || "Error en el registro");
    }

    return result;
  } catch (error) {
    // throw error;
  }
};

// Función para hacer el login de usuario
export const signIn = async (email, password) => {
  try {
    const response = await fetch(`${API_URL}/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || "Error en el inicio de sesión");
    }

    await storeToken(result.token, result.refreshToken);

    return result.token;
  } catch (error) {
    throw error;
  }
};

// Función para eliminar la cuenta de usuario
export const deleteUserAccount = async () => {
  try {
    const token = await getToken();
    if (!token) throw new Error("No hay token disponible");

    const response = await fetch(`${API_URL}/users`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (response.status === 204) {
      removeTokens();
      return;
    } else {
      const result = await response.json();
      throw new Error(result.message || "Error al eliminar la cuenta");
    }
  } catch (error) {
    throw error;
  }
};

// Función para recuperar la contraseña
export const recoveryPass = async (email) => {
  try {
    const response = await fetch(`${API_URL}/users/reset-password`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
      }),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || "Error al recuperar contraseña");
    }

    return result;
  } catch (error) {
    throw error;
  }
};

// Función para refrescar el token de autenticación
export const refreshAuthToken = async () => {
  try {
    const refreshToken = await getRefreshToken();
    if (!refreshToken) return null;

    const response = await fetch(`${API_URL}/users/refresh`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${refreshToken}`,
      },
    });

    if (response.ok) {
      const { token } = await response.json();
      await storeToken(token); // Guardamos solo el nuevo auth token
      return token;
    }
  } catch (error) {
    console.error("Error al refrescar el token:", error);
  }
  return null;
};

// Función para cargar todos los posts
export const loadAllPosts = async (page = 0) => {
  try {
    const response = await fetch(`${API_URL}/post/all?page=${page}&size=4`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const result = await response.json();
    console.log(result)

    if (!response.ok) {
      throw new Error(result.message || "Hubo un problema al cargar los posts");
    }

    return result;
  } catch (error) {
    throw error;
  }
};

// Función para crear un post
export const createPost = async (fileUri, content, location) => {
  try {
    const token = await getToken();
    if (!token) throw new Error("No hay token disponible");

    const formData = new FormData();

    if (fileUri) {
      const file = {
        uri: fileUri,
        type: fileUri.endsWith(".mp4") ? "video/mp4" : "image/jpeg", // Tipo de archivo
        name: fileUri.split("/").pop(), // Nombre del archivo
      };

      formData.append("file", file);
    }

    formData.append("title", "Nuevo Post"); // título genérico
    formData.append("content", content);
    formData.append("location", location);

    const response = await fetch(`${API_URL}/post/withFiles`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
      body: formData,
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(error || "Error al crear el post");
    }

    return await response.json();
  } catch (error) {
    throw error;
  }
};

// Función para crear un post simple
export const createSimplePost = async (content, location) => {
  try {
    const token = await getToken();
    if (!token) throw new Error("No hay token disponible");

    const response = await fetch(`${API_URL}/post`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: "Nuevo Post", // título genérico
        content,
        location,
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      console.error(error);
      console.error(error.message);
      throw new Error(error || "Error al crear el post");
    }

    return await response.json();
  } catch (error) {
    console.error(error);
    console.error(error.message);
    throw error;
  }
};

// Función para obtener el perfil del usuario
export const getUserProfile = async () => {
  try {
    const token = await getToken();
    if (!token) throw new Error("No hay token disponible");

    const response = await fetch(`${API_URL}/users`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Error al obtener datos del usuario");
    }

    return await response.json();
  } catch (error) {
    throw error;
  }
};

// Función para actualizar la biografía del usuario
export const updateUserBio = async (bio) => {
  try {
    const token = await getToken();
    if (!token) throw new Error("No hay token disponible");

    const response = await fetch(`${API_URL}/users`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ bio }),
    });

    if (!response.ok) {
      const result = await response.json();
      throw new Error(result.message || "Error al actualizar la biografía");
    }

    return await response.json();
  } catch (error) {
    throw error;
  }
};

export const getAds = async () => {
  try {
    const response = await fetch(
      "https://my-json-server.typicode.com/chrismazzeo/advertising_da1/ads",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || "Error al obtener los anuncios");
    }

    return result;
  } catch (error) {
    throw error;
  }
};
