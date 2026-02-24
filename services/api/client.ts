const BASE_URL = "https://hacker-news.firebaseio.com/v0";

type RequestOptions = RequestInit & {
  timeout?: number;
};

export async function apiFetch<T>(
  endpoint: string,
  options?: RequestOptions,
): Promise<T> {
  const controller = new AbortController();
  const timeout = options?.timeout ?? 8000;

  const timeoutId = setTimeout(() => {
    controller.abort();
  }, timeout);

  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      ...options,
      signal: controller.signal,
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }

    const data: T = await response.json();
    return data;
  } catch (error: any) {
    if (error.name === "AbortError") {
      throw new Error("Request timed out");
    }
    throw error;
  } finally {
    clearTimeout(timeoutId);
  }
}
