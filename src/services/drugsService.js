const slugify = require('slugify');
const LONG_CHAU_DOMAIN = 'nhathuoclongchau.com.vn';
const LONG_CHAU_API = `https://api.${LONG_CHAU_DOMAIN}/lccus/search-product-service/api/products/ecom/product/search`;

export const drugs = async (supplement, count = 5, width = '1080', quality = '90') => {
    const results = await fetch(LONG_CHAU_API, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            "keyword": supplement,
            "maxResultCount": count,
            "skipCount": 0,
            "sortType": 4,
            "codes": [
                "category",
                "objectUse",
                "prescription",
                "skin",
                "flavor",
                "manufactor",
                "indications",
                "brand",
                "brandOrigin"
            ],
            "suggestSize": 6,
            "prescription": [
                "false"
            ]
        })
    });
    let data = await results.json();
    if(data.products!==undefined) {
        return data.products.map((product) => (
            {
                name: slugify(product.webName, {
                    replacement: ' ',
                    locale: 'vi',
                }),
                image: product.image.replace('unsafe/', `unsafe/${width}x0/filters:quality(${quality})/`),
                url: `https://${LONG_CHAU_DOMAIN}/${product.slug}`,
                specification: product.specification,
                price: product.price.price || product.prices.filter(price => price.measureUnitName !== 'Vỉ' || price.measureUnitName !== 'Viên')[0].price,
            }
        ));
    } 
}

//Use this function to get test results
// getLongChauResults('canxi', 10).then((results) => {
//     console.log(results);
// });