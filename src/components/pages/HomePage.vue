<template>
    <div>
        <LoaderComponent 
            :loading="pageLoading"
        />

        <div v-if="!pageLoading">
            <h1 class="text-4xl font-medium text-black mb-8">Главная</h1>

            <ChartComponent
                :salesArr="salesArr"
            />

            <div class="search-content flex justify-between mt-10 mb-7 items-end">
                <div class="filter-content">
                    <h3 class="text-2xl font-medium text-black mb-3">Поиск по машинам</h3>

                    <div class="filter-box">
                        <button :class="['btn mr-2', {'btn-danger': btnSelected === 'Все'}]" @click="getSelectFilter($event)">Все {{ salesArr.length }}</button>
                        <button :class="['btn mr-2', {'btn-danger': btnSelected === 'В аренде'}]" @click="getSelectFilter($event)">В аренде {{ salesArr.filter(i => i.monthLeft).length }}</button>
                        <button :class="['btn mr-2', {'btn-danger': btnSelected === 'Проданный'}]" @click="getSelectFilter($event)">Проданный {{ salesArr.filter(i => !i.monthLeft).length }}</button>
                    </div>
                </div>

                <div class="search-box">
                    <input v-model.trim="searchBySales" type="text" placeholder="Поиск">

                    <i class="fa-solid fa-magnifying-glass left-icon"></i>
                    <i v-if="searchBySales.length" class="fa-solid fa-xmark right-icon" @click="searchBySales = ''"></i>
                </div>
            </div>

            <div v-if="filterSalesArr.length" class="car-box">
                <div
                    v-for="item in filterSalesArr" 
                    class="car-card"
                >
                    <div class="car-img">
                        <img v-if="item.carImg" :src="item.carImg">

                        <i v-else class="fa-regular fa-image"></i>
                    </div>

                    <div class="mt-3">
                        <div class="car-info">
                            <div>
                                <h1>{{ item.car }}</h1>

                                <h2 v-if="item.monthLeft !== 0"><h1>{{ item.monthLeft }}</h1> {{ 'Месяц осталось' }}</h2>
                                <h2 v-else>Распродано!</h2>
                            </div>

                            <span>{{ item.monthLeft !== 0 ? format(item.payment) : format(item.monthLeft) }}</span>
                        </div>

                        <button class="btn btn-danger mt-3 w-full" @click="getCarInfo(item)">Посмотреть</button>
                    </div>
                </div>
            </div>

            <div v-else>
                <h1>Не найдено машин по вашему запросу</h1>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import SalesPageMixin from '@/mixins/sales-page/sales-mixin';
import { Mixins, Component } from "vue-property-decorator";
import ChartComponent from '@/components/ChartComponent.vue';
import LoaderComponent from '@/components/LoaderComponent.vue';
import { SalesInfo } from '@/mixins';

@Component({
	components: {
		ChartComponent,
        LoaderComponent
	}
})

export default class HomePage extends Mixins(
    SalesPageMixin
) {
    format(v: number): string {
        let value = Number(v).toLocaleString('ru').replace(',', '.');

        let [ mainValue, subValue ] = value.split('.');

        subValue = subValue || '';

        return mainValue + subValue + ' $';
    }

    getCarInfo(item: SalesInfo): void {
        sessionStorage.setItem('carInfo', JSON.stringify(item));
            
        this.$router.push('/home/car-info');
    }
}

</script>

<style lang="sass" scoped>

@import ../../style/pages/home

.car-box
    display: grid
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr))
    grid-gap: 24px

.car-card
    display: flex
    flex-direction: column
    justify-content: space-between
    padding: 16px 26px 24px
    background: #fff
    box-shadow: 0 5px 12px rgba(0, 0, 0, 0.4)
    border-radius: 4px
    position: relative
    user-select: none

.car-info
    display: flex
    justify-content: space-between

    h1
        font-size: 16px
        font-weight: bold

    h2
        font-size: 14px
        display: flex
        align-items: baseline
        gap: 8px
        margin-top: 2px

    span
        font-size: 15px
        font-weight: 500

.car-img
    width: 100%
    height: 100px
    display: flex
    justify-content: center
    align-items: center

    img
        width: 150px

    i
        font-size: 28px
        color: #90a0b7

.filter-box
    button
        font-weight: 500
        font-size: 16px
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3)

</style>