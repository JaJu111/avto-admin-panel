<template>
    <div>
        <LoaderComponent 
            :loading="pageLoading"
        />

        <div v-if="!pageLoading">
            <div class="car-info-box">
                <div class="icon-box" @click="submitProduct">
                    <i class="fa-solid fa-arrow-left"></i>
                </div>

                <span class="car-title">Информация о машине</span>
            </div>
            
            <div class="car-info-img-box">
                <div>
                    <img v-if="carInfo.carImg" :src="carInfo.carImg">

                    <i v-else class="fa-regular fa-image"></i>
                </div>
            </div>

            <div class="car-info__content">
                <h1><b>Автомобил:</b> {{ carInfo.car }}</h1>
                <h1><b>Год выпуска:</b> {{ carInfo.year }}</h1>
                <h1><b>Км:</b> {{ format(carInfo.km) }} km</h1>
                <h1><b>Свет:</b> {{ carInfo.color }}</h1>
                <h1><b>Номер машине:</b> {{ carInfo.carNumber }}</h1>
                <h1><b>Тип каробка передачи:</b> {{ getCarType(carInfo.type) }}</h1>
                <h1><b>Стоимость автомобиля:</b> {{ format(carInfo.payment) }}$</h1>

                <div class="line-box"></div>

                <h1><b>Дата оформление аренду:</b> {{ carInfo.date }} год</h1>
                <h1><b>Выдано в аренде количество месяцев:</b> {{ carInfo.month }} месяцев</h1>
                <h1><b>Первоначальный взнос:</b> {{ format(carInfo.initialPayment) }}$</h1>
                <h1><b>Процент годовой:</b> {{ carInfo.percentagePerAnnum }}%</h1>
                <h1><b>Оплата за месяц:</b> {{ pricePerMonth(carInfo) }}$</h1>
                <h1><b>Сколько месяцев осталось до полного оформление машин:</b> {{ carInfo.monthLeft }} месяцев</h1>
                <h1><b>Получатель автомобиля:</b> {{ carInfo.name }}</h1>
                <h1><b>Прибыль из текущего автомобиля исходя в процентах:</b> {{ profitFromCurrentCar(carInfo) }}$</h1>
            </div>

            <div class="btn-box mt-4">
                <button @click="editCar" class="btn btn-primary mr-3">Редактировать</button>
                <button @click="openDialog = true" class="btn btn-danger">Удалить</button>
            </div>

            <DialogComponent
                v-if="openDialog"
                :open="openDialog"
                :item="carInfo"
                @close="openDialog = false"
                @delete="deleteCar"
            />
        </div>
    </div>
</template>

<script lang="ts">
import { SalesInfo } from '@/mixins';
import { Component, Mixins } from 'vue-property-decorator';
import LoaderComponent from '@/components/LoaderComponent.vue';
import { mapActions } from 'vuex';
import { Action } from 'vuex-class';
import ProfitFromCar from '@/mixins/profit-from-car';
import DialogComponent from '../DialogComponent.vue';

@Component({
	components: {
        LoaderComponent,
        DialogComponent
	},
    methods: {
    ...mapActions('car', ['delete'])
    }
})

export default class CarInfo extends Mixins(
    ProfitFromCar
) {
    @Action('delete', { namespace: 'car' }) delete!: (id: number) => void;
    carInfo: SalesInfo = JSON.parse(sessionStorage.getItem("carInfo")) || {};
    pageLoading: boolean = false;
    openDialog: boolean = false;
    
    created() {
		this.pageLoading = true;

        setTimeout(() => {
            this.pageLoading = false;
        }, 1000);
	}

    submitProduct(): void {
        this.$router.push('/home');
    }

    getCarType(type : string): string {
        switch(type) {
            case 'MECHANICS':
                return 'Механическая';
            case 'AUTO':
                return 'Автоматическая';
        }
    }

    pricePerMonth(item: SalesInfo): string {
        let sum = item.payment - item.initialPayment;

        let yearPersent = sum * item.percentagePerAnnum / 100;

        let result = yearPersent / 12 * item.month;

        let allSum = sum + result;

        let month = allSum / item.month;

        return this.format(Math.round(month));
    }

    editCar(): void {
        this.$router.push({
            name: 'products', 
            path: '/products',
            params: {
                edite: 'edite'
            }
        });
    }

    deleteCar(): void {
        this.delete(this.carInfo.id);

        this.$router.push({ 
            name: 'home', 
            path: '/home',
            params: {
                delete: this.carInfo.id.toString()
            }
        });
    }
}

</script>

<style lang="sass" scoped>

@import ../../style/pages/car-info-page

</style>