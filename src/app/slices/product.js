import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Swal from "sweetalert2";
import axios from "axios";

export const fetchProducts = createAsyncThunk("fetchProducts", async () => {
    console.log("fetch_products")
    const res = await axios.get("https://localhost:5050/api/products");
    return res;
});

export const fetchProduct = createAsyncThunk("fetchProduct", async (id) => {
    console.log("fetch_product")
    const res = await axios.get("https://localhost:5050/api/products/" + id);
    return res;
});

export const addToCart = createAsyncThunk("addToCard", async (cartInfo) => {
    console.log("add_to_cart")
    const { userId, product, count} = cartInfo;
    const cart = {
        cartHeader: {
            userId: userId,
        },
        cartDetails: [
            {
                count: count,
                productId: product.productId,
                product: product
            }
        ]   
    }
    const res = await axios.post("https://localhost:5050/api/cart", cart);
    return res;
});

export const getUserCart = createAsyncThunk("getUserCart", async (userId) => {
    console.log("get_user_cart")
    const res = await axios.get("https://localhost:5050/api/cart/GetCart/" + userId);
    if (res.data.result.cartHeader.couponCode) {
        const coupon = await axios.get("https://localhost:5050/api/coupon/" + res.data.result.cartHeader.couponCode);
        res.discountAmount = coupon.data.result.discountAmount;
    }
    return res;
});

export const removeFromCart = createAsyncThunk("removeFromCart", async (cartDetailsId) => {
    console.log("remove_from_cart")
    const headers = {
        'Content-Type' : 'application/json'
    }
    const res = await axios.post("https://localhost:5050/api/cart/RemoveCart", cartDetailsId, { headers: headers });
    return res;
});

export const updateCartDetails = createAsyncThunk("updateCartDetails", async ({product, userId}) => {
    console.log("update_cart_details")
    let res = await axios.post("https://localhost:5050/api/cart/UpdateDetails", product);
    if (res.data.isSuccess) {
        const carts = await axios.get("https://localhost:5050/api/cart/GetCart/" + userId);
        res.carts = carts.data.result.cartDetails;
    }
    return res;
});

export const clearCart = createAsyncThunk("clearCart", async (userId) => {
    console.log("clear_cart")
    const headers = {
        'Content-Type' : 'application/json'
    }
    const res = await axios.post("https://localhost:5050/api/cart/ClearCart", userId, { headers: headers });
    return res;
});

export const applyCoupon = createAsyncThunk("applyCoupon", async ({userId, couponCode}) => {
    console.log("apply_coupon")
    const cart = {
        cartHeader: {
            userId,
            couponCode
        }
    }
    const res = await axios.post("https://localhost:5050/api/cart/ApplyCoupon", cart);
    return res;
});

export const removeCoupon = createAsyncThunk("removeCoupon", async (userId) => {
    console.log("remove_coupon")
    const headers = {
        'Content-Type' : 'application/json'
    }
    const res = await axios.post("https://localhost:5050/api/cart/RemoveCoupon", userId, { headers: headers });
    return res;
});
 
export const addToFavorites = createAsyncThunk("addToFavorites", async (favoriteInfo) => {
    console.log("add_to_favorites")
    const { userId, product } = favoriteInfo;
    let favoriteProduct = {
        userId: userId,
        product: product
    }
    let res = await axios.post("https://localhost:5050/api/favorites", favoriteProduct);
    if (res.data.isSuccess) {
        const favorites = await axios.get("https://localhost:5050/api/favorites/" + userId)
        res.favorites = favorites.data.result;
    }
    return res;
});

export const getFavorites = createAsyncThunk("getFavorites", async (userId) => {
    console.log("get_favorites")
    const res = await axios.get("https://localhost:5050/api/favorites/" + userId)
    return res;
});

export const removeFromFavorites = createAsyncThunk("removeFromFavorites", async (favoriteInfo) => {
    console.log("remove_from_favorites")
    const { userId, productId } = favoriteInfo;
    let res = await axios.delete(`https://localhost:5050/api/favorites/${userId}/${productId}`)
    if (res.data.isSuccess) {
        const favorites = await axios.get("https://localhost:5050/api/favorites/" + userId)
        res.favorites = favorites.data.result;
    }
    return res;
});

export const clearFavorites = createAsyncThunk("clearFavorites", async (userId) => {
    console.log("clear_favorites")
    const res = await axios.delete("https://localhost:5050/api/favorites/" + userId)
    return res;
});

