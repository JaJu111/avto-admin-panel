<template>
    <div>
        <div class="login-page">
            <div class="login-content">
                <img class="mb-3" src="../../assets/car-logo.png">

                <form class="form" @submit.prevent="submitHandler">
                    <span>Логин</span>
                    <input 
                        v-model.trim="userName" 
                        type="text" 
                        :class="['form-control', {'mb-4': !errorName}, {'error-input': errorName}]"
                    >
                    <p v-if="errorName" class="error-text">Введите Логин</p>

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
                        <button class="btn btn-danger" type="submit">Войти</button>
                        <span>Нет аккаунт? <router-link to="/register">Зарегистрироваться</router-link></span>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Vue, Component, Watch } from 'vue-property-decorator';

@Component
export default class LoginPage extends Vue {

    userName: string = '';
    userPassword: string = '';
    errorName: boolean = false;
    errorPassword: boolean = false;
    inputType: string = 'password';

    submitHandler() {
        let user = {
            login: this.userName,
            password: this.userPassword
        }

        if (!user.login) {
            this.errorName = true;
        } else {
            this.errorName = false;
        }

        if (!user.password) {
            this.errorPassword = true;
        } else {
            this.errorPassword = false;
        }

        if (user.login && user.password) {
            this.$router.push({
                name: 'home',
                params: {
                    path: '/home'
                }
            });

            sessionStorage.setItem('user', JSON.stringify(user));

            this.userName = this.userPassword = '';
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
}

</script>

<style lang="sass" scoped>

@import ../../style/pages/login

</style>