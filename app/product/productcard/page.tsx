import dynamic from 'next/dynamic'

const ProductCards = dynamic(() => import('../../../components/myComponent/ProductCards'), { ssr: false })

export default function Page() {
    return <ProductCards />
}
