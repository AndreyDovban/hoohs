import { useEffect, type DetailedHTMLProps, type HTMLAttributes } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { useRequest } from '../../hooks/useRequrst';

const notify = (text: string) =>
	toast.error(text, {
		position: 'top-right',
		removeDelay: 2000,
	});

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
			console.log('info');
			toast.success(info, {
				position: 'top-right',
				removeDelay: 2000,
			});
		}
	}, [info]);

	if (loading) {
		console.log('loading');
		return <p>LOADING...</p>;
	}

	if (error) {
		console.log('error');
		return <p>{error.message}</p>;
	}

	return (
		<section className={className} {...props}>
			<h1>HELLO</h1>
			<button onClick={() => notify('workq2 ukd2sdfwp fdsfsdfsd sdfsdf dsfsdfsdf sfsdf sfsdfs')}>
				Make me a toast
			</button>
			<Toaster />
		</section>
	);
}
