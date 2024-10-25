<template>
    <div>
        <h1>Car Info</h1>
    </div>
</template>

<script lang="ts">
import { SalesInfo } from '@/mixins';
import { Vue, Component } from 'vue-property-decorator';

@Component
export default class CarInfo extends Vue {
    carInfo: SalesInfo = JSON.parse(sessionStorage.getItem("carInfo")) || {};
}

</script>

<style lang="sass" scoped>

</style>