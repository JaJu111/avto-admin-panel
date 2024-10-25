import { Component, Vue } from "vue-property-decorator";

@Component
export default class ProductsMixin extends Vue {

    pageLoading: boolean = false;

    created() {
		this.pageLoading = true;

        setTimeout(() => {
            this.pageLoading = false;
        }, 1000);
	}
    
    productsArr: any[] = [
        {
            id: 1,
            title: '10.2" Планшет Apple iPad 2019 32 ГБ серый',
            img: 'https://c.dns-shop.ru/thumb/st4/fit/0/0/d5ce3be06de4a02738512510e14e6ce5/b0927268c02dbc5699b3991ae6bda9cc70fda29e02ebefff0f8413213badc08a.jpg',
            category: 'Планшеты, электронные книги',
            quantity: 65,
            amount: 40000,
            status: 'ACTIVE',
        },
        {
            id: 2,
            title: '12.9" Планшет Apple iPad Pro 2020 Wi‑Fi 512 ГБ серебристый',
            img: 'https://c.dns-shop.ru/thumb/st4/fit/0/0/a51d2bdd094ad05ceb4cd1b475be0792/9033d846fc642a7ecdddf3996db85e631b9e25f06e97b471cbec9664d90a073f.jpg',
            category: 'Планшеты, электронные книги',
            quantity: 41,
            amount: 120000,
            status: 'ACTIVE',
        },
        {
            id: 3,
            title: '15.6" Ноутбук HP 15-bs168ur черный',
            img: 'https://c.dns-shop.ru/thumb/st1/fit/0/0/dd89d0ede898333704d5d100ea7eb316/67e3de2043bdb00877d2f7a00c58a4732ee60c7af1fb3377638430fa55d442ea.jpg',
            category: 'Компьютеры, ноутбуки и ПО',
            quantity: 22,
            amount: 52000,
            status: 'ACTIVE',
        },
        {
            id: 4,
            title: '21.5" Моноблок HP ProOne 600 G5 [7QN20EA]',
            img: 'https://c.dns-shop.ru/thumb/st1/fit/0/0/07ee4fd913862b346aeaa1b0fe8a4ed1/4bdcc2dc17e53ab8ff0dec7a08557cda89c92c43fe81934c82dac0c84570c6b0.jpg',
            category: 'Компьютеры, ноутбуки и ПО',
            quantity: 78,
            amount: 87000,
            status: 'ACTIVE',
        },
        {
            id: 5,
            title: '6.1" Смартфон Apple iPhone 11 256 ГБ фиолетовый',
            img: 'https://c.dns-shop.ru/thumb/st4/fit/0/0/e9d16f60116e99489837f2b8f4d388ba/e896bc09568aa1458edfa640919f60c0e2d4590925ceb07045664135ae03d069.jpg',
            category: 'Смартфоны и гаджеты',
            quantity: 43,
            amount: 110000,
            status: 'ACTIVE',
        },
        {
            id: 6,
            title: '65" (165 см) Телевизор LED LG 65SM9800PLA черный',
            img: 'https://c.dns-shop.ru/thumb/st1/fit/0/0/44cc1bd15e5166bd6765758d20df1174/350e95792b1ef6486916b896585367b897681966865ba7343e698a53e80f33a3.jpg',
            category: 'Телевизоры и аксессуары',
            quantity: 71,
            amount: 228000,
            status: 'ACTIVE',
        },
        {
            id: 7,
            title: 'Bluetooth стереогарнитура Panasonic RP-BTD5 черный',
            img: 'https://c.dns-shop.ru/thumb/st4/fit/wm/2000/2000/ad6b43138214f3f9583d5a0aac345732/7c502472bb8911e065e9ae0f219ae75b61284a188b4b8f7035f45b5da2491a8f.jpg',
            category: 'Аудиотехника',
            quantity: 94,
            amount: 11000,
            status: 'NOT_ACTIVE',
        },
        {
            id: 8,
            title: 'BGPS навигатор Garmin Drive 52 RUS LMT',
            img: 'https://c.dns-shop.ru/thumb/st4/fit/0/0/a144648d5d8fd9bfd6b9c71d89594772/1d77c32e434f0dbd355c1c4016a3c96b862bc769c38ab4e53201939cc0a9efc8.jpg',
            category: 'Автоэлектроника и противоугонные системы',
            quantity: 8,
            amount: 16000,
            status: 'ACTIVE',
        },
        {
            id: 9,
            title: 'Wi-Fi роутер TP-LINK Archer A7',
            img: 'https://c.dns-shop.ru/thumb/st4/fit/wm/2000/2000/4e05af0b59ef30c01587227997c587ca/ab88831d3a3c8c0920f6a4fff606e2c3ee50345107ca501e8423bedfef5cbe84.jpg',
            category: 'Маршрутизаторы и прочее беспроводное оборудование',
            quantity: 40,
            amount: 8000,
            status: 'ACTIVE',
        },
        {
            id: 10,
            title: 'Автопроигрыватель JVC KD-R577',
            img: 'https://c.dns-shop.ru/thumb/st1/fit/0/0/a21deb84ed343a85d0a531a06c4ace5c/9477636f95c0843d4e755952e5ffd85d19373d144ae854876e0059e212b98d8b.jpg',
            category: 'Автозвук',
            quantity: 55,
            amount: 6000,
            status: 'NOT_ACTIVE',
        }
    ]

}