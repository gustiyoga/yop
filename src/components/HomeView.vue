<template>
    <div class="row">
        <div v-for="picture in this.pictures" class="col s12 m4 l3" :key="picture.id">
            <div class="card mt--2">
                <div class="card-image waves-effect waves-block waves-light" @click="displayDetails(picture.id)">
                    <!-- <img src="http://next.materializecss.com/images/office.jpg"> -->
                    <img :src="picture.url" :alt="picture.comment" style="object-fit:cover; height: 200px;">
                </div>
                <div class="card-content">
                    <span class="card-title grey-text text-darken-4">
                        <a class="cursor--pointer" @click="displayDetails(picture.id)">{{ picture.comment }}</a>
                        <i class="material-icons right cursor--pointer card__dropdown-trigger orange-text" :data-target="'card__dropdown-'+picture.id">more_vert</i>
                    </span>
                    <!-- Dropdown Structure -->
                    <ul :id="'card__dropdown-'+picture.id" class='dropdown-content'>
                        <li><a href="javascript:;" class="cyan-text"><i class="material-icons">mode_edit</i> Edit</a></li>
                        <li class="divider"></li>
                        <li><a href="javascript:;" class="red-text"><i class="material-icons">delete</i>Delete</a></li>
                    </ul>

                    <p class="text-ellipsis text-ellipsis--3">
                        I am a very simple card. I am good at containing small bits of information. I am convenient because I require little markup to use effectively.
                    </p>
                </div>
            </div>
        </div>
        <div class="fixed-action-btn">            
            <router-link class="btn-floating btn-large waves-effect waves-light orange" to="/post">
                <i class="material-icons">mode_edit</i>
            </router-link>
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
            displayDetails (id) {
                this.$router.push({name: 'detail', params: { id: id }})
            }
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
