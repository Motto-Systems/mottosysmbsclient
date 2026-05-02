import { Component, OnInit } from '@angular/core';
import { MockResponse } from '../../../../core/services/mock-data';
import { UserMasterFieldsInfo, UserMasterBO } from '../../userMasters.model';
 
@Component({
  selector: 'app-createNewUserMaster',
  standalone: false,
  templateUrl: './createNewUserMaster.html',
  styleUrls: ['./createNewUserMaster.scss'],
})
export class CreateNewUserMasterComponent implements OnInit {
 
  fieldsInfos: UserMasterFieldsInfo = new UserMasterFieldsInfo();
  userMasterBO: UserMasterBO = new UserMasterBO();
 
  selectedCategory:any = "";
 
  ngOnInit(): void {
 
    const response = MockResponse["UserMasters/GetCategories"];
 
    if (response) {
      this.fieldsInfos.categoryList = response.result;
    }
  }
 
  setCategory(event:any){
    this.selectedCategory = event.value;
    this.userMasterBO.categoryId = event.value;
  }
 
  save(){
    console.log("Form Data :", this.userMasterBO);
  }
 
  saveAndCreate(){
    console.log("Save & Create Another",this.userMasterBO);
  }
 
}