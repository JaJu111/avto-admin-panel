import { Component, Mixins } from "vue-property-decorator";
import { SalesInfo } from ".";
import NumberFormat from "./number-format";

@Component
export default class ProfitFromCar extends Mixins(
    NumberFormat
) {
    
    profitFromCurrentCar(item: SalesInfo): string {
        let sum = item.payment - item.initialPayment;

        let yearPersent = sum * item.percentagePerAnnum / 100;

        let result = yearPersent / 12 * item.month;

        return this.format(result);
    }
}