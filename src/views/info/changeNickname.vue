<template>
  <div class="container">
  <van-nav-bar title="" left-text="更改名字"  right-text="更改" left-arrow @click-left="onClickLeft" @click-right="onClickRight">
     <van-button slot="right" type="primary" size="small" v-if="!isDisabled">更改</van-button>
     <van-button slot="right" type="default"  size="small" v-else :disabled="true">更改</van-button>
  </van-nav-bar>
  <van-field v-model="value" maxlength="10" class="input"/>
  <div class="tips">好名字更容易让别人记住你</div>
  </div>
</template>

<script>
import {Toast} from 'vant'
import {mapState} from 'vuex'
export default {
    data() {
        return{
            isDisabled: true,
            value: '',
            nickName: '',
        }
    },
    computed: {
      ...mapState(["user"])
    },
    mounted() {
      this.value = this.user.userInfo.nickName;
      this.nickName = this.user.userInfo.nickName;
    },
    methods: {
        onClickLeft() {
          this.$router.go(-1)
        },
        onClickRight() {
          if(!this.isDisabled){
            let params = {
              nickName: this.value
            }
           this.$store.dispatch('user/updateNickname', params).then(rsp => {
              if(rsp.code === 200) {
                Toast.success('更改成功')
                this.$store.dispatch('user/getInfo').then(rsp => {
                  if(rsp.code === 200) {
                     this.$router.push('/info')
                  }
                })
               
              }else{
                Toast.fail('更改失败')
              }
           })
          }
            
        }
    },
    watch: {
        value(newVal, oldVal) {
            if(newVal !== this.nickName) {
                this.isDisabled = false
            }else{
                this.isDisabled = true
            }
        }
    }
}
</script>

<style lang="scss" scoped>
 .input{
        caret-color: #6190e8;
        margin-top: 20px;
        font-size: 16px;
        border-bottom: 1px solid #6190e8;
        width: 96%;
        margin-left: 2%;
    }
    .tips{
        margin: 10px 20px;
        color: #b3b1b1;
        font-size: 13px;
    }
// 重置van-bar
.van-nav-bar {
  background: #6190e8;
  .van-nav-bar__title {
    color: #ffffff;
  }
  .van-icon {
    color: #ffffff;
  }
  .van-nav-bar__text {
    color: #ffffff;
  }
}
</style>