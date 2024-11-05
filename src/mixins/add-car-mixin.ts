import { Component, Vue, Watch } from "vue-property-decorator";
import { SalesInfo } from "@/mixins";
import { mapActions } from 'vuex';
import { Action } from 'vuex-class'; 

@Component({
    methods: {
    ...mapActions('salesArr', ['addCar'])
    }
})

export default class AddCarMixin extends Vue {
    
    @Action('addCar', { namespace: 'car' }) addCar!: (obj: SalesInfo) => void;
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