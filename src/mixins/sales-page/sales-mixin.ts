import { Component, Mixins } from "vue-property-decorator";
import SalesMixin from '@/mixins/sales';

@Component
export default class SalesPageMixin extends Mixins(
    SalesMixin
) {
    btnSelected: string = 'Все';
    searchBySales: string = '';
    pageLoading: boolean = false;

    created() {
		this.pageLoading = true;

        setTimeout(() => {
            this.pageLoading = false;
        }, 1000);
	}

    getSelectFilter(e: any): void {
        let selected: string = e.target.name;

        if (selected === 'Все') {
            this.btnSelected = 'Все';
        }

        if (selected === 'В аренде') {
            this.btnSelected = 'В аренде';
        }

        if (selected === 'Проданный') {
            this.btnSelected = 'Проданный';
        }
    }

    get filterSalesArr() {
        let carId = this.$store.state.car.car;
        
        if (carId.length) {
            return this.salesArr.filter(i => !carId.includes(i.id));
        }

        if (this.btnSelected === 'В аренде') {
            return this.salesArr.filter(i => i.monthLeft);
        }

        if (this.btnSelected === 'Проданный') {
            return this.salesArr.filter(i => !i.monthLeft);
        }

        return this.salesArr.filter(i => {
            return i.car.toLowerCase().includes(this.searchBySales);
        });
    }
}