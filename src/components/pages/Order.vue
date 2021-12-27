<template>
<div>{{  orders }}</div>
</template>

<script setup>
import { ref } from 'vue';
import { OrderService } from '../../services/api.service';

const orders = ref(await OrderService.query());
</script>
