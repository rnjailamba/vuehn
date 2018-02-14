<template>
  <div class="hello">
    <form id="form" v-on:submit.prevent="addUser" v-show="!authenticated">
      <input type="text" v-model="newUser.name" placeholder="Username">
      <input type="text" v-model="newUser.description" placeholder="Description">
      <input type="submit" value="Login">
    </form>
    <ul class="errors" v-show="!authenticated && loginClick">
      <li v-show="!validation.name">Name cannot be empty.</li>
      <li v-show="!validation.description">Please provide a valid description.</li>
    </ul>
    <div v-show="authenticated">
      <p>Authenticated</p>
      <button v-on:click="logout">Logout</button>
    </div>
  </div>
</template>

<script>
    import Vue from 'vue'
    import VueSweetalert2 from 'vue-sweetalert2';
    import axios from 'axios'

    Vue.use(VueSweetalert2);
    var base_url = "https://drfbackend.herokuapp.com/apps/register/";
    // var base_url = "http://127.0.0.1:8000/apps/register/";

    export default {
        name: 'Login',
        data() {
            return {
                msg: '',
                newUser: {
                    name: '',
                    description: '',
                },
                authenticated: false,
                loginClick: false
            }
        },
        created() {
            if (localStorage.getItem('token')){
                this.authenticated = true;
            }
                
        },
        computed: {
            validation: function() {
                return {
                    name: !!this.newUser.name.trim(),
                    description: !!this.newUser.description.trim()
                }
            },
            isValid: function() {
                var validation = this.validation
                return Object.keys(validation).every(function(key) {
                    return validation[key]
                })
            }
        },
        // methods
        methods: {
            addUser: function() {
                if (this.isValid) {
                    this.loginClick = false;
                    axios.post(base_url, JSON.stringify(this.newUser), {
                            headers: {
                                'Content-Type': 'application/json'
                            }
                        })
                        .then((response) => {
                            localStorage.setItem('token', response.data.token);
                            this.authenticated = true;
                            Vue.swal('Success!', 'You have been registered.', 'success');
                        })
                        .catch((error) => {
                            Vue.swal('Error!', 'This is our fault, will get fixed soon..', 'error');
                        });
                    this.newUser.name = ''
                    this.newUser.description = ''
                }
                else{
                    this.loginClick = true;
                }
            },
            logout: function() {
                localStorage.removeItem('token');
                this.authenticated = ''
            }
        }
    }
</script>

<style scoped>
    body {
        font-family: Helvetica, Arial, sans-serif;
    }

    ul {
        padding: 0;
    }

    .user {
        height: 30px;
        line-height: 30px;
        padding: 10px;
        border-top: 1px solid #eee;
        overflow: hidden;
        transition: all .25s ease;
    }

    .user:last-child {
        border-bottom: 1px solid #eee;
    }

    .v-enter,
    .v-leave-active {
        height: 0;
        padding-top: 0;
        padding-bottom: 0;
        border-top-width: 0;
        border-bottom-width: 0;
    }

    .errors {
        color: #f00;
    }
</style>