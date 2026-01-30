export default defineEventHandler(async () => {
  const response = await $fetch('https://kiranjohns.com/api/links')
  return response
})
