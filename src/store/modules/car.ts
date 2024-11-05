const state = {
    car: [],
    salesArr: [
        {
            id: 3245,
            name: 'Виталий Логинов',
            date: '17 июл. 2024 г.',
            car: 'Matiz mx',
            carImg: 'https://frankfurt.apollo.olxcdn.com/v1/files/dndbpf1mbxc11-UZ/image',
            carNumber: '01 S 674 SA',
            month: 20,
            monthLeft: 12,
            payment: 5000,
            initialPayment: 1000,
            color: 'Белый',
            km: 124566,
            year: '2010',
            type: 'MECHANICS',
            percentagePerAnnum: 30
        },
        {
            id: 3143,
            name: 'Ольга Владимирова',
            date: '20 авг. 2024 г.',
            car: 'Matiz Best',
            carImg: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRolCye40X6wnyHhoeoaDEjc-RNwptqg0yPEw&s',
            carNumber: '01 M 243 HF',
            month: 24,
            monthLeft: 18,
            payment: 6000,
            initialPayment: 2000,
            color: 'Молочный',
            km: 158653,
            year: '2012',
            type: 'AUTO',
            percentagePerAnnum: 30
        },
        {
            id: 2461,
            name: 'Юлия Князева',
            date: '01 авг. 2024 г.',
            car: 'Lacetti gentra LTZ',
            carImg: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZMIF8eO4r91eqxRqYBHbhTj9v2927e9XcJA&s',
            carNumber: '01 A 534 CD',
            month: 36,
            monthLeft: 20,
            payment: 9000,
            initialPayment: 3000,
            color: 'Синый',
            km: 94275,
            year: '2018',
            type: 'AUTO',
            percentagePerAnnum: 30
        },
        {
            id: 7321,
            name: 'Фёдор Тимофеев',
            date: '12 авг. 2024 г.',
            car: 'Nexia 3 LTZ',
            carImg: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSE7dGKkuiyfuoEMXJ0ny2fDRPxO0CkFqPutgu-37QnTklwpPlrQErgH0EZKKZI81490Wk&usqp=CAU',
            carNumber: '01 J 127 AR',
            month: 24,
            monthLeft: 8,
            payment: 8000,
            initialPayment: 1000,
            color: 'Мокрый асфальт',
            km: 113254,
            year: '2016',
            type: 'MECHANICS',
            percentagePerAnnum: 30
        },
        {
            id: 5432,
            name: 'Musaboyev Jaloliddin',
            date: '10 май. 2024 г.',
            car: 'Spark 3 EURO',
            carImg: 'https://sim-auto.ru/upload/img/2021/12/02/spark2.jpg',
            carNumber: '01 O 994 SA',
            month: 20,
            monthLeft: 13,
            payment: 7000,
            initialPayment: 1000,
            color: 'Белый',
            km: 185000,
            year: '2012',
            type: 'MECHANICS',
            percentagePerAnnum: 30
        },
        {
            id: 3532,
            name: 'Ярослав Жуков',
            date: '28 июл. 2024 г.',
            car: 'Lacetti',
            // carImg: 'https://upl.uz/uploads/posts/2021-10/1633238997_1200x900n.jpg',
            carImg: '',
            carNumber: '01 A 943 FW',
            month: 30,
            monthLeft: 20,
            payment: 9500,
            initialPayment: 2000,
            color: 'Серый',
            km: 215300,
            year: '2014',
            type: 'AUTO',
            percentagePerAnnum: 30
        },
        {
            id: 3928,
            name: 'Елена Молчанова',
            date: '20 авг. 2024 г.',
            car: 'Nexia 3 LTZ',
            carImg: 'https://s.auto.drom.ru/img5/catalog/photos/fullsize/ravon/nexia_r3/ravon_nexia_r3_294917.jpg',
            carNumber: '01 J 753 JK',
            month: 18,
            monthLeft: 0,
            payment: 10500,
            initialPayment: 3000,
            color: 'Голубой',
            km: 172500,
            year: '2016',
            type: 'AUTO',
            percentagePerAnnum: 30
        },
        {
            id: 3895,
            name: 'Игнатий Осипов',
            date: '18 авг. 2024 г.',
            car: 'Spark 2',
            carImg: '',
            carNumber: '01 K 445 GE',
            month: 20,
            monthLeft: 0,
            payment: 7200,
            initialPayment: 2500,
            color: 'Белый',
            km: 131400,
            year: '2019',
            type: 'MECHANICS',
            percentagePerAnnum: 30
        }
    ]
};
  
const mutations = {
    SET_USER(state, id) {
        state.car.push(id);
    },
    CLEAR_USER(state) {
        state.car = [];
    },
    ADD_CAR(state, obj) {
        const editeArr = state.salesArr.map(i => i.id === obj.id ? obj : i)
        state.salesArr = editeArr;

        if (!state.salesArr.includes(obj)) {
            state.salesArr.unshift(obj);
        }
    }
};
  
const actions = {
    delete({ commit }, id) {
        commit('SET_USER', id);
    },
    addCar({ commit }, obj) {
        commit('ADD_CAR', obj);
    },
    logout({ commit }) {
        commit('CLEAR_USER');
    }
};
  
const getters = {
    car: (state) => state.car,
    userName: (state): string | null => state.user ? state.user.name : null
};
  
export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
};