System.config({
  transpiler: 'typescript',
  packages: {
    src: {
      defaultExtension: 'ts'
    }
  }
});
System
    .import('src/js/main.ts')
    .then(null, console.error.bind(console));