<template>
<div class="login-content">
    <div class="login-container">
        <div class="form-content">
            <!-- Tabs Titles -->
            <div class="header-login">
                <h1 class="title">Sign In</h1>
                <p class="login-leggend">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Vero nisi accusamus voluptate.</p>
            </div>

            <div class="alert alert-danger" role="alert" v-if="error_user">
                {{error_msg}}
            </div>
            <!-- Login Form -->
            <form v-on:submit.prevent="login">
                <div class="input-section">
                <input type="text" id="login" class="fadeIn second" name="login" placeholder="Email" v-model="email">
                <label class="error " v-if="error_email">Email incorrecto</label>
                </div>
                <div class="input-section">
                <input type="password" id="password" class="fadeIn third" name="login" placeholder="Password" v-model="password">
                <label class="error " v-if="error_pass">Contraseña incorrecta</label>
                </div>
                <input type="submit" class="btn-login fadeIn fourth" value="Log In">
            </form>

            <!-- Remind Passowrd -->
            <div id="formFooter">
                <a class="underlineHover" href="#">Forgot Password?</a>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'Login',
  components: {

  },
  data: function(){
    return {
      email: "",
      password: "",
      error_user: false,
      error_msg: "",
      error_pass: false,
      error_email: false,
    }
  },
  methods: {
    login(){

    let dataJson = {
      "email": this.email,
      "password": this.password
    };

    axios.post('/reqres/api/login/', dataJson).then(res => {
        if(res.data.token){
          localStorage.setItem('token', res.data.token);
          this.$router.push('/');
        }
      }).catch(err => {
        if(err.response.data.error === 'Missing password'){
          console.log(err.response.data);
          this.error_email = false;
          this.error_pass = true;
        }
        else if(err.response.data.error === 'Missing email or username'){
          console.log(err.response.data);
          this.error_email = true;
          this.error_pass = true;
        }
        else if(err.response.data.error === 'user not found'){
          console.log(err.response.data);
          this.error_email = false;
          this.error_pass = false;
          this.error_user = true;
          this.error_msg = err.response.data.error;
        }

      });
    }
  }
}
</script>

<style lang="less">
  .login-content{
    background: #2D6398;
    height: 100vh;
    display: flex;
    align-items: center;
    .login-container{
        max-width: 580px;
        margin: 0 auto;
        padding: 3%;
        background: #F7F8FA;
      .form-content {
        max-width: 400px;
        margin: 0 auto;
        .header-login{
          .title{
            margin: 0 0 25px 0;
            font-size: 2.8em;
            font-weight: bold;
          }
          .login-leggend{
           font-size: 1.2em;
           color: #6b6b6b;
          }
        }
        .alert-danger {
            color: #721c24;
            background-color: #f8d7da;
            border-color: #f5c6cb;
            position: relative;
            padding: .75rem 1.25rem;
            border: 1px solid transparent;
            border-radius: .25rem;
            text-transform: capitalize;
            font-size: 0.8rem;
            font-weight: 400;
            line-height: 1.5;
        }
         form{
          max-width: 400px;
          margin: 0 auto;
          padding-top: 30px;
          .input-section {
              position: relative;
              min-height: 85px;
              max-width: 355px;
              margin: 0 auto;
              margin-bottom: 20px;
            input {
              padding: 15px;
              width: -webkit-fill-available;
              height: 28px;
              border-radius: 7px;
              border: solid 1px #C3C5C6;
            }
            .error {
              position: absolute;
              margin: 0 auto;
              color: #d66182;
              font-size: 1em;
              font-weight: bold;
              text-align: left;
              bottom: 0;
              width: 100%;
              left: 0;
            }
          }
          .btn-login{
              background: #48525E;
              padding: 15px;
              height: 63px;
              border-radius: 5px;
              border: 0;
              color: #fff;
              font-size: 1.3em;
              &:hover{
                cursor: pointer;
                background: #66788e;
              }
          }
        }
        #formFooter {
            padding-top: 30px;
            a {
              color: #6b6b6b;
              font-size: 1em;
            }
        }
      }
    }
  }
/* Small devices (tablets, 300px and up) */
@media (min-width: 300px) {
    .login-container {
      width: 85%;
      .btn-login{
        width: 100%;
        max-width: 350px;
      }
    }
}
/* Medium devices (tablets, 768px and up) */
@media (min-width: 768px) {
  .login-container {
    width: 60%;
    .btn-login {
      width: 350px;
    }
  }
}
</style>