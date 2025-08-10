import styles from './ToastWithApiExample.module.css';
import cn from 'classnames';
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
	const { loading, error, data, get } = useRequest<string>();

	useEffect(() => {
		get('/api/user');
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	if (loading) {
		return <p>LOADING...</p>;
	}

	if (error) {
		toast.error(error.message, options);
		return <p>{error.message}</p>;
	}

	function getProd() {
		get('/api/user');
	}
	if (data) {
		toast.success(data, options);

		return (
			<section className={cn(className, styles.toast_with_api_example)} {...props}>
				<h1>HELLO</h1>
				<h2>{data}</h2>
				<button onClick={getProd}>GET PROD</button>
				{/* <button onClick={postProd}>GET PROD</button> */}
				{/* <button onClick={delProd}>DELTE PROD</button> */}
				<Toaster />
			</section>
		);
	}
}
