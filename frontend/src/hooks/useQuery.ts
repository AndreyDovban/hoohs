import { useState, useEffect } from 'react';

export function useQuery<T>(request: RequestInfo) {
	const [data, setData] = useState<T | null>(null);
	const [loading, setLoading] = useState<boolean>(false);
	const [error, setError] = useState<Error | null>(null);

	useEffect(() => {
		setLoading(true);
		fetch(request)
			.then(response => {
				if (!response.ok) {
					throw new Error(`Ошибка HTTP запроса! Статус ошибки ${response.status}`);
				}

				return response.json();
			})
			.then(response => {
				setData(response);
			})
			.catch(error => {
				setError(error);
			})
			.finally(() => {
				setLoading(false);
			});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	function get(request: RequestInfo) {
		setLoading(true);
		fetch(request)
			.then(response => {
				if (!response.ok) {
					throw new Error(`Ошибка HTTP запроса! Статус ошибки ${response.status}`);
				}

				return response.json();
			})
			.then(response => {
				setData(response);
			})
			.catch(error => {
				setError(error);
			})
			.finally(() => {
				setLoading(false);
			});
	}

	return { data, loading, error, get };
}
