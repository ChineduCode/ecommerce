import ProductScreen from "@/components/ProductScreen"

export default function Product({params : {id}}){
    return(
        <ProductScreen id={id} />
    )
}