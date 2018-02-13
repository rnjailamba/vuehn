<template>
    <ul id="demo">
        <item
            class="item"
            :model="treeData">
        </item>
    </ul>
</template>

<!-- item template -->
<script >
    import Item from './Industriesitem.vue';
    import Vue from 'vue'
    import axios from 'axios'
    Vue.component('Item', Item);
    var data = []
    export default {
        components: {
            'item': Item
        },
        data () {
            return {
                treeData: {"name":"industries"}
            }
        }, 
        created() {
            this.fetchData()
        },       
        methods: {
            fetchData() {
              axios.get('https://drfbackend.herokuapp.com/industries/'+this.$route.params.id+'/')
              .then((resp) => {
                this.treeData = {};
                this.treeData["name"] = "industries";
                this.treeData["children"] = resp.data["industries"];
              })
              .catch((err) => {
                console.log(err)
              })
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