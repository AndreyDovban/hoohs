import { useEffect, type DetailedHTMLProps, type HTMLAttributes } from 'react';
import toast, { Toaster, type ToastOptions } from 'react-hot-toast';
import { useRequest } from '../../hooks/useRequrst';

const options: ToastOptions = {
	position: 'top-right',
	removeDelay: 2000,
};

interface ToastWithApiExampleProps extends DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> {
	className?: string;
}

export function ToastWithApiExample({ className, ...props }: ToastWithApiExampleProps) {
	const { loading, error, info, get } = useRequest();

	useEffect(() => {
		get('/api/user');
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		if (info) {
			toast.success('work', options);
		}
	}, [info]);

	if (loading) {
		return <p>LOADING...</p>;
	}

	if (error) {
		return <p>{error.message}</p>;
	}

	return (
		<section className={className} {...props}>
			<h1>HELLO</h1>
			<button onClick={() => toast.error('work', options)}>Make me a toast</button>
			<Toaster />
		</section>
	);
}
