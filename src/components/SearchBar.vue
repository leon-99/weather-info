<template>
  <div class="d-flex justify-center mt-5">
    <v-form @submit.prevent="$emit('getSearchedDataFunction', $event)" class="w-100" style="max-width: 400px;">
      <v-text-field
        v-model="searchQuery"
        placeholder="Find a city"
        variant="outlined"
        density="compact"
        hide-details
        autofocus
        bg-color="rgba(0, 0, 0, 0.3)"
        color="white"
        class="search-input"
        @keyup.enter="handleSearch"
      >
        <template v-slot:append>
          <v-icon color="rgba(255, 255, 255, 0.7)">mdi-magnify</v-icon>
        </template>
      </v-text-field>
    </v-form>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const searchQuery = ref('');

const handleSearch = () => {
  if (searchQuery.value.trim()) {
    const event = {
      target: {
        firstChild: {
          value: searchQuery.value
        }
      }
    };
    emit('getSearchedDataFunction', event);
    searchQuery.value = '';
  }
};

const emit = defineEmits(['getSearchedDataFunction']);
</script>

<style scoped>
.search-input :deep(.v-field) {
  border: rgba(0, 0, 0, 0.3) 1px solid;
  border-radius: 0 10px 0 10px;
  transition: all linear 0.3s;
}

.search-input :deep(.v-field:focus-within) {
  border-color: white;
}

.search-input :deep(.v-field__input) {
  text-align: center;
}

.search-input :deep(.v-field__input::placeholder) {
  color: rgba(255, 255, 255, 0.5);
  text-align: center;
}
</style>