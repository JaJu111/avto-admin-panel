import { Component, Vue } from "vue-property-decorator";

@Component
export default class NumberFormat extends Vue {
    
    format(v: number): string {
        let value = Number(v).toLocaleString('ru').replace(',', '.');

        let [ mainValue, subValue ] = value.split('.');

        subValue = subValue || '';

        return mainValue + subValue;
    }
}