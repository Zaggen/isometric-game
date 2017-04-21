function addSource(baseDir, sourcePaths) {
  return sourcePaths.map(function(path) {return baseDir + path;})
}

module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    stylus: {
      options:{
        sourcemap:{
          inline:true
        }
      },
      dist: {
        files: [{
          expand: true,
          cwd: 'assets/styles/',
          src: ['importer.styl'],        //Edit this to match your files
          dest: 'assets/styles/',
          rename: function(dest) {
            return dest + 'main.css';
          }
        }]
      }
    },
    ts: {
      options: {
        module: 'amd',
        target: 'es5',
        experimentalDecorators: true,
        moduleResolution: "node",
        inlineSourceMap: true,
        inlineSources: true,
        noImplicitUseStrict: true,
        jsx: 'react',
        allowJs: true,
        allowSyntheticDefaultImports: true,
        typeRoots: ["./client/types", 'node_modules/@types']
      },
      /*dev: {
        src: ['client/!**!/!*.tsx'],
        outDir: ".dist"
      },*/
      dist: {
        files: [
          {
            src: ['client/**/*.tsx'],
            dest: '.dist/bundle.js',
          }
        ]
      }
    },
    watch: {
      stylus: {
        files: 'assets/**/*.styl',
        tasks: ['stylus']
      },
      ts: {
        files: 'client/**/*.tsx',
        tasks: ['ts']
      }
    }
  });
  grunt.loadNpmTasks('grunt-contrib-stylus');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks("grunt-ts");
  grunt.registerTask('default', ['ts', 'watch']);
};