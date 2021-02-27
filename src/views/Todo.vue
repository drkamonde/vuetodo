<template>
  <div class="home">

    <v-text-field
      v-model="newTaskTitle"
      @click:append="addTask"
      @keyup.enter="addTask"
      class="pa-3"
      outlined
      label="Add Task"
      append-icon="mdi-plus-box"
      hide-details
      clearable
    ></v-text-field>

    <v-list flat class="pt-0">

      <div 
       v-for="Task in Tasks" 
       :key="Task.id"
      >
        <v-list-item>
          <template v-slot:default>
            <v-list-item-action>
              <v-checkbox 
                color="primary"
              ></v-checkbox>
            </v-list-item-action>

            <v-list-item-content>
              <v-list-item-title>
                {{Task.title}}
              </v-list-item-title>
            </v-list-item-content>

            <v-list-item-action>
              
              <v-dialog width="600">
                  <template v-slot:activator="{ on, attrs }">
                      <v-btn icon v-bind="attrs" v-on="on" @click="editTask(Task.id)">
                          <v-icon color="primary lighten-1">mdi-pencil</v-icon>
                      </v-btn>
                  </template>

                  <v-card>
                      <v-card-title class="headline grey lighten-2">
                          Edit Task
                      </v-card-title>

                      <v-divider></v-divider>

                      <v-card-text>
                          <v-form ref="form" class="mx-4 mb-4 mt-4" @submit.prevent="editTask">

                              <v-text-field v-model="Task.title" label="Task" prepend-icon="mdi-file-tree" required></v-text-field>

                              <v-card-actions>
                                  <v-btn text class="success mx-0 mt-3" type="submit">
                                      Save
                                  </v-btn>
                                  <v-spacer></v-spacer>
                                  <v-btn
                                    color="blue darken-1"
                                    text
                                    @click="dialog = false"
                                  >
                                    Close
                                  </v-btn>
                              </v-card-actions>

                          </v-form>
                      </v-card-text>

                  </v-card>
              </v-dialog>

            </v-list-item-action>
            
            <v-list-item-action>             
              <v-btn                 
                @click="deleteTask(Task.id)"
                icon
              >
                <v-icon color="red lighten-1">mdi-delete</v-icon>
              </v-btn>
            </v-list-item-action>

          </template>
        </v-list-item>
        <v-divider></v-divider>
      </div>
    </v-list> 
       
  </div>
</template>

<script>
import {db} from '../firebase/db.js'

export default {
  name: 'Home',
  data () {
    return {
      newTaskTitle: '',
      Tasks: [],
      dialog: false,
    }
  },
  firestore: {
      Tasks: db.collection("Tasks")
  },

  methods: {
    addTask() {
        db.collection('Tasks').add({
            id: Date.now(),
            title: this.newTaskTitle,
            done: false
        }).catch(err => {
            console.log(err)
        })
        this.newTaskTitle = ''
    },

    doneTask(id) {
      let task = this.Tasks.filter(task => task.id === id)[0]
      task.done = !task.done
    },

    //This code delete's from Firebase array 
    deleteTask(id) {
      if(confirm('Are you sure? ')){

        db.collection("Tasks").doc(id).delete().then(function() {
            console.log("Task successfully deleted!");
        }).catch(function(error) {
            console.error("Error removing document: ", error)
        });
      }
    },


    //Edit diffrent tasks 
    editTask(id) {
        db.collection('Tasks').doc(id).update();
    },

    updateTask(){
        this.$firestore.Tasks.doc(this.task.id).update(this.task);
    },

  }
}
</script>
