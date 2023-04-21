<template>
    <SServerTableFilter v-model="filters">
        <div class="w-1/2">
            <div class="mt-3 mb-3">
                <SInput label="First name" v-model="filters.first_name"/>
                <SInput label="Last name" v-model="filters.last_name"/>
            </div>
            <div class="mt-3 mb-3">
                <SButton type="submit">Filter</SButton>
            </div>
        </div>

    </SServerTableFilter>
</template>

<script>
import SServerTableFilter from "../components/sTables/SServerTableFilter.vue";
import SInput from "../components/sInputs/SInput.vue";
import SButton from "../components/SButton.vue";

export default {
    name: "MyServerTableFilter",
    components: {
        SButton,
        SInput,
        SServerTableFilter
    },
    data() {
        return {
            filters: {
                first_name: null,
                last_name: null
            }
        };
    },
}
</script>
