import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { TripDataService } from '../services/trip-data.service';
import { Trip } from '../models/trip';

@Component({
  selector: 'app-delete-trip',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './delete-trip.component.html',
  styleUrl: './delete-trip.component.css'
})
export class DeleteTripComponent implements OnInit {
    public editForm!: FormGroup;
    trip!: Trip;
    submitted = false;
    message : string = '';

    // Add method to format date as the form expects it
    private formatDate(date: Date | string): string {
      const d = new Date(date);
      const year = d.getFullYear();
      // pad with leading zeros for month/day
      const month = `${d.getMonth() + 1}`.padStart(2, '0');
      const day = `${d.getDate()}`.padStart(2, '0');
      return `${year}-${month}-${day}`;
    }

    constructor(
      private formBuilder: FormBuilder,
      private router: Router,
      private tripDataService: TripDataService
    ) {}

    ngOnInit() : void{

      //Retrieve stashed trip ID
      let tripCode = localStorage.getItem("tripCode");
      if(!tripCode) {
        alert("Something wrong, couldn't find where I stashed the tripCode!");
        this.router.navigate(['']);
        return;
      }

      console.log('DeleteTripComponent::ngOnInit');
      console.log('tripCode:' + tripCode);

      this.editForm = this.formBuilder.group({
        _id: [],
        code: [tripCode, Validators.required],
        name:['', Validators.required],
        length: ['', Validators.required],
        start: ['', Validators.required],
        resort: ['', Validators.required],
        perPerson: ['', Validators.required],
        image: ['', Validators.required],
        description: ['', Validators.required] 
      })

      this.tripDataService.getTrip(tripCode)
        .subscribe({
          next: (value: any) => {
            this.trip = value;

            // Need to format date 
            // added custom private method to convert database date format
            const formattedStartDate = this.formatDate(value[0].start);
            value[0].start = formattedStartDate;

            // Populate our record into the form
            this.editForm.patchValue(value[0]);
            if(!value)
              {
                this.message = 'No Trip Retrieved!';
              }
              else {
                this.message = 'Trip: ' + tripCode + ' retrieved';
              }
              console.log(this.message);
          },
          error: (error: any) => {
            console.log('Error: ' + error);
          }
        })
    }

    public onSubmit() {
      this.submitted = true;

      const tripCode = this.editForm.get('code')?.value;
      // for testing
      console.log('Trip Code: ', tripCode);
      console.log('Validity: ', this.editForm.valid);
      
      if (this.editForm.valid) 
        {
          console.log('value: ', this.editForm.value);
          this.tripDataService.deleteTrip(tripCode)
          .subscribe({
            next: (value: any) => {
              console.log('Trip deleted successfully:', value);
              this.router.navigate(['list-trips']); // Navigate after successful deletion
            },
            error: (error: any) => {
              console.error('Error during deletion:', error);
            }
          })
      } else {
        console.error('Form is not valid or trip code is undefined.', this.editForm);
      }
    }
    

    // get the form short name to access the form fields
    get f() { return this.editForm.controls;}
}