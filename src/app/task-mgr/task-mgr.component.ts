import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { AppService } from '../app.service'

@Component({
  selector: 'app-task-mgr',
  templateUrl: './task-mgr.component.html',
  styleUrls: ['./task-mgr.component.scss']
})
export class TaskMgrComponent implements OnInit {
  constructor(private http: HttpClient) { }
  taskList = [];
  userList = [];
  editModalClicked = false;
  createModeOn = false;
  editModeOn = false;
  taskId : any;
  taskMessage : any;
  dueDate : any;
  userId : any;
  priorityId : any;
  priorityList = [
    {id: 0, name:'High Priority'},
    {id: 1, name:'Medium Priority'},
    {id: 2, name:'Low Priority'}
  ]

  ngOnInit(): void {
    let headers = new HttpHeaders();
    headers = headers.set('AuthToken', 'YrZLvNkdPNNNC0e2C8EFAJbPxxb1y9ZL');

    let taskList = this.http.get("http://devza.com/tests/tasks/list", { headers: headers })
    taskList.subscribe((res) => {
      let data: any;
      data = res
      if(data && data.tasks.length > 0){
        for(let i of data.tasks){
          this.taskList.push(i)
        }
      }
      console.log(this.taskList)
    })

    let usersList = this.http.get("http://devza.com/tests/tasks/listusers", { headers: headers })
    usersList.subscribe((res) => {
      let data: any;
      data = res
      if(data && data.users.length > 0){
        for(let i of data.users){
          this.userList.push(i)
        }
      }
      console.log(this.userList)
    })
  }

  openModal(){
    console.log('Open Modal clicked')
    this.createModeOn = true
  }

  modalhide(){
    this.createModeOn = false;
    this.editModeOn = false;
  }

  userChanged(e){
    console.log(e.target.value)
    this.userId = e.target.value
  }

  priorityChanged(e){
    console.log(e.target.value)
    this.priorityId = e.target.value
  }

  createEditFormSubmit(){
    console.log(this.taskId)  
    console.log(this.taskMessage)  
    console.log(this.dueDate)  
    console.log(this.userId)  
    console.log(this.priorityId)
    if(this.priorityId === 'select'){
      this.priorityId = undefined
    }
    if(this.userId === 'select'){
      this.userId = undefined
    }

    if(this.createModeOn){
      let formData: FormData = new FormData();
      formData.append('message', this.taskMessage); 
      formData.append('due_date', this.dueDate); 
      formData.append('priority', this.priorityId); 
      formData.append('assigned_to', this.userId); 

      let createTaskList = this.http.post("http://devza.com/tests/tasks/create", formData, {
        headers: new HttpHeaders({
          'AuthToken': 'YrZLvNkdPNNNC0e2C8EFAJbPxxb1y9ZL'
        })
      })
      createTaskList.subscribe((res) => {
        let data : any;
        data = res;
        console.log(res)
        if(data.status === 'success'){
          this.createModeOn = false;
        }
      })

    }

    if(this.editModeOn){
      let formData: FormData = new FormData();
      formData.append('taskid', this.taskId); 
      formData.append('message', this.taskMessage); 
      formData.append('due_date', this.dueDate); 
      formData.append('priority', this.priorityId); 
      formData.append('assigned_to', this.userId); 

      let createTaskList = this.http.post("http://devza.com/tests/tasks/update", formData, {
        headers: new HttpHeaders({
          'AuthToken': 'YrZLvNkdPNNNC0e2C8EFAJbPxxb1y9ZL'
        })
      })
      createTaskList.subscribe((res) => {
        let data : any;
        data = res;
        console.log(res)
        if(data.status === 'success'){
          this.editModeOn = false;
        }
      })
    }
    
    
  }

  editClicked(id){
    this.editModeOn = true;
    for(let i in this.taskList){
      if(this.taskList[i].id === id){
        this.taskId = id
        this.taskMessage = this.taskList[i].message 
        this.userId = this.taskList[i].assigned_to
        this.priorityId = this.taskList[i].priorityId
        this.dueDate = this.taskList[i].due_date
      }
    }
  }

  deleteClicked(id){
    let headers = new HttpHeaders();
    let formData: FormData = new FormData();
    formData.append('taskid', id)
    headers = headers.set('AuthToken', 'YrZLvNkdPNNNC0e2C8EFAJbPxxb1y9ZL');
    let deleteTask = this.http.post("http://devza.com/tests/tasks/delete", formData
    ,{ headers: headers })
    deleteTask.subscribe((res) => {
      console.log(res)
    })
  }

  

}
