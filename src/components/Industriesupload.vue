<template>
    <div id="">
        <div v-if="!CSV">
            <h2>Select a CSV file</h2>
            <input type="file" @change="onFileChange">
        </div>
        <div v-else>
            <button @click="removeCSV">Upload another CSV file</button>
        </div>
    </div>
</template>

<script>
    import Papa from 'papaparse'
    import Vue from 'vue'
    import VueSweetalert2 from 'vue-sweetalert2';
    import axios from 'axios'
    import Router from '../router';

    Vue.use(VueSweetalert2);
    // var base_url = "http://127.0.0.1:8000/industries/upload";
    var base_url = "https://drfbackend.herokuapp.com/industries/upload";    
    var allDataCorrect = true; // Flag
    var finalFormattedData = [];

    export default {
        name: 'Industriesupload',
        data() {
            return {
                CSV: ''
            }
        },
        created() {
            if (!localStorage.getItem('token')) {
                Vue.swal('Please Login to upload!');
                Router.push({
                    name: 'Login'
                })
            }
        },
        methods: {
            onFileChange(e) {
                var files = e.target.files || e.dataTransfer.files;
                if (!files.length)
                    return;
                if (files[0].type !== 'text/csv') {
                    this.incorrectCSV();
                    Vue.swal('Sorry, thats not a valid CSV file');
                    return;
                }
                this.checkCSV(files[0]);
            },
            checkCSV(file) {
                var vm = this;
                var parsed = Papa.parse(file, {
                    download: true,
                    header: true,
                    step: function(row, parser) {
                        parser.pause(); // pause the parser
                        var first_row_data = row.data[0];
                        // Now check object keys, if it match
                        if (('id' in first_row_data) && ('name' in first_row_data)) {
                            //every required key is present
                            var id = first_row_data['id'];
                            var name = first_row_data['name'];
                            if (isNaN(id) || typeof name != 'string') {
                                Vue.swal(
                                    'Incorrect Data!',
                                    'The id column must be number and name column string.',
                                    'error'
                                )
                                vm.incorrectCSV();
                                parser.abort();
                            } else {
                                finalFormattedData.push({
                                    id: id,
                                    name: name
                                });
                            }
                            parser.resume();
                        } else {
                            //some key is missing, abort parsing
                            Vue.swal(
                                'Incorrect Format!',
                                'error'
                            )
                            vm.incorrectCSV();
                            parser.abort();
                        }                            
                        
                    },
                    complete: function(results, file) {
                        if (allDataCorrect) {
                            console.log(finalFormattedData);
                            vm.CSV = finalFormattedData;
                            vm.showDataParseSuccess(finalFormattedData, file);  
                        }
                    }
                });
            },
            removeCSV: function(e) {
                this.CSV = '';
                allDataCorrect = true;
                finalFormattedData = [];
            },
            incorrectCSV:function(e){
                this.CSV = 'Incorrect format';
                allDataCorrect = false;
                finalFormattedData = [];
            },
            showDataParseSuccess: function(data, file) {
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
                        // this.postData(data);
                        this.postDataAsFile(file);
                    }
                    finalFormattedData = [];
                });
            },
            postDataAsFile(file){
                var csvFile = file;
                var formdata = new FormData();
                formdata.append('file_upload', csvFile);
                axios.post(base_url, formdata, {
                    headers: {
                        Authorization: 'Token ' + localStorage.getItem('token')
                    }
                })
                .then((response) => {
                    this.removeCSV();
                    Vue.swal(
                        'Uploaded!',
                        'Your file has been uploaded.',
                        'success'
                    )
                })
                .catch((error) => {
                    this.incorrectCSV();
                    Vue.swal('Error!', 'This is our fault, will get fixed soon..', 'error');
                });                                
            },
            postData(data) {
                axios.post(base_url, JSON.stringify(data), {
                        headers: 
                        { 
                            Authorization: 'Token ' + localStorage.getItem('token'), 
                            'Content-Type': 'application/json' 
                        }
                    })
                    .then((response) => {
                        Vue.swal(
                            'Uploaded!',
                            'Your file has been uploaded.',
                            'success'
                        )
                        vm.removeCSV();
                    })
                    .catch((error) => {
                        vm.incorrectCSV();
                        Vue.swal('Error!', 'This is our fault, will get fixed soon..', 'error');
                    });
            }         
        }
    }
</script>