import { Component, OnInit } from '@angular/core';
import { NotificationService } from 'src/app/services/admin/notification.service';
import { HomeService } from 'src/app/services/home.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {
  resourseList:any;
  constructor(private _HomeService:HomeService, private _NotificationService:NotificationService) { 
    this.getAllNotification()

  }
  ngOnInit(): void {
  }

  getAllNotification() {
 
    this._HomeService.getAllUnConfirmedData().subscribe((res) => {
      console.log(res);
      this.resourseList = res?.resourseList;
   
    });
  }
  beConfirmed(id:any){
    this._NotificationService.updateNotificationResourse(id).subscribe((res) => {
      console.log(res);
      if(res.messages == "resourse updated"){
        this.getAllNotification()

      }
  
    });
  }
  deleteResourse(id:any){
    this._NotificationService.deleteResourse(id).subscribe((res) => {
      console.log(res);
        if(res.messages == 'resourse deleted'){
          this.getAllNotification()
        }
    });
  }

}
