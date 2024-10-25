<template>
    <div>
        <LoaderComponent 
            :loading="pageLoading"
        />

        <div v-if="!pageLoading">
            <h1 class="text-4xl font-medium text-black mb-10">Добавить машину</h1>

            <div class="table-box">
                <table 
                    v-if="productsArr.length"
                    class="table table-hover products-table rounded bg-[#fff]"
                >
                    <thead>
                        <tr>
                            <th>Фото</th>
                            <th>Название</th>
                            <th>Категория</th>
                            <th>Количество</th>
                            <th>Цена</th>
                            <th>Статус</th>
                        </tr>
                    </thead>
                    
                    <tbody>
                        <tr 
                            v-for="item in productsArr" 
                            :key="item.id"
                            @click="getProductsInfo(item)"
                        >
                            <td>
                                <img class="products-img" :src="item.img">
                            </td>
                            <td>{{ item.title }}</td>
                            <td>{{ item.category }}</td>
                            <td>{{ item.quantity }}</td>
                            <td>{{ format(item.amount / 100) }}</td>
                            <td>{{ getStatus(item.status) }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Mixins } from "vue-property-decorator";
import ProductsMixin from '@/mixins/products';
import LoaderComponent from '@/components/LoaderComponent.vue';

@Component({
	components: {
		LoaderComponent
	}
})
export default class ProductsPage extends Mixins(
    ProductsMixin
) {
    getStatus(status: string): string {
        switch(status) {
            case 'ACTIVE':
                return 'Активный';
            case 'NOT_ACTIVE':
                return 'Не активный';
        }
    }

    format(v: number): string {
        let value = Number(v).toLocaleString('ru').replace(',', '.');

        let [ mainValue, subValue ] = value.split('.');

        subValue = subValue || '';

        return `$${mainValue + subValue}`;
    }

    getProductsInfo(item: ProductsMixin): void {
        sessionStorage.setItem('productsInfo', JSON.stringify(item));
            
        this.$router.push({
            name: 'products-info',
            params: {
                path: '/products/info'
            }
        })
    }
}

</script>

<style lang="sass" scoped>
    
@import ../../style/pages/products

</style>