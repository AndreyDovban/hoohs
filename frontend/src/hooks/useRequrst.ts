import { useState } from 'react';

export function useRequest<T>() {
	const [data, setData] = useState<T>();
	const [loading, setLoading] = useState<boolean>(false);
	const [error, setError] = useState<Error | null>(null);

	const get = async (url: string) => {
		setLoading(true);
		fetch(url, {
			headers: {
				ContentType: 'application/json',
				Authorization: `Bearer ${
					localStorage.getItem('login_token') ? localStorage.getItem('login_token') : ''
				}`,
			},
		})
			.then(response => {
				if (!response.ok) {
					throw new Error(`Ошибка HTTP запроса! Статус ошибки ${response.status}`);
				}
				return response.json();
			})
			.then(reponse => {
				setData(reponse);
			})
			.catch(error => {
				if (error instanceof Error) {
					setError(error);
				}
			})
			.finally(() => {
				setLoading(false);
			});
	};

	return { data, loading, error, get };
}
