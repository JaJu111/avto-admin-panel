<template>
    <div :class="['main', {'hide-aside': hideAside}]">
        <div
            class="hide-box"
            @click="toggleHideAside"
        >
            <i v-if="!hideAside" class="fa-solid fa-arrow-left"></i>
            <i v-if="hideAside" class="fa-solid fa-arrow-right"></i>
        </div>

        <div :class="['main-box', {'hide': hideAside}]">
            <router-link to="/home">
                <div :class="['main-aside-top', {'hide': hideAside}]">
                    <img src="../assets/car-logo.png">
                </div>
            </router-link>

            <div class="main-bottom">
                <ul :class="['main-aside', {'hide': hideAside}]">
                    <router-link to="/home">
                        <li 
                            class="rounded-md" 
                            :class="{'text-white': $route.path === '/home' || $route.path === '/home/car-info'}"
                        >
                            <i class="fa-solid fa-house"></i> <span v-if="!hideAside">Аренда</span>
                        </li>
                    </router-link>

                    <router-link to="/products">
                        <li 
                            class="rounded-md" 
                            :class="{'text-white': $route.path === '/products' || $route.path === '/products/info'}"
                        >
                            <i class="fa-solid fa-car-side"></i> <span v-if="!hideAside">Добавить машину</span>
                        </li>
                    </router-link>
                </ul>

                <div :class="['main-aside-bottom', {'hide': hideAside}]">
                    <ul class="main-aside">
                        <div :class="['user', {'hide': hideAside}]">
                            <div class="user-img-box">
                                <span>{{ setLetter() }}</span>
                            </div>
                            <h1 v-if="!hideAside" class="user-title">{{ truncateText(USER.login) }}</h1>
                        </div>

                        <div :class="['line', {'hide': hideAside}]">
                            <div class="line-box"></div>
                        </div>

                        <router-link to="/">
                            <li
                                class="log-out" 
                            >
                                <i class="fa-solid fa-right-to-bracket"></i> <span v-if="!hideAside">{{ $t('home.logOut') }}</span>
                            </li>
                        </router-link>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Mixins } from "vue-property-decorator";
import SetLetter from "@/mixins/set-letter";

@Component
export default class AsideLeftComponent extends Mixins(
    SetLetter
) {
    hideAside: boolean = false;

    toggleHideAside(): void {
        this.hideAside = !this.hideAside;

        this.$emit('hide-aside', this.hideAside);
    }

    truncateText(text: string): string {
        const maxLength = 12;

        if (text.length > maxLength) {
            return text.substring(0, maxLength) + '...';
        }

        return text;
    }
}

</script>

<style lang="sass" scoped>

@import ../style/aside-left-component
    
</style>