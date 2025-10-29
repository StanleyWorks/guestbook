export default defineEventHandler((event) => {
  throw createError({
    message: "This has to fail, it is the way.",
    status: 500,
  });
});
