<template>
    <div>
        <div class="products-info">
            <div class="icon-box" @click="submitProduct">
                <i class="fa-solid fa-arrow-left"></i>
            </div>

            <span @click="submitProduct" class="text-4xl font-medium">{{ $t('products.title') }}</span>

            <div class="divide-box"></div>

            <h2 class="text-4xl font-medium info">{{ 'Редактировать' }}</h2>
        </div>

        <div class="products-info-box">
            <form @submit.prevent="submitProduct">
                <h1 class="products-title">Название товара</h1>

                <input v-model="productsInfo.title" type="text" class="form-control">

                <h1 class="products-text">Описание</h1>

                <div class="description">
                    <textarea class="form-control"></textarea>
                </div>

                <h1 v-if="!hideProductImg" class="products-text">Фото</h1>

                <div v-if="!hideProductImg" class="products-edit-img">
                    <div class="img-box">
                        <div class="img">
                            <img :src="productsInfo.img">
                        </div>

                        <span>{{ productsInfo.title }}</span>
                    </div>

                    <i @click="deleteProductImg" class="fa-solid fa-trash"></i>
                </div>

                <div class="other-blocks">
                    <h1>Цена ($)</h1>
                    <input v-model="productsInfo.amount / 100" type="text" class="form-control">


                    <h1>Количество</h1>
                    <input v-model="productsInfo.quantity" type="text" class="form-control">
                </div>

                <div class="select-box">
                    <select class="form-control">
                        <option>{{ productsInfo.status === 'ACTIVE' ?  'Активный' : 'Не активный'}}</option>
                        <option>{{ productsInfo.status === 'NOT_ACTIVE' ?  'Активный' : 'Не активный'}}</option>
                    </select>
                </div>

                <button class="btn btn-danger" type="submit">Сохранить товар</button>
            </form>
        </div>
    </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component
export default class ProductsInfoPage extends Vue {
    productsInfo: any = JSON.parse(sessionStorage.getItem('productsInfo')) || {};
    hideProductImg: boolean = false;

    submitProduct(): void {
        this.$router.push({
            name: 'products',
            params: {
                path: '/products'
            }
        })
    }

    deleteProductImg(): void {
        this.hideProductImg = true;
    }
}

</script>

<style lang="sass" scoped>

@import ../../style/pages/products-info

</style>