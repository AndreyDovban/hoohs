import { useState } from 'react';

type RequestConfig = {
	method?: 'GET' | 'POST' | 'PATCH' | 'DELETE';
	body?: unknown;
	auth?: unknown;
};

export function useRequest<T>(url: string) {
	const [data, setData] = useState<T>();
	const [loading, setLoading] = useState<boolean>(false);
	const [error, setError] = useState<Error | null>(null);
	const [info, setInfo] = useState<string>('');

	let controller = new AbortController();

	const request = async (config?: RequestConfig) => {
		try {
			setLoading(true);
			setInfo('');
			setError(null);
			controller.abort();
			controller = new AbortController();
			const signal = controller.signal;

			const response = await fetch(url, {
				method: config?.method || 'GET',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${
						localStorage.getItem('login_token') ? localStorage.getItem('login_token') : ''
					}`,
				},
				body: JSON.stringify(config?.body),
				signal,
			});
			if (!response.ok) {
				throw new Error(`Ошибка HTTP запроса! Статус ошибки ${response.status}`);
			}

			const result = await response.json();
			setData(result);
			if (typeof result == 'string') {
				setInfo(result);
			}
		} catch (error) {
			if (error instanceof Error && error.name !== 'AbortError') {
				setError(error);
			}
		} finally {
			setLoading(false);
		}
	};

	return { data, loading, error, info, request };
}
