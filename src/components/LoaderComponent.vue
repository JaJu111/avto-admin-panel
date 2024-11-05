<template>
    <div>
        <div v-if="loading" class="loading-overlay">
            <div class="loading">
                <div class="loader-box">
                    <div class="loader"></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

@Component
export default class LoaderComponent extends Vue {
    @Prop({ type: Boolean, default: false }) readonly loading!: boolean;
}

</script>

<style lang="sass" scoped>

@import ../style/loader-component

</style>