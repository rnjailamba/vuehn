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
    Vue.component('Item', Item);

    var data = {
        name: 'Industries',
        children: [{
                "id": "11",
                "name": "Agricultura",
                "children": [{
                    "id": "111",
                    "name": "Siembra de soya",
                    "children": [{
                        "id": "1111",
                        "name": "Siembra de soya"
                    }]
                }]
            }, {
                "id": "97",
                "name": "Otros",
                "children": [{
                    "id": "971",
                    "name": "Otros perecederos"
                }, {
                    "id": "972",
                    "name": "Otros servicios",
                    "children": [{
                        "id": "9721",
                        "name": "Servicios varios"
                    }]
                }]
            }
        
        ]
    }


    export default {
        components: {
            'item': Item
        },
        data () {
            return {
                treeData: data
            }
        },        
        methods: {
            hide: function() {
                
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