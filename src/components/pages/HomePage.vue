<template>
    <div>
        <LoaderComponent 
            :loading="pageLoading"
        />

        <div v-if="!pageLoading">
            <h1 class="text-3xl font-medium text-black mb-8">Главная</h1>

            <ChartComponent
                :salesArr="salesArr"
            />

            <div class="search-content flex justify-between mt-10 mb-7 items-end">
                <div class="filter-content">
                    <h3 class="text-2xl font-medium text-black mb-3">Поиск по название и номер автомобиля</h3>

                    <div class="filter-box">
                        <button name="Все" :class="['btn', {'btn-danger': btnSelected === 'Все'}]" @click="getSelectFilter($event)">Все {{ salesArr.length }}</button>
                        <button name="В аренде" :class="['btn', {'btn-danger': btnSelected === 'В аренде'}]" @click="getSelectFilter($event)">В аренде {{ salesArr.filter(i => i.monthLeft).length }}</button>
                        <button name="Проданный" :class="['btn', {'btn-danger': btnSelected === 'Проданный'}]" @click="getSelectFilter($event)">Проданный {{ salesArr.filter(i => !i.monthLeft).length }}</button>
                    </div>
                </div>

                <div class="search-box">
                    <input v-model.trim="searchBySales" type="text" placeholder="Поиск" class="form-control">

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
                        <div v-if="!item.monthLeft" class="to-send">
                            <p>Продано</p>
                        </div>

                        <img v-if="item.carImg" :src="item.carImg">

                        <i v-else class="fa-regular fa-image"></i>
                    </div>

                    <div class="card-bottom">
                        <div class="car-info">
                            <div>
                                <h1>{{ item.car }}</h1>

                                <h2><b>{{ profitFromCurrentCar(item) }}$</b>Прибыль</h2>
                                <h2><h1>{{ item.monthLeft }}</h1> {{ 'Месяц осталось' }}</h2>
                            </div>

                            <span>{{ format(item.payment) }}$</span>
                        </div>

                        <button class="btn btn-danger mt-3 w-full" @click="getCarInfo(item)">Посмотреть</button>
                    </div>
                </div>
            </div>

            <div v-else>
                <h1>Не найдено автомобил по вашему запросу</h1>
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
import ProfitFromCar from '@/mixins/profit-from-car';

@Component({
	components: {
		ChartComponent,
        LoaderComponent
	}
})

export default class HomePage extends Mixins(
    SalesPageMixin,
    ProfitFromCar
) {
    getCarInfo(item: SalesInfo): void {
        sessionStorage.setItem('carInfo', JSON.stringify(item));
            
        this.$router.push('/home/car-info');
    }
}

</script>

<style lang="sass" scoped>

@import ../../style/pages/home

</style>