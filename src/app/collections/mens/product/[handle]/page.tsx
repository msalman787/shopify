import Link from 'next/link';
import ImageTag from 'next/image';
import { Product, Image } from '../../../../types/index';
import {
	getAllProducts,
	getProductByHandle,
	getShopAll,
} from '../../../../utils/shopify';

import styles from './style.module.scss';
import DropDown from '@/app/components/Dropdown';
import PaymentBtn from '@/app/components/PaymentBtn';

type props = {
	params: {
		handle: string;
	};
};

export const dynamicParams = false;

export async function getStaticPaths() {
	const products = await getAllProducts();

	const paths = products.map(
		(product: Product) => `/collections/mens/product/${product.handle}`
	);

	return {
		paths,
		fallback: false,
	};
}

export default async function MensSingle({ params }: props) {
	const product = await getProductByHandle(params.handle);
	const data = await getShopAll();

	// const renderBreadCrumb = () => {
	// 	return data && data.map((node) => {});
	// };

	const renderImages = () => {
		return (
			product &&
			product.images.edges.map((img: Image, i: number) => {
				const { originalSrc, altText } = img.node;
				// console.log('------>', product);

				return (
					<div className={styles.imageWrap} key={i}>
						<ImageTag
							src={originalSrc}
							alt={product.title}
							height={750}
							width={485}
							style={{ objectFit: 'cover' }}
							priority
						/>
					</div>
				);
			})
		);
	};

	return (
		<section className={styles.productSingle}>
			<div className={styles.productImage}>{renderImages()}</div>
			<div className={styles.productInfo}>
				<div className={styles.breadCrumbs}>
					<ol>
						<li>
							<Link href={'/'}>home</Link>
						</li>
						<li>
							<Link href={'/'}>men</Link>
						</li>
						<li>
							<Link href={'/'}>{product.title}</Link>
						</li>
					</ol>
				</div>
				<h2 className={styles.productTitle}>{product.title}</h2>
				<DropDown />
				<PaymentBtn price={product.priceRange.minVariantPrice.amount} />

				<hr className={styles.horizontalLine} />

				<div className={styles.productDescription}>
					<p>details</p>
					<article dangerouslySetInnerHTML={{ __html: product.descriptionHtml }} />
				</div>
			</div>
		</section>
	);
}