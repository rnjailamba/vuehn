<template>
    <div id="item-template">
        <li>
            <div
                :class="{bold: isFolder}">
                <span @click="openIndustryPage(model.id)">{{ (model.id || "") +" "+ model.name }}</span>
                <span v-if="isFolder" @click="toggle">[{{ open ? '-' : '+' }}]</span>
            </div>
            <ul v-show="open" v-if="isFolder">
            <item
                class="item"
                v-for="(model, index) in model.children"
                :key="index"
                :model="model">
            </item>
            </ul>
        </li>    
    </div>
</template>

<script>
    import Vue from 'vue'
    import Router from '../router';

    export default {
        template: '#item-template',
        props: {
            model: Object
        },
        data: function() {
            return {
                open: false
            }
        },
        computed: {
            isFolder: function() {
                return this.model.children &&
                    this.model.children.length
            }
        },
        methods: {
            toggle: function() {
                if (this.isFolder) {
                    this.open = !this.open
                }
            },
            openIndustryPage: function(id) {
                Router.push({
                    name: 'Industry',
                    params: {
                        id: id
                    }
                })
            },
            changeType: function() {
                if (!this.isFolder) {
                    Vue.set(this.model, 'children', [])
                    this.addChild()
                    this.open = true
                }
            },
            addChild: function() {
                this.model.children.push({
                    name: 'new stuff'
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