<template>
    <div>
        <div v-if="open" class="dialog-overlay">
            <div class="dialog-box">
                <div class="dialog-box__top">
                    <h1>Удалить автомобиля</h1>

                    <span>Вы точно хотите удалить <b>"{{ item.car }}"</b></span>
                </div>

                <div class="dialog-box__bottom">
                    <button @click="emitClose" class="btn cancel">Отмена</button>
                    <button @click="emitDelete" class="btn btn-danger">Удалить</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit } from 'vue-property-decorator';
import { SalesInfo } from '@/mixins';

@Component
export default class DialogComponent extends Vue {
    @Prop({ type: Boolean, default: false }) readonly open!: boolean;
    @Prop({ type: Object, default: {} }) readonly item!: SalesInfo;

    @Emit('delete')
    emitDelete() {}

    @Emit('close')
    emitClose() {}
}

</script>

<style lang="sass" scoped>

@import ../style/dialog-component

</style>