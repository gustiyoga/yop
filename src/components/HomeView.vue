<template>
    <div>
        <div class="row">
            <div class="col s12 page-title cyan-text">
                <h1>Your Boards</h1>
            </div>
            <!-- <div class="col s12 m4 offset-m4">
                <div class="input-search">
                    <input type="search">
                </div>
            </div> -->
        </div>
        <div class="row">
            <div v-for="picture in this.pictures" class="col s12 m6 l4 xl3" :key="picture.id">
                <div class="card hoverable card--mod">
                    <div class="card-image waves-effect waves-block waves-light" @click="displayDetails(picture.id)">
                        <img v-if="picture.url" class="card-image--mod image--object-fit" :src="picture.url" :alt="picture.comment">
                        <div v-if="!picture.url" :class="'card-color-background ' + (picture.color ? picture.color : 'blue')"></div>
                        <div :class="'card-title card-title--mod text-ellipsis text-ellipsis--2 ' + ( picture.url ? 'card-title--mod-dark' : '')">
                            {{ picture.comment }}
                        </div>
                    </div>
                    <!-- <div class="card-content card-content--mod">
                        <span class="card-title grey-text text-darken-4 card-title--mod">
                            <a class="cursor--pointer text-ellipsis text-ellipsis--2" @click="displayDetails(picture.id)" :title="picture.comment">{{ picture.comment }}</a>
                            <!-- <i class="material-icons right cursor--pointer card__dropdown-trigger orange-text" :data-target="'card__dropdown-'+picture.id">more_vert</i> -//->
                        </span>
                        <!-- Dropdown Structure -//->
                        <!-- <ul :id="'card__dropdown-'+picture.id" class='dropdown-content'>
                            <li>
                                <a href="javascript:;" class="cyan-text" @click="doEdit(picture.id)">
                                    <i class="material-icons">mode_edit</i> Edit
                                </a>
                            </li>
                            <li class="divider"></li>
                            <li>
                                <a href="javascript:;" class="red-text" @click="doDelete(picture.id)">
                                    <i class="material-icons">delete</i>Delete
                                </a>
                            </li>
                        </ul> -//->
                    </div> -->
                </div>
            </div>
            <div class="fixed-action-btn"> 
                <router-link class="btn-floating btn-large waves-effect waves-light orange" to="/post">
                    <i class="material-icons">edit</i>
                </router-link>
            </div>
        </div>
    </div>
</template>
<script>
    import _ from 'lodash'
    import data from '../data'
    import M from './../../static/js/materialize.min.js'
    export default {
        data: function () {
            return {
                pictures: data.pictures
            }
        },
        methods: {
            displayDetails: function (id) {
                this.$router.push({name: 'detail', params: { id: id }})
            }
            // showToast: function (string) {
            //     M.toast({
            //         html: string,
            //         displayLength: 5000
            //     })
            // },
            // doEdit: function (id) {
            //     this.showToast('Edit ' + id)
            // },
            // doDelete: function (id) {
            //     this.showToast('Delete ' + id)
            // }
        },
        mounted: function () {
            // dropdown card menu
            let cardDropdownMenu = document.querySelectorAll('.card__dropdown-trigger')
            _.forEach(cardDropdownMenu, function (value) {
                let cardDropdownMenuInstance = new M.Dropdown(value, {
                    constrainWidth: false
                })
            })
        }
    }
</script>
<style scoped>
</style>
