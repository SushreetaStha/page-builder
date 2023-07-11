<template>
    <transition name="sidebar-transition">
        <aside v-show="props.isOpen" class="sidebar fixed overflow-y-auto" style="background-color: rgb(17 24 39);;">
            <div class=" h-screen  bg-gray-900 text-white">
                <div>
                    <div class="flex flex-col">
                        <div class="flex flex-row justify-between items-center mb-3">
                            <div class="cursor-pointer uppercase text-sm font-semibold">Save</div>
                            <div class="cursor-pointer" @click="closeSidebar">&#x2715;</div>
                        </div>
                        <hr class="custom-hr" />
                        <div class="text-md mt-3">DOWNLOAD</div>
                        <p class="text-gray-400 mt-3 text-sm tracking-wide" style="width: 14rem;">Download your design as
                            a html file, so you can
                            tweak it
                            further and
                            upload
                            it to any hosting you
                            like.</p>
                        <button
                            class="mt-4 rounded-xl border-2 p-2 border-gray-300 hover:bg-gray-300 hover:text-black transition ease-in-out"
                            @click="saveHtml">Download</button>
                    </div>

                </div>
            </div>
        </aside>
    </transition>
</template>


<script setup>

const props = defineProps({
    isOpen: {
        type: Boolean
    }
})

const emits = defineEmits(['close', 'save']);

const closeSidebar = () => {
    emits('close');
};

const saveHtml = () => {
    emits('save');
}

</script>

<style>
.sidebar-transition-enter-active,
.sidebar-transition-leave-active {
    transition: transform 0.3s ease;
}

.sidebar-transition-enter-from,
.sidebar-transition-leave-to {
    transform: translateX(-100%);
}

.sidebar {
    position: fixed;
    top: 0;
    right: -250px;
    bottom: 0;
    width: 250px;
    /* Adjust the width as needed */
    background-color: #f8f8f8;
    /* Replace with your desired background color */
    padding: 20px;
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.6);
}

.custom-hr {
    border: none;
    margin-left: -20px;
    height: 1px;
    background-color: rgba(106, 104, 104, 0.563);
    /* Replace 'red' with your desired color */
    width: 15.6rem;
}
</style>