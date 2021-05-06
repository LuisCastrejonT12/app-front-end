<template>
    <div class="user-list-content">
        <div class="user-list-container">
            <div v-on:click="getUserInfo(usuario.id)" class="user-item" v-for="usuario in UserList" :key="usuario.id">
                <div class="user-avatar-content">
                    <img class="user-avatar" :src="usuario.avatar" alt="avatar usuario">
                </div>
                <h2 class="user-name">{{ usuario.first_name}} {{ usuario.last_name}}</h2>
                <p class="user-desc">{{ usuario.email }}</p>
            </div>
        </div>
    </div>
    <div id="sidebar" :class="{'active':ShowSidebar}">
        <div class="sidebar-user">
            <i class='bx bx-x bx-sm' v-on:click="closedUserModal()"></i>
            <div class="side-user-photo">
                <img v-if="UserDetail" :src="UserDataDetail.data.avatar" >
            </div>
            <div class="sidebar-user-name">
                <h3 v-if="UserDetail">{{UserDataDetail.data.first_name}} {{UserDataDetail.data.last_name}}</h3>
            </div>
            <div class="sidebar-user-desc">
                <p v-if="UserDetail" class="side-user-desc">{{UserDataDetail.data.email}}</p>
            </div>
            <div v-if="UserPostDetail" class="sidebar-post-content">
                <div class="sidebar-post-item" v-for="post in UserPostData" :key="post.id">
                    <p class="sidebar-post-desc">{{post.body}}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
export default {
    name: "ListadoUsuarios",
    data(){
        return {
            UserList: null,
            UserDetail: null,
            UserPostDetail: null,
            UserDataDetail: "",
            UserPostData: "",
            ShowSidebar: null,
        }
    },
    methods: {
        getUserInfo: function (UId) {
            axios.get('/reqres/api/users/'+UId).then(res => {
                this.UserDetail = true;
                this.UserDataDetail = res.data;
            }).catch(err => {
                console.log(err);
            });

             axios.get('/jsonplaceholder/posts?userId='+UId).then(res => {
                this.UserPostDetail = true;
                this.UserPostData = res.data;
                this.ShowSidebar = true;
            }).catch(err => {
                console.log(err);
            });

        },
        closedUserModal: function () {
            this.ShowSidebar = null;
        },
    },
    mounted: function(){
        axios.get('/reqres/api/users?page=2').then(res => {
            this.UserList = res.data.data;
        }).catch(err => {
            console.log(err);
        });
    }
}
</script>
<style lang="less">
.user-list-content {
    padding: 7% 0;
    .user-list-container {
        display: grid;
        width: 90%;
        max-width: 1160px;
        margin: 0 auto;
        grid-gap: 20px;
        .user-item {
                padding: 3%;
                border-radius: 5px;
                transition: all 0.3s;
            .user-avatar {
                width: 170px;
                height: 170px;
                border-radius: 50%;
                object-fit: cover;
                -webkit-transition: .3s ease-in-out;
                transition: .3s ease-in-out;
            }
            .user-name {
                margin-bottom: 10px;
            }
            .user-desc {
                margin-top: 10px;
            }
            &:hover .user-name{
                    color: #2d6398;
            }
            &:hover {
                background: #f5f5f5;
                cursor: pointer;
            }
        }
    }
}

#sidebar {
    position: fixed;
    top: 10%;
    background: #fff;
    height: 100vh;
    max-width: 250px;
    right: -100%;
    border: 1px solid #b9b9b9;
    padding: 30px;
    overflow-y: scroll;
    transition: all 1s;
    &.active{
        right: 0;
    }
    .bx-x{
        position:absolute;
        left: 20px;
        &:hover{
            cursor: pointer;
        }
    }
    .side-user-photo{
        img{
            width: 128px;
            height: 128px;
            object-fit: cover;
            border-radius: 50%;
        }
    }
    .sidebar-post-item{
        border-top: solid 1px;
        border-color: #b3b3b3;
        .sidebar-post-desc {
            font-size: 0.7em;
        }
    }
}
/* Small devices (tablets, 768px and up) */
@media (min-width: 450px){
    .user-list-container {
        grid-template-columns: repeat(1, 1fr);
    }
    #sidebar{
        width: 55%;
    }
}
/* Medium devices (tablets, 768px and up) */
@media (min-width: 768px){
    .user-list-container {
        grid-template-columns: repeat(2, 1fr);
    }
}
/* Large devices (laptops/desktops, 992px and up) */
@media (min-width: 992px) {
     .user-list-container {
        grid-template-columns: repeat(3, 1fr);
    }
     #sidebar{
        width: 25%;
    }
}
</style>