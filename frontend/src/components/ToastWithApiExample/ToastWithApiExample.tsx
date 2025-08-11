import styles from './ToastWithApiExample.module.css';
import cn from 'classnames';
import { useEffect, type DetailedHTMLProps, type HTMLAttributes } from 'react';
import toast, { Toaster, type ToastOptions } from 'react-hot-toast';
import { useRequest } from '../../hooks/useRequrst';

const options: ToastOptions = {
	position: 'top-right',
};

interface ToastWithApiExampleProps extends DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> {
	className?: string;
}

export function ToastWithApiExample({ className, ...props }: ToastWithApiExampleProps) {
	const user = useRequest<string>('/api/user');
	const prod = useRequest<string>('/api/product');

	useEffect(() => {
		user.request();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		if (prod.info) {
			toast.success(prod.info, options);
		}
	}, [prod.info]);

	useEffect(() => {
		if (prod.error) {
			toast.error(prod.error.message, options);
		}
	}, [prod.error]);

	if (user.loading) {
		return <p>LOADING...</p>;
	}

	if (user.error) {
		toast.error(user.error.message, options);
		return <p>{user.error.message}</p>;
	}

	function getProd() {
		prod.request();
	}

	function postProd() {
		prod.request({
			method: 'POST',
			auth: `Bearer ${localStorage.getItem('login_token') ? localStorage.getItem('login_token') : ''}`,
			body: 'post',
		});
	}
	function delProd() {
		prod.request({
			method: 'DELETE',
			body: 'delete',
		});
	}
	return (
		<section className={cn(className, styles.toast_with_api_example)} {...props}>
			<h1>EXAMPLE</h1>
			<h2>{user.data}</h2>
			<button onClick={getProd}>GET PRODUCT</button>
			<button onClick={postProd}>GET PRODUCT</button>
			<button onClick={delProd}>DELTE PRODUCT</button>
			<Toaster />
		</section>
	);
}
