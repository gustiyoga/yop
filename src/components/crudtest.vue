<template>
    <div>
        <div class="row">
            <div class="col s12 page-title cyan-text">
                <h1>Testing</h1>
            </div>
        </div>
        <div class="row">
            <div class="col s12">
                <div class="card">
                    <div class="card-content">
                        <form action="javascript:;">
                            <div class="input-field">
                                <i class="material-icons prefix">mail_outline</i>
                                <input id="title" type="text" class="validate" v-model="title" v-on:keyup.enter="doPost">
                                <label for="title">Judul</label>
                            </div>
                            <button type="submit" class="btn waves-effect waves-light orange darken-1 btn-action" @click="doPost">
                                Add
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col s12" v-for="(board, index) in boards" :key="index">
                {{ index }} <br/>
                {{ board.name }}
            </div>
        </div>
    </div>
</template>
<script>
    import database from './../service/database'
    import firebase from './../service/firebase'
    import _ from 'lodash'
    
    var asd = []
    export default {
        data: function () {
            return {
                'title': ''
            }
        },
        methods: {
            showToast: function (string) {
                M.toast({
                    html: string,
                    displayLength: 5000
                })
            },
            doPost: function () {
                console.log(this.boards)
            }
        },
        mounted: function () {
            // this.data = this.boardsData()
        },
        computed: {
            boards () {
                return this.$store.getters.getBoards
            }
        }
    }
</script>
