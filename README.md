# uber-clone - Installations and packages
1. vue create uber-clone (manually)
2. vue add tailwind
3. npm install --global vue-pwa-asset-generator
4. npm i axios lodash pinia pinia-plugin-persistedstate vue-material-design-icons\
5. Create folder in root > server
   1. npm init (default setup)
   2. npm i axios body-parser cors dotenv express nodemon
6. Add below line in .eslintrc.js
   ```
      env:{
         node: true,
         ....,
         
         'vue/setup-compiler-macros': true
      }
   ```

7. For Map - we using Vue Leaflet
   ```
      npm install leaflet
      npm install leaflet-routing-machine 
   ```