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

                <h1><b>Дата оформление аренду:</b> {{ carInfo.date }}</h1>
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

            <div v-if="openDialog" class="dialog-overlay">
                <div class="dialog-box">
                    <div class="dialog-box__top">
                        <h1>Удалить автомобиля</h1>

                        <span>Вы точно хотите Удалить <b>"{{ carInfo.car }}"</b></span>
                    </div>

                    <div class="dialog-box__bottom">
                        <button @click="openDialog = false" class="btn cancel">Отмена</button>
                        <button @click="deleteCar" class="btn btn-danger">Удалить</button>
                    </div>
                </div>
            </div>
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

@Component({
	components: {
        LoaderComponent
	},
    methods: {
    ...mapActions('car', ['delete'])
    }
})

export default class CarInfo extends Mixins(
    ProfitFromCar
) {
    @Action('delete', { namespace: 'car' }) delete!: (user) => void;
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

.car-info-box
    display: flex
    align-items: center
    margin-bottom: 40px

.icon-box
    width: 30px
    height: 30px
    display: flex
    align-items: center
    justify-content: center
    background: #f33636
    border-radius: 50%
    margin-right: 12px
    cursor: pointer

    i
        color: #fff

.car-title
    font-size: 20px
    font-weight: 500

.car-info-img-box
    display: flex
    width: 100%
    margin-bottom: 32px

    div
        display: flex
        justify-content: center
        align-items: center
        width: 600px
        min-height: 230px
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1)
        overflow: hidden

        i
            font-size: 30px
            color: #90a0b7

    img
        width: 100%

.car-info__content
    border-radius: 4px
    padding: 16px 20px
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1)

    h1
        margin-bottom: 12px
        font-size: 18px

.line-box
    width: 100%
    height: 1px
    background-color: #e5e5e5
    margin: 24px 0

.dialog-overlay
    position: fixed
    top: 0
    left: 0
    width: 100vw
    height: 100vh
    background-color: rgba(0, 0, 0, 0.5)
    backdrop-filter: blur(8px)
    display: flex
    justify-content: center
    align-items: center
    padding: 0 24px

.dialog-box
    position: relative
    display: flex
    flex-direction: column
    justify-content: space-between
    width: 350px
    height: 160px
    padding: 16px 20px
    border-radius: 6px
    background-color: #fff
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.13)

.dialog-box__top
    h1
        font-size: 20px
        font-weight: 500
        margin-bottom: 6px

    span
        font-size: 13px

.dialog-box__bottom
    display: flex
    gap: 12px
    justify-content: flex-end

    button.cancel
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.16)


@media (max-width: 600px)
    .car-info__content
        h1
            font-size: 14px

@media (max-width: 430px)
    .dialog-box
        width: 100%

</style>