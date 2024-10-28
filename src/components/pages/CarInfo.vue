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
                <h1><b>Машина:</b> {{ carInfo.car }}</h1>
                <h1><b>Свет:</b> {{ carInfo.color }}</h1>
                <h1><b>Номер машине:</b> {{ carInfo.carNumber }}</h1>
                <h1><b>Год выпуска:</b> {{ carInfo.year }}</h1>
                <h1><b>Km:</b> {{ format(carInfo.km) }}</h1>
                <h1><b>Тип каробка передачи:</b> {{ getCarType(carInfo.type) }}</h1>

                <h1><b>Стоимость автомобиля:</b> {{ format(carInfo.payment) }}$</h1>
                <h1><b>Выдано в аренде:</b> {{ carInfo.date }}</h1>
                <h1><b>Выдано в аренде количество месяцев:</b> {{ carInfo.month }} месяцев</h1>
                <h1><b>Первоначальный взнос:</b> {{ format(carInfo.initialPayment) }}$</h1>
                <h1><b>Получатель автомобиля:</b> {{ carInfo.name }}</h1>
                <h1><b>Сколько месяцев осталось до полного оформление машин:</b> {{ carInfo.monthLeft }} месяцев</h1>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { SalesInfo } from '@/mixins';
import { Vue, Component } from 'vue-property-decorator';
import LoaderComponent from '@/components/LoaderComponent.vue';

@Component({
	components: {
        LoaderComponent
	}
})

export default class CarInfo extends Vue {
    carInfo: SalesInfo = JSON.parse(sessionStorage.getItem("carInfo")) || {};
    pageLoading: boolean = false;
    
    created() {
		this.pageLoading = true;

        setTimeout(() => {
            this.pageLoading = false;
        }, 1000);
	}

    submitProduct(): void {
        this.$router.push('/home');
    }

    format(v: number): string {
        let value = Number(v).toLocaleString('ru').replace(',', '.');

        let [ mainValue, subValue ] = value.split('.');

        subValue = subValue || '';

        return mainValue + subValue;
    }

    getCarType(type : string): string {
        switch(type) {
            case 'MECHANICS':
                return 'Механическая';
            case 'AUTO':
                return 'Автоматическая';
        }
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
    justify-content: center
    width: 100%
    margin-bottom: 32px

    div
        display: flex
        justify-content: center
        align-items: center
        width: 500px
        height: 250px
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

@media (max-width: 600px)
    .car-info__content
        h1
            font-size: 14px

</style>