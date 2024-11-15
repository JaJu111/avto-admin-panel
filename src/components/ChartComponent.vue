<template>
    <div>
        <div class="home-page">
            <div v-for="(i, idx) in chartHeader" :class="'home-chart order' + idx" :style="{backgroundImage: `url(${i.bg})`}">
                <div class="bg-box"></div>

                <div class="chart__title relative">
                    <span>{{ i.title }}</span>
                </div>

                <div class="chart__container">
                    <div class="chart__header">
                        {{ 
                            idx === 0 ? salesArr.filter(i => i.monthLeft !== 0).length + ' ' + 'машин' : '' || 
                            idx === 1 ? salesArrItemsSold : '' || 
                            idx === 2 ? salesArr.filter(i => i.monthLeft === 0).length + ' ' + 'клиентов' : '' ||
                            idx === 3 ? totalProfit : '' ||
                            idx === 4 ? getSalesForCurrentMonth.length + ' ' + 'машин' : ''
                        }}
                    </div>

                    <div class="chart__chart">
                        <div 
                            v-for="item in idx === 2 
                                ? salesArr.filter(i => !i.monthLeft)
                                : idx === 4
                                ? getSalesForCurrentMonth
                                : salesArr.filter(i => i.monthLeft)
                            " 
                            :class="'chart__box' + idx"
                            :style="{height: `${idx !== 3 ? item.payment / 200 : totalProfitByMonthLeft(item) / 100}px`}"
                        >
                            <span v-if="idx === 0" class="hover-text">
                                <b>{{ item.car }}</b> <br> {{ item.carNumber }}
                            </span>

                            <span v-else-if="idx === 1" class="hover-text">
                                <b>{{ format(item.payment) }}{{ '$' }}</b> {{ item.monthLeft }} {{ 'Месяц осталось' }}
                            </span>

                            <span v-if="idx === 2" class="hover-text">
                                <b>{{ item.car }}</b> <br> {{ item.carNumber }}
                            </span>

                            <span v-if="idx === 3" class="hover-text">
                                Прибыль <b>{{ profitFromCurrentCar(item) }}$ {{ item.car }}</b> <br> {{ item.carNumber }}
                            </span>

                            <span v-if="idx === 4" class="hover-text">
                                <b>{{ item.car }}</b> <br> {{ item.carNumber }}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Mixins } from "vue-property-decorator";
import { SalesInfo } from '@/mixins';
import ProfitFromCar from "@/mixins/profit-from-car";

@Component
export default class ChartComponent extends Mixins(
    ProfitFromCar
) {

    @Prop({ type: Array, default: () => [] }) readonly salesArr!: SalesInfo[];

    chartHeader: any[] = [
        {
            title: 'В аренде',
            bg: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS574CcoTLl1-FyiRXBBioyOGtPdwVWDwKoMw&s'
        },
        {
            title: 'Обшый сумма в аренде',
            bg: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS7IvxfhU0PXSPtHmOts-Pjp3azdewj5jzCvQ&s'
        },
        {
            title: 'Продано машин за все время',
            bg: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxQepZKvIxb79HWOMXnrxruXdB1TCVu_ejew&s'
            // bg: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTklLppkOxB6jYQeEfT2tHkJwp20lUHugCT24ex0798eWug6B_0lV_Qzc7UCbXB0mpXh7w&usqp=CAU'
        },
        {
            title: 'Общий прибыль',
            bg: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRUMmgvGDbYmgx4sY0tMTw29UbuuWza2ec3vnlboJx1K46eJEW3vfE3nRBH6xTtpbu_XCM&usqp=CAU'
        },
        // {
        //     title: 'Количество продаж в июле'
        // }
        {
            title: 'Продаж за текущий месяц',
            bg: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTKZF1pNgAkUcsaZTvizZJ_dfgoSsxfE_brGA&s'
        }
    ];

    get salesArrItemsSold(): string {
        let itemsSold: number = 0;

        itemsSold = this.salesArr.reduce((sum, i: SalesInfo) => sum += i.monthLeft !== 0 ? +i.payment : i.payment - i.payment, 0);

        return `${this.format(itemsSold)}$`;
    }

    get numberOfSalesPerMonth(): SalesInfo[] {
        return this.salesArr.filter(sale => {
            const saleDate = new Date(sale.date.split('.').reverse().join('-'));
            const startDate = new Date('2024-07-01');
            const endDate = new Date('2024-07-30');
        
            return saleDate >= startDate && saleDate <= endDate;
        });
    }

    get getSalesForCurrentMonth(): SalesInfo[] {
        const currentDate = new Date();
        const currentMonth = currentDate.getMonth();
        const currentYear = currentDate.getFullYear();

        const salesInCurrentMonth = this.salesArr.filter(sale => {
            const [day, month, year] = sale.date.split('.').map(Number);
            return (year === currentYear && month - 1 === currentMonth);
        });

        return salesInCurrentMonth;
    }

    totalProfitByMonthLeft(item: SalesInfo): number {
        let sum: number = 0;
        let result: number = 0;

        if (item.monthLeft) {
            sum = item.payment - item.initialPayment;

            let yearPersent = sum * item.percentagePerAnnum / 100;

            result = yearPersent / 12 * item.month;

            return result;
        }

        return result;
    }

    get totalProfit(): string {
        let itemsSold: number = 0;

        itemsSold = this.salesArr.reduce((sum, i: SalesInfo) => sum += this.totalProfitByMonthLeft(i), 0);

        return `${this.format(itemsSold)}$`;
    }
}

</script>

<style lang="sass" scoped>

@import ../style/charts-component

.home-chart
    position: relative
    background-repeat: no-repeat
    background-size: cover
    background-position: center

.bg-box
    position: absolute
    left: 0
    top: 0
    border-radius: 4px
    width: 100%
    height: 100%
    backdrop-filter: blur(3px)

</style>