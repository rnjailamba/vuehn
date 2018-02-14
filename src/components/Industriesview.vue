<template>
    <div id="test">
        <h2>{{msg}}</h2>
        <button v-on:click="deleteIndustries">Delete all data</button>
        <ul id="demo">
            <item
                class="item"
                :model="treeData">
            </item>
        </ul>
    </div>
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
    var base_url = 'https://drfbackend.herokuapp.com/industries/';

    export default {
        components: {
            'item': Item
        },
        data() {
            return {
                treeData: {
                    "name": "industries"
                },
                msg: "All Industries Data [Click on any child industry to simulate industry/xyz api and view the subtree]"
            }
        },
        created() {
            if (!localStorage.getItem('token')) {
                Vue.swal('Please Login to view!');
                Router.push({
                    name: 'Login'
                })
            } else
                this.fetchData()
        },
        methods: {
            fetchData() {
                axios.get(base_url,{
                        headers: { 'Authorization': 'Token ' + localStorage.getItem('token') }})                
                    .then((resp) => {
                        this.treeData = {};
                        this.treeData["name"] = "industries";
                        this.treeData["children"] = resp.data["industries"];
                    })
                    .catch((err) => {
                        Vue.swal('Error!', 'This is our fault, will get fixed soon..', 'error');
                    })              
            },
            deleteIndustries() {
                axios.delete(base_url+'delete', {
                        headers: 
                        { 
                            Authorization: 'Token ' + localStorage.getItem('token') 
                        }
                    })
                    .then((response) => {
                        Vue.swal(
                            'Deleted!',
                            'All data has been deleted.',
                            'success'
                        )
                        this.treeData = {
                            "name": "industries"
                        }
                    })
                    .catch((error) => {
                        Vue.swal('Error!', 'This is our fault, will get fixed soon..', 'error');
                    });            
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
    #test {
        width: 330px;        
    }
    h2 {
        margin-right: 0;
        display: inline-block;
    }
    button {
        float: right;
        margin-top: 25px;
    }
</style>