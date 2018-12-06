import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { PickerMap } from '../app/models/PickerMap';

@Injectable()
export class PickerServices {
    private pickerListRef = this.db.list<PickerMap>('picker-list');

    constructor(private db: AngularFireDatabase) { }

    getList() {
        return this.pickerListRef;
    }

    add(picker: PickerMap) {
        return this.pickerListRef.push(picker);
    }

    update(picker: PickerMap) {
        return this.pickerListRef.update(picker.user, picker);
    }

    remove(picker: PickerMap) {
        return this.pickerListRef.remove(picker.user);
    }
}
