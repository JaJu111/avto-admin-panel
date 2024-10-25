<template>
    <div>
        <div class="login-page">
            <div class="login-content">
                <img class="mb-3" src="../../assets/KT_Logo.png">
                <h3 class="mb-4 title">Регистрация Kt-Pro</h3>

                <form class="form" @submit.prevent="submitHandler">
                    <span>Имя</span>
                    <input 
                        v-model.trim="userName" 
                        type="text" 
                        :class="['form-control', {'mb-4': !errorName}, {'error-input': errorName}]"
                    >
                    <p v-if="errorName" class="error-text">Введите Имя</p>

                    <span>Фамилия</span>
                    <input 
                        v-model.trim="userFirstName" 
                        type="text" 
                        :class="['form-control', {'mb-4': !errorFirstName}, {'error-input': errorFirstName}]"
                    >
                    <p v-if="errorFirstName" class="error-text">Введите Фамилия</p>

                    <span>Логин</span>
                    <input 
                        v-model.trim="userLogin" 
                        type="text" 
                        :class="['form-control', {'mb-4': !errorLogin}, {'error-input': errorLogin}]"
                    >
                    <p v-if="errorLogin" class="error-text">Введите Логин</p>

                    <span>Пароль</span>
                    <div class="password-eye">
                        <input 
                            v-model.trim="userPassword" 
                            :type="inputType" 
                            :class="['form-control', {'mb-4': !errorPassword}, {'error-input': errorPassword}]"
                        >

                        <i v-if="inputType === 'text'" @click="getInputType" class="fa-solid fa-eye"></i>
                        <i v-if="inputType === 'password'" @click="getInputType" class="fa-solid fa-eye-slash"></i>
                    </div>
                    <p v-if="errorPassword" class="error-text">Введите Пароль</p>

                    <div class="form-bottom">
                        <button class="btn btn-danger" type="submit">Регистрация</button>
                        <span>Есть аккаунт? <router-link to="/">Войти</router-link></span>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Vue, Component, Watch } from 'vue-property-decorator';

@Component
export default class RegisterPage extends Vue {

    userName: string = '';
    userFirstName: string = '';
    userPassword: string = '';
    userLogin: string = '';
    errorName: boolean = false;
    errorFirstName: boolean = false;
    errorLogin: boolean = false;
    errorPassword: boolean = false;
    inputType: string = 'password';

    submitHandler() {
        let user = {
            name: this.userName,
            firstName: this.userFirstName,
            login: this.userLogin,
            password: this.userPassword
        }

        if (!user.name) {
            this.errorName = true;
        } else {
            this.errorName = false;
        }

        if (!user.firstName) {
            this.errorFirstName = true;
        } else {
            this.errorFirstName = false;
        }

        if (!user.login) {
            this.errorLogin = true;
        } else {
            this.errorLogin = false;
        }

        if (!user.password) {
            this.errorPassword = true;
        } else {
            this.errorPassword = false;
        }

        if (user.name && user.password && user.firstName && user.login) {
            this.$router.push({
                name: 'home',
                params: {
                    path: '/home'
                }
            });

            sessionStorage.setItem('user', JSON.stringify(user));

            this.userName = this.userPassword = this.userFirstName = this.userLogin = '';
        }
    }

    getInputType() {
        if (this.inputType === 'password') {
            this.inputType = 'text';
        } else {
            this.inputType = 'password';
        }
    }

    @Watch('userName')
    getUserName(val: string): void {
        if (val) {
            this.errorName = false;
        }
    }

    @Watch('userPassword')
    getUserPassword(val: string): void {
        if (val) {
            this.errorPassword = false;
        }
    }

    @Watch('userFirstName')
    getUserFirstName(val: string): void {
        if (val) {
            this.errorFirstName = false;
        }
    }

    @Watch('userLogin')
    getUserLogin(val: string): void {
        if (val) {
            this.errorLogin = false;
        }
    }
}

</script>

<style lang="sass" scoped>

@import ../../style/pages/login

</style>