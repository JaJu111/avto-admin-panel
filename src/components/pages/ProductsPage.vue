<template>
    <div>
        <LoaderComponent 
            :loading="pageLoading"
        />

        <div v-if="!pageLoading">
            <h1 v-if="!$route.params.edite" class="text-2xl font-medium text-black mb-7">Добавить автомобиля</h1>
            <h1 v-else class="text-2xl font-medium text-black mb-8">Редактировать автомобиля</h1>

            <div class="add-car">
                <form class="form-box" @submit.prevent="addNewCar">

                    <div class="form-old-box mb-4">
                        <div class="form-left__box">
                            <div class="form-content mb-2">
                                <label class="mb-1">Название автомобиля</label>
                                <input v-model.trim="carName" type="text" class="form-control">
                            </div>

                            <div class="form-content mb-2">
                                <label class="mb-1">Год выпуска</label>
                                <input v-model.trim="carYear" type="text" class="form-control">
                            </div>

                            <div class="form-content mb-2">
                                <label class="mb-1">Km</label>
                                <input v-model.trim="carKm" type="number" class="form-control">
                            </div>

                            <div class="form-content mb-2">
                                <label class="mb-1">Номер автомобиля</label>
                                <input v-model.trim="carNumber" type="text" class="form-control">
                            </div>

                            <div class="form-content mb-3">
                                <label class="mb-1">Стоимость автомобиля ($)</label>
                                <input v-model.trim="carPayment" type="number" class="form-control" placeholder="$">
                            </div>

                            <div class="form-select-box">
                                <div class="form-content mb-3">
                                    <label class="mb-1">Тип каробка передачи</label>
                                    <select v-model.trim="gearboxType" class="form-select form-control">
                                        <option v-for="(item, idx) in gearboxTypeArr" :key="item">
                                            {{ item }}
                                        </option>
                                    </select>
                                </div>

                                <div class="form-content mb-2">
                                    <label class="mb-1">Свет автомобиля</label>
                                    <select v-model.trim="carColor" class="form-select form-control">
                                        <option v-for="(item, idx) in carColorArr" :key="item">
                                            {{ item }}
                                        </option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        
                        <div class="line-box"></div>


                        <div class="form-right__box">
                            <div class="form-content mb-2">
                                <label class="mb-1">Выдано в аренде</label>
                                <input v-model.trim="issuedOnLease" type="text" class="form-control">
                            </div>

                            <div class="form-content mb-2">
                                <label class="mb-1">Получатель автомобиля</label>
                                <input v-model.trim="recipientOfTheVehicle" type="text" class="form-control">
                            </div>

                            <div class="form-content mb-2">
                                <label class="mb-1">Первоначальный взнос ($)</label>
                                <input v-model.trim="initialPayment" type="number" class="form-control" placeholder="$">
                            </div>

                            <div class="form-content mb-2">
                                <label class="mb-1">Расходы автомобиля ($)</label>
                                <input v-model.trim="carExpenses" type="number" class="form-control" placeholder="$">
                            </div>

                            <div class="form-select-box">
                                <div class="form-content mb-2">
                                    <label class="mb-1">Годовой процент</label>
                                    <select v-model.trim="annualPercentage" class="form-select form-control">
                                        <option v-for="(item, idx) of annualPercentageArr" :key="item">
                                            {{ item }}
                                        </option>
                                    </select>
                                </div>

                                <div class="form-content mb-2">
                                    <label class="mb-1">Количество месяцев выдано</label>
                                    <select v-model.trim="numberOfMonthsIssued" class="form-select form-control">
                                        <option v-for="(item, idx) of numberOfMonthsArr" :key="item">
                                            {{ item }}
                                        </option>
                                    </select>
                                </div>

                                <div class="form-content mb-2">
                                    <label class="mb-1">Количество месяцев осталось</label>
                                    <select v-model.trim="numberOfMonthsLeft" class="form-select form-control">
                                        <option v-for="(item, idx) of numberOfMonthsArr" :key="item">
                                            {{ item }}
                                        </option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>

                    <button class="btn btn-danger">{{ !$route.params.edite ? 'Добавить автомобиля' : 'Редактировать автомобиля' }}</button>
                </form>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import LoaderComponent from '@/components/LoaderComponent.vue';
import { SalesInfo } from "@/mixins";

