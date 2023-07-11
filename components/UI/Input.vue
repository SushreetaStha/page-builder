<template>
    <div>
        <label for="" v-if="props.label" class="block pl-3 ml-px mb-2 text-sm font-medium text-gray-700">
            {{ props.label }}
        </label>
        <input :value="props.modelValue" @input="event => emits('update:modelValue', event.target.value)"
            class="block w-full px-4 py-2 rounded-full sm:text-sm border-2 border-gray-200 mb-2" :type="props.type"
            :placeholder="props.placeholder" />
    </div>
</template>

<script setup>

const emits = defineEmits(['update:modelValue'])

const props = defineProps({
    modelValue: {
        type: String,
        required: true
    },
    label: {
        type: String,
        default: null
    },
    placeholder: {
        type: String,
        default: null
    },
    type: {
        type: String,
        default: 'text'
    }
})

</script>

