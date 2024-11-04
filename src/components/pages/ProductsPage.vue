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
                                <input v-model.trim="carName" type="text" :class="['form-control', {'error-input': carErrorCar}]" placeholder="Spark 3 EURO">
                            </div>

                            <div class="form-content mb-2">
                                <label class="mb-1">Год выпуска</label>
                                <input v-model.trim="carYear" type="text" :class="['form-control', {'error-input': carErrorYear}]" placeholder="2012">
                            </div>

                            <div class="form-content mb-2">
                                <label class="mb-1">Км</label>
                                <input v-model.trim="carKm" type="number" :class="['form-control', {'error-input': carErrorKm}]" placeholder="185000">
                            </div>

                            <div class="form-content mb-2">
                                <label class="mb-1">Номер автомобиля</label>
                                <input v-model.trim="carNumber" type="text" :class="['form-control', {'error-input': carErrorNumber}]" placeholder="01 O 994 SA">
                            </div>

                            <div class="form-content mb-3">
                                <label class="mb-1">Стоимость автомобиля ($)</label>
                                <input v-model.trim="carPayment" type="number" :class="['form-control', {'error-input': carErrorPayment}]" placeholder="USD">
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
                                <label class="mb-1">Дата оформление аренду</label>
                                <input v-model.trim="issuedOnLease" type="text" :class="['form-control', {'error-input': carErrorIssuedOnLease}]" placeholder="дд.мм.гггг">
                            </div>

                            <div class="form-content mb-2">
                                <label class="mb-1">Получатель автомобиля</label>
                                <input v-model.trim="recipientOfTheVehicle" type="text" :class="['form-control', {'error-input': carErrorName}]" placeholder="Имя получателя">
                            </div>

                            <div class="form-content mb-2">
                                <label class="mb-1">Первоначальный взнос ($)</label>
                                <input v-model.trim="initialPayment" type="number" :class="['form-control', {'error-input': carErrorInitialPayment}]" placeholder="USD">
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
import { Component, Vue, Watch } from "vue-property-decorator";
import LoaderComponent from '@/components/LoaderComponent.vue';
import { SalesInfo } from "@/mixins";
import { mapActions } from 'vuex';
import { Action } from 'vuex-class'; 

@Component({
	components: {
		LoaderComponent
	},
    methods: {
    ...mapActions('salesArr', ['addCar'])
    }
})
export default class ProductsPage extends Vue {
    @Action('addCar', { namespace: 'car' }) addCar!: (obj) => void;
    carInfo: SalesInfo = JSON.parse(sessionStorage.getItem("carInfo")) || {};
    pageLoading: boolean = false;
    numberOfMonthsArr: number[] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36];
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
    annualPercentage: number = 30;
    numberOfMonthsIssued: number = 12;
    numberOfMonthsLeft: number = 12;

    carErrorCar: boolean = false;
    carErrorYear: boolean = false;
    carErrorKm: boolean = false;
    carErrorNumber: boolean = false;
    carErrorPayment: boolean = false;
    carErrorIssuedOnLease: boolean = false;
    carErrorName: boolean = false;
    carErrorInitialPayment: boolean = false;
    
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
            id: this.$route.params.edite ? this.carInfo.id : ID,
            name: this.recipientOfTheVehicle,
            date: this.issuedOnLease,
            car: this.carName,
            carImg: this.$route.params.edite ? this.carInfo.carImg : '',
            carNumber: this.carNumber,
            month: +this.numberOfMonthsIssued,
            monthLeft: +this.numberOfMonthsLeft,
            payment: +this.carPayment,
            initialPayment: +this.initialPayment,
            color: this.carColor,
            km: +this.carKm,
            year: this.carYear,
            type: this.getCarType(this.gearboxType),
            percentagePerAnnum: this.annualPercentage
        }

        if (!newCar.car) {
            this.carErrorCar = true;
        } else {
            this.carErrorCar = false;
        }

        if (!newCar.year) {
            this.carErrorYear = true;
        } else {
            this.carErrorYear = false;
        }

        if (!newCar.km) {
            this.carErrorKm = true;
        } else {
            this.carErrorKm = false;
        }

        if (!newCar.carNumber) {
            this.carErrorNumber = true;
        } else {
            this.carErrorNumber = false;
        }

        if (!newCar.payment) {
            this.carErrorPayment = true;
        } else {
            this.carErrorPayment = false;
        }

        if (!newCar.date) {
            this.carErrorIssuedOnLease = true;
        } else {
            this.carErrorIssuedOnLease = false;
        }

        if (!newCar.name) {
            this.carErrorName = true;
        } else {
            this.carErrorName = false;
        }

        if (!newCar.initialPayment) {
            this.carErrorInitialPayment = true;
        } else {
            this.carErrorInitialPayment = false;
        }

        if (
            newCar.name && 
            newCar.date && 
            newCar.car && 
            newCar.carNumber && 
            newCar.month && 
            newCar.payment && 
            newCar.initialPayment && 
            newCar.color &&
            newCar.km &&
            newCar.year &&
            newCar.type &&
            newCar.percentagePerAnnum
        ) {
            this.addCar(newCar);
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

    @Watch('carName')
    getCarErrorCar(val: string): void {
        if (val) {
            this.carErrorCar = false;
        }
    }

    @Watch('carYear')
    getCarErrorYear(val: string): void {
        if (val) {
            this.carErrorYear = false;
        }
    }

    @Watch('carKm')
    getCarErrorKm(val: string): void {
        if (val) {
            this.carErrorKm = false;
        }
    }

    @Watch('carNumber')
    getCarErrorNumber(val: string): void {
        if (val) {
            this.carErrorNumber = false;
        }
    }

    @Watch('carPayment')
    getCarErrorPayment(val: string): void {
        if (val) {
            this.carErrorPayment = false;
        }
    }

    @Watch('issuedOnLease')
    getCarErrorIssuedOnLease(val: string): void {
        if (val) {
            this.carErrorIssuedOnLease = false;
        }
    }

    @Watch('recipientOfTheVehicle')
    getCarErrorName(val: string): void {
        if (val) {
            this.carErrorName = false;
        }
    }

    @Watch('initialPayment')
    getCarErrorInitialPayment(val: string): void {
        if (val) {
            this.carErrorInitialPayment = false;
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

.error-input
    border-color: #c82333
    background: #fdf2f2

.error-input:focus
    outline: none
    background: #ffeeee
    border-color: #c82333
    box-shadow: 0 0 0 .2rem #ffc4c4


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