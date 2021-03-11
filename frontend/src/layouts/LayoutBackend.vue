<template>
    <v-app>
        <Header />
        <Notif />
        <Sidebar />
        <v-main>
            <v-container>
                <router-view></router-view>
            </v-container>
        </v-main>
    </v-app>
</template>

<script>
import Header from '../layouts/backend/Header'
import Sidebar from '../layouts/backend/Sidebar'
import Notif from '../components/Notif'

export default {
    name: "LayoutBackend",
    components: {
        Header,
        Sidebar,
        Notif
    },
    data: () => ({}),
};
</script>

<style >
</style>