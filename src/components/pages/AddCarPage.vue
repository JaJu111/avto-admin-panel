<template>
    <div>
        <LoaderComponent 
            :loading="pageLoading"
        />

        <div v-if="!pageLoading">
            <h1 v-if="!$route.params.edite" class="text-2xl font-medium text-black mb-7">Добавить автомобиля</h1>
            <h1 v-else class="text-2xl font-medium text-black mb-8">Редактировать автомобиля</h1>

            <div class="add-car">
                <form class="form-box" @submit.prevent="addNewCar">

                    <div class="form-old-box mb-4">
                        <div class="form-left__box">
                            <div class="form-content mb-2">
                                <label class="mb-1">Название автомобиля</label>
                                <input v-model.trim="carName" type="text" :class="['form-control', {'error-input': carErrorCar}]" placeholder="Spark 3 EURO">
                            </div>

                            <div class="form-content mb-2">
                                <label class="mb-1">Год выпуска</label>
                                <input v-model.trim="carYear" type="text" :class="['form-control', {'error-input': carErrorYear}]" placeholder="2012">
                            </div>

                            <div class="form-content mb-2">
                                <label class="mb-1">Км</label>
                                <input v-model.trim="carKm" type="number" :class="['form-control', {'error-input': carErrorKm}]" placeholder="185000">
                            </div>

                            <div class="form-content mb-2">
                                <label class="mb-1">Номер автомобиля</label>
                                <input v-model.trim="carNumber" type="text" :class="['form-control', {'error-input': carErrorNumber}]" placeholder="01 O 994 SA">
                            </div>

                            <div class="form-content mb-3">
                                <label class="mb-1">Стоимость автомобиля ($)</label>
                                <input v-model.trim="carPayment" type="number" :class="['form-control', {'error-input': carErrorPayment}]" placeholder="USD">
                            </div>

                            <div class="form-select-box">
                                <div class="form-content mb-3">
                                    <label class="mb-1">Тип каробка передачи</label>
                                    <select v-model.trim="gearboxType" class="form-select form-control">
                                        <option v-for="(item, idx) in gearboxTypeArr" :key="item">
                                            {{ item }}
                                        </option>
                                    </select>
                                </div>

                                <div class="form-content mb-2">
                                    <label class="mb-1">Свет автомобиля</label>
                                    <select v-model.trim="carColor" class="form-select form-control">
                                        <option v-for="(item, idx) in carColorArr" :key="item">
                                            {{ item }}
                                        </option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        
                        <div class="line-box"></div>


                        <div class="form-right__box">
                            <div class="form-content mb-2">
                                <label class="mb-1">Дата оформление аренду</label>
                                <input v-model.trim="issuedOnLease" type="text" :class="['form-control', {'error-input': carErrorIssuedOnLease}]" placeholder="дд.мм.гггг">
                            </div>

                            <div class="form-content mb-2">
                                <label class="mb-1">Получатель автомобиля</label>
                                <input v-model.trim="recipientOfTheVehicle" type="text" :class="['form-control', {'error-input': carErrorName}]" placeholder="Имя получателя">
                            </div>

                            <div class="form-content mb-2">
                                <label class="mb-1">Первоначальный взнос ($)</label>
                                <input v-model.trim="initialPayment" type="number" :class="['form-control', {'error-input': carErrorInitialPayment}]" placeholder="USD">
                            </div>

                            <div class="form-select-box">
                                <div class="form-content mb-2">
                                    <label class="mb-1">Годовой процент</label>
                                    <select v-model.trim="annualPercentage" class="form-select form-control">
                                        <option v-for="(item, idx) of annualPercentageArr" :key="item">
                                            {{ item }}
                                        </option>
                                    </select>
                                </div>

                                <div class="form-content mb-2">
                                    <label class="mb-1">Количество месяцев выдано</label>
                                    <select v-model.trim="numberOfMonthsIssued" class="form-select form-control">
                                        <option v-for="(item, idx) of numberOfMonthsArr" :key="item">
                                            {{ item }}
                                        </option>
                                    </select>
                                </div>

                                <div class="form-content mb-2">
                                    <label class="mb-1">Количество месяцев осталось</label>
                                    <select v-model.trim="numberOfMonthsLeft" class="form-select form-control">
                                        <option v-for="(item, idx) of numberOfMonthsArr" :key="item">
                                            {{ item }}
                                        </option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>

                    <button class="btn btn-danger">{{ !$route.params.edite ? 'Добавить автомобиля' : 'Редактировать автомобиля' }}</button>
                </form>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Mixins } from "vue-property-decorator";
import LoaderComponent from '@/components/LoaderComponent.vue';
import AddCarMixin from "@/mixins/add-car-mixin";

@Component({
    components: {
        LoaderComponent
    }
})
export default class AddCar extends Mixins(
    AddCarMixin
) {}

</script>

<style lang="sass" scoped>

@import ../../style/pages/add-car

</style>