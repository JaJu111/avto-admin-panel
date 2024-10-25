import { Component, Mixins } from "vue-property-decorator";
import SalesMixin from '@/mixins/sales';

@Component
export default class SalesPageMixin extends Mixins(
    SalesMixin
) {
    searchBySales: string = '';
    pageLoading: boolean = false;

    created() {
		this.pageLoading = true;

        setTimeout(() => {
            this.pageLoading = false;
        }, 1000);
	}

    get filterSalesArr() {
        return this.salesArr.filter(i => {
            return i.car.toLowerCase().includes(this.searchBySales);
        });
    }
}