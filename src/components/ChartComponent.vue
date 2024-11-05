<template>
    <div>
        <div class="home-page">
            <div v-for="(i, idx) in chartHeader" :class="'home-chart order' + idx">
                <div class="chart__title">
                    <span>{{ i.title }}</span>
                </div>

                <div class="chart__container">
                    <div class="chart__header">
                        {{ 
                            idx === 0 ? salesArr.filter(i => i.monthLeft !== 0).length + ' ' + 'машин' : '' || 
                            idx === 1 ? salesArrItemsSold : '' || 
                            idx === 2 ? salesArr.filter(i => i.monthLeft === 0).length + ' ' + 'клиентов' : '' ||
                            idx === 3 ? totalProfit : ''
                        }}
                    </div>

                    <div class="chart__chart">
                        <div 
                            v-for="item in idx === 2 ? salesArr.filter(i => !i.monthLeft) : salesArr.filter(i => i.monthLeft)" 
                            :class="'chart__box' + idx"
                            :style="{height: `${idx !== 3 ? item.payment / 200 : totalProfitByMonthLeft(item) / 100}px`}"
                        >
                            <span v-if="idx === 0" class="hover-text">
                                <b>{{ item.car }}</b>
                            </span>

                            <span v-else-if="idx === 1" class="hover-text">
                                <b>{{ format(item.payment) }}{{ '$' }}</b> {{ item.monthLeft }} {{ 'Месяц осталось' }}
                            </span>

                            <span v-if="idx === 2" class="hover-text">
                                <b>{{ item.car }}</b>
                            </span>

                            <span v-if="idx === 3" class="hover-text">
                                Прибыль <b>{{ profitFromCurrentCar(item) }}$ {{ item.car }}</b>
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
            title: 'В аренде'
        },
        {
            title: 'Обшый сумма в аренде'
        },
        {
            title: 'Продано машин'
        },
        {
            title: 'Общий прибыль'
        }
    ];

    get salesArrItemsSold(): string {
        let itemsSold: number = 0;

        itemsSold = this.salesArr.reduce((sum, i: SalesInfo) => sum += i.monthLeft !== 0 ? +i.payment : i.payment - i.payment, 0);

        return `${this.format(itemsSold)}$`;
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

</style>