import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ProductData } from "../data/ProductData";
import Swal from "sweetalert2";
import axios from "axios";

export const fetchProducts = createAsyncThunk("fetchProducts", async () => {
    console.log("fetch_products")
    const res = await axios.get("https://localhost:5050/api/products");
    return res;
});

const productsSlice = createSlice({
    name: 'products',
    initialState: {
        products: ProductData,
        carts: ProductData.slice(2, 4),
        favorites: ProductData.slice(1, 4),
        single: null,  // her bir ürün temsil edelr
        isLoading: true,
        isError: false
    },
    reducers: {
        //sepete ürün eklemek için kullanılacak
        AddToCart: (state, action) => {
            let { id } = action.payload;
            let sepeteEklenecekUrun = state.carts.find(item => item.id === parseInt(id))
            if (sepeteEklenecekUrun === undefined) {
                //sepete eklemek istediğim ürün bilgilerine getirecek ilgili rest servisi çağırılır
                let item = state.products.find(item => item.id === parseInt(id))
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
            let urunDetay = state.products.find(item => item.id === parseInt(id))
            state.single = urunDetay
        },
        updateCart: (state, action) => {
            let { val, id } = action.payload;
            state.carts.forEach(item => {
                if (item.id === parseInt(id)) {
                    item.quantity = val
                }
            })
        },
        removeCart: (state, action) => {
            let { id } = action.payload;
            let sepetinOnSonHali = state.carts.filter(item => item.id !== parseInt(id))
            state.carts = sepetinOnSonHali
        },
        //sepeti comple silmek için
        clearCart: (state) => {
            state.carts = []
        },
        addToFavorites: (state, action) => {

            let { id } = action.payload;
            let item = state.favorites.find(item => item.id === parseInt(id))
            if (item === undefined) {
                let urunFavori = state.products.find(item => item.id === parseInt(id))
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
            let favorilerinOnSonHali = state.favorites.filter(item => item.id !== parseInt(id))
            state.favorites = favorilerinOnSonHali
        },
        //favorileri temizle
        clearFav: (state) => {
            state.favorites = [] // state içindeki favori arrayını temizlemiş oluyor 
        },

    },
    extraReducers: (builder) => {
        builder.addCase(fetchProducts.fulfilled, (state, action) => {
            console.log("Product Fetch Bitti")
            state.isLoading = false
            state.isError = false
            state.products = action.payload.data.result;
            console.log(action.payload.data.result)
        })
        builder.addCase(fetchProducts.rejected, (state, action) => {
            console.log("Product Fetch Hata")
            state.isError = true
            state.isLoading = false
            console.log(action.payload)
        })
        builder.addCase(fetchProducts.pending, (state, action) => {
            console.log("Product Fetch Devam")
            state.isLoading = true
            console.log(action.payload)
        })
    }
})

const productsReducer = productsSlice.reducer
export default productsReducer

