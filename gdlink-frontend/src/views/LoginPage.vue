<template>
  <div class="d-flex flex-row">
    <div class="show-bg flex-fill w-60">
      <h1 class="text-primary text-center">Welcome to<br> 
        <strong>UTM Res
      <svg width="0.7em" height="0.7em" viewBox="0 0 26 24" fill="none" xmlns="http://www.w3.org/2000/svg" style="vertical-align: middle; margin-left: -10px; margin-right: -12px;">
        <path d="M15.4383 8.99912V10.499C15.4383 10.8083 15.164 11.0614 14.8288 11.0614H11.985V13.6862C11.985 13.9955 11.7107 14.2486 11.3756 14.2486H9.75048C9.4153 14.2486 9.14107 13.9955 9.14107 13.6862V11.0614H6.29718C5.96201 11.0614 5.68778 10.8083 5.68778 10.499V8.99912C5.68778 8.68978 5.96201 8.43668 6.29718 8.43668H9.14107V5.81193C9.14107 5.50259 9.4153 5.24949 9.75048 5.24949H11.3756C11.7107 5.24949 11.985 5.50259 11.985 5.81193V8.43668H14.8288C15.164 8.43668 15.4383 8.68978 15.4383 8.99912ZM25.6458 22.3431L24.2086 23.6696C23.7312 24.1101 22.9593 24.1101 22.487 23.6696L17.4188 18.9966C17.1903 18.7857 17.0633 18.4998 17.0633 18.1998V17.4358C15.2707 18.7294 13.0159 19.4981 10.563 19.4981C4.72796 19.4981 0 15.1345 0 9.74905C0 4.36364 4.72796 0 10.563 0C16.3981 0 21.126 4.36364 21.126 9.74905C21.126 12.0129 20.2932 14.0939 18.8915 15.7485H19.7193C20.0443 15.7485 20.3541 15.8656 20.5826 16.0766L25.6458 20.7495C26.1181 21.1901 26.1181 21.9025 25.6458 22.3431ZM17.4696 9.74905C17.4696 6.22439 14.382 3.37467 10.563 3.37467C6.74408 3.37467 3.65643 6.22439 3.65643 9.74905C3.65643 13.2737 6.74408 16.1234 10.563 16.1234C14.382 16.1234 17.4696 13.2737 17.4696 9.74905Z" fill="black"/>
      </svg>
      urce Center</strong></h1>
      <p class="text-center">Share link is caring — spread your caring by sharing your Google Drive link!</p>
      <p class="text-end me-5">-Kwek Jia Cong-</p>
    </div>
      <div class="flex-fill d-flex align-items-center justify-content-center w-40">
      <div id="loginPage">
        <div class="mb-4">
          <h2 class="text-primary"><b><u>Login</u></b></h2>
        </div>
  
        <form @submit.prevent="login">
          <div v-if="message" class="alert alert-danger" role="alert">
            {{ message }}
          </div>
          <div class="mb-3">
            <label for="userId" class="form-label"><b>User ID</b></label>
            <div class="form-input">
              <i class="bi bi-person bi-solid"></i>
              <input id="userId" type="text" class="form-control" v-model="userId" placeholder="Enter Matric No / Staff ID"/>
            </div>
          </div>
  
          <div class="mb-3">
            <label for="password" class="form-label"><b>Password</b></label>
            <div class="form-input">
              <i class="bi bi-key bi-solid"></i><i :class="`bi ${passIcon} bi-hide`" @click="pass"></i>
              <input id="password" :type="inputType" class="form-control" v-model="password" placeholder="Enter Password"/>
            </div>
          </div>

          <div class="mb-3">
            <input type="checkbox" id="rmbMe" name="rmbMe" value="rmbMe">
            <label for="rmbMe" class="ms-1 move-middle">Remember Me</label>
          </div>

          <button type="submit" class="btn btn-red text-white w-100"><b>Login</b></button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import LoginService from '@/service/LoginService';

 export default {
    data() {
      return {
        userId: '',
        password: '',
        message: null,
        inputType: 'password',
        passIcon: 'bi-eye-slash',
        hide: true
      };
    },
    methods: {
      pass(){
        if(this.hide){
          this.inputType = 'text';
          this.hide = false;
          this.passIcon = 'bi-eye';
        }
        else{
          this.inputType = 'password';
          this.hide = true;
          this.passIcon = 'bi-eye-slash';
        }
      },
      async login() {
        try {
          const data = await LoginService.loginWithDbCheck(this.userId, this.password);

          if(data.success){
            sessionStorage.setItem('utmwebfc_session', JSON.stringify(data.user));
            this.$router.push('/');
          }
          if(data.loginType) {
            const data2 = await LoginService.loginWithDefaultPass(this.userId, this.password);
            const loginType = data.loginType;
            console.log(data2.success);
            if(data2.success){
              if(loginType === 'default login')
                this.handleExistingLogin(data.user);
              else if(loginType === 'first time login')
                await this.handleFirstTimeLogin(data2.user);
            }else{
              this.message = data2.message;
              return;
            }
          }
          this.message = data.message;
        } catch (error) {
          this.message = 'Error fetching data.';
          console.error(error);
        }
      },
    async handleFirstTimeLogin(instance) {
      try {
        const data = await LoginService.firstTimeLogin(instance);

        if (data.success) {
          sessionStorage.setItem('utmwebfc_session', JSON.stringify(data.$eluser));
          this.$router.push('/');
        } 
      } catch (error) {
        this.message = 'Error occurred.';
        console.error(error);
      }
    },
    handleExistingLogin(user) {
      sessionStorage.setItem('utmwebfc_session', JSON.stringify(user));
      this.$router.push('/');
  }
}

  }
  </script>
  
  <style scoped>

  .show-bg{
      background-image: url('../assets/loginbg.jpg');
      height: 100vh;  
      background-size: cover;
      background-position: center center;
      background-repeat: no-repeat;
      display: flex; 
      flex-direction: column; 
      justify-content: center;  
  }

  .text-primary{
    color: black !important;
  }

  #loginPage{
    width:50%
  }

  .form-control{
    background-color: #F3F4F6;
  }

  .move-middle {
  position: relative;
  top: -1px; 
  }

  .btn-red{
    background-color: #D36B6C;
  }

  .bi-solid{
    position: absolute;
    left: 6px;
    font-size: 20px
  }

  .bi-hide{
    position: absolute;
    right: 10px;
    font-size: 20px
  }

  input{
    padding: 5px 10px 5px 30px;
  }

  .form-input{
    position: relative;
    display: flex;
    align-items: center;
    width: 100%;
    justify-content: center;
  }

  .w-60{
    width: 60%;
  }

  .w-40{
    width: 40%;
  }
  </style>
  