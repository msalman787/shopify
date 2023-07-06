// import { useNavigation } from 'next/navigation';
import ProductSection from '@/app/components/productSection';
import { getShopAll } from '../../utils/mens/shopAll';

import styles from './style.module.scss';
import FilterBanner from '@/app/components/FilterBanner';

export default async function Mens() {
	const data = await getShopAll();

	return (
		<section className={styles.mensCollection}>
			<FilterBanner
				title={data[0].node.title}
				description='Feel at home in our selection of unisex pieces. From our classic Trucker style trousers to our innovative V2 hoodie, our pieces are made to be seen and rested in.'
			/>
			<ProductSection
				data={data[0].node.products.edges}
				collectionTitle={data[0].node.title}
			/>
		</section>
	);
}
