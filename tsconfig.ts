{
  "compilerOptions": {
    "target": "esnext",
    "module": "esnext",
    "moduleResolution": "node",
    "lib": ["esnext", "esnext.asynciterable", "dom"],
    "esModuleInterop": true,
    "allowJs": true,
    "skipLibCheck": true,
    "strict": false,
    "forceConsistentCasingInFileNames": true,
    "noEmit": true,
    "jsx": "preserve",
    "resolveJsonModule": true,
    "types": [
      "@types/node",
      "@nuxtjs/sanity"
    ]
  },
  "include": [
    "nuxt.config.ts",
    "plugins/**/*.ts",
    "components/**/*.vue",
    "pages/**/*.vue",
    "layouts/**/*.vue"
  ]
}
