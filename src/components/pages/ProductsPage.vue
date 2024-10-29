<template>
    <div>
        <LoaderComponent 
            :loading="pageLoading"
        />

        <div v-if="!pageLoading">
            <h1 v-if="!$route.params.edite" class="text-2xl font-medium text-black mb-8">Добавить машину</h1>
            <h1 v-else class="text-2xl font-medium text-black mb-8">Редактировать машину</h1>

            <div>
                <h1>{{ carInfo.car }}</h1>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import LoaderComponent from '@/components/LoaderComponent.vue';
import { SalesInfo } from "@/mixins";

@Component({
	components: {
		LoaderComponent
	}
})
export default class ProductsPage extends Vue {
    carInfo: SalesInfo = JSON.parse(sessionStorage.getItem("carInfo")) || {};
    pageLoading: boolean = false;
    
    created() {
		this.pageLoading = true;

        setTimeout(() => {
            this.pageLoading = false;
        }, 1000);
	}
}

</script>

<style lang="sass" scoped>

</style>