export const checkout = createAsyncThunk("checkout", async (checkoutInfo) => {
    console.log("checkout")
    let res = await axios.post(`https://localhost:5050/api/cartc`, checkoutInfo)
    if (res.data.isSuccess) { 
        const { userId } = checkoutInfo;
        const orders = await axios.get(`https://localhost:5050/api/orders/` + userId)
        res.orders = orders.data.result
    }
    return res;
});

export const getOrders = createAsyncThunk("getOrders", async (userId) => {
    console.log("get_orders")
    let res = await axios.get(`https://localhost:5050/api/orders/` + userId)
    return res;
});

const productsSlice = createSlice({
    name: 'products',
    initialState: {
        products: [],
        favorites: [],
        single: null,  
        isLoading: true,
        isCheckoutLoading: false,
        isError: false,
        lastAddedCartDetail: {},
        lastDeletedCartDetail: {},
        cartDetails: [],
        totalDiscount: 0,
        orders: [],
        couponCode: '',
    },
    reducers: {
        //sepete ürün eklemek için kullanılacak
        AddToCart: (state, action) => {
            let { id } = action.payload;
            let sepeteEklenecekUrun = state.carts.find(item => item.productId === parseInt(id))
            if (sepeteEklenecekUrun === undefined) {
                //sepete eklemek istediğim ürün bilgilerine getirecek ilgili rest servisi çağırılır
                let item = state.products.find(item => item.productId === parseInt(id))
                item.quantity = 1
                state.carts.push(item)
                Swal.fire(
                    {
                        title: 'Başarılı',
                        text: "Ürün sepete eklendi!",
                        icon: 'success',
                        showConfirmButton: false,
                        timer: 2000
                    }
                )
            }
        },
        getProductById: (state, action) => {
            let { id } = action.payload;
            let urunDetay = state.products.find(item => item.productId === parseInt(id))
            console.log("Urun Detay: ", urunDetay);
            state.single = urunDetay;
        },
        updateCart: (state, action) => {
            let { val, id } = action.payload;
            state.carts.forEach(item => {
                if (item.productId === parseInt(id)) {
                    item.quantity = val
                }
            })
        },
        removeCart: (state, action) => {
            let { id } = action.payload;
            let sepetinOnSonHali = state.carts.filter(item => item.productId !== parseInt(id))
            state.carts = sepetinOnSonHali
        },
        //sepeti comple silmek için
        clearCart: (state) => {
            state.carts = []
        },
        addToFavorites: (state, action) => {

            let { id } = action.payload;
            let item = state.favorites.find(item => item.productId === parseInt(id))
            if (item === undefined) {
                let urunFavori = state.products.find(item => item.productId === parseInt(id))
                urunFavori.quantity = 1
                state.favorites.push(urunFavori)
                Swal.fire(
                    {
                        title: 'Başarılı',
                        text: 'İlgili ürün favorilere eklenmiştir',
                        icon: 'success'
                    }

                )

            }
            else {
                Swal.fire('Başarsız', 'İlgili ürün favorilere eklenemedi', 'warning')
            }
        },
        removeToFav: (state, action) => {
            let { id } = action.payload;
            let favorilerinOnSonHali = state.favorites.filter(item => item.productId !== parseInt(id))
            state.favorites = favorilerinOnSonHali
        },
        //favorileri temizle
        clearFav: (state) => {
            state.favorites = [] // state içindeki favori arrayını temizlemiş oluyor 
        },

    },
    extraReducers: (builder) => {

        builder.addCase(fetchProducts.fulfilled, (state, action) => {
            console.log("Products Fetch Bitti")
            state.isLoading = false
            state.isError = false
            state.products = action.payload.data.result;
            console.log(action.payload.data.result)
        })
        builder.addCase(fetchProducts.rejected, (state, action) => {
            console.log("Products Fetch Hata")
            state.isError = true
            state.isLoading = false
        })
        builder.addCase(fetchProducts.pending, (state, action) => {
            console.log("Products Fetch Devam")
            state.isLoading = true
        })

        builder.addCase(fetchProduct.fulfilled, (state, action) => {
            console.log("Product Fetch Bitti")
            state.isLoading = false
            state.isError = false
            if (!action.payload.data.result) {
                state.isError = true
                console.log("Ürün Bulunamadı")
                return
            }
            state.single = action.payload.data.result;
            console.log(state.single);
        })
        builder.addCase(fetchProduct.rejected, (state, action) => {
            console.log("Product Fetch Hata")
            state.isError = true
            state.isLoading = false
        })
        builder.addCase(fetchProduct.pending, (state, action) => {
            console.log("Product Fetch Devam")
            state.isLoading = true
            state.isError = false
        })

        builder.addCase(addToCart.fulfilled, (state, action) => {
            console.log("Add To Cart Bitti")
            let isSuccess = action.payload.data.isSuccess;
            if (isSuccess) {
                state.lastAddedCartDetail = action.payload.data.result.cartDetails[0];
                Swal.fire(
                    {
                        title: 'Başarılı',
                        text: "Ürün sepete eklendi!",
                        icon: 'success',
                        showConfirmButton: false,
                        timer: 2000
                    }
                )
                return;
            }
            Swal.fire(
                {
                    title: 'Başarısız',
                    text: "Ürün sepete eklenemedi!",
                    icon: 'warning',
                    showConfirmButton: false,
                    timer: 2000
                }
            )
            console.log("Hata: ", action.payload)
        })
        builder.addCase(addToCart.rejected, (state, action) => {
            console.log("Add To Cart Hata")
        })
        builder.addCase(addToCart.pending, (state, action) => {
            console.log("Add To Cart Devam")
        })

        builder.addCase(updateCartDetails.fulfilled, (state, action) => {
            console.log("Update Cart Details Bitti");
            let isSuccess = action.payload.data.isSuccess;
            if (isSuccess) {
                console.log("Cart Deleted: ", action.payload);
                state.cartDetails = action.payload.carts;
                Swal.fire(
                    {
                        title: 'Başarılı',
                        text: "Sepetiniz başarıyla güncellendi!",
                        icon: 'success',
                        showConfirmButton: false,
                        timer: 2000
                    }
                )
                return;
            }
            Swal.fire(
                {
                    title: 'Başarısız',
                    text: "Sepetiniz güncellenemedi!",
                    icon: 'warning',
                    showConfirmButton: false,
                    timer: 2000
                }
            )
            console.log("Hata: ", action.payload)
        })
        builder.addCase(updateCartDetails.rejected, (state, action) => {
            console.log("Update Cart Details Hata")
        })
        builder.addCase(updateCartDetails.pending, (state, action) => {
            console.log("Update Cart Details Devam")
        })

        builder.addCase(getUserCart.fulfilled, (state, action) => {
            console.log("Get User Cart Bitti");
            let isSuccess = action.payload.data.isSuccess;
            if (isSuccess) {
                let cartDetails = action.payload.data.result.cartDetails;
                let totalDiscount = action.payload.discountAmount;
                state.cartDetails = cartDetails;
                if (totalDiscount) {
                    state.totalDiscount = totalDiscount;
                    console.log("Discount Amount: ", totalDiscount)
                }
                state.couponCode = state.cartDetails[0].cartHeader.couponCode;
                console.log("Cart Details: ", cartDetails);
                return;
            }
            console.log(action.payload)
        })
        builder.addCase(getUserCart.rejected, (state, action) => {
            state.cartDetails = [];
            state.couponCode = '';
            state.totalDiscount = 0;
            console.log("Get User Cart Hata")
        })
        builder.addCase(getUserCart.pending, (state, action) => {
            console.log("Get User Cart Devam")
        })

        builder.addCase(removeFromCart.fulfilled, (state, action) => {
            console.log("Remove From Cart Bitti");
            let isSuccess = action.payload.data.isSuccess;
            if (isSuccess) {
                //sepete eklemek istediğim ürün bilgilerine getirecek ilgili rest servisi çağırılır
                state.lastDeletedCartDetail = { result: isSuccess };
                console.log("Deleted: ", action.payload);
                Swal.fire(
                    {
                        title: 'Başarılı',
                        text: "Ürün sepetten silindi!",
                        icon: 'success',
                        showConfirmButton: false,
                        timer: 2000
                    }
                )
                return;
            }
            Swal.fire(
                {
                    title: 'Başarısız',
                    text: "Ürün sepetten silinemedi!",
                    icon: 'warning',
                    showConfirmButton: false,
                    timer: 2000
                }
            )
            console.log("Hata: ", action.payload)
        })
        builder.addCase(removeFromCart.rejected, (state, action) => {
            console.log("Remove From Cart Hata")
        })
        builder.addCase(removeFromCart.pending, (state, action) => {
            console.log("Remove From Cart Devam")
        })

        builder.addCase(clearCart.fulfilled, (state, action) => {
            console.log("Clear Cart Bitti");
            let isSuccess = action.payload.data.isSuccess;
            if (isSuccess) {
                //sepete eklemek istediğim ürün bilgilerine getirecek ilgili rest servisi çağırılır
                state.cartDetails = [];
                state.couponCode = '';
                state.totalDiscount = 0;

                console.log("Cart Deleted: ", action.payload);
                Swal.fire(
                    {
                        title: 'Başarılı',
                        text: "Sepetiniz silindi!",
                        icon: 'success',
                        showConfirmButton: false,
                        timer: 2000
                    }
                )
                return;
            }
            Swal.fire(
                {
                    title: 'Başarısız',
                    text: "Sepetiniz silinemedi!",
                    icon: 'warning',
                    showConfirmButton: false,
                    timer: 2000
                }
            )
            console.log("Hata: ", action.payload)
        })
        builder.addCase(clearCart.rejected, (state, action) => {
            console.log("Clear Cart Hata")
        })
        builder.addCase(clearCart.pending, (state, action) => {
            console.log("Clear Cart Devam")
        })

        builder.addCase(applyCoupon.fulfilled, (state, action) => {
            console.log("Apply Coupon Bitti");
            const isSuccess = action.payload.data.isSuccess;
            if (isSuccess) {
                Swal.fire(
                    {
                        title: 'Başarılı',
                        text: "Kupon kodu eklendi!",
                        icon: 'success',
                        showConfirmButton: false,
                        timer: 2000
                    }
                )
                const couponCode = action.payload.data.result;
                state.couponCode = couponCode;
                return;
            }
            Swal.fire(
                {
                    title: 'Başarısız',
                    text: "Kupon kodu geçersiz!",
                    icon: 'warning',
                    showConfirmButton: false,
                    timer: 2000
                }
            )
            console.log(action.payload)
        })
        builder.addCase(applyCoupon.rejected, (state, action) => {
            console.log("Apply Coupon Hata")
        })
        builder.addCase(applyCoupon.pending, (state, action) => {
            console.log("Apply Coupon Devam")
        })

        builder.addCase(removeCoupon.fulfilled, (state, action) => {
            console.log("Remove Coupon Bitti");
            const isSuccess = action.payload.data.isSuccess;
            if (isSuccess) {
                state.couponCode = '';
                state.totalDiscount = 0;
            }
            console.log(action.payload)
        })
        builder.addCase(removeCoupon.rejected, (state, action) => {
            console.log("Remove Coupon Hata")
        })
        builder.addCase(removeCoupon.pending, (state, action) => {
            console.log("Remove Coupon Devam")
        })

        builder.addCase(addToFavorites.fulfilled, (state, action) => {
            console.log("Add To Favorites Bitti");
            const isSuccess = action.payload.data.isSuccess
            console.log("Hata Mesajı:  ", action.payload.data.displayMessage)
            if (isSuccess) {
                Swal.fire(
                    {
                        title: 'Başarılı',
                        text: "Ürün başarıyla favorilere eklendi!",
                        icon: 'success',
                        showConfirmButton: false,
                        timer: 2000
                    }
                )
                state.favorites = action.payload.favorites
                return;
            }
            if (action.payload.data.displayMessage === "Product already exists in favorites") {
                Swal.fire(
                    {
                        title: 'Başarısız',
                        text: "Ürün zaten favorilerde bulunuyor!",
                        icon: 'warning',
                        showConfirmButton: false,
                        timer: 2000
                    }
                )
                return;
            }
            Swal.fire(
                {
                    title: 'Başarısız',
                    text: "Ürün favorilere eklenemedi!",
                    icon: 'warning',
                    showConfirmButton: false,
                    timer: 2000
                }
            )
            console.log(action.payload)
        })
        builder.addCase(addToFavorites.rejected, (state, action) => {
            console.log("Add To Favorites Hata")
        })
        builder.addCase(addToFavorites.pending, (state, action) => {
            console.log("Add To Favorites Devam")
        })

        builder.addCase(getFavorites.fulfilled, (state, action) => {
            console.log("Get Favorites Bitti");
            const isSuccess = action.payload.data.isSuccess
            if (isSuccess) {
                state.favorites = action.payload.data.result
            }
            console.log(action.payload)
        })
        builder.addCase(getFavorites.rejected, (state, action) => {
            console.log("Get Favorites Hata")
        })
        builder.addCase(getFavorites.pending, (state, action) => {
            console.log("Get Favorites Devam")
        })

        builder.addCase(clearFavorites.fulfilled, (state, action) => {
            console.log("Clear Favorites Bitti");
            const isSuccess = action.payload.data.isSuccess
            if (isSuccess) {
                state.favorites = [];
                Swal.fire(
                    {
                        title: 'Başarılı',
                        text: "Favoriler başarıyla silindi!",
                        icon: 'success',
                        showConfirmButton: false,
                        timer: 2000
                    }
                )
                return
            }
            Swal.fire(
                {
                    title: 'Başarısız',
                    text: "Favoriler silinemedi!",
                    icon: 'warning',
                    showConfirmButton: false,
                    timer: 2000
                }
            )
            console.log(action.payload)
        })
        builder.addCase(clearFavorites.rejected, (state, action) => {
            console.log("Clear Favorites Hata")
        })
        builder.addCase(clearFavorites.pending, (state, action) => {
            console.log("Clear Favorites Devam")
        })

        builder.addCase(removeFromFavorites.fulfilled, (state, action) => {
            console.log("Remove From Favorites Bitti");
            const isSuccess = action.payload.data.isSuccess
            if (isSuccess) {
                Swal.fire(
                    {
                        title: 'Başarılı',
                        text: "Ürün başarıyla favorilerden silindi!",
                        icon: 'success',
                        showConfirmButton: false,
                        timer: 2000
                    }
                )
                state.favorites = action.payload.favorites;
                return;
            }
            Swal.fire(
                {
                    title: 'Başarısız',
                    text: "Ürün favorilerden silinemedi!",
                    icon: 'warning',
                    showConfirmButton: false,
                    timer: 2000
                }
            )
            console.log(action.payload)
        })
        builder.addCase(removeFromFavorites.rejected, (state, action) => {
            console.log("Remove From Favorites Hata")
        })
        builder.addCase(removeFromFavorites.pending, (state, action) => {
            console.log("Remove From Favorites Devam")
        })

        builder.addCase(checkout.fulfilled, (state, action) => {
            console.log("Checkout Bitti")
            const isSuccess = action.payload.data.isSuccess
            if (isSuccess) {
                const orders = action.payload.orders;
                state.isCheckoutLoading = false
                state.cartDetails = [];
                state.couponCode = '';
                state.totalDiscount = 0;
                state.orders = orders;
                console.log("Checkout Complete Orders: ", orders)
                return;
            }
            Swal.fire(
                {
                    title: 'Başarısız',
                    text: "Ödeme işlemi gerçekleştirilemedi!",
                    icon: 'warning',
                    showConfirmButton: false,
                    timer: 2000
                }
            )
            console.log(action.payload)
        })
        builder.addCase(checkout.rejected, (state, action) => {
            state.isCheckoutLoading = true
            Swal.fire(
                {
                    title: 'Başarısız',
                    text: "Ödeme işlemi gerçekleştirilemedi!",
                    icon: 'warning',
                    showConfirmButton: false,
                    timer: 2000
                }
            )
            console.log("Checkout Hata")
        })
        builder.addCase(checkout.pending, (state, action) => {
            state.isCheckoutLoading = true
            console.log("Checkout Devam")
        })

        builder.addCase(getOrders.fulfilled, (state, action) => {
            console.log("Get Orders Bitti")
            const isSuccess = action.payload.data.isSuccess
            if (isSuccess) {
                state.orders = action.payload.data.result;
                console.log("Orders: ", state.orders)
                return;
            }
            console.log(action.payload)
        })
        builder.addCase(getOrders.rejected, (state, action) => {
            console.log("Get Orders Hata")
        })
        builder.addCase(getOrders.pending, (state, action) => {
            console.log("Get Orders Devam")
        })
    }
})

const productsReducer = productsSlice.reducer
export default productsReducer

// {
//     "data": {
//         "isSuccess": true,
//         "result": {
//             "cartDetails": [
//                 {
//                     "cartDetailsId": 3,
//                     "cartHeaderId": 3,
//                     "cartHeader": {
//                         "cartHeaderId": 3,
//                         "userId": "fd428062-ae43-4e93-95f0-dd3ad8683729",
//                         "couponCode": ""
//                     },
//                     "productId": 1,
//                     "product": {
//                         "productId": 1,
//                         "title": "Green Dress For Woman",
//                         "price": 38,
//                         "description": "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. \r\nThe point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters.",
//                         "category": "Fashion",
//                         "img": "img1"
//                     },
//                     "count": 1
//                 }
//             ]
//         },
//         "displayMessage": "",
//         "errorMessages": null
//     }
// }