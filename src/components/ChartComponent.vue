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
                            idx === 0 ? salesArr.length + ' ' + 'машин' : '' || 
                            idx === 1 ? salesArrItemsSold : '' || 
                            idx === 2 ? salesArr.filter(i => i.status === 'DELIVERED').length + ' ' + 'клиентов' : '' 
                        }}
                    </div>

                    <div class="chart__chart">
                        <div 
                            v-for="item in idx !== 2 ? salesArr : salesArr.filter(i => i.status === 'DELIVERED')" 
                            :class="'chart__box' + idx"
                            :style="{height: `${+item.amount.slice(1, 4) / 10}px`}"
                        >
                            <span v-if="idx !== 1" class="hover-text">
                                {{ item.date }}
                            </span>

                            <span v-else class="hover-text">
                                <b>{{ item.amount }}</b> <br> {{ item.date }}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import { SalesInfo } from '@/mixins';

@Component
export default class ChartComponent extends Vue {

    @Prop({ type: Array, default: () => [] }) readonly salesArr!: SalesInfo[];

    chartHeader: any[] = [
        {
            title: 'В аренде',
            link: '/sales'
        },
        {
            title: 'Обшый сумма в аренде'
        },
        {
            title: 'Продано машин'
        }
    ];

    get salesArrItemsSold(): string {
        let itemsSold: number = 0;

        itemsSold = this.salesArr.reduce((sum, i: SalesInfo) => sum += +i.amount.slice(1), 0);

        return `$${this.format(itemsSold)}`;
    }

    format(v: number): string {
        let value = Number(v).toLocaleString('ru').replace(',', '.');

        let [ mainValue, subValue ] = value.split('.');

        subValue = subValue || '';

        return mainValue + subValue;
    }

}

</script>

<style lang="sass" scoped>

@import ../style/charts-component

</style>