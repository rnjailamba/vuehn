<template>
    <ul id="demo">
        <h2>{{msg}}</h2>
        <item
            class="item"
            :model="treeData">
        </item>
    </ul>
</template>

<!-- item template -->
<script>
    import Item from './Industriesitem.vue';
    import Vue from 'vue'
    import axios from 'axios'
    import Router from '../router';
    import VueSweetalert2 from 'vue-sweetalert2';

    Vue.use(VueSweetalert2);
    Vue.component('Item', Item);
    var data = []

    export default {
        components: {
            'item': Item
        },
        data() {
            return {
                treeData: {
                    "name": "industries"
                },
                msg: ''
            }
        },
        watch: {
            '$route': 'fetchData'
        },
        created() {
            if (!localStorage.getItem('token')) {
                Vue.swal('Please Login to view!');
                Router.push({
                    name: 'Login'
                })
            } else {
                this.fetchData();
            }
        },
        methods: {
            fetchData() {
                if(!this.$route.params.id){
                    Router.push({
                        name: 'Industriesview'
                    })
                }
                else{
                    this.msg = "Industries under industry id - " + this.$route.params.id;    
                    axios.get('https://drfbackend.herokuapp.com/industries/' + this.$route.params.id + '/' ,{
                        headers: { 'Authorization': 'Token ' + localStorage.getItem('token') }})
                        .then((resp) => {
                            this.treeData = {};
                            this.treeData["name"] = "industries";
                            this.treeData["children"] = resp.data["industries"];
                        })
                        .catch((err) => {
                            Vue.swal('Error!', 'This is our fault, will get fixed soon..', 'error');
                        })
                }
            }
        }
    }
</script>

<style scoped>
    body {
        font-family: Menlo, Consolas, monospace;
        color: #444;
    }

    .item {
        cursor: pointer;
    }

    .bold {
        font-weight: bold;
    }

    ul {
        padding-left: 1em;
        line-height: 1.5em;
        list-style-type: dot;
    }
</style>