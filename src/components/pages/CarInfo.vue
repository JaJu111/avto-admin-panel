<template>
    <div>
        <div class="car-info-box">
            <div class="icon-box" @click="submitProduct">
                <i class="fa-solid fa-arrow-left"></i>
            </div>

            <span class="car-title">Информация о машине</span>
        </div>

        <h1>{{ carInfo.car }}</h1>
    </div>
</template>

<script lang="ts">
import { SalesInfo } from '@/mixins';
import { Vue, Component } from 'vue-property-decorator';

@Component
export default class CarInfo extends Vue {
    carInfo: SalesInfo = JSON.parse(sessionStorage.getItem("carInfo")) || {};

    submitProduct(): void {
        this.$router.push('/home');
    }
}

</script>

<style lang="sass" scoped>

.car-info-box
    display: flex
    align-items: center

.icon-box
    width: 30px
    height: 30px
    display: flex
    align-items: center
    justify-content: center
    background: #f33636
    border-radius: 50%
    margin-right: 12px
    cursor: pointer

    i
        color: #fff

.car-title
    font-size: 20px
    font-weight: 500

</style>