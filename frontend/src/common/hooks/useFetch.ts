import { useState, useEffect } from "react";

interface FetchOptions extends RequestInit {
  // Extend this interface if you need more specific types for options
}

const useFetch = <T>(
  url: string,
  options?: FetchOptions
): { data: T | null; loading: boolean; error: Error | null } => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url, options);
        if (!response.ok) throw new Error(response.statusText);
        const jsonData = (await response.json()) as T;
        setData(jsonData);
      } catch (e) {
        setError(e as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url, JSON.stringify(options)]);

  return { data, loading, error };
};

export default useFetch;
