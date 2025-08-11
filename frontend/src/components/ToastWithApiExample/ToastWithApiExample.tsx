import styles from './ToastWithApiExample.module.css';
import cn from 'classnames';
import { useEffect, type DetailedHTMLProps, type HTMLAttributes } from 'react';
import toast, { Toaster, type ToastOptions } from 'react-hot-toast';
import { useRequest } from '../../hooks/useRequrst';

const options: ToastOptions = {
	position: 'top-right',
};

const notify = (text: string) => toast.success(text, options);

interface ToastWithApiExampleProps extends DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> {
	className?: string;
}

export function ToastWithApiExample({ className, ...props }: ToastWithApiExampleProps) {
	const user = useRequest<string>();
	const prod = useRequest<string>();

	useEffect(() => {
		user.get('/api/user');
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		if (prod.info) {
			notify(prod.info);
		}
	}, [prod.info]);

	if (user.loading) {
		return <p>LOADING...</p>;
	}

	if (user.error) {
		toast.error(user.error.message, options);
		return <p>{user.error.message}</p>;
	}

	if (prod.error) {
		toast.error(prod.error.message, options);
	}

	function getProd() {
		prod.get('/api/product');
	}
	function postProd() {
		prod.get('/api/product', {
			method: 'POST',
			body: 'post',
		});
	}
	function delProd() {
		prod.get('/api/product', {
			method: 'DELETE',
			body: 'delete',
		});
	}
	return (
		<section className={cn(className, styles.toast_with_api_example)} {...props}>
			<h1>HELLO</h1>
			<h2>{user.data}</h2>
			<button onClick={getProd}>GET PROD</button>
			<button onClick={postProd}>GET PROD</button>
			<button onClick={delProd}>DELTE PROD</button>
			<Toaster />
		</section>
	);
}
