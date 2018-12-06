import { Component, ViewChild,ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, Picker} from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { Geolocation } from '@ionic-native/geolocation';
import { LoginPage } from '../../pages/login/login';
import { PickerMap } from '../../app/models/PickerMap';
import { Observable } from 'rxjs/Observable';
import {PickerServices} from '../../services/PickerServices';


declare var google;

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  @ViewChild('map') mapElement: ElementRef;
  map: any;

  //dummy picker
  picker: PickerMap = {
    user: localStorage.getItem("email"),
    lat: '-34.9290',
    long: '138.6010'
  };
 
  notePickerMap: Observable<PickerMap[]>


  constructor(private toast: ToastController,
    public navCtrl: NavController, public navParams: NavParams, public geolocation: Geolocation,
     public pickerServices : PickerServices) {
  }

  ionViewDidLoad() {
      console.log()
    
      this.loadMap()
      this.loadDataFirebase()
      this.addPicker()
  }

  addPicker(){
    console.log("add : ")
    this.pickerServices.add(this.picker).then(ref => {
       console.log("add : " + ref)
    })
  }


  loadMap(){
 
    let latLng = new google.maps.LatLng(-34.9290, 138.6010);
 
    let mapOptions = {
      center: latLng,
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    }
 
    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
  }

  loadDataFirebase(){
    this.notePickerMap = this.pickerServices.getList()
      .snapshotChanges()
      .map(
      changes => {
        return changes.map(c => ({
          key: c.payload.key, ...c.payload.val()
        }))
      });

  }

  logoutUser(){
      localStorage.removeItem("email")
      this.navCtrl.setRoot(LoginPage)
  }
}