@Component({
	components: {
		LoaderComponent
	}
})
export default class ProductsPage extends Vue {
    carInfo: SalesInfo = JSON.parse(sessionStorage.getItem("carInfo")) || {};
    pageLoading: boolean = false;
    numberOfMonthsArr: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36];
    annualPercentageArr: number[] = [10, 15, 20, 25, 30, 35, 40, 45, 50];
    gearboxTypeArr: string[] = ['Механическая', 'Автоматическая'];
    carColorArr: string[] = ['Белый', 'Молочный', 'Синый', 'Черный', 'Красный', 'Серый', 'Голубой', 'Мокрый асфальт'];

    carName: string = '';
    carYear: string = '';
    carNumber: string = '';
    carKm: number = NaN;
    carPayment: number = NaN;
    gearboxType: string = 'Механическая';
    carColor: string = 'Белый';

    issuedOnLease: string = '';
    recipientOfTheVehicle: string = '';
    initialPayment: number = NaN;
    carExpenses: number = NaN;
    annualPercentage: number = 30;
    numberOfMonthsIssued: number = 12;
    numberOfMonthsLeft: number = 12;
    
    created() {
		this.pageLoading = true;

        if (this.$route.params.edite) {
            this.carName = this.carInfo.car;
            this.carYear = this.carInfo.year;
            this.carNumber = this.carInfo.carNumber;
            this.carKm = this.carInfo.km;
            this.carPayment = this.carInfo.payment;
            this.carColor = this.carInfo.color;

            if (this.carInfo.type === 'MECHANICS') {
                this.gearboxType = 'Механическая';
            } else if (this.carInfo.type === 'AUTO') {
                this.gearboxType = 'Автоматическая';
            }

            this.issuedOnLease = this.carInfo.date;
            this.recipientOfTheVehicle = this.carInfo.name;
            this.initialPayment = this.carInfo.initialPayment;
            this.carExpenses = this.carInfo.expensesForMachine;
            this.annualPercentage = this.carInfo.percentagePerAnnum;
            this.numberOfMonthsIssued = this.carInfo.month;
            this.numberOfMonthsLeft = this.carInfo.monthLeft;
        }

        setTimeout(() => {
            this.pageLoading = false;
        }, 1000);
	}

    addNewCar(): void {
        const ID = Math.floor(Math.random() * 5000);

        const newCar: SalesInfo = {
            id: this.carInfo.id ? this.carInfo.id : ID,
            name: this.recipientOfTheVehicle,
            date: this.issuedOnLease,
            car: this.carName,
            carImg: '',
            carNumber: this.carNumber,
            month: +this.numberOfMonthsIssued,
            monthLeft: +this.numberOfMonthsLeft,
            payment: +this.carPayment,
            initialPayment: +this.initialPayment,
            color: this.carColor,
            km: +this.carKm,
            year: this.carYear,
            type: this.getCarType(this.gearboxType),
            percentagePerAnnum: this.annualPercentage,
            expensesForMachine: +this.carExpenses
        }

        if (
            newCar.id && 
            newCar.name && 
            newCar.date && 
            newCar.car && 
            newCar.carNumber && 
            newCar.month && 
            newCar.monthLeft && 
            newCar.payment && 
            newCar.initialPayment && 
            newCar.color &&
            newCar.km &&
            newCar.year &&
            newCar.type &&
            newCar.percentagePerAnnum &&
            newCar.expensesForMachine
        ) {
            sessionStorage.setItem("newCar", JSON.stringify(newCar));

            this.$router.push('/home');
        }
    }

    getCarType(type : string): string {
        switch(type) {
            case 'Механическая':
                return 'MECHANICS';
            case 'Автоматическая':
                return 'AUTO';
        }
    }
}

</script>

<style lang="sass" scoped>

.form-old-box
    display: flex
    width: 100%
    gap: 30px

    label
        font-size: 14px

.form-left__box
    width: 40%

.form-right__box
    width: 60%

.form-select-box
    display: flex
    gap: 24px

.line-box
    display: none
    width: 100%
    height: 1px
    background-color: #000
    margin: 32px 0


@media (max-width: 1200px)
    .form-old-box
        flex-direction: column

    .form-left__box
        width: 100%

    .form-right__box
        width: 100%

@media (max-width: 460px)
    .form-select-box
        flex-direction: column
        gap: 0

    .form-old-box
        gap: 0

    .line-box
        display: block

</style>