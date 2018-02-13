<template>
    <div id="app">
        <div v-if="!image">
            <h2>Select an CSV file</h2>
            <input type="file" @change="onFileChange">
        </div>
        <div v-else>
            <button @click="removeImage">Remove CSV file</button>
        </div>
    </div>
</template>

<script>
  import Papa from 'papaparse'
  import Vue from 'vue'
  import VueSweetalert2 from 'vue-sweetalert2';
  import axios from 'axios'

  var base_url = "http://127.0.0.1:8000/industries/upload";
  var base_url = "https://drfbackend.herokuapp.com/industries/upload";

  Vue.use(VueSweetalert2);
  var allDataCorrect = true; // Flag
  var finalFormattedData = [];
  export default {
    name: 'Hello',
    data () {
      return {
        msg: 'Welcome to Crypto Info',
        image: ''
      }
    },
    methods: {
        onFileChange(e) {
            var files = e.target.files || e.dataTransfer.files;
            if (!files.length)
                return;
            if (files[0].type !== 'text/csv') {
                Vue.swal('Sorry, thats not a valid CSV file');
                return;
            }
            this.createImage(files[0]);
        },
        createImage(file) {
            var vm = this;
            var parsed = Papa.parse(file, {
                download: true,
                header: true,
                step: function(row, parser){
                    if (true) { //Only chek if flag is not set, i.e, for the first time
                        parser.pause(); // pause the parser
                        var first_row_data = row.data[0];
                        // Now check object keys, if it match
                        if (('id' in first_row_data) && ('name' in first_row_data)) {
                            //every required key is present
                            var id = first_row_data['id'];
                            var name = first_row_data['name'];
                            if(isNaN(id) || typeof name != 'string'){
                                Vue.swal(
                                    'Incorrect Data!',
                                    'The id column must be number and name column string.',
                                    'error'
                                )
                                allDataCorrect = false;
                                parser.abort();
                                vm.image = '';
                            }
                            else{
                                finalFormattedData.push({id:id, name:name});
                            }
                            parser.resume();
                        } else{
                            //some key is missing, abort parsing
                            Vue.swal(
                                'Incorrect Format!',
                                'The header must have id|name.',
                                'error'
                            )
                            allDataCorrect = false;
                            parser.abort();
                            vm.image = '';
                        }
                    } 
                },              
                complete: function(results, file) {
                    if(allDataCorrect){
                        console.log(finalFormattedData);
                        vm.image = finalFormattedData;
                        vm.showDataParseSuccess(finalFormattedData);
                    }
                }
            });
        },
        postData(data) {
            var headers = {
                'Content-Type': 'application/json',
                'Authorization': 3
            };
            // axios({ method: 'get', 
            //         url: 'http://rnjailamba.pythonanywhere.com/products/', 
            //         headers: { 'Authorization': 'Token bc9514f0892368cfd0ea792a977aff55d53e3634' } });


            axios.post(base_url, JSON.stringify(data) 
                ,{
                headers: 
                {}
                // { Authorization: 'Token bc9514f0892368cfd0ea792a977aff55d53e3634', 
                // 'Content-Type': 'application/json' 
                // }
            })
            .then((response) => {
                dispatch({type: FOUND_USER, data: response.data[0]})
            })
            .catch((error) => {
                dispatch({type: ERROR_FINDING_USER})
            });
        },
        removeImage: function (e) {
            this.image = '';
            allDataCorrect = false;
        },
        showDataParseSuccess: function(data){
            Vue.swal({
                title: 'The file passed all checks.',
                text: "Do you want to upload this file?",
                type: 'success',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, upload it!'
                }).then((result) => {
                    if (result.value) {
                        Vue.swal(
                            'Uploaded!',
                            'Your file has been uploaded.',
                            'success'
                        )
                        this.postData(data);
                    }
            });            
        }
    }
  }
</script>