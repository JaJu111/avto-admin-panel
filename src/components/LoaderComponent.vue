<template>
    <div>
        <div v-if="loading" class="loading">
            <div class="loader-box">
                <div class="loader"></div>
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

.loading
    position: absolute
    top: 50%
    left: 50%
    transform: translate(-50%, -50%)
    z-index: 10

.loader-box
    display: flex
    justify-content: center
    align-items: center
    width: 64px
    height: 64px
    border-radius: 12px
    background-color: #fff
    box-shadow: 0 2px 14px rgba(0, 0, 0, 0.2)

.loader
    display: inline-block
    width: 2rem
    height: 2rem
    border: 0.3rem solid #919191
    border-top: 0.3rem solid #fff
    border-radius: 50%
    animation: spin 0.75s linear infinite

@keyframes spin
    100%
        transform: rotate(360deg)

</style>