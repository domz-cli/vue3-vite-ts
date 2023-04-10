<template>
    <div class="login_bg">
        <div class="login_adv" :style="{ backgroundImage: `url(${imagePath})` }">
            <div class="login_adv__title">
                <h2></h2>
            </div>
            <div class="login_adv__bottom">Copyright © dom 1.0</div>
        </div>
        <div class="login_main">
            <div class="login-form">
                <div class="login-header">
                    <div class="logo">
                        <img alt="vue3+ts管理后台" src="@/assets/img/logo2.png" />
                        <label>vue3+ts管理后台</label>
                    </div>
                </div>
                <el-form :model="form" label-width="0" size="large">
                    <el-form-item prop="user">
                        <el-input v-model="form.username" prefix-icon="el-icon-user" clearable placeholder=""></el-input>
                    </el-form-item>
                    <el-form-item prop="password">
                        <el-input v-model="form.password" prefix-icon="el-icon-lock" clearable show-password placeholder=""></el-input>
                    </el-form-item>
                    <el-form-item prop="verCode">
                        <el-input v-model="form.verCode" class="code-box" prefix-icon="el-icon-aim" clearable placeholder="">
                            <template #append>
                                <img :src="codeUrl" class="login-code" />
                            </template>
                        </el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" style="width: 100%" round @click="submit">登录</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref, Ref } from 'vue';
import { type ILoginData, getCaptcha, login } from '@/api/login';
import tool from '@/utils/tool';
import { useRouter } from 'vue-router';
import { ElMessage, ElMessageBox } from 'element-plus';

import imagePath from '@/assets/img/auth_banner.jpg';

const codeUrl = ref('');

const router = useRouter();

const env = import.meta.env.VITE_NODE_ENV;
const form: ILoginData = reactive({
    form: 'DMP',
    username: env === 'development' ? 'Administrator' : '',
    password: env === 'development' ? 'HSD&123456' : '',
    verCode: env === 'development' ? '6666' : '',
    uuid: '',
});

onMounted(() => {
    getCaptcha()
        .then((res: any = {}) => {
            codeUrl.value = 'data:image/gif;base64,' + res.data.captcha;
            form.uuid = res.data.uuid;
        })
        .catch((e) => console.log(e));
});
const submit = (): void => {
    // console.log('提交操作,', form);
    const token = 'defagassdfa';

    tool.data.set('TOKEN', token);
    tool.data.set('USER_INFO', {
        id: 1,
        userName: 'name',
    });
    ElMessage.success(`登录成功`);
    router.push('/');
    // login(form)
    //     .then((res: any) => {
    //         if (res.code == 200) {
    //             tool.data.set('TOKEN', res.data.token);
    //             tool.data.set('USER_INFO', {
    //                 id: res.data.id,
    //                 userName: res.data.name,
    //                 deptName: res.data.deptName,
    //                 postName: res.data.postName,
    //                 deptId: res.data.deptId,
    //             });
    //         } else tool.data.set('TOKEN', token);
    //         ElMessage.success(`登录成功`);
    //         router.push('/');
    //     })
    //     .catch((e) => {
    //         router.push('/');
    //     });
};
</script>
<style scoped lang="scss">
.login_bg {
    width: 100%;
    height: 100%;
    background: #fff;
    display: flex;
}

.login_adv {
    /*width: 65%;*/
    width: 33.33333%;
    background-color: #555;
    background-size: cover;
    background-position: center center;
    background-repeat: no-repeat;
    position: relative;

    .login_adv__title {
        color: #fff;
        padding: 40px;

        h2 {
            font-size: 40px;
        }

        h4 {
            font-size: 18px;
            margin-top: 10px;
            font-weight: normal;
        }

        p {
            font-size: 14px;
            margin-top: 10px;
            line-height: 1.8;
            color: rgba(255, 255, 255, 0.6);
        }

        div {
            margin-top: 10px;
            display: flex;
            align-items: center;

            span {
                margin-right: 15px;
            }

            i {
                font-size: 40px;
            }

            i.add {
                font-size: 20px;
                color: rgba(255, 255, 255, 0.6);
            }
        }
    }

    .login_adv__bottom {
        position: absolute;
        left: 0px;
        right: 0px;
        bottom: 0px;
        color: #fff;
        padding: 40px;
        background-image: linear-gradient(transparent, #000);
    }
}

.login_main {
    flex: 1;
    display: flex;

    .login-form {
        width: 400px;
        margin: auto;
        padding: 20px 0;

        .login-header {
            margin-bottom: 20px;

            .logo {
                display: flex;
                align-items: center;

                img {
                    width: 40px;
                    /*height: 55px;*/
                    height: auto;
                    vertical-align: bottom;
                    margin-right: 10px;
                }
            }

            label {
                font-size: 24px;
            }

            h2 {
                font-size: 20px;
                font-weight: bold;
                margin-top: 50px;
            }
        }
    }
}

::v-deep(.code-box) {
    .el-input-group__append {
        background: #fff;
    }
}

@media (max-width: 1200px) {
    .login-form {
        width: 340px;
    }
}

@media (max-width: 1000px) {
    .login_main {
        display: block;
    }

    .login-form {
        width: 100%;
        padding: 20px 40px;
    }

    .login_adv {
        display: none;
    }
}

::v-deep.el-input-group__append,
.el-input-group__prepend {
    background-color: transparent;
    border-width: 1px;
    border-color: #dcdfe6;
    border-top-style: solid;
    border-right-style: solid;
    border-bottom-style: solid;
    padding: 0;
}

.login-code {
    width: 84px;
    padding: 1px 3px;
    float: left;
    border-radius: 0 4px 4px 0;
    cursor: pointer;
}
</style>
