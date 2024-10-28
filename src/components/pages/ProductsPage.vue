<template>
    <div>
        <LoaderComponent 
            :loading="pageLoading"
        />

        <div v-if="!pageLoading">
            <h1 class="text-4xl font-medium text-black mb-10">Добавить машину</h1>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import LoaderComponent from '@/components/LoaderComponent.vue';

@Component({
	components: {
		LoaderComponent
	}
})
export default class ProductsPage extends Vue {
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