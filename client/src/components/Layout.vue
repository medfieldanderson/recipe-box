<template>
  <div>
    <nav>
      <RouterLink to="/">Logo</RouterLink>
      <RouterLink to="/home">Home</RouterLink>
      <RouterLink to="/about">About</RouterLink>
    </nav>
    <RouterView />
  </div>
</template>

<script setup lang="ts"></script>

<style scoped></style>
