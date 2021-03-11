<template>
    <v-app>
        <Header />
        <Notif />
        <Sidebar />
        <v-main>
            <v-container>
                <transition name="fade" mode="out-in">
                    <router-view></router-view>
                </transition>
            </v-container>
        </v-main>
        <Footer />
    </v-app>
</template>

<script>
import Header from "../layouts/frontend/Header";
import Sidebar from "../layouts/frontend/Sidebar";
import Footer from "../layouts/frontend/Footer";
import Notif from "../components/Notif";

export default {
    name: "LayoutFrontend",
    components: {
        Header,
        Sidebar,
        Footer,
        Notif,
    },
    data: () => ({}),
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.1s;
}

.fade-enter,
.fade-leave-to {
    opacity: 0;
}
</style>