import { Component, Vue } from "vue-property-decorator";
import { SalesInfo } from "..";

@Component
export default class SalesPageMixin extends Vue {
    btnSelected: string = 'Все';
    searchBySales: string = '';
    pageLoading: boolean = false;
    salesArr: SalesInfo[] = [];

    created() {
		this.pageLoading = true;

        setTimeout(() => {
            this.pageLoading = false;
        }, 1000);

        this.salesArr = this.$store.state.car.salesArr;
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

    get filterSalesArr(): SalesInfo[] {
        this.salesArr = this.salesArr.filter(i => !this.$store.state.car.car.includes(i.id));

        if (this.btnSelected === 'В аренде') {
            if (!this.searchBySales.length) {
                return this.salesArr.filter(i => i.monthLeft);
            } else {
                return this.salesArr.filter(i => {
                    if (i.monthLeft) {
                        return i.car.toLowerCase().includes(this.searchBySales) || 
                            i.carNumber.toLowerCase().includes(this.searchBySales);
                    }
                });
            }
        }

        if (this.btnSelected === 'Проданный') {
            if (!this.searchBySales.length) {
                return this.salesArr.filter(i => !i.monthLeft);
            } else {
                return this.salesArr.filter(i => {
                    if (!i.monthLeft) {
                        return i.car.toLowerCase().includes(this.searchBySales) || 
                            i.carNumber.toLowerCase().includes(this.searchBySales);
                    }
                });
            }
        }

        return this.salesArr.filter(i => {
            return i.car.toLowerCase().includes(this.searchBySales) || 
                i.carNumber.toLowerCase().includes(this.searchBySales);
        });
    }
}