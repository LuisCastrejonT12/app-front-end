<template>
    <div>
        <div :v-if="UserDetail" class="header-album">
            <h1>{{UserDataDetail.data.first_name}} {{UserDataDetail.data.last_name}}</h1>
            <p>{{UserDataDetail.data.email}}</p>
            <div class="header-album-acciones">
                <i class='bx bx-user bx-sm'></i>
                <i class='bx bxs-image-add bx-sm'></i>
            </div>
        </div>

        <div v-if="AlbumsResult" class="album-container">
            <div class="album-item" v-for="album in AlbumsByUser" :key="album.id">
                <div class="album-item-content">
                    <span>{{album.title}}</span>
                </div>
            </div>
        </div>
        
    </div>
</template>
<script>
import axios from 'axios';
export default {
    name: "Album",
    data(){
        return {
            UserDetail: null,
            AlbumsResult: null,
            UserDataDetail: "",
            AlbumsByUser: "",
        }
    },
    async created(){
        let UserId = this.$route.params.id;
        axios.get('/reqres/api/users/'+UserId).then(res => {
            this.UserDataDetail = res.data;
            this.UserDetail = true;
        }).catch(err => {
            console.log(err);
        });

        axios.get('/jsonplaceholder/users/'+UserId+'/albums').then(res => {
            this.AlbumsByUser = res.data;
            this.AlbumsResult = true;
            console.log(res);
        }).catch(err => {
        });
    }
}
</script>
<style lang="less">
.header-album {
    width: 90%;
    margin: 0 auto;
    .header-album-acciones{
        display: flex;
        justify-content: space-between;
        .bx-sm {
            font-size: 1.8rem!important;
        }
    }
}

.album-container {
    display: grid;
    width: 90%;
    margin: 0 auto;
    padding-top: 30px;
    .not-found {
        padding: 10%;
        background: #f1f1f1;
        p{
            color: #847f7f;
        }
    }
    .album-item-content {
        height: 160px;
        width: auto;
        display: flex;
        padding: 5%;
        align-items: flex-end;
        span {
            width: 100%;
            text-align: left;
        }
    }   
}
.album-container.not-result {
    grid-template-columns: auto;
}
.album-item:nth-child(odd){
    background: #EFF0F5;
}
.album-item:nth-child(even){
    background: #E5E9F2;
}
/* Small devices (tablets, 768px and up) */
@media (min-width: 450px){
    .album-container {
        grid-template-columns: repeat(2, 1fr);
    }
}
/* Medium devices (tablets, 768px and up) */
@media (min-width: 768px){
    .album-container {
        grid-template-columns: repeat(3, 1fr);
    }
}
</style>