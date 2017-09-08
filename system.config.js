System.config({
  transpiler: 'typescript',
  packages: {
    src: {
   //   defaultExtension: 'ts'
    }
  }
});
System
    .import('app/js/main.js')
    .then(null, console.error.bind(console));