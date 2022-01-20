<template>
<div id="wrapper">
  <div id="header">
    <!--<h1 id="header-main">{{componentHeader}}</h1>-->
  </div>
  <div id="student-input">
    <br />
    <input v-model="searchTerm" type="text" class="regInput" placeholder="Search by name" />
    <!--<button id="fetchBtn" v-on:click='fetchStudents'>Fetch Students</button>-->
    <br /><br />
    <input v-model="tagTerm" type="text" class="regInput" placeholder="Search by tag" />
  </div>
  <div id="student-main">
    <ul id="student-list">
      <li v-for="student in filteredResults" :key="student.id"> 
        <div class="stuAll">
        <img id="student-img" :src="student.pic" />
          <div class="stuData">
            <div class="stuRow">
              <h2>{{ student.firstName + " " + student.lastName }}</h2>
              <button @click="toggleGrades(student.id)" class="toggleBtn">+</button>
            </div>
            <div id="stuStats">
              <br />
              &emsp;Email: {{ student.email }} <br />
              &emsp;Company: {{ student.company }} <br />
              &emsp;Skill: {{ student.skill }} <br />
              &emsp;Average: {{ this.calcAvg(student.grades) }}% <br /><br />
            </div>

            <div :id="student.id" class="toggleClass">
                  <ul id="grade-list">
                    <li v-for="grade in student.grades" :key="grade">
                      Test {{ student.grades.indexOf(grade) + 1 }}: {{ grade }}%
                    </li> 
                  </ul>
                  <br />
            </div>

            <div id="stuTags">
                  <ul id="tag-list">
                    <li v-for="tag in student.tags" :key="tag">
                      {{ tag }}
                    </li> 
                  </ul> <br />
              <input class="tagInput" :id="'tag_'+student.id" type="text" placeholder="Add a tag" @keyup.enter="createTag(student, tagTerm)" />
              <br />
              <br />
            </div>
          </div>
        </div>
        <br />
      </li>
    </ul>
  </div>
</div><!--Close Wrapper-->
</template>

<script>
//import VueTagsInput from '@johmun/vue-tags-input';
import studentFile from '../studentFile.json';

export default {
  name: 'Student UI',
  props: ['student'],
  mounted() {
    this.fetchStudents();
    this.addTags;
  },
  data: function() {
    return {
      componentHeader: "Student UI",
      hatchwaysBase: "https://api.hatchways.io/assessment/students",
      searchTerm: null,
      tagTerm: null,
      studentData: null
    }
  },
  methods: {
    toggleGrades: function(id) {
      console.log('toggleMenu firing');
      var div = document.getElementById(id);
      if (div.style.display === 'block') {
        div.style.display = 'none';
      } else {
        div.style.display = 'block'; 
      }
    },
    logout: function() {
      console.log('logout firing');
      this.$emit('quitClicked')
    },
    /*
    fetchStudents: function() {
      console.log('fetchStudent firing');
      fetch(this.hatchwaysBase)
        .then(response => response.json())
        .then(result => this.$data.studentData = this.addTags(result.students))
        .catch(error => error);
    },
    */
    fetchStudents: function() {
      this.$data.studentData = this.addTags(studentFile);
    },
    calcAvg: function(grades) {
      let sum = 0;
      let length = grades.length;
      console.log("length=" + length);
      for (let i = 0; i < grades.length; i++)  
          sum += parseInt(grades[i]);  
      let avg = (sum/length).toFixed(3);
      console.log("sum="+sum);
      return avg;  
    },
    addTags: function(arr) {
      console.log('addTags firing');
      for (let i = 0; i < arr.length; i++)  
        arr[i].tags = [];  
      return arr;
    },
    createTag: function(student) {
      let text = document.getElementById(`tag_${student.id}`).value;
      console.log('text='+text);
      !student.tags ? student.tags = [] : console.log('tags exist');
      student.tags.push(text);
      document.getElementById(`tag_${student.id}`).value = '';
    }
  },
  computed: {
    filteredResults() {
      if ((this.searchTerm && this.searchTerm !== "") && (!this.tagTerm || this.tagTerm === "")) {
        return this.studentData.filter((student) => {
          return this.searchTerm.toLowerCase().split(' ').every(s => student.firstName.toLowerCase().includes(s) || student.lastName.toLowerCase().includes(s));
        })
      }
      else if ((this.tagTerm && this.tagTerm !== "") && (!this.searchTerm || this.searchTerm === "")) {
        return this.studentData.filter((student) => {
          return this.tagTerm.toLowerCase().split(' ').every(t => student.tags.join('').includes(t));
          })
        //return console.log('tags');
      }
      else if ((this.searchTerm && this.searchTerm !== "") && (this.tagTerm && this.tagTerm !== "")) {
        return this.studentData.filter((student) => {
          return this.searchTerm.toLowerCase().split(' ').every(s => student.firstName.toLowerCase().includes(s) || student.lastName.toLowerCase().includes(s)) &&
            this.tagTerm.toLowerCase().split(' ').every(t => student.tags.join('').includes(t));
        })
      }
      else {
        return this.studentData;
      }
    }
  }
}
</script>

<style scoped>
#tag-list li {
  display: inline;
  border-radius: 4px;
  background-color: lightgrey;
  width: auto;
  padding: 5px 10px 5px 10px;
  margin: 0 5px 0 5px;
}
#tag-list {
  display: block;
  padding-left: 0;
}
#wrapper {
  margin: auto;
  width: 90%;
  border-radius: 10px;
  background-color: white;
}
#header {
  width: 100%;
}
#student-img {
  float: left;
}
.toggleClass {
  display: none;
}
ul {
  list-style-type: none;
}
#row {
  height: auto;
  width: 40%;
}
h2 {
  font-size: 200%;
  font-weight: 999;
  margin: 0 0 0 0;
  padding: 0;
  width: 80%;
  height: match-parent;
}
.regInput {
  outline: 0;
  border-width: 0 0 0.5px;
  border-color: lightgrey;
  width: 90%;
  margin-left: 5px;
}
.tagInput {
  outline: 0;
  border-width: 0 0 0.5px;
  border-color: lightgrey;
  width: 40%;
}
.stuData	{
	text-align: left;
  height: autopx;
  width: 60%;
  margin: auto;
  padding: 0;
}
.stuStats	{
  padding: 0;
  font-size: 12px;
  position: relative;
}
#student-img	{
	height: 100px;
  width: 100px;
  border-radius: 50%;
  border: 1px solid grey;
}
.stuAll {
  height: auto;
  margin: auto;
  border-bottom: 1px solid lightgrey;
}
#student-main	{
	margin: auto;
	position: relative;
}
#student-input	{
	text-align: left;
}
.toggleBtn {
  font-size: 300%;
  color: grey;
  float: right;
	border: none;
	padding: 0;
  background: none;
	cursor: pointer;
  height: match-parent;
  margin: 0;
  display: inline;
  width: 15%;
}
.stuRow {
  height: 37px;
}
</style>
