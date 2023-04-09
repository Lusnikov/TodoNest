import axios from "axios";

const BASE_URL = "localhost:4000"

export const $api = axios.create({
    baseURL: BASE_URL,
    timeout: 5000,
    headers: {
      'Content-Type': 'application/json',
    },
    withCredentials: true
  });

$api .interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
});

$api.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;
  
      // Если ошибка 401 и не было отправлено повторное обращение
      if (error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
  
        // Получаем новый токен с сервера
        const token = await axios.post('https://api.example.com/token/refresh', {
          refreshToken: localStorage.getItem('refreshToken'),
        });
  
        // Обновляем сохраненный токен
        localStorage.setItem('accessToken', token.data.accessToken);
  
        // Повторно отправляем запрос с новым токеном
        return $api(originalRequest);
      }
  
      // Возвращаем ошибку, если это не 401 или было отправлено повторное обращение
      return Promise.reject(error);
    },
  );