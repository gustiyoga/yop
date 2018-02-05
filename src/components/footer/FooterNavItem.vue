<template>
    <div>
        <router-link :to="{path: link}" active-class>
            <div class="footer-nav__item waves-effect waves-circle waves-orange">
                <i class="material-icons">{{ icon }}</i>
            </div>
        </router-link>
    </div>
</template>
<script>
    export default {
        name: 'FooterMenuItem',
        props: {
            link: String,
            icon: String
        }
    }
</script>
