<template>
    <div class="header-app">
        <div class="header-content">
            <div class="header-brand" href="#">Done</div>
            <div class="navbar">
                <ul class="navbar-nav">
                    <li class="nav-item"><router-link to="/">Home</router-link></li>
                    <li class="nav-item" v-on:click="getUsers()">
                        <a>Album</a>
                        <ul class="dropdown-menu" :class="{'active':UserData}">
                            <li v-for="user in UserDataDetail" :key="user.id">
                                <a :href="'/album/'+user.id">
                                    <img class="user-avatar-nav" :src="user.avatar" :alt="user.first_name">
                                    <p class="user-name-nav">{{ user.first_name}} {{ user.last_name}}</p>
                                </a>
                            </li>
                        </ul>
                    </li>
                    <li class="nav-item"><a href="javascript:void(0)" @click="handleClick"><i class='bx bxs-exit bx-sm' ></i></a></li>
                    <li class="nav-item"><a><i class='bx bx-search bx-sm' ></i></a></li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
export default {
    name: "Header",

    data(){
        return {
            UserData: null,
            UserDataDetail: "",
        }
    },

    methods: {
        getUsers: function(){
            if(this.UserData === null ){
                axios.get('/reqres/api/users?page=2').then(res => {
                    this.UserData = true;
                    this.UserDataDetail = res.data.data;
                }).catch(err => {
                    console.log(err);
                });
            }
            else {
                this.UserData = null;
            }
        },
        handleClick(){
            localStorage.removeItem('token');
            this.$router.go('/login');
        }
    }

}
</script>

<style lang="less">
.header-content {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    height: auto;
    padding: 0 15px;
    background: #fff;
    .header-brand{
        font-size: 1.6em;
        font-weight: bold;
    }
    .navbar{
        display: flex;
        .navbar-nav{
            list-style: none;
            margin: 0;
            padding: 0;
            .nav-item{
                float: left;
                .dropdown-menu {
                    position: fixed;
                    background: #ffffff;
                    top: -100%;
                    border: solid 1px #d2d2d2;
                    padding: 20px 0 !important;
                    transition: all 0.5s;
                    max-width: 250px;
                    right: 5%;
                    li{
                        display: flex !important;
                        a{
                            width: 100%;
                            .user-avatar-nav {
                                width: 50px;
                                height: 50px;
                                border-radius: 50%;
                                margin-right: 15px;
                                object-fit: cover;
                            }
                            .user-name-nav{
                                width: inherit;
                            }
                        }
                    }
                }
            }
        }
        a{
            display: flex;
            padding: 10px 20px;
            color: #000;
            text-decoration: none;
            &.router-link-exact-active{
                background: #c7c7c7;
            }
            &:hover{
                cursor:pointer;
                background: #efefef;
            }
        }
    }
}
/* Small devices (tablets, 300px and up) */
@media (min-width: 300px) {
    .navbar{
        .dropdown-menu {
        width: 80%;
            &.active{
                top: 50px !important;
            }
        }
        a{
            padding: 10px !important;
        }
    }
}
/* Medium devices (Laptops, 1200px and up) */
@media (min-width: 1200px){
    .navbar{
        a {
            padding: 10px 20px !important;
        }
    }
}
</style>