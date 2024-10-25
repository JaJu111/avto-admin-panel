import { Component, Vue } from "vue-property-decorator";
import { SalesInfo } from '@/mixins/index';

@Component
export default class SalesMixin extends Vue {

	salesArr: SalesInfo[] = [
        {
            id: 3245,
            name: 'Виталий Логинов',
            date: '17 июл. 2024 г.',
            amount: '$212',
            status: 'NO_DELIVERED',
            car: 'Matiz mx',
            carImg: 'https://uzreport.news/fotobank/image/fcd496c76a33fb2ede2c5fdd3cec33c7.jpeg',
            carNumber: '01 S 674 SA',
            month: 24,
            monthLeft: 12,
            payment: 5000,
            initialPayment: 1000,
            color: 'Белый'
        },
        {
            id: 3143,
            name: 'Ольга Владимирова',
            date: '20 авг. 2024 г.',
            amount: '$125',
            status: 'DELIVERED',
            car: 'Matiz Best',
            carImg: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRolCye40X6wnyHhoeoaDEjc-RNwptqg0yPEw&s',
            carNumber: '01 M 243 HF',
            month: 24,
            monthLeft: 18,
            payment: 6000,
            initialPayment: 2000,
            color: 'Молочный'
        },
        {
            id: 2461,
            name: 'Юлия Князева',
            date: '01 авг. 2024 г.',
            amount: '$440',
            status: 'DELIVERED',
            car: 'Lasetti jentra LTZ',
            carImg: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZMIF8eO4r91eqxRqYBHbhTj9v2927e9XcJA&s',
            carNumber: '01 A 534 CD',
            month: 24,
            monthLeft: 20,
            payment: 9000,
            initialPayment: 3000,
            color: 'Синый'
        },
        {
            id: 7321,
            name: 'Фёдор Тимофеев',
            date: '12 авг. 2024 г.',
            amount: '$115',
            status: 'NO_DELIVERED',
            car: 'Nexia 3 LTZ',
            carImg: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSE7dGKkuiyfuoEMXJ0ny2fDRPxO0CkFqPutgu-37QnTklwpPlrQErgH0EZKKZI81490Wk&usqp=CAU',
            carNumber: '01 J 127 AR',
            month: 24,
            monthLeft: 8,
            payment: 8000,
            initialPayment: 1000,
            color: 'Мокрый асфальт'
        },
        // {
        //     id: 5432,
        //     name: 'Юлия Николаева',
        //     date: '31 июл. 2024 г.',
        //     amount: '$510',
        //     status: 'NO_DELIVERED'
        // },
        // {
        //     id: 3532,
        //     name: 'Ярослав Жуков',
        //     date: '28 июл. 2024 г.',
        //     amount: '$212',
        //     status: 'DELIVERED'
        // },
        // {
        //     id: 3928,
        //     name: 'Елена Молчанова',
        //     date: '20 авг. 2024 г.',
        //     amount: '$175',
        //     status: 'NO_DELIVERED'
        // },
        // {
        //     id: 3895,
        //     name: 'Игнатий Осипов',
        //     date: '18 авг. 2024 г.',
        //     amount: '$162',
        //     status: 'DELIVERED'
        // }
    ]

}