import { Component, Vue } from "vue-property-decorator";
import { AvtoAdmin } from "@/components/interface";

@Component
export default class SetLetter extends Vue {
    USER: AvtoAdmin = JSON.parse(sessionStorage.getItem('user')) || {};
    
    setLetter(): string {
        let letter = this.USER.login.slice(0, 1).toUpperCase();

        return letter;
    }
}