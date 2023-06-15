export const typeMap = {"article":{"/":{"path":"/article/","keys":["v-df8b6e0c","v-6e19edb7","v-f0ec4556","v-24b7c48d","v-2bc6566a","v-7f25ca3a","v-7d70f19b","v-7bbc18fc","v-7a07405d","v-6cd750ef","v-6b227850","v-696d9fb1","v-67b8c712","v-184f4da6","v-2e3eac9e","v-4e65ec78","v-c151bf32","v-438ffe52","v-1473bf53","v-7bc55b0e","v-0ebf36a9","v-c79cbb34","v-8f2ae2ca","v-633f6c70","v-5051f6a4","v-39c95836","v-31bcaa60","v-ddc6d98c","v-0732a0ec","v-ebf023e8","v-fca004fa","v-6ea4386e","v-46aba8e3","v-5fa67d1c","v-51f1a186","v-343517b3","v-3d077ea3","v-54a1d1f9","v-49661e44","v-aee7f904","v-40783b3f","v-2617698b","v-9e14ff60","v-15dc86c8","v-4570c261"]}},"star":{"/":{"path":"/star/","keys":["v-7bbc18fc","v-df8b6e0c","v-696d9fb1","v-6e19edb7"]}},"timeline":{"/":{"path":"/timeline/","keys":["v-df8b6e0c","v-f0ec4556","v-24b7c48d","v-2bc6566a","v-7f25ca3a","v-7d70f19b","v-7bbc18fc","v-7a07405d","v-6cd750ef","v-6b227850","v-696d9fb1","v-67b8c712","v-6e19edb7"]}}};

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept();
  if (__VUE_HMR_RUNTIME__.updateBlogType)
    __VUE_HMR_RUNTIME__.updateBlogType(typeMap);
}

if (import.meta.hot)
  import.meta.hot.accept(({ typeMap }) => {
    __VUE_HMR_RUNTIME__.updateBlogType(typeMap);
  });

