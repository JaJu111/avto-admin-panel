import Vue from 'vue';
import VueI18n from 'vue-i18n';
// import messages from './messages';

Vue.use(VueI18n);

export default new VueI18n({
	locale: 'ru', // default language
	// messages
    messages: {
        ru: {
            sales: {
                title: 'Продажи',
            },
            categories: {
                title: 'Категории',
            },
            products: {
                title: 'Товары',
            },
            home: {
                title: 'Главная',
                logOut: 'Выйти',
                topSellers: 'Лидеры продаж',
            }
        },
        en: {
            sales: {
                title: 'Sales',
            },
            categories: {
                title: 'Categories',
            },
            products: {
                title: 'Goods',
            },
            home: {
                title: 'Home',
                logOut: 'Log out',
                topSellers: 'Top Sellers',
            }
        }
    }
});