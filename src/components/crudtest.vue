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
                                <input id="title" type="text" class="validate" v-model="title">
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
            <center v-if="!boards">
                <h2>No Data</h2>
            </center>
            <div class="col s12" v-for="(board, index) in boards" :key="index" @click="doDelete(index)">
                {{ index }}
                {{ board.name }} <br/>
            </div>
        </div>
    </div>
</template>
<script>
    import _ from 'lodash'
    import firebase from './../service/firebase'
    export default {
        data: function () {
            return {
                title: ''
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
                this.$store.dispatch('addBoard', {title: this.title})
            },
            doUpdate: function () {
                firebase.database.ref('boards').update({
                    'uid-1': {
                        'name': this.title
                    }
                })
            },
            doDelete: function (id) {
                firebase.database.ref('boards/' + id).remove()
            }
        },
        mounted: function () {
            this.$store.dispatch('syncBoards')
        },
        beforeDestroy: function () {
            this.$store.dispatch('stopSyncBoards')
        },
        computed: {
            boards () {
                return this.$store.getters.getBoards
            }
        }
    }
</script>
