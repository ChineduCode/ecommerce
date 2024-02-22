import Products from "./Products"

const fetchProducts = async ()=> {
    const apiUrl = process.env.api_url
    const res = await fetch(`${apiUrl}/api/products`, { next: { revalidate: 10 } })
    const data = await res.json()
    return data;
}

export default async function HomePage(){
    const latestProducts = await fetchProducts()

    return(
        <main className="home-page">
            <section className="latest-products">
                <h1 className="heading">Latest Products</h1>
                <div className="products">
                    { latestProducts.map((product, index)=>
                        <Products product={product} key={index} />
                    )}
                </div>
            </section>
        </main>
    )
